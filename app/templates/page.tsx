import Link from "next/link";
import { getAllPrompts, getAllCategories } from "@/lib/prompt";

export default function TemplatesPage() {
  const prompts = getAllPrompts();
  const categories = getAllCategories();

  // Group by difficulty
  const beginnerPrompts = prompts.filter(p => p.difficulty === 'beginner');
  const intermediatePrompts = prompts.filter(p => p.difficulty === 'intermediate');
  const advancedPrompts = prompts.filter(p => p.difficulty === 'advanced');

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'content-creation': '✍️',
      'coding-assistance': '💻',
      'data-analysis': '📊',
      'problem-solving': '🔍',
      'learning-teaching': '📚',
      'creativity': '🎨',
      'business': '💼',
      'research': '🔬',
      'productivity': '⚡',
      'communication': '💬'
    };
    return icons[category] || '📝';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'border-green-200 bg-green-50 text-green-700';
      case 'intermediate': return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'advanced': return 'border-red-200 bg-red-50 text-red-700';
      default: return 'border-gray-200 bg-gray-50 text-gray-700';
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
          <h1 className="text-3xl font-light text-gray-900">模板库</h1>
          <p className="mt-2 text-gray-600">精心设计的提示词模板，覆盖各种应用场景</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">按分类浏览</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/templates"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              全部 ({prompts.length})
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/templates?category=${encodeURIComponent(category.name)}`}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {getCategoryIcon(category.name)} {category.name} ({category.count})
              </Link>
            ))}
          </div>
        </div>

        {/* Difficulty Sections */}
        <div className="space-y-12">
          {/* Beginner Templates */}
          {beginnerPrompts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🌱</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">初级模板</h2>
                <span className="text-sm text-gray-500">({beginnerPrompts.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beginnerPrompts.map((prompt) => (
                  <Link
                    key={prompt.id}
                    href={`/templates/${prompt.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(prompt.difficulty)}`}>
                        {getDifficultyText(prompt.difficulty)}
                      </div>
                      {prompt.isFeatured && (
                        <span className="px-2 py-1 rounded text-xs bg-orange-100 text-orange-700">
                          精选
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{prompt.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{prompt.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {getCategoryIcon(prompt.category)}
                        </span>
                        <span className="text-sm text-gray-500">{prompt.category}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {prompt.variables.length} 个变量
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Intermediate Templates */}
          {intermediatePrompts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">中级模板</h2>
                <span className="text-sm text-gray-500">({intermediatePrompts.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {intermediatePrompts.map((prompt) => (
                  <Link
                    key={prompt.id}
                    href={`/templates/${prompt.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(prompt.difficulty)}`}>
                        {getDifficultyText(prompt.difficulty)}
                      </div>
                      {prompt.isFeatured && (
                        <span className="px-2 py-1 rounded text-xs bg-orange-100 text-orange-700">
                          精选
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{prompt.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{prompt.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {getCategoryIcon(prompt.category)}
                        </span>
                        <span className="text-sm text-gray-500">{prompt.category}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {prompt.variables.length} 个变量
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Advanced Templates */}
          {advancedPrompts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">高级模板</h2>
                <span className="text-sm text-gray-500">({advancedPrompts.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advancedPrompts.map((prompt) => (
                  <Link
                    key={prompt.id}
                    href={`/templates/${prompt.id}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(prompt.difficulty)}`}>
                        {getDifficultyText(prompt.difficulty)}
                      </div>
                      {prompt.isFeatured && (
                        <span className="px-2 py-1 rounded text-xs bg-orange-100 text-orange-700">
                          精选
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{prompt.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{prompt.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {getCategoryIcon(prompt.category)}
                        </span>
                        <span className="text-sm text-gray-500">{prompt.category}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {prompt.variables.length} 个变量
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {prompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无提示词模板</p>
          </div>
        )}
      </div>
    </div>
  );
}