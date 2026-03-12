import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FFFDF5] border-t-2 border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Wordmark — mirrors the header exactly */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#8B5CF6] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] flex items-center justify-center flex-shrink-0">
            <Zap className="size-4 text-white" strokeWidth={2.5} fill="white" />
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-[#1E293B] leading-none">
            ZAP
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs font-medium text-[#64748B]">
          © 2026 Zap. Links stored locally in your browser.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
