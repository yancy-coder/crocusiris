import { searchPosts, getAllTags } from "../lib/posts";
import { Navigation } from "../sections/Navigation";
import { Footer } from "../sections/Footer";
import { BlogSidebar } from "../components/BlogSidebar";
import { Search, Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  
  const [results, tags] = await Promise.all([
    query ? searchPosts(query) : [],
    getAllTags(),
  ]);

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Search Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-4">
              搜索文章
            </h1>
            
            {/* Search Form */}
            <form action="/search" method="GET" className="max-w-xl mx-auto relative">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="输入关键词搜索..."
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all text-lg"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Results Count */}
            {query && (
              <p className="text-white/50 mt-4">
                找到 <span className="text-amber-400 font-medium">{results.length}</span> 篇与 &quot;{query}&quot; 相关的文章
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Results */}
            <div className="lg:col-span-2">
              {query ? (
                results.length > 0 ? (
                  <div className="space-y-6">
                    {results.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`} className="block">
                        <article className="group flex gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-400/30 transition-all duration-300">
                          {/* Thumbnail */}
                          <div className="w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 text-xs text-white/50 mb-2">
                              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded">
                                {post.category}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.date}
                              </span>
                            </div>
                            
                            <h2 className="text-lg font-medium text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
                              {post.title}
                            </h2>
                            
                            <p className="text-sm text-white/60 line-clamp-2 mb-3">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-xs px-2 py-0.5 rounded ${
                                    tag.toLowerCase().includes(query.toLowerCase())
                                      ? "bg-amber-500/20 text-amber-400"
                                      : "bg-white/5 text-white/40"
                                  }`}
                                >
                                  <Tag className="w-3 h-3 inline mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {/* Arrow */}
                          <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowRight className="w-5 h-5 text-amber-400" />
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/50 text-lg">没有找到与 &quot;{query}&quot; 相关的文章</p>
                    <p className="text-white/30 text-sm mt-2">试试其他关键词？</p>
                  </div>
                )
              ) : (
                <div className="text-center py-20">
                  <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50 text-lg">输入关键词开始搜索</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <BlogSidebar tags={tags} />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
