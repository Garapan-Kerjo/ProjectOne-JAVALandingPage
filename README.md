# LANDINGPAGEJAWA_SP — Lorong Nusantara (Litera Jatim)

Website statis (vanilla HTML/CSS/JS, tanpa framework dan tanpa backend) untuk digitalisasi
sejarah sastra Jawa Timur melalui dua pendekatan: **Periodisasi** dan **Resepsi**. Proyek ini
merupakan Tugas Besar Prodi Bahasa dan Sastra Indonesia, Universitas Airlangga.

## Struktur Halaman

| Halaman | Deskripsi |
|---------|-----------|
| `index.html` | Halaman utama / landing page |
| `Periodisasi/periodisasi.html` | Sub-halaman pendekatan Periodisasi (artikel PDF) |
| `Resepsi/resepsi.html` | Sub-halaman pendekatan Resepsi (artikel PDF) |

## Menjalankan

Tidak ada proses build. Cukup buka `index.html` di browser, atau jalankan server statis:

```bash
# Contoh dengan Python
python -m http.server 8000
```

Lalu akses `http://localhost:8000`.

## Konten Artikel

Seluruh artikel tersimpan sebagai PDF di `Assets/Artikel Web/` dan dirender menggunakan
library PDF.js lokal (`Extension/pdfjs-6.1.200-dist`). Data judul/paragraf artikel
didefinisikan di `Periodisasi/periodisasi.js` dan `Resepsi/resepsi.js`. Panduan menambah
artikel: `Docs/Content-Structure.md`.

## Dokumentasi

Seluruh dokumentasi proyek berada di root (`CONTEXT.md`, `RULES.md`, `WORKFLOW.md`) dan folder
`Docs/` (PRD, SRS, Architecture, ERD, UIUX, Security, Testing, dll.), serta `AI/` untuk aturan
khusus agen AI. Baca `AGENTS.md` terlebih dahulu sebelum mengubah apa pun.

## Lisensi

Lisensi proyek belum ditetapkan.
