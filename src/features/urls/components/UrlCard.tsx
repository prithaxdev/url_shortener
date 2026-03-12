import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { ShortenedUrl } from "../types";
import { copyToClipboard } from "../utils";
import { sileo } from "sileo";
import {
  BarChart3,
  Calendar,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Trash2,
} from "lucide-react";
import { memo, useState } from "react";

const CARD_STYLES = [
  "border-2 border-[#1E293B] rounded-xl bg-white shadow-[6px_6px_0px_0px_#8B5CF6] hover:shadow-[8px_8px_0px_0px_#8B5CF6] hover:-translate-y-1 hover:-rotate-1",
  "border-2 border-[#1E293B] rounded-xl bg-white shadow-[6px_6px_0px_0px_#F472B6] hover:shadow-[8px_8px_0px_0px_#F472B6] hover:-translate-y-1 hover:rotate-1",
  "border-2 border-[#1E293B] rounded-xl bg-white shadow-[6px_6px_0px_0px_#FBBF24] hover:shadow-[8px_8px_0px_0px_#FBBF24] hover:-translate-y-1 hover:-rotate-1",
] as const;

const BADGE_COLORS = ["#8B5CF6", "#F472B6", "#FBBF24"] as const;

const getExpiryInfo = (expiresAt?: Date | null) => {
  if (!expiresAt) return null;
  const now = new Date();
  const exp = new Date(expiresAt);
  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / 86400000);
  if (diffDays <= 0)
    return { expired: true, label: "Expired", color: "#F472B6" };
  if (diffDays <= 3)
    return { expired: false, label: `Expires in ${diffDays}d`, color: "#FBBF24" };
  return {
    expired: false,
    label: `Expires ${exp.toLocaleDateString()}`,
    color: "#34D399",
  };
};

const UrlCard = memo<{
  url: ShortenedUrl;
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}>(({ url, onDelete, onVisit }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const colorIndex = url.id.charCodeAt(0) % 3;
  const expiryInfo = getExpiryInfo(url.expiresAt);
  const isExpired = expiryInfo?.expired ?? false;

  const handleCopy = async () => {
    const ok = await copyToClipboard(url.shortUrl);
    if (ok) {
      sileo.success({
        title: "Short URL copied",
        description: `${url.shortUrl} is now on your clipboard`,
      });
    } else {
      sileo.error({
        title: "Copy failed",
        description: "Your browser blocked clipboard access — try selecting the URL manually",
      });
    }
  };

  const handleCopyOriginal = async () => {
    const ok = await copyToClipboard(url.originalUrl);
    if (ok) {
      sileo.info({
        title: "Original URL copied",
        description: "Full destination link is on your clipboard",
      });
    }
  };

  const handleVisit = () => {
    if (isExpired) {
      sileo.warning({
        title: "This link has expired",
        description: "Shorten the URL again to get a fresh active link",
      });
      return;
    }
    onVisit(url.id);
    window.open(url.originalUrl, "_blank");
  };

  return (
    <div
      className={`relative p-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isExpired ? "opacity-60" : ""} ${CARD_STYLES[colorIndex]}`}
    >
      {/* Short URL row */}
      <div className="flex items-center justify-between gap-4">
        <code className="font-mono text-base font-bold text-[#8B5CF6] flex-1 truncate">
          {url.shortUrl}
        </code>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            title="Copy short URL"
          >
            <Copy strokeWidth={2.5} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleVisit}
            title="Visit original URL"
          >
            <ExternalLink strokeWidth={2.5} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenConfirm(true)}
            title="Delete"
          >
            <Trash2 strokeWidth={2.5} />
          </Button>
        </div>
      </div>

      <div className="border-t-2 border-[#E2E8F0] my-3" />

      {/* Original URL + copy button */}
      <div className="flex items-start gap-2">
        <p className="text-xs font-medium text-[#64748B] break-all line-clamp-2 flex-1">
          {url.originalUrl}
        </p>
        <button
          onClick={handleCopyOriginal}
          title="Copy original URL"
          className="flex-shrink-0 p-1 rounded hover:bg-[#F1F5F9] transition-colors"
        >
          <Copy className="size-3 text-[#94A3B8]" strokeWidth={2} />
        </button>
      </div>

      {/* Note */}
      {url.note && (
        <div className="mt-2 flex items-start gap-1.5 bg-[#F8FAFC] rounded-lg px-2.5 py-2 border border-[#E2E8F0]">
          <FileText
            className="size-3 text-[#94A3B8] flex-shrink-0 mt-0.5"
            strokeWidth={2}
          />
          <p className="text-xs text-[#64748B] font-medium">{url.note}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 flex-wrap gap-2 text-xs font-semibold text-[#64748B]">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3" strokeWidth={2.5} />
            {new Date(url.createdAt).toLocaleDateString()}
          </span>
          {expiryInfo && (
            <span
              className="flex items-center gap-1 rounded-full px-2.5 py-0.5 border-2 border-[#1E293B] font-bold text-[10px]"
              style={{
                backgroundColor: `${expiryInfo.color}30`,
                color: expiryInfo.expired ? "#F472B6" : "#1E293B",
              }}
            >
              <Clock className="size-2.5" strokeWidth={2.5} />
              {expiryInfo.label}
            </span>
          )}
        </div>
        <span
          className="flex items-center gap-1.5 rounded-full px-3 py-1 border-2 border-[#1E293B] text-[#1E293B] font-bold text-xs"
          style={{ backgroundColor: `${BADGE_COLORS[colorIndex]}30` }}
        >
          <BarChart3 className="size-3" strokeWidth={2.5} />
          {url.clickCount} {url.clickCount === 1 ? "click" : "clicks"}
        </span>
      </div>

      <ConfirmDialog
        open={openConfirm}
        onOpenChange={setOpenConfirm}
        title="Delete this link?"
        description={`This will permanently remove ${url.shortUrl}. Can't be undone.`}
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          onDelete(url.id);
          sileo.success({
            title: "Link permanently deleted",
            description: `${url.shortUrl} has been removed from your list`,
          });
        }}
      />
    </div>
  );
});

export default UrlCard;
