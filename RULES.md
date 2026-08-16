# RULES.md — Aturan Main yang Mengikat

Dokumen ini adalah **aturan mengikat** untuk semua perubahan yang dilakukan di proyek
**LANDINGPAGEJAWA_SP (Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)** oleh manusia maupun agen AI.

> Baca bersama `CONTEXT.md` dan `AI/Coding-Rules.md` agar perubahan tetap satu konteks.

---

## 1. Prinsip Utama

1. **Jangan merusak.** Setiap perubahan harus menjaga fungsi yang sudah berjalan.
2. **Jangan mengubah tanpa diminta.** Agen hanya boleh mengubah/menambah sesuai
   permintaan pengguna. Tidak ada "improvisasi" di luar scope.
3. **Tambah, bukan tulis ulang.** Jika tidak perlu, jangan menulis ulang file yang sudah
   ada. Prioritaskan edit minimal.
4. **Konsisten.** Ikuti pola, penamaan, dan gaya yang sudah ada di proyek.

## 2. Batasan Mutlak (JANGAN DIEDIT)

| Batasan | Alasan |
|---------|--------|
| `Extension/` (seluruh isi) | Library pihak ketiga PDF.js — perbedaan versi berisiko merusak viewer |
| `Assets/Artikel Web/**/*.pdf` | Konten artikel akademik, bukan kode |
| Isi data artikel yang sudah terisi | Judul & pemetaan PDF harus akurat secara akademik |
| Nama aset gambar yang direferensikan | Mengubah nama = memutus referensi path |

## 3. Aturan Kode

1. Gunakan **design tokens CSS** yang sudah ada. Jangan hardcode warna hex baru di luar
   file token (`:root` / `[data-theme="dark"]` di masing-masing stylesheet).
2. Pertahankan **konvensi penamaan** (lihat `AI/Coding-Rules.md`).
3. **Jangan menambah komentar** kecuali diminta pengguna. Komentar yang sudah ada
   (mis. penanda section) biarkan apa adanya.
4. Semua **path aset** harus relatif dari posisi file:
   - Root (`index.html`, `style.css`, `script.js`) → `Assets/...`
   - Sub-halaman (`Periodisasi/*`, `Resepsi/*`) → `../Assets/...`, `../Extension/...`
5. Jangan menambah **dependensi/framework baru** tanpa persetujuan. Proyek ini vanilla.
6. Setiap halaman wajib tetap mendukung **dark mode** dan **responsive**.

## 4. Aturan Data & Konten

1. Saat menambah artikel, tambahkan file PDF ke folder yang benar di
   `Assets/Artikel Web/<Metode><Kategori>/` lalu daftarkan di array JS terkait.
2. `id` artikel dimulai dari `1` dan unik per kategori.
3. Update **semua sumber data yang relevan** (mis. accordion index `script.js` DAN
   sub-halaman `periodisasi.js`/`resepsi.js`) agar daftar tetap sinkron.
4. Pemetaan `category` (query string) harus sesuai `categoryMap` di JS:
   - Periodisasi: `drama`, `komunitas`, `prosa`, `puisi`
   - Resepsi: `puisi`, `prosa`

## 5. Aturan Aksesibilitas & UI

1. Tombol/elemen interaktif wajib memiliki `aria-label`/`aria-expanded` yang sesuai.
2. Jangan merusak perilaku keyboard pada accordion (`Enter`/`Space`).
3. Setiap elemen baru harus mengikuti sistem `clamp()`, media query, dan breakpoint
   yang sudah ditetapkan (`Docs/UIUX.md` §5).

## 6. Aturan Proses

1. Ikuti `WORKFLOW.md` (baca → rencana → implementasi → verifikasi).
2. **Verifikasi manual wajib** setelah mengubah kode: buka halaman di browser, cek
   tema terang/gelap, dan pada beberapa ukuran layar.
3. Catat perubahan fungsional pada `AI/Change-Log.md`.
4. Jangan commit/push kecuali diminta pengguna secara eksplisit.

## 7. Sanksi Perilaku

Pelanggaran yang berisiko tinggi (mengubah `Extension/`, menghapus aset yang
direferensikan, merusak dark mode/responsive) harus **dikembalikan ke kondisi semula**
dan dicatat di Change-Log sebagai perbaikan.
