# UIUX.md — Design System & Pengalaman Pengguna

Panduan tampilan website **Lorong Nusantara — Litera Jatim**.

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
| NIM anggota | Arial | — | Teks kecil 0.72rem |
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

### 3.6 Sidebar (sub-halaman)
- Lebar 240px, collapsed 76px (icon-only) via class `sidebar-collapsed`.
- Kategori: `nav-parent` dengan chevron yang berotasi 180° saat terbuka.
- Submenu: `max-height` 0→400px, item bernomor (lingkaran emas) + label.
- Mobile (≤768px): sidebar meluncur dari kiri + backdrop.

### 3.7 Viewer PDF & Pagination
- `iframe.pdf-viewer` memenuhi `content-card-body` (tinggi 100vh, scroll internal).
- Pagination: tombol prev/next + `page-dot` bulat (aktif: `--accent-blue` = `--secondary`,
  `scale(1.3)`).

### 3.8 Popup Sambutan
- Overlay penuh `rgba(0,0,0,0.7)`, konten max 500px, muncul `scale(0.9 → 1)`.
- Tombol tutup `×` + CTA "Jelajahi Sekarang".

### 3.9 Cover Page (footer index)
- Grid 2 kolom (kiri: logo + info prodi; kanan: dosen + anggota).
- Latar `rgba(255,253,248,0.6)` dengan `::before` radial-gradient dekoratif.
- Di dark mode: latar gelap, border cokelat tua.

## 4. Gaya Halaman Sub (Layout Aplikasi)

- Topbar fixed tinggi `--navbar-h:60px`; sidebar fixed di bawahnya; `main-content`
  margin kiri sesuai lebar sidebar.
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
| ≤768px | Accordion vertikal, sidebar slide-in, grid 1 kolom |
| ≤576px | Tombol full-width, search bar menyempit (input 120px), cover lebih ramping |
| ≤480px | Search bar tetap tampil (didorong ke kanan via `margin-left:auto`), font turun |
| ≤420px | Ukuran font turun, nav-actions anchor disembunyikan, sidebar 170px |
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
