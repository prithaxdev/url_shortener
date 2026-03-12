interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  createdAt: Date;
  clickCount: number;
  isActive: boolean;
}

interface UrlShortenerState {
  urls: ShortenedUrl[];
  isLoading: boolean;
  error: string | null;
}

export type { ShortenedUrl, UrlShortenerState };
