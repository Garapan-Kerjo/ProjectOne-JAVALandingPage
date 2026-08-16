# UIUX.md — Design System & Pengalaman Pengguna

Panduan tampilan website **Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur**.

---

## 1. Design Tokens

Token CSS didefinisikan di `:root` (light) dan `[data-theme="dark"]` / `body.dark-mode`
(dark) di masing-masing stylesheet. **Nilai harus identik antar file.**

### 1.1 Light Theme (`:root`)
| Token | Nilai | Keterangan |
|-------|-------|------------|
| `--background` | `#F8F5EF` | Latar halaman |
| `--surface` | `#FFFDF8` | Kartu / permukaan |
| `--primary` | `#5A3E2B` | Cokelat tua (scrollbar, avatar) |
| `--secondary` | `#B45A3C` | Terakota (hover, aksen teks) |
| `--accent` | `#C89B3C` | Emas (tombol, blur) |
| `--text` | `#2F2A25` | Teks utama |
| `--text-secondary` | `#6F665E` | Teks sekunder |
| `--border` | `#DDD0BB` | Garis pemisah |
| `--nav-background` | `rgba(255,253,248,0.72)` | Latar nav (transparan + blur) |
| `--nav-border` | `rgba(221,208,187,0.4)` | Garis nav |
| `--nav-shadow` | `0 18px 35px rgba(16,24,40,0.12)` | Bayangan nav/kartu |
| `--success` | `#647A3D` | Hijau zaitun |
| `--error` | `#B43B3B` | Merah |

### 1.2 Dark Theme (`[data-theme="dark"]`)
| Token | Nilai |
|-------|-------|
| `--background` | `#171311` |
| `--surface` | `#231C18` |
| `--primary` | `#D4AF37` |
| `--secondary` | `#C56A45` |
| `--accent` | `#E0C067` |
| `--text` | `#F5F1E8` |
| `--text-secondary` | `#C7B9A3` |
| `--border` | `#43352C` |
| `--nav-background` | `rgba(35,28,24,0.75)` |
| `--nav-border` | `rgba(67,53,44,0.45)` |
| `--nav-shadow` | `0 18px 35px rgba(0,0,0,0.35)` |
| `--success` | `#8AA05B` |
| `--error` | `#D06A6A` |

> **Aturan:** jangan menambah warna hex baru di luar blok token ini.

## 2. Tipografi

| Konteks | Font | Bobot | Catatan |
|---------|------|-------|---------|
| Global body | `'Poppins', sans-serif` | 400 | Diimpor dari Google Fonts |
| Judul utama (hero) | Poppins | 700 | `line-height` 4rem, span di-stroke (`-webkit-text-stroke`) |
| Judul section | Poppins | 600 | `font-size` 2.25rem |
| Judul panel/accordion | Poppins | 600, italic | `font-size` 1.15rem |
| Aksen serif | `'Georgia','Times New Roman',serif` | — | Token `--font-serif`, dipakai cover page |
| Label anggota | Poppins | 700, italic | `member-name` 0.95rem — teks tunggal "Bahasa & Sastra Indonesia 2024" tanpa NIM |
| Actor | `'Actor'` | — | Diimpor namun jarang dipakai |

## 3. Komponen Utama

### 3.1 Navbar (index)
Sticky, `backdrop-filter: blur(18px)`, latar `--nav-background`, bayangan `--nav-shadow`.
Link hover: latar `--secondary`, teks `--surface`, lift `translateY(-2px)`.

### 3.2 Tombol `.btn`
- Default: latar `--accent`, teks `--surface`, radius 5px, bold 600.
- Hover: latar `--secondary`.
- Di bawah 576px: lebar 100%.

### 3.3 Theme Switch
Track: gradien `--accent → --secondary`, radius penuh. Thumb bulat 26px bergeser
`translateX(28px)` saat aktif. Ikon `ri-sun-line` ↔ `ri-moon-line`.

### 3.4 Custom Cursor
- Elemen 50×50px, latar `Assets/culture_icon.png`, `rotate(-35deg)`, `z-index 999999`.
- Lurus posisi via JS (lerp), sembunyi saat mouse masuk PDF, nonaktif di `(hover:none)`.
- **Perbaikan (audit):** `transform` kini satu deklarasi gabungan
  `translate(-50%,-50%) rotate(-35deg)` (sebelumnya `translate` tertimpa `rotate`).

### 3.5 Accordion (index)
- Grid 2 kolom (`.accordion-grid`), kartu per kategori (`.accordion-card`).
- Panel collapsed 44px; aktif mengembang (`flex: 1 1 44px`), konten memudar masuk.
- Dukungan klik + keyboard (Enter/Space), `aria-expanded`.
- Mobile (≤768px): panel jadi vertikal, tinggi 60px / 260px (aktif).

### 3.6 List Accordion Cards — Arsip & Referensi (index)
- Grid 1 kolom penuh (`.accordion-grid--full`); kartu `.accordion-card--list` vertikal.
- Header `.panel-header` (tinggi 54px, flex): **judul jenis di kiri** (ellipsis bila
  panjang), **angka kuantitas di kanan** (faded `opacity:0.45`, hanya menampilkan jumlah),
  dan **ikon panah dropdown** `ri-arrow-down-s-line`. Saat panel dibuka, header tetap
  menempel di atas; angka & panah **sticky di kanan** (tidak bergeser ke kiri) — panah
  berotasi 180° pada sumbunya, hanya area konten yang muncul di bawah.
