export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-2 border-[var(--border)] border-t-[#ff7d00] rounded-full animate-spin mb-4"></div>
        <p className="text-[var(--muted-foreground)]">加载中...</p>
      </div>
    </div>
  );
}
