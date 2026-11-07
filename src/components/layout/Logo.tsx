import { Zap } from "lucide-react";

// The mark is a tiny violet sticker, same die-cut as the short links
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="flex size-7 shrink-0 -rotate-6 items-center justify-center rounded-lg border-2 border-white bg-vinyl shadow-[0_1px_1px_rgb(28_27_31/0.18),0_2px_4px_rgb(28_27_31/0.1)]">
      <Zap className="size-3.5 fill-white text-white" strokeWidth={1.5} />
    </div>
    <span className="text-lg leading-none font-semibold tracking-[-0.01em] text-foreground">
      Zap
    </span>
  </div>
);

export default Logo;
