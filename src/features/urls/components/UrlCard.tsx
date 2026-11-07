import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { cn } from "@/lib/utils";
import type { ShortenedUrl } from "../types";
import {
  copyToClipboard,
  formatDate,
  getCompression,
  splitShortUrl,
} from "../utils";
import { toast } from "sonner";
import { Copy, ExternalLink, StickyNote, Trash2 } from "lucide-react";
import { memo, useState } from "react";
import LinkSticker from "./LinkSticker";

const getExpiryInfo = (expiresAt?: Date | null) => {
  if (!expiresAt) return null;
  const exp = new Date(expiresAt);
  const diffDays = Math.ceil((exp.getTime() - Date.now()) / 86400000);
  if (diffDays <= 0)
    return { expired: true, label: "Expired", className: "text-destructive" };
  if (diffDays <= 3)
    return {
      expired: false,
      label: `Expires in ${diffDays} ${diffDays === 1 ? "day" : "days"}`,
      className: "text-warning",
    };
  return { expired: false, label: `Expires ${formatDate(exp)}`, className: "" };
};

const UrlCard = memo<{
  url: ShortenedUrl;
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}>(({ url, onDelete, onVisit }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const expiryInfo = getExpiryInfo(url.expiresAt);
  const isExpired = expiryInfo?.expired ?? false;
  const { domain, code } = splitShortUrl(url.shortUrl);
  const compression = getCompression(url.originalUrl, url.shortUrl);

  const handleCopy = async () => {
    const ok = await copyToClipboard(url.shortUrl);
    if (ok) {
      toast.success("Short URL copied", {
        description: `${url.shortUrl} is now on your clipboard`,
      });
    } else {
      toast.error("Copy failed", {
        description:
          "Your browser blocked clipboard access — try selecting the URL manually",
      });
    }
  };

  const handleCopyOriginal = async () => {
    const ok = await copyToClipboard(url.originalUrl);
    if (ok) {
      toast.info("Original URL copied", {
        description: "Full destination link is on your clipboard",
      });
    }
  };

  const handleVisit = () => {
    if (isExpired) {
      toast.warning("This link has expired", {
        description: "Shorten the URL again to get a fresh active link",
      });
      return;
    }
    onVisit(url.id);
    window.open(url.originalUrl, "_blank");
  };

  const meta = [
    { key: "created", label: formatDate(url.createdAt), className: "" },
    expiryInfo && { key: "expiry", label: expiryInfo.label, className: expiryInfo.className },
    compression && {
      key: "chars",
      label: `${compression.from} → ${compression.to} chars`,
      className: "",
    },
  ].filter((item) => !!item);

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-raised transition-[border-color,box-shadow] duration-150 ease-snap hover:border-border-strong hover:shadow-float">
      <div className="flex items-center gap-4">
        <p className="flex min-w-0 flex-1 items-center gap-1 font-mono text-[15px] leading-8">
          <span className="hidden truncate text-muted-foreground sm:inline">{domain}</span>
          <LinkSticker size="sm" faded={isExpired} className="shrink-0 -rotate-2">
            {code}
          </LinkSticker>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            title="Copy short URL"
            aria-label="Copy short URL"
            className="mr-1"
          >
            <Copy strokeWidth={1.5} />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVisit}
            title="Visit original URL"
            aria-label="Visit original URL"
          >
            <ExternalLink strokeWidth={1.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenConfirm(true)}
            title="Delete"
            aria-label="Delete link"
            className="hover:bg-destructive/8 hover:text-destructive"
          >
            <Trash2 strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-1">
        <p className="truncate text-sm text-subtle" title={url.originalUrl}>
          {url.originalUrl}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopyOriginal}
          title="Copy original URL"
          aria-label="Copy original URL"
          className="size-7 shrink-0"
        >
          <Copy strokeWidth={1.5} />
        </Button>
      </div>

      {url.note && (
        <p className="mt-2 flex items-center gap-2 text-sm text-subtle">
          <StickyNote className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
          {url.note}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border pt-4 font-mono text-xs text-muted-foreground tabular-nums">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {meta.map((item, i) => (
            <span key={item.key} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>·</span>}
              <span className={cn(item.className)}>{item.label}</span>
            </span>
          ))}
        </p>
        <span className="text-subtle">
          {url.clickCount.toLocaleString()} {url.clickCount === 1 ? "click" : "clicks"}
        </span>
      </div>

      <ConfirmDialog
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title="Delete this link?"
        description={`${domain}${code} will be removed from this browser. This can't be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          onDelete(url.id);
          toast.success("Link deleted", {
            description: `${url.shortUrl} has been removed from your list`,
          });
        }}
      />
    </article>
  );
});

export default UrlCard;
