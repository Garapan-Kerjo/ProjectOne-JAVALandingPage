# ERD.md — Model Data Proyek

Karena proyek ini **tanpa database**, "ERD" di sini memetakan **struktur data di dalam
kode** (array JS) dan **penyimpanan file** (folder). Dokumen ini menjadi acuan saat
menambah/mengubah data agar tetap konsisten.

---

## 1. Entitas & Atribut

### 1.1 `Article` (Artikel)
Struktur objek yang dipakai semua array data:

```js
{
  id: 1,            // Number, unik per kategori, mulai dari 1
  label: "...",     // String, judul artikel (dipakai untuk pencarian & tampilan)
  pdf: "..."        // String, path relatif ke file PDF di Assets/Artikel Web/
}
```

### 1.2 `Category` (Kategori)
Didefinisikan oleh `categoryMap` di JS:

```js
{
  "slug": {           // slug dari query string (category)
    data: [...],      // Array<Article>
    nav: Element,     // tombol nav-parent
    submenu: Element  // container submenu
  }
}
```

### 1.3 `Member` (Anggota Tim)
Didefinisikan di `script.js` → `membersData`:

```js
{
  name: "Nama Anggota 1", // String
  nim: "NIM Anggota 1"    // String
}
```

### 1.4 `Group` (Grup Accordion Index)
Didefinisikan di `script.js`:

```js
{
  category: "Drama",           // String, label kategori
  items: [{ title: "..." }]    // Array<{title}>, judul artikel
}
```

## 2. Relasi Antar Data

```
Periodisasi (metode)
  ├── Drama      → 3 artikel   (drama1..3.pdf)
  ├── Komunitas  → 1 artikel   (komunitas1.pdf)
  ├── Prosa      → 4 artikel   (prosa1..4.pdf)
  └── Puisi      → 2 artikel   (puisi1..2.pdf)

Resepsi (metode)
  ├── Prosa      → 2 artikel   (prosa1..2.pdf)
  └── Puisi      → 2 artikel   (puisi1..2.pdf)

Total: 14 artikel PDF
```

Relasi:
- `Metode 1—N Kategori`, `Kategori 1—N Artikel`.
- `Artikel 1—1 File PDF` (lokasi file = `Assets/Artikel Web/<Metode><Kategori>/`).
- Judul artikel direplikasi di **2 tempat** (accordion index & array sub-halaman) —
  harus dijaga sinkron.

## 3. Pemetaan File PDF ↔ Data JS

### 3.1 `Periodisasi/periodisasi.js`
| Kategori | id | File | Judul |
|----------|----|------|-------|
| Drama | 1 | `PeriodisasiDrama/drama1.pdf` | Sejarah dalam Naskah Drama Jawa Timur Melalui Metode Periodisasi |
| Drama | 2 | `PeriodisasiDrama/drama2.pdf` | Sejarah Dramaturgi dalam Universitas Airlangga |
| Drama | 3 | `PeriodisasiDrama/drama3.pdf` | Sejarah Dramaturgi UNAIR |
| Komunitas | 1 | `PeriodisasiKomunitas/komunitas1.pdf` | Pemetaan Historis Komunitas Sastra Jawa Timur Melalui Pendekatan Periodisasi |
| Prosa | 1 | `PeriodisasiProsa/prosa1.pdf` | Digitalisasi Sejarah Prosa Jawa Timur |
| Prosa | 2 | `PeriodisasiProsa/prosa2.pdf` | Inventarisasi dan Digitalisasi Karya-karya Pramoedya Ananta Toer |
| Prosa | 3 | `PeriodisasiProsa/prosa3.pdf` | Inventarisasi dan Digitalisasi Sastra Cina Peranakan |
| Prosa | 4 | `PeriodisasiProsa/prosa4.pdf` | Representasi Kota dalam Prosa Jawa Timur Melalui Kajian Sejarah Sastra Berdasarkan Periodisasi |
| Puisi | 1 | `PeriodisasiPuisi/puisi1.pdf` | Fragmen Kota dan Sejarah dalam Tubuh Sastra: Periodisasi Puisi di Jawa Timur (Tahun 2000-Sekarang) |
| Puisi | 2 | `PeriodisasiPuisi/puisi2.pdf` | Perkembangan Lanskap Kota dan Sejarah Jawa dalam Puisi (1970-Modern) |

### 3.2 `Resepsi/resepsi.js`
| Kategori | id | File | Judul |
|----------|----|------|-------|
| Puisi | 1 | `ResepsiPuisi/puisi1.pdf` | Puitika Ruang dalam Khazanah Puisi Jawa Timur dengan Memanfaatkan Metode Resepsi |
| Puisi | 2 | `ResepsiPuisi/puisi2.pdf` | Digitalisasi Puitika Kota/Sejarah dalam Khazanah Puisi Jawa Timur ... Karya Aming Aminoedhin |
| Prosa | 1 | `ResepsiProsa/prosa1.pdf` | Potret Sosial Budaya dalam Prosa Jawa Timur: Metode Resepsi Sastra |
| Prosa | 2 | `ResepsiProsa/prosa2.pdf` | Potret Dinamika Sejarah/Kota dalam Khazanah Prosa Jawa Timur |

### 3.3 `script.js` (accordion index — ringkasan)
- `periodisasiData`: Drama (3), Komunitas (1), Prosa (4), Puisi (2).
- `resepsiData`: Prosa (2), Puisi (2).
  - **Catatan (telah diperbaiki saat audit):** sebelumnya grup "Prosa" di index berisi
    judul Puitika (puisi) dan grup "Puisi" berisi judul Potret (prosa) — terbalik.
    Kini grup **"Prosa" berisi 2 judul Potret** dan grup **"Puisi" berisi 2 judul
    Puitika**, sinkron dengan `Resepsi/resepsi.js` dan pemetaan
    `?category=puisi|prosa&id=n`.

## 4. Penyimpanan File (Direktori)

```
Assets/Artikel Web/
├── PeriodisasiDrama/     # drama1.pdf, drama2.pdf, drama3.pdf
├── PeriodisasiKomunitas/ # komunitas1.pdf
├── PeriodisasiProsa/     # prosa1.pdf .. prosa4.pdf
├── PeriodisasiPuisi/     # puisi1.pdf, puisi2.pdf
├── ResepsiProsa/         # prosa1.pdf, prosa2.pdf
└── ResepsiPuisi/         # puisi1.pdf, puisi2.pdf
```

## 5. Aturan Integritas Data

1. `id` per kategori berurutan mulai 1 dan unik.
2. Setiap entri `Article` harus menunjuk ke file PDF yang **benar-benar ada**.
3. Judul di accordion index (`script.js`) harus **sama** dengan `label` di sub-halaman.
4. Menambah artikel → tambah file PDF + entri di **kedua** lokasi data.
5. Menghapus artikel → hapus dari **kedua** lokasi data + jangan hapus PDF yang masih
   direferensikan.
