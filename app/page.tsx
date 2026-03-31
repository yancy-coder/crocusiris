import { Navigation } from "./sections/Navigation";
import { Hero } from "./sections/Hero";
import { BlogSectionServer } from "./sections/BlogSectionServer";
import { Footer } from "./sections/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <Navigation />
      <main>
        <Hero isReady={true} />
        <BlogSectionServer />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
