import { Navigation } from "./sections/Navigation";
import { Hero } from "./sections/Hero";
import { BlogSectionClient } from "./sections/BlogSectionClient";
import { Footer } from "./sections/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { BlogSidebar } from "./components/BlogSidebar";
import { getAllPosts, getAllCategories, getAllTags } from "./lib/posts";

export default async function Home() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  return (
    <div className="min-h-screen bg-[#141414]">
      <Navigation />
      <main>
        <Hero isReady={true} />
        
        {/* Blog Section with Sidebar */}
        <section id="blog" className="py-20 lg:py-32 bg-[#141414]">
          <div className="container-custom">
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

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Posts - Left Side */}
              <div className="lg:col-span-2">
                <BlogSectionClient 
                  posts={posts} 
                  categories={categories} 
                />
              </div>

              {/* Sidebar - Right Side */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <BlogSidebar tags={tags} />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
