import type { ShortenedUrl } from "../types";
import { Link2 } from "lucide-react";
import { memo } from "react";
import UrlCard from "./UrlCard";

const UrlList = memo<{
  urls: ShortenedUrl[];
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}>(({ urls, onDelete, onVisit }) => {
  if (urls.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-strong px-6 py-16 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-lg bg-secondary">
          <Link2 className="size-4 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <p className="mt-4 text-base font-medium text-foreground">No links yet</p>
        <p className="mt-1 text-sm text-subtle">
          Paste a URL above to get your first short link
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-xl font-medium text-foreground">Your links</h2>
        <span className="font-mono text-sm text-muted-foreground tabular-nums">
          {urls.length.toLocaleString()} {urls.length === 1 ? "link" : "links"}
        </span>
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
