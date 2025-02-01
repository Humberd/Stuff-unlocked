import { log } from "./utils";

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
      log("Retrying...");
      await waitFor(retryDelayMs);
    }
  }
}

export async function retryNullish<T>(
  callback: () => T | null | undefined,
  maxRetries: number = 3,
  retryDelayMs: number = 300,
): Promise<T> {
  let retries = 0;
  while (true) {
    const result = callback();
    if (result) {
      return result;
    }

    if (retries >= maxRetries) {
      throw new Error("Retries exceeded");
    }
    retries++;
    log("Retrying...");
    await waitFor(retryDelayMs);
  }
}

export async function countTimeSpent<T>(
  callback: () => T,
): Promise<{ result: T; timeSpent: number }> {
  const start = Date.now();
  const result = await callback();
  const end = Date.now();
  return { result, timeSpent: end - start };
}
