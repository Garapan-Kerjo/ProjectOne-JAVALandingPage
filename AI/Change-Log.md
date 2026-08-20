# Change-Log.md — Format Pencatatan Perubahan

Format baku untuk mencatat perubahan pada proyek **LANDINGPAGEJAWA_SP
(Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur)**. Setiap perubahan **fungsional** wajib dicatat.

---

## Format Entri

Setiap entri memakai blok berikut (diletakkan **paling atas** file, di atas entri lama):

## 2026-08-20 — Perbaikan SEO Lanjutan (A-E)

**Jenis:** style + seo

**File yang disentuh:**
- `index.html` (meta description + og/twitter description diperpanjang, tambah meta keywords, hapus sameAs Instagram di WebSite schema)
- `Periodisasi/periodisasi.html` (hapus duplikasi Remixicon, meta description/keywords, H1 jadi "PERIODISASI SASTRA JAWA TIMUR")
- `Resepsi/resepsi.html` (hapus duplikasi Remixicon, meta description/keywords, H1 jadi "RESEPSI SASTRA JAWA TIMUR")

**Detail:**
- Hapus `<link rel="stylesheet">` Remixicon yang duplikat di kedua sub-halaman (kini hanya preload + `<noscript>` fallback).
- Meta description, og:description, twitter:description diperpanjang dengan keyword: periodisasi, resepsi, sastra Jawa Timur, Pramoedya Ananta Toer, arsip digital.
- Tambah `<meta name="keywords">` di ketiga halaman.
- Hapus `sameAs` Instagram dari WebSite schema publisher (mengurangi risiko schema invalid).
- H1 sub-halaman diperkuat: "PERIODISASI SASTRA JAWA TIMUR" & "RESEPSI SASTRA JAWA TIMUR".

**Verifikasi:**
- Grep: keywords ada di 3 HTML; duplikat Remixicon hilang; H1 baru terpasang.
- Buka halaman di browser untuk cek tampilan header/ikon tetap berfungsi.

**Catatan/risiko:**
- Google Search Console & submit sitemap masih menunggu aksi manual pengguna.

## 2026-08-20 — Optimasi SEO Lanjutan (8 item)

**Jenis:** feat + style

**File yang disentuh:**
- `index.html` (lazy loading gambar, preload Remixicon, nav internal linking, deskripsi keyword-rich, FAQ section, JSON-LD BreadcrumbList + FAQPage, social media links, heading h4→h3)
- `style.css` (selector h4→h3 di features card + media queries, CSS FAQ, social-links)
- `Periodisasi/periodisasi.html` (preload Remixicon CDN)
- `Resepsi/resepsi.html` (preload Remixicon CDN)

**Detail:**
- Tambah `loading="lazy"` pada gambar footer dan popup.
- Ganti Remixicon CSS ke `<link rel="preload" as="style">` + `<noscript>` fallback di ketiga HTML.
- Nav bar ditambah link ke `#arsip`, `#referensi`, `#faq` untuk internal linking lebih kuat.
- Deskripsi section Periodisasi, Resepsi, Arsip, Referensi diperkaya dengan keyword natural.
- Section FAQ ditambahkan dengan 6 Q&A menggunakan elemen `<details>`.
- JSON-LD `BreadcrumbList` dan `FAQPage` schema ditambahkan di `<head>`.
- Social media link Instagram ditambahkan di copyright footer (`@lorongsusastra`).
- Heading `<h4>` di features card diganti ke `<h3>` (h2 > h3 hierarchy) + semua selector CSS diupdate.
- Copyright baris diubah ke "Lorong Susastra. Universitas Airlangga."

**Verifikasi:**
- Validasi HTML: semua JSON-LD valid, FAQ section terlihat, nav berfungsi.
- CSS: selector h3 sudah benar di desktop (649, 387) dan media queries (1544, 1682).

**Catatan/risiko:**
- Versi terakhir dari Remixicon preload menggunakan pattern `onload="this.onload=null;this.rel='stylesheet'"` untuk menghindari render-blocking.

