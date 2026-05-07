"use client";

import { useState } from "react";
import Link from "next/link";
import { getPromptById, getAllPrompts } from "@/lib/prompt";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface TemplatePageProps {
  params: { id: string };
}

export default function TemplatePage({ params }: TemplatePageProps) {
  const [activeTab, setActiveTab] = useState<'template' | 'variables' | 'examples'>('template');
  const prompt = getPromptById(params.id);

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">提示词模板未找到</h1>
          <Link href="/templates" className="text-blue-600 hover:text-blue-700">
            返回模板库
          </Link>
        </div>
      </div>
    );
  }

  // Get related prompts
  const allPrompts = getAllPrompts();
  const relatedPrompts = allPrompts
    .filter(p => p.id !== prompt.id && p.category === prompt.category)
    .slice(0, 3);

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
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
          <div className="flex items-center justify-between mb-4">
            <Link href="/templates" className="text-gray-600 hover:text-gray-900">
              ← 返回模板库
            </Link>
            <div className="flex items-center gap-2">
              {prompt.isFeatured && (
                <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
                  精选
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(prompt.difficulty)}`}>
              {getDifficultyText(prompt.difficulty)}
            </span>
            <span className="text-gray-600">{prompt.category}</span>
            <span className="text-gray-500">
              {getCategoryIcon(prompt.category)} {prompt.category}
            </span>
          </div>
          <h1 className="text-3xl font-light text-gray-900">{prompt.title}</h1>
          <p className="mt-2 text-gray-600">{prompt.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">模板信息</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">难度</span>
                  <span className={`font-medium ${getDifficultyColor(prompt.difficulty).replace('bg-', 'text-').replace('text-', 'text-')}`}>
                    {getDifficultyText(prompt.difficulty)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">分类</span>
                  <span className="font-medium text-gray-900">{prompt.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">变量数量</span>
                  <span className="font-medium text-gray-900">{prompt.variables.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AI模型</span>
                  <span className="font-medium text-gray-900">{prompt.aiModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">浏览量</span>
                  <span className="font-medium text-gray-900">{prompt.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">点赞数</span>
                  <span className="font-medium text-gray-900">{prompt.likes}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">操作</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  使用模板
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  收藏模板
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  分享模板
                </button>
              </div>
            </div>

            {/* Learning Objectives */}
            {prompt.learningObjectives.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">学习目标</h3>
                <ul className="space-y-2">
                  {prompt.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-sm text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-t-lg border border-gray-200 border-b-0">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('template')}
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'template'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  模板内容
                </button>
                <button
                  onClick={() => setActiveTab('variables')}
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'variables'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  变量说明 ({prompt.variables.length})
                </button>
                <button
                  onClick={() => setActiveTab('examples')}
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'examples'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  示例 ({prompt.examples.length})
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-lg border border-gray-200 p-8">
              {activeTab === 'template' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">模板内容</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <SyntaxHighlighter
                      language="text"
                      style={tomorrow}
                      customStyle={{
                        margin: 0,
                        fontSize: '16px',
                        borderRadius: '0.5rem'
                      }}
                    >
                      {prompt.template}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )}

              {activeTab === 'variables' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">变量说明</h3>
                  <div className="space-y-4">
                    {prompt.variables.map((variable) => (
                      <div key={variable.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{variable.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded ${
                                variable.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {variable.required ? '必填' : '可选'}
                              </span>
                              <span className="text-xs text-gray-500">{variable.type}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{variable.description}</p>
                        {variable.options && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">选项：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {variable.options.map((option) => (
                                <span
                                  key={option}
                                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {variable.placeholder && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">示例：</span>
                            <code className="text-xs bg-gray-100 px-1 rounded">
                              {variable.placeholder}
                            </code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">使用示例</h3>
                  {prompt.examples.length > 0 ? (
                    <div className="space-y-6">
                      {prompt.examples.map((example) => (
                        <div key={example.id} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">{example.title}</h4>
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <pre className="text-sm">{JSON.stringify(example.inputValues, null, 2)}</pre>
                          </div>
                          {example.explanation && (
                            <p className="text-sm text-gray-600">{example.explanation}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">暂无示例</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Templates */}
        {relatedPrompts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8">相关模板</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPrompts.map((related) => (
                <Link
                  key={related.id}
                  href={`/templates/${related.id}`}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      related.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      related.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {getDifficultyText(related.difficulty)}
                    </span>
                    <span className="text-sm text-gray-500">{related.category}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{related.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{related.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{related.views} 浏览</span>
                    <span>{related.likes} 点赞</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}