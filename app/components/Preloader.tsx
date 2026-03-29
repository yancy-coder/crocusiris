"use client";

import { useState, useEffect } from "react";
import { preloaderConfig } from "../config";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "fading">("loading");

  useEffect(() => {
    if (!preloaderConfig.brandName) {
      onComplete();
      return;
    }
    const fadeTimer = setTimeout(() => setPhase("fading"), 2200);
    const completeTimer = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!preloaderConfig.brandName) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center transition-opacity duration-600 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo Icon */}
      <div className="preloader-text mb-6">
        <img
          src="/favicon.ico"
          alt="Logo"
          className="w-16 h-16 rounded-full object-cover animate-pulse"
        />
      </div>

      {/* Brand Name */}
      <div className="preloader-text text-center" style={{ animationDelay: "0.2s" }}>
        <h1 className="font-serif text-3xl md:text-4xl text-white tracking-wide mb-2">
          {preloaderConfig.brandName}
        </h1>
        <p className="font-script text-2xl text-amber-400">{preloaderConfig.brandSubname}</p>
      </div>

      {/* Loading Line */}
      <div className="mt-8 w-48 h-px bg-white/10 overflow-hidden">
        <div className="preloader-line h-full bg-gradient-to-r from-amber-500/50 via-amber-500 to-amber-500/50" />
      </div>

      {/* Year */}
      {preloaderConfig.yearText && (
        <p
          className="preloader-text mt-4 text-xs text-white/40 uppercase tracking-[0.3em]"
          style={{ animationDelay: "0.4s" }}
        >
          {preloaderConfig.yearText}
        </p>
      )}
    </div>
  );
}
