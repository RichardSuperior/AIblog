'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  views?: number;
  likes?: number;
}

interface Tag {
  name: string;
  count: number;
}

function BlogContent() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const currentTag = searchParams.get('tag') || null;
  const currentTech = searchParams.get('tech') || null;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (currentTech && currentTech !== 'all') {
        params.set('tech', currentTech);
      } else if (currentTag) {
        params.set('tag', currentTag);
      }
      
      const response = await fetch(`/api/posts?${params.toString()}`);
      const data = await response.json();
      setPosts(data.posts);
      setAllTags(data.tags);
      setCurrentPage(1);
      setLoading(false);
    };

    fetchPosts();
  }, [currentTag, currentTech]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const displayTags = allTags.slice(0, 7);

  const techStack = [
    { id: "all", label: "全部", color: "#8b8b8b" },
    { id: "AI", label: "AI", color: "#FF7D00" },
    { id: "智能体", label: "智能体", color: "#3776AB" },
    { id: "前端", label: "前端", color: "#58A6FF" },
    { id: "后端", label: "后端", color: "#A371F7" },
    { id: "机器学习", label: "机器学习", color: "#3FB950" },
    { id: "深度学习", label: "深度学习", color: "#DB61A2" },
    { id: "大语言模型", label: "大语言模型", color: "#F85149" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff7d00] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 页面标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-1">
            {currentTag || currentTech ? `${currentTag || currentTech} 相关文章` : "AI编程技术文章"}
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">探索AI编程的最新技术和实战经验</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 主内容区 */}
        <div className="lg:col-span-3">
          {/* 技术分类标签 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden mb-6">
            <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              {techStack.map((tech) => (
                <Link
                  key={tech.id}
                  href={`/blog?tech=${tech.id}`}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                    currentTech === tech.id || (!currentTech && !currentTag && tech.id === 'all')
                      ? "bg-[var(--secondary)] text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span 
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" 
                      style={{ backgroundColor: tech.color }}
                    ></span>
                    {tech.label}
                  </span>
                </Link>
              ))}
            </div>
            {(currentTag || currentTech) && (
              <div className="px-4 py-2 bg-[var(--secondary)]/50 border-b border-[var(--border)] flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm text-[var(--muted-foreground)]">当前筛选:</span>
                <span className="px-2 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm bg-[#ff7d00]/10 text-[#ff7d00] rounded-lg">
                  {currentTag || currentTech}
                </span>
                <Link href="/blog" className="text-xs sm:text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  清除筛选
                </Link>
              </div>
            )}
          </div>

          {/* 文章列表 */}
          <div className="space-y-4">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="block bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[#ff7d00]/30 hover:shadow-lg hover:shadow-[#ff7d00]/5 transition-all duration-200"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* 缩略图 */}
                    <div className="w-full sm:w-24 h-16 sm:h-16 bg-gradient-to-br from-[var(--secondary)] to-[var(--border)] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#ff7d00]/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    
                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {post.tags && post.tags.length > 0 && (
                          <span className="px-2 py-0.5 text-xs tag-tech">
                            {post.tags[0]}
                          </span>
                        )}
                        <span className="text-xs text-[var(--muted-foreground)]">{post.date}</span>
                      </div>
                      <h2 className="text-base sm:text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-1 group-hover:text-[#ff7d00] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[var(--muted-foreground)] line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 text-xs text-[var(--muted-foreground)]">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M8 15s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01" />
                            </svg>
                            AI编程之家
                          </span>
                          <span className="hidden sm:flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {(post.views || 0).toLocaleString()}
                          </span>
                          <span className="hidden sm:flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {(post.likes || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#58a6ff] opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>阅读全文</span>
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 空状态 */}
          {currentPosts.length === 0 && (
            <div className="text-center py-12 bg-[var(--card)] border border-[var(--border)] rounded-xl">
              <svg className="w-12 h-12 mx-auto text-[var(--muted-foreground)] mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-[var(--muted-foreground)]">暂无相关文章</p>
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm transition-colors ${
                  currentPage === 1
                    ? "bg-[var(--secondary)] border-[var(--border)] text-[var(--muted-foreground)] cursor-not-allowed"
                    : "bg-[var(--secondary)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[#ff7d00]/50"
                }`}
              >
                <svg className="w-4 h-4 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                    currentPage === page
                      ? "bg-gradient-juejin text-white"
                      : "bg-[var(--secondary)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[#ff7d00]/50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 sm:px-4 py-2 border rounded-lg text-xs sm:text-sm transition-colors ${
                  currentPage === totalPages
                    ? "bg-[var(--secondary)] border-[var(--border)] text-[var(--muted-foreground)] cursor-not-allowed"
                    : "bg-[var(--secondary)] border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[#ff7d00]/50"
                }`}
              >
                下一页
                <svg className="w-4 h-4 inline ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* 侧边栏 - 在移动端堆叠在下方 */}
        <div className="space-y-6">
          {/* 热门标签 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <svg className="w-5 h-5 text-[#ff7d00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-semibold text-[var(--foreground)]">热门标签</span>
            </div>
            <div className="p-2">
              {displayTags.map((tag, index) => (
                <Link
                  key={tag.name}
                  href={`/blog?tag=${encodeURIComponent(tag.name)}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors ${
                    currentTag === tag.name ? "bg-[var(--secondary)]" : ""
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    index < 3 ? "bg-gradient-juejin text-white" : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                  }`}>
                    {index + 1}
                  </span>
                  <span className="flex-1 text-left text-sm text-[var(--foreground)]">#{tag.name}</span>
                </Link>
              ))}
              {allTags.length > 7 && (
                <Link
                  href="/blog"
                  className="flex items-center justify-center px-3 py-2 rounded-lg text-sm text-[#58a6ff] hover:bg-[var(--secondary)] transition-all"
                >
                  查看全部标签
                </Link>
              )}
            </div>
          </div>

          {/* 最新文章 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <svg className="w-5 h-5 text-[#ff7d00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-[var(--foreground)]">最新文章</span>
            </div>
            <div className="p-3">
              {posts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                >
                  <span className="text-[#ff7d00] font-bold text-lg flex-shrink-0">•</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--foreground)] line-clamp-2 mb-1">{post.title}</p>
                    <span className="text-xs text-[var(--muted-foreground)]">{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 站点统计 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <svg className="w-5 h-5 text-[#58a6ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="font-semibold text-[var(--foreground)]">站点统计</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#ff7d00]">{posts.length}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">文章总数</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#58a6ff]">{allTags.length}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">标签总数</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#a371f7]">
                    {posts.reduce((sum, post) => sum + (post.views || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">总阅读量</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#3fb950]">
                    {posts.reduce((sum, post) => sum + (post.likes || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">总点赞数</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogListPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#ff7d00] border-t-transparent"></div>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}