const generateShortCode = (length: number = 6): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const validateUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    const host = parsed.hostname;
    if (host === "localhost") return true;
    // IP address
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return true;
    // Must have a dot and a TLD of at least 2 chars (rejects bare words like "hello")
    const parts = host.split(".");
    if (parts.length < 2) return false;
    return parts[parts.length - 1].length >= 2;
  } catch {
    return false;
  }
};

const formatUrl = (url: string): string => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const validateAlias = (alias: string): boolean => {
  return /^[a-zA-Z0-9-_]{3,20}$/.test(alias);
};

const buildUtmUrl = (
  url: string,
  params: { source?: string; medium?: string; campaign?: string },
): string => {
  if (!params.source && !params.medium && !params.campaign) return url;
  const u = new URL(url);
  if (params.source) u.searchParams.set("utm_source", params.source);
  if (params.medium) u.searchParams.set("utm_medium", params.medium);
  if (params.campaign) u.searchParams.set("utm_campaign", params.campaign);
  return u.toString();
};

export {
  generateShortCode,
  validateUrl,
  formatUrl,
  copyToClipboard,
  validateAlias,
  buildUtmUrl,
};
