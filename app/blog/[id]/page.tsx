import { notFound } from "next/navigation";
import { getPostById, getAllPosts, getAllTags } from "../../lib/posts";
import { Navigation } from "../../sections/Navigation";
import { Footer } from "../../sections/Footer";
import { BlogSidebar } from "../../components/BlogSidebar";
import { Clock, Tag, Calendar, ArrowLeft, Link2 } from "lucide-react";
import Link from "next/link";
import "./wiki-links.css";

// 生成静态参数（SSG）
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// 生成元数据
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);
  
  if (!post) {
    return {
      title: "文章未找到",
    };
  }
  
  return {
    title: `${post.title} | Yancy's Blog`,
    description: post.excerpt,
  };
}

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const [post, tags] = await Promise.all([
    getPostById(id),
    getAllTags(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navigation />
      
      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Back Link */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            返回博客
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Post Header */}
              <header className="mb-8">
                <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
                  {post.title}
                </h1>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 bg-white/5 text-white/60 text-sm rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Featured Image */}
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/50 to-transparent" />
              </div>

              {/* Post Content */}
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-serif
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-white/80 prose-p:leading-relaxed
                  prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-code:text-amber-300 prose-code:bg-white/10 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                  prose-blockquote:border-l-amber-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
                  prose-ul:text-white/80 prose-ol:text-white/80
                  prose-li:marker:text-amber-400
                  prose-img:rounded-xl
                  prose-hr:border-white/10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Backlinks Section */}
              {post.backlinks && post.backlinks.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h3 className="flex items-center gap-2 text-lg font-medium text-white mb-4">
                    <Link2 className="w-5 h-5 text-amber-400" />
                    引用本文的文章
                  </h3>
                  <div className="grid gap-3">
                    {post.backlinks.map((backlinkId) => (
                      <BacklinkItem key={backlinkId} id={backlinkId} />
                    ))}
                  </div>
                </div>
              )}
            </article>

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

// 反向链接组件
async function BacklinkItem({ id }: { id: string }) {
  const post = await getPostById(id);
  if (!post) return null;
  
  return (
    <Link
      href={`/blog/${post.id}`}
      className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
      />
      <div>
        <h4 className="text-white font-medium group-hover:text-amber-400 transition-colors line-clamp-1">
          {post.title}
        </h4>
        <p className="text-sm text-white/50 mt-1">{post.date}</p>
      </div>
    </Link>
  );
}
