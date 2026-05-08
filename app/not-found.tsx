import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-light text-[var(--foreground)] mb-6">404</h1>
        <p className="text-lg text-[var(--muted-foreground)] mb-8">抱歉，您访问的页面不存在</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#ff7d00] text-white rounded-lg hover:bg-[#e06d00] transition-colors font-medium"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
