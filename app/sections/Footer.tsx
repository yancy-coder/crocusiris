"use client";

import { useState } from "react";
import { Mail, Github, ArrowUp, CheckCircle } from "lucide-react";
import { footerConfig } from "../config";

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Github,
  ArrowUp,
};

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("success");
    setNewsletterEmail("");
    setTimeout(() => setNewsletterStatus("idle"), 4000);
  };

  if (!footerConfig.brandName) return null;

  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a]" role="contentinfo">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="font-serif text-xl text-white block">
                  {footerConfig.brandName}
                </span>
                {footerConfig.tagline && (
                  <span className="text-[10px] text-amber-400 tracking-widest uppercase">
                    {footerConfig.tagline}
                  </span>
                )}
              </div>
            </div>
            {footerConfig.description && (
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {footerConfig.description}
              </p>
            )}
            {/* Social Links */}
            {footerConfig.socialLinks.length > 0 && (
              <nav aria-label="Social media links">
                <div className="flex gap-3">
                  {footerConfig.socialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                      >
                        {IconComponent && <IconComponent className="w-4 h-4" />}
                      </a>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>

          {/* Link Groups */}
          {footerConfig.linkGroups.map((group, index) => (
            <nav key={index} aria-label={group.title}>
              <h3 className="font-serif text-lg text-white mb-5">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/70 text-sm hover:text-amber-400 transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg text-white mb-5">订阅更新</h3>
            <p className="text-white/60 text-sm mb-4">
              订阅我的博客，获取最新文章推送
            </p>
            {newsletterStatus === "success" ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>订阅成功！</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  邮箱地址
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="输入您的邮箱"
                  required
                  autoComplete="email"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors"
                >
                  订阅
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/50 text-xs">
            {footerConfig.copyrightText && (
              <span>{footerConfig.copyrightText}</span>
            )}
            {footerConfig.legalLinks.map((link, index) => (
              <span key={index}>
                <span className="hidden md:inline">|</span>
                <button className="hover:text-amber-400 transition-colors ml-2 md:ml-0">
                  {link}
                </button>
              </span>
            ))}
          </div>

          {/* Back to Top */}
          {footerConfig.backToTopText && (
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/70 text-sm hover:text-amber-400 transition-colors group"
              aria-label={footerConfig.backToTopText}
            >
              <span>{footerConfig.backToTopText}</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500 transition-all duration-300">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
