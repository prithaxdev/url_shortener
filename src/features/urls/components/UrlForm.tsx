import { Alert } from "@/components/ui/alert";
import React, { memo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const UrlForm = memo<{
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
  onClearError: () => void;
}>(({ onSubmit, isLoading, error, onClearError }) => {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = () => {
    if (inputUrl.trim()) {
      onSubmit(inputUrl.trim());
      setInputUrl("");
    }
  };

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(onClearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, onClearError]);

  return (
    <div className="space-y-8">
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

      {error && (
        <Alert variant="destructive">
          <div className="text-sm font-semibold col-start-1 col-span-2">
            {error}
          </div>
        </Alert>
      )}

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
    </div>
  );
});

export default UrlForm;
