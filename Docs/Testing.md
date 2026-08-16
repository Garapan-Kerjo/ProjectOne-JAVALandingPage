# Testing.md — Rencana & Checklist Pengujian

Rencana pengujian untuk **LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim)**.

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
      Resepsi(`#resepsi`), Tentang Kami(`#kontak`).
- [ ] Accordion Periodisasi: 4 kartu (Drama, Komunitas, Prosa, Puisi); klik panel
      membuka konten; hanya satu panel aktif.
- [ ] Accordion Resepsi: 2 kartu (Prosa, Puisi).
- [ ] Tautan "Telusuri Lebih Lanjut" membuka sub-halaman dengan parameter URL benar.
- [ ] Footer cover page menampilkan logo, prodi, 3 dosen, dan 4 anggota.
- [ ] Custom cursor mengikuti mouse; normal saat hover PDF tidak relevan di halaman ini.

### 2.2 Halaman Periodisasi (`Periodisasi/periodisasi.html`)
- [ ] Sidebar menampilkan 4 kategori + tautan Resepsi & Beranda.
- [ ] Klik kategori membuka submenu & memuat konten pertama kategori.
- [ ] Klik sub-item memuat PDF yang benar (judul & breadcrumb sinkron).
- [ ] Pagination: tombol prev/next menonaktifkan di posisi awal/akhir; dot menandai
      posisi aktif.
- [ ] Search: ketik sebagian judul → Enter → artikel terbuka; ketik teks tak ada →
      alert "Artikel tidak ditemukan".
- [ ] PDF tampil dalam iframe viewer; scroll & zoom viewer berfungsi.
- [ ] Cursor menghilang saat kursor di dalam area PDF dan muncul kembali saat keluar.
- [ ] Deep-link: `?category=prosa&id=3` langsung membuka artikel prosa ke-3.
- [ ] Deep-link salah (`?category=xyz`) → fallback ke kategori Drama.
- [ ] Hamburger di mobile membuka sidebar + backdrop.

### 2.3 Halaman Resepsi (`Resepsi/resepsi.html`)
- [ ] Semua item di §2.2 (kategori: Prosa & Puisi; default `puisi`).
- [ ] **Diketahui rusak:** fitur Search — kode `resepsi.js` mereferensikan
      `dramaData`/`komunitasData` yang tidak ada di file tersebut; menekan tombol
      cari akan memunculkan `ReferenceError` (lihat §6).

### 2.4 Cross-cutting
- [ ] Dark mode berfungsi penuh di ketiga halaman (tokens tidak bocor).
- [ ] Responsive: tidak ada scroll horizontal pada 768, 576, 420px.
- [ ] Keyboard: panel accordion dapat dioperasikan dengan Enter/Space.
- [ ] Semua aset (gambar) tampil — tidak ada ikon rusak.

## 3. Matriks Fitur ↔ Status

| Fitur | Index | Periodisasi | Resepsi |
|-------|:-----:|:-----------:|:-------:|
| Theme toggle | ✔ | ✔ | ✔ |
| Custom cursor | ✔ | ✔ | ✔ |
| Popup sambutan | ✔ | — | — |
| Accordion grouped | ✔ | — | — |
| Sidebar & submenu | — | ✔ | ✔ |
| Pagination | — | ✔ | ✔ |
| Search | — | ✔ | ⚠ rusak |
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

## 6. Daftar Bug yang Diketahui (Belum Diperbaiki)

| # | Lokasi | Gejala | Catatan |
|---|--------|--------|---------|
| 1 | `Resepsi/resepsi.js` `searchArticle` | `ReferenceError: dramaData is not defined` saat mencari | `allData` menyalin blok dari `periodisasi.js` |
| 2 | `Periodisasi/periodisasi.js` & `Resepsi/resepsi.js` `showSpecialPage` | Akses `contentText.innerHTML` yang tidak ada → error | Dipanggil saat klik brand |
| 3 | `index.html` | `lang="en"` padahal konten berbahasa Indonesia | Perbaiki bila diminta |
| 4 | `Resepsi/resepsi.html` | Judul placeholder "RESEPSI ABCDEFGHIJK" | Data halaman |
| 5 | `style.css` `.cursor` | `transform` dideklarasikan dua kali; `translate(-50%,-50%)` tertimpa `rotate(-35deg)` | Cursor agak bergeser dari titik klik |
| 6 | `script.js` cover page | Loop kedua mereferensikan `fileInput-i`/`avatar-i` yang tidak ada di DOM | Tidak crash karena elemen tak ditemukan (`.addEventListener` pada null → error bila `memberList` ada) |
| 7 | `resepsi.js` | `categoryMap` hanya berisi `puisi` & `prosa`; bila kategori di URL adalah slug lain → fallback default | Perilaku sesuai desain |
| 8 | CSS duplikat | `style.css` mendefinisikan `:root` 3× dan `body.dark-mode` beberapa kali; `periodisasi.css`/`resepsi.css` identik 100% | Pengulangan disengaja per file; jaga sinkron |
| 9 | `resepsi.html` | `aria-expanded="false "` (spasi) pada hamburger | Kosmetik |

> Jangan memperbaiki bug di atas **tanpa diminta pengguna**. Jika diminta, catat di
> `AI/Change-Log.md`.
