# Rules-Prompt.md — Aturan Menyusun Prompt untuk Agen AI

Panduan menyusun prompt yang efektif saat berinteraksi dengan agen AI yang bekerja di
proyek **LANDINGPAGEJAWA_SP (Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)**.

---

## 1. Tujuan

Prompt yang baik menjamin agen AI tetap **dalam satu konteks pemahaman yang utuh**:
mengetahui identitas proyek, aturan, struktur kode, dan cara memverifikasi, sebelum
menyentuh apa pun.

## 2. Struktur Prompt yang Disarankan

Gunakan template berikut saat memberikan tugas ke agen AI:

```
KONTEKS:
  Proyek: LANDINGPAGEJAWA_SP (Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)
  Dokumen yang wajib dibaca dulu: AGENTS.md, CONTEXT.md, RULES.md,
  WORKFLOW.md, lalu Docs/ dan AI/ yang relevan.

TUGAS:
  <jelaskan tugas dengan jelas dan spesifik>

SCOPE:
  <sebutkan file yang boleh diubah / ditambah>
  <sebutkan file yang TIDAK boleh diubah>

BATASAN:
  - Jangan mengubah Extension/ dan Assets/Artikel Web/ tanpa izin.
  - Ikuti design tokens dan konvensi yang ada.
  - Tanpa komentar baru di kode kecuali diminta.

VERIFIKASI:
  - Wajib verifikasi manual (buka di browser, uji tema & responsif).
  - Perbarui AI/Change-Log.md jika mengubah fungsionalitas.

CATATAN LAIN:
  <informasi tambahan bila perlu>
```

## 3. Aturan Penulisan Tugas

1. **Spesifik** — sebut file, fungsi, atau variabel. Contoh: "ubah warna `--accent`
   pada `style.css` di blok `:root`" lebih baik daripada "ubah warnanya".
2. **Satu tugas per permintaan** bila memungkinkan; jika multi-langkah, minta rencana dulu.
3. **Nyatakan batasan eksplisit** — terutama `Extension/` dan aset.
4. **Nyatakan definisi selesai** — kapan pekerjaan dianggap selesai (mis. "setelah
   verifikasi manual lolos").
5. **Bahasa** — gunakan bahasa Indonesia atau Inggris secara konsisten (proyek memakai
   Bahasa Indonesia).

## 4. Aturan untuk Agen AI saat Menerima Prompt

1. **Jangan berasumsi** — jika ambigu, tanyakan.
2. **Baca sebelum mengedit** — selalu baca file target terlebih dahulu.
3. **Edit minimal** — tidak menulis ulang file yang tidak perlu.
4. **Jangan memperbaiki bug yang tidak diminta** — catat saja bila ditemukan.
5. **Kembalikan ringkasan** — laporan singkat: apa yang diubah, bagaimana diverifikasi,
   dan catatan penting.

## 5. Contoh Prompt Baik (Referensi)

**Kurang baik:**
> "Tambahin artikel baru dong."

**Baik:**
> "Tambah artikel baru kategori Prosa (metode Resepsi). PDF-nya sudah saya taruh di
> `Assets/Artikel Web/ResepsiProsa/prosa3.pdf`. Judul: 'Dinamika Sosial dalam Prosa
> Jawa Timur: Telaah Resepsi'. Baca dulu `AGENTS.md`-`CONTEXT.md`-`RULES.md`, lalu
> daftarkan artikel di `resepsi.js` dan `script.js` (accordion index) agar sinkron.
> Jangan ubah file lain. Verifikasi di browser. Catat di `AI/Change-Log.md`."

## 6. Anti-Pola (Hindari)

- Prompt tanpa konteks proyek (agen tidak tahu aturan).
- Instruksi "perbaiki semua" yang ambigu.
- Menyuruh mengubah `Extension/` tanpa alasan kuat.
- Meminta warna/desain baru tanpa menyebut token yang boleh dipakai.
