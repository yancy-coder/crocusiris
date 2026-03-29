// =============================================================================
// Personal Blog Configuration
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "Yancy's Blog - 技术博客与生活随笔",
  description: "Yancy的个人博客，分享全栈开发技术、项目经验和生活感悟",
  language: "zh-CN",
  keywords: "博客, 技术博客, 全栈开发, React, TypeScript, 前端开发",
  ogImage: "/images/hero-bg.png",
  canonical: "https://yancy.blog",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavLink {
  name: string;
  href: string;
  icon: string;
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Yancy",
  brandSubname: "Blog",
  tagline: "探索技术与生活",
  navLinks: [
    { name: "首页", href: "#hero", icon: "Home" },
    { name: "博客", href: "#blog", icon: "BookOpen" },
    { name: "关于", href: "#about", icon: "User" },
  ],
  ctaButtonText: "",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "Yancy",
  brandSubname: "Blog",
  yearText: "Est. 2024",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  ctaButtonText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: "记录技术成长，分享生活感悟，探索无限可能",
  mainTitle: "Yancy's Blog",
  ctaButtonText: "浏览文章",
  ctaTarget: "#blog",
  backgroundImage: "/images/hero-bg.png",
};

// -----------------------------------------------------------------------------
// Footer Config
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  copyrightText: string;
  legalLinks: string[];
  backToTopText: string;
}

export const footerConfig: FooterConfig = {
  brandName: "Yancy",
  tagline: "Blog",
  description: "记录技术成长，分享生活感悟。一个全栈开发者的数字花园。",
  socialLinks: [
    { icon: "Github", label: "GitHub", href: "https://github.com/yancy-coder" },
    { icon: "Mail", label: "Email", href: "mailto:yancy@crocusiris.com" },
  ],
  linkGroups: [
    {
      title: "导航",
      links: [
        { name: "首页", href: "#hero" },
        { name: "博客", href: "#blog" },
        { name: "关于", href: "#about" },
      ],
    },
    {
      title: "分类",
      links: [
        { name: "技术", href: "#" },
        { name: "生活", href: "#" },
        { name: "随笔", href: "#" },
      ],
    },
  ],
  copyrightText: "© 2024 Yancy's Blog. All rights reserved.",
  legalLinks: ["隐私政策", "使用条款"],
  backToTopText: "回到顶部",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "回到顶部",
};
