const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    currentX += (mouseX - currentX) * 0.5;
    currentY += (mouseY - currentY) * 0.5;

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    requestAnimationFrame(animate);
}

animate();

document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const root = document.documentElement;
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    root.setAttribute("data-theme", theme);
    body.classList.toggle("dark-mode", isDark);
    body.classList.toggle("light-mode", !isDark);

    if (themeToggle) {
      themeToggle.classList.toggle("active", isDark);
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    if (themeIcon) {
      themeIcon.className = isDark
        ? "ri-moon-line theme-switch__icon"
        : "ri-sun-line theme-switch__icon";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const initialTheme = savedTheme || preferredTheme;

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  });

  // Popup
  const welcomePopup = document.getElementById("welcome-popup");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const exploreBtn = document.getElementById("explore-btn");
  const showPopup = () => {
    welcomePopup.classList.add("show");
  };

  // Function to hide the popup
  const hidePopup = () => {
    welcomePopup.classList.remove("show");
  };

  setTimeout(showPopup, 1000); // Show after 1 second

  closePopupBtn.addEventListener("click", hidePopup);
  exploreBtn.addEventListener("click", hidePopup);
});

// Accordion Logic
// Grouped Accordion Logic (per kategori)
function setupGroupedAccordion(containerId, groupedData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let linkHref = "";
  if (containerId.includes("Periodisasi")) {
    linkHref = "Periodisasi/periodisasi.html";
  } else if (containerId.includes("Resepsi")) {
    linkHref = "Resepsi/resepsi.html";
  }

  groupedData.forEach((group) => {
    const categorySlug = group.category.toLowerCase().replace(/\s+/g, "-");

    const card = document.createElement("div");
    card.className = "accordion-card";

    const accordion = document.createElement("div");
    accordion.className = "accordion";

    function activatePanel(index) {
      const allPanels = accordion.querySelectorAll(".panel");
      allPanels.forEach((p, i) => {
        const isActive = i === index;
        p.classList.toggle("active", isActive);
        p.setAttribute("aria-expanded", isActive ? "true" : "false");
      });
    }

    group.items.forEach((item, i) => {
      const panel = document.createElement("div");
      panel.className = "panel" + (i === 0 ? " active" : "");
      panel.dataset.index = i;
      panel.setAttribute("role", "button");
      panel.setAttribute("tabindex", "0");
      panel.setAttribute("aria-expanded", i === 0 ? "true" : "false");

      panel.innerHTML = `
        <span class="panel-number">${i + 1}</span>
        <span class="panel-category">${group.category}</span>
        <div class="panel-content">
          <h3 class="panel-title">${item.title}</h3>
          <a class="panel-link" href="${linkHref}?category=${categorySlug}&id=${i + 1}">Telusuri Lebih Lanjut <i class="ri-arrow-right-line"></i></a>
        </div>
      `;

      panel.addEventListener("click", () => activatePanel(i));
      panel.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activatePanel(i);
        }
      });

      accordion.appendChild(panel);
    });

    card.appendChild(accordion);
    container.appendChild(card);
  });
}

// === DATA DIKELOMPOKKAN PER KATEGORI ===
const periodisasiData = [
  {
    category: "Drama",
    items: [
      { title: "Sejarah dalam Naskah Drama Jawa Timur Melalui Metode Periodisasi" },
      { title: "Sejarah Dramaturgi dalam Universitas Airlangga" },
      { title: "Sejarah Dramaturgi UNAIR" },
    ],
  },
  {
    category: "Komunitas",
    items: [
      { title: "Pemetaan Historis Komunitas Sastra Jawa Timur Melalui Pendekatan Periodisasi" }
    ],
  },
  {
    category: "Prosa",
    items: [
      { title: "Digitalisasi Sejarah Prosa Jawa Timur" },
      { title: "Inventarisasi dan Digitalisasi Karya-karya Pramoedya Ananta Toer" },
      { title: "Inventarisasi dan Digitalisasi Sastra Cina Peranakan" },
      { title: "Representasi Kota dalam Prosa Jawa Timur Melalui Kajian Sejarah Sastra Berdasarkan Periodisasi" },
    ],
  },
  {
    category: "Puisi",
    items: [
      { title: "Fragmen Kota dan Sejarah dalam Tubuh Sastra: Periodisasi Puisi di Jawa Timur (Tahun 2000-Sekarang)" },
      { title: "Perkembangan Lanskap Kota dan Sejarah Jawa dalam Puisi (1970-Modern): Telaah Kronologis dan Karakteristik Estetika Zaman" },
    ],
  },
];

const resepsiData = [
  {
    category: "Puisi",
    items: [
      { title: "Puitika Ruang dalam Khazanah Puisi Jawa Timur dengan Memanfaatkan Metode Resepsi" },
      { title: "Digitalisasi Puitika Kota/Sejarah dalam Khazanah Puisi Jawa Timur dengan Memanfaatkan Metode Resepsi Pada Karya Aming Aminoedhin" },
    ],
  },
  {
    category: "Prosa",
    items: [
      { title: "Potret Sosial Budaya dalam Prosa Jawa Timur: Metode Resepsi Sastra" },
      { title: "Potret Dinamika Sejarah/Kota dalam Khazanah Prosa Jawa Timur" },
    ],
  },
];

setupGroupedAccordion("accordionPeriodisasi", periodisasiData);
setupGroupedAccordion("accordionResepsi", resepsiData);

// Cover Page Logic
const membersData = [
  { name: "Nama Anggota 1", nim: "NIM Anggota 1" },
  { name: "Nama Anggota 2", nim: "NIM Anggota 2" },
  { name: "Nama Anggota 3", nim: "NIM Anggota 3" },
  { name: "Nama Anggota 4", nim: "NIM Anggota 4" }
];

const memberList = document.getElementById("memberList");

if (memberList) {
  membersData.forEach((data, i) => {
    const row = document.createElement("div");
    row.className = "member";

    row.innerHTML = `
      <img class="avatar" src="Assets/logo-web.png" alt="" />
      <div class="member-text">
        <p class="member-name">${data.name}</p>
        <p class="member-nim">${data.nim}</p>
      </div>
    `;

    memberList.appendChild(row);
  });
}