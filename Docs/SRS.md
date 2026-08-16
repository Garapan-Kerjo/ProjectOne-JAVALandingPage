# SRS.md — Software Requirements Specification

Spesifikasi teknis fungsional untuk website **Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur**
(repo `LANDINGPAGEJAWA_SP`). Dokumen ini menjelaskan perilaku sistem secara teknis.

---

## 1. Lingkup

Website statis berbasis HTML5, CSS3, dan JavaScript (vanilla, ES Modules pada
sub-halaman). Tidak ada framework, build tool, atau backend.

## 2. Teknologi & Aset Eksternal

| Aset | Sumber | Penggunaan |
|------|--------|------------|
| Remixicon 4.6.0 | CDN `cdnjs.cloudflare.com` | Ikon (`ri-sun-line`, `ri-moon-line`, `ri-time-line`, dll.) |
| Google Fonts | `fonts.googleapis.com` | Poppins (utama), Actor |
| PDF.js 6.1.200 | Lokal `Extension/pdfjs-6.1.200-dist` | Render PDF via `web/viewer.html?file=...` |

## 3. Arsitektur Halaman

### 3.1 `index.html` (landing page, ES Module via `script.js`)
Struktur:
- `<div class="cursor">` — custom cursor.
- `<nav>` — logo, `ul.nav-links` (Beranda/Menu/Periodisasi/Resepsi),
  `div.nav-actions` (theme switch, tombol "Tentang Kami").
- `<header class="container" id="mainContent">` — hero (blur, judul, paragraf, CTA,
  gambar `Assets/wayang_icon.png`).
- `<section id="namaTubes">` — judul + sub judul + `div.features` (kartu Periodisasi &
  Resepsi, masing-masing menautkan ke sub-halaman).
- `<section id="periodisasi">` dan `<section id="resepsi">` — `div.accordion-grid`
  (diisi JS: `#accordionPeriodisasi`, `#accordionResepsi`).
- `<section id="arsip">` — `div.accordion-grid.accordion-grid--full#accordionArsip`
  (kartu accordion per genre, isi dari `korpusArsip`).
- `<section id="referensi">` — `div.accordion-grid.accordion-grid--full#accordionReferensi`
  (satu kartu berisi `<ol>` `daftarPustaka`).
- `<footer id="kontak">` — `section.cover-page` (logo UNAIR, info program studi, dosen,
  `#memberList`).
- `div.copyright` — teks hak cipta.
- `div.popup-container#welcome-popup` — popup sambutan.
- `<script type="module" src="script.js">`.

### 3.2 `Periodisasi/periodisasi.html` & `Resepsi/resepsi.html` (ES Module)
Struktur:
- `div.cursor`.
- `div.app-shell#appShell`:
  - `header.topnav` — brand, hamburger (`#hamburgerBtn`), search bar
    (`input.search-bar input` + `button.search-btn`), theme switch (`#theme-toggle`),
    avatar UNAIR.
  - `aside.sidebar#sidebar` — `nav.nav-list` berisi `div.nav-group` per kategori
    (`button.nav-item.nav-parent` + `div.nav-submenu`), dan `div.sidebar-footer`
    (tautan metode lain + Beranda).
- `div.sidebar-backdrop#sidebarBackdrop`.
- `main.main-content#mainContent` — `div.page-header` (`#pageTitle`, `#breadcrumb`),
  `section.content-card` (`#contentCardTitle`, `div.content-card-body#contentCardBody`
  berisi `iframe#pdfViewer`, `div.pagination-bar#paginationBar` dengan
  `#prevBtn`, `#pageDots`, `#nextBtn`).
- Submenu **Arsip & Referensi sudah tidak ada** di sidebar (dipindah ke index).
- `<script type="module" src="periodisasi.js">` / `resepsi.js`.

## 4. Spesifikasi Fungsional

### FR-1 Navigasi
- Nav index menautkan: `#` (Beranda), `#namaTubes` (Menu), `#periodisasi`,
  `#resepsi`, `#kontak` (Tentang Kami). Arsip & Referensi **tidak** ada di navbar top —
  hanya bisa dijangkau dengan scroll ke section-nya.
- Sub-halaman: brand & hamburger mengelola `sidebar-collapsed`; footer menautkan
  halaman metode lain (`../Resepsi/resepsi.html`, `../Periodisasi/periodisasi.html`)
  dan Beranda (`../index.html`).

### FR-2 Tema (dark/light)
- State: atribut `data-theme` pada `<html>` (`light`/`dark`), class `dark-mode`/`light-mode`
  pada `body`.
- Persistensi: `localStorage.getItem('theme')`; fallback `matchMedia('(prefers-color-scheme: dark)')`.
- Ikon toggle: `ri-sun-line` (light) ↔ `ri-moon-line` (dark).
- Berlaku identik di ketiga halaman.

### FR-3 Custom Cursor
- Elemen `div.cursor` dianimasikan via `requestAnimationFrame` (lerp 0.5).
- Sembunyi saat kursor di atas PDF (via `window.postMessage` `pdf-mouseenter`/
  `pdf-mouseleave` dari viewer).
- Nonaktif pada `@media (hover:none)`.

### FR-4 Accordion (index)
- `setupGroupedAccordion(containerId, groupedData)` membangun kartu per kategori.
- Setiap panel: nomor, label kategori, judul artikel, tautan
  `subpage.html?category=<slug>&id=<n>`.
- Hanya satu panel aktif per kartu; dukungan keyboard Enter/Space.

