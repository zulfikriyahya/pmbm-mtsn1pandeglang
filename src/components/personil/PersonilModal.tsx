import { useEffect } from "react";
import { gsap } from "gsap";
import { X, Instagram, Facebook, Mail } from "lucide-react";
import type { Personil } from "./PersonilSlider";

export default function PersonilModal({ p, onClose }: { p: Personil; onClose: () => void }) {
  useEffect(() => {
    gsap.fromTo(
      "#pmodal",
      { scale: 0.88, opacity: 0, y: 16 },
      { scale: 1, opacity: 1, y: 0, duration: 0.32, ease: "back.out(1.7)" }
    );
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(3,10,17,0.88)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        id="pmodal"
        className="relative max-w-sm w-full rounded-3xl overflow-hidden"
        style={{
          background: "#0D1F30",
          border: "1px solid rgba(155,175,196,0.12)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.56)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header strip */}
        <div
          className="h-24 w-full"
          style={{ background: "linear-gradient(135deg,#07121C,#152D45)" }}
        />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ background: "rgba(155,175,196,0.12)", color: "rgba(155,175,196,0.70)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(155,175,196,0.22)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(155,175,196,0.12)")}
        >
          <X size={15} />
        </button>

        <div className="px-7 pb-7 text-center -mt-12">
          <div
            className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 shadow-xl mb-4"
            style={{
              background: "linear-gradient(135deg,#1E3A57,#2E567C)",
              borderColor: "#0D1F30",
            }}
          >
            {p.foto ? (
              <img src={p.foto} alt={p.nama} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl">
                {p.nama.charAt(0)}
              </div>
            )}
          </div>

          <span
            className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full mb-3"
            style={{ background: "rgba(155,175,196,0.09)", color: "#9AAFC4" }}
          >
            {p.kategori === "guru" ? "Guru" : "Staf"}
          </span>

          <h3 className="text-xl font-bold" style={{ color: "#E8EDF3" }}>
            {p.nama}
          </h3>
          <p className="text-sm font-medium mt-0.5" style={{ color: "#9AAFC4" }}>
            {p.jabatan}
          </p>

          {p.quotes && (
            <blockquote
              className="mt-4 text-sm leading-relaxed text-left px-4 py-3 rounded-xl italic"
              style={{
                background: "rgba(3,10,17,0.50)",
                borderLeft: "3px solid #2E567C",
                color: "#6F8EAC",
              }}
            >
              "{p.quotes}"
            </blockquote>
          )}

          {(p.sosmed?.ig || p.sosmed?.fb || p.sosmed?.email) && (
            <div className="flex justify-center gap-3 mt-5">
              {p.sosmed?.ig && (
                <a
                  href={`https://instagram.com/${p.sosmed.ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                  style={{ background: "rgba(219,39,119,0.10)", color: "#db2777" }}
                >
                  <Instagram size={17} />
                </a>
              )}
              {p.sosmed?.fb && (
                <a
                  href={`https://facebook.com/${p.sosmed.fb}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                  style={{ background: "rgba(37,99,235,0.10)", color: "#2563eb" }}
                >
                  <Facebook size={17} />
                </a>
              )}
              {p.sosmed?.email && (
                <a
                  href={`mailto:${p.sosmed.email}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
                  style={{ background: "rgba(155,175,196,0.09)", color: "#9AAFC4" }}
                >
                  <Mail size={17} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
