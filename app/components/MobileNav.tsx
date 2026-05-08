"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "首页" },
        { href: "/learning", label: "学习中心" },
        { href: "/templates", label: "模板库" },
        { href: "/practice", label: "练习中心" },
        { href: "/challenges", label: "挑战" },
        { href: "/cases", label: "案例分析" },
    ];

    return (
        <>
            {/* Hamburger button */}
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
                        <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <>
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </>
                    )}
                </svg>
            </button>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* Menu content */}
                <div className="absolute top-16 left-0 right-0 bg-[var(--card)] border-b border-[var(--border)] shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="p-4 space-y-4">
                        {/* Navigation links */}
                        <div className="pt-2">
                            <div className="space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                                                ? "text-[#ff7d00] bg-[#ff7d00]/10"
                                                : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick links */}
                        <div className="border-t border-[var(--border)] pt-4">
                            <h3 className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mb-3">
                                快速入口
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Link
                                    href="/templates?category=content-creation"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-medium rounded-full tag-hot"
                                >
                                    内容创作
                                </Link>
                                <Link
                                    href="/templates?category=coding-assistance"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-medium rounded-full tag-tech"
                                >
                                    编程助手
                                </Link>
                                <Link
                                    href="/practice"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-medium rounded-full tag-new"
                                >
                                    实战练习
                                </Link>
                                <Link
                                    href="/challenges"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-medium rounded-full tag-ai"
                                >
                                    每日挑战
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
