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

## 2026-08-16 — Eksekusi Audit Menyeluruh (perbaikan kode + penyesuaian dokumentasi)

**Jenis:** fix + docs + chore

**File yang disentuh:**
- `script.js` (hapus blok upload avatar; `linkHref` default dihapus; `<image>`→`<img>`; sinkron judul Drama/Prosa/Puisi; tukar grup `resepsiData`)
- `Periodisasi/periodisasi.js` (hapus `navResepsi` mati; null-guard `contentText` di `showSpecialPage`)
- `Resepsi/resepsi.js` (hapus `navPeriodisasi` mati; `allData` hanya `prosa`/`puisi`; null-guard `contentText`)
- `index.html`, `Periodisasi/periodisasi.html`, `Resepsi/resepsi.html` (lang id, meta description, backslash→slash, aria/title/placeholder, snippet anti-FOUC)
- `style.css`, `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css` (gabung `transform` cursor; hapus `.pricing`/`.panel.dark-mode`; tampilkan search ≤480px)
- `README.md`, `.gitignore` (file baru)
- `Docs/Audit.md` (file baru, laporan audit)
- `CONTEXT.md`, `Docs/Testing.md`, `Docs/ERD.md`, `Docs/SRS.md`, `Docs/UIUX.md`, `Docs/Content-Structure.md`, `AGENTS.md`, `AI/Checklist.md` (penyesuaian dokumentasi)

**Detail:**
- Memperbaiki semua temuan audit: bug pencarian Resepsi (`ReferenceError`), error `showSpecialPage`, crash upload avatar, data kategori Resepsi tertukar, judul artikel tidak sinkron/terpotong, path backslash, atribut HTML, `transform` CSS ganda, *dead code* CSS, search tersembunyi ≤480px, dan penambahan meta/aria/anti-FOUC.
- Menciptakan laporan audit `Docs/Audit.md` serta `README.md` dan `.gitignore`.

**Verifikasi:**
- `node --check` untuk `script.js`, `Periodisasi/periodisasi.js`, `Resepsi/resepsi.js` lulus.
- Grep memastikan sisa referensi `dramaData|komunitasData` (di `resepsi.js`), `contentText`, `\.pricing`, `panel\.dark-mode`, `Artikel/detail.html` hilang dari berkas yang diperbaiki.
- Uji manual menyusul: klik brand, pencarian, tema+FOUC, resolusi ≤480px.

**Catatan/risiko:**
- `LICENSE` belum dibuat — menunggu keputusan jenis lisensi pemilik proyek (dicatat di `Docs/Audit.md` §G).
- `periodisasi.css`/`resepsi.css` sengaja dibiarkan terpisah (beda hanya whitespace).
