export async function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(
  callback: () => T,
  maxRetries: number = 3,
  retryDelayMs: number = 300,
): Promise<T> {
  let retries = 0;
  while (true) {
    try {
      return await callback();
    } catch (error) {
      if (retries >= maxRetries) {
        throw error;
      }
      retries++;
      await waitFor(retryDelayMs);
    }
  }
}
