"use client";

import { useState } from "react";
import { ArrowRight, Clock, Tag, ChevronRight } from "lucide-react";
import { BlogSidebar } from "../components/BlogSidebar";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "构建高性能 React 应用的最佳实践",
    excerpt:
      "深入探讨 React 性能优化的各种技巧，包括组件拆分、状态管理、渲染优化等核心概念，帮助你构建更流畅的用户体验。",
    image: "/images/blog-1.jpg",
    date: "2026-03-28",
    readTime: "8 分钟",
    category: "技术",
    tags: ["React", "性能优化", "前端"],
    featured: true,
  },
  {
    id: 2,
    title: "TypeScript 高级类型体操指南",
    excerpt:
      "从基础到进阶，全面掌握 TypeScript 的类型系统。学习如何使用泛型、条件类型、映射类型等高级特性。",
    image: "/images/blog-2.jpg",
    date: "2026-03-25",
    readTime: "12 分钟",
    category: "技术",
    tags: ["TypeScript", "JavaScript"],
  },
  {
    id: 3,
    title: "山间漫步：寻找内心的宁静",
    excerpt:
      "远离城市的喧嚣，走进大自然的怀抱。记录一次难忘的山间徒步之旅，分享沿途的风景与感悟。",
    image: "/images/blog-3.jpg",
    date: "2026-03-20",
    readTime: "5 分钟",
    category: "生活",
    tags: ["旅行", "摄影", "随笔"],
  },
];

const categories = ["全部", "技术", "生活", "设计", "随笔"];

export function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("全部");

  const filteredPosts =
    activeCategory === "全部"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <section id="blog" className="py-20 lg:py-32 bg-[#141414]">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber-400 text-sm tracking-widest uppercase mb-4 block">
            Latest Posts
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
            博客文章
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            分享技术心得、项目经验和生活感悟
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Blog Posts - Left Side (2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Post */}
            {featuredPost && activeCategory === "全部" && (
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
                    <button className="flex items-center gap-2 text-amber-400 text-sm font-medium group/btn">
                      阅读更多
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* Regular Posts Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-all duration-500"
                >
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
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center pt-8">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-amber-500 text-white hover:text-white rounded-full transition-all duration-300 group">
                查看更多文章
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
