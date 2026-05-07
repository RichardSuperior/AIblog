import Link from "next/link";
import { getAllCaseStudies } from "@/lib/prompt";

export default function CasesPage() {
  const caseStudies = getAllCaseStudies();

  // Group by industry
  const industries = Array.from(new Set(caseStudies.map(cse => cse.industry)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">案例分析</h1>
        <p className="text-gray-600">
          真实世界中的提示词应用案例，学习如何优化提示词效果
        </p>
      </div>

      {/* Industry Filter */}
      {industries.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">按行业浏览</h3>
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
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
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
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow block"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {caseStudy.industry}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(caseStudy.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{caseStudy.title}</h2>
                <p className="text-gray-600">{caseStudy.description}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                ❤️ {caseStudy.likes}
              </div>
            </div>

            {/* Challenge Preview */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">挑战</h3>
              <p className="text-sm text-gray-600">{caseStudy.challenge}</p>
            </div>

            {/* Results Preview */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 mb-2">改进效果</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">优化前</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{caseStudy.results.before}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">优化后</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{caseStudy.results.after}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {caseStudy.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                >
                  {tag}
                </span>
              ))}
              {caseStudy.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
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
          <p className="text-gray-500">暂无案例分析</p>
        </div>
      )}
    </div>
  );
}