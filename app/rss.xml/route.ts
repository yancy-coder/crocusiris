import { NextResponse } from "next/server";
import { generateRSSFeed } from "../lib/posts";

export async function GET() {
  // 获取站点 URL（从环境变量或默认）
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yancy.blog";
  
  const rss = await generateRSSFeed(siteUrl);
  
  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