## 2026-08-19 — Ubah section Tim Penyusun menjadi daftar nama mahasiswa
- **Tujuan:** Mengganti card tunggal "Bahasa & Sastra Indonesia 2024" dengan avatar wayang menjadi empat baris: tiga nama mahasiswa (Aura Fauziyyah Rahmadania, Chesta Leilani, Zalfa Izzati Efendi) dalam card teks, diikuti keterangan "dan seluruh mahasiswa Mata Kuliah Sejarah Kesusastraan angkatan 2024" sebagai teks biasa. Menghapus dependency gambar profile (avatar) pada cover page.
- **File diubah:** 
  - `script.js` (mengubah `membersData` menjadi 3 nama; menghapus `<img class="avatar">` dari template card; menambahkan `memberNoteText` dan `<p class="member-note">` setelah daftar nama).
  - `style.css` (menghapus aturan `.avatar`, token `--avatar-bg`, serta override `.avatar` pada media query ≤420px; menambahkan aturan `.member-note` berwarna `var(--text-secondary)`).
  - `AI/Change-Log.md` (entri ini).
- **Verifikasi:**
  - Manual: Buka halaman utama (`index.html`), scroll ke footer cover page, pastikan section "TIM PENYUSUN" menampilkan tiga nama dalam card (tanpa gambar/icon) dan satu baris teks biasa di bawahnya. Cek theme terang/gelap dan lebar layar desktop/tablet/mobile; pastikan section "Dosen Pengampu", logo Airlangga, dan section lain tidak berubah.

## 2026-08-17 — Penambahan section Daftar Puisi
- **Tujuan:** Memisahkan data puisi dari section Arsip, serta membuat section/accordion baru di bawah Referensi khusus untuk Daftar Puisi (termasuk Puisi Mahasiswi & Puisi Mahasiswa).
- **File diubah:** 
  - `index.html` (menambahkan `<section id="puisi">` beserta elemen `div#accordionPuisi` tepat di bawah section Referensi).
  - `Assets/data/korpus-data.mjs` (menambahkan export data `daftarPuisiMahasiswa` yang berisi 2 data placeholder).
  - `script.js` (mengimpor data baru, mengeluarkan card Puisi Mahasiswi dari `arsipPanels`, dan merender card gabungan untuk `accordionPuisi`).
- **Verifikasi:**
  - Manual: Buka halaman utama (`index.html`), scroll ke bagian bawah setelah Referensi, lalu pastikan section "DAFTAR PUISI" muncul dengan dua dropdown: "Daftar Puisi Mahasiswi" dan "Daftar Puisi Mahasiswa".

## 2026-08-17 — Perbaikan posisi elemen pada accordion Arsip & Referensi
- **Tujuan:** Memastikan nomor dan panah pada dropdown list (accordion) Arsip & Referensi di `index.html` tidak bergeser atau pindah ke kiri saat diklik (dalam keadaan aktif).
- **File diubah:** 
  - `style.css` (menambah selector `.accordion-card--list .panel.active .panel-number` pada aturan `panel-number` untuk spesifisitas yang lebih tinggi).
- **Verifikasi:**
  - Manual: Buka halaman index, pastikan saat card di section Arsip atau Referensi diklik, posisi jumlah konten/teks nomor dan panah dropdown tetap ada di sebelah kanan, sejajar tanpa rusak oleh aturan CSS panel yang aktif.

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

## 2026-08-16 — Header kartu list: angka & panah sticky di kanan saat dropdown

**Jenis:** style

**File yang disentuh:**
- `style.css` (hapus aturan `.panel.active .panel-number` — angka tidak lagi memudar ke
  `opacity:0.3`; panah tetap `transform: rotate(180deg)` saat aktif dengan posisi kanan
  tidak berubah karena `transform-origin` di tengah elemen)
- `Docs/UIUX.md`, `Docs/SRS.md`, `Docs/Audit.md`, `AI/Change-Log.md` (sinkronisasi)

**Detail:**
- Saat panel dibuka, header (`div.panel-header`) tetap menempel di atas; angka kuantitas
  (`opacity:0.45`, tidak berubah) dan panah dropdown **sticky di kanan bersama** — tidak
  bergeser ke kiri. Panah berotasi 180° di tempatnya sebagai penanda terbuka; hanya area
  konten yang muncul di bawah.

**Verifikasi:**
- Brace CSS `style.css` 276/276.
- Manual: buka index via HTTP server, klik kartu Arsip/Referensi — angka & panah tetap di
  kanan, panah berotasi 180°, hanya konten yang keluar.

**Catatan/risiko:**
- Verifikasi visual final di browser masih menunggu pengguna.

