"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "首页", exact: true },
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

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Primary Navigation Links */}
      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive(item.href, item.exact)
                ? "text-[#ff7d00] bg-[#ff7d00]/10"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Learning Center Sub Navigation - rendered by layout when needed */}
      {pathname.startsWith("/learning/") && (
        <div className="absolute left-0 right-0 top-full bg-[var(--card)] border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-12 gap-1">
              {learningCenterItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "text-[#ff7d00] bg-[#ff7d00]/10"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
