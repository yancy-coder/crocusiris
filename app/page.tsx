"use client";

import { useState, useCallback } from "react";
import { Navigation } from "./sections/Navigation";
import { Hero } from "./sections/Hero";
import { BlogSection } from "./sections/BlogSection";
import { Footer } from "./sections/Footer";
import { Preloader } from "./components/Preloader";
import { ScrollToTop } from "./components/ScrollToTop";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div
        className={`min-h-screen bg-[#141414] ${
          isLoading ? "overflow-hidden max-h-screen" : ""
        }`}
      >
        <Navigation />

        <main>
          <Hero isReady={!isLoading} />
          <BlogSection />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