## 2026-08-16 — Perbaikan kartu Arsip & Referensi, daftar pustaka runtut, kartu Puisi Mahasiswi

**Jenis:** fix + style + feat + data

**File yang disentuh:**
- `index.html` (hapus link nav Arsip/Referensi — navbar kembali: Beranda/Menu/Periodisasi/Resepsi)
- `script.js` (header panel jadi `div.panel-header` flex: judul kiri, angka kanan faded,
  ikon panah `ri-arrow-down-s-line`; `buildPuisiItemHTML`; kartu "Daftar Puisi Mahasiswi";
  referensi `<ul>` tanpa nomor otomatis)
- `style.css` (ulang blok `.accordion-card--list`: `.panel-header` absolute di atas,
  `.panel-number` `margin-left:auto` + `opacity:0.45`, `.panel-arrow` rotasi 180° saat
  aktif; `.referensi-list` tanpa bullet + hanging-indent)
- `Assets/data/korpus-data.mjs` (nomor `daftarPustaka` diurutkan runtut 1–145; tambah
  `daftarPuisiMahasiswi` dari sheet Excel "Daftar Puisi Mahasiswi")
- `CONTEXT.md`, `Docs/Content-Structure.md`, `Docs/ERD.md`, `Docs/SRS.md`, `Docs/UIUX.md`,
  `Docs/Testing.md`, `Docs/Audit.md` (sinkronisasi)

**Detail:**
- Perbaiki huruf yang saling tumpuk pada kartu: angka & judul sebelumnya berada di titik
  absolut yang sama saat panel aktif; judul kini di header flex di kiri, angka kuantitas di
  kanan (faded), panah dropdown di kanan (berotasi saat terbuka).
- Referensi: hapus nomor otomatis elemen list; angka dalam teks diurutkan runtut 1–145.
- Konten baru: Daftar Puisi Mahasiswi (Nastyaksara 2021, Selasar Lazuardi 2026) + link
  Instagram, sebagai kartu kelima di section Arsip.
- Navbar top tidak lagi memuat Arsip/Referensi.

**Verifikasi:**
- `node --check` lolos (script.js sebagai `.mjs`, korpus-data.mjs).
- Data: `daftarPustaka` 145 entri berurutan 1–145; `daftarPuisiMahasiswi` 2 entri.
- Brace CSS `style.css` 277/277.
- Manual: HTTP server, index tema terang/gelap, lebar 1440/1024/768/576/480/375px — cek
  header kartu (jenis kiri, angka kanan faded, panah), daftar tidak tumpuk, referensi nomor
  tunggal runtut, kartu Puisi Mahasiswi, navbar tanpa Arsip/Referensi.

**Catatan/risiko:**
- Verifikasi visual final di browser masih menunggu pengguna.

## 2026-08-16 — Arsip Digital & Referensi dipindah dari sub-halaman ke index

**Jenis:** feat + refactor + docs + data

**File yang disentuh:**
- `index.html` (script jadi `type="module"`; nav tambah link Arsip/Referensi; section baru
  `#arsip` & `#referensi` dengan `#accordionArsip`/`#accordionReferensi`)
- `script.js` (import `korpusArsip`/`daftarPustaka`; `escapeHTML`, `buildArsipItemHTML`,
  `setupListAccordion`, render Arsip & Referensi)
- `style.css` (`.accordion-grid--full`, `.accordion-card--list`, `.list-content`,
  `.referensi-list`, override dark-mode)
- `Assets/data/korpus-data.mjs` (sumber data bersama — dibaca, tidak diubah isinya)
- `Periodisasi/periodisasi.html` & `Resepsi/resepsi.html` (hapus blok submenu Arsip/Referensi)
- `Periodisasi/periodisasi.js` & `Resepsi/resepsi.js` (hapus `arsipData`/`referensiData`,
  `buildSpecialSubmenu`, `openSubmenuOnly`, cabang `updateActiveNav`, listener `navArsip`/
  `navReferensi`; `specialPages` → hanya `mainpage`)
- `Periodisasi/periodisasi.css` & `Resepsi/resepsi.css` (hapus `#arsipSubmenu .sub-nav-label`)
- `CONTEXT.md`, `AGENTS.md`, `Docs/Content-Structure.md`, `Docs/ERD.md`, `Docs/SRS.md`,
  `Docs/UIUX.md`, `Docs/Testing.md`, `Docs/Audit.md` (sinkronisasi arsitektur baru)

