import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GPU Blog - 图形工程师的技术博客",
  description: "探索 GPU 渲染、WebGL、GLSL Shader、光线追踪等图形技术的个人博客。使用 React Three Fiber 构建的沉浸式 3D 体验。",
  keywords: ["GPU", "WebGL", "GLSL", "Shader", "Three.js", "图形学", "渲染"],
  authors: [{ name: "GPU Engineer" }],
  openGraph: {
    title: "GPU Blog - 图形工程师的技术博客",
    description: "探索 GPU 渲染、WebGL、GLSL Shader 等图形技术",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f]`}
      >
        {children}
      </body>
    </html>
  );
}
