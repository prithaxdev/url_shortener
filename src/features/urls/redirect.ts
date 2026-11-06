import type { ShortenedUrl } from "./types";
import { validateUrl } from "./utils";

type ShortPathResult =
  | { status: "none" }
  | { status: "redirecting" }
  | { status: "missing"; code: string }
  | { status: "expired"; code: string };

const STORAGE_KEY = "shortened-urls";

// Links only exist in this browser's localStorage, so /{code} is resolved
// here before the app renders
const resolveShortPath = (): ShortPathResult => {
  const code = decodeURIComponent(window.location.pathname)
    .replace(/^\/+|\/+$/g, "");
  if (!code) return { status: "none" };

  let urls: ShortenedUrl[] = [];
  try {
    urls = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    urls = [];
  }

  const match = urls.find((url) => url.shortCode === code);
  if (!match || !validateUrl(match.originalUrl)) {
    return { status: "missing", code };
  }
  if (match.expiresAt && new Date(match.expiresAt).getTime() <= Date.now()) {
    return { status: "expired", code };
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        urls.map((url) =>
          url.id === match.id ? { ...url, clickCount: url.clickCount + 1 } : url,
        ),
      ),
    );
  } catch {
    // Counting the click is best effort; still follow the link
  }
  window.location.replace(match.originalUrl);
  return { status: "redirecting" };
};

export { resolveShortPath };
export type { ShortPathResult };
