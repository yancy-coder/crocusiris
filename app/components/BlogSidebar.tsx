"use client";

import { CalendarWidget } from "./CalendarWidget";
import { WeatherWidget } from "./WeatherWidget";
import { ExternalLink, BookOpen, Code, Coffee, Sparkles, Tag, Search } from "lucide-react";

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

interface TagItem {
  name: string;
  count: number;
}

interface BlogSidebarProps {
  tags?: TagItem[];
}

// 获取标签大小（基于文章数量）
function getTagSizeClass(count: number, maxCount: number): string {
  const ratio = count / maxCount;
  if (ratio > 0.8) return "text-lg font-semibold";
  if (ratio > 0.5) return "text-base font-medium";
  if (ratio > 0.3) return "text-sm";
  return "text-xs";
}

export function BlogSidebar({ tags = [] }: BlogSidebarProps) {
  const maxCount = tags.length > 0 ? tags[0].count : 1;

  return (
    <aside className="space-y-6">
      {/* Search Widget */}
      <SearchWidget />

      {/* Calendar Widget */}
      <CalendarWidget />

      {/* Weather Widget */}
      <WeatherWidget />

      {/* Tag Cloud */}
      {tags.length > 0 && (
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
          <h3 className="text-white font-medium mb-4 flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            标签云
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <a
                key={tag.name}
                href={`/?tag=${encodeURIComponent(tag.name)}#blog`}
                className={`${getTagSizeClass(tag.count, maxCount)} px-3 py-1.5 bg-white/5 hover:bg-amber-500/20 text-white/70 hover:text-amber-400 rounded-full transition-all duration-200`}
                title={`${tag.name} (${tag.count} 篇文章)`}
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      )}

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
            src="/favicon.ico"
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

// 搜索组件
function SearchWidget() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5">
      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
        <Search className="w-4 h-4 text-amber-400" />
        搜索文章
      </h3>
      <form action="/search" method="GET" className="relative">
        <input
          type="text"
          name="q"
          placeholder="输入关键词..."
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white/50 hover:text-amber-400 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
