# Change-Log.md — Format Pencatatan Perubahan

Format baku untuk mencatat perubahan pada proyek **LANDINGPAGEJAWA_SP
(Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)**. Setiap perubahan **fungsional** wajib dicatat.

---

## Format Entri

Setiap entri memakai blok berikut (diletakkan **paling atas** file, di atas entri lama):

```markdown
## [TANGGAL] — Ringkasan Singkat

**Jenis:** <feat | fix | refactor | style | docs | data | chore>

**File yang disentuh:**
- `path/file` (alasan singkat)

**Detail:**
- <apa yang diubah / ditambah / dihapus>

**Verifikasi:**
- <cara memverifikasi; mis. "dibuka di Chrome, tema gelap, lebar 768px">

**Catatan/risiko:**
- <isu yang tersisa, atau hal yang perlu diperhatikan>
```

## Contoh Entri

```markdown
## 2026-08-16 — Tambah artikel Prosa (Resepsi)

**Jenis:** data

**File yang disentuh:**
- `Assets/Artikel Web/ResepsiProsa/prosa3.pdf` (file baru)
- `Resepsi/resepsi.js` (tambah entri `prosaData`)
- `script.js` (tambah judul pada `resepsiData`)

**Detail:**
- Menambahkan artikel "Dinamika Sosial dalam Prosa Jawa Timur: Telaah Resepsi"
  sebagai `prosaData` id 3, dan judulnya di accordion index agar sinkron.

**Verifikasi:**
- Buka `resepsi.html?category=prosa&id=3` → PDF tampil; accordion index menampilkan
  judul; search menemukan artikel.

**Catatan/risiko:**
- Tidak ada.
```

## Aturan

1. **Wajib** untuk perubahan yang mengubah fungsionalitas, tampilan, atau data.
2. Perubahan `docs` (hanya dokumen) boleh dicatat sebagai `docs`.
3. Entri terbaru di atas, entri lama di bawah.
4. Gunakan tanggal sesuai hari kerja (format `YYYY-MM-DD`).
5. Jangan hapus riwayat entri lama tanpa izin pengguna.

## Riwayat Perubahan

## 2026-08-16 — Styling halaman Referensi/Arsip auto-fit di semua layar (mobile, iPad, tablet)

**Jenis:** fix + style

**File yang disentuh:**
- `Periodisasi/periodisasi.css` (mode teks `.content-card-body`, padding mobile, breakpoint tablet)
- `Resepsi/resepsi.css` (perubahan identik dengan `periodisasi.css`)

**Detail:**
- Halaman statis Referensi/Arsip (`#contentText`) sebelumnya terpotong/tidak bisa scroll karena `.content-card-body` memakai flex-center + `height:100vh` (mode PDF) dan `overflow:hidden` di ≤480px.
- Tambah aturan `.content-card-body:has(.content-text:not([hidden]))` agar saat konten teks tampil, kartu berpindah ke alur natural (`display:block`, `height:auto`, `overflow:visible`, `padding:0`); teks dibatasi `max-width:900px` dan ditengahkan.
- `overflow-wrap:break-word`/`word-break:break-word` pada `p/li/a` agar URL panjang tidak menimbulkan scroll horizontal di layar kecil.
- Padding konten teks diperkecil di ≤480px (`1.25rem 1rem`).
- Breakpoint tablet/iPad baru `@media (max-width:1024px)` (padding `.main-content`, ukuran `.page-title`, `.content-card-heading`) agar iPad landscape/tablet menyesuaikan.

**Verifikasi:**
- Pengecekan kurung kurawal CSS: 152 `{` = 152 `}` di kedua file; kedua file identik kecuali whitespace yang sudah ada sebelumnya (`overflow:hidden` vs `overflow: hidden`).
- Server lokal `python -m http.server 8000` — kedua halaman merespons 200.
- Belum: uji manual visual di browser (Referensi → Daftar Pustaka & Arsip, lebar 1280/1024/768/576/480/420/380px, tema terang & gelap).

**Catatan/risiko:**
- Memakai selektor `:has()` (didukung Chrome 105+, Edge 105+, Safari 15.4+, Firefox 121+).
- Perilaku sidebar mobile tidak diubah (sesuai permintaan: hanya konten auto-fit).

