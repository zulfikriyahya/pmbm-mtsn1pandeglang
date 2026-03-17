import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import PersonilCard from "./PersonilCard";
import PersonilModal from "./PersonilModal";

export interface Personil {
  id: number;
  nama: string;
  foto: string;
  jabatan: string;
  kategori: "guru" | "staf";
  quotes?: string;
  sosmed?: { ig?: string; fb?: string; email?: string };
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-4">
      <span className="w-6 h-0.5 rounded-full flex-shrink-0" style={{ background: "#2E567C" }} />
      <h3 className="text-base font-bold" style={{ color: "#E8EDF3" }}>
        {children}
      </h3>
      <span className="w-6 h-0.5 rounded-full flex-shrink-0" style={{ background: "#2E567C" }} />
    </div>
  );
}

function InfiniteRow({
  items,
  dir,
  onSelect,
}: {
  items: Personil[];
  dir: "left" | "right";
  onSelect: (p: Personil) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const CARD_W = 216;
  const COPIES = Math.max(8, Math.ceil(16 / items.length));
  const cloned = Array.from({ length: COPIES }, () => items).flat();

  useEffect(() => {
    if (!items.length) return;
    const totalW = items.length * CARD_W;
    const startX = dir === "left" ? 0 : -totalW;
    gsap.set(trackRef.current, { x: startX });
    tweenRef.current = gsap.to(trackRef.current, {
      x: dir === "left" ? `-=${totalW}` : `+=${totalW}`,
      duration: items.length * 4,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const v = parseFloat(x) % totalW;
          return dir === "left" ? (v > 0 ? v - totalW : v) : v < 0 ? v + totalW : v;
        }),
      },
    });
    return () => tweenRef.current?.kill();
  }, [items, dir]);

  return (
    <div
      className="overflow-hidden py-2 cursor-grab active:cursor-grabbing"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
      onTouchStart={() => tweenRef.current?.pause()}
      onTouchEnd={() => tweenRef.current?.resume()}
    >
      <div ref={trackRef} className="flex gap-4 w-max">
        {cloned.map((p, i) => (
          <PersonilCard key={`${p.id}-${i}`} p={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function StaticRow({ items, onSelect }: { items: Personil[]; onSelect: (p: Personil) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-2">
      {items.map((p) => (
        <PersonilCard key={p.id} p={p} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function PersonilSlider({ guru, staf }: { guru: Personil[]; staf: Personil[] }) {
  const [selected, setSelected] = useState<Personil | null>(null);

  const kepala = guru.filter((p) => p.jabatan === "Kepala Madrasah");
  const wakamad = guru.filter((p) => p.jabatan.startsWith("Wakamad"));
  const guruBiasa = guru.filter((p) => p.jabatan === "Guru");

  const kepalaStaf = staf.filter((p) => p.jabatan === "Kepala Tata Usaha");
  const stafBiasa = staf.filter((p) => p.jabatan === "Staf Tata Usaha");

  const guruRows = chunk(guruBiasa, Math.ceil(guruBiasa.length / 2));
  const stafRows = chunk(stafBiasa, Math.ceil(stafBiasa.length / 2));

  return (
    <section className="py-20" style={{ background: "#07121C" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: "#9AAFC4" }}
          >
            <span className="block w-6 h-0.5 rounded-full" style={{ background: "#9AAFC4" }} />
            Sumber Daya Manusia
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mt-3"
            style={{ color: "#E8EDF3" }}
          >
            Personil Madrasah
          </h2>
          <p className="mt-3" style={{ color: "#6F8EAC" }}>
            Klik kartu untuk melihat profil lengkap
          </p>
        </div>

        {/* Kepala Madrasah */}
        <div className="mb-10">
          <SectionLabel>Kepala Madrasah</SectionLabel>
          <StaticRow items={kepala} onSelect={setSelected} />
        </div>

        {/* Wakil Kepala Madrasah */}
        <div className="mb-10">
          <SectionLabel>Wakil Kepala Madrasah</SectionLabel>
          <StaticRow items={wakamad} onSelect={setSelected} />
        </div>

        {/* Guru */}
        <div className="mb-2">
          <SectionLabel>Tenaga Pendidik (Guru)</SectionLabel>
          {guruRows.slice(0, 2).map((row, i) => (
            <InfiniteRow key={i} items={row} dir="left" onSelect={setSelected} />
          ))}
        </div>

        {/* Kepala TU */}
        <div className="mt-10 mb-10">
          <SectionLabel>Kepala Tata Usaha</SectionLabel>
          <StaticRow items={kepalaStaf} onSelect={setSelected} />
        </div>

        {/* Staf TU */}
        <div className="mt-2">
          <SectionLabel>Tenaga Kependidikan (Staf)</SectionLabel>
          {stafRows.slice(0, 2).map((row, i) => (
            <InfiniteRow key={i} items={row} dir="left" onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && <PersonilModal p={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
