import Link from "next/link";
import { getAllExercises } from "@/lib/prompt";

export default function PracticePage() {
  const exercises = getAllExercises();

  // Group by type
  const promptCompletion = exercises.filter(ex => ex.type === 'prompt-completion');
  const comparison = exercises.filter(ex => ex.type === 'comparison');
  const scenario = exercises.filter(ex => ex.type === 'scenario');
  const analysis = exercises.filter(ex => ex.type === 'analysis');

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
          <h1 className="text-3xl font-light text-gray-900">练习中心</h1>
          <p className="mt-2 text-gray-600">通过实际练习提升提示词技能</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Practice Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { type: 'prompt-completion', count: promptCompletion.length, color: 'blue', label: '补全练习' },
            { type: 'comparison', count: comparison.length, color: 'green', label: '对比练习' },
            { type: 'scenario', count: scenario.length, color: 'orange', label: '场景练习' },
            { type: 'analysis', count: analysis.length, color: 'purple', label: '分析练习' }
          ].map((item) => (
            <Link key={item.type} href={`/practice?type=${item.type}`}>
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow text-center">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{getTypeIcon(item.type)}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{item.label}</h3>
                <p className="text-2xl font-light text-gray-900">{item.count}</p>
                <p className="text-sm text-gray-500">个练习</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Practice Sections */}
        <div className="space-y-12">
          {/* Prompt Completion Exercises */}
          {promptCompletion.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📝</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">提示词补全练习</h2>
                <span className="text-sm text-gray-500">({promptCompletion.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promptCompletion.map((exercise) => (
                  <Link
                    key={exercise.id}
                    href={`/practice/${exercise.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyText(exercise.difficulty)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {exercise.points} 分
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{getTypeText(exercise.type)}</span>
                      <span className="text-gray-500">≈ {Math.ceil(exercise.points / 2)} 分钟</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Exercises */}
          {comparison.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">对比优化练习</h2>
                <span className="text-sm text-gray-500">({comparison.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparison.map((exercise) => (
                  <Link
                    key={exercise.id}
                    href={`/practice/${exercise.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyText(exercise.difficulty)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {exercise.points} 分
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{getTypeText(exercise.type)}</span>
                      <span className="text-gray-500">≈ {Math.ceil(exercise.points / 2)} 分钟</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Scenario Exercises */}
          {scenario.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">场景模拟练习</h2>
                <span className="text-sm text-gray-500">({scenario.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scenario.map((exercise) => (
                  <Link
                    key={exercise.id}
                    href={`/practice/${exercise.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyText(exercise.difficulty)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {exercise.points} 分
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{getTypeText(exercise.type)}</span>
                      <span className="text-gray-500">≈ {Math.ceil(exercise.points / 2)} 分钟</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Exercises */}
          {analysis.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">深度分析练习</h2>
                <span className="text-sm text-gray-500">({analysis.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysis.map((exercise) => (
                  <Link
                    key={exercise.id}
                    href={`/practice/${exercise.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(exercise.difficulty)}`}>
                        {getDifficultyText(exercise.difficulty)}
                      </div>
                      <span className="text-sm text-gray-500">
                        {exercise.points} 分
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{getTypeText(exercise.type)}</span>
                      <span className="text-gray-500">≈ {Math.ceil(exercise.points / 2)} 分钟</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {exercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无练习题目</p>
          </div>
        )}
      </div>
    </div>
  );
}