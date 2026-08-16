# Master-Prompt.md — Prompt Induk untuk Memulai Agen AI

Prompt siap-pakai untuk memulai sesi agen AI pada proyek
**LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim)**. Salin isi di bawah ke agen
AI saat memulai pekerjaan baru agar agen langsung mendapat **satu konteks yang utuh**.

---

## Prompt Induk

```
KAMU BEKERJA DI PROYEK LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim).

LANGKAH WAJIB SEBELUM BEKERJA:
1. Baca berurutan: AGENTS.md → CONTEXT.md → RULES.md → WORKFLOW.md.
2. Baca folder Docs/ yang relevan dengan tugas (wajib: Architecture.md, ERD.md,
   UIUX.md, Content-Structure.md; baca yang lain sesuai kebutuhan).
3. Baca folder AI/: Master-Rules.md, Coding-Rules.md, AI-Workflow.md, Checklist.md.
4. Baca isi file yang akan kamu ubah SEBELUM mengedit.

KONTEKS SINGKAT PROYEK:
- Website statis vanilla HTML/CSS/JS, tanpa framework & tanpa backend.
- Halaman: index.html (landing), Periodisasi/periodisasi.html, Resepsi/resepsi.html.
- Data artikel berupa array JS; judul artikel sinkron di script.js (accordion)
  DAN di periodisasi.js/resepsi.js (sub-halaman).
- PDF ditampilkan lewat Extension/pdfjs-6.1.200-dist/web/viewer.html?file=...
- Tema terang/gelap memakai design tokens CSS; toggle disimpan di localStorage.

BATASAN MUTLAK:
- JANGAN mengubah Extension/ (library PDF.js) dan Assets/Artikel Web/*.pdf.
- JANGAN menghapus/merename aset yang direferensikan tanpa update referensi.
- JANGAN menambah framework/dependensi baru tanpa persetujuan.
- JANGAN menambah komentar kode kecuali diminta.
- Ganti bahasa UI/desain hanya dengan izin pengguna.

SCOPE TUGAS:
<TULISKAN DI SINI: file yang boleh diubah, file yang dilarang diubah>

TUGAS:
<TULISKAN DI SINI: apa yang harus dilakukan secara spesifik>

DEFINISI SELESAI:
- Perubahan selesai & verifikasi manual lolos (buka halaman di server HTTP,
  uji tema terang/gelap, uji desktop/tablet/mobile, cek tautan & deep-link).
- Perubahan fungsional dicatat di AI/Change-Log.md.
- Laporan akhir: (1) ringkasan perubahan, (2) cara verifikasi, (3) risiko/catatan.

MULAI SEKARANG. Jangan lakukan apa pun selain membaca dokumen di atas terlebih
dahulu sampai selesai.
```

---

## Cara Pakai

1. Salin prompt induk di atas ke agen AI.
2. Isi bagian `SCOPE TUGAS` dan `TUGAS` sesuai kebutuhan (lihat `AI/Rules-Prompt.md`
   untuk contoh prompt yang baik).
3. Beri batasan tambahan bila perlu (mis. "jangan ubah footer").

## Versi Pendek (jika konteks terbatas)

```
Kerjakan tugas ini pada proyek LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim).
Baca minimal: AGENTS.md, CONTEXT.md, RULES.md, AI/Coding-Rules.md sebelum mengubah kode.
Jangan ubah Extension/ dan Assets/Artikel Web/. Ikuti design tokens & pola yang ada.
Verifikasi manual di browser (2 tema, beberapa ukuran layar). Catat di AI/Change-Log.md.
Tugas: <...>
```
