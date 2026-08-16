# AGENTS.md — Panduan Wajib untuk Agen AI

File ini adalah pintu masuk (entry point) bagi **setiap agen AI** yang akan bekerja di
proyek **LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim)**.

> ⚠️ **WAJIB BACA SEBELUM MENGUBAH APA PUN.** Gagal membaca dokumen konteks di bawah
> dapat menyebabkan perubahan yang melanggar aturan proyek dan merusak konsistensi.

---

## 1. Urutan Baca yang Wajib Diikuti

Agen AI harus membaca dokumen berikut **berurutan** sebelum memulai pekerjaan apa pun:

| # | File | Tujuan |
|---|------|--------|
| 1 | `AGENTS.md` | Petunjuk masuk, peta file, dan aturan dasar (file ini) |
| 2 | `CONTEXT.md` | Latar belakang, identitas, dan fakta kunci proyek |
| 3 | `RULES.md` | Aturan main yang mengikat semua perubahan |
| 4 | `WORKFLOW.md` | Alur kerja standar (baca → rencana → implementasi → verifikasi) |
| 5 | `Docs/` | Dokumentasi fundamental (lihat §2 di bawah) |
| 6 | `AI/` | Aturan prompt & coding khusus agen AI (lihat §3 di bawah) |

Jika konteks agen terbatas, **minimal baca** `AGENTS.md`, `CONTEXT.md`, `RULES.md`, dan
`AI/Coding-Rules.md` sebelum menyentuh kode.

---

## 2. Peta Dokumentasi

### Root
- `AGENTS.md` — file ini, panduan masuk agen AI
- `CONTEXT.md` — konteks proyek & fakta kunci
- `RULES.md` — aturan mengikat untuk semua perubahan
- `WORKFLOW.md` — alur kerja standar agen

### `Docs/` — Fundamental Website
- `PRD.md` — Product Requirements Document (kebutuhan produk)
- `SRS.md` — Software Requirements Specification (spesifikasi teknis fungsional)
- `Architecture.md` — arsitektur & struktur kode
- `ERD.md` — model data / struktur data proyek
- `UIUX.md` — design system, tokens, komponen, responsif
- `Security.md` — pertimbangan keamanan
- `Testing.md` — rencana & checklist pengujian
- `Content-Structure.md` — struktur konten artikel & cara menambah artikel
- `Glossary.md` — istilah sastra & teknis
- `Deployment.md` — cara men-deploy / menjalankan website

### `AI/` — Aturan Khusus Agen AI
- `Rules-Prompt.md` — aturan untuk menyusun prompt
- `Master-Prompt.md` — prompt induk siap-pakai untuk memulai agen baru
- `Master-Rules.md` — aturan induk yang berlaku di semua sesi
- `Coding-Rules.md` — konvensi coding wajib
- `AI-Workflow.md` — workflow khusus agen AI (detail langkah demi langkah)
- `Change-Log.md` — format pencatatan perubahan
- `Checklist.md` — checklist sebelum/sesudah bekerja

---

## 3. Peta File Proyek (Sumber Kode)

```
landingpageJAWA_SP/
├── index.html                  # Halaman utama (landing page)
├── script.js                   # Logika utama: tema, cursor, popup, accordion, anggota
├── style.css                   # Design system + komponen halaman utama
├── Periodisasi/
│   ├── periodisasi.html        # Sub-halaman metode Periodisasi
│   ├── periodisasi.js          # Data artikel, sidebar, pagination, viewer PDF, search
│   └── periodisasi.css         # Gaya sub-halaman Periodisasi
├── Resepsi/
│   ├── resepsi.html            # Sub-halaman metode Resepsi
│   ├── resepsi.js              # Data artikel, sidebar, pagination, viewer PDF, search
│   └── resepsi.css             # Gaya sub-halaman Resepsi
├── Assets/
│   ├── logo-web.png            # Favicon & logo
│   ├── wayang_icon.png         # Ilustrasi hero
│   ├── culture_icon.png        # Gambar custom cursor
│   ├── doodlesBackground.png   # Pola latar body
│   ├── Lambang-Universitas-Airlangga-bg-putih.png
│   └── Artikel Web/            # PDF artikel (konten sastra)
│       ├── PeriodisasiDrama/   #   drama1..3.pdf
│       ├── PeriodisasiKomunitas/ # komunitas1.pdf
│       ├── PeriodisasiProsa/   #   prosa1..4.pdf
│       ├── PeriodisasiPuisi/   #   puisi1..2.pdf
│       ├── ResepsiProsa/       #   prosa1..2.pdf
│       └── ResepsiPuisi/       #   puisi1..2.pdf
└── Extension/
    └── pdfjs-6.1.200-dist/     # Library PDF.js (JANGAN diubah)
```

---

## 4. Aturan Dasar (Ringkasan Cepat)

1. **Jangan mengubah/menghapus file yang tidak diminta** oleh pengguna.
2. **Jangan pernah mengedit** folder `Extension/` (library pihak ketiga).
3. Gunakan **design tokens** yang sudah ada (`--primary`, `--secondary`, dst.) — jangan hardcode warna baru.
4. Pertahankan **konvensi penamaan & struktur** yang sudah berjalan.
5. **Lakukan verifikasi manual** (buka HTML di browser) setelah mengubah kode.
6. Catat perubahan pada `AI/Change-Log.md` bila mengubah fungsionalitas.
7. Jangan menambah komentar di kode kecuali diminta pengguna.

> Baca `RULES.md` untuk versi lengkap dan `AI/Coding-Rules.md` untuk konvensi teknis.
