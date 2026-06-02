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
      audioRef.current.play().catch(() => { });
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

// ─── Loading Screen ───────────────────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  // Menggunakan useRef agar fungsi onComplete tidak memicu useEffect untuk re-render
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 2;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        setTimeout(() => {
          setFading(true);
          // Panggil fungsi onComplete setelah animasi fade selesai
          setTimeout(() => {
            if (onCompleteRef.current) onCompleteRef.current();
          }, 800);
        }, 600);
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []); // Array dependency dikosongkan agar interval tidak ter-reset

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center text-white transition-opacity duration-1000 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      // Tambahkan zIndex: 9999 di inline style agar MUTLAK berada paling depan
      style={{ fontFamily: "'Cormorant Garamond', serif", zIndex: 9999 }}
    >
      <div className="flex flex-col items-center animate-pulse duration-1000">
        <div className="mb-6 opacity-80">
          <svg width="32" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22V10" />
            <path d="M12 16c-3-2-4-5-2-7 1.5-1.5 3-1 3-1s1.5-.5 3 1c2 2 1 5-2 7" />
            <path d="M12 12c-2-1-2-3-1-4 1-1 2-1 2-1s1 0 2 1c1 1 1 3-1 4" />
            <path d="M12 8c-1-1-1-2-.5-3 .5-.5 1-.5 1-.5s.5 0 1 .5c.5 1 .5 2-.5 3" />
          </svg>
        </div>

        <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] mb-3 text-white/80 font-bold">
          Wedding Invitation
        </p>

        <h1 className="text-2xl md:text-3xl tracking-[0.2em] uppercase mb-8">
          Be & Rafi
        </h1>

        <p className="text-[10px] md:text-xs tracking-widest text-white/70">
          {progress}%
        </p>
      </div>
    </div>
  );
}


// ─── Cover / Landing ─────────────────────────────────────────────────────────
function Cover({ guestName, onOpen }: { guestName: string; onOpen: () => void }) {
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setClosing(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-1000 flex flex-col md:flex-row ${closing ? "opacity-0 pointer-events-none" : "opacity-100"}`}>

      {/* Bagian Kiri (Gambar Utama) - Tersembunyi di mobile, tampil di desktop */}
      <div
        className="hidden md:block md:w-2/3 lg:w-3/4 h-full relative bg-gray-900"
        style={{
          backgroundImage: `url('/bg-1.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Bagian Kanan (Sidebar Panel Gelap / Full screen di mobile) */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-full relative bg-black flex flex-col items-center justify-center p-8 text-center border-l border-white/10 shadow-2xl">

        {/* Background samar siluet */}
        <div
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `url('/bg-2.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>

        {/* Konten Text Sidebar */}
        <div
          className="relative z-10 flex flex-col items-center justify-center w-full mt-10 md:mt-0"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">
            The Wedding Of
          </p>

          {/* Jarak dari nama pengantin ke "Dear" diperbesar menggunakan mb-24 (sekitar 96px) */}
          <h1 className="text-4xl md:text-5xl text-white uppercase tracking-[0.05em] font-light mb-24">
            Be & Rafi
          </h1>

          {/* Jarak dari nama tamu ke tombol juga diperbesar menggunakan mb-28 (sekitar 112px) */}
          <div className="flex flex-col items-center mb-28">
            <p className="font-bold text-[15px] md:text-base text-white tracking-widest mb-5">
              Dear;
            </p>
            <div className="font-bold text-lg md:text-xl text-white tracking-widest">
              {guestName || "Family & Friends"}
            </div>
          </div>

          <button
            onClick={handleOpen}
            className="flex items-center justify-center border border-white/80 text-white bg-black/40 hover:bg-white hover:text-black transition-all duration-500 w-64 h-14 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium"
          >
            Open Invitation
          </button>
        </div>
      </div>

      {/* Mobile Background Fallback */}
      <div
        className="absolute inset-0 -z-10 md:hidden"
        style={{
          backgroundImage: `url('/bg-2.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}

// ─── Main Page Content ────────────────────────────────────────────────────────
function PageContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Family & Friends";

  const [isLoading, setIsLoading] = useState(true);
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

  // Bungkus fungsi dengan useCallback untuk optimasi
  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {/* Loading Screen wajib dipanggil paling bawah secara hierarki DOM 
        atau dijamin z-index nya lebih tinggi (sudah ditangani via style zIndex: 9999) 
      */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!opened ? (
        <Cover guestName={guestName} onOpen={handleOpen} />
      ) : (
        <>
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

            {/* ... [ SISA KODE KONTEN ANDA TETAP SAMA SEPERTI SEBELUMNYA ] ...
               (Bagian Greeting, Couple, Events, Love Story, Gallery, Gift, RSVP, Wishes, Closing, Footer)
            */}
          </main>
        </>
      )}
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
