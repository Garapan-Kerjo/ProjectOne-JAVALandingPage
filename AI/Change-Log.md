# Change-Log.md — Format Pencatatan Perubahan

Format baku untuk mencatat perubahan pada proyek **LANDINGPAGEJAWA_SP
(Lorong Nusantara — Litera Jatim)**. Setiap perubahan **fungsional** wajib dicatat.

---

## Format Entri

Setiap entri memakai blok berikut (diletakkan **paling atas** file, di atas entri lama):

```markdown
## [TANGGAL] — Ringkasan Singkat

**Jenis:** <feat | fix | refactor | style | docs | data | chore>

**File yang disentuh:**
- `path/file` (alasan singkat)

**Detail:**
- <apa yang diubah / ditambah / dihapus>

**Verifikasi:**
- <cara memverifikasi; mis. "dibuka di Chrome, tema gelap, lebar 768px">

**Catatan/risiko:**
- <isu yang tersisa, atau hal yang perlu diperhatikan>
```

## Contoh Entri

```markdown
## 2026-08-16 — Tambah artikel Prosa (Resepsi)

**Jenis:** data

**File yang disentuh:**
- `Assets/Artikel Web/ResepsiProsa/prosa3.pdf` (file baru)
- `Resepsi/resepsi.js` (tambah entri `prosaData`)
- `script.js` (tambah judul pada `resepsiData`)

**Detail:**
- Menambahkan artikel "Dinamika Sosial dalam Prosa Jawa Timur: Telaah Resepsi"
  sebagai `prosaData` id 3, dan judulnya di accordion index agar sinkron.

**Verifikasi:**
- Buka `resepsi.html?category=prosa&id=3` → PDF tampil; accordion index menampilkan
  judul; search menemukan artikel.

**Catatan/risiko:**
- Tidak ada.
```

## Aturan

1. **Wajib** untuk perubahan yang mengubah fungsionalitas, tampilan, atau data.
2. Perubahan `docs` (hanya dokumen) boleh dicatat sebagai `docs`.
3. Entri terbaru di atas, entri lama di bawah.
4. Gunakan tanggal sesuai hari kerja (format `YYYY-MM-DD`).
5. Jangan hapus riwayat entri lama tanpa izin pengguna.

## Riwayat Perubahan

_Entri-entri di bawah ini diisi setiap kali terjadi perubahan. Dimulai kosong._
