# PRD.md — Product Requirements Document

Dokumen kebutuhan produk untuk website **Lorong Nusantara — Litera Jatim**
(repo `LANDINGPAGEJAWA_SP`).

---

## 1. Ringkasan Produk

Website statis yang mendokumentasikan, memetakan, dan mengeksplorasi **perkembangan
sejarah sastra Jawa Timur** melalui dua pendekatan kajian sastra (Periodisasi dan
Resepsi), disajikan sebagai kumpulan artikel ilmiah PDF dalam tampilan yang menarik,
responsif, dan mendukung mode terang/gelap.

## 2. Latar Belakang & Tujuan

- **Latar:** Tugas Besar Digitalisasi Sejarah Sastra Jawa Timur, Program Studi Bahasa
  dan Sastra Indonesia, Universitas Airlangga.
- **Tujuan bisnis/akademik:**
  1. Mendigitalisasi artikel kajian sastra Jawa Timur.
  2. Mengelompokkan artikel berbasis pendekatan Periodisasi dan Resepsi.
  3. Menyajikan identitas tim (dosen pengampu & anggota) secara profesional.
  4. Memberikan pengalaman membaca PDF yang nyaman di browser.

## 3. Target Pengguna / Persona

| Persona | Kebutuhan |
|---------|-----------|
| Dosen pengampu | Memeriksa hasil tugas besar; menilai kelengkapan & akurasi konten |
| Mahasiswa (kelompok) | Menyajikan karya; mudah menambah/mengubah artikel |
| Pembaca umum / pemerhati sastra | Membaca artikel dengan nyaman, mencari topik, eksplorasi kategori |

## 4. Halaman & Fitur (Kebutuhan Fungsional Ringkas)

### Halaman Beranda (`index.html`)
- Navigasi atas: Beranda, Menu, Periodisasi, Resepsi, tombol tema, tombol "Tentang Kami".
- Hero: tagline, deskripsi, tombol CTA, ilustrasi wayang.
- Section "DIGITALISASI SEJARAH SASTRA JAWA TIMUR": dua kartu fitur (Periodisasi,
  Resepsi) yang menautkan ke sub-halaman.
- Section Periodisasi & Resepsi: **accordion terkelompok per kategori** yang menampilkan
  judul artikel dan tautan ke sub-halaman dengan parameter URL.
- Footer "cover page" UNAIR: logo, info program studi, dosen pengampu, daftar anggota.
- Popup sambutan (muncul 1 detik setelah load) dengan tombol tutup.
- Custom cursor + dark/light theme.

### Halaman Periodisasi (`Periodisasi/periodisasi.html`)
- Topbar: brand, hamburger (sidebar mobile), pencarian, toggle tema, avatar UNAIR.
- Sidebar: kategori **Drama, Komunitas, Prosa, Puisi** + tautan Resepsi & Beranda.
- Konten: judul artikel, **viewer PDF** (PDF.js), pagination (prev/dots/next).
- Pencarian artikel berdasarkan judul.
- Deep-link via `?category=...&id=...`.

### Halaman Resepsi (`Resepsi/resepsi.html`)
- Struktur sama dengan Periodisasi, kategori: **Prosa, Puisi**.

## 5. Kebutuhan Non-Fungsional

| Kode | Kebutuhan |
|------|-----------|
| NFR-1 | Berjalan penuh di browser modern tanpa server khusus (statis) |
| NFR-2 | Responsif: desktop, tablet, mobile (breakpoint ≤1400/1200/992/768/576/420px) |
| NFR-3 | Mendukung dark & light theme, tersimpan di `localStorage` |
| NFR-4 | Cursor default diganti custom di perangkat mouse; dinonaktifkan di layar sentuh |
| NFR-5 | Aksesibilitas dasar: `aria-label`, fokus keyboard, navigasi tab |
| NFR-6 | Performa ringan: tanpa dependensi JS pihak ketiga selain PDF.js & Remixicon CDN |

## 6. Batasan (Out of Scope / Tidak Ada)

- Tidak ada backend, API, database, atau autentikasi.
- Tidak ada form yang tersimpan (kontak hanya anchor `#kontak`).
- Tidak ada analitik/tracker.
- Tidak ada layanan komentar.

## 7. Kriteria Keberhasilan (Success Metrics)

1. Seluruh 14 artikel (10 Periodisasi + 4 Resepsi) dapat dibuka sebagai PDF.
2. Seluruh tautan navigasi & accordion bekerja lintas halaman.
3. Tema terang/gelap konsisten di semua halaman.
4. Tidak ada konten rusak saat dibuka di layar desktop, tablet, dan mobile.

## 8. Prioritas Fitur (MoSCoW)

| Prioritas | Fitur |
|-----------|-------|
| **Must** | Navigasi, accordion, viewer PDF, pagination, dark/light theme, tautan antar halaman |
| **Should** | Pencarian artikel, popup sambutan, deep-link parameter URL |
| **Could** | Upload avatar anggota, halaman khusus (brand click) |
| **Won't** | Backend/DB, autentikasi, komentar, fitur sosial |

> Catatan: beberapa fitur "Could" saat ini belum berfungsi penuh (lihat
> `CONTEXT.md` §8 dan `Docs/Testing.md` §6 untuk daftar bug yang diketahui).
