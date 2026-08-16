# WORKFLOW.md — Alur Kerja Standar

Alur kerja ini wajib diikuti oleh setiap agen AI maupun kontributor yang mengubah
proyek **LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim)**.

---

## Ringkasan Alur

```
[1. BACA] → [2. RENCANA] → [3. IMPLEMENTASI] → [4. VERIFIKASI] → [5. CATAT]
```

---

## 1. BACA (Sebelum Sentuh Apa Pun)

1. Baca berurutan: `AGENTS.md` → `CONTEXT.md` → `RULES.md` → `WORKFLOW.md`.
2. Baca bagian relevan di `Docs/` (minimal `Architecture.md`, `UIUX.md`, `ERD.md`,
   `Content-Structure.md`).
3. Baca `AI/Coding-Rules.md` dan `AI/AI-Workflow.md`.
4. Identifikasi file yang akan disentuh dan **baca isinya dulu** sebelum mengedit.

## 2. RENCANA

1. Tentukan **scope**: file apa saja yang akan diubah/ditambah.
2. Tentukan dampak: apakah ada file lain yang merujuk ke file tersebut?
   (contoh: tambah artikel → update `script.js` + `periodisasi.js`/`resepsi.js`).
3. Jika ada banyak kemungkinan pendekatan dan ambigu → tanyakan ke pengguna.

## 3. IMPLEMENTASI

1. Ubah dengan **edit minimal** dan ikuti `AI/Coding-Rules.md`.
2. Patuhi batasan mutlak di `RULES.md` §2.
3. Pertahankan dark mode, responsivitas, dan aksesibilitas.
4. Tidak perlu menambah komentar di kode (kecuali diminta).

## 4. VERIFIKASI (Wajib)

Verifikasi manual karena proyek ini tanpa test runner otomatis:

1. Buka `index.html` di browser → cek hero, accordion, popup, footer tim, copyright.
2. Buka `Periodisasi/periodisasi.html` dan `Resepsi/resepsi.html` → cek sidebar,
   navigasi kategori, pagination, search, dan render PDF.
3. Uji **dark mode** dan **light mode** di semua halaman.
4. Uji beberapa **ukuran layar** (desktop, tablet, mobile) — lihat breakpoint di
   `Docs/UIUX.md` §5.
5. Cek tautan antar halaman dan parameter URL (`?category=...&id=...`).
6. Jika ada yang rusak → perbaiki sebelum menyelesaikan pekerjaan.

## 5. CATAT

1. Perbarui dokumentasi terkait jika mengubah fungsionalitas atau struktur data
   (mis. `Docs/Content-Structure.md`, `Docs/ERD.md`).
2. Catat pada `AI/Change-Log.md` sesuai format yang ada.
3. Jangan commit/push kecuali diminta.

---

## Keputusan Cepat Saat Ragu

| Situasi | Tindakan |
|---------|----------|
| Perubahan menyentuh `Extension/` | STOP, tanyakan pengguna |
| Perubahan melibatkan desain/warna baru | Gunakan token yang ada; tanya jika memang perlu warna baru |
| Perubahan data artikel | Update semua sumber data agar sinkron |
| Tidak tahu cara verifikasi | Tanya pengguna; jangan menyerahkan pekerjaan tanpa verifikasi |
