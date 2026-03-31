import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

// Blog 目录路径 (相对于项目根目录)
const postsDirectory = path.join(process.cwd(), "blog");

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  rawContent: string; // 原始 markdown，用于搜索
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  backlinks?: string[]; // 被哪些文章引用
}

/**
 * 解析 Obsidian 双链语法 [[...]] 为 HTML 链接
 * 支持格式：
 * - [[文件名]] → 链接到该文章
 * - [[文件名|显示文本]] → 链接到该文章，显示自定义文本
 */
function parseWikiLinks(content: string, allPosts: Post[]): string {
  // 匹配 [[...]] 语法
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  
  return content.replace(wikiLinkRegex, (match, linkContent) => {
    // 分离文件名和显示文本
    const parts = linkContent.split("|");
    const fileId = parts[0].trim();
    const displayText = parts[1] ? parts[1].trim() : fileId;
    
    // 查找对应的文章
    const targetPost = allPosts.find(
      (post) => post.id === fileId || post.title === fileId
    );
    
    if (targetPost) {
      // 找到文章，生成链接
      return `<a href="/blog/${targetPost.id}" class="wiki-link" data-wiki="true" data-target="${targetPost.id}">${displayText}</a>`;
    } else {
      // 未找到文章，生成占位链接（灰色显示）
      return `<span class="wiki-link missing" title="文章 '${fileId}' 不存在">${displayText}</span>`;
    }
  });
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
  
  // 第一阶段：读取所有文章基本信息
  const rawPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // 解析 frontmatter
      const { data, content } = matter(fileContents);

      // 计算阅读时间 (大约每分钟 300 字)
      const wordCount = content.trim().split(/\s+/).length;
      const readTimeMinutes = Math.ceil(wordCount / 300);

      // 提取摘要 (前 150 个字符)
      const excerpt = content
        .replace(/[#*`\[\]\(\)]/g, "")
        .slice(0, 150)
        .trim() + "...";

      return {
        id,
        title: data.title || id,
        excerpt: data.excerpt || excerpt,
        content: "", // 稍后填充
        rawContent: content,
        date: data.date || new Date().toISOString().split("T")[0],
        readTime: `${readTimeMinutes} 分钟`,
        category: data.category || "随笔",
        tags: data.tags || [],
        featured: data.featured || false,
        image: data.image || `/images/blog-default.jpg`,
        backlinks: [],
      };
    });

  // 第二阶段：处理 Markdown 内容（包括双链）
  const postsWithContent = await Promise.all(
    rawPosts.map(async (post) => {
      // 解析双链
      const contentWithLinks = parseWikiLinks(post.rawContent, rawPosts);
      
      // 转换 markdown 为 HTML
      const processedContent = await remark()
        .use(remarkGfm) // 支持 GitHub Flavored Markdown
        .use(remarkHtml, { allowDangerousHtml: true })
        .process(contentWithLinks);
      
      const contentHtml = processedContent.toString();

      return {
        ...post,
        content: contentHtml,
      };
    })
  );

  // 第三阶段：计算反向链接
  postsWithContent.forEach((post) => {
    post.backlinks = postsWithContent
      .filter((otherPost) => {
        if (otherPost.id === post.id) return false;
        const wikiLinkPattern = new RegExp(`\\[\\[${post.id}\\|?[^\]]*\\]\\]`);
        return wikiLinkPattern.test(otherPost.rawContent);
      })
      .map((p) => p.id);
  });

  // 按日期排序 (最新的在前)
  return postsWithContent.sort((a, b) => (a.date < b.date ? 1 : -1));
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
export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagCounts = new Map<string, number>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * 搜索文章
 */
export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts();
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.rawContent.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * 生成 RSS Feed
 */
export async function generateRSSFeed(siteUrl: string): Promise<string> {
  const posts = await getAllPosts();
  const latestPost = posts[0];
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Yancy's Blog</title>
    <link>${siteUrl}</link>
    <description>分享技术心得、项目经验和生活感悟</description>
    <language>zh-CN</language>
    <lastBuildDate>${latestPost ? new Date(latestPost.date).toUTCString() : new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.id}</link>
      <guid>${siteUrl}/blog/${post.id}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return rss;
}

// XML 转义辅助函数
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
