/** Returns the last path segment of a URL, e.g. a citizen id from a profile link. */
export function lastPathSegment(url: string): string {
  return url.split("/").at(-1) ?? "";
}
