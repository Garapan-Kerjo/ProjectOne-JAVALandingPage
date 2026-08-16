# Security.md — Pertimbangan Keamanan

Pertimbangan keamanan untuk website statis **Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur**.

> Proyek ini **tanpa backend** dan **tanpa data pengguna sensitif**, sehingga risiko
> keseluruhan rendah. Dokumen ini berfokus pada praktik aman untuk website statis
> vanilla JS.

---

## 1. Model Ancaman (Ringkas)

| Ancaman | Kemungkinan | Dampak | Catatan |
|---------|-------------|--------|---------|
| XSS via `innerHTML` dengan data dari URL | Rendah | Sedang | Data berasal dari array lokal, bukan input pengguna; namun pola `innerHTML` dipakai secara luas |
| Manipulasi query string `?category` / `?id` | Rendah | Rendah | Hanya mengubah tampilan; fallback ke kategori default |
| Phishing / token / kredensial | Tidak ada | — | Tidak ada login, form, atau penyimpanan kredensial |
| Path traversal ke PDF | Rendah | Rendah | Path PDF hardcoded di JS, bukan dari input |
| Referrer/leak aset | Rendah | Rendah | Tidak ada data pribadi pada aset |

## 2. Kontrol yang Sudah Ada

1. **Fallback parameter URL** — `categoryMap[selectedCategory]` tidak ditemukan →
   pakai default; mencegah crash dari input tak terduga.
2. **`encodeURIComponent`** pada URL PDF di `loadPDF()` — mencegah karakter khusus
   merusak query string viewer.
3. **Tanpa input pengguna ke server** — tidak ada endpoint yang bisa dieksploitasi.
4. **`overflow-x:hidden` + `box-sizing:border-box`** — kontrol layout, bukan keamanan.

## 3. Risiko yang Perlu Diwaspadai Saat Mengubah

### 3.1 Penggunaan `innerHTML`
Seluruh rendering dinamis memakai `innerHTML` (accordion, submenu, anggota). Saat ini
aman karena isi hardcoded. **Jika suatu saat data berasal dari input pengguna**
(mis. field pencarian dirender ulang, upload nama file), wajib sanitasi:

```js
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
```

Gunakan selalu untuk teks dari luar array internal.

### 3.2 URL PDF
- Jangan pernah membangun path PDF langsung dari input pencarian/query tanpa validasi.
- Pastikan `new URL(url, window.location.href)` tetap di domain/path proyek sendiri
  (jangan izinkan URL absolut sewenang-wenang).

### 3.3 Kode Render PDF (PDF.js)
- PDF.js versi lokal yang sudah dipindai; **jangan** mengganti dengan versi CDN yang
  tidak diverifikasi tanpa persetujuan.
- Jangan mengubah file di `Extension/`.

### 3.4 Dependensi CDN
- Remixicon & Google Fonts dari CDN publik. Jika proyek akan dipakai di jaringan
  terisolasi, unduh dan host lokal. Pastikan `integrity`/HTTPS bila menambah CDN baru.

## 4. Praktik Wajib saat Ber-Development

1. **Jangan commit kredensial/secrets** — file ini tidak memerlukan token apa pun.
2. **Jangan menambah `console.log` sisa debugging** ke produksi.
3. Jangan menonaktifkan kontrol keamanan browser (mis. `sandbox` yang seharusnya ada).
4. Hindari mengizinkan `file://` dependency dari domain asing.

## 5. Header/Security Header (Jika Deploy di Web Server)

Untuk hosting statis (nginx/apache/Netlify/GitHub Pages), disarankan:

| Header | Nilai yang disarankan |
|--------|------------------------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` (viewer iframe masih boleh bekerja di halaman sendiri) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Content-Security-Policy` | Sesuaikan untuk izin `script-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com;` dst. — jangan asal pasang tanpa uji karena bisa memblokir PDF.js |
| `Permissions-Policy` | Batasi kamera/mikrofon/geolokasi (tidak dipakai proyek ini) |

> ⚠️ Jangan pasang CSP ketat tanpa pengujian menyeluruh — PDF.js memakai worker/module
> yang membutuhkan izin khusus.

## 6. Rencana Pemantauan

- Proyek tanpa backend → tidak ada log server yang perlu dipantau.
- Lakukan audit cepat setiap kali ada perubahan kode yang memproses string/path.
- Jika proyek di-deploy publik, cek rutin di `Docs/Testing.md` §6 untuk regresi.
