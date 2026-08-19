import { korpusArsip, daftarPustaka, daftarPuisiMahasiswi, daftarPuisiMahasiswa } from "./Assets/data/korpus-data.mjs";

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

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

  setTimeout(() => {
    if (!sessionStorage.getItem('popupShown')) {
      showPopup();
      sessionStorage.setItem('popupShown', '1');
    }
  }, 1000);

  closePopupBtn.addEventListener("click", hidePopup);
  exploreBtn.addEventListener("click", hidePopup);

  // Hamburger mobile nav
  const hamburgerMobile = document.getElementById("hamburgerMobile");
  const navLinks = document.getElementById("navLinks");
  if (hamburgerMobile && navLinks) {
    hamburgerMobile.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      hamburgerMobile.classList.toggle("open", isOpen);
      hamburgerMobile.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburgerMobile.classList.remove("open");
        hamburgerMobile.setAttribute("aria-expanded", "false");
      });
    });
  }
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
      { title: "Perkembangan Kepengarangan Pramoedya Ananta Toer dalam Karya-Karya Prosa Berdasarkan Metode Periodisasi serta Upaya Digitalisasinya" },
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

// === ARSIP & REFERENSI (index) ===
function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildArsipItemHTML(item) {
  const text =
    "<strong>" + escapeHTML(item.author) + "</strong> \u2014 <em>" +
    escapeHTML(item.title) + "</em>" +
    (item.year ? " (" + escapeHTML(item.year) + ")" : "");
  return item.url
    ? "<li><a href=\"" + escapeHTML(item.url) + "\" target=\"_blank\" rel=\"noopener\">" + text + "</a></li>"
    : "<li>" + text + "</li>";
}

function buildPuisiItemHTML(item) {
  const text =
    "<strong>" + escapeHTML(item.komunitas) + "</strong>" +
    (item.year ? " (" + escapeHTML(item.year) + ")" : "");
  return "<li><a href=\"" + escapeHTML(item.url) + "\" target=\"_blank\" rel=\"noopener\">" + text + "</a></li>";
}

function setupListAccordion(containerId, panels, defaultActiveIndex) {
  const container = document.getElementById(containerId);
  if (!container) return;

  panels.forEach((panelConfig, i) => {
    const card = document.createElement("div");
    card.className = "accordion-card accordion-card--list";

    const accordion = document.createElement("div");
    accordion.className = "accordion";

    const panel = document.createElement("div");
    panel.className = "panel" + (i === defaultActiveIndex ? " active" : "");
    panel.setAttribute("role", "button");
    panel.setAttribute("tabindex", "0");
    panel.setAttribute("aria-expanded", i === defaultActiveIndex ? "true" : "false");

    panel.innerHTML = `
      <div class="panel-header">
        <span class="panel-title">${escapeHTML(panelConfig.title)}</span>
        <span class="panel-number">${panelConfig.count}</span>
        <span class="panel-arrow" aria-hidden="true"><i class="ri-arrow-down-s-line"></i></span>
      </div>
      <div class="panel-content">
        ${panelConfig.contentHTML}
      </div>
    `;

    const toggle = () => {
      const isActive = panel.classList.toggle("active");
      panel.setAttribute("aria-expanded", String(isActive));
    };
    panel.addEventListener("click", toggle);
    panel.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    accordion.appendChild(panel);
    card.appendChild(accordion);
    container.appendChild(card);
  });
}

const arsipPanels = korpusArsip.map((group) => ({
  title: group.group,
  count: group.items.length,
  contentHTML: "<ul class=\"list-content\">" + group.items.map(buildArsipItemHTML).join("") + "</ul>"
}));

setupListAccordion("accordionArsip", arsipPanels, 0);

const referensiPanel = {
  title: "Daftar Pustaka",
  count: daftarPustaka.length,
  contentHTML: "<ul class=\"list-content referensi-list\">" + daftarPustaka.map((p) => "<li>" + escapeHTML(p) + "</li>").join("") + "</ul>"
};

setupListAccordion("accordionReferensi", [referensiPanel], 0);

const puisiPanels = [
  {
    title: "Daftar Puisi Mahasiswi",
    count: daftarPuisiMahasiswi.length,
    contentHTML: "<ul class=\"list-content\">" + daftarPuisiMahasiswi.map(buildPuisiItemHTML).join("") + "</ul>"
  },
  {
    title: "Daftar Puisi Mahasiswa",
    count: daftarPuisiMahasiswa.length,
    contentHTML: "<ul class=\"list-content\">" + daftarPuisiMahasiswa.map(buildPuisiItemHTML).join("") + "</ul>"
  }
];

setupListAccordion("accordionPuisi", puisiPanels, 0);

// Cover Page Logic
const membersData = [
  { name: "Aura Fauziyyah Rahmadania" },
  { name: "Chesta Leilani" },
  { name: "Zalfa Izzati Efendi" }
];

const memberNoteText = "*dan seluruh mahasiswa Mata Kuliah Sejarah Kesusastraan angkatan 2024";

const memberList = document.getElementById("memberList");

if (memberList) {
  membersData.forEach((data) => {
    const row = document.createElement("div");
    row.className = "member";

    row.innerHTML = `
      <div class="member-text">
        <p class="member-name">${data.name}</p>
      </div>
    `;

    memberList.appendChild(row);
  });

  const note = document.createElement("p");
  note.className = "member-note";
  note.innerHTML = '<em>' + memberNoteText + '</em>';
  memberList.appendChild(note);
}