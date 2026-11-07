import { CuriousGlobeSticker } from "stick-it-up";
import { Button } from "@/components/ui/button";
import type { ShortPathResult } from "../redirect";

const ShortLinkStatus = ({
  result,
}: {
  result: Exclude<ShortPathResult, { status: "none" }>;
}) => {
  if (result.status === "redirecting") {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <p className="text-sm text-muted-foreground">Opening link</p>
      </main>
    );
  }

  const link = `${window.location.host}/${result.code}`;
  const copy =
    result.status === "expired"
      ? {
          title: "This link has expired",
          body: "Shorten the URL again to get a fresh link.",
        }
      : {
          title: "This link isn't saved in this browser",
          body: "Zap keeps links in the browser that created them, so a short link only opens there.",
        };

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-md animate-rise">
        <span aria-hidden className="mb-6 inline-block animate-pop rotate-6 [animation-delay:200ms]">
          <CuriousGlobeSticker size={72} />
        </span>
        <p className="font-mono text-sm text-muted-foreground">{link}</p>
        <h1 className="mt-3 text-2xl font-medium tracking-[-0.01em] text-foreground">
          {copy.title}
        </h1>
        <p className="mt-2 text-[15px] leading-6 text-subtle">{copy.body}</p>
        <Button asChild className="mt-6">
          <a href="/">Shorten a link</a>
        </Button>
      </div>
    </main>
  );
};

export default ShortLinkStatus;
