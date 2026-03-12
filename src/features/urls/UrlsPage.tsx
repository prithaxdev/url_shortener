import useUrls from "./hooks/useUrls";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

const UrlsPage = () => {
  const { urls, isLoading, shortenUrl, deleteUrl, incrementClickCount } =
    useUrls();

  const totalClicks = urls.reduce((sum, u) => sum + u.clickCount, 0);

  return (
    <main className="flex-1">
      {/* ── HERO ── */}
      <section className="border-b-2 border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:min-h-[580px]">
          {/* Left: form panel over a giant amber circle */}
          <div className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-12 lg:py-24 flex items-center">
            {/* Decorative amber circle */}
            <div
              className="absolute -left-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
              style={{ backgroundColor: "#FBBF2420" }}
            />
            {/* Floating confetti */}
            <div className="absolute top-10 right-12 w-5 h-5 rounded-full bg-[#8B5CF6]/30 border border-[#8B5CF6] pointer-events-none" />
            <div className="absolute bottom-16 right-8 w-4 h-4 bg-[#F472B6]/40 border border-[#F472B6] rounded-sm pointer-events-none" />
            <div className="absolute top-1/3 right-4 w-3 h-3 rounded-full bg-[#34D399]/50 pointer-events-none" />

            <div className="relative z-10 w-full">
              <UrlForm onSubmit={shortenUrl} isLoading={isLoading} />
            </div>
          </div>

          {/* Right: dot grid + ZAP circle + confetti (desktop only) */}
          <div
            className="hidden lg:flex relative overflow-hidden items-center justify-center border-l-2 border-[#E2E8F0]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #CBD5E1 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
              backgroundColor: "#FFFDF5",
            }}
          >
            {/* Main ZAP circle badge */}
            <div className="w-52 h-52 rounded-full bg-[#8B5CF6] border-2 border-[#1E293B] shadow-[8px_8px_0px_0px_#1E293B] flex items-center justify-center relative z-10">
              <span className="font-display font-black text-white text-6xl tracking-tight select-none">
                ZAP
              </span>
            </div>

            {/* Floating confetti shapes */}
            <div className="absolute top-12 left-10 w-14 h-14 rounded-full bg-[#F472B6] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B]" />
            <div className="absolute bottom-16 right-12 w-10 h-10 rounded-lg bg-[#FBBF24] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B]" />
            <div className="absolute top-1/4 right-8 w-7 h-7 rounded-full bg-[#34D399] border-2 border-[#1E293B]" />
            <div
              className="absolute bottom-24 left-16 pointer-events-none"
              style={{
                width: 0,
                height: 0,
                borderLeft: "18px solid transparent",
                borderRight: "18px solid transparent",
                borderBottom: "32px solid #8B5CF6",
                filter: "drop-shadow(3px 3px 0px #1E293B)",
              }}
            />
            <div className="absolute top-20 right-24 flex gap-1.5">
              {["#8B5CF6", "#F472B6", "#FBBF24"].map((c) => (
                <div
                  key={c}
                  className="w-3 h-3 rounded-full border border-[#1E293B]"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      {urls.length > 0 && (
        <section className="border-b-2 border-[#E2E8F0] bg-[#FFFDF5]">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm leading-none">
                  {urls.length}
                </span>
              </div>
              <span className="text-sm font-semibold text-[#1E293B]">
                {urls.length === 1 ? "link shortened" : "links shortened"}
              </span>
            </div>
            <div className="w-px h-6 bg-[#E2E8F0]" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F472B6] border-2 border-[#1E293B] shadow-[3px_3px_0px_0px_#1E293B] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm leading-none">
                  {totalClicks}
                </span>
              </div>
              <span className="text-sm font-semibold text-[#1E293B]">
                total clicks
              </span>
            </div>
            <div className="ml-auto hidden sm:flex gap-2">
              {["#8B5CF6", "#F472B6", "#FBBF24", "#34D399"].map((c) => (
                <div
                  key={c}
                  className="w-3 h-3 rounded-full border border-[#1E293B]"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── URL LIST ── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <UrlList
          urls={urls}
          onDelete={deleteUrl}
          onVisit={incrementClickCount}
        />
      </section>
    </main>
  );
};

export default UrlsPage;
