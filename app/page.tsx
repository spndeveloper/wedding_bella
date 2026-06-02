"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ─── Countdown ────────────────────────────────────────────────────────────────
function Countdown({ variant = "white" }: { variant?: "white" | "sage" }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-05-16T15:00:00+07:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isWhite = variant === "white";
  const boxClass = isWhite ? "countdown-box" : "countdown-box-sage";

  return (
    <div className="flex gap-3 justify-center my-8">
      {[
        { val: time.days, label: "Hari" },
        { val: time.hours, label: "Jam" },
        { val: time.minutes, label: "Menit" },
        { val: time.seconds, label: "Detik" },
      ].map(({ val, label }) => (
        <div key={label} className={`${boxClass} rounded-md`}>
          <div
            className="text-3xl font-bold leading-none"
            style={{ color: isWhite ? "white" : "var(--sage)", fontFamily: "'Cormorant Garamond', serif" }}
          >
            {String(val).padStart(2, "0")}
          </div>
          <div
            className="font-sans-light text-[9px] uppercase tracking-widest mt-1"
            style={{ color: isWhite ? "rgba(255,255,255,0.7)" : "var(--text)", opacity: 0.7 }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Music Button ─────────────────────────────────────────────────────────────
function MusicButton() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://wed.ts-invitation.com/wp-content/uploads/2026/04/DEVOTION-mp3cut.net_.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg music-pulse"
      style={{ background: "var(--sage)", color: "white" }}
      title={playing ? "Pause music" : "Play music"}
    >
      <span style={{ position: "relative", zIndex: 2 }}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        )}
      </span>
    </button>
  );
}

// ─── Envelope Icon ────────────────────────────────────────────────────────────
function EnvelopeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13L2 4" />
    </svg>
  );
}

// ─── Rings Icon ───────────────────────────────────────────────────────────────
function RingsIcon({ color = "var(--gold-light)" }: { color?: string }) {
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" stroke={color} strokeWidth="1.2">
      <circle cx="14" cy="12" r="8" />
      <circle cx="26" cy="12" r="8" />
    </svg>
  );
}

