# Coding-Rules.md — Konvensi Coding Wajib

Konvensi teknis yang **wajib dipatuhi** saat menulis/mengubah kode di proyek
**LANDINGPAGEJAWA_SP (Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)**.

---

## 1. Teknologi

- **Vanilla JavaScript** (ES2016+). Sub-halaman memakai ES Modules (`<script type="module">`).
- **Tanpa framework, tanpa build tool, tanpa package manager.**
- CSS murni (tanpa preprocessor). HTML5 semantik.

## 2. Penamaan

| Konteks | Aturan | Contoh |
|---------|--------|--------|
| Variabel & fungsi JS | `camelCase` | `showKonten`, `currentData` |
| Konstanta array data | `camelCase` + akhiran `Data` | `dramaData`, `resepsiData` |
| ID elemen HTML | `camelCase` | `contentCardBody`, `pageDots` |
| Class CSS | `kebab-case` | `.content-card`, `.nav-parent` |
| Class komponen BEM-lite | `block__element--modifier` | `.theme-switch__track`, `.theme-switch__thumb.active` |
| Variabel CSS (token) | `--kebab-case` | `--text-secondary`, `--sidebar-w` |
| File & folder | `lowercase` (folder kapital awal untuk aset) | `periodisasi.js`, `Assets/` |
| ID data artikel | `Number` mulai 1 per kategori | `id: 1` |

## 3. JavaScript

1. **Struktur file sub-halaman** — ikuti urutan yang ada: cursor → data → elements →
   theme → state → init → build functions → events → PDF render → search.
2. **Fungsi satu tugas** — buat fungsi kecil; panggil dari event handler.
3. **Gunakan `const` default**; `let` hanya untuk nilai yang berubah (`currentX`,
   `currentData`, `activeKontenIndex`).
4. **Optional chaining** (`?.`) diperbolehkan (sudah dipakai untuk `themeToggle`).
5. **Template literals** untuk interpolasi string.
6. **Jangan tambah komentar** kecuali diminta. Pertahankan komentar section yang ada.
7. **Gaya indentasi** mengikuti file sekitar (2 atau 4 spasi sesuai file; konsisten
   dalam satu file).
8. Saat menambah artikel: tambahkan objek `{ id, label, pdf }` dan **jangan lupa**
   sinkronkan judul di accordion index (`script.js`).

## 4. HTML

1. **`lang` harus sesuai bahasa konten** — perhatikan `index.html` saat ini masih
   `lang="en"` (bug diketahui); jangan menyalinnya ke file baru.
2. Elemen interaktif wajib punya atribut aksesibilitas (`aria-label`, `aria-expanded`,
   `aria-pressed`) sesuai pola yang ada.
3. Gunakan ikon **Remixicon** (`<i class="ri-...">`) — jangan ikon asing baru tanpa izin.
4. **Jangan pakai `<image>`** (tag tidak valid) — gunakan `<img>`.
5. Path aset relatif: root `Assets/...`, sub-halaman `../Assets/...`.

## 5. CSS

1. **Gunakan design tokens** — warna apa pun dari `--primary`, `--secondary`,
   `--accent`, `--background`, `--surface`, `--text*`, `--border`, `--success`,
   `--error`. Jangan hardcode hex baru di luar blok token.
2. **Dukung dark mode** — tambahkan aturan `body.dark-mode ...` bila komponen baru
   perlu penyesuaian.
3. **Dukung responsive** — tambahkan media query pada breakpoint yang ada
   (≤1400/1200/992/768/576/420px, `(hover:none)`).
4. **Transisi** memakai token `--transition-fast`/`--transition-medium` atau nilai
   konsisten (≤0.5s).
5. **Radius & shadow** memakai token (`--radius-*`, `--shadow-card`, `--nav-shadow`).
6. Satu file CSS per halaman; jangan menambah file CSS global baru tanpa izin.
7. Jangan mengubah nilai token di satu file tanpa memperbarui file lain
   (`style.css`, `periodisasi.css`, `resepsi.css` harus sinkron).

## 6. Aksesibilitas

- Panel accordion: `role="button"`, `tabindex="0"`, dukungan Enter/Space.
- Fokus keyboard terlihat (`:focus-visible`).
- Sembunyikan cursor default hanya pada perangkat `(hover:none)` — jangan pernah
  menghapus custom cursor di desktop.
- Label input pencarian via `placeholder` (pola yang ada; jangan memaksa `<label>`
  baru tanpa izin).

## 7. Pencarian & URL

- `searchArticle()` mencari pada `label` (case-insensitive). Jangan ubah perilaku
  alert "Artikel tidak ditemukan".
- Gunakan `encodeURIComponent` untuk nilai query PDF.
- `categoryMap` key harus konsisten dengan slug pada tautan accordion.

## 8. Verifikasi Sebelum Menyerahkan

1. Jalankan checklist `Docs/Testing.md` §2 untuk halaman yang disentuh.
2. Pastikan **tidak ada regresi** pada fitur yang sebelumnya berfungsi.
3. Pastikan perubahan fungsional dicatat di `AI/Change-Log.md`.
