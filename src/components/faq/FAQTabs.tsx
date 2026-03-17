import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const KATEGORI = [
  "Semua",
  "Pendaftaran",
  "Persyaratan Dokumen",
  "Seleksi & Tes",
  "Daftar Ulang & Biaya",
  "Lainnya",
];

interface Props {
  active: string;
  onChange: (k: string) => void;
  counts: Record<string, number>;
}

export default function FAQTabs({ active, onChange, counts }: Props) {
  const indRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // Update arrow visibility
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    scrollRef.current?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Slide indicator
  useEffect(() => {
    const tabs = tabsRef.current;
    const ind = indRef.current;
    if (!tabs || !ind) return;
    const btn = tabs.querySelector<HTMLButtonElement>(`[data-k="${active}"]`);
    if (!btn) return;
    gsap.to(ind, { x: btn.offsetLeft, width: btn.offsetWidth, duration: 0.3, ease: "power3.out" });

    // Auto-scroll active tab into view
    btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center gap-1">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all"
        style={{
          background: canLeft ? "rgba(155,175,196,0.12)" : "transparent",
          color: canLeft ? "#9AAFC4" : "rgba(155,175,196,0.15)",
          cursor: canLeft ? "pointer" : "default",
          border: "1px solid " + (canLeft ? "rgba(155,175,196,0.18)" : "transparent"),
        }}
        aria-label="Geser kiri"
        tabIndex={canLeft ? 0 : -1}
      >
        <ChevronLeft size={14} />
      </button>

      {/* Scrollable track with fade masks */}
      <div className="relative flex-1 overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-200"
          style={{
            background: "linear-gradient(to right, #07121C, transparent)",
            opacity: canLeft ? 1 : 0,
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none transition-opacity duration-200"
          style={{
            background: "linear-gradient(to left, #07121C, transparent)",
            opacity: canRight ? 1 : 0,
          }}
        />

        {/* Scrollable area */}
        <div ref={scrollRef} className="overflow-x-auto scrollbar-none">
          <div
            ref={tabsRef}
            className="relative inline-flex gap-1 rounded-2xl p-1.5"
            style={{ background: "rgba(3,10,17,0.60)" }}
          >
            {/* Sliding indicator */}
            <div
              ref={indRef}
              className="absolute top-1.5 bottom-1.5 left-0 rounded-xl pointer-events-none"
              style={{
                width: 0,
                background: "linear-gradient(135deg,#1E3A57,#2E567C)",
                boxShadow: "0 2px 14px rgba(46,86,124,0.40)",
              }}
            />

            {KATEGORI.map((k) => {
              const cnt =
                k === "Semua" ? Object.values(counts).reduce((a, b) => a + b, 0) : (counts[k] ?? 0);
              const on = active === k;
              return (
                <button
                  key={k}
                  data-k={k}
                  onClick={() => onChange(k)}
                  className="relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                  style={{ color: on ? "white" : "#6F8EAC" }}
                >
                  {k}
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded-full font-semibold"
                    style={
                      on
                        ? { background: "rgba(255,255,255,0.12)", color: "white" }
                        : { background: "rgba(155,175,196,0.08)", color: "#6F8EAC" }
                    }
                  >
                    {cnt}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all"
        style={{
          background: canRight ? "rgba(155,175,196,0.12)" : "transparent",
          color: canRight ? "#9AAFC4" : "rgba(155,175,196,0.15)",
          cursor: canRight ? "pointer" : "default",
          border: "1px solid " + (canRight ? "rgba(155,175,196,0.18)" : "transparent"),
        }}
        aria-label="Geser kanan"
        tabIndex={canRight ? 0 : -1}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
