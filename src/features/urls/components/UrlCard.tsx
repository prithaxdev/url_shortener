import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { ShortenedUrl } from "../types";
import { copyToClipboard } from "../utils";
import { toast } from "sonner";
import { BarChart3, Calendar, Copy, ExternalLink, Trash2 } from "lucide-react";
import { memo, useState } from "react";

// Hard shadow cycles through the confetti palette per card
const CARD_STYLES = [
  "border-2 border-[#1E293B] rounded-xl bg-white shadow-[6px_6px_0px_0px_#8B5CF6] hover:shadow-[8px_8px_0px_0px_#8B5CF6] hover:-translate-y-1 hover:-rotate-1",
  "border-2 border-[#1E293B] rounded-xl bg-white shadow-[6px_6px_0px_0px_#F472B6] hover:shadow-[8px_8px_0px_0px_#F472B6] hover:-translate-y-1 hover:rotate-1",
  "border-2 border-[#1E293B] rounded-xl bg-white shadow-[6px_6px_0px_0px_#FBBF24] hover:shadow-[8px_8px_0px_0px_#FBBF24] hover:-translate-y-1 hover:-rotate-1",
] as const;

const BADGE_COLORS = ["#8B5CF6", "#F472B6", "#FBBF24"] as const;

const UrlCard = memo<{
  url: ShortenedUrl;
  onDelete: (id: string) => void;
  onVisit: (id: string) => void;
}>(({ url, onDelete, onVisit }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const colorIndex = url.id.charCodeAt(0) % 3;

  const handleCopy = async () => {
    const success = await copyToClipboard(url.shortUrl);
    if (success) {
      toast.success("Short URL copied to clipboard", {
        description: url.shortUrl,
      });
    } else {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleVisit = () => {
    onVisit(url.id);
    window.open(url.originalUrl, "_blank");
  };

  return (
    <div
      className={`relative p-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${CARD_STYLES[colorIndex]}`}
    >
      {/* Short URL row */}
      <div className="flex items-center justify-between gap-4">
        <code className="font-mono text-base font-bold text-[#8B5CF6] flex-1 truncate">
          {url.shortUrl}
        </code>
        <div className="flex gap-1.5">
          <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy short URL">
            <Copy strokeWidth={2.5} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleVisit} title="Visit original URL">
            <ExternalLink strokeWidth={2.5} />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setOpenConfirm(true)} title="Delete">
            <Trash2 strokeWidth={2.5} />
          </Button>
        </div>
      </div>

      <div className="border-t-2 border-[#E2E8F0] my-3" />

      <p className="text-xs font-medium text-[#64748B] break-all line-clamp-2">
        {url.originalUrl}
      </p>

      <div className="flex items-center justify-between mt-4 text-xs font-semibold text-[#64748B]">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3" strokeWidth={2.5} />
          {new Date(url.createdAt).toLocaleDateString()}
        </span>
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
          toast.success("Link deleted");
        }}
      />
    </div>
  );
});

export default UrlCard;
