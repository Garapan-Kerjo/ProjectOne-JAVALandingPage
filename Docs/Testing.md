# Testing.md — Rencana & Checklist Pengujian

Rencana pengujian untuk **LANDINGPAGEJAWA_SP (Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)**.

> Proyek tanpa test runner otomatis. Semua pengujian dilakukan **manual di browser**
> melalui prosedur di bawah. Wajib dijalankan setelah setiap perubahan kode.

---

## 1. Lingkungan Uji

| Aspek | Ketentuan |
|-------|-----------|
| Server | Gunakan HTTP server (disarankan): `python -m http.server` / `npx serve` / Live Server |
| Browser | Chrome / Firefox / Edge terbaru (wajib); Safari bila tersedia |
| Mode | Desktop (≥1280px), Tablet (768–992px), Mobile (≤576px) |
| Tema | Light & Dark — uji keduanya di setiap halaman |

> Sub-halaman memakai ES Modules (`<script type="module">`) sehingga **tidak berfungsi
> baik via `file://`**. Selalu uji lewat server.

## 2. Checklist Pengujian Fungsional

### 2.1 Halaman Utama (`index.html`)
- [ ] Popup sambutan muncul ±1 detik setelah load.
- [ ] Popup tertutup lewat tombol `×` dan tombol "Jelajahi Sekarang".
- [ ] Toggle tema mengubah seluruh halaman (icon berubah sun↔moon).
- [ ] Tema tersimpan setelah refresh (`localStorage.theme`).
- [ ] Nav anchor bekerja: Beranda(`#`), Menu(`#namaTubes`), Periodisasi(`#periodisasi`),
      Resepsi(`#resepsi`), Tentang Kami(`#kontak`). (Arsip/Referensi tidak di navbar top.)
- [ ] Accordion Periodisasi: 4 kartu (Drama, Komunitas, Prosa, Puisi); klik panel
      membuka konten; hanya satu panel aktif.
- [ ] Accordion Resepsi: 2 kartu (Prosa, Puisi).
- [ ] Section Arsip: 5 kartu accordion full-width (Novel & Prosa, Drama, Puisi, Sastra
      Klasik & Tradisi, Daftar Puisi Mahasiswi); panel pertama aktif; header menampilkan
      jenis di kiri, angka kuantitas di kanan (faded), panah dropdown; isi dapat di-scroll;
      item ber-`url` membuka tab baru, item tanpa `url` tampil sebagai teks polos.
- [ ] Kartu "Daftar Puisi Mahasiswi": 2 komunitas (Nastyaksara 2021, Selasar Lazuardi 2026)
      menautkan ke Instagram (tab baru).
- [ ] Section Referensi: satu kartu berisi daftar pustaka 145 entri; **tanpa nomor
      ganda** — hanya nomor 1–145 di teks, berurutan runtut; baris lanjutan rata kiri.
- [ ] Tautan "Telusuri Lebih Lanjut" membuka sub-halaman dengan parameter URL benar.
- [ ] Footer cover page menampilkan logo, prodi, 3 dosen, dan label tunggal
      "Bahasa & Sastra Indonesia 2024" dengan ikon wayang (tanpa foto/NIM anggota).
- [ ] Custom cursor mengikuti mouse; normal saat hover PDF tidak relevan di halaman ini.

### 2.2 Halaman Periodisasi (`Periodisasi/periodisasi.html`)
- [ ] Sidebar menampilkan 4 kategori + tautan Resepsi & Beranda (tanpa submenu Arsip/Referensi).
- [ ] Klik kategori membuka submenu & memuat konten pertama kategori.
- [ ] Klik sub-item memuat PDF yang benar (judul & breadcrumb sinkron).
- [ ] Pagination: tombol prev/next menonaktifkan di posisi awal/akhir; dot menandai
      posisi aktif.
- [ ] Search (desktop): ketik sebagian judul → Enter → artikel terbuka; ketik teks tak ada →
      alert "Artikel tidak ditemukan" (search bar disembunyikan pada ≤768px).
- [ ] PDF tampil dalam iframe viewer; scroll & zoom viewer berfungsi.
- [ ] Cursor menghilang saat kursor di dalam area PDF dan muncul kembali saat keluar.
- [ ] Deep-link: `?category=prosa&id=3` langsung membuka artikel prosa ke-3.
- [ ] Deep-link salah (`?category=xyz`) → fallback ke kategori Drama.
- [ ] Hamburger di mobile membuka sidebar + backdrop.

### 2.3 Halaman Resepsi (`Resepsi/resepsi.html`)
- [ ] Semua item di §2.2 (kategori: Prosa & Puisi; default `puisi`).
- [ ] Search berfungsi normal (telah diperbaiki di audit: `allData` hanya `prosa`/`puisi`,
      tanpa `ReferenceError`).

