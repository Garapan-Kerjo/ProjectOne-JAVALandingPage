# CONTEXT.md — Konteks Proyek LANDINGPAGEJAWA_SP

Dokumen ini berisi konteks menyeluruh proyek agar setiap agen AI memiliki **satu
pemahaman prompt yang utuh** tentang apa, mengapa, dan bagaimana proyek ini dibangun.

---

## 1. Identitas Proyek

| Atribut | Nilai |
|---------|-------|
| Nama repositori | `landingpageJAWA_SP` |
| Nama brand | **Lorong Nusantara** |
| Judul browser (index) | **Litera Jatim** |
| Jenis aplikasi | Website statis (HTML + CSS + JavaScript vanilla) |
| Tanpa build tool | Tidak ada bundler, framework JS, atau package manager |
| Bahasa antarmuka | Bahasa Indonesia (dengan beberapa teks Inggris) |
| Tema | Digitalisasi Sejarah Sastra Jawa Timur |

## 2. Latar Belakang Akademik

Proyek ini adalah **Tugas Besar** mata kuliah/kegiatan bertajuk
**"Digitalisasi Sejarah Sastra Jawa Timur"** dari:

- **Institusi:** Universitas Airlangga (UNAIR)
- **Program Studi:** Bahasa dan Sastra Indonesia
- **Dosen Pengampu:**
  - Dr. Ida Nurul Chasanah, S.S., M.Hum
  - Dr. Nadya Afdholy, S.Hum., M.Pd., M.Hum
  - Rima Firdaus Lahdji, S.Hum., M.Hum
- **Konten anggota:** 4 anggota (masih placeholder: "Nama Anggota 1..4")

## 3. Tujuan & Misi

**Misi:** Menyediakan platform digital yang mendokumentasikan, memetakan, dan
mengeksplorasi perkembangan sejarah sastra Jawa Timur melalui pendekatan kajian sastra.

Website menampilkan **artikel ilmiah (PDF)** yang dikelompokkan berdasarkan dua
pendekatan kajian sastra utama:

1. **Periodisasi** — mengelompokkan perkembangan sastra berdasarkan rentang waktu
   dengan mempertimbangkan perubahan kondisi sosial, budaya, sejarah, serta
   karakteristik estetik tiap periode.
2. **Resepsi** — mengkaji bagaimana sebuah karya sastra diterima, dipahami, dimaknai,
   dan diinterpretasikan oleh pembaca/masyarakat pada berbagai ruang dan waktu.

## 4. Halaman & Fungsi Utama

| Halaman | Path | Fungsi |
|---------|------|--------|
| Beranda | `index.html` | Hero, fitur (Periodisasi & Resepsi), accordion konten, profil tim (cover UNAIR), popup sambutan |
| Periodisasi | `Periodisasi/periodisasi.html` | Sidebar kategori (Drama, Komunitas, Prosa, Puisi), tampil artikel PDF, pagination, pencarian |
| Resepsi | `Resepsi/resepsi.html` | Sidebar kategori (Prosa, Puisi), tampil artikel PDF, pagination, pencarian |

### Fitur lintas halaman
- **Dark/light theme** — toggle disimpan di `localStorage` dengan key `theme`,
  memakai `prefers-color-scheme` sebagai fallback.
- **Custom cursor** — gambar `Assets/culture_icon.png`; tersembunyi pada perangkat sentuh.
- **PDF viewer** — memakai library **PDF.js v6.1.200** di `Extension/pdfjs-6.1.200-dist`
  melalui `web/viewer.html?file=...`.

## 5. Struktur Konten (Data Artikel)

Data artikel didefinisikan **inline di JavaScript** (bukan database).

### `script.js` (index)
- `periodisasiData`: Drama (3 item), Komunitas (1), Prosa (4), Puisi (2) → total 10
- `resepsiData`: Prosa (2), Puisi (2) → total 4
- `membersData`: 4 anggota (placeholder)

### `Periodisasi/periodisasi.js`
- `dramaData` (3) — file `Assets/Artikel Web/PeriodisasiDrama/drama*.pdf`
- `komunitasData` (1) — `PeriodisasiKomunitas/komunitas1.pdf`
- `prosaData` (4) — `PeriodisasiProsa/prosa*.pdf`
- `puisiData` (2) — `PeriodisasiPuisi/puisi*.pdf`

### `Resepsi/resepsi.js`
- `puisiData` (2) — `Assets/Artikel Web/ResepsiPuisi/puisi*.pdf`
- `prosaData` (2) — `ResepsiProsa/prosa*.pdf`

> Detail lengkap ada di `Docs/ERD.md` dan `Docs/Content-Structure.md`.

## 6. Parameter URL (Routing)

Sub-halaman menerima query parameter untuk membuka konten tertentu:

```
Periodisasi/periodisasi.html?category=drama&id=1
Resepsi/resepsi.html?category=puisi&id=2
```

- `category`: `drama | komunitas | prosa | puisi` (Periodisasi); `puisi | prosa` (Resepsi)
- `id`: nomor urut artikel dalam kategori tersebut (mulai dari 1)
- Jika param tidak valid → fallback ke kategori default (Periodisasi: `drama`, Resepsi: `puisi`).

## 7. Design System (Ringkasan)

- **Font:** Poppins (utama), Actor (import, jarang dipakai), Georgia (cover/aksen serif)
- **Palet light:** background `#F8F5EF`, surface `#FFFDF8`, primary `#5A3E2B`,
  secondary `#B45A3C`, accent `#C89B3C`
- **Palet dark:** background `#171311`, surface `#231C18`, primary `#D4AF37`,
  secondary `#C56A45`, accent `#E0C067`
- **Token CSS** dipakai konsisten di seluruh stylesheet (`--background`, `--surface`,
  `--primary`, `--secondary`, `--accent`, `--text`, `--text-secondary`, `--border`, dst.)

> Detail lengkap: `Docs/UIUX.md`.

## 8. Hal yang Perlu Diketahui Agen (Penting)

1. **HTML statis murni** — tidak ada server, API, atau database. "Backend"-nya adalah
   file JS dengan array data.
2. **Relatif path sangat penting.** Sub-halaman di folder `Periodisasi/` dan `Resepsi/`
   memakai `../` untuk mengakses `Assets/` dan `Extension/`.
3. **Peringatan yang belum diperbaiki** (jangan dianggap sebagai standar):
   - `resepsi.js` mereferensikan `dramaData`/`komunitasData` di fungsi `searchArticle`
     padahal variabel itu tidak ada di file tersebut (bug saat pencarian).
   - `showSpecialPage()` mereferensikan elemen `contentText` yang tidak ada di HTML
     (akan error jika dipanggil).
   - `index.html` memakai `lang="en"` meski konten berbahasa Indonesia.
   - `resepsi.html` memuat judul placeholder "RESEPSI ABCDEFGHIJK".
   - Aturan `cursor` di CSS mendeklarasikan `transform` dua kali (yang kedua menimpa).
   - Tag `<image>` (tidak valid) dipakai untuk avatar anggota.
   - Kode unggah foto anggota mereferensikan `fileInput-i`/`avatar-i` yang tidak ada.
4. **Jangan mengubah** `Extension/` dan `Assets/Artikel Web/*.pdf`.

## 9. Riwayat Singkat (Git)

Repo berada di branch `main`, sinkron dengan `origin/main`. Commit terakhir bernama
"Change commit point 1-3". Riwayat menunjukkan iterasi bertahap: perbaikan kecil,
perombakan viewer PDF, pembaruan artikel, dan penyempurnaan responsif.
