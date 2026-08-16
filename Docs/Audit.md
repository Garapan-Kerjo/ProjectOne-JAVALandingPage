# Dokumen Audit — LANDINGPAGEJAWA_SP

- **Tanggal audit:** 16 Agustus 2026
- **Lingkup:** seluruh isi repositori (kode, aset, dokumentasi, hygiene)
- **Metode:** inspeksi manual struktur direktori, pembacaan berkas, perhitungan hash
  (SHA256) untuk verifikasi kesesuaian berkas, dan penelusuran referensi silang
  HTML/JS/CSS.
- **Status umum:** ✅ Temuan kode (A–E) seluruhnya telah **diperbaiki** dalam eksekusi
  ini. Temuan dokumentasi & hygiene (F–G) telah **disesuaikan**.

---

## Ringkasan Eksekutif

Proyek berjalan baik secara fungsional. Struktur direktori sesuai dengan dokumentasi
(`CONTEXT.md`, `Architecture.md`), 14 PDF artikel valid dan referensinya konsisten, serta
kualitas penulisan dokumen tinggi. Namun ditemukan: 1 bug fatal tersembunyi di pencarian
`Resepsi/resepsi.js`, 2 titik error saat membuka *special page*, beberapa *dead code*,
ketidakkonsistenan kecil pada HTML/CSS, dan beberapa klaim dokumentasi yang tidak akurat.
Seluruhnya telah ditindaklanjuti.

---

## A. Struktur & Aset

| Item | Hasil |
|------|-------|
| Struktur folder | ✅ Sesuai `CONTEXT.md` §5 (root, `Periodisasi/`, `Resepsi/`, `Assets/`, `Extension/`) |
| `Assets/Artikel Web/` — 14 PDF | ✅ Valid; hash & referensi konsisten dengan data di JS |
| `Extension/pdfjs-6.1.200-dist` | ✅ Tidak dimodifikasi (di luar kendali proyek) |
| Aset gambar yang direferensikan | ✅ Semua ada dan terpakai |

> **Catatan:** `Extension/` dan `Assets/Artikel Web/*.pdf` adalah zona terlarang — jangan
> pernah diubah.

---

## B. Bug Fungsional

### B1 — Pencarian di halaman Resepsi melempar `ReferenceError` ❌ → ✅ Fixed
**Lokasi:** `Resepsi/resepsi.js` (dulu ± baris 375–376)
**Temuan:** `allData` menyertakan `{ category: "drama", data: dramaData }` dan
`{ category: "komunitas", data: komunitasData }` — keduanya tidak terdefinisi di file ini
(hanya ada `puisiData` dan `prosaData`). Setiap kali pengguna mengetik di kotak pencarian,
kode memanggil `.find()` atas `allData` dan melempar `ReferenceError`, sehingga fungsi
pencarian mati total.
**Perbaikan:** `allData` kini hanya memuat `prosa` dan `puisi`.

### B2 — Membuka "special page" (klik brand) melempar error ❌ → ✅ Fixed
**Lokasi:** `Periodisasi/periodisasi.js` & `Resepsi/resepsi.js`, fungsi `showSpecialPage()`
**Temuan:** `contentText.innerHTML = ...` mengakses elemen `#contentText` yang **tidak ada**
di halaman (elemen tersebut hanya ada pada artikel biasa). Klik pada nama brand langsung
melempar `TypeError`.
**Perbaikan:** panggilan dibungkus null-guard: `const contentText = ...; if (contentText) { ... }`,
ditambah fallback `(data.paragraphs || [])`.

### B3 — Upload avatar di landing page melempar error saat diklik ❌ → ✅ Fixed
**Lokasi:** `script.js` (dulu ± baris 228–239)
**Temuan:** loop `forEach` atas `querySelectorAll(".avatar-placeholder")` memanggil
`addEventListener("click", ...)` pada input `#fileInput` yang tidak ada di halaman —
mengakibatkan `TypeError` saat **seluruh script dijalankan** (mematikan fitur tema, accordion,
anggota, dst.).
**Perbaikan:** blok upload avatar dihapus (fungsi tersebut tidak digunakan di halaman).

