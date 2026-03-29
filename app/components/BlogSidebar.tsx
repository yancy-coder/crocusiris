"use client";

import { CalendarWidget } from "./CalendarWidget";
import { WeatherWidget } from "./WeatherWidget";
import { ExternalLink, BookOpen, Code, Coffee, Sparkles } from "lucide-react";

interface QuickLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const quickLinks: QuickLink[] = [
  { name: "技术文档", url: "#", icon: <BookOpen className="w-4 h-4" /> },
  { name: "开源项目", url: "#", icon: <Code className="w-4 h-4" /> },
  { name: "生活随笔", url: "#", icon: <Coffee className="w-4 h-4" /> },
  { name: "灵感收藏", url: "#", icon: <Sparkles className="w-4 h-4" /> },
];

export function BlogSidebar() {
  return (
    <aside className="space-y-6">
      {/* Calendar Widget */}
      <CalendarWidget />

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Quick Links */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
        <h3 className="text-white font-medium mb-4 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-amber-400" />
          常用链接
        </h3>
        <div className="space-y-2">
          {quickLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="flex items-center gap-3 p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 group"
            >
              <span className="text-amber-400/70 group-hover:text-amber-400 transition-colors">
                {link.icon}
              </span>
              <span className="text-sm">{link.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/images/logo.png"
            alt="Yancy"
            className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/50"
          />
          <div>
            <h3 className="text-white font-medium">Yancy</h3>
            <p className="text-sm text-white/50">全栈开发者</p>
          </div>
        </div>
        <p className="text-sm text-white/60 leading-relaxed">
          热爱技术与设计，专注于构建优雅的用户体验。在这里分享我的技术心得、项目经验和生活感悟。
        </p>
      </div>
    </aside>
  );
}
