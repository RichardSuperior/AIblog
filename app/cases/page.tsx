import Link from "next/link";
import type { Metadata } from "next";
import { getAllCaseStudies } from "@/lib/prompt";

export const metadata: Metadata = {
  title: "案例分析 | AI编程之家",
  description: "实际AI提示词应用案例分析，了解如何在不同场景中优化提示词以获得更好的结果。",
};

export default function CasesPage() {
  const caseStudies = getAllCaseStudies();

  // Group by industry
  const industries = Array.from(new Set(caseStudies.map(cse => cse.industry)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">案例分析</h1>
        <p className="text-[var(--muted-foreground)]">
          真实世界中的提示词应用案例，学习如何优化提示词效果
        </p>
      </div>

      {/* Industry Filter */}
      {industries.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">按行业浏览</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/cases"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              全部行业
            </Link>
            {industries.map((industry) => (
              <Link
                key={industry}
                href={`/cases?industry=${encodeURIComponent(industry)}`}
                className="px-4 py-2 bg-[var(--secondary)] text-[var(--foreground)] rounded-lg hover:bg-[var(--border)] transition-colors"
              >
                {industry}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Case Studies Grid */}
      <div className="space-y-6">
        {caseStudies.map((caseStudy) => (
          <Link
            key={caseStudy.id}
            href={`/cases/${caseStudy.id}`}
            className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 hover:shadow-lg transition-shadow block"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {caseStudy.industry}
                  </span>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {new Date(caseStudy.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">{caseStudy.title}</h2>
                <p className="text-[var(--muted-foreground)]">{caseStudy.description}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-[var(--muted-foreground)]">
                ❤️ {caseStudy.likes}
              </div>
            </div>

            {/* Challenge Preview */}
            <div className="mb-4">
              <h3 className="font-medium text-[var(--foreground)] mb-2">挑战</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{caseStudy.challenge}</p>
            </div>

            {/* Results Preview */}
            <div className="mb-4">
              <h3 className="font-medium text-[var(--foreground)] mb-2">改进效果</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--muted-foreground)] mb-1">优化前</p>
                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">{caseStudy.results.before}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)] mb-1">优化后</p>
                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">{caseStudy.results.after}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {caseStudy.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-[var(--secondary)] text-[var(--muted-foreground)] rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
              {caseStudy.tags.length > 3 && (
                <span className="px-2 py-1 bg-[var(--secondary)] text-[var(--muted-foreground)] rounded-md text-xs">
                  +{caseStudy.tags.length - 3}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {caseStudies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--muted-foreground)]">暂无案例分析</p>
        </div>
      )}
    </div>
  );
}
