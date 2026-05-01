import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Nav from "./components/Nav";
import MobileNav from "./components/MobileNav";
import ThemeToggle from "./components/ThemeToggle";
import { AuthProvider } from "./components/AuthContext";
import LoginButton from "./components/LoginButton";

export const metadata: Metadata = {
  title: "AI编程之家 ｜ Python技术 ｜ AI编程资源",
  description: "AI编程学习之家,涵盖各类AI编程技术和资源,助力开发者成长，提供实战案例和教程",
  openGraph: {
    title: "AI编程之家 ｜ Python技术 ｜ AI编程资源",
    description: "AI编程学习之家,涵盖各类AI编程技术和资源,助力开发者成长，提供实战案例和教程",
    url: "https://www.aicodehome.cn",
    siteName: "AI编程之家",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200">
        <AuthProvider>
          <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              {/* Logo - 移动端和桌面端都显示 */}
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff7d00] via-[#ff9500] to-[#ffb700] p-[2px] shadow-lg shadow-[#ff7d00]/30 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-full h-full rounded-xl bg-[var(--background)] flex items-center justify-center">
                    {/* 结合AI和房子元素的Logo */}
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#ff7d00]" fill="none" stroke="currentColor" strokeWidth="1.8">
                      {/* 房子主体 */}
                      <path d="M3 9l9-5 9 5v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      {/* 屋顶 */}
                      <path d="M12 3v6" />
                      {/* AI大脑元素 - 神经网络节点 */}
                      <circle cx="12" cy="7" r="1.5" fill="#ff7d00" />
                      <circle cx="8" cy="5" r="1" fill="#ff7d00" />
                      <circle cx="16" cy="5" r="1" fill="#ff7d00" />
                      <circle cx="9" cy="9" r="0.8" fill="#ff9500" />
                      <circle cx="15" cy="9" r="0.8" fill="#ff9500" />
                      {/* 神经网络连接线 */}
                      <line x1="12" y1="7" x2="8" y2="5" strokeWidth="1.5" />
                      <line x1="12" y1="7" x2="16" y2="5" strokeWidth="1.5" />
                      <line x1="12" y1="7" x2="9" y2="9" strokeWidth="1.5" />
                      <line x1="12" y1="7" x2="15" y2="9" strokeWidth="1.5" />
                      <line x1="8" y1="5" x2="9" y2="9" strokeWidth="1" />
                      <line x1="16" y1="5" x2="15" y2="9" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-lg font-bold bg-gradient-to-r from-[#ff7d00] via-[#ff9500] to-[#ff7d00] bg-clip-text text-transparent tracking-tight">
                    AI编程之家
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)] tracking-wider font-medium">
                    aicodehome.cn
                  </span>
                </div>
              </Link>

              {/* 桌面端导航 */}
              <div className="hidden lg:flex items-center flex-1 justify-center">
                <Nav />
              </div>

              {/* 右侧按钮区域 */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="hidden sm:block">
                  <LoginButton />
                </div>
                {/* 移动端汉堡菜单 */}
                <MobileNav />
              </div>
            </div>
          </header>

          {/* 主内容区域 */}
          <div className="flex pt-16">
            <main className="flex-1 min-h-[calc(100vh-56px)]">
              {children}
            </main>
          </div>

          {/* 页脚 */}
          <footer className="bg-[var(--card)] border-t border-[var(--border)] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#ff7d00] via-[#ff9500] to-[#ffb700] p-[1.5px]">
                      <div className="w-full h-full rounded-xl bg-[var(--background)] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#ff7d00]" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3 9l9-5 9 5v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path d="M12 3v6" />
                          <circle cx="12" cy="7" r="1.5" fill="#ff7d00" />
                          <circle cx="8" cy="5" r="1" fill="#ff7d00" />
                          <circle cx="16" cy="5" r="1" fill="#ff7d00" />
                          <line x1="12" y1="7" x2="8" y2="5" strokeWidth="1.5" />
                          <line x1="12" y1="7" x2="16" y2="5" strokeWidth="1.5" />
                        </svg>
                      </div>
                    </div>
                    <span className="font-bold bg-gradient-to-r from-[#ff7d00] via-[#ff9500] to-[#ff7d00] bg-clip-text text-transparent">AI编程之家</span>
                  </Link>
                  <span className="text-[var(--muted-foreground)] text-sm text-center sm:text-left">
                    © 2026 AI编程之家. All rights reserved.
                  </span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 text-sm flex-wrap justify-center">
                  <Link href="/about" className="text-[var(--muted-foreground)] hover:text-[#ff7d00] transition-colors">关于我们</Link>
                  <Link href="/blog" className="text-[var(--muted-foreground)] hover:text-[#ff7d00] transition-colors">技术博客</Link>
                  <a href="#" className="text-[var(--muted-foreground)] hover:text-[#ff7d00] transition-colors">联系我们</a>
                </div>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}