- Saat `.active`: panel mengembang ke `clamp(260px, 42vh, 460px)` dengan area konten
  scroll; header tetap menempel di atas.
- Item daftar memakai bullet `::before` emas, tautan berwarna `--accent-blue`.
- Referensi: `<ul class="referensi-list">` dalam satu kartu; **tanpa nomor otomatis**
  (nomor 1–145 sudah tertanam di teks, diurutkan runtut), baris lanjutan hanging-indent.
- Kartu tambahan "Daftar Puisi Mahasiswi" (2 komunitas) memakai bentuk yang sama dengan
  tautan Instagram.
- Dark mode didukung (surface, border, teks ikut token).

### 3.7 Sidebar (sub-halaman)
- Lebar 240px, collapsed 76px (icon-only) via class `sidebar-collapsed`.
- Mobile (≤768px): drawer slide-in dengan lebar fluid `min(82vw, 320px)` + backdrop;
  header branding "Lorong Susastra" tampil di dalam drawer.
- Kategori: `nav-parent` dengan chevron di kanan (`margin-left:auto`) yang berotasi 180°
  saat terbuka; touch target menu ≥48px, submenu ≥44px.
- Submenu: `max-height` 0→400px, item bernomor (lingkaran emas) + label, terindentasi
  `20px` dengan garis vertikal `border-left` agar tampak bagian dari parent.
- Safe area: sidebar memakai `env(safe-area-inset-left/bottom)`; meta viewport memakai
  `viewport-fit=cover`.

### 3.8 Viewer PDF & Pagination
- `iframe.pdf-viewer` memenuhi `content-card-body` (tinggi 100vh, scroll internal).
- Pagination: tombol prev/next + `page-dot` bulat (aktif: `--accent-blue` = `--secondary`,
  `scale(1.3)`).

### 3.9 Popup Sambutan
- Overlay penuh `rgba(0,0,0,0.7)`, konten max 500px, muncul `scale(0.9 → 1)`.
- Tombol tutup `×` + CTA "Jelajahi Sekarang".

### 3.10 Cover Page (footer index)
- Grid 2 kolom (kiri: logo + info prodi; kanan: dosen + anggota).
- Latar `rgba(255,253,248,0.6)` dengan `::before` radial-gradient dekoratif.
- Di dark mode: latar gelap, border cokelat tua.

## 4. Gaya Halaman Sub (Layout Aplikasi)

- Topbar fixed tinggi `--navbar-h:60px`; sidebar fixed di bawahnya; `main-content`
  margin kiri sesuai lebar sidebar.
- **Topnav auto-hide:** saat scroll ke bawah (`>120px`), class `nav-hidden` pada
  `.app-shell` menggeser topnav ke atas (`translateY(-100%)`), sidebar ke `top:0`, dan
  `main-content` `margin-top:0`; muncul kembali saat scroll ke atas.
- **Search di mobile:** `.search-bar` disembunyikan pada ≤768px — topnav mobile hanya
  berisi brand, hamburger, theme-switch, dan avatar.
- Kartu konten (`content-card`) radius `--radius-lg:16px`, shadow lembut.
- Tokens tambahan: `--font-sans`, `--font-serif`, `--radius-lg/md`, `--shadow-card`,
  `--transition-fast/medium`, `--accent-blue` (alias `--secondary`), `--accent-green`
  (alias `--success`), `--accent-red` (alias `--error`).

## 5. Responsif (Breakpoint)

| Breakpoint | Perubahan Utama |
|------------|-----------------|
| ≤1400px | Container 1100px, hero clamp |
| ≤1200px | Container 1000px, cover page 190px |
| ≤992px | Nav links disembunyikan, header 1 kolom (gambar di atas), cover 1 kolom |
| ≤768px | Accordion vertikal, sidebar slide-in (`min(82vw, 320px)`), grid 1 kolom, search bar disembunyikan, topnav auto-hide saat scroll |
| ≤576px | Tombol full-width, cover lebih ramping |
| ≤480px | Font turun, sidebar fluid |
| ≤420px | Ukuran font turun, nav-actions anchor disembunyikan |
| ≤400px | Avatar UNAIR disembunyikan, theme-switch lebih ramping |
| ≤380px | Tombol pagination jadi ikon saja |
| `(hover:none)` | Cursor asli, custom cursor nonaktif |

> **Anti-FOUC:** ketiga halaman menetapkan `data-theme` via snippet inline di `<head>`
> sebelum CSS dimuat, sehingga reload tidak menampilkan flash warna yang salah.

## 6. Aksesibilitas

- Tombol ikon punya `aria-label`; theme switch punya `aria-pressed`.
- Accordion punya `role="button"`, `tabindex="0"`, `aria-expanded`.
- Hamburger menyetel `aria-expanded`.
- Fokus keyboard: outline pada panel accordion (`:focus-visible`).

## 7. Prinsip UX

1. **Konsistensi visual** — satu palet, satu font, satu bahasa pola.
2. **Mode gelap wajib** untuk semua komponen baru.
3. **Gerakan halus** — transisi ≤0.5s, easing `cubic-bezier(0.4,0,0.2,1)`.
4. **Konten dulu** — judul artikel jelas, tautan "Telusuri Lebih Lanjut" konsisten.
