import type { ShortenedUrl } from "../types";
import { CatSeriousSticker } from "stick-it-up";
import { memo } from "react";
import UrlCard from "./UrlCard";

const UrlList = memo<{
  urls: ShortenedUrl[];
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}>(({ urls, onDelete, onVisit }) => {
  if (urls.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
        <span aria-hidden className="inline-block animate-pop -rotate-6 [animation-delay:760ms]">
          <CatSeriousSticker size={72} />
        </span>
        <p className="mt-4 text-base font-medium text-foreground">No links yet</p>
        <p className="mt-1 text-sm text-subtle">
          Paste a URL above to print your first sticker
        </p>
      </div>
    );
  }

  const totalClicks = urls.reduce((sum, u) => sum + u.clickCount, 0);

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-medium text-foreground">Your links</h2>
        <p className="font-mono text-sm text-muted-foreground tabular-nums">
          {urls.length.toLocaleString()} {urls.length === 1 ? "link" : "links"}
          <span aria-hidden className="mx-2">·</span>
          {totalClicks.toLocaleString()} {totalClicks === 1 ? "click" : "clicks"}
        </p>
      </div>
      <div className="space-y-3">
        {urls.map((url) => (
          <UrlCard key={url.id} url={url} onDelete={onDelete} onVisit={onVisit} />
        ))}
      </div>
    </div>
  );
});

export default UrlList;