### FR-5 Sub-halaman: Data & Navigasi Konten
- Array data per kategori (`dramaData`, `komunitasData`, `prosaData`, `puisiData`)
  berisi `{ id, label, pdf }`.
- `buildSubmenu()` mengisi sidebar; `buildPagination()` mengisi `pageDots`.
- `showKonten(index)` memuat PDF dan menyetel judul/breadcrumb/disabled tombol.
- `updateActiveNav()` menandai kategori, submenu, dan dot aktif.
- `openCategory()` menutup submenu lain lalu menampilkan konten pertama kategori.
- Deep-link: `categoryMap[selectedCategory]`; fallback default jika tidak valid.

### FR-6 Viewer PDF
- `loadPDF(url)` membangun URL absolut lalu men-set:
  `../Extension/pdfjs-6.1.200-dist/web/viewer.html?file=<encodeURIComponent(url)>`.

### FR-7 Pencarian
- Input di topbar; tekan tombol/Enter → `searchArticle(keyword)`.
- Mencari judul (case-insensitive) di semua kategori; jika ketemu → buka konten;
  jika tidak → `alert("Artikel tidak ditemukan")`.
- **Perbaikan (audit):** `allData` di `resepsi.js` hanya memuat `prosaData` & `puisiData`
  (sebelumnya ikut mereferensikan `dramaData`/`komunitasData` yang tidak ada → error).
- Search bar **disembunyikan pada layar ≤768px** (responsive); tetap tersedia di desktop.

### FR-8 Popup Sambutan
- Muncul 1 detik setelah DOM ready (klass `show` pada `#welcome-popup`).
- Ditutup via tombol `×` atau "Jelajahi Sekarang".

### FR-9 Daftar Anggota (cover page)
- `membersData` (1 entri label "Bahasa & Sastra Indonesia 2024") dirender ke `#memberList`
  sebagai satu `.member` dengan ikon `Assets/wayang_icon.png` (tanpa NIM/foto anggota).
- **Perbaikan (audit):** blok upload foto anggota (`fileInput-i`/`avatar-i`) yang
  melempar `TypeError` telah dihapus dari `script.js`.

### FR-10 Section Arsip Digital (index, `#arsip`)
- Sumber data: `korpusArsip` + `daftarPuisiMahasiswi` (diimpor dari
  `Assets/data/korpus-data.mjs`).
- `setupListAccordion("accordionArsip", arsipPanels, 0)` merender 5 kartu accordion
  (`accordion-grid--full`): 4 genre + "Daftar Puisi Mahasiswi"; panel pertama aktif
  secara default.
- Header panel (`div.panel-header`) berupa baris fleksibel: judul genre di **kiri**,
  angka kuantitas di **kanan** (faded, `opacity:0.45`), ikon panah dropdown
  `ri-arrow-down-s-line`. Saat panel aktif, header **diam di atas** — angka & panah tetap
  **sticky di kanan** (tidak bergeser ke kiri); panah berotasi 180° di tempatnya, hanya
  konten yang muncul. Angka tidak berubah opacity saat aktif.
- Item daftar memakai `buildArsipItemHTML()`: `author — title, year`; bila `url` tersedia
  → tautan `target="_blank" rel="noopener"`, selainnya teks polos (dari `escapeHTML`).
  Item puisi mahasiswi memakai `buildPuisiItemHTML()`: `komunitas (year)` + link Instagram.
- Konten panel dapat di-scroll (ketinggian `clamp(260px, 42vh, 460px)`).

### FR-11 Section Referensi (index, `#referensi`)
- Sumber data: `daftarPustaka` (string[], 145 entri bernomor **runtut 1–145** yang
  tertanam di teks, dari `Assets/data/korpus-data.mjs`).
- Dirender sebagai `<ul class="list-content referensi-list">` (bukan `<ol>`) — **tanpa
  nomor otomatis** agar tidak ganda dengan nomor di teks; baris lanjutan memakai
  hanging-indent (`padding-left:2.2rem; text-indent:-2.2rem`).

## 5. Spesifikasi Non-Fungsional

- **NFR-1 Kompatibilitas:** Chrome, Firefox, Edge, Safari modern. **Ketiga halaman**
  (index, Periodisasi, Resepsi) memakai ES Modules — butuh server HTTP atau live
  server (tidak disarankan via `file://` karena kebijakan module CORS).
- **NFR-2 Responsif:** breakpoint `1400/1200/992/768/576/420px` + `(hover:none)`; search bar
  **disembunyikan di layar ≤768px** (topnav tetap rapi: brand + hamburger + theme-switch +
  avatar); topnav **auto-hide** saat scroll ke bawah dan muncul lagi saat scroll ke atas.
- **NFR-3 Konsistensi tema:** token CSS didefinisikan ulang per stylesheet
  (`style.css`, `periodisasi.css`, `resepsi.css`), nilai harus identik.
- **NFR-4 URL statis:** struktur path relatif tidak boleh berubah kecuali semua
  referensi diperbarui. Jangan memakai backslash (`\`) pada atribut href.
- **NFR-5 Anti-FOUC:** ketiga halaman memuat snippet inline di `<head>` yang menetapkan
  `data-theme` sebelum CSS dimuat, untuk mencegah kedipan tema saat reload.

## 6. Atribut Kualitas

| Aspek | Kriteria |
|-------|----------|
| Keterbacaan | Nama variabel deskriptif, fungsi kecil dengan satu tugas |
| Konsistensi | Struktur data & pola fungsi sama antara Periodisasi dan Resepsi |
| Perawatan | Menambah artikel = 1 baris objek di array data (dan 1 baris di accordion index) |
