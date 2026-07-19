document.addEventListener("DOMContentLoaded", () => {
  // --- DATA KONTEN (Gantilah dengan data asli Anda) ---
  const contentData = [
    {
      id: 1,
      title: "Konten 1: Awal Mula",
      text: "<p>Ini adalah paragraf pertama untuk konten 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p>Ini adalah paragraf kedua, menjelaskan lebih detail tentang awal mula sejarah prosa di Jawa Timur.</p>",
      image: "https://via.placeholder.com/420x180.png/c0a062/ffffff?text=Gambar+Konten+1",
    },
    {
      id: 2,
      title: "Konten 2: Masa Kerajaan",
      text: "<p>Konten untuk bagian kedua, membahas era kerajaan. Prosa berkembang pesat di lingkungan keraton.</p>",
      image: "https://via.placeholder.com/420x180.png/5a5a5a/ffffff?text=Gambar+Konten+2",
    },
    {
      id: 3,
      title: "Konten 3: Pengaruh Kolonial",
      text: "<p>Bagian ketiga ini menceritakan bagaimana pengaruh kolonial mengubah bentuk dan isi dari prosa Jawa Timur.</p>",
      image: "https://via.placeholder.com/420x180.png/c0a062/ffffff?text=Gambar+Konten+3",
    },
    {
      id: 4,
      title: "Konten 4: Era Kemerdekaan",
      text: "<p>Setelah kemerdekaan, sastra prosa mengambil tema-tema baru yang relevan dengan semangat zaman.</p>",
      image: "https://via.placeholder.com/420x180.png/5a5a5a/ffffff?text=Gambar+Konten+4",
    },
    {
      id: 5,
      title: "Konten 5: Sastra Kontemporer",
      text: "<p>Pembahasan mengenai sastra prosa Jawa Timur di era modern dan kontemporer.</p>",
      image: "https://via.placeholder.com/420x180.png/c0a062/ffffff?text=Gambar+Konten+5",
    },
    {
      id: 6,
      title: "Konten 6: Tokoh Sastrawan",
      text: "<p>Mengenal beberapa tokoh penting yang berpengaruh dalam perkembangan prosa di Jawa Timur.</p>",
      image: "https://via.placeholder.com/420x180.png/5a5a5a/ffffff?text=Gambar+Konten+6",
    },
    {
      id: 7,
      title: "Konten 7: Masa Depan Prosa",
      text: "<p>Analisis dan prediksi mengenai arah perkembangan prosa Jawa Timur di masa yang akan datang.</p>",
      image: "https://via.placeholder.com/420x180.png/c0a062/ffffff?text=Gambar+Konten+7",
    },
  ];

  // --- ELEMEN DOM ---
  const contentTitle = document.getElementById("contentTitle");
  const contentText = document.getElementById("contentText");
  const imagePlaceholder = document.getElementById("imagePlaceholder");
  const navList = document.getElementById("navList");
  const navPrev = document.getElementById("navPrev");
  const navNext = document.getElementById("navNext");
  const toggleSwitch = document.getElementById("toggleSwitch");
  const pageWrapper = document.querySelector(".page-wrapper");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");

  // --- FUNGSI ---
  function loadContent(id) {
    const currentId = parseInt(id, 10);
    const content = contentData.find((item) => item.id === currentId);

    if (!content) {
      contentTitle.textContent = "Konten Tidak Ditemukan";
      contentText.innerHTML = "<p>Maaf, konten yang Anda cari tidak ada.</p>";
      return;
    }

    // Update konten utama
    contentTitle.textContent = content.title;
    contentText.innerHTML = content.text;
    imagePlaceholder.style.backgroundImage = `url('${content.image}')`;

    // Update status aktif di sidebar
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("active", parseInt(item.dataset.index, 10) === currentId);
    });

    // Update navigasi bawah
    updateFooterNav(currentId);
  }

  function updateFooterNav(currentId) {
    // Navigasi Sebelumnya
    if (currentId > 1) {
      navPrev.classList.remove("disabled");
      navPrev.href = `?id=${currentId - 1}`;
      navPrev.textContent = `← Konten ${currentId - 1}`;
    } else {
      navPrev.classList.add("disabled");
      navPrev.href = "#";
      navPrev.textContent = "← Awal";
    }

    // Navigasi Selanjutnya
    if (currentId < contentData.length) {
      navNext.classList.remove("disabled");
      navNext.href = `?id=${currentId + 1}`;
      navNext.textContent = `Konten ${currentId + 1} →`;
    } else {
      navNext.classList.add("disabled");
      navNext.href = "#";
      navNext.textContent = "Akhir →";
    }
  }

  // --- INISIALISASI ---

  // Buat item navigasi sidebar
  contentData.forEach((item) => {
    const navItem = document.createElement("a");
    navItem.href = `?id=${item.id}`;
    navItem.className = "nav-item";
    navItem.dataset.index = item.id;
    navItem.textContent = `Konten ${item.id}`;
    navList.appendChild(navItem);
  });

  // Muat konten berdasarkan URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const initialId = urlParams.get("id") || 1;
  loadContent(initialId);

  // --- EVENT LISTENERS ---

  // Mode Gelap
  toggleSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Hamburger Menu (Mobile)
  hamburgerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  // Klik di luar sidebar untuk menutupnya
  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== hamburgerBtn) {
      sidebar.classList.remove("open");
    }
  });
});