### 2.4 Cross-cutting
- [ ] Dark mode berfungsi penuh di ketiga halaman (tokens tidak bocor).
- [ ] Responsive: tidak ada scroll horizontal pada 768, 576, 420px.
- [ ] Topnav auto-hide: scroll ke bawah (>120px) → topnav & sidebar naik; scroll ke atas →
      muncul kembali. Di mobile, search bar tidak tampil dan topnav tetap rapi.
- [ ] Keyboard: panel accordion dapat dioperasikan dengan Enter/Space.
- [ ] Semua aset (gambar) tampil — tidak ada ikon rusak.

## 3. Matriks Fitur ↔ Status

| Fitur | Index | Periodisasi | Resepsi |
|-------|:-----:|:-----------:|:-------:|
| Theme toggle | ✔ | ✔ | ✔ |
| Custom cursor | ✔ | ✔ | ✔ |
| Popup sambutan | ✔ | — | — |
| Accordion grouped | ✔ | — | — |
| Arsip Digital (list accordion) | ✔ | — | — |
| Referensi (daftar pustaka) | ✔ | — | — |
| Sidebar & submenu | — | ✔ | ✔ |
| Pagination | — | ✔ | ✔ |
| Search | — | ✔ | ✔ |
| PDF viewer | — | ✔ | ✔ |
| Deep-link URL | — | ✔ | ✔ |
| Cover page anggota | ✔ | — | — |

## 4. Prosedur Uji Regresi

1. Baca `AI/Change-Log.md` untuk melihat perubahan terakhir.
2. Jalankan checklist §2 untuk halaman yang terpengaruh.
3. Bila perubahan menyentuh data: verifikasi **semua** tautan accordion → artikel benar.
4. Bila perubahan menyentuh CSS: uji 2 tema × 3 ukuran layar minimum.

## 5. Kriteria Lolos (Definition of Done)

- Checklist §2 untuk lingkup perubahan **seluruhnya lulus**.
- Tidak ada fitur yang sebelumnya berfungsi menjadi rusak (regresi).
- Tidak ada perubahan pada `Extension/`.
- Perubahan fungsional dicatat di `AI/Change-Log.md`.

## 6. Riwayat Bug yang Telah Diperbaiki

Semua bug di bawah ditemukan saat audit (lihat `Docs/Audit.md`) dan telah **diperbaiki**.
Jangan mengenalkan kembali perilaku berikut.

| # | Lokasi | Gejala | Perbaikan |
|---|--------|--------|-----------|
| 1 | `Resepsi/resepsi.js` `searchArticle` | `ReferenceError: dramaData is not defined` saat mencari | `allData` hanya memuat `prosaData` & `puisiData` |
| 2 | `Periodisasi/periodisasi.js` & `Resepsi/resepsi.js` `showSpecialPage` | Akses `contentText.innerHTML` yang tidak ada → error | Null-guard + fallback `(paragraphs || [])` |
| 3 | `index.html` | `lang="en"` padahal konten berbahasa Indonesia | `lang="id"` |
| 4 | `Resepsi/resepsi.html` | Judul placeholder "RESEPSI ABCDEFGHIJK" | "RESEPSI" |
| 5 | `style.css` `.cursor` (3 stylesheet) | `transform` dideklarasikan dua kali; `translate` tertimpa `rotate` | Satu `transform: translate(-50%,-50%) rotate(-35deg)` |
| 6 | `script.js` cover page | Loop upload avatar mereferensikan `fileInput-i`/`avatar-i` yang tidak ada di DOM → `TypeError` mematikan seluruh script | Blok dihapus |
| 7 | `script.js` `resepsiData` | Grup "Prosa" berisi judul puisi & sebaliknya | Grup ditukar agar sesuai kategori |
| 8 | `script.js` judul artikel | `"SastraBerdasarkan"` tanpa spasi; judul Puisi item 1 terpotong; judul Drama tidak sinkron | Diberi spasi, digabung, disinkronkan ke `periodisasi.js` |
| 9 | CSS duplikat | `periodisasi.css`/`resepsi.css` "identik 100%" | Faktanya berbeda satu spasi (`overflow:hidden` vs `overflow: hidden`); kini dikonfirmasi identik |
| 10 | `resepsi.html` | `aria-expanded="false "` (spasi) pada hamburger | `"false"` |
| 11 | CSS *dead code* | `.pricing` (light/dark/responsif) & `.panel.dark-mode` tidak dipakai | Dihapus dari `style.css` |
| 12 | `periodisasi.css`/`resepsi.css` | `.search-bar` `display:none` di ≤480px mematikan pencarian | Ditampilkan (revisi 2026-08-16: search kini **sengaja disembunyikan** di ≤768px, tetap ada di desktop) |
| 13 | Sub-halaman `Periodisasi`/`Resepsi` | Arsip & Referensi lama dirender di sidebar (submenu non-artikel) | Dipindah ke `index.html` (section `#arsip` & `#referensi`, data dari `korpus-data.mjs`); submenu & kode terkait dihapus |

> Semua perbaikan fungsional tercatat di `AI/Change-Log.md`.
