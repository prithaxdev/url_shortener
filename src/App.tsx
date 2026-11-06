import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UrlsPage, { ShortLinkStatus, type ShortPathResult } from "@/features/urls";

function App({ shortPath }: { shortPath: ShortPathResult }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      {shortPath.status === "none" ? (
        <UrlsPage />
      ) : (
        <ShortLinkStatus result={shortPath} />
      )}
      <Footer />
    </div>
  );
}

export default App;
