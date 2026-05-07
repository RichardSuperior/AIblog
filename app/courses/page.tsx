import Link from "next/link";
import { getCourses } from "@/lib/prompt";

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">学习路径</h1>
        <p className="text-gray-600">
          系统化的AI提示词学习课程，帮助你从入门到精通
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow block"
          >
            {/* Course Header */}
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.difficulty === 'beginner' ? 'bg-green-400' :
                  course.difficulty === 'intermediate' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`}>
                  {course.difficulty === 'beginner' ? '初级' :
                   course.difficulty === 'intermediate' ? '中级' : '高级'}
                </span>
                <span className="text-sm opacity-90">{course.duration} 分钟</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-sm opacity-90">{course.description}</p>
            </div>

            {/* Course Body */}
            <div className="p-6">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">完成率</span>
                  <span className="text-sm font-medium text-gray-900">
                    {course.completionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${course.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                <span>{course.modules.length} 个模块</span>
                <span>{course.enrolledCount} 人学习</span>
              </div>

              {/* Learning Objectives */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">学习目标</h4>
                <ul className="space-y-1">
                  {course.learningObjectives.slice(0, 2).map((objective, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-500 mt-1">•</span>
                      <span className="text-gray-600">{objective}</span>
                    </li>
                  ))}
                  {course.learningObjectives.length > 2 && (
                    <li className="text-sm text-gray-500">
                      + {course.learningObjectives.length - 2} 个目标
                    </li>
                  )}
                </ul>
              </div>

              {/* Prerequisites */}
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">前置要求</h4>
                  <div className="flex flex-wrap gap-1">
                    {course.prerequisites.map((prereq, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                开始学习
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无课程</p>
        </div>
      )}
    </div>
  );
}