// ─── RSVP Form ────────────────────────────────────────────────────────────────
function RSVPForm({ guestName }: { guestName: string }) {
  const [form, setForm] = useState({ name: guestName, attend: "", guests: "1" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="font-script text-4xl mb-2" style={{ color: "white" }}>Terima Kasih</div>
        <p className="font-sans-light text-sm tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>Konfirmasi Anda telah diterima</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      className="space-y-4 px-6 pb-6"
    >
      <div>
        <label className="font-sans-light text-xs uppercase tracking-widest block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Nama</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full border-b bg-transparent py-2 text-sm focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
          placeholder="Nama lengkap Anda"
        />
      </div>
      <div>
        <label className="font-sans-light text-xs uppercase tracking-widest block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Kehadiran</label>
        <select
          value={form.attend}
          onChange={(e) => setForm({ ...form, attend: e.target.value })}
          required
          className="w-full border-b bg-transparent py-2 text-sm focus:outline-none"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
        >
          <option value="" style={{ color: "#333" }}>Pilih...</option>
          <option value="yes" style={{ color: "#333" }}>Ya, saya akan hadir</option>
          <option value="no" style={{ color: "#333" }}>Tidak, saya tidak bisa hadir</option>
        </select>
      </div>
      {form.attend === "yes" && (
        <div>
          <label className="font-sans-light text-xs uppercase tracking-widest block mb-1" style={{ color: "rgba(255,255,255,0.6)" }}>Jumlah Tamu</label>
          <select
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="w-full border-b bg-transparent py-2 text-sm focus:outline-none"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
          >
            <option value="1" style={{ color: "#333" }}>1 Orang</option>
            <option value="2" style={{ color: "#333" }}>2 Orang</option>
          </select>
        </div>
      )}
      <div className="pt-4 text-center">
        <button
          type="submit"
          className="px-10 py-3 text-xs uppercase tracking-widest font-sans-light transition-all rounded"
          style={{ background: "white", color: "var(--sage)" }}
        >
          Kirim Konfirmasi
        </button>
      </div>
    </form>
  );
}

// ─── Wishes ───────────────────────────────────────────────────────────────────
function WishesSection() {
  const [wishes, setWishes] = useState([
    { name: "Ayu", message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah", attend: "Hadir" },
    { name: "Rizky", message: "Bahagia selalu Banyu & Fadli!", attend: "Hadir" },
    { name: "Dian", message: "Semoga langgeng sampai maut memisahkan", attend: "Hadir" },
  ]);
  const [form, setForm] = useState({ name: "", message: "", attend: "Hadir" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.message) {
      setWishes([{ name: form.name, message: form.message, attend: form.attend }, ...wishes]);
      setForm({ name: "", message: "", attend: "Hadir" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nama Anda"
          required
          className="w-full border rounded-lg bg-transparent px-4 py-3 text-sm focus:outline-none"
          style={{ borderColor: "rgba(139,161,134,0.3)", color: "var(--text)" }}
        />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tulis ucapan Anda..."
          required
          rows={3}
          className="w-full border rounded-lg bg-transparent px-4 py-3 text-sm focus:outline-none resize-none"
          style={{ borderColor: "rgba(139,161,134,0.3)", color: "var(--text)" }}
        />
        <div className="flex gap-2">
          {["Hadir", "Tidak Hadir", "Mungkin"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setForm({ ...form, attend: opt })}
              className="px-4 py-2 text-[10px] font-sans-light uppercase tracking-wider border rounded-md transition-all"
              style={{
                borderColor: "var(--sage)",
                background: form.attend === opt ? "var(--sage)" : "transparent",
                color: form.attend === opt ? "white" : "var(--sage)",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        <button type="submit" className="btn-sage w-full rounded-lg py-3">
          {submitted ? "Terkirim ✓" : "Kirim Ucapan"}
        </button>
      </form>

      <div className="wishes-scroll space-y-3 pr-1">
        {wishes.map((w, i) => (
          <div key={i} className="wish-item">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "var(--sage)", color: "white" }}
              >
                {w.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-medium text-sm block">{w.name}</span>
                <span
                  className="text-[10px] font-sans-light"
                  style={{ color: "var(--sage)" }}
                >
                  {w.attend}
                </span>
              </div>
            </div>
            <p className="text-sm opacity-70 italic ml-10">&ldquo;{w.message}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Copy Button ──────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="copy-btn"
    >
      {copied ? "Tersalin ✓" : "Salin"}
    </button>
  );
}

// ─── Gift Modal ───────────────────────────────────────────────────────────────
function GiftModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="text-center mb-6">
          <p className="font-sans-light text-xs uppercase tracking-[0.3em] opacity-50 mb-1">Wedding Gift</p>
          <h3 className="font-script text-4xl" style={{ color: "var(--sage)" }}>Kirim Hadiah</h3>
          <div className="divider-sage divider my-4"><span className="ornament" style={{ color: "var(--sage)" }}>❧</span></div>
          <p className="text-sm opacity-60 leading-relaxed">
            Kehadiran dan doa Anda adalah hadiah terbesar bagi kami.
            Namun jika Anda ingin memberikan hadiah, kami dengan senang hati menerimanya.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { bank: "Bank Mandiri", acc: "9000021885588", name: "a.n Banyu Widya Tatiana Ulfa", logo: "💳" },
            { bank: "Bank BCA", acc: "0343380167", name: "a.n M Fadli Yaser", logo: "💳" },
          ].map((g) => (
            <div key={g.acc} className="border rounded-lg p-4" style={{ borderColor: "rgba(139,161,134,0.3)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span>{g.logo}</span>
                <p className="font-sans-light text-xs uppercase tracking-widest opacity-60">{g.bank}</p>
              </div>
              <p className="text-lg font-medium tracking-wider mb-1" style={{ color: "var(--sage)" }}>{g.acc}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-50">{g.name}</p>
                <CopyButton text={g.acc} />
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Address */}
        <div className="mt-6 border rounded-lg p-4" style={{ borderColor: "rgba(139,161,134,0.3)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span>📦</span>
            <p className="font-sans-light text-xs uppercase tracking-widest opacity-60">Alamat Pengiriman</p>
          </div>
          <p className="text-sm leading-relaxed opacity-70">
            Jl. Nurul Iman No.52, RT.05/RW.04, Cipedak, Kec. Jagakarsa, Jakarta Selatan, DKI Jakarta 12630
          </p>
          <p className="text-xs opacity-50 mt-1">a.n Banyu Widya Tatiana Ulfa</p>
          <div className="mt-2 text-right">
            <CopyButton text="Jl. Nurul Iman No.52, RT.05/RW.04, Cipedak, Kec. Jagakarsa, Jakarta Selatan, DKI Jakarta 12630" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY_IMAGES = [
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-5.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-2.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-1.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-4.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-3.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-11.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-9.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-8.jpg",
  "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-12.jpg",
];


// ─── Cover / Landing ─────────────────────────────────────────────────────────
function Cover({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setClosing(true);
    setTimeout(onOpen, 800); // Waktu transisi saat menutup cover
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-700 ${closing ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/bg-landing.jpeg')`, 
          backgroundSize: "cover",
          backgroundPosition: '25% 25%', // Memastikan bagian atas (kepala) tidak terpotong
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Gradient Overlay: Gelap di ujung atas dan bawah, transparan murni di tengah */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none z-0" />

      {/* Wrapper Konten Utama - Flexbox penuh memastikan semua konten pasti di tengah (center) */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 md:py-16 px-4">
        
        {/* Bagian Atas */}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <p className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-white/80 mb-1">
            The Wedding Of
          </p>
          <h1 className="font-script text-6xl md:text-8xl drop-shadow-lg" style={{ color: "var(--gold-light)" }}>
            Banyu & Fadli
          </h1>
        </div>

        {/* Bagian Bawah */}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/70 mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          
          <div className="font-sans font-bold text-lg md:text-2xl text-white tracking-widest mb-1 drop-shadow-md">
            {guestName || "Tamu Undangan"}
          </div>
          
          <p className="font-sans text-[8px] md:text-[10px] italic text-white/50 mb-6 tracking-wider">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>

          <button
            onClick={handleOpen}
            className="group flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/40 bg-black/40 hover:bg-black/60 backdrop-blur-md transition-all duration-300 envelope-float mx-auto"
          >
            <div className="scale-75 text-white flex items-center justify-center">
              <EnvelopeIcon />
            </div>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] text-white">
              Buka Undangan
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Main Page Content ────────────────────────────────────────────────────────
function PageContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";
  const [opened, setOpened] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [giftOpen, setGiftOpen] = useState(false);

  // Scroll reveal
  useEffect(() => {
    if (!opened) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [opened]);

  // Auto-play music on open
  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  if (!opened) {
    return <Cover guestName={guestName} onOpen={handleOpen} />;
  }

  return (
    <>
      {/* Watercolor parallax background */}
      <div className="watercolor-bg" />
      <div className="watercolor-leaves" />

      <main className="invitation-wrapper">
        <MusicButton />
        <GiftModal isOpen={giftOpen} onClose={() => setGiftOpen(false)} />

        {/* Lightbox */}
        {lightbox && (
          <div
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <img src={lightbox} alt="" className="max-h-full max-w-full object-contain rounded-lg" />
          </div>
        )}

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-end text-center" style={{ minHeight: "100vh" }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-1.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <div className="cover-gradient absolute inset-0" />
          <div className="relative z-10 text-white pb-16">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.5em] opacity-60 mb-4">The Wedding of</p>
            <h1 className="font-script text-6xl md:text-7xl" style={{ color: "var(--gold-light)" }}>Banyu</h1>
            <div className="flex items-center justify-center my-2">
              <RingsIcon />
            </div>
            <h1 className="font-script text-6xl md:text-7xl" style={{ color: "var(--gold-light)" }}>Fadli</h1>
            <p className="font-sans-light text-xs tracking-[0.3em] mt-4 opacity-60">SATURDAY, 16 MAY 2026</p>
            <Countdown variant="white" />
          </div>
        </section>

        {/* ── GREETING ──────────────────────────────────────────── */}
        <section className="section-cream py-16 px-6 text-center">
          <div className="max-w-md mx-auto reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Kepada Yth.</p>
            <p className="font-script text-3xl mb-6" style={{ color: "var(--sage)" }}>{guestName}</p>
            <div className="divider-sage divider mb-6"><span className="ornament" style={{ color: "var(--sage)" }}>❧</span></div>
            <p className="text-sm leading-relaxed opacity-70" style={{ fontStyle: "italic" }}>
              Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className="text-sm leading-relaxed opacity-60 mt-4">
              Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i
              untuk menghadiri acara pernikahan kami.
            </p>
          </div>
        </section>

        {/* ── COUPLE ────────────────────────────────────────────── */}
        <section className="section-cream py-12 px-5 text-center">
          <div className="reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Mempelai</p>
            <h2 className="font-script text-4xl mb-6" style={{ color: "var(--sage)" }}>Bride &amp; Groom</h2>
          </div>

          <div className="flex gap-3 justify-center items-stretch reveal">
            {/* Bride */}
            <div className="couple-card flex-1" style={{ maxWidth: "220px", minHeight: "340px" }}>
              <img
                src="https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-4.jpg"
                alt="Banyu"
                className="w-full h-full object-cover"
                style={{ position: "absolute", inset: 0 }}
              />
              <div className="couple-tab couple-tab-left">The Bride</div>
              <div className="couple-card-overlay text-center text-white">
                <h3 className="font-script text-3xl mb-1" style={{ color: "var(--gold-light)" }}>Banyu</h3>
                <p className="text-xs opacity-80">Banyu Widya Tatiana Ulfa</p>
                <p className="text-[10px] font-sans-light opacity-50 mt-1">Putri ke-4 dari Bpk. Halwanih (Alm) &amp; Ibu Wiwik S. Widayati</p>
                <a href="https://www.instagram.com/banyuwidya" target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1 mt-2 text-[10px] font-sans-light opacity-50 hover:opacity-80 transition-opacity" style={{ color: "white" }}>
                  @banyuwidya
                </a>
              </div>
            </div>

            {/* With connector */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-px flex-1" style={{ background: "var(--sage)", opacity: 0.3 }} />
              <span className="font-script text-xl my-2" style={{ color: "var(--sage)" }}>&amp;</span>
              <div className="w-px flex-1" style={{ background: "var(--sage)", opacity: 0.3 }} />
            </div>

            {/* Groom */}
            <div className="couple-card flex-1" style={{ maxWidth: "220px", minHeight: "340px" }}>
              <img
                src="https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-12.jpg"
                alt="Fadli"
                className="w-full h-full object-cover"
                style={{ position: "absolute", inset: 0 }}
              />
              <div className="couple-tab couple-tab-right">The Groom</div>
              <div className="couple-card-overlay text-center text-white">
                <h3 className="font-script text-3xl mb-1" style={{ color: "var(--gold-light)" }}>Fadli</h3>
                <p className="text-xs opacity-80">M Fadli Yaseir</p>
                <p className="text-[10px] font-sans-light opacity-50 mt-1">Putra ke-1 dari Bpk. Tamsir, S.Pd.I &amp; Ibu Emliza</p>
                <a href="https://www.instagram.com/fadliysr" target="_blank" rel="noopener"
                  className="inline-flex items-center gap-1 mt-2 text-[10px] font-sans-light opacity-50 hover:opacity-80 transition-opacity" style={{ color: "white" }}>
                  @fadliysr
                </a>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mt-10 max-w-sm mx-auto reveal">
            <p className="font-sans-light text-xs italic opacity-50 leading-relaxed">
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
              pasangan-pasangan dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.&rdquo;
            </p>
            <p className="font-sans-light text-[10px] opacity-30 mt-2 tracking-wider">— QS. Ar-Rum: 21</p>
          </div>
        </section>

        {/* ── EVENTS ────────────────────────────────────────────── */}
        <section className="section-cream py-16 px-5 text-center">
          <div className="reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Tanggal Penting</p>
            <h2 className="font-script text-4xl mb-2" style={{ color: "var(--sage)" }}>Akad &amp; Resepsi</h2>
            <div className="divider-sage divider mb-10"><span className="ornament" style={{ color: "var(--sage)" }}>❧</span></div>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Akad Nikah",
                label: "Wedding Ceremony",
                date: "Sabtu, 16 Mei 2026",
                time: "15.00 – 17.00 WIB",
                img: "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-4.jpg",
              },
              {
                title: "Resepsi",
                label: "Wedding Reception",
                date: "Sabtu, 16 Mei 2026",
                time: "18.00 – 21.00 WIB",
                img: "https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-12.jpg",
              },
            ].map((ev) => (
              <div key={ev.title} className="event-card reveal">
                <div className="arch-photo" style={{ height: "200px" }}>
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover" />
                </div>
                <div className="event-card-content text-center">
                  <p className="font-sans-light text-[10px] uppercase tracking-widest opacity-60 mb-1">{ev.label}</p>
                  <h3 className="font-script text-3xl mb-3" style={{ color: "var(--gold-light)" }}>{ev.title}</h3>
                  <p className="font-sans-light text-xs tracking-wider opacity-80">{ev.date}</p>
                  <p className="font-sans-light text-xs tracking-wider opacity-80 mb-4">{ev.time}</p>
                  <div className="text-xs opacity-70 leading-relaxed mb-4">
                    <strong>SANGGAR DE BATAVIA</strong><br />
                    Jl. Nurul Iman No.52, Cipedak, Jagakarsa<br />
                    Jakarta Selatan 12630
                  </div>
                  <a
                    href="https://maps.app.goo.gl/FbUR5iRU4d64suy77"
                    target="_blank"
                    rel="noopener"
                    className="inline-block px-6 py-2 text-[10px] uppercase tracking-widest font-sans-light border rounded"
                    style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Save the date + countdown */}
          <div className="reveal mt-10">
            <Countdown variant="sage" />
            <a
              href="https://www.google.com/calendar/render?action=TEMPLATE&text=The%20Wedding%20of%20Banyu%20and%20Fadli&dates=20260516T150000/20260516T210000"
              target="_blank"
              rel="noopener"
              className="btn-sage-outline inline-block mt-2"
            >
              Save the Date
            </a>
          </div>

          {/* Live Streaming */}
          <div className="reveal mt-10 p-6 rounded-lg" style={{ background: "var(--sage)", color: "white" }}>
            <p className="font-sans-light text-[10px] uppercase tracking-widest opacity-60 mb-1">Live Streaming</p>
            <h3 className="font-script text-3xl mb-3" style={{ color: "var(--gold-light)" }}>Saksikan Online</h3>
            <p className="text-sm opacity-70 mb-4">Pernikahan kami dapat disaksikan secara langsung melalui tombol di bawah ini:</p>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener"
              className="inline-block px-8 py-3 text-[10px] uppercase tracking-widest font-sans-light rounded"
              style={{ background: "white", color: "var(--sage)" }}
            >
              Join Live Streaming
            </a>
          </div>
        </section>

        {/* ── LOVE STORY ────────────────────────────────────────── */}
        <section className="section-cream py-16 px-5">
          <div className="text-center reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Our Journey</p>
            <h2 className="font-script text-4xl mb-2" style={{ color: "var(--sage)" }}>Love Story</h2>
            <div className="divider-sage divider mb-10"><span className="ornament" style={{ color: "var(--sage)" }}>❧</span></div>
          </div>

          <div className="relative max-w-md mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px" style={{ background: "var(--sage-light)", opacity: 0.4 }} />

            {[
              { year: "2018", title: "Pertama Bertemu", desc: "Hari-hari awal begitu sederhana: jalan-jalan di kampus, berdiskusi panjang, dan perlahan menyadari bahwa bagian terbaik dari setiap hari adalah orang yang duduk di samping." },
              { year: "2019–2024", title: "Tumbuh Bersama", desc: "Seiring berjalannya waktu kuliah dan kehidupan nyata dimulai, hubungan hanya tumbuh semakin kuat. Saling mendukung melalui pekerjaan pertama, malam-malam panjang, dan tantangan hidup." },
              { year: "2025", title: "Janji Suci", desc: "Di penghujung 2025, di hari Desember yang cerah, sebuah janji dibuat yang mengubah segalanya. Transisi dari 'pasangan' menjadi 'bertunangan' membawa rasa tanggung jawab dan kegembiraan baru." },
              { year: "2026", title: "Bab Abadi", desc: "Kini, di tahun 2026, setelah delapan tahun tumbuh, belajar, dan bermimpi bersama, pasangan kampus ini resmi menjadi keluarga." },
            ].map((s, i) => (
              <div key={s.year} className="reveal flex gap-4 mb-8 relative">
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: "48px" }}>
                  <div className="timeline-dot mt-1" />
                </div>
                <div className="flex-1 pb-2">
                  <span className="font-sans-light text-[10px] tracking-widest" style={{ color: "var(--sage)" }}>{s.year}</span>
                  <h3 className="font-script text-2xl mb-1" style={{ color: "var(--sage)" }}>{s.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ───────────────────────────────────────────── */}
        <section className="section-cream py-16 px-5 text-center">
          <div className="reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Momen Kami</p>
            <h2 className="font-script text-4xl mb-2" style={{ color: "var(--sage)" }}>Gallery</h2>
            <div className="divider-sage divider mb-6"><span className="ornament" style={{ color: "var(--sage)" }}>❧</span></div>
          </div>

          {/* Video embed */}
          <div className="reveal mb-4 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Wedding Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Mosaic grid */}
          <div className="reveal">
            {/* Row 1: full width */}
            <div className="mb-2 gallery-item rounded-lg overflow-hidden" style={{ height: "200px" }}>
              <button onClick={() => setLightbox(GALLERY_IMAGES[0])} className="w-full h-full">
                <img src={GALLERY_IMAGES[0]} alt="Gallery 1" className="w-full h-full object-cover" />
              </button>
            </div>
            {/* Row 2: two columns */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {GALLERY_IMAGES.slice(1, 3).map((src, i) => (
                <div key={i} className="gallery-item rounded-lg overflow-hidden" style={{ height: "160px" }}>
                  <button onClick={() => setLightbox(src)} className="w-full h-full">
                    <img src={src} alt={`Gallery ${i + 2}`} className="w-full h-full object-cover" />
                  </button>
                </div>
              ))}
            </div>
            {/* Row 3: three columns */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              {GALLERY_IMAGES.slice(3, 6).map((src, i) => (
                <div key={i} className="gallery-item rounded-lg overflow-hidden" style={{ height: "130px" }}>
                  <button onClick={() => setLightbox(src)} className="w-full h-full">
                    <img src={src} alt={`Gallery ${i + 4}`} className="w-full h-full object-cover" />
                  </button>
                </div>
              ))}
            </div>
            {/* Row 4: two columns */}
            <div className="grid grid-cols-2 gap-2">
              {GALLERY_IMAGES.slice(6, 8).map((src, i) => (
                <div key={i} className="gallery-item rounded-lg overflow-hidden" style={{ height: "160px" }}>
                  <button onClick={() => setLightbox(src)} className="w-full h-full">
                    <img src={src} alt={`Gallery ${i + 7}`} className="w-full h-full object-cover" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GIFT ─────────────────────────────────────────────── */}
        <section className="section-cream py-16 px-5 text-center">
          <div className="reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Hadiah</p>
            <h2 className="font-script text-4xl mb-2" style={{ color: "var(--sage)" }}>Wedding Gift</h2>
            <div className="divider-sage divider mb-6"><span className="ornament" style={{ color: "var(--sage)" }}>❧</span></div>
            <p className="text-sm opacity-60 leading-relaxed mb-8">
              Kehadiran dan doa Anda merupakan hadiah terindah bagi kami.
              Namun jika Anda ingin memberikan tanda kasih, kami dengan senang hati menerimanya.
            </p>
            <button onClick={() => setGiftOpen(true)} className="btn-sage">
              🎁 &nbsp;Kirim Hadiah
            </button>
          </div>
        </section>

        {/* ── RSVP ─────────────────────────────────────────────── */}
        <section className="section-cream py-16 px-5 text-center">
          <div className="reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Konfirmasi</p>
            <h2 className="font-script text-4xl mb-6" style={{ color: "var(--sage)" }}>RSVP</h2>
          </div>
          <div className="rsvp-card reveal">
            {/* RSVP header photo */}
            <div className="h-40 overflow-hidden">
              <img
                src="https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-5.jpg"
                alt="RSVP"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="font-script text-2xl mb-2" style={{ color: "var(--gold-light)" }}>Konfirmasi Kehadiran</h3>
              <p className="text-xs font-sans-light opacity-70 mb-4">
                Mohon konfirmasi kehadiran Anda
              </p>
            </div>
            <RSVPForm guestName={guestName} />
          </div>
        </section>

        {/* ── WISHES ───────────────────────────────────────────── */}
        <section className="section-cream py-16 px-5 text-center">
          <div className="reveal">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-2">Ucapan</p>
            <h2 className="font-script text-4xl mb-2" style={{ color: "var(--sage)" }}>Wishes</h2>
            <div className="divider-sage divider mb-8"><span className="ornament" style={{ color: "var(--sage)" }}>❧</span></div>
          </div>
          <div className="reveal">
            <WishesSection />
          </div>
        </section>

        {/* ── CLOSING ──────────────────────────────────────────── */}
        <section className="section-cream py-16 text-center">
          {/* Arch photo */}
          <div className="reveal px-12 mb-8">
            <div className="arch-photo mx-auto" style={{ maxWidth: "260px", height: "320px" }}>
              <img
                src="https://wed.ts-invitation.com/wp-content/uploads/2026/04/BANYU-FADLI-10.jpg"
                alt="Closing"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="reveal px-6">
            <p className="font-sans-light text-[10px] uppercase tracking-[0.4em] opacity-40 mb-3">See You On</p>
            <h2 className="font-script text-5xl mb-2" style={{ color: "var(--sage)" }}>Our Big Day!</h2>
            <div className="flex items-center gap-3 justify-center my-4 opacity-40">
              <div className="h-px w-10" style={{ background: "var(--sage)" }} />
              <span style={{ color: "var(--sage)" }}>✦</span>
              <div className="h-px w-10" style={{ background: "var(--sage)" }} />
            </div>
            <p className="font-script text-3xl" style={{ color: "var(--sage)" }}>Banyu &amp; Fadli</p>
            <p className="font-sans-light text-[10px] tracking-[0.3em] opacity-30 mt-4 uppercase">Thank You</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center" style={{ background: "white" }}>
          <div className="gold-seal mb-3">
            <span className="font-script text-lg text-white">B&amp;F</span>
          </div>
          <p className="font-sans-light text-[10px] opacity-30 tracking-widest uppercase">
            © 2026 Banyu &amp; Fadli Wedding
          </p>
        </footer>
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: "var(--sage)" }}>
        <p className="font-script text-4xl text-white">Banyu &amp; Fadli</p>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
