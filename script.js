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
function setupAccordion(containerId, data) {
  const panelsData = data;
  const loremText =
    "Lorem ipsum sit amet dolor, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.";
  const accordion = document.getElementById(containerId);
  let linkHref = "Artikel/detail.html"; // Default link
  if (containerId.includes("Periodisasi")) {
    linkHref = "Periodisasi/periodisasi.html";
  } else if (containerId.includes("Resepsi")) {
    linkHref = "Resepsi/resepsi.html";
  }

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
        <a class="panel-link" href="${linkHref}?id=${i + 1}">Telusuri Lebih Lanjut <i class="ri-arrow-right-line"></i></a>
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

// === DATA UNTUK ACCORDION DI INDEX ===
const periodisasiData = [
  { title: "Narasi Sejarah/Kota dalam Prosa Jawa Timur" },
  { title: "Digitalisasi Puitika Sejarah/Kota dalam Khazanah Puisi Jawa Timur" },
  { title: "Digitalisasi Sejarah Prosa Jawa Timur" },
  { title: "Puitika Sejarah/Kota dalam Khazanah Puisi Jawa Timur" },
  { title: "Penyusunan Sejarah Dramaturgi UNAIR" },
  { title: "Ruang Sejarah/Kota dalam Naskah Drama Jawa Timur" },
  { title: "Penyusunan Sejarah Komunitas Sastra di Jawa Timur" }
];

const resepsiData = [
  { title: "Narasi Sejarah/Kota dalam Prosa Jawa Timur" },
  { title: "Digitalisasi Puitika Sejarah/Kota dalam Khazanah Puisi Jawa Timur" },
  { title: "Digitalisasi Sejarah Prosa Jawa Timur" },
  { title: "Puitika Sejarah/Kota dalam Khazanah Puisi Jawa Timur" },
  { title: "Inventarisasi dan Digitalisasi Karya-Karya Pramoedya Ananta Toer" },
  { title: "Inventarisasi dan Digitalisasi Sastra Cina Peranakan" },
  { title: "Penyusunan Sejarah Komunitas Sastra di Jawa Timur" }
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
      <image class="avatar" src="Assets/logo-web.png"></image>
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