**Detail:**
- Index kini menampilkan section **Arsip Digital** (4 kartu accordion per genre: Novel &
  Prosa, Drama, Puisi, Sastra Klasik & Tradisi) dan **Referensi** (satu kartu daftar
  pustaka `<ol>`); item ber-`url` jadi tautan tab baru, sisanya teks polos.
- Sub-halaman bersih: sidebar hanya berisi kategori artikel; Arsip/Referensi tidak lagi
  dirender di sana.
- Index beralih ke ES module sehingga ketiga halaman butuh server HTTP.

**Verifikasi:**
- `node --check` lolos: `script.js` (sebagai `.mjs`) + `periodisasi.js` + `resepsi.js`.
- Keseimbangan kurung CSS: `style.css` 280/280, sub-halaman 166/166.
- Manual: jalankan HTTP server, buka index (tema terang/gelap, lebar 1440/1024/768/576/480/
  375px) — cek accordion Arsip/Referensi terbuka, scroll konten, tautan tab baru, anchor nav.

**Catatan/risiko:**
- Verifikasi visual final di browser masih menunggu pengguna.
- CSS mati di `style.css` (`.member-nim`, `.avatar:hover`, `.avatar input[type="file"]`)
  telah dibersihkan setelah persetujuan pengguna.

## 2026-08-16 — Topnav rapi & auto-hide, anggota & favicon wayang, hero tanpa "Kelompok XX"

**Jenis:** style + fix + refactor

**File yang disentuh:**
- `Periodisasi/periodisasi.css` & `Resepsi/resepsi.css` (topnav `overflow-x:hidden` +
  `transition:transform`; blok `.app-shell.nav-hidden`; `.sidebar`/`.main-content`
  transition `top`/`margin-top`; `.search-bar` `display:none` di ≤768px; hapus aturan
  search mobile yang sudah mati di ≤480px/≤400px)
- `Periodisasi/periodisasi.js` & `Resepsi/resepsi.js` (listener scroll auto-hide navbar)
- `script.js` (`membersData` → 1 entri "Bahasa & Sastra Indonesia 2024", avatar
  `Assets/wayang_icon.png`, hapus baris NIM)
- `index.html` (favicon → wayang_icon; hero hapus "KELOMPOK XX")
- `Periodisasi/periodisasi.html` & `Resepsi/resepsi.html` (favicon → wayang_icon)
- `CONTEXT.md`, `Docs/ERD.md`, `Docs/SRS.md`, `Docs/UIUX.md`, `Docs/Testing.md`,
  `Docs/Audit.md`, `AGENTS.md` (sinkronisasi dokumentasi)

**Detail:**
- Topnav sub-halaman kini rapi di semua lebar; scroll ke bawah (>120px) menyembunyikan
  navbar (topnav `translateY(-100%)`, sidebar ke `top:0`, `main-content` `margin-top:0`),
  muncul kembali saat scroll ke atas. Halaman tetap bisa scroll normal.
- Search bar disembunyikan di ≤768px; tetap berfungsi di desktop.
- Cover page index menampilkan label tunggal "Bahasa & Sastra Indonesia 2024" dengan ikon
  wayang (tanpa foto/NIM).
- Favicon semua halaman memakai `Assets/wayang_icon.png`.
- Hero: "Hai! Kami Mempersembahkan Artikel DIGITALISASI SEJARAH SASTRA JAWA TIMUR".

**Verifikasi:**
- `node --check` pada `script.js` + salinan `.mjs` kedua modul (sintaks OK).
- Manual: buka ketiga halaman via HTTP server (ES modules), uji tema terang/gelap,
  lebar 1280/1024/768/576/480/375px — search hilang di mobile tapi ada di desktop,
  auto-hide navbar berfungsi, cover satu baris wayang-icon, favicon wayang-icon.

**Catatan/risiko:**
- Keputusan baru menggantikan perbaikan C6 di `Docs/Audit.md` (search ditampilkan di
  layar kecil) — sekarang sengaja disembunyikan di mobile. Bukan regresi.
- Verifikasi visual final di browser masih menunggu pengguna.

## 2026-08-16 — Perombakan UI/UX responsive sidebar & topnav (mobile/tablet)

**Jenis:** style