### B4 — Ketidakakuratan data kategori Resepsi ❌ → ✅ Fixed
**Lokasi:** `script.js`, konstanta `resepsiData`
**Temuan:** judul-judul dalam kelompok `Prosa` dan `Puisi` **tertukar** — grup "Prosa" berisi
judul artikel Puitika (puisi) dan grup "Puisi" berisi judul Potret (prosa). Pemetaan
`?category=puisi|prosa&id=n` pada sub-halaman menjadi tidak cocok.
**Perbaikan:** kedua grup ditukar sehingga grup "Puisi" berisi judul Puitika dan grup "Prosa"
berisi judul Potret.

### B5 — Kerusakan kecil pada judul artikel di `script.js` ❌ → ✅ Fixed
- Prosa item 4: `"SastraBerdasarkan"` (tanpa spasi) → `"Sastra Berdasarkan"`.
- Puisi item 1: dua bagian judul digabung tanpa spasi → digabung menjadi satu judul utuh:
  `"Fragmen Kota dan Sejarah dalam Tubuh Sastra: Periodisasi Puisi di Jawa Timur (Tahun 2000-Sekarang)"`.
- Judul Drama di accordion `index.html` tidak sinkron dengan label kanonik di
  `Periodisasi/periodisasi.js` → disinkronkan.

---

## C. Konsistensi HTML & CSS

### C1 — `lang` halaman utama ❌ → ✅ Fixed
`index.html` memakai `lang="en"` untuk konten berbahasa Indonesia → `lang="id"`.

### C2 — Atribut HTML salah/tidak konsisten ❌ → ✅ Fixed
- `Resepsi/resepsi.html`: placeholder `"RESEPSI ABCDEFGHIJK"` (sisa uji coba) → `"RESEPSI"`.
- `Resepsi/resepsi.html`: `aria-expanded="false "` (trailing space) → `"false"`.
- `script.js`: tag `<image>` (invalid) untuk ikon svg → `<img ... alt="" />`.

