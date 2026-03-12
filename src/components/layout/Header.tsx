import { Zap } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-[#FFFDF5] border-b-2 border-[#E2E8F0] sticky top-0 z-50">
      <nav
        aria-label="main"
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#8B5CF6] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] flex items-center justify-center flex-shrink-0">
            <Zap className="size-4 text-white" strokeWidth={2.5} fill="white" />
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-[#1E293B] leading-none">
            ZAP
          </span>
        </div>

        {/* Right: confetti dots + tagline */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <div className="w-2 h-2 rounded-full bg-[#F472B6]" />
            <div className="w-2 h-2 rounded-full bg-[#FBBF24]" />
          </div>
          <span className="hidden sm:block text-xs font-bold text-[#94A3B8] tracking-wider uppercase">
            Free URL Shortener
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
