import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import FAQAccordion from "./FAQAccordion";
import FAQTabs from "./FAQTabs";

interface FAQ {
  id: number;
  kategori: string;
  pertanyaan: string;
  jawaban: string;
}

const KATEGORI = [
  "Semua",
  "Pendaftaran",
  "Persyaratan Dokumen",
  "Seleksi & Tes",
  "Daftar Ulang & Biaya",
  "Lainnya",
];

export default function FAQSearch({ faqs }: { faqs: FAQ[] }) {
  const [query, setQuery] = useState("");
  const [kat, setKat] = useState("Semua");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    KATEGORI.slice(1).forEach((k) => {
      c[k] = faqs.filter((f) => f.kategori === k).length;
    });
    return c;
  }, [faqs]);

  const filtered = useMemo(
    () =>
      faqs.filter((f) => {
        const ok = kat === "Semua" || f.kategori === kat;
        const q = query.toLowerCase();
        return (
          ok &&
          (!q || f.pertanyaan.toLowerCase().includes(q) || f.jawaban.toLowerCase().includes(q))
        );
      }),
    [faqs, query, kat]
  );

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "rgba(155,175,196,0.40)" }}
        />
        <input
          type="search"
          placeholder="Cari pertanyaan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
          style={{
            background: "#07121C",
            border: "1px solid rgba(155,175,196,0.10)",
            color: "#E8EDF3",
            boxShadow: "0 2px 8px rgba(0,0,0,0.24)",
          }}
        />
      </div>

      {/* Tabs */}
      <div className="mb-8 overflow-x-auto scrollbar-none -mx-4 px-4">
        <FAQTabs active={kat} onChange={setKat} counts={counts} />
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <FAQAccordion faqs={filtered} />
      ) : (
        <div className="text-center py-16">
          <div
            className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ background: "rgba(155,175,196,0.08)" }}
          >
            <Search size={22} style={{ color: "rgba(155,175,196,0.35)" }} />
          </div>
          <p className="text-sm font-medium" style={{ color: "#6F8EAC" }}>
            Tidak ada hasil ditemukan.
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(155,175,196,0.35)" }}>
            Coba kata kunci atau kategori lain.
          </p>
        </div>
      )}
    </div>
  );
}
