import { Github, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const REPO = "prithaxdev/url_shortener";

const GitHubStars = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count ?? null))
      .catch(() => {});
  }, []);

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 border-[#1E293B] bg-[#FFFDF5] shadow-[2px_2px_0px_0px_#1E293B] hover:shadow-[3px_3px_0px_0px_#1E293B] hover:-translate-y-0.5 transition-all duration-150 text-[#1E293B] font-bold text-xs"
    >
      <Github className="size-3.5" strokeWidth={2.5} />
      {stars !== null && (
        <>
          <Star className="size-3 fill-[#FBBF24] text-[#FBBF24]" />
          <span>{stars.toLocaleString()}</span>
        </>
      )}
    </a>
  );
};

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

        {/* Right: GitHub stars + confetti dots + tagline */}
        <div className="flex items-center gap-3">
          <GitHubStars />
          <div className="hidden sm:flex items-center gap-2.5">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              <div className="w-2 h-2 rounded-full bg-[#F472B6]" />
              <div className="w-2 h-2 rounded-full bg-[#FBBF24]" />
            </div>
            <span className="text-xs font-bold text-[#94A3B8] tracking-wider uppercase">
              Free URL Shortener
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
