# Dokumen Audit — LANDINGPAGEJAWA_SP

- **Tanggal audit:** 16 Agustus 2026
- **Lingkup:** seluruh isi repositori (kode, aset, dokumentasi, hygiene)
- **Metode:** inspeksi manual struktur direktori, pembacaan berkas, perhitungan hash
  (SHA256) untuk verifikasi kesesuaian berkas, dan penelusuran referensi silang
  HTML/JS/CSS.
- **Status umum:** ✅ Temuan kode (A–E) seluruhnya telah **diperbaiki** dalam eksekusi
  ini. Temuan dokumentasi & hygiene (F–G) telah **disesuaikan**.

---

## Revisi 16 Agustus 2026

Perubahan tambahan yang dilakukan setelah audit di atas (semuanya telah diterapkan):

### R1 — Tambah artikel Periodisasi Puisi (puisi3.pdf)
- `Periodisasi/periodisasi.js` `puisiData` + `script.js` accordion Puisi ditambah item
  "Perkembangan Kepengarangan Pramoedya Ananta Toer dalam Karya-Karya Prosa Berdasarkan
  Metode Periodisasi serta Upaya Digitalisasinya".
- Hitungan artikel diperbarui: **15 total (11 Periodisasi + 4 Resepsi)**.
- ⚠️ **Catatan:** judul artikel menyebut "Prosa" namun dikategorikan di grup **Puisi**
  (sesuai PDF di folder `PeriodisasiPuisi/`) — sengaja dibiarkan, menunggu keputusan konten.

### R2 — Rebrand nama web & nama tubes
- Nama web **"Lorong Nusantara" → "Lorong Susastra"**; tagline "Lorong Susastra —
  Digitalisasi Sejarah Sastra Jawa Timur" (brand-text, title, meta, popup, hero).
- Nama tubes **"LITERA JATIM" → "DIGITALISASI SEJARAH SASTRA JAWA TIMUR"** di hero,
  `CONTEXT.md`, `Glossary.md`.
- Seluruh dokumentasi (±20 file) disinkronkan.

### R3 — Submenu baru di sidebar sub-halaman (Periodisasi & Resepsi)
- **"Arsip Digital Karya Sastra Jawa Timur"**: `arsipData` (3 item placeholder, link
  eksternal dibuka di tab baru) — `buildLinkSubmenu()`.
- **"Referensi"**: `referensiData` (1 item) membuka halaman statis daftar pustaka
  (placeholder) via `showSpecialPage('referensi')` → `#contentText`.
- CSS baru: `.nav-label--wrap`, `.sub-nav-link`, `.content-text` (kedua CSS sub-halaman).

### R4 — Dokumentasi pengujian
- `Docs/Testing.md` §2.3: klaim "Search rusak" diganti status **fixed**; §2.2/§2.3 ditambah
  langkah verifikasi submenu Arsip & Referensi.

### R5 — Topnav rapi & auto-hide, anggota & favicon wayang, hero tanpa "Kelompok XX"
- **Topnav sub-halaman (Periodisasi & Resepsi):** `.topnav` diberi `overflow-x:hidden` dan
  `transition:transform`. Class baru `.app-shell.nav-hidden` menggeser topnav ke atas
  (`translateY(-100%)`), memindahkan `.sidebar` ke `top:0`, dan `main-content` `margin-top:0`
  agar tidak ada celah kosong 60px saat navbar tersembunyi.
- **Auto-hide navbar:** listener `window scroll` (passive) di `periodisasi.js`/`resepsi.js` —
  scroll ke bawah (>120px) menambahkan `nav-hidden`, scroll ke atas menghapusnya. Halaman tetap
  bisa di-scroll normal.
- **Search di mobile dihilangkan:** `.search-bar` `display:none` pada ≤768px (keputusan baru;
  menggantikan perbaikan C6 yang menampilkan search ≤480px). Pencarian tetap berfungsi di desktop.
  Aturan search mobile yang sudah mati dihapus dari kedua CSS.
- **Anggota cover page:** `membersData` menjadi **1 entri "Bahasa & Sastra Indonesia 2024"**
  (tanpa NIM); avatar memakai `Assets/wayang_icon.png` sebagai pengganti foto anggota.
- **Favicon:** ketiga halaman kini memakai `wayang_icon.png` (sebelumnya `logo-web.png`).
- **Hero index:** "Hai! Kami dari KELOMPOK XX ..." dirapikan menjadi "Hai! Kami Mempersembahkan
  Artikel DIGITALISASI SEJARAH SASTRA JAWA TIMUR".
- Dokumentasi disinkronkan: `CONTEXT.md`, `Docs/ERD.md`, `Docs/SRS.md`, `Docs/UIUX.md`,
  `Docs/Testing.md`, `AGENTS.md`, `AI/Change-Log.md`.

> ⚠️ **Catatan:** C6 (search ditampilkan di layar kecil) kini **digantikan** oleh keputusan baru
> menyembunyikan search di mobile ≤768px — perubahan disengaja, bukan regresi. Verifikasi manual
> browser menyusul (tema terang/gelap, lebar 1280/1024/768/576/480/375px).

