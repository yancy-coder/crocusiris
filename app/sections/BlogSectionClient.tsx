"use client";

import { useState } from "react";
import { ArrowRight, Clock, Tag, ChevronRight } from "lucide-react";
import { Post } from "../lib/posts";
import Link from "next/link";

interface BlogSectionClientProps {
  posts: Post[];
  categories: string[];
}

export function BlogSectionClient({ posts, categories }: BlogSectionClientProps) {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredPosts =
    activeCategory === "全部"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featuredPost = posts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  // 如果没有文章，显示占位内容
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/60">
          暂无文章，请在 blog 目录下添加 Markdown 文件
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
              activeCategory === category
                ? "bg-amber-500 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {featuredPost && activeCategory === "全部" && (
        <Link href={`/blog/${featuredPost.id}`} className="block">
          <article className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#141414]/50 md:bg-gradient-to-r md:from-transparent md:to-[#141414]" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-amber-500 text-white text-xs rounded-full">
                  精选
                </span>
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.date}
                  </span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-medium text-white mb-4 group-hover:text-amber-400 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-white/60 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 bg-white/5 text-white/50 text-xs rounded"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-2 text-amber-400 text-sm font-medium group/btn">
                  阅读更多
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      )}

      {/* Regular Posts Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {regularPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="block">
            <article className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all duration-500 h-full">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-60" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-white/50 mb-3">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 text-white/40 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {regularPosts.length > 0 && (
        <div className="text-center pt-8">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-amber-500 text-white hover:text-white rounded-full transition-all duration-300 group">
            查看更多文章
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
}