**File yang disentuh:**
- `Periodisasi/periodisasi.css` (tokens sidebar, indentation submenu, touch target, safe-area, responsive topnav/sidebar, hapus lebar paksa 170px)
- `Resepsi/resepsi.css` (perubahan identik dengan `periodisasi.css`)
- `Periodisasi/periodisasi.html` (header branding di sidebar, `viewport-fit=cover`)
- `Resepsi/resepsi.html` (header branding di sidebar, `viewport-fit=cover`)

**Detail:**
- **Sidebar lebar fluid** pada mobile: `--sidebar-w-mobile: min(82vw, 320px)` menggantikan
  `240px` (≤768px) dan `170px` (≤480px) yang terlalu sempit; tidak ada lagi elemen keluar
  viewport maupun horizontal scroll.
- **Header branding** "Lorong Susastra" ditambahkan di atas `nav-list` (tampil hanya pada
  drawer ≤768px), memakai class `.brand-text` yang sudah ada dengan font responsif
  `clamp(1.05rem, 4vw, 1.2rem)`; dekoratif tanpa link (tanpa perubahan routing/JS).
- **Spacing konsisten**: hapus `margin-bottom:10px` pada `.nav-item`; gap diatur `.nav-list`
  (6px). `min-height:48px` untuk menu utama dan `min-height:44px` untuk submenu (touch target).
- **Indentasi & hierarki submenu**: `.nav-submenu` diberi `padding-left:20px` +
  `border-left:2px solid var(--border)` sehingga submenu tampak bagian dari parent; dinonaktifkan
  pada mode collapsed desktop.
- **Alignment**: chevron diberi `margin-left:auto`; `.nav-label` diberi `min-width:0`;
  `.nav-label--wrap` `line-height:1.35` agar label multiline (Arsip, Referensi) rapi tanpa
  menabrak chevron.
- **Safe area**: `viewport-fit=cover` pada meta viewport; `.sidebar` memakai
  `env(safe-area-inset-left/bottom)`; `.app-shell` memakai `100dvh` (fallback `100vh`).
- **Topnav anti-overflow (≤768px)**: `.topnav-left` flex-grow + `min-width:0`, search bar
  menyusut (`flex:1 1 auto`), brand font `clamp(...)`, hamburger `margin-left` lebih kecil;
  ≤400px avatar disembunyikan dan theme-switch dikecilkan.

**Verifikasi:**
- Buka `Periodisasi/periodisasi.html` dan `Resepsi/resepsi.html` di browser; cek tema
  terang/gelap; uji lebar 320/360/375/390/414/430/480/600/768/820/834/1024 px serta
  landscape 844×390. Pastikan drawer terbuka, submenu terindentasi, chevron di kanan,
  sidebar scroll internal, dan tidak ada horizontal scroll.

**Catatan/risiko:**
- Tidak ada perubahan pada JavaScript, routing, data, maupun mekanisme drawer
  (`sidebar-collapsed` + backdrop) yang sudah ada.
- Pada ≤400px input pencarian mengecil (tetap fungsional) dan avatar disembunyikan.
- Perlu verifikasi visual manual pada perangkat iOS ber-notch karena penambahan
  `viewport-fit=cover`.

## 2026-08-16 — Dropdown sidebar Periodisasi/Resepsi dapat scroll dengan tinggi adaptif

**Jenis:** fix

**File yang disentuh:**
- `Periodisasi/periodisasi.css` (`.nav-submenu.open` scrollable + tinggi adaptif)
- `Resepsi/resepsi.css` (perubahan identik dengan `periodisasi.css`)
- `Periodisasi/periodisasi.js` (helper `closeAllSubmenus` & `fitSubmenuToViewport`, resize listener, `sidebarEl`)
- `Resepsi/resepsi.js` (perubahan identik dengan `periodisasi.js`)

**Detail:**
- Submenu dropdown di sidebar sebelumnya memakai `max-height:400px` + `overflow:hidden`, sehingga saat isi
  melebihi ruang tersisa di sidebar, kontennya menembus ke bawah / terpotong tanpa bisa di-scroll.
- `.nav-submenu.open` kini `overflow-y:auto` dengan `max-height:min(400px, calc(100vh - var(--navbar-h)))`.
- Saat submenu dibuka, JS menghitung `max-height` inline agar pas dengan ruang tersisa di sidebar
  (`fitSubmenuToViewport`), sehingga bila konten muat tidak muncul scrollbar, dan bila lebih tinggi muncul
  scrollbar berstyle sama (pakai `::-webkit-scrollbar` global).
