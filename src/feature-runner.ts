import type { FeatureExecutionStatus } from "./analytics/posthog";
import { type Feature, FeatureScope } from "./utils/feature";
import { formatNumber } from "./utils/format";
import { countTimeSpent } from "./utils/time";
import { error, log } from "./utils/utils";

export interface FeaturesRunResult {
  statuses: Record<string, FeatureExecutionStatus>;
  executedWithSuccess: number;
  totalTimeSpentMs: number;
}

/**
 * Runs the features that apply to the current page. Before running again,
 * it cleans up everything the previous run of each feature added.
 */
export class FeatureRunner {
  private readonly features: Feature[];
  private readonly scopes = new Map<string, FeatureScope>();

  constructor(features: Feature[]) {
    this.features = features;
  }

  async run(location: Location): Promise<FeaturesRunResult> {
    const total = this.features.length;
    log(`Found ${total} features. Executing...`);
    let executedWithSuccess = 0;
    const statuses: Record<string, FeatureExecutionStatus> = {};

    const { timeSpent } = await countTimeSpent(() =>
      Promise.all(
        this.features.map(async (feature, index) => {
          const counter = `[${index + 1}/${total}]`;
          this.scopes.get(feature.id)?.dispose();
          this.scopes.delete(feature.id);

          if (!feature.canExecute(location)) {
            log(
              `${counter} [SKIP] [${feature.name}] cannot execute on this page`,
            );
            statuses[feature.id] = { skipped: "Disabled on this page" };
            return;
          }
          if (feature.isSettingEnabled && !feature.isSettingEnabled()) {
            log(`${counter} [SKIP] [${feature.name}] is disabled in settings`);
            statuses[feature.id] = { skipped: "Disabled in settings" };
            return;
          }

          const scope = new FeatureScope();
          this.scopes.set(feature.id, scope);
          try {
            log(`${counter} [${feature.name}] executing...`);
            const { timeSpent } = await countTimeSpent(() =>
              feature.execute(scope),
            );
            log(
              `${counter} [${feature.name}] executed successfully in ${formatNumber(timeSpent)}ms`,
            );
            executedWithSuccess++;
            statuses[feature.id] = { success: true, timeSpentMs: timeSpent };
          } catch (e) {
            error(`Feature ${feature.name} failed to execute`);
            error(e);
            statuses[feature.id] = { success: false, error: String(e) };
          }
        }),
      ),
    );

    log(
      `[SUCCESS] ${executedWithSuccess}/${total} features started successfully in ${formatNumber(timeSpent)}ms`,
    );
    return { statuses, executedWithSuccess, totalTimeSpentMs: timeSpent };
  }
}
