import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

// Blog 目录路径 (相对于项目根目录)
const postsDirectory = path.join(process.cwd(), "blog");

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  image?: string;
}

/**
 * 获取所有博客文章
 */
export async function getAllPosts(): Promise<Post[]> {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    console.warn("Blog directory not found:", postsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPosts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // 解析 frontmatter
        const { data, content } = matter(fileContents);

        // 计算阅读时间 (大约每分钟 300 字)
        const wordCount = content.trim().split(/\s+/).length;
        const readTimeMinutes = Math.ceil(wordCount / 300);

        // 转换 markdown 为 HTML
        const processedContent = await remark()
          .use(remarkGfm) // 支持 GitHub Flavored Markdown
          .use(remarkHtml, { allowDangerousHtml: true })
          .process(content);
        const contentHtml = processedContent.toString();

        // 提取摘要 (前 150 个字符)
        const excerpt = content
          .replace(/[#*`\[\]\(\)]/g, "")
          .slice(0, 150)
          .trim() + "...";

        return {
          id,
          title: data.title || id,
          excerpt: data.excerpt || excerpt,
          content: contentHtml,
          date: data.date || new Date().toISOString().split("T")[0],
          readTime: `${readTimeMinutes} 分钟`,
          category: data.category || "随笔",
          tags: data.tags || [],
          featured: data.featured || false,
          image: data.image || `/images/blog-default.jpg`,
        };
      })
  );

  // 按日期排序 (最新的在前)
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 获取精选文章
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.featured);
}

/**
 * 获取单篇文章
 */
export async function getPostById(id: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.id === id) || null;
}

/**
 * 获取所有分类
 */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return ["全部", ...Array.from(categories)];
}

/**
 * 获取所有标签
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags);
}
