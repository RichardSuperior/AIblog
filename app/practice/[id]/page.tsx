"use client";

import { useState } from "react";
import { getExerciseById } from "@/lib/prompt";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PracticePageProps {
  params: { id: string };
}

export default function PracticePage({ params }: PracticePageProps) {
  const [userInput, setUserInput] = useState("");
  const [currentHint, setCurrentHint] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const exercise = getExerciseById(params.id);

  if (!exercise) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">练习未找到</h1>
        <a href="/practice" className="text-blue-600 hover:underline">
          返回练习中心
        </a>
      </div>
    );
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    alert("提交成功！你的答案已保存。");
  };

  const handleHint = () => {
    if (currentHint < exercise.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <a href="/practice" className="text-gray-500 hover:text-gray-700">
            ← 返回练习中心
          </a>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {exercise.difficulty === 'beginner' ? '初级' :
             exercise.difficulty === 'intermediate' ? '中级' : '高级'}
          </span>
          <span className="text-gray-500">{exercise.type}</span>
          <span className="text-sm text-gray-500">{exercise.points} 分</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{exercise.title}</h1>
        <p className="text-gray-600">{exercise.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Instructions */}
        <div className="space-y-6">
          {/* Challenge Prompt */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">挑战要求</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <SyntaxHighlighter
                language="text"
                style={tomorrow}
                customStyle={{ margin: 0, fontSize: '14px' }}
              >
                {exercise.prompt}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Hints */}
          {exercise.hints.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">提示</h2>
                <button
                  onClick={handleHint}
                  disabled={currentHint >= exercise.hints.length - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  获取提示
                </button>
              </div>
              {exercise.hints.slice(0, currentHint + 1).map((hint, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">提示 {index + 1}:</span>
                    <span className="text-blue-900">{hint}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sample Solution */}
          {exercise.sampleSolution && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">参考答案</h2>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {showSolution ? '隐藏' : '显示'}
                </button>
              </div>
              {showSolution && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <SyntaxHighlighter
                    language="text"
                    style={tomorrow}
                    customStyle={{ margin: 0, fontSize: '14px' }}
                  >
                    {exercise.sampleSolution}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Input Area */}
        <div className="space-y-6">
          {/* Input Editor */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">编写你的提示词</h2>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="在这里输入你的提示词..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim()}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              提交答案
            </button>
            <button
              onClick={() => setUserInput("")}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              清空
            </button>
          </div>

          {/* Expected Output */}
          {exercise.expectedOutput && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">预期输出</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{exercise.expectedOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}