## 2026-08-16 — Isi submenu Arsip & Referensi dari berkas KORPUS (data bersama)

**Jenis:** feat + data

**File yang disentuh:**
- `Assets/data/korpus-data.mjs` (file baru — data bersama korpus arsip & daftar pustaka, diekstrak dari `Assets/Copy of KORPUS DATA KARYA SASTRA .xlsx`)
- `Periodisasi/periodisasi.js`, `Resepsi/resepsi.js` (import data bersama; submenu Arsip menjadi halaman statis; `specialPages.arsip`; `specialPages.referensi` diisi daftar pustaka; `showSpecialPage` mendukung `html` dan menyembunyikan viewer PDF saat halaman statis)
- `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css` (hapus `.sub-nav-link` yang mati; tambah gaya `.content-text h3/ul/li` untuk halaman Arsip)

**Detail:**
- Submenu "Arsip Digital Karya Sastra Jawa Timur" (placeholder 3 tautan `#`) kini membuka halaman statis berisi **137 karya sastra** dari Sheet ARSIP KARYA SASTRA, dikelompokkan per genre: Novel & Prosa (80), Drama (24), Puisi (26), Sastra Klasik & Tradisi (7). **108 entri** memuat tautan eksternal (dibuka di tab baru); sisanya (~29) tampil sebagai teks polos. Tahun hanya tampil bila ada.
- Halaman "Referensi" kini memuat **145 entri daftar pustaka** (gaya APA, bernomor) dari Sheet DAFTAR PUSTAKA.
- Data ditaruh di **satu file bersama** `Assets/data/korpus-data.mjs` (modul ES diekspor) agar tidak terduplikasi di dua sub-halaman; `buildArsipHTML()` juga di sana.
- Pembersihan data: buang spasi berlebih/akhiran, awali tautan telanjang dengan `https://`, hilangkan penanda `-`, rapikan angka tahun (`2020.0` → `2020`), perbaiki mojibake (`Gh�ncaran` → `Ghâncaran`).
- `buildLinkSubmenu` (kode mati) dan `.sub-nav-link` (CSS mati) dihapus dari kedua sub-halaman.
- Viewer PDF disembunyikan saat halaman statis (Arsip/Referensi) ditampilkan agar tidak ada PDF lama yang tersisa di atas teks.

**Verifikasi:**
- `node --check` pada `korpus-data.mjs` lulus; `periodisasi.js`/`resepsi.js` diperiksa via salinan `.mjs` (kini memakai `import`).
- `buildArsipHTML()` diuji di Node: 4 grup benar, 108 `<a href>`, teks ter-escape (`&` → `&amp;`), `Ghâncaran` tersimpan utuh.
- Grep memastikan tidak ada sisa `url: "#"` / placeholder "akan ditambahkan" / `buildLinkSubmenu`.
- Belum: uji manual browser (klik Arsip & Referensi, tema gelap, lebar ≤480px).

**Catatan/risiko:**
- Pengelompokan genre diinferensikan dari isi sheet (sheet tidak memuat label kelompok).
- `node --check` langsung pada `.js` kini gagal karena `import`; gunakan salinan `.mjs` atau skrip pemindai lainnya.

## 2026-08-16 — Rebrand, artikel baru, dan submenu Arsip/Referensi

**Jenis:** feat + data + style + docs

**File yang disentuh:**
- `Assets/Artikel Web/PeriodisasiPuisi/puisi3.pdf` (file baru dari pengguna)
- `Periodisasi/periodisasi.js` (tambah `puisiData` id 3; submenu Arsip/Referensi)
- `script.js` (tambah judul Puisi di accordion index)
- `Resepsi/resepsi.js` (submenu Arsip/Referensi)
- `index.html`, `Periodisasi/periodisasi.html`, `Resepsi/resepsi.html` (rebrand, meta/title, brand, submenu HTML, `#contentText`)
- `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css` (`.nav-label--wrap`, `.sub-nav-link`, `.content-text`)
- Dokumentasi: rebrand di ±20 file markdown + hitungan artikel 14→15 di `CONTEXT.md`, `ERD.md`, `Content-Structure.md`, `PRD.md`, `AGENTS.md`, `Testing.md`; `Docs/Audit.md`

