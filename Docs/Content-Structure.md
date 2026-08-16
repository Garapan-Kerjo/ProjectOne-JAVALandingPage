# Content-Structure.md — Struktur Konten Artikel

Panduan struktur & cara mengelola konten artikel sastra di **Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur**.

---

## 1. Model Konten

Setiap artikel = **1 file PDF** + **1 entri data JS** di lokasi yang sesuai. Judul
artikel juga muncul di accordion halaman utama.

```
Sumber tunggal di sub-halaman:
  Periodisasi/periodisasi.js → { kategori }Data: [{ id, label, pdf }]
  Resepsi/resepsi.js         → { kategori }Data: [{ id, label, pdf }]

Tampilan ringkas di halaman utama:
  script.js → periodisasiData / resepsiData → items: [{ title }]
```

## 2. Peta Kategori & File

| Metode | Kategori | Jumlah Artikel | Folder PDF |
|--------|----------|:--------------:|------------|
| Periodisasi | Drama | 3 | `Assets/Artikel Web/PeriodisasiDrama/` |
| Periodisasi | Komunitas | 1 | `Assets/Artikel Web/PeriodisasiKomunitas/` |
| Periodisasi | Prosa | 4 | `Assets/Artikel Web/PeriodisasiProsa/` |
| Periodisasi | Puisi | 3 | `Assets/Artikel Web/PeriodisasiPuisi/` |
| Resepsi | Prosa | 2 | `Assets/Artikel Web/ResepsiProsa/` |
| Resepsi | Puisi | 2 | `Assets/Artikel Web/ResepsiPuisi/` |

Total: **15 artikel**.

> **Arsip Digital & Referensi** kini berada di `index.html` (bukan sub-halaman):
> - Section `#arsip` memakai `korpusArsip` dari `Assets/data/korpus-data.mjs` (4 grup:
>   Novel & Prosa, Drama, Puisi, Sastra Klasik & Tradisi) + kartu **Daftar Puisi Mahasiswi**
>   (`daftarPuisiMahasiswi` — 2 komunitas, tautan Instagram), dirender sebagai kartu accordion.
> - Section `#referensi` memakai `daftarPustaka` (145 entri bernomor runtut 1–145, angka
>   tertanam di teks — tidak ada nomor otomatis dari elemen list) dari berkas yang sama.
> - Ketiganya **bukan data artikel** (tidak masuk hitungan di atas dan tidak terhubung ke PDF).

## 3. Langkah Menambah Artikel Baru

1. **Siapkan PDF** dengan penamaan mengikuti pola:
   `<metode><kategori>/<kategori><nomor>.pdf` contoh `PeriodisasiDrama/drama4.pdf`.
   Pastikan huruf kecil, tanpa spasi.
2. **Letakkan file** di folder yang benar di `Assets/Artikel Web/`.
3. **Daftarkan di sub-halaman** (`periodisasi.js` / `resepsi.js`): tambahkan objek
   `{ id, label, pdf }` ke array kategori yang sesuai. `id` = urutan baru.
4. **Daftarkan di accordion index** (`script.js`): tambahkan `{ title: "..." }` ke
   `items` kategori terkait. Judul harus sama persis dengan `label`.
5. **Verifikasi** (ikuti `Docs/Testing.md` §2): buka tautan accordion, deep-link
   `?category=<slug>&id=<n>`, dan periksa search.

## 4. Langkah Menghapus Artikel

1. Hapus entri dari **kedua** sumber data (sub-halaman + index).
2. Jangan hapus file PDF jika masih direferensikan entri lain.
3. Renomori `id`/file bila perlu agar urut (opsional — pastikan konsisten).

## 5. Aturan Penulisan Judul

- Judul (`label` / `title`) harus sama di semua tempat.
- Gunakan huruf kapital sesuai ejaan judul (Title Case bahasa Indonesia).
- Panjang bebas; teks panjang akan di-ellipsis di accordion (CSS `text-overflow`).
- Pencarian mencocokkan sebagian kata pada `label` (case-insensitive).

## 6. Konvensi Penamaan File PDF

| Bagian | Aturan |
|--------|--------|
| Kategori | `drama`, `komunitas`, `prosa`, `puisi` (huruf kecil) |
| Nomor | Urut mulai 1 tanpa padding (`1`, `2`, ...) |
| Folder | `<Metode><Kategori>` dengan kapital di awal kata, tanpa spasi |
| Path JS | Selalu relatif `../Assets/Artikel Web/<folder>/<file>.pdf` |

## 7. Sinkronisasi Data (Penting)

Akibat struktur data yang terduplikasi, **tiga tempat berikut wajib sinkron** saat
menambah/mengubah judul:

| # | File | Variabel | Contoh entri |
|---|------|----------|--------------|
| 1 | `Periodisasi/periodisasi.js` | `dramaData` dkk. | `{ id: 1, label: "...", pdf: "..." }` |
| 2 | `Resepsi/resepsi.js` | `puisiData`, `prosaData` | `{ id: 1, label: "...", pdf: "..." }` |
| 3 | `script.js` | `periodisasiData`, `resepsiData` | `{ category: "Drama", items: [{ title: "..." }] }` |

> Catatan (audit): sebelumnya grup `resepsiData` di `script.js` berlabel "Prosa" justru
> berisi judul puisi dan sebaliknya; telah **ditukar** sehingga grup "Puisi" berisi judul
> Puitika (puisi) dan grup "Prosa" berisi judul Potret (prosa) — sinkron dengan
> `Resepsi/resepsi.js`. Pastikan susunan ini tetap konsisten.
