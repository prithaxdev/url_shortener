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
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-[#F1F5F9] border-2 border-[#E2E8F0] flex items-center justify-center mx-auto mb-5">
          <Link2 className="size-8 text-[#94A3B8]" strokeWidth={2} />
        </div>
        <p className="font-display font-bold text-xl text-[#1E293B]">No links yet</p>
        <p className="text-sm text-[#64748B] mt-1.5 font-medium">
          Paste a URL above to get your first short link
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl text-[#1E293B]">Your links</h2>
        <span className="bg-[#8B5CF6]/10 border-2 border-[#8B5CF6] rounded-full px-4 py-1 text-sm font-bold text-[#8B5CF6]">
          {urls.length} {urls.length === 1 ? "link" : "links"}
        </span>
      </div>
      <div className="space-y-4">
        {urls.map((url) => (
          <UrlCard key={url.id} url={url} onDelete={onDelete} onVisit={onVisit} />
        ))}
      </div>
    </div>
  );
});

export default UrlList;
