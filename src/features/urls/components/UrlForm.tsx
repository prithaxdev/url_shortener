import { memo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings2, Zap } from "lucide-react";
import type { UrlCreateOptions, ShortenResult } from "../types";
import { sileo } from "sileo";

const LENGTHS = [4, 6, 8, 10] as const;
type CodeLength = (typeof LENGTHS)[number];

const EXPIRY_OPTIONS = [
  { label: "Never", days: null },
  { label: "1 day", days: 1 },
  { label: "7 days", days: 7 },
  { label: "30 days", days: 30 },
] as const;

const pill =
  "px-3 py-1 rounded-full text-xs font-bold border-2 border-[#1E293B] cursor-pointer transition-all duration-150 select-none";
const pillOn = "bg-[#8B5CF6] text-white shadow-[2px_2px_0px_0px_#1E293B]";
const pillOff = "bg-white text-[#1E293B] hover:bg-[#F1F5F9]";

const UrlForm = memo<{
  onSubmit: (
    url: string,
    options?: UrlCreateOptions,
  ) => Promise<ShortenResult>;
  isLoading: boolean;
}>(({ onSubmit, isLoading }) => {
  const [inputUrl, setInputUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customAlias, setCustomAlias] = useState("");
  const [codeLength, setCodeLength] = useState<CodeLength>(6);
  const [expiryDays, setExpiryDays] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [showUtm, setShowUtm] = useState(false);
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");

  const hasUtm = utmSource || utmMedium || utmCampaign;

  const getExpiresAt = () => {
    if (expiryDays === null) return null;
    const d = new Date();
    d.setDate(d.getDate() + expiryDays);
    return d;
  };

  const handleSubmit = async () => {
    if (!inputUrl.trim() || isLoading) return;

    const options: UrlCreateOptions = {
      customAlias: customAlias.trim() || undefined,
      codeLength: customAlias.trim() ? undefined : codeLength,
      expiresAt: getExpiresAt(),
      note: note.trim() || undefined,
      utmParams: hasUtm
        ? {
            source: utmSource.trim() || undefined,
            medium: utmMedium.trim() || undefined,
            campaign: utmCampaign.trim() || undefined,
          }
        : undefined,
    };

    const result = await onSubmit(inputUrl.trim(), options);

    if (result.success) {
      sileo.success({
        title: "Link zapped!",
        description: `${result.shortUrl} is ready to share`,
      });
      setInputUrl("");
      setCustomAlias("");
      setNote("");
      setUtmSource("");
      setUtmMedium("");
      setUtmCampaign("");
    } else {
      const isAlreadyExists = result.error.includes("already shortened") ||
        result.error.includes("already taken");
      if (isAlreadyExists) {
        sileo.warning({
          title: "Already shortened",
          description: result.error,
        });
      } else {
        sileo.error({
          title: "Couldn't zap that",
          description: result.error,
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Headline */}
      <div>
        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#1E293B]">
          Make your
          <br />
          <span className="text-[#8B5CF6]">links</span> tiny.
        </h1>
        <p className="mt-4 text-base font-medium text-[#64748B] max-w-sm">
          Paste a long URL and get a short, shareable link in seconds. Free. No
          sign-up.
        </p>
      </div>

      {/* Main input row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="url"
          value={inputUrl}
          placeholder="Paste your URL here..."
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputUrl.trim() && !isLoading) {
              handleSubmit();
            }
          }}
          className="flex-1 min-w-0 h-14 sm:h-12 py-4"
        />
        <Button
          onClick={handleSubmit}
          disabled={!inputUrl.trim() || isLoading}
          className="w-full sm:w-auto sm:flex-shrink-0 h-14 sm:h-11"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Zap className="size-4" strokeWidth={2.5} />
              Zap it
            </>
          )}
        </Button>
      </div>

      {/* Advanced options */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#8B5CF6] transition-colors"
        >
          <Settings2 className="size-3.5" strokeWidth={2.5} />
          Advanced options
          <ChevronDown
            className={`size-3.5 transition-transform duration-200 ${showAdvanced ? "rotate-180" : ""}`}
            strokeWidth={2.5}
          />
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 rounded-xl border-2 border-[#1E293B] bg-[#FDFAF0] shadow-[4px_4px_0px_0px_#FBBF24] space-y-4">
            {/* Custom alias */}
            <div>
              <label className="text-xs font-bold text-[#1E293B] mb-1.5 block">
                Custom alias
              </label>
              <div className="flex items-center">
                <span className="px-3 h-10 flex items-center bg-[#F1F5F9] border-2 border-r-0 border-[#1E293B] rounded-l-lg text-xs font-bold text-[#64748B] whitespace-nowrap">
                  zap.io/
                </span>
                <Input
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-link"
                  className="rounded-l-none h-10 text-sm border-l-0 focus-visible:ring-0"
                />
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">
                Letters, numbers, hyphens, underscores · 3–20 chars
              </p>
            </div>

            {/* Code length (hidden when custom alias is set) */}
            {!customAlias.trim() && (
              <div>
                <label className="text-xs font-bold text-[#1E293B] mb-1.5 block">
                  Code length
                </label>
                <div className="flex gap-2">
                  {LENGTHS.map((len) => (
                    <button
                      key={len}
                      type="button"
                      onClick={() => setCodeLength(len)}
                      className={`${pill} ${codeLength === len ? pillOn : pillOff}`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Link expiry */}
            <div>
              <label className="text-xs font-bold text-[#1E293B] mb-1.5 block">
                Link expiry
              </label>
              <div className="flex flex-wrap gap-2">
                {EXPIRY_OPTIONS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setExpiryDays(opt.days)}
                    className={`${pill} ${expiryDays === opt.days ? pillOn : pillOff}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="text-xs font-bold text-[#1E293B] mb-1.5 block">
                Note{" "}
                <span className="text-[#94A3B8] font-medium">
                  (private, for your reference)
                </span>
              </label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's this link for?"
                className="h-10 text-sm"
              />
            </div>

            {/* UTM tracking */}
            <div>
              <button
                type="button"
                onClick={() => setShowUtm((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#8B5CF6] transition-colors"
              >
                UTM tracking
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${showUtm ? "rotate-180" : ""}`}
                  strokeWidth={2.5}
                />
                {hasUtm && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#34D399]/30 border border-[#34D399] text-[10px] font-bold text-[#1E293B]">
                    on
                  </span>
                )}
              </button>

              {showUtm && (
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] mb-1 block uppercase tracking-wide">
                      Source
                    </label>
                    <Input
                      value={utmSource}
                      onChange={(e) => setUtmSource(e.target.value)}
                      placeholder="e.g. twitter"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] mb-1 block uppercase tracking-wide">
                      Medium
                    </label>
                    <Input
                      value={utmMedium}
                      onChange={(e) => setUtmMedium(e.target.value)}
                      placeholder="e.g. social"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#94A3B8] mb-1 block uppercase tracking-wide">
                      Campaign
                    </label>
                    <Input
                      value={utmCampaign}
                      onChange={(e) => setUtmCampaign(e.target.value)}
                      placeholder="e.g. launch"
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default UrlForm;
