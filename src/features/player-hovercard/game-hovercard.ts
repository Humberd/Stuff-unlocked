import { log } from "../../utils/utils";

interface AngularElement {
  scope?: () => unknown;
  isolateScope?: () => unknown;
  injector?: () => { get?: (name: string) => unknown } | undefined;
}

const page = window as unknown as {
  angular?: { element?: (element: Element) => AngularElement };
};

export interface GameHovercardPatch {
  /** Stops the game's hovercard of `element`, which was set up before the patch. */
  neuter: (element: Element) => void;
  restore: () => void;
}

/**
 * Turns the game's own player hovercard off. Returns `undefined` and leaves
 * the game alone when its internals aren't what this expects.
 */
export function disableGameHovercard(): GameHovercardPatch | undefined {
  const angularElement = page.angular?.element;
  if (typeof angularElement !== "function") {
    log("Angular not found, the game's hovercard stays on");
    return;
  }
  const directive = findHovercardDirective(angularElement(document.body));
  if (!directive) {
    log("The game's hovercard directive not found, it stays on");
    return;
  }

  const restoreActions: Array<() => void> = [];
  // Elements compiled from now on don't get the hovercard
  const originalRestrict = directive.restrict;
  directive.restrict = "E";
  restoreActions.push(() => (directive.restrict = originalRestrict));

  const stub = () => undefined;
  const neuter = (element: Element) => {
    const ngElement = angularElement(element);
    for (const scope of [ngElement.isolateScope?.(), ngElement.scope?.()]) {
      if (!isScopeWithCitizenData(scope) || scope.getCitizenData === stub) {
        continue;
      }
      const hadOwn = Object.hasOwn(scope, "getCitizenData");
      const original = scope.getCitizenData;
      scope.getCitizenData = stub;
      restoreActions.push(() => {
        if (scope.getCitizenData !== stub) {
          return;
        }
        if (hadOwn) {
          scope.getCitizenData = original;
        } else {
          delete scope.getCitizenData;
        }
      });
    }
  };
  document.querySelectorAll("[hovercard]").forEach(neuter);

  return {
    neuter,
    restore: () =>
      restoreActions
        .splice(0)
        .reverse()
        .forEach((restore) => restore()),
  };
}

function findHovercardDirective(
  body: AngularElement,
): { restrict: string } | undefined {
  try {
    // `get` throws for unknown services
    const definitions = body.injector?.()?.get?.("hovercardDirective");
    const directive: unknown = Array.isArray(definitions)
      ? definitions[0]
      : undefined;
    return isObjectWith(directive, "restrict") &&
      typeof directive.restrict === "string"
      ? (directive as { restrict: string })
      : undefined;
  } catch {
    return undefined;
  }
}

interface ScopeWithCitizenData {
  getCitizenData?: unknown;
}

function isScopeWithCitizenData(scope: unknown): scope is ScopeWithCitizenData {
  return (
    isObjectWith(scope, "getCitizenData") &&
    typeof scope.getCitizenData === "function"
  );
}

function isObjectWith<K extends string>(
  value: unknown,
  key: K,
): value is Record<K, unknown> {
  return typeof value === "object" && value !== null && key in value;
}
