import { memo, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { CuriousGlobeSticker, SparklesSticker } from "stick-it-up";
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
import LinkSticker from "./LinkSticker";

const EXAMPLE = {
  originalUrl:
    "https://docs.google.com/document/d/1xQ4mP8vZr2KfT0bW9nYcL3hJ7/edit?usp=sharing&utm_source=newsletter",
  shortUrl: buildShortUrl("Xp4kR2"),
};

// Keep the sticker inside the sheet for long custom aliases
const stickerSize = (length: number) =>
  length <= 16
    ? "text-[22px] sm:text-[28px]"
    : length <= 26
      ? "text-base sm:text-2xl"
      : length <= 32
        ? "text-sm sm:text-xl"
        : "text-xs sm:text-base";

const StickerSheet = memo<{ url?: ShortenedUrl }>(({ url }) => {
  const { originalUrl, shortUrl } = url ?? EXAMPLE;
  const { domain, code } = splitShortUrl(shortUrl);
  const compression = getCompression(originalUrl, shortUrl);
  // On first load the link sticker waits for the sheet; new links stick at once
  const [intro, setIntro] = useState(true);

  const handleCopy = async () => {
    const ok = await copyToClipboard(shortUrl);
    if (ok) {
      toast.success("Short URL copied", {
        description: `${shortUrl} is now on your clipboard`,
      });
    } else {
      toast.error("Copy failed", {
        description:
          "Your browser blocked clipboard access — try selecting the URL manually",
      });
    }
  };

  return (
    <figure className="relative rounded-[20px] border border-border bg-card p-6 shadow-float sm:p-8">
      {/* Stickers already on the sheet */}
      <span
        aria-hidden
        className="absolute -top-10 -right-4 animate-pop rotate-[8deg] [animation-delay:760ms] sm:-right-8"
      >
        <CuriousGlobeSticker size={88} />
      </span>
      <span
        aria-hidden
        className="absolute -bottom-10 -left-8 hidden animate-pop -rotate-12 [animation-delay:880ms] sm:block"
      >
        <SparklesSticker size={76} />
      </span>

      <figcaption className="flex h-5 items-center gap-2 text-sm text-muted-foreground">
        <span>{url ? "Latest link" : "Example"}</span>
        {url && (
          <>
            <span aria-hidden>·</span>
            <span className="font-mono text-xs tabular-nums">
              {formatDate(url.createdAt)}
            </span>
          </>
        )}
      </figcaption>

      <p className="mt-4 line-clamp-2 pr-12 font-mono text-[13px] leading-5 break-all text-subtle">
        {originalUrl}
      </p>

      <div
        key={shortUrl}
        onAnimationEnd={() => setIntro(false)}
        className={cn("mt-8 animate-stick", intro && "[animation-delay:560ms]")}
      >
        <LinkSticker
          className={cn("-rotate-3", stickerSize(domain.length + code.length))}
        >
          <span className="text-white/70">{domain}</span>
          {code}
        </LinkSticker>
      </div>

      <div className="mt-8 flex h-8 items-center justify-between gap-4">
        {compression && (
          <p className="font-mono text-sm text-subtle tabular-nums">
            {compression.from} → {compression.to}
            <span className="ml-2 font-sans text-muted-foreground">
              characters
            </span>
          </p>
        )}
        {url && (
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            <Copy strokeWidth={1.5} />
            Copy
          </Button>
        )}
      </div>
    </figure>
  );
});

export default StickerSheet;
