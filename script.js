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
function setupAccordion(containerId, data) {
  const panelsData = data;
  const loremText =
    "Lorem ipsum sit amet dolor, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.";
  const accordion = document.getElementById(containerId);
  if (!accordion) return;

  panelsData.forEach((data, i) => {
    const panel = document.createElement("div");
    panel.className = "panel" + (i === 0 ? " active" : "");
    panel.dataset.index = i;
    panel.setAttribute("role", "button");
    panel.setAttribute("tabindex", "0");
    panel.setAttribute("aria-expanded", i === 0 ? "true" : "false");

    panel.innerHTML = `
      <span class="panel-number">${i + 1}</span>
      <div class="panel-content">
        <h3 class="panel-title">${data.title}</h3>
        <p class="panel-text">${loremText}</p>
        <a class="panel-link" href="Artikel/detail.html?id=${i + 1}">Telusuri Lebih Lanjut <i class="ri-arrow-right-line"></i></a>
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

  function activatePanel(index) {
    const allPanels = accordion.querySelectorAll(".panel");
    allPanels.forEach((p, i) => {
      const isActive = i === index;
      p.classList.toggle("active", isActive);
      p.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  }
}

// Initialize both accordions
const periodisasiData = [
  { title: "Judul konten pertama" },
  { title: "Judul konten kedua" },
  { title: "Judul konten ketiga" },
  { title: "Judul konten keempat" },
  { title: "Judul konten kelima" },
  { title: "Judul konten keenam" },
  { title: "Judul konten ketujuh" },
];
const resepsiData = [
  { title: "Judul konten A" },
  { title: "Judul konten B" },
  { title: "Judul konten C" },
  { title: "Judul konten D" },
  { title: "Judul konten E" },
  { title: "Judul konten F" },
  { title: "Judul konten G" },
];

setupAccordion("accordionPeriodisasi", periodisasiData);
setupAccordion("accordionResepsi", resepsiData);

// Cover Page Logic
const membersData = [
  { name: "Nama Anggota 1", nim: "NIM Anggota 1" },
  { name: "Nama Anggota 2", nim: "NIM Anggota 2" },
  { name: "Nama Anggota 3", nim: "NIM Anggota 3" },
  { name: "Nama Anggota 4", nim: "NIM Anggota 4" },
  { name: "Nama Anggota 5", nim: "NIM Anggota 5" },
];

const memberList = document.getElementById("memberList");

if (memberList) {
  membersData.forEach((data, i) => {
    const row = document.createElement("div");
    row.className = "member";

    row.innerHTML = `
      <label class="avatar" id="avatar-${i}">
        <input type="file" accept="image/*" id="fileInput-${i}">
      </label>
      <div class="member-text">
        <p class="member-name">${data.name}</p>
        <p class="member-nim">${data.nim}</p>
      </div>
    `;

    memberList.appendChild(row);
  });

  membersData.forEach((_, i) => {
    const input = document.getElementById(`fileInput-${i}`);
    const avatar = document.getElementById(`avatar-${i}`);

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);
        avatar.style.backgroundImage = `url('${imageURL}')`;
      }
    });
  });
}