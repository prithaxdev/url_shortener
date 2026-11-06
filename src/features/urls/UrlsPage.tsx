import useUrls from "./hooks/useUrls";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import LinkLabel from "./components/LinkLabel";

const UrlsPage = () => {
  const { urls, isLoading, shortenUrl, deleteUrl, incrementClickCount } =
    useUrls();

  const totalClicks = urls.reduce((sum, u) => sum + u.clickCount, 0);

  return (
    <main className="flex-1">
      {/* ── HERO ── */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="animate-rise">
            <UrlForm onSubmit={shortenUrl} isLoading={isLoading} />
          </div>
          <div className="animate-rise [animation-delay:60ms]">
            <LinkLabel url={urls[0]} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      {urls.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-5">
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-medium text-foreground tabular-nums">
                {urls.length.toLocaleString()}
              </span>
              <span className="text-sm text-subtle">
                {urls.length === 1 ? "link shortened" : "links shortened"}
              </span>
            </p>
            <div className="h-6 w-px bg-border" />
            <p className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-medium text-foreground tabular-nums">
                {totalClicks.toLocaleString()}
              </span>
              <span className="text-sm text-subtle">total clicks</span>
            </p>
          </div>
        </section>
      )}

      {/* ── URL LIST ── */}
      <section className="mx-auto max-w-6xl px-6 py-12">
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
