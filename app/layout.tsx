import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yancy.blog"),
  title: "Yancy's Blog - 技术博客与生活随笔",
  description: "Yancy的个人博客，分享全栈开发技术、项目经验和生活感悟",
  keywords: "博客, 技术博客, 全栈开发, React, TypeScript, 前端开发",
  authors: [{ name: "Yancy" }],
  openGraph: {
    title: "Yancy's Blog - 技术博客与生活随笔",
    description: "Yancy的个人博客，分享全栈开发技术、项目经验和生活感悟",
    type: "website",
    locale: "zh_CN",
    images: "/images/hero-bg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
