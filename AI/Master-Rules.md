# Master-Rules.md — Aturan Induk Agen AI

Aturan induk yang **selalu berlaku di semua sesi** agen AI pada proyek
**LANDINGPAGEJAWA_SP (Lorong Nusantara — Litera Jatim)**. Ini adalah lapisan aturan
tertinggi sebelum `RULES.md` dan `AI/Coding-Rules.md`.

---

## 1. Identitas Diri Agen

Ketika bekerja di proyek ini, agen AI bertindak sebagai **kontributor teknis** pada
website "Lorong Nusantara — Litera Jatim". Agen harus:
- Menjaga **satu konteks pemahaman** yang utuh dengan membaca dokumen proyek berurutan.
- Bertindak **minimal & presisi**: mengubah sesedikit mungkin, sejelas mungkin.

## 2. Hierarki Aturan

```
1. Master-Rules.md          (file ini — prinsip tertinggi)
2. RULES.md                 (aturan mengikat perubahan)
3. WORKFLOW.md              (prosedur kerja)
4. AI/Coding-Rules.md       (konvensi teknis)
5. Docs/*                   (dokumen acuan)
```

Jika ada konflik, **aturan dengan posisi lebih tinggi menang**. Aturan khusus pengguna
dalam satu sesi dapat menimpa aturan umum selama tidak melanggar batasan mutlak
(`RULES.md` §2).

## 3. Prinsip Kunci

1. **Jangan merusak yang berjalan.** Setiap perubahan harus mempertahankan fungsionalitas.
2. **Jangan menyentuh yang tidak diminta.** Khususnya `Extension/` dan PDF artikel.
3. **Jaga konsistensi.** Ikuti pola kode, token desain, dan penamaan yang ada.
4. **Verifikasi sebelum selesai.** Tanpa verifikasi manual, tugas belum selesai.
5. **Catat perubahan.** Setiap perubahan fungsional dicatat di `AI/Change-Log.md`.
6. **Tanya bila ragu.** Jangan menebak untuk hal yang berisiko.

## 4. Larangan Mutlak

| # | Larangan |
|---|----------|
| 1 | Mengedit/menghapus isi `Extension/` |
| 2 | Menghapus/merename aset yang direferensikan kode tanpa update referensi |
| 3 | Menambah dependensi/framework baru tanpa izin pengguna |
| 4 | Menambahkan komentar kode (kecuali diminta) |
| 5 | Mengubah data artikel tanpa sinkronisasi di semua sumber data |
| 6 | Commit/push tanpa instruksi eksplisit |
| 7 | Menulis ulang file besar bila cukup edit kecil |

## 5. Keputusan Cepat (Decision Tree)

```
Apakah tugas menyentuh Extension/?          ──YA──▶ STOP, tanyakan pengguna
Apakah tugas menambah/menghapus artikel?    ──YA──▶ wajib update semua sumber data
Apakah tugas mengubah tampilan?             ──YA──▶ gunakan design tokens; uji 2 tema
Apakah tugas menambah fungsi baru?          ──YA──▶ ikuti pola sub-halaman yang ada
Apakah ada ambiguitas scope?                ──YA──▶ tanyakan sebelum bekerja
```

## 6. Standar Output Agen

Setelah menyelesaikan tugas, agen wajib memberikan laporan singkat:
1. **Ringkasan perubahan** (file yang disentuh).
2. **Cara verifikasi** (apa yang dicek di browser).
3. **Catatan risiko/isu** bila ada.
4. **Referensi Change-Log** (jika perubahan fungsional).

## 7. Siklus Hidup Dokumen

- Dokumen ini dan `RULES.md` **tidak boleh dihapus** tanpa persetujuan.
- Jika proyek berevolusi (mis. ada backend), dokumen harus diperbarui dengan perubahan
  yang juga dicatat di `AI/Change-Log.md`.
