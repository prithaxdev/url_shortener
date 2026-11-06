import { memo } from "react";
import { Copy, Scissors } from "lucide-react";
import { sileo } from "sileo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ShortenedUrl } from "../types";
import {
  buildShortUrl,
  copyToClipboard,
  formatDate,
  getCompression,
  splitShortUrl,
} from "../utils";

const EXAMPLE = {
  originalUrl:
    "https://docs.google.com/document/d/1xQ4mP8vZr2KfT0bW9nYcL3hJ7/edit?usp=sharing&utm_source=newsletter",
  shortUrl: buildShortUrl("Xp4kR2"),
};

// Keep the tape inside the card for long custom aliases
const tapeSize = (length: number) =>
  length <= 16
    ? "text-[22px] sm:text-[28px]"
    : length <= 26
      ? "text-base sm:text-2xl"
      : length <= 32
        ? "text-sm sm:text-xl"
        : "text-xs sm:text-base";

const LinkLabel = memo<{ url?: ShortenedUrl }>(({ url }) => {
  const { originalUrl, shortUrl } = url ?? EXAMPLE;
  const { domain, code } = splitShortUrl(shortUrl);
  const compression = getCompression(originalUrl, shortUrl);

  const handleCopy = async () => {
    const ok = await copyToClipboard(shortUrl);
    if (ok) {
      sileo.success({
        title: "Short URL copied",
        description: `${shortUrl} is now on your clipboard`,
      });
    } else {
      sileo.error({
        title: "Copy failed",
        description:
          "Your browser blocked clipboard access — try selecting the URL manually",
      });
    }
  };

  return (
    <figure className="rounded-2xl border border-border bg-card p-6 shadow-float">
      <figcaption className="flex h-5 items-center justify-between text-xs text-muted-foreground">
        <span>{url ? "Latest link" : "Example"}</span>
        {url && (
          <span className="font-mono tabular-nums">
            {formatDate(url.createdAt)}
          </span>
        )}
      </figcaption>

      <p className="mt-4 line-clamp-3 font-mono text-[13px] leading-5 break-all text-subtle">
        {originalUrl}
      </p>

      <div
        aria-hidden
        className="mt-5 flex items-center gap-2 text-muted-foreground"
      >
        <Scissors className="size-4" strokeWidth={1.5} />
        <div className="flex-1 border-t border-dashed border-border-strong" />
      </div>

      <div key={shortUrl} className="mt-6 -ml-9 animate-rise sm:mt-8">
        <div className="label-tape-shadow inline-block max-w-full -rotate-2">
          <span className={cn("label-tape", tapeSize(domain.length + code.length))}>
            <span className="opacity-70">{domain}</span>
            {code}
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-8 items-center justify-between gap-4 sm:mt-8">
        {compression && (
          <p className="font-mono text-sm text-subtle tabular-nums">
            {compression.from} → {compression.to}
            <span className="ml-2 font-sans text-muted-foreground">
              characters
            </span>
          </p>
        )}
        {url && (
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            <Copy strokeWidth={1.5} />
            Copy
          </Button>
        )}
      </div>
    </figure>
  );
});

export default LinkLabel;
