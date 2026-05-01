"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "首页" },
        { href: "/blog", label: "AI编程" },
        { href: "/about", label: "关于我们" },
    ];

    const tags = [
        { name: "AI", tagClass: "tag-ai" },
        { name: "智能体", tagClass: "tag-python" },
        { name: "前端", tagClass: "tag-tech" },
        { name: "后端", tagClass: "tag-new" },
    ];

    return (
        <>
            {/* 汉堡按钮 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                aria-label="Toggle menu"
            >
                <svg
                    className={`w-6 h-6 text-[var(--foreground)] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    {isOpen ? (
                        <>
                            <path d="M6 18L18 6M6 6l12 12" />
                        </>
                    ) : (
                        <>
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </>
                    )}
                </svg>
            </button>

            {/* 移动端菜单 */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                {/* 背景遮罩 */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* 菜单内容 */}
                <div className="absolute top-16 left-0 right-0 bg-[var(--card)] border-b border-[var(--border)] shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="p-4 space-y-4">
                        {/* 搜索框 */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="搜索文章..."
                                className="w-full px-4 py-3 pl-10 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[#ff7d00] focus:ring-1 focus:ring-[#ff7d00]/50"
                            />
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                        </div>

                        {/* 导航链接 */}
                        <div className="border-t border-[var(--border)] pt-4">
                            <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                                导航
                            </h3>
                            <div className="space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                            pathname === item.href
                                                ? "text-[#ff7d00] bg-[#ff7d00]/10"
                                                : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* 标签 */}
                        <div className="border-t border-[var(--border)] pt-4">
                            <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                                热门标签
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Link
                                        key={tag.name}
                                        href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                                        onClick={() => setIsOpen(false)}
                                        className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${tag.tagClass}`}
                                    >
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}