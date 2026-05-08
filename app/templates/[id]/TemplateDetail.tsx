"use client";

import { useState } from "react";
import Link from "next/link";
import { PromptTemplate } from "@/types/prompt";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  prompt: PromptTemplate | null;
  relatedPrompts: PromptTemplate[];
}

export default function TemplateDetail({ prompt, relatedPrompts }: Props) {
  const [activeTab, setActiveTab] = useState<'template' | 'variables' | 'examples'>('template');

  if (!prompt) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-medium text-[var(--foreground)] mb-4">提示词模板未找到</h1>
          <Link href="/templates" className="text-blue-600 hover:text-blue-700">
            返回模板库
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'content-creation': '✍️', 'coding-assistance': '💻', 'data-analysis': '📊',
      'problem-solving': '🔍', 'learning-teaching': '📚', 'creativity': '🎨',
      'business': '💼', 'research': '🔬', 'productivity': '⚡', 'communication': '💬'
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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--card)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/templates" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
              ← 返回模板库
            </Link>
            <div className="flex items-center gap-2">
              {prompt.isFeatured && (
                <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">精选</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(prompt.difficulty)}`}>
              {getDifficultyText(prompt.difficulty)}
            </span>
            <span className="text-[var(--muted-foreground)]">{getCategoryIcon(prompt.category)} {prompt.category}</span>
          </div>
          <h1 className="text-3xl font-light text-[var(--foreground)]">{prompt.title}</h1>
          <p className="mt-2 text-[var(--muted-foreground)]">{prompt.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6">
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">模板信息</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">难度</span>
                  <span className="font-medium">{getDifficultyText(prompt.difficulty)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">分类</span>
                  <span className="font-medium text-[var(--foreground)]">{prompt.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">变量</span>
                  <span className="font-medium text-[var(--foreground)]">{prompt.variables.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">AI模型</span>
                  <span className="font-medium text-[var(--foreground)]">{prompt.aiModel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">浏览</span>
                  <span className="font-medium text-[var(--foreground)]">{prompt.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted-foreground)]">点赞</span>
                  <span className="font-medium text-[var(--foreground)]">{prompt.likes}</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6">
              <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">操作</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">使用模板</button>
                <button className="w-full px-4 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)] transition-colors">收藏模板</button>
                <button className="w-full px-4 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)] transition-colors">分享模板</button>
              </div>
            </div>

            {prompt.learningObjectives.length > 0 && (
              <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-6">
                <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">学习目标</h3>
                <ul className="space-y-2">
                  {prompt.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-sm text-[var(--foreground)]">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--card)] rounded-t-lg border border-[var(--border)] border-b-0">
              <div className="flex border-b border-[var(--border)]">
                {(['template', 'variables', 'examples'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {tab === 'template' ? '模板内容' : tab === 'variables' ? `变量说明 (${prompt.variables.length})` : `示例 (${prompt.examples.length})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-b-lg border border-[var(--border)] p-8">
              {activeTab === 'template' && (
                <div>
                  <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">模板内容</h3>
                  <div className="bg-[var(--secondary)] rounded-lg p-6">
                    <SyntaxHighlighter language="text" style={tomorrow} customStyle={{ margin: 0, fontSize: '16px', borderRadius: '0.5rem' }}>
                      {prompt.template}
                    </SyntaxHighlighter>
                  </div>
                </div>
              )}

              {activeTab === 'variables' && (
                <div>
                  <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">变量说明</h3>
                  <div className="space-y-4">
                    {prompt.variables.map((variable) => (
                      <div key={variable.id} className="border border-[var(--border)] rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-[var(--foreground)]">{variable.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded ${variable.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                {variable.required ? '必填' : '可选'}
                              </span>
                              <span className="text-xs text-[var(--muted-foreground)]">{variable.type}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[var(--muted-foreground)] mt-2">{variable.description}</p>
                        {variable.options && (
                          <div className="mt-2">
                            <span className="text-xs text-[var(--muted-foreground)]">选项：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {variable.options.map((option) => (
                                <span key={option} className="text-xs px-2 py-1 bg-[var(--secondary)] text-[var(--muted-foreground)] rounded">{option}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {variable.placeholder && (
                          <div className="mt-2">
                            <span className="text-xs text-[var(--muted-foreground)]">示例：</span>
                            <code className="text-xs bg-[var(--secondary)] px-1 rounded">{variable.placeholder}</code>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'examples' && (
                <div>
                  <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">使用示例</h3>
                  {prompt.examples.length > 0 ? (
                    <div className="space-y-6">
                      {prompt.examples.map((example) => (
                        <div key={example.id} className="border border-[var(--border)] rounded-lg p-4">
                          <h4 className="font-medium text-[var(--foreground)] mb-3">{example.title}</h4>
                          <div className="bg-[var(--secondary)] rounded-lg p-3 mb-3">
                            <pre className="text-sm text-[var(--foreground)]">{JSON.stringify(example.inputValues, null, 2)}</pre>
                          </div>
                          {example.explanation && <p className="text-sm text-[var(--muted-foreground)]">{example.explanation}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[var(--muted-foreground)]">暂无示例</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Templates */}
        {relatedPrompts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-light text-[var(--foreground)] mb-8">相关模板</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPrompts.map((related) => (
                <Link key={related.id} href={`/templates/${related.id}`} className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:shadow-md transition-shadow block">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      related.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      related.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>{getDifficultyText(related.difficulty)}</span>
                    <span className="text-sm text-[var(--muted-foreground)]">{related.category}</span>
                  </div>
                  <h3 className="font-medium text-[var(--foreground)] mb-2">{related.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">{related.description}</p>
                  <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
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
