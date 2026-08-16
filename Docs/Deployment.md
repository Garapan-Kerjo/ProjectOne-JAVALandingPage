# Deployment.md — Cara Menjalankan & Men-deploy

Panduan menjalankan dan men-deploy website **Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur**.

---

## 1. Cara Menjalankan Lokal

### Opsi A — Server HTTP Python
```bash
# di dalam folder landingpageJAWA_SP
python -m http.server 8080
# buka http://localhost:8080
```

### Opsi B — Node (npx serve)
```bash
npx serve
# atau
npx serve .
```

### Opsi C — Ekstensi VS Code "Live Server"
1. Klik kanan `index.html` → "Open with Live Server".
2. Server memakai port acak (mis. `5500`); buka `/index.html`.

> ⚠️ **Jangan mengandalkan `file://`.** Sub-halaman memakai ES Modules dan PDF.js
> worker sehingga akan gagal/berperilaku aneh jika dibuka langsung dari File Explorer.

## 2. Struktur URL Lokal

```
http://localhost:8080/
http://localhost:8080/index.html
http://localhost:8080/Periodisasi/periodisasi.html
http://localhost:8080/Resepsi/resepsi.html
```

Deep-link contoh:
```
http://localhost:8080/Periodisasi/periodisasi.html?category=drama&id=1
http://localhost:8080/Resepsi/resepsi.html?category=puisi&id=2
```

## 3. Build / Persiapan Produksi

Proyek **tidak butuh build** (file siap saji). Langkah opsional:

1. Hapus komentar debugging & pastikan tidak ada `console.log` (jika ada).
2. Pastikan semua referensi aset relatif benar.
3. Opsional: minify `*.css` / `*.js`, namun **hati-hati** karena ES Module &
   worker PDF.js sensitif terhadap perubahan struktur.
4. Jangan ikutkan folder `.git/` saat upload.

## 4. Opsi Hosting Statis

| Platform | Catatan |
|----------|---------|
| **GitHub Pages** | Gratis; push `main` ke repo GitHub → buka *Settings → Pages → Deploy from branch*. Path root sesuai lokasi file (repo root). |
| **Netlify / Vercel** | Drag-and-drop folder atau hubungkan git; "Build command: (kosong)", "Publish directory: ." |
| **Cloudflare Pages** | Hubungkan repo, build command kosong, output `.` |
| **nginx / Apache** | Salin isi repo ke `DocumentRoot`; buat 404 → `index.html` jika perlu |

> Jika halaman dipakai di **sub-path** (mis. `username.github.io/repo/`), semua tautan
> relatif sudah otomatis menyesuaikan karena memakai path relatif (`../`, `Assets/`, dst.)
> — verifikasi manual setelah deploy.

## 5. Checklist Sebelum Deploy

- [ ] Buka seluruh halaman lewat server lokal dan jalankan `Docs/Testing.md` §2.
- [ ] Pastikan `Extension/` ikut ter-upload (wajib untuk viewer PDF).
- [ ] Pastikan `Assets/Artikel Web/**` ikut ter-upload (wajib untuk artikel).
- [ ] Uji deep-link dan search.
- [ ] Uji dark mode & responsive di versi terdeploy.

## 6. Troubleshooting Umum

| Gejala | Penyebab | Solusi |
|--------|----------|--------|
| PDF tidak tampil | Dibuka via `file://` atau path relatif salah | Gunakan server HTTP; cek path `../Assets/...` |
| Sub-halaman blank | ES Module gagal via `file://` / CORS | Buka lewat server; cek Console |
| Ikon hilang | Remixicon CDN diblokir/offline | Host ikon lokal atau cek koneksi |
| PDF.js error worker | Versi file rusak | Jangan edit `Extension/`; periksa integritas folder |
| Tema tidak tersimpan | `localStorage` diblokir (mode privat) | Diharapkan; fallback `prefers-color-scheme` tetap jalan |

## 7. Rollback

Karena memakai Git, rollback mudah:

```bash
git log --oneline
git checkout <commit-hash> -- path/file
# atau kembalikan seluruh repo:
git checkout <commit-hash>
```

> Jangan lakukan rollback/commit tanpa instruksi pengguna.
