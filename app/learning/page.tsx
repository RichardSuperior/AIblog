import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学习中心 | AI编程之家",
  description: "系统化学习AI提示词工程，选择适合你的学习路径，从入门到精通。",
};

export default function LearningCenter() {
  const learningPaths = [
    {
      id: "beginner",
      title: "AI提示词基础入门",
      description: "从零开始学习如何写出有效的提示词",
      duration: "2小时",
      level: "初级",
      progress: 0,
      modules: 6,
      icon: "🌱"
    },
    {
      id: "intermediate",
      title: "提示词工程进阶",
      description: "掌握复杂场景下的提示词优化技巧",
      duration: "3小时",
      level: "中级",
      progress: 0,
      modules: 8,
      icon: "🚀"
    },
    {
      id: "advanced",
      title: "专业提示词设计",
      description: "学习特定行业的高级提示词应用",
      duration: "4小时",
      level: "高级",
      progress: 0,
      modules: 10,
      icon: "🎯"
    }
  ];

  const featuredCourses = [
    {
      id: "prompt-fundamentals",
      title: "提示词核心原理",
      description: "理解AI提示词的工作机制和基本原理",
      duration: "45分钟",
      difficulty: "初级",
      enrolled: 1234,
      rating: 4.8
    },
    {
      id: "prompt-optimization",
      title: "提示词优化技巧",
      description: "学习如何优化提示词以获得更好的结果",
      duration: "60分钟",
      difficulty: "中级",
      enrolled: 856,
      rating: 4.9
    },
    {
      id: "prompt-patterns",
      title: "提示词设计模式",
      description: "掌握常见的设计模式和最佳实践",
      duration: "90分钟",
      difficulty: "高级",
      enrolled: 542,
      rating: 4.7
    }
  ];

  const quickActions = [
    {
      title: "浏览模板库",
      description: "查找适合你需求的提示词模板",
      icon: "📚",
      href: "/templates",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "开始练习",
      description: "通过实战练习提升你的技能",
      icon: "💪",
      href: "/practice",
      color: "bg-orange-100 text-orange-700"
    },
    {
      title: "查看挑战",
      description: "完成今天的挑战任务",
      icon: "🔥",
      href: "/challenges",
      color: "bg-red-100 text-red-700"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--card)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-light text-[var(--foreground)]">学习中心</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">系统化学习AI提示词技能的统一入口</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-[var(--foreground)] mb-6">快速开始</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 hover:shadow-md transition-shadow"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">{action.title}</h3>
                <p className="text-[var(--muted-foreground)]">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-[var(--foreground)] mb-6">学习路径</h2>
          <div className="space-y-6">
            {learningPaths.map((path) => (
              <Link
                key={path.id}
                href={`/learning/paths/${path.id}`}
                className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 hover:shadow-md transition-shadow block"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{path.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-medium text-[var(--foreground)]">{path.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          path.level === '初级' ? 'bg-green-100 text-green-800' :
                          path.level === '中级' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {path.level}
                        </span>
                      </div>
                      <p className="text-[var(--muted-foreground)] mb-3">{path.description}</p>
                      <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                        <span>{path.duration}</span>
                        <span>{path.modules} 个模块</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-32 bg-[var(--secondary)] rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-[var(--muted-foreground)]">{path.progress}% 完成</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Courses */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-[var(--foreground)]">精选课程</h2>
            <Link href="/learning/courses" className="text-blue-600 hover:text-blue-700">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/learning/courses/${course.id}`}
                className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm mb-3 inline-block ${
                      course.difficulty === '初级' ? 'bg-green-100 text-green-800' :
                      course.difficulty === '中级' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      ★★★★★
                    </div>
                    <span className="text-sm text-[var(--muted-foreground)]">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">{course.title}</h3>
                <p className="text-[var(--muted-foreground)] mb-4 text-sm">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
                  <span>{course.duration}</span>
                  <span>{course.enrolled} 人学习</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Content Overview */}
        <div>
          <h2 className="text-2xl font-light text-[var(--foreground)] mb-6">学习资源概览</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link href="/templates" className="text-center">
              <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">📚</div>
                <div className="text-lg font-medium text-[var(--foreground)]">模板库</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">500+ 模板</div>
              </div>
            </Link>
            <Link href="/learning/exercises" className="text-center">
              <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">💪</div>
                <div className="text-lg font-medium text-[var(--foreground)]">练习题库</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">50+ 练习</div>
              </div>
            </Link>
            <Link href="/cases" className="text-center">
              <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-lg font-medium text-[var(--foreground)]">案例分析</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">15+ 案例</div>
              </div>
            </Link>
            <Link href="/challenges" className="text-center">
              <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-lg font-medium text-[var(--foreground)]">每日挑战</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-1">每日更新</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}