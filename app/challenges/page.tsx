import Link from "next/link";
import { getDailyChallenge, getAllExercises } from "@/lib/prompt";

export default function ChallengesPage() {
  const dailyChallenge = getDailyChallenge();
  const allExercises = getAllExercises();

  // Group by type
  const promptCompletion = allExercises.filter(ex => ex.type === 'prompt-completion');
  const comparison = allExercises.filter(ex => ex.type === 'comparison');
  const scenario = allExercises.filter(ex => ex.type === 'scenario');
  const analysis = allExercises.filter(ex => ex.type === 'analysis');

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'prompt-completion': '📝',
      'comparison': '⚖️',
      'scenario': '🎭',
      'analysis': '🔍'
    };
    return icons[type] || '📝';
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'prompt-completion': return '提示词补全';
      case 'comparison': return '对比优化';
      case 'scenario': return '场景模拟';
      case 'analysis': return '深度分析';
      default: return type;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初级';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-light text-gray-900">每日挑战</h1>
          <p className="mt-2 text-gray-600">每天一个新挑战，持续提升你的提示词技能</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Daily Challenge Hero */}
        {dailyChallenge && (
          <div className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 md:p-12 text-center text-white">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-3xl">🔥</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light">今日挑战</h2>
                </div>
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                    dailyChallenge.difficulty === 'beginner' ? 'bg-green-400' :
                    dailyChallenge.difficulty === 'intermediate' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}>
                    {getDifficultyText(dailyChallenge.difficulty)}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium mb-4">{dailyChallenge.title}</h3>
                <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                  {dailyChallenge.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/challenges/${dailyChallenge.id}`}
                    className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
                  >
                    开始挑战
                  </Link>
                  <Link
                    href="/challenges"
                    className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium text-lg"
                  >
                    查看更多
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Challenge Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">挑战类型</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/challenges?type=prompt-completion">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow text-center group">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">提示词补全</h3>
                <p className="text-sm text-gray-600 mb-4">完善提示词内容</p>
                <div className="text-2xl font-light text-blue-600">
                  {promptCompletion.length}
                </div>
                <p className="text-sm text-gray-500">个挑战</p>
              </div>
            </Link>

            <Link href="/challenges?type=comparison">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow text-center group">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">对比优化</h3>
                <p className="text-sm text-gray-600 mb-4">对比不同提示词效果</p>
                <div className="text-2xl font-light text-green-600">
                  {comparison.length}
                </div>
                <p className="text-sm text-gray-500">个挑战</p>
              </div>
            </Link>

            <Link href="/challenges?type=scenario">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow text-center group">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🎭</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">场景模拟</h3>
                <p className="text-sm text-gray-600 mb-4">实际应用场景</p>
                <div className="text-2xl font-light text-orange-600">
                  {scenario.length}
                </div>
                <p className="text-sm text-gray-500">个挑战</p>
              </div>
            </Link>

            <Link href="/challenges?type=analysis">
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow text-center group">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">深度分析</h3>
                <p className="text-sm text-gray-600 mb-4">分析提示词原理</p>
                <div className="text-2xl font-light text-purple-600">
                  {analysis.length}
                </div>
                <p className="text-sm text-gray-500">个挑战</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Challenges */}
        <div>
          <h2 className="text-3xl font-light text-gray-900 mb-8">最近挑战</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allExercises.slice(0, 6).map((exercise) => (
              <Link
                key={exercise.id}
                href={`/challenges/${exercise.id}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
                    {getDifficultyText(exercise.difficulty)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {exercise.points} 分
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{getTypeIcon(exercise.type)}</span>
                  <span className="text-sm text-gray-500">{getTypeText(exercise.type)}</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{exercise.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{exercise.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>≈ {Math.ceil(exercise.points / 2)} 分钟</span>
                    <span>新挑战</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-gray-900 mb-4">准备好接受挑战了吗？</h3>
            <p className="text-gray-600 mb-6">
              每天坚持练习，逐步提升你的AI提示词技能。完成挑战可获得积分和成就。
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              浏览所有挑战
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}