import { Zap } from "lucide-react";

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary">
      <Zap className="size-3.5 fill-white text-white" strokeWidth={1.5} />
    </div>
    <span className="text-[17px] leading-none font-semibold tracking-[-0.01em] text-foreground">
      Zap
    </span>
  </div>
);

export default Logo;
