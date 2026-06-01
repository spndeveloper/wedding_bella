# Wedding Invitation - Banyu & Fadli

Undangan pernikahan digital yang dibangun dengan Next.js 15 + Tailwind CSS. Siap deploy ke Vercel.

## Fitur
- ✅ Cover page dengan nama tamu dari URL (`?to=NamaTamu`)
- ✅ Countdown timer real-time ke tanggal pernikahan
- ✅ Profil mempelai dengan foto
- ✅ Detail acara (Ceremony & Reception)
- ✅ Timeline love story
- ✅ Gallery foto dengan lightbox
- ✅ Informasi rekening hadiah + copy button
- ✅ Form RSVP konfirmasi kehadiran
- ✅ Kolom ucapan / wishes
- ✅ Background music dengan kontrol play/pause
- ✅ Scroll reveal animations
- ✅ Fully responsive (mobile & desktop)

## Cara Pakai

### Jalankan Lokal
```bash
npm install
npm run dev
```
Buka: http://localhost:3000?to=NamaTamu

### Deploy ke Vercel
1. Push project ke GitHub
2. Buka https://vercel.com/new
3. Import repository
4. Klik Deploy — selesai!

### Custom URL per Tamu
Tambahkan query parameter `?to=` diikuti nama tamu:
```
https://yoursite.vercel.app?to=Sabella+Xena
https://yoursite.vercel.app?to=Budi+Santoso
```

## Kustomisasi

Edit `app/page.tsx` untuk mengubah:
- Nama mempelai, tanggal, venue
- Nomor rekening
- Foto (ganti URL gambar)
- Love story

Edit `app/globals.css` untuk mengubah warna tema:
```css
--cream: #faf6f0;
--gold:  #c9a96e;
--dark:  #2c2416;
```

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS 4
- TypeScript
- Google Fonts (Great Vibes, Cormorant Garamond, Montserrat)