### C3 — Path navigasi memakai backslash ❌ → ✅ Fixed
- `Periodisasi/periodisasi.html`: `..\Resepsi\resepsi.html` → `../Resepsi/resepsi.html`.
- `Resepsi/resepsi.html`: `..\Periodisasi\periodisasi.html` → `../Periodisasi/periodisasi.html`.
  (URL `\` tidak ter-resolve konsisten di semua server.)

### C4 — CSS `.cursor` transform ganda ❌ → ✅ Fixed
**Lokasi:** `style.css`, `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css`
**Temuan:** `transform` ditulis dua kali (`translate(-50%,-50%)` lalu `rotate(-35deg)`);
properti kedua menimpa yang pertama sehingga posisi kursor tidak terpusat.
**Perbaikan:** digabung menjadi `translate(-50%, -50%) rotate(-35deg)`.

### C5 — *Dead code* CSS ❌ → ✅ Fixed
**Lokasi:** `style.css`
- Blok `.pricing` (light ± baris 403–473, dark ± 648–680) dan 3 rujukannya di media query
  (1200/992/768) dihapus — tidak dipakai oleh halaman mana pun.
- `.panel.dark-mode` (± baris 1429) dihapus — selektor `body.dark-mode .panel` tidak pernah
  digunakan (tema memakai `[data-theme="dark"]`).

### C6 — Search bar disembunyikan di layar ≤ 480px ❌ → ✅ Fixed
**Lokasi:** `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css`
**Temuan:** `.search-bar { display:none }` pada `@media (max-width: 480px)` mematikan pencarian
di perangkat kecil tanpa ada cara mengaktifkan.
**Perbaikan:** dihapus; search bar ditampilkan dengan `margin-left:auto`.

### C7 — `periodisasi.css` vs `resepsi.css` ❌ → ✅ (diverifikasi identik)
Hash SHA256 keduanya berbeda, tetapi perbedaannya **hanya satu spasi**
(`overflow:hidden` vs `overflow: hidden`) — tidak memengaruhi rendering. Dua berkas sub-halaman
sebenarnya identik dan dapat disatukan, namun **dibiarkan terpisah** untuk menjaga struktur
per-halaman yang sudah berjalan (lihat `Architecture.md`).

---

## D. Aksesibilitas, SEO & Anti-FOUC

### D1 — `meta description` tidak ada di semua halaman ❌ → ✅ Fixed
Ditambahkan pada `index.html`, `Periodisasi/periodisasi.html`, `Resepsi/resepsi.html`.

### D2 — Jika `aria`/`title` melengkapi semantik ❌ → ✅ Fixed
- `#pdfViewer` (iframe) kini memiliki `title="Viewer PDF artikel"`.
- Input `.search-bar input` kini memiliki `aria-label="Cari artikel"`.

### D3 — FOUC (Flash of Unstyled Content) tema ❌ → ✅ Fixed
Skrip tema dimuat di akhir `<body>` (modul), sehingga tema pilihan pengguna baru diterapkan
setelah halaman dirender. Ditambahkan snippet inline kecil di `<head>` ketiga halaman yang
menetapkan `data-theme` sebelum CSS dimuat, sehingga warna tidak "berkedip" saat reload.

---

## E. Bug dan Kemiripan Data (Cross-check)

### E1 — Konten artikel di `periodisasi.js` vs PDF
✅ Semua 9 label periode (Drama 3, Komunitas 1, Prosa 4, Puisi 2) sesuai nama file PDF dan
kategori di `index.html` (setelah sinkronisasi B5).

### E2 — Konten artikel di `resepsi.js` vs PDF
✅ Semua 4 artikel (Prosa 2, Puisi 2) sesuai nama file PDF dan kategori (setelah perbaikan B4).

---

## F. Dokumentasi

### F1 — Klaim tidak akurat di `Docs/Testing.md` ❌ → ✅ Fixed
- **Bug #6** semula menyatakan pencarian Resepsi "tidak crash"; kenyataannya justru melempar
  `ReferenceError` (B1). Klaim dikoreksi.
- **Bug #8** semula menyatakan kedua CSS sub-halaman "identik 100%"; faktanya berbeda satu
  spasi. Klaim dikoreksi.

### F2 — `CONTEXT.md` perlu penyesuaian
- §8 daftar fitur diperluas dengan perilaku sebenarnya (special page, FOUC, dsb.).
- §9 riwayat git diperbarui mengikuti komit terbaru.

### F3 — `ERD.md`, `SRS.md`, `UIUX.md`, `Content-Structure.md`
Ditambahkan catatan deviasi/deviasi historis, *dead code*, dan pola FOUC agar dokumentasi
akurat terhadap implementasi (lihat berkas masing-masing).

---

## G. Repo Hygiene

| Item | Status |
|------|--------|
| `README.md` | ❌ tidak ada → ✅ **dibuat** |
| `.gitignore` | ❌ tidak ada → ✅ **dibuat** |
| `LICENSE` | ⚠️ belum ada — **menunggu keputusan jenis lisensi** dari pemilik proyek |

---

## Rekomendasi Lanjutan

1. **Tetapkan lisensi** untuk repositori (saat ini dicatat sebagai gap di §G).
2. **Uji manual di browser** setelah seluruh perbaikan: klik brand (special page), ketik di
   pencarian kedua sub-halaman, toggle tema lalu reload (cek FOUC), buka semua artikel,
   dan uji sidebar pada ≤ 480px.
3. Jalankan uji otomatis ringan yang dijelaskan di `Docs/Testing.md` (hash aset, lint JS).
4. (Opsional) Pertimbangkan menyatukan `periodisasi.css`/`resepsi.css` — saat ini sengaja
   dibiarkan terpisah.
