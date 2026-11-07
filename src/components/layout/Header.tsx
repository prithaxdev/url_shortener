import { Github, Star } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const REPO = "prithaxdev/url_shortener";
const STARS_KEY = "zap-github-stars";

const cachedStars = () => {
  try {
    const n = Number(localStorage.getItem(STARS_KEY));
    return Number.isFinite(n) && n > 0 ? n : null;
  } catch {
    return null;
  }
};

const GitHubStars = () => {
  // Last known count renders instantly; the fetch only refreshes it
  const [stars, setStars] = useState<number | null>(cachedStars);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${REPO}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count !== "number") return;
        setStars(d.stargazers_count);
        try {
          localStorage.setItem(STARS_KEY, String(d.stargazers_count));
        } catch {
          // Storage blocked, the count just won't be cached
        }
      })
      .catch(() => {});
  }, []);

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Zap on GitHub"
      className="flex h-8 items-center gap-2 rounded-lg border border-input bg-card px-3 text-sm font-medium text-foreground shadow-raised transition-colors duration-150 ease-snap hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Github className="size-4 text-muted-foreground" strokeWidth={1.5} />
      GitHub
      {/* Always rendered with room for the count, so the header never shifts */}
      <span className="flex items-center gap-1 border-l border-border pl-2 font-mono text-xs text-subtle tabular-nums">
        <Star className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
        <span className="min-w-[2ch]">
          {stars?.toLocaleString()}
        </span>
      </span>
    </a>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav
        aria-label="main"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
      >
        <Logo />
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted-foreground sm:block">
            Free URL shortener
          </span>
          <GitHubStars />
        </div>
      </nav>
    </header>
  );
};

export default Header;
