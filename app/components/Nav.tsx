"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Nav() {
    const [keyword, setKeyword] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = () => {
        if (keyword.trim() !== "") {
            router.push(`/search?q=${encodeURIComponent(keyword)}`);
        }
    };

    const navItems = [
        { href: "/", label: "首页", icon: "home" },
        { href: "/blog", label: "AI编程", icon: "book", badge: "hot" },
        { href: "/about", label: "关于我们", icon: "user" },
    ];

    const tags = [
        { name: "AI", tagClass: "tag-ai" },
        { name: "智能体", tagClass: "tag-python" },
        { name: "前端", tagClass: "tag-tech" },
        { name: "后端", tagClass: "tag-new" },
    ];

    return (
        <div className="flex items-center gap-2">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pathname === item.href
                            ? "text-[#ff7d00] bg-[#ff7d00]/10"
                            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
                    }`}
                >
                    {item.label}
                    {item.badge && (
                        <span className="px-1.5 py-0.5 text-xs font-bold bg-gradient-juejin text-white rounded-full">
                            HOT
                        </span>
                    )}
                    {pathname === item.href && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-juejin rounded-full" />
                    )}
                </Link>
            ))}

            <div className="hidden md:flex items-center gap-3 ml-6 pl-6 border-l border-[var(--border)]">
                {tags.map((tag) => (
                    <Link
                        key={tag.name}
                        href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 ${tag.tagClass}`}
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>

            <div className="hidden lg:flex items-center gap-3 ml-6">
                <div className="relative">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        placeholder="搜索文章..."
                        className="w-48 px-4 py-2 pl-10 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:border-[#ff7d00] focus:ring-1 focus:ring-[#ff7d00]/50 transition-all duration-200"
                    />
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                </div>
            </div>
        </div>
    );
}