- `closeAllSubmenus()` mereset `max-height` inline agar submenu bisa menutup/animasi kembali ke `0`.
- `window resize` mengukur ulang submenu yang sedang terbuka.

**Verifikasi:**
- `node --check` lolos untuk kedua file JS.
- Belum: uji manual visual di browser — buka kategori dengan banyak item (mis. Prosa/Puisi Periodisasi) pada
  layar pendek, pastikan scrollbar muncul hanya saat perlu; cek tema terang & gelap, dan mobile ≤768px.

**Catatan/risiko:**
- Scrollbar dropdown otomatis memakai styling `::-webkit-scrollbar` global (konsisten dengan scrollbar lain).
- `min()` CSS butuh browser modern (sama seperti `clamp()`/`:has()` yang sudah dipakai).

## 2026-08-16 — Styling halaman Referensi/Arsip auto-fit di semua layar (mobile, iPad, tablet)

**Jenis:** fix + style

**File yang disentuh:**
- `Periodisasi/periodisasi.css` (mode teks `.content-card-body`, padding mobile, breakpoint tablet)
- `Resepsi/resepsi.css` (perubahan identik dengan `periodisasi.css`)

**Detail:**
- Halaman statis Referensi/Arsip (`#contentText`) sebelumnya terpotong/tidak bisa scroll karena `.content-card-body` memakai flex-center + `height:100vh` (mode PDF) dan `overflow:hidden` di ≤480px.
- Tambah aturan `.content-card-body:has(.content-text:not([hidden]))` agar saat konten teks tampil, kartu berpindah ke alur natural (`display:block`, `height:auto`, `overflow:visible`, `padding:0`); teks dibatasi `max-width:900px` dan ditengahkan.
- `overflow-wrap:break-word`/`word-break:break-word` pada `p/li/a` agar URL panjang tidak menimbulkan scroll horizontal di layar kecil.
- Padding konten teks diperkecil di ≤480px (`1.25rem 1rem`).
- Breakpoint tablet/iPad baru `@media (max-width:1024px)` (padding `.main-content`, ukuran `.page-title`, `.content-card-heading`) agar iPad landscape/tablet menyesuaikan.

**Verifikasi:**
- Pengecekan kurung kurawal CSS: 152 `{` = 152 `}` di kedua file; kedua file identik kecuali whitespace yang sudah ada sebelumnya (`overflow:hidden` vs `overflow: hidden`).
- Server lokal `python -m http.server 8000` — kedua halaman merespons 200.
- Belum: uji manual visual di browser (Referensi → Daftar Pustaka & Arsip, lebar 1280/1024/768/576/480/420/380px, tema terang & gelap).

**Catatan/risiko:**
- Memakai selektor `:has()` (didukung Chrome 105+, Edge 105+, Safari 15.4+, Firefox 121+).
- Perilaku sidebar mobile tidak diubah (sesuai permintaan: hanya konten auto-fit).

## 2026-08-16 — Isi submenu Arsip & Referensi dari berkas KORPUS (data bersama)

**Jenis:** feat + data

**File yang disentuh:**
- `Assets/data/korpus-data.mjs` (file baru — data bersama korpus arsip & daftar pustaka, diekstrak dari `Assets/Copy of KORPUS DATA KARYA SASTRA .xlsx`)
- `Periodisasi/periodisasi.js`, `Resepsi/resepsi.js` (import data bersama; submenu Arsip menjadi halaman statis; `specialPages.arsip`; `specialPages.referensi` diisi daftar pustaka; `showSpecialPage` mendukung `html` dan menyembunyikan viewer PDF saat halaman statis)
- `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css` (hapus `.sub-nav-link` yang mati; tambah gaya `.content-text h3/ul/li` untuk halaman Arsip)

