# Checklist.md — Checklist Sebelum/Sesudah Bekerja

Checklist agen AI untuk proyek **LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim)**.

---

## A. SEBELUM BEKERJA (Wajib)

### Baca Dokumen
- [ ] `AGENTS.md` sudah dibaca
- [ ] `CONTEXT.md` sudah dibaca
- [ ] `RULES.md` sudah dibaca
- [ ] `WORKFLOW.md` sudah dibaca
- [ ] `Docs/Architecture.md`, `Docs/ERD.md`, `Docs/UIUX.md` sudah dibaca
- [ ] `Docs/Audit.md` sudah dibaca bila berkaitan dengan perubahan/perbaikan kode
- [ ] `AI/Coding-Rules.md`, `AI/Master-Rules.md` sudah dibaca
- [ ] File target sudah dibaca sebelum mengedit

### Pahami Tugas
- [ ] Tugas sudah spesifik & tidak ambigu (bila tidak → tanyakan)
- [ ] Scope file yang boleh diubah jelas
- [ ] Dampak perubahan ke file lain sudah dipetakan
- [ ] Batasan mutlak (`Extension/`, PDF artikel) sudah diingat

## B. SAAT BEKERJA

- [ ] Edit minimal (tidak menulis ulang file tanpa perlu)
- [ ] Menggunakan design tokens, bukan warna hex baru
- [ ] Pola penamaan mengikuti `AI/Coding-Rules.md`
- [ ] Tidak menambah komentar kode (kecuali diminta)
- [ ] Tidak menyentuh `Extension/` dan `Assets/Artikel Web/*.pdf`
- [ ] Data artikel disinkronkan (accordion index + sub-halaman)
- [ ] Dark mode & responsive tetap terjaga

## C. SESUDAH BEKERJA — VERIFIKASI MANUAL

### Halaman Utama
- [ ] Popup sambutan muncul & tertutup
- [ ] Tema terang/gelap berfungsi & tersimpan
- [ ] Accordion Periodisasi & Resepsi berfungsi (satu panel aktif)
- [ ] Tautan "Telusuri Lebih Lanjut" mengarah benar
- [ ] Cover page (dosen & anggota) tampil

### Sub-halaman
- [ ] Sidebar & submenu terbuka sesuai kategori
- [ ] PDF tampil di viewer
- [ ] Pagination prev/dots/next berfungsi
- [ ] Search menemukan artikel / alert bila tidak ada
- [ ] Deep-link `?category=&id=` membuka artikel yang benar

### Lintas Halaman
- [ ] Light & dark mode di semua halaman yang disentuh
- [ ] Desktop, tablet, mobile tidak ada layout rusak
- [ ] Tidak ada regresi fitur yang sebelumnya berfungsi

## D. PENUTUP

- [ ] `AI/Change-Log.md` diperbarui untuk perubahan fungsional
- [ ] Dokumentasi terkait diperbarui bila perlu
- [ ] Laporan akhir dikirim (ringkasan, verifikasi, risiko)
- [ ] Tidak ada commit/push tanpa instruksi pengguna

---

## Ringkasan Satu Baris

> **"Sudah baca semua dokumen? Sudah paham scope? Sudah verifikasi di browser?
> Sudah catat di Change-Log?"** — jika jawabannya "belum", jangan nyatakan selesai.
