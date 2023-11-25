import { TravelData } from "../../requests/travel-data-request";

import { getCsrfToken } from "../../utils/erep-global-info";

export class CountriesCache {
  private countries?: Record<string, TravelData.CountryValue>;
  private currentRegionId?: string;

  public async getCountries(): Promise<
    Record<string, TravelData.CountryValue>
  > {
    if (!this.countries) {
      await this.fetchCountries();
    }
    return this.countries!;
  }

  public async getCurrentRegionId(): Promise<string> {
    if (!this.currentRegionId) {
      await this.fetchCountries();
    }
    return this.currentRegionId!;
  }

  public updateCurrentRegionId(regionId: string) {
    this.currentRegionId = regionId;
  }

  private async fetchCountries() {
    const response = await TravelData.sendRequest({
      battleId: "0",
      _token: await getCsrfToken(),
      regionId: "0",
      holdingId: "0",
    });
    this.updateCurrentRegionId(String(response.citizen.region.id));
    this.countries = response.countries;
  }
}
