export default function PersonilSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden py-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="w-[200px] flex-shrink-0 rounded-2xl p-4 animate-pulse"
          style={{
            background: "#0D1F30",
            border: "1px solid rgba(155,175,196,0.08)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto mb-3"
            style={{ background: "rgba(155,175,196,0.08)" }}
          />
          <div
            className="h-3 rounded w-3/4 mx-auto mb-2"
            style={{ background: "rgba(155,175,196,0.08)" }}
          />
          <div
            className="h-2 rounded w-1/2 mx-auto mb-2"
            style={{ background: "rgba(155,175,196,0.06)" }}
          />
          <div
            className="h-2 rounded w-2/3 mx-auto"
            style={{ background: "rgba(155,175,196,0.06)" }}
          />
        </div>
      ))}
    </div>
  );
}
