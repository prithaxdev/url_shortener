import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UrlsPage from "@/features/urls";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <UrlsPage />
      <Footer />
    </div>
  );
}

export default App;
