const WARN_PATH = "/main/warn/";

/** Requests after which the game doesn't add links, so there is nothing to rewrite. */
export const LINK_ADDING_REQUEST_PATTERN =
  /^(?!.*(?:\/eat|\/inventory|\/campaigns))/;

/**
 * The page a `/main/warn/{base64}` link warns about. Only web pages are
 * returned, so that a player's post can't smuggle a `javascript:` link in.
 */
export function decodeWarnUrl(href: string): string | undefined {
  const encoded = href.split(WARN_PATH)[1];
  if (!encoded) {
    return undefined;
  }

  let target: string;
  try {
    const binary = atob(decodeURIComponent(encoded));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    target = new TextDecoder().decode(bytes);
  } catch {
    return undefined;
  }

  return /^https?:\/\//i.test(target) ? target : undefined;
}
