# AI-Workflow.md — Workflow Khusus Agen AI

Versi detail (langkah demi langkah) dari `WORKFLOW.md` untuk agen AI yang bekerja di
proyek **LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim)**.

---

## Fase 0 — Persiapan (tanpa mengubah apa pun)

1. Baca `AGENTS.md` → `CONTEXT.md` → `RULES.md` → `WORKFLOW.md`.
2. Baca `Docs/` yang relevan: minimal `Architecture.md`, `ERD.md`, `UIUX.md`,
   `Content-Structure.md`; tambahan sesuai tugas.
3. Baca `AI/Master-Rules.md`, `AI/Coding-Rules.md`, `AI/Checklist.md`.
4. Identifikasi **semua** file yang akan disentuh beserta file yang merujuknya.

## Fase 1 — Pemahaman Tugas

1. Tuliskan ulang tugas dengan kalimat sendiri.
2. Tandai hal yang ambigu → **tanyakan ke pengguna** sebelum lanjut.
3. Tentukan dampak perubahan:
   - Data artikel → juga `script.js` (accordion).
   - Tampilan → juga token & dark mode.
   - Fitur baru → pola fungsi mana yang ditiru.

## Fase 2 — Rencana

1. Buat daftar file & langkah perubahan (bisa memakai todo list).
2. Tentukan cara verifikasi yang akan dipakai.
3. Konfirmasi scope ke pengguna bila perlu.

## Fase 3 — Implementasi

1. **Baca file target** sebelum mengedit.
2. Terapkan perubahan dengan **edit minimal** (hindari rewrite besar).
3. Ikuti `AI/Coding-Rules.md`.
4. Jangan lupa sinkronisasi data (accordion ↔ sub-halaman) bila menambah artikel.

## Fase 4 — Verifikasi (wajib)

Ikuti `Docs/Testing.md` §2. Ringkas:

1. **Index:** popup, tema, nav anchor, accordion, tautan, cover page.
2. **Sub-halaman:** sidebar, submenu, pagination, search, PDF viewer, deep-link.
3. **Tema:** light & dark di semua halaman yang disentuh.
4. **Responsif:** desktop / tablet / mobile.
5. **Keyboard:** panel accordion via Enter/Space (jika relevan).

Jika ada regresi → perbaiki sebelum menyerahkan.

## Fase 5 — Pelaporan & Catatan

1. Perbarui dokumentasi jika struktur/fungsi berubah.
2. Catat di `AI/Change-Log.md` (ikuti format di file tersebut).
3. Kirim laporan akhir:
   - Ringkasan perubahan (file & baris penting).
   - Cara verifikasi yang dilakukan.
   - Risiko/bug baru yang ditemukan.
   - Saran tindak lanjut (opsional).

## Aturan Anti-Gagal

| Situasi | Tindakan |
|---------|----------|
| Perlu mengubah `Extension/` | STOP & tanya |
| Perlu warna baru | Pakai token yang ada; kalau terpaksa, tambah token di blok yang benar + semua stylesheet |
| Perlu tambah file JS baru | Pastikan dipanggil di HTML yang tepat; ikuti pola module sub-halaman |
| Tidak bisa verifikasi (tanpa browser) | Sampaikan jujur; jangan klaim lolos |
