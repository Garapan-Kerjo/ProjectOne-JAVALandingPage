# Architecture.md — Arsitektur Website

Gambaran arsitektur **LANDINGPAGEJAWA_SP (Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)**.

---

## 1. Model Arsitektur

```
┌───────────────────────────────────────────────────────────┐
│                        BROWSER                             │
│  (tanpa server aplikasi; file statis / hosting statis)     │
└───────────────────────────┬───────────────────────────────┘
                            │ HTTP / file:// / live-server
┌───────────────────────────▼───────────────────────────────┐
│  index.html ──▶ style.css, script.js                       │
│  Periodisasi/periodisasi.{html,css,js}  (ES Module)        │
│  Resepsi/resepsi.{html,css,js}         (ES Module)         │
│      │                                                     │
│      ├── Assets/ (gambar + PDF artikel)                    │
│      └── Extension/pdfjs-6.1.200-dist/ (viewer PDF)        │
│              └── viewer.html?file=Assets/Artikel Web/...pdf │
└───────────────────────────────────────────────────────────┘
```

- **Tanpa server-side logic.** Semua "data" berupa array di file JS.
- **State UI** (tema, sidebar) disimpan di `localStorage` / class DOM.
- **Navigasi** antar halaman memakai tautan relatif biasa.

## 2. Struktur Modul

### 2.1 Halaman Utama (index)
| File | Peran |
|------|-------|
| `index.html` | Kerangka markup seluruh section halaman utama |
| `style.css` | Tokens (light/dark) + semua komponen halaman utama |
| `script.js` | 4 blok logika: (1) custom cursor, (2) tema + popup, (3) accordion grouped, (4) render anggota |

### 2.2 Sub-halaman (Periodisasi & Resepsi — pola identik)
| File | Peran |
|------|-------|
| `*.html` | Markup topbar, sidebar, konten, viewer, pagination |
| `*.css` | Tokens + gaya aplikasi (topbar/sidebar/main content) |
| `*.js` (module) | Data kategori, build submenu/pagination, navigasi konten, tema, cursor, load PDF, search |

Perbedaan antar sub-halaman:
- **Periodisasi:** 4 kategori (Drama, Komunitas, Prosa, Puisi); default `drama`.
- **Resepsi:** 2 kategori (Prosa, Puisi); default `puisi`.

## 3. Alur Utama

### 3.1 Buka artikel dari accordion index
```
index.html → klik panel accordion → tautan:
  Periodisasi/periodisasi.html?category=<slug>&id=<n>
  Resepsi/resepsi.html?category=<slug>&id=<n>
→ sub-halaman membaca URLSearchParams
→ buka nav/submenu kategori yang sesuai
→ buildPagination → showKonten(id) → loadPDF(item.pdf)
```

### 3.2 Render PDF
```
loadPDF(url)
→ url absolut = new URL(url, location.href)
→ pdfViewer.src = ../Extension/pdfjs-6.1.200-dist/web/viewer.html?file=<encoded>
→ iframe memuat viewer PDF.js yang menarik file dari Assets/Artikel Web/...
```

### 3.3 Ganti tema
```
theme-toggle click → applyTheme(next) → data-theme di <html> + class di <body>
→ simpan localStorage['theme'] → ikon diubah (sun/moon)
```

## 4. Pola Kode yang Konsisten (Kontrak Internal)

Agar perubahan tetap satu konteks, sub-halaman mengikuti kontrak ini:

| Nama | Tipe | Keterangan |
|------|------|------------|
| `{kategori}Data` | `Array<{id,label,pdf}>` | Data artikel per kategori |
| `categoryMap` | `Object` | `slug → { data, nav, submenu }` |
| `currentData` | `Array` | Kategori yang sedang aktif |
| `activeKontenIndex` | `Number` | Artikel aktif (mulai 1) |
| `buildSubmenu(data, el)` | fn | Isi submenu sidebar |
| `buildPagination(data)` | fn | Isi `#pageDots` |
| `showKonten(index)` | fn | Muat konten + PDF + state tombol |
| `updateActiveNav()` | fn | Tandai nav/submenu/dot aktif |
| `openCategory(data, submenu, nav)` | fn | Buka kategori (tutup lainnya) |
| `loadPDF(url)` | fn | Render PDF ke iframe |
| `searchArticle(keyword)` | fn | Cari & buka artikel |

## 5. Pemisahan Tanggung Jawab CSS

- `style.css` — halaman utama (hero, features, accordion, cover page, popup).
- `periodisasi.css` / `resepsi.css` — layout aplikasi (topbar, sidebar, konten, viewer,
  pagination). Nilai token diulang di masing-masing file dan **harus tetap sinkron**.

## 6. Catatan Arsitektur Penting

1. **Path relatif** menentukan segalanya; memindahkan file tanpa memperbarui referensi
   akan memutus halaman.
2. **Data duplikat secara sengaja**: judul artikel ada di accordion index (`script.js`)
   dan di sub-halaman (`*.js`). Saat menambah artikel, **dua-duanya** harus diperbarui.
3. **PDF.js** diakses sebagai viewer halaman penuh (iframe), bukan API programatik.
4. Sub-halaman memakai **ES Modules** → membutuhkan HTTP server saat development
   (`python -m http.server`, `npx serve`, atau ekstensi Live Server).