**Detail:**
- Rebrand web dari "Lorong Nusantara — Litera Jatim" menjadi "Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur" (UI + dokumentasi).
- Menambahkan artikel baru `puisi3.pdf` (judul "Perkembangan Kepengarangan Pramoedya Ananta Toer ...") ke `puisiData` dan accordion index (Puisi kini 3 item; total artikel 15).
- Menambahkan submenu sidebar "Arsip Digital Karya Sastra Jawa Timur" (link eksternal via `buildLinkSubmenu`, URL masih placeholder) dan "Referensi" (halaman statis daftar pustaka via `specialPages.referensi` + `#contentText`).

**Verifikasi:**
- `node --check` `script.js`, `Periodisasi/periodisasi.js`, `Resepsi/resepsi.js` lulus.
- Grep memastikan tidak ada sisa "Lorong Nusantara"/"Litera Jatim" di UI & dokumen (kecuali entri glossary/change-log yang sudah diperbarui).

**Catatan/risiko:**
- URL submenu Arsip dan isi daftar pustaka masih placeholder.
- Artikel baru berjudul "Prosa" namun ditempatkan di kategori "Puisi" — sesuai data pengguna, hanya dicatat.

## 2026-08-16 — Eksekusi Audit Menyeluruh (perbaikan kode + penyesuaian dokumentasi)

**Jenis:** fix + docs + chore

**File yang disentuh:**
- `script.js` (hapus blok upload avatar; `linkHref` default dihapus; `<image>`→`<img>`; sinkron judul Drama/Prosa/Puisi; tukar grup `resepsiData`)
- `Periodisasi/periodisasi.js` (hapus `navResepsi` mati; null-guard `contentText` di `showSpecialPage`)
- `Resepsi/resepsi.js` (hapus `navPeriodisasi` mati; `allData` hanya `prosa`/`puisi`; null-guard `contentText`)
- `index.html`, `Periodisasi/periodisasi.html`, `Resepsi/resepsi.html` (lang id, meta description, backslash→slash, aria/title/placeholder, snippet anti-FOUC)
- `style.css`, `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css` (gabung `transform` cursor; hapus `.pricing`/`.panel.dark-mode`; tampilkan search ≤480px)
- `README.md`, `.gitignore` (file baru)
- `Docs/Audit.md` (file baru, laporan audit)
- `CONTEXT.md`, `Docs/Testing.md`, `Docs/ERD.md`, `Docs/SRS.md`, `Docs/UIUX.md`, `Docs/Content-Structure.md`, `AGENTS.md`, `AI/Checklist.md` (penyesuaian dokumentasi)

**Detail:**
- Memperbaiki semua temuan audit: bug pencarian Resepsi (`ReferenceError`), error `showSpecialPage`, crash upload avatar, data kategori Resepsi tertukar, judul artikel tidak sinkron/terpotong, path backslash, atribut HTML, `transform` CSS ganda, *dead code* CSS, search tersembunyi ≤480px, dan penambahan meta/aria/anti-FOUC.
- Menciptakan laporan audit `Docs/Audit.md` serta `README.md` dan `.gitignore`.

**Verifikasi:**
- `node --check` untuk `script.js`, `Periodisasi/periodisasi.js`, `Resepsi/resepsi.js` lulus.
- Grep memastikan sisa referensi `dramaData|komunitasData` (di `resepsi.js`), `contentText`, `\.pricing`, `panel\.dark-mode`, `Artikel/detail.html` hilang dari berkas yang diperbaiki.
- Uji manual menyusul: klik brand, pencarian, tema+FOUC, resolusi ≤480px.

**Catatan/risiko:**
- `LICENSE` belum dibuat — menunggu keputusan jenis lisensi pemilik proyek (dicatat di `Docs/Audit.md` §G).
- `periodisasi.css`/`resepsi.css` sengaja dibiarkan terpisah (beda hanya whitespace).
