import type { Personil } from "./PersonilSlider";

export default function PersonilCard({
  p,
  onSelect,
}: {
  p: Personil;
  onSelect: (p: Personil) => void;
}) {
  return (
    <button
      onClick={() => onSelect(p)}
      className="w-[200px] flex-shrink-0 text-center rounded-2xl p-4 cursor-pointer"
      style={{
        background: "#0D1F30",
        border: "1px solid rgba(155,175,196,0.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.28)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.44)";
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "rgba(155,175,196,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.28)";
        el.style.transform = "";
        el.style.borderColor = "rgba(155,175,196,0.08)";
      }}
    >
      <div
        className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-3"
        style={{
          background: "linear-gradient(135deg,#1E3A57,#2E567C)",
          outline: "3px solid rgba(155,175,196,0.12)",
          outlineOffset: "2px",
        }}
      >
        {p.foto ? (
          <img src={p.foto} alt={p.nama} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
            {p.nama.charAt(0)}
          </div>
        )}
      </div>
      <p className="font-semibold text-sm truncate leading-snug" style={{ color: "#E8EDF3" }}>
        {p.nama}
      </p>
      <p className="text-xs mt-0.5 truncate font-medium" style={{ color: "#9AAFC4" }}>
        {p.jabatan}
      </p>
      {p.quotes && (
        <p
          className="text-[11px] mt-1.5 italic truncate"
          style={{ color: "rgba(155,175,196,0.40)" }}
        >
          "{p.quotes}"
        </p>
      )}
      <span
        className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full"
        style={{ background: "rgba(155,175,196,0.09)", color: "#9AAFC4" }}
      >
        {p.kategori === "guru" ? "Guru" : "Staf"}
      </span>
    </button>
  );
}
