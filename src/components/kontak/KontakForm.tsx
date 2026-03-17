import { CheckCircle, Send } from "lucide-react";
import { useState } from "react";

interface F {
  nama: string;
  kontak: string;
  pesan: string;
}

export default function KontakForm() {
  const [form, setForm] = useState<F>({ nama: "", kontak: "", pesan: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const sub = encodeURIComponent(`Pesan dari ${form.nama} — PMBM MTsN 1 Pandeglang`);
    const body = encodeURIComponent(
      `Nama   : ${form.nama}\nKontak : ${form.kontak}\n\nPesan  :\n${form.pesan}`
    );
    setTimeout(() => {
      window.location.href = `mailto:adm@mtsn1pandeglang.sch.id?subject=${sub}&body=${body}`;
      setSent(true);
      setLoading(false);
    }, 600);
  };

  const cardStyle: React.CSSProperties = {
    background: "#0D1F30",
    border: "1px solid rgba(155,175,196,0.09)",
    boxShadow: "0 2px 20px rgba(0,0,0,0.32)",
    borderRadius: "1rem",
    padding: "2rem",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    border: "1px solid rgba(155,175,196,0.12)",
    background: "#07121C",
    color: "#E8EDF3",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#9AAFC4",
    marginBottom: "0.375rem",
  };

  if (sent)
    return (
      <div style={cardStyle} className="text-center">
        <div
          className="w-14 h-14 mx-auto mb-5 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#1E3A57,#2E567C)" }}
        >
          <CheckCircle size={26} color="white" />
        </div>
        <h3 className="font-bold text-xl mb-2" style={{ color: "#E8EDF3" }}>
          Pesan Terkirim
        </h3>
        <p className="text-sm" style={{ color: "#6F8EAC" }}>
          Email client Anda terbuka. Panitia akan segera merespons.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm({ nama: "", kontak: "", pesan: "" });
          }}
          style={{
            marginTop: "1.5rem",
            padding: "0.625rem 1.5rem",
            borderRadius: "99px",
            border: "1px solid rgba(155,175,196,0.18)",
            color: "#9AAFC4",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            background: "transparent",
            transition: "all 0.2s",
          }}
        >
          Kirim Pesan Lain
        </button>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      <div>
        <h3 className="font-bold text-xl" style={{ color: "#E8EDF3" }}>
          Kirim Pesan
        </h3>
        <p className="text-sm mt-1" style={{ color: "#6F8EAC" }}>
          Punya pertanyaan? Kami siap membantu.
        </p>
      </div>

      {(
        [
          { key: "nama" as const, label: "Nama Lengkap", placeholder: "Masukkan nama Anda" },
          {
            key: "kontak" as const,
            label: "Email / WhatsApp",
            placeholder: "email@contoh.com atau 08xxxxxxxxxx",
          },
        ] as const
      ).map((f) => (
        <div key={f.key}>
          <label style={labelStyle}>
            {f.label} <span style={{ color: "#f87171" }}>*</span>
          </label>
          <input
            type="text"
            required
            value={form[f.key]}
            onChange={set(f.key)}
            placeholder={f.placeholder}
            style={inputStyle}
          />
        </div>
      ))}

      <div>
        <label style={labelStyle}>
          Pesan <span style={{ color: "#f87171" }}>*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.pesan}
          onChange={set("pesan")}
          placeholder="Tulis pertanyaan atau pesan Anda..."
          style={{ ...inputStyle, resize: "none" }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          width: "100%",
          padding: "0.875rem",
          borderRadius: "99px",
          border: "none",
          background: loading ? "rgba(30,58,87,0.55)" : "linear-gradient(135deg,#1E3A57,#2E567C)",
          color: "white",
          fontSize: "0.9375rem",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 20px rgba(46,86,124,0.38)",
          transition: "all 0.3s",
        }}
      >
        {loading ? (
          <span
            style={{
              width: 16,
              height: 16,
              border: "2px solid rgba(255,255,255,0.3)",
              borderTopColor: "white",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }}
          />
        ) : (
          <Send size={15} />
        )}
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}
