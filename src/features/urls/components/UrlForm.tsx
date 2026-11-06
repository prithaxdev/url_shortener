import { memo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
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

const fieldLabel = "mb-2 block text-[13px] font-medium text-foreground";
const disclosure =
  "-ml-2 inline-flex h-8 items-center gap-2 rounded-md px-2 text-sm text-subtle transition-colors duration-150 ease-snap hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const Segmented = <T,>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) => (
  <div
    role="radiogroup"
    aria-label={label}
    className="inline-flex flex-wrap rounded-lg bg-secondary p-0.5"
  >
    {options.map((opt) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.label}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt.value)}
          className={cn(
            "h-8 min-w-10 rounded-md px-3 text-[13px] font-medium tabular-nums transition-[color,background-color,box-shadow] duration-150 ease-snap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active
              ? "bg-card text-foreground shadow-[0_1px_2px_rgb(31_27_22/0.08),0_0_0_1px_rgb(31_27_22/0.06)]"
              : "text-subtle hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

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
        title: "Link zapped",
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
    <div>
      <h1 className="text-[40px] leading-[1.08] font-medium tracking-[-0.02em] text-balance text-foreground sm:text-5xl lg:text-[56px] lg:tracking-[-0.03em]">
        Make your links tiny
      </h1>
      <p className="mt-4 max-w-[28rem] text-lg leading-7 text-subtle">
        Paste a long URL and get a short link you can share. Free, no sign-up,
        saved in your browser.
      </p>

      {/* Main input row */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Input
          type="url"
          value={inputUrl}
          aria-label="Long URL"
          placeholder="Paste a long URL"
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputUrl.trim() && !isLoading) {
              handleSubmit();
            }
          }}
          className="h-12 w-full min-w-0 px-4 text-[15px] sm:flex-1"
        />
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!inputUrl.trim() || isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <div className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <Zap strokeWidth={1.5} />
          )}
          Zap it
        </Button>
      </div>

      {/* Advanced options */}
      <div className="mt-4">
        <button
          type="button"
          aria-expanded={showAdvanced}
          onClick={() => setShowAdvanced((v) => !v)}
          className={disclosure}
        >
          <SlidersHorizontal className="size-4 text-muted-foreground" strokeWidth={1.5} />
          Advanced options
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200 ease-snap",
              showAdvanced && "rotate-180",
            )}
            strokeWidth={1.5}
          />
        </button>

        {showAdvanced && (
          <div className="mt-2 grid animate-dialog-in gap-5 rounded-xl border border-border bg-card p-5 shadow-raised">
            {/* Custom alias */}
            <div>
              <label htmlFor="alias" className={fieldLabel}>
                Custom alias
              </label>
              <div className="flex h-10 items-center rounded-lg border border-input bg-card transition-[border-color,box-shadow] duration-150 ease-snap focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/12">
                <span className="pl-3 font-mono text-sm text-muted-foreground">
                  zap.io/
                </span>
                <input
                  id="alias"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="my-link"
                  className="h-full min-w-0 flex-1 bg-transparent pr-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Letters, numbers, hyphens and underscores, 3–20 characters
              </p>
            </div>

            {/* Code length (hidden when custom alias is set) */}
            {!customAlias.trim() && (
              <div>
                <span className={fieldLabel}>Code length</span>
                <Segmented
                  label="Code length"
                  options={LENGTHS.map((len) => ({ label: String(len), value: len }))}
                  value={codeLength}
                  onChange={setCodeLength}
                />
              </div>
            )}

            {/* Link expiry */}
            <div>
              <span className={fieldLabel}>Link expiry</span>
              <Segmented
                label="Link expiry"
                options={EXPIRY_OPTIONS.map((opt) => ({ label: opt.label, value: opt.days }))}
                value={expiryDays}
                onChange={setExpiryDays}
              />
            </div>

            {/* Note */}
            <div>
              <label htmlFor="note" className={fieldLabel}>
                Note
                <span className="ml-2 font-normal text-muted-foreground">
                  Only visible to you
                </span>
              </label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's this link for?"
              />
            </div>

            {/* UTM tracking */}
            <div className="border-t border-border pt-4">
              <button
                type="button"
                aria-expanded={showUtm}
                onClick={() => setShowUtm((v) => !v)}
                className={disclosure}
              >
                UTM tracking
                {hasUtm && <span className="text-xs text-primary">On</span>}
                <ChevronDown
                  className={cn(
                    "size-4 text-muted-foreground transition-transform duration-200 ease-snap",
                    showUtm && "rotate-180",
                  )}
                  strokeWidth={1.5}
                />
              </button>

              {showUtm && (
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {(
                    [
                      ["utm-source", "Source", utmSource, setUtmSource, "twitter"],
                      ["utm-medium", "Medium", utmMedium, setUtmMedium, "social"],
                      ["utm-campaign", "Campaign", utmCampaign, setUtmCampaign, "launch"],
                    ] as const
                  ).map(([id, label, value, setValue, example]) => (
                    <div key={id}>
                      <label htmlFor={id} className="mb-2 block text-xs text-subtle">
                        {label}
                      </label>
                      <Input
                        id={id}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={example}
                      />
                    </div>
                  ))}
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
