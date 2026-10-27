/** The `unlocked` section of `contributors.json`. */
export interface DonatorsData {
  donatorLevels: Record<string, { minimalDonation: number; borderUrl: string }>;
  donators: Record<string, { donations: number[]; customBorderUrl?: string }>;
}

/**
 * Maps the player id of every donator to the url of their avatar border:
 * their custom border, or the one of the highest level their donations reach.
 */
export function getDonatorBorderUrls(data: DonatorsData): Map<string, string> {
  const levels = Object.values(data.donatorLevels).sort(
    (a, b) => a.minimalDonation - b.minimalDonation,
  );

  const borderUrls = new Map<string, string>();
  for (const [playerId, donator] of Object.entries(data.donators)) {
    if (donator.customBorderUrl) {
      borderUrls.set(playerId, donator.customBorderUrl);
      continue;
    }
    const totalDonations = donator.donations.reduce((a, b) => a + b, 0);
    const level = levels
      .filter((level) => totalDonations >= level.minimalDonation)
      .at(-1);
    if (level) {
      borderUrls.set(playerId, level.borderUrl);
    }
  }
  return borderUrls;
}
