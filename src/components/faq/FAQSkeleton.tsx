export default function FAQSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 animate-pulse"
          style={{
            background: "#0D1F30",
            border: "1px solid rgba(155,175,196,0.08)",
          }}
        >
          <div
            className="h-4 rounded"
            style={{ background: "rgba(155,175,196,0.10)", width: "75%" }}
          />
        </div>
      ))}
    </div>
  );
}