**Detail:**
- Submenu "Arsip Digital Karya Sastra Jawa Timur" (placeholder 3 tautan `#`) kini membuka halaman statis berisi **137 karya sastra** dari Sheet ARSIP KARYA SASTRA, dikelompokkan per genre: Novel & Prosa (80), Drama (24), Puisi (26), Sastra Klasik & Tradisi (7). **108 entri** memuat tautan eksternal (dibuka di tab baru); sisanya (~29) tampil sebagai teks polos. Tahun hanya tampil bila ada.
- Halaman "Referensi" kini memuat **145 entri daftar pustaka** (gaya APA, bernomor) dari Sheet DAFTAR PUSTAKA.
- Data ditaruh di **satu file bersama** `Assets/data/korpus-data.mjs` (modul ES diekspor) agar tidak terduplikasi di dua sub-halaman; `buildArsipHTML()` juga di sana.
- Pembersihan data: buang spasi berlebih/akhiran, awali tautan telanjang dengan `https://`, hilangkan penanda `-`, rapikan angka tahun (`2020.0` → `2020`), perbaiki mojibake (`Gh�ncaran` → `Ghâncaran`).
- `buildLinkSubmenu` (kode mati) dan `.sub-nav-link` (CSS mati) dihapus dari kedua sub-halaman.
- Viewer PDF disembunyikan saat halaman statis (Arsip/Referensi) ditampilkan agar tidak ada PDF lama yang tersisa di atas teks.

**Verifikasi:**
- `node --check` pada `korpus-data.mjs` lulus; `periodisasi.js`/`resepsi.js` diperiksa via salinan `.mjs` (kini memakai `import`).
- `buildArsipHTML()` diuji di Node: 4 grup benar, 108 `<a href>`, teks ter-escape (`&` → `&amp;`), `Ghâncaran` tersimpan utuh.
- Grep memastikan tidak ada sisa `url: "#"` / placeholder "akan ditambahkan" / `buildLinkSubmenu`.
- Belum: uji manual browser (klik Arsip & Referensi, tema gelap, lebar ≤480px).

**Catatan/risiko:**
- Pengelompokan genre diinferensikan dari isi sheet (sheet tidak memuat label kelompok).
- `node --check` langsung pada `.js` kini gagal karena `import`; gunakan salinan `.mjs` atau skrip pemindai lainnya.

## 2026-08-16 — Rebrand, artikel baru, dan submenu Arsip/Referensi

**Jenis:** feat + data + style + docs

**File yang disentuh:**
- `Assets/Artikel Web/PeriodisasiPuisi/puisi3.pdf` (file baru dari pengguna)
- `Periodisasi/periodisasi.js` (tambah `puisiData` id 3; submenu Arsip/Referensi)
- `script.js` (tambah judul Puisi di accordion index)
- `Resepsi/resepsi.js` (submenu Arsip/Referensi)
- `index.html`, `Periodisasi/periodisasi.html`, `Resepsi/resepsi.html` (rebrand, meta/title, brand, submenu HTML, `#contentText`)
- `Periodisasi/periodisasi.css`, `Resepsi/resepsi.css` (`.nav-label--wrap`, `.sub-nav-link`, `.content-text`)
- Dokumentasi: rebrand di ±20 file markdown + hitungan artikel 14→15 di `CONTEXT.md`, `ERD.md`, `Content-Structure.md`, `PRD.md`, `AGENTS.md`, `Testing.md`; `Docs/Audit.md`

**Detail:**
- Rebrand web dari "Lorong Nusantara — Litera Jatim" menjadi "Lorong Susastra — Digitalisasi Sejarah Sastra Jawa Timur" (UI + dokumentasi).
- Menambahkan artikel baru `puisi3.pdf` (judul "Perkembangan Kepengarangan Pramoedya Ananta Toer ...") ke `puisiData` dan accordion index (Puisi kini 3 item; total artikel 15).
- Menambahkan submenu sidebar "Arsip Digital Karya Sastra Jawa Timur" (link eksternal via `buildLinkSubmenu`, URL masih placeholder) dan "Referensi" (halaman statis daftar pustaka via `specialPages.referensi` + `#contentText`).

**Verifikasi:**
- `node --check` `script.js`, `Periodisasi/periodisasi.js`, `Resepsi/resepsi.js` lulus.
- Grep memastikan tidak ada sisa "Lorong Nusantara"/"Litera Jatim" di UI & dokumen (kecuali entri glossary/change-log yang sudah diperbarui).

**Catatan/risiko:**
- URL submenu Arsip dan isi daftar pustaka masih placeholder.
- Artikel baru berjudul "Prosa" namun ditempatkan di kategori "Puisi" — sesuai data pengguna, hanya dicatat.

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
