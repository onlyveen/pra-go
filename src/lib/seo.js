export const SITE_URL = "https://praveengorakala.com";

export function absoluteUrl(path) {
  return new URL(path, SITE_URL).toString();
}
