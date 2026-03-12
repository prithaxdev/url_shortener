import type { ShortenedUrl, UrlShortenerState } from "../types";
import { useCallback, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { formatUrl, generateShortCode, validateUrl } from "../utils";

const useUrls = () => {
  const [state, setState] = useState<UrlShortenerState>({
    urls: [],
    isLoading: false,
    error: null,
  });

  const [storedUrls, setStoredUrls] = useLocalStorage<ShortenedUrl[]>(
    "shortened-urls",
    [],
  );

  useEffect(() => {
    setState((prev) => ({ ...prev, urls: storedUrls }));
  }, [storedUrls]);

  const shortenUrl = useCallback(
    async (originalUrl: string): Promise<void> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const formattedUrl = formatUrl(originalUrl);

        if (!validateUrl(formattedUrl)) {
          throw new Error("Please enter a valid URL");
        }

        const existingUrl = storedUrls.find(
          (url) => url.originalUrl === formattedUrl,
        );

        if (existingUrl) {
          throw new Error("This URL has already been shortened");
        }

        const shortCode = generateShortCode();
        const shortUrl = `https://zap.io/${shortCode}`;

        const newUrl: ShortenedUrl = {
          id: Date.now().toString(),
          originalUrl: formattedUrl,
          shortUrl,
          shortCode,
          createdAt: new Date(),
          clickCount: 0,
          isActive: true,
        };

        setStoredUrls([newUrl, ...storedUrls]);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
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

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return { state, shortenUrl, deleteUrl, incrementClickCount, clearError };
};

export default useUrls;
