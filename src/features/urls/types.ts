interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
  clickCount: number;
  isActive: boolean;
  expiresAt?: Date | null;
  note?: string;
}

interface UrlShortenerState {
  urls: ShortenedUrl[];
  isLoading: boolean;
}

interface UrlCreateOptions {
  customAlias?: string;
  codeLength?: number;
  expiresAt?: Date | null;
  note?: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
  };
}

type ShortenResult =
  | { success: true; shortUrl: string }
  | { success: false; error: string };

export type { ShortenedUrl, UrlShortenerState, UrlCreateOptions, ShortenResult };
