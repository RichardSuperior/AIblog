"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LoginButton from "./LoginButton";
import UserStatus from "./UserStatus";

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(keyword)}`);
      setIsSearchOpen(false);
    }
  };

  const primaryNavItems = [
    { href: "/", label: "首页" },
    { href: "/learning", label: "学习中心" },
    { href: "/templates", label: "模板库" },
    { href: "/practice", label: "练习中心" },
    { href: "/challenges", label: "挑战" },
  ];

  const learningCenterItems = [
    { href: "/learning/paths", label: "学习路径" },
    { href: "/learning/courses", label: "课程" },
    { href: "/learning/templates", label: "模板" },
    { href: "/learning/exercises", label: "练习" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-light text-gray-900 hover:text-gray-700 transition-colors">
                AI 提示词学习平台
              </Link>
            </div>

            {/* Primary Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {primaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Actions */}
              <div className="hidden md:block">
                <LoginButton />
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-gray-400 hover:text-gray-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Center Sub Navigation */}
        {pathname.startsWith("/learning/") && (
          <div className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-12">
                <div className="flex space-x-6">
                  {learningCenterItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="flex items-start justify-end pt-20 pr-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
              <div className="p-4">
                <div className="flex items-center">
                  <input
                    type="text"
                    autoFocus
                    placeholder="搜索模板、课程、练习..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="px-4 py-2 text-gray-500 hover:text-gray-700"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                  >
                    搜索
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}