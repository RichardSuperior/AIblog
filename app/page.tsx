import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-[var(--foreground)] mb-8 leading-tight">
              AI 提示词
              <span className="block mt-2 text-[#ff7d00] font-light">学习平台</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-12 leading-relaxed">
              系统化学习如何构建有效的AI提示词，从基础概念到高级应用
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learning/paths"
                className="px-8 py-4 bg-[#ff7d00] text-white rounded-lg hover:bg-[#e06d00] transition-all duration-200 font-medium"
              >
                开始学习路径
              </Link>
              <Link
                href="/templates"
                className="px-8 py-4 border-2 border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)] transition-all duration-200 font-medium"
              >
                浏览模板库
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent"></div>
      </div>

      {/* Main Content Sections */}
      <div className="relative -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Three Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Learning Paths Section */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff7d00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4">学习路径</h2>
              <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                按照结构化路径循序渐进，掌握AI提示词核心技能
              </p>
              <Link
                href="/learning/paths"
                className="inline-flex items-center text-[#ff7d00] hover:text-[#e06d00] font-medium transition-colors"
              >
                探索路径
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Template Library Section */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#3fb950]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4">模板库</h2>
              <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                丰富的实用模板，覆盖各种应用场景和复杂程度
              </p>
              <Link
                href="/templates"
                className="inline-flex items-center text-[#3fb950] hover:text-[#2ea043] font-medium transition-colors"
              >
                浏览模板
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Practice Section */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#ff7d00]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💪</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4">实践练习</h2>
              <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                通过实战练习巩固技能，提升提示词构建能力
              </p>
              <Link
                href="/practice"
                className="inline-flex items-center text-[#ff7d00] hover:text-[#e06d00] font-medium transition-colors"
              >
                开始练习
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Daily Challenge Section */}
          <div className="mt-20 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[#ff7d00]/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔥</span>
                </div>
                <h3 className="text-2xl font-light text-[var(--foreground)]">今日挑战</h3>
              </div>

              <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-8 shadow-sm">
                <h4 className="text-xl font-light text-[var(--foreground)] mb-4">创意内容生成</h4>
                <p className="text-[var(--muted-foreground)] mb-8 leading-relaxed">
                  构建一个能够生成创意故事的提示词，需要包含角色设定、情节发展和结尾转折
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/challenges"
                    className="px-6 py-3 bg-[#ff7d00] text-white rounded-lg hover:bg-[#e06d00] transition-colors font-medium"
                  >
                    查看所有挑战
                  </Link>
                  <Link
                    href="/challenges/today"
                    className="px-6 py-3 border border-[#ff7d00] text-[#ff7d00] rounded-lg hover:bg-[#ff7d00]/10 transition-colors font-medium"
                  >
                    立即挑战
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-[var(--foreground)] mb-2">500+</div>
              <div className="text-[var(--muted-foreground)]">模板数量</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-[var(--foreground)] mb-2">20+</div>
              <div className="text-[var(--muted-foreground)]">结构化课程</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-[var(--foreground)] mb-2">50+</div>
              <div className="text-[var(--muted-foreground)]">练习题目</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-light text-[var(--foreground)] mb-2">1000+</div>
              <div className="text-[var(--muted-foreground)]">学习者</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
