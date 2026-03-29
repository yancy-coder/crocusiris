"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Mail, Github } from "lucide-react";
import { navigationConfig } from "../config";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("yancy@crocusiris.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = navigationConfig.navLinks;

  // 联系方式数据
  const contactDropdown = [
    { name: "yancy@crocusiris.com", href: "mailto:yancy@crocusiris.com", icon: "Mail" },
    { name: "GitHub", href: "https://github.com/yancy-coder", icon: "Github", external: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#141414]/95 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("#hero")}
          className="flex items-center gap-3 group"
          aria-label={navigationConfig.brandName}
        >
          <img
            src="/favicon.ico"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl text-white tracking-wide">
              {navigationConfig.brandName}
            </span>
            <span className="text-[10px] text-amber-400 tracking-widest uppercase">
              {navigationConfig.tagline}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8" role="menubar">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="flex items-center gap-1 text-sm text-white/80 hover:text-amber-400 transition-colors duration-300 py-2"
              role="menuitem"
            >
              {link.name}
            </button>
          ))}

          {/* Contact Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("contact")}
            onMouseLeave={() => setActiveDropdown(null)}
            role="none"
          >
            <button
              className="flex items-center gap-1 text-sm text-white/80 hover:text-amber-400 transition-colors duration-300 py-2"
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={activeDropdown === "contact"}
            >
              联系
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  activeDropdown === "contact" ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                activeDropdown === "contact"
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
              role="menu"
            >
              <div className="bg-[#1a1a1a]/95 backdrop-blur-md rounded-lg overflow-hidden min-w-[200px] border border-white/10 shadow-xl">
                {contactDropdown.map((item) =>
                  item.icon === "Mail" ? (
                    <button
                      key={item.name}
                      onClick={copyEmail}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/80 hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
                      role="menuitem"
                    >
                      <Mail className="w-4 h-4" />
                      {copied ? "已复制" : item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/80 hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
                      role="menuitem"
                    >
                      {item.icon === "Github" && <Github className="w-4 h-4" />}
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-[#141414]/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        role="menu"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="container-custom py-8 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="flex items-center gap-3 w-full py-4 text-lg text-white border-b border-white/10 hover:text-amber-400 transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              role="menuitem"
            >
              {link.name}
            </button>
          ))}

          {/* Mobile Contact Links */}
          <div
            className="border-b border-white/10 py-4 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-sm text-white/50 mb-3">联系方式</div>
            <button
              onClick={copyEmail}
              className="flex items-center gap-3 py-2 text-white/80 hover:text-amber-400"
            >
              <Mail className="w-5 h-5" />
              {copied ? "已复制" : "yancy@crocusiris.com"}
            </button>
            <a
              href="https://github.com/yancy-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-2 text-white/80 hover:text-amber-400"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
