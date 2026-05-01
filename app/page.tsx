import Link from "next/link";
import { getAllPosts, getAllTags, getHotPosts } from "../lib/post";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Home() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 5);
  const hotPosts = getHotPosts().slice(0, 4);
  const tags = getAllTags();

  const trendingTopics = tags.slice(0, 6).map(tag => ({
    name: tag.name,
    count: `${(tag.count * 100).toLocaleString()}`,
    hot: Math.random() > 0.5,
    new: Math.random() > 0.7
  }));

  const randomPosts = shuffleArray(allPosts).slice(0, 4);

  const boilingPoints = randomPosts.map((post, index) => ({
    id: post.id,
    author: "AI编程之家",
    avatar: "AI",
    content: ` 刚刚发布了一篇关于${post.title}的文章，欢迎阅读！`,
    likes: post.likes || Math.floor(Math.random() * 200) + 50,
    comments: Math.floor(Math.random() * 500) + 100,
    reposts: Math.floor(Math.random() * 150) + 30,
    time: `${Math.floor(Math.random() * 60) + 1}分钟前`
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 沸点区域 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#ff7d00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <span className="font-semibold text-[var(--foreground)]">沸点</span>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {boilingPoints.map((point) => (
                <Link
                  key={point.id}
                  href={`/blog/${point.id}`}
                  className="flex gap-3 p-3 sm:p-4 bg-[var(--secondary)]/50 rounded-lg hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-juejin flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm sm:text-base font-medium">{point.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[var(--foreground)] text-sm sm:text-base leading-relaxed">
                      <span className="text-[#58a6ff] font-medium">{point.author}</span>
                      {point.content}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
                      <span>{point.time}</span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {point.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {point.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 0 19 0" />
                        </svg>
                        {point.reposts}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 最新文章 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#ff7d00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-semibold text-[var(--foreground)]">最新文章</span>
              </div>
              <Link href="/blog?tab=new" className="text-sm text-[#58a6ff] hover:text-[#79c0ff] transition-colors">
                查看更多
              </Link>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex gap-4 p-4 hover:bg-[var(--secondary)]/50 transition-colors"
                >
                  <div className="w-16 h-12 sm:w-20 sm:h-14 bg-gradient-to-br from-[var(--secondary)] to-[var(--border)] rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff7d00]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[var(--foreground)] font-medium mb-1 line-clamp-1 group-hover:text-[#ff7d00] transition-colors text-sm sm:text-base">
                      {post.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-xs sm:text-sm line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 15s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01" />
                        </svg>
                        AI编程之家
                      </span>
                      <span>{post.date}</span>
                      {post.tags && post.tags.length > 0 && (
                        <span className="px-2 py-0.5 text-xs tag-tech">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 侧边栏 - 在移动端堆叠在下方 */}
        <div className="space-y-6">
          {/* 热门话题 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <svg className="w-5 h-5 text-[#ff7d00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-semibold text-[var(--foreground)]">热门话题</span>
            </div>
            <div className="p-2">
              {trendingTopics.map((topic, index) => (
                <Link
                  key={topic.name}
                  href={`/blog?tag=${encodeURIComponent(topic.name)}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    index < 3 ? "bg-gradient-juejin text-white" : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                  }`}>
                    {index + 1}
                  </span>
                  <span className="flex-1 text-left text-sm text-[var(--foreground)]">#{topic.name}</span>
                  {topic.hot && (
                    <span className="text-xs px-1.5 py-0.5 bg-[#f85149]/20 text-[#f85149] rounded">HOT</span>
                  )}
                  {topic.new && (
                    <span className="text-xs px-1.5 py-0.5 bg-[#3fb950]/20 text-[#3fb950] rounded">NEW</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* 热门文章 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
              <svg className="w-5 h-5 text-[#ff7d00]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="font-semibold text-[var(--foreground)]">热门文章</span>
            </div>
            <div className="p-2">
              {hotPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex items-start gap-2 px-3 py-2.5 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                >
                  <span className={`text-xs font-bold flex-shrink-0 mt-1 ${
                    index === 0 ? "text-[#ff7d00]" : index === 1 ? "text-[#58a6ff]" : index === 2 ? "text-[#a371f7]" : "text-[var(--muted-foreground)]"
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--foreground)] line-clamp-2 mb-1">{post.title}</p>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                      <span>AI编程之家</span>
                      <span>·</span>
                      <span>{(post.views || 0).toLocaleString()}阅读</span>
                    </div>
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
                <div className="text-center p-3 bg-[var(--secondary)]/30 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-[#ff7d00]">{getAllPosts().length}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">文章总数</p>
                </div>
                <div className="text-center p-3 bg-[var(--secondary)]/30 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-[#58a6ff]">{tags.length}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">标签总数</p>
                </div>
                <div className="text-center p-3 bg-[var(--secondary)]/30 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-[#a371f7]">
                    {getAllPosts().reduce((sum, post) => sum + (post.views || 0), 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">总阅读量</p>
                </div>
                <div className="text-center p-3 bg-[var(--secondary)]/30 rounded-lg">
                  <p className="text-xl sm:text-2xl font-bold text-[#3fb950]">
                    {getAllPosts().reduce((sum, post) => sum + (post.likes || 0), 0).toLocaleString()}
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