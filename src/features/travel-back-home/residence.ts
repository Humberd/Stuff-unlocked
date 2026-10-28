export interface CitizenLocation {
  regionLocationId: number;
  residence?: {
    /** 1 when the citizen has a residence. */
    hasResidence: number;
    regionId: number;
    countryId: number;
  };
}

export interface Residence {
  regionId: number;
  countryId: number;
}

/** The residence to travel back to, when the citizen has one and is away from it. */
export function findResidenceToReturnTo(
  citizen: CitizenLocation,
): Residence | undefined {
  const residence = citizen.residence;
  if (!residence?.hasResidence) {
    return undefined;
  }
  if (citizen.regionLocationId === residence.regionId) {
    return undefined;
  }
  return { regionId: residence.regionId, countryId: residence.countryId };
}