### R6 — Arsip Digital & Referensi dipindah dari sub-halaman ke index
- **index.html** menjadi **ES module** (`<script type="module" src="script.js">`); nav bertambah
  link **Arsip** (`#arsip`) & **Referensi** (`#referensi`).
- **Section baru di index:** `#arsip` (4 kartu accordion full-width per genre: Novel & Prosa,
  Drama, Puisi, Sastra Klasik & Tradisi) dan `#referensi` (satu kartu daftar pustaka `<ol>`).
  Data berasal dari **`Assets/data/korpus-data.mjs`** (`korpusArsip` ±137 karya / `daftarPustaka`
  ±145 entri) yang diimpor `script.js` (`buildArsipItemHTML`, `setupListAccordion`,
  `escapeHTML`).
- **CSS index:** `.accordion-grid--full`, `.accordion-card--list` (panel collapsed 54px;
  aktif `clamp(260px,42vh,460px)`, konten scroll), `.list-content`, `.referensi-list`,
  override dark-mode.
- **Sub-halaman dibersihkan:** submenu Arsip & Referensi dihapus dari `periodisasi.html`/
  `resepsi.html`; di kedua JS dihapus `arsipData`/`referensiData`, `buildSpecialSubmenu`,
  `openSubmenuOnly`, cabang `updateActiveNav`, listener `navArsip`/`navReferensi`;
  `specialPages` hanya menyisakan `mainpage`; aturan CSS `#arsipSubmenu .sub-nav-label` dihapus.
- **Dokumentasi disinkronkan:** `CONTEXT.md`, `AGENTS.md`, `Docs/Content-Structure.md`,
  `Docs/ERD.md`, `Docs/SRS.md`, `Docs/UIUX.md`, `Docs/Testing.md`, `AI/Change-Log.md`.
- Verifikasi: `node --check` (script.js sebagai module + kedua JS sub-halaman) lolos;
  keseimbangan kurung CSS (style 280/280, sub-halaman 166/166) lolos.

### R7 — Perbaikan tampilan kartu Arsip & Referensi, daftar pustaka runtut, kartu Puisi Mahasiswi
- **Perbaikan huruf tumpuk:** penyebabnya elemen header (angka, judul) sebelumnya sama-sama
  `position:absolute` pada titik yang sama saat panel aktif, dan judul (`h3`) sempat berada
  di dalam `.panel-content` sehingga mengambang di tengah daftar. Kini header dibungkus
  `div.panel-header` (flex, menempel di atas): **jenis di kiri, angka kuantitas di kanan
  (faded `opacity:0.45`), panah dropdown** `ri-arrow-down-s-line`. Saat panel terbuka,
  header tetap di atas — angka & panah **sticky di kanan** (tidak bergeser ke kiri), panah
  berotasi 180° di tempatnya; hanya area konten yang muncul di bawah.
- **Referensi:** `<ol>` diganti `<ul class="referensi-list">` sehingga nomor otomatis
  dihapus; angka 1–145 di teks `daftarPustaka` diurutkan **runtut** (sebelumnya reset 1–23
  lalu 1–46 lalu 70–145); baris lanjutan memakai hanging-indent.
- **Konten baru:** `daftarPuisiMahasiswi` ditambahkan ke `korpus-data.mjs` (2 komunitas
  dari sheet Excel "Daftar Puisi Mahasiswi": Nastyaksara 2021, Selasar Lazuardi 2026, link
  Instagram) dirender sebagai kartu kelima di `#accordionArsip`.
- **Navbar index:** link Arsip & Referensi dihapus — navbar hanya Beranda/Menu/Periodisasi/
  Resepsi/Tentang Kami; section `#arsip`/`#referensi` tetap ada dan dijangkau via scroll.
- **Dokumentasi disinkronkan:** `CONTEXT.md`, `Docs/Content-Structure.md`, `Docs/ERD.md`,
  `Docs/SRS.md`, `Docs/UIUX.md`, `Docs/Testing.md`, `AI/Change-Log.md`.
- Verifikasi: `node --check` (script.js + korpus-data.mjs) lolos; `daftarPustaka` 145 entri
  berurutan 1–145; brace CSS style 277/277.

---

## Ringkasan Eksekutif

Proyek berjalan baik secara fungsional. Struktur direktori sesuai dengan dokumentasi
(`CONTEXT.md`, `Architecture.md`), 15 PDF artikel valid dan referensinya konsisten, serta
kualitas penulisan dokumen tinggi. Namun ditemukan: 1 bug fatal tersembunyi di pencarian
`Resepsi/resepsi.js`, 2 titik error saat membuka *special page*, beberapa *dead code*,
ketidakkonsistenan kecil pada HTML/CSS, dan beberapa klaim dokumentasi yang tidak akurat.
Seluruhnya telah ditindaklanjuti.

---

## A. Struktur & Aset

| Item | Hasil |
|------|-------|
| Struktur folder | ✅ Sesuai `CONTEXT.md` §5 (root, `Periodisasi/`, `Resepsi/`, `Assets/`, `Extension/`) |
| `Assets/Artikel Web/` — 15 PDF | ✅ Valid; hash & referensi konsisten dengan data di JS |
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
✅ Semua 10 label periode (Drama 3, Komunitas 1, Prosa 4, Puisi 3) sesuai nama file PDF dan
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
