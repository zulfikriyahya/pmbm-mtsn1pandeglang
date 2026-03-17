import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

interface FAQ {
  id: number;
  kategori: string;
  pertanyaan: string;
  jawaban: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((f) => (
        <FAQItem
          key={f.id}
          faq={f}
          isOpen={open === f.id}
          onToggle={() => setOpen((p) => (p === f.id ? null : f.id))}
        />
      ))}
    </div>
  );
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.28, ease: "power2.out" }
      );
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.22, ease: "power2.in" });
    }
  }, [isOpen]);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: "#0D1F30",
        border: isOpen ? "1px solid rgba(155,175,196,0.20)" : "1px solid rgba(155,175,196,0.08)",
        boxShadow: isOpen ? "0 4px 24px rgba(0,0,0,0.36)" : "0 1px 4px rgba(0,0,0,0.20)",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        style={{ background: "transparent" }}
      >
        <span className="text-sm font-semibold" style={{ color: "#E8EDF3" }}>
          {faq.pertanyaan}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: isOpen ? "#9AAFC4" : "rgba(155,175,196,0.25)" }}
        />
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div
          className="px-5 pb-5 pt-3 text-sm leading-relaxed"
          style={{
            borderTop: "1px solid rgba(155,175,196,0.08)",
            color: "#6F8EAC",
          }}
        >
          {faq.jawaban}
        </div>
      </div>
    </div>
  );
}
