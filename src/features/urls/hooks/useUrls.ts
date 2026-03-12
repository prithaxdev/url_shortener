import type { ShortenedUrl, UrlCreateOptions, ShortenResult } from "../types";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  buildUtmUrl,
  formatUrl,
  generateShortCode,
  validateAlias,
  validateUrl,
} from "../utils";

const useUrls = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storedUrls, setStoredUrls] = useLocalStorage<ShortenedUrl[]>(
    "shortened-urls",
    [],
  );
  const [urls, setUrls] = useState<ShortenedUrl[]>(storedUrls);

  useEffect(() => {
    setUrls(storedUrls);
  }, [storedUrls]);

  const shortenUrl = useCallback(
    async (
      originalUrl: string,
      options?: UrlCreateOptions,
    ): Promise<ShortenResult> => {
      setIsLoading(true);
      try {
        const formattedUrl = formatUrl(originalUrl);

        if (!validateUrl(formattedUrl)) {
          return {
            success: false,
            error:
              "That doesn't look like a real URL — try something like https://example.com",
          };
        }

        const finalUrl = options?.utmParams
          ? buildUtmUrl(formattedUrl, options.utmParams)
          : formattedUrl;

        const existing = storedUrls.find((u) => u.originalUrl === finalUrl);
        if (existing) {
          return {
            success: false,
            error: `This URL was already shortened — find it in your links below`,
          };
        }

        let shortCode: string;
        if (options?.customAlias?.trim()) {
          const alias = options.customAlias.trim();
          if (!validateAlias(alias)) {
            return {
              success: false,
              error:
                "Alias must be 3–20 characters using only letters, numbers, hyphens, or underscores",
            };
          }
          if (storedUrls.some((u) => u.shortCode === alias)) {
            return {
              success: false,
              error: `"${alias}" is already taken — pick a different alias`,
            };
          }
          shortCode = alias;
        } else {
          shortCode = generateShortCode(options?.codeLength ?? 6);
        }

        const shortUrl = `https://zap.io/${shortCode}`;
        const newUrl: ShortenedUrl = {
          id: Date.now().toString(),
          originalUrl: finalUrl,
          shortUrl,
          shortCode,
          createdAt: new Date(),
          clickCount: 0,
          isActive: true,
          expiresAt: options?.expiresAt ?? null,
          note: options?.note?.trim() || undefined,
        };

        setStoredUrls([newUrl, ...storedUrls]);
        return { success: true, shortUrl };
      } finally {
        setIsLoading(false);
      }
    },
    [storedUrls, setStoredUrls],
  );

  const deleteUrl = useCallback(
    (id: string) => {
      setStoredUrls(storedUrls.filter((url) => url.id !== id));
    },
    [storedUrls, setStoredUrls],
  );

  const incrementClickCount = useCallback(
    (id: string) => {
      setStoredUrls(
        storedUrls.map((url) =>
          url.id === id ? { ...url, clickCount: url.clickCount + 1 } : url,
        ),
      );
    },
    [storedUrls, setStoredUrls],
  );

  return { urls, isLoading, shortenUrl, deleteUrl, incrementClickCount };
};

export default useUrls;
