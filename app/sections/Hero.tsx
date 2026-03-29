"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Sparkles, Code, Coffee, BookOpen } from "lucide-react";
import { heroConfig } from "../config";

export function Hero({ isReady }: { isReady: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isReady) return;
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1000);
    const t4 = setTimeout(() => setPhase(4), 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isReady]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Ken Burns effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-[1.5s] ease-out ${
          phase >= 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 animate-kenburns">
          <img
            src={heroConfig.backgroundImage || "/images/hero-bg.png"}
            alt="Hero Background"
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#141414]" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32 lg:py-40">
        {/* Badge */}
        <div
          className={`transition-all duration-700 ease-out ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amber-400 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            欢迎来到我的数字花园
          </span>
        </div>

        {/* Main Title */}
        <h1
          className={`font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight tracking-wide mb-6 transition-all duration-1000 ease-out ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {heroConfig.mainTitle || "Yancy's Blog"}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 transition-all duration-1000 ease-out ${
            phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          {heroConfig.scriptText || "记录技术成长，分享生活感悟，探索无限可能"}
        </p>

        {/* Quick Stats */}
        <div
          className={`flex flex-wrap justify-center gap-6 mb-12 transition-all duration-1000 ease-out ${
            phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <div className="flex items-center gap-2 text-white/60">
            <Code className="w-5 h-5 text-amber-400" />
            <span>全栈开发</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>技术博客</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Coffee className="w-5 h-5 text-amber-400" />
            <span>生活随笔</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ease-out ${
            phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <button
            onClick={() => scrollToSection("#blog")}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            浏览文章
            <ArrowDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollToSection("#about")}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
          >
            了解更多
          </button>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#141414] to-transparent" />

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          phase >= 4 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
