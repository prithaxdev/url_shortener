import useUrls from "./hooks/useUrls";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import StickerSheet from "./components/StickerSheet";

const UrlsPage = () => {
  const { urls, isLoading, shortenUrl, deleteUrl, incrementClickCount } =
    useUrls();

  return (
    <main className="flex-1">
      {/* ── HERO ── */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 px-6 pt-12 pb-20 sm:pt-16 lg:grid-cols-2 lg:gap-16 lg:pt-20 lg:pb-24">
          <UrlForm onSubmit={shortenUrl} isLoading={isLoading} />
          <div className="animate-rise [animation-delay:200ms]">
            <StickerSheet url={urls[0]} />
          </div>
        </div>
      </section>

      {/* ── URL LIST ── */}
      <section className="mx-auto max-w-6xl animate-rise px-6 py-12 [animation-delay:640ms]">
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
