import * as pdfjsLib from "../Extension/pdfjs-6.1.200-dist/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = "../Extension/pdfjs-6.1.200-dist/build/pdf.worker.mjs";

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

/* ================== DATA ================== */
const puisiData = [
  { id: 1, 
    label: "Puitika Ruang dalam Khazanah Puisi Jawa Timur dengan Memanfaatkan Metode Resepsi", 
    pdf: "../Assets/Artikel Web/ResepsiPuisi/puisi1.pdf" 
  },
  { id: 2, 
    label: "Digitalisasi Puitika Kota/Sejarah dalam Khazanah Puisi Jawa Timur dengan Memanfaatkan Metode Resepsi Pada Karya Aming Aminoedhin", 
    pdf: "../Assets/Artikel Web/ResepsiPuisi/puisi2.pdf"
  }
];

const prosaData = [
  { id: 1, 
    label: "Potret Sosial Budaya dalam Prosa Jawa Timur: Metode Resepsi Sastra", 
    pdf: "../Assets/Artikel Web/ResepsiProsa/prosa1.pdf" 
  },
  { id: 2, label: "Potret Dinamika Sejarah/Kota dalam Khazanah Prosa Jawa Timur", 
    pdf: "../Assets/Artikel Web/ResepsiProsa/prosa2.pdf" 
  }
];

const specialPages = {
  resepsi: {
    title: "Halaman Resepsi",
    breadcrumb: "Resepsi",
    cardTitle: "Resepsi",
  },
  mainpage: {
    title: "Halaman Utama",
    breadcrumb: "Main Page",
    cardTitle: "Main Page",
  }
};

/* ================== ELEMENTS ================== */
const appShell = document.getElementById('appShell');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const brandLink = document.getElementById('brandLink');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const body = document.body;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

const navProsa = document.getElementById('navProsa');
const navPuisi = document.getElementById('navPuisi');
const prosaSubmenu = document.getElementById("prosaSubmenu");
const puisiSubmenu = document.getElementById("puisiSubmenu");
const navPeriodisasi = document.getElementById('navPeriodisasi');
const navMainPage = document.getElementById('navMainPage');
let currentData = puisiData;

const pageTitle = document.getElementById('pageTitle');
const breadcrumb = document.getElementById('breadcrumb');
const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
const contentCardTitle = document.getElementById('contentCardTitle');
const pdfContainer = document.getElementById("pdfContainer");
const paginationBar = document.getElementById('paginationBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageDots = document.getElementById('pageDots');

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  root.setAttribute('data-theme', theme);
  body.classList.toggle('dark-mode', isDark);
  themeToggle?.classList.toggle('active', isDark);
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  if (themeIcon) {
    themeIcon.className = isDark ? 'ri-moon-line theme-switch__icon' : 'ri-sun-line theme-switch__icon';
  }
};

const savedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initialTheme = savedTheme || preferredTheme;
applyTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
});

/* ================== STATE ================== */
let activeSection = 'resepsi';
let activeKontenIndex = 1;

/* ================== INIT ================== */
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");
const selectedId = Number(params.get("id")) || 1;

const categoryMap = {
  "puisi": { data: puisiData, nav: navPuisi, submenu: puisiSubmenu },
  "prosa": { data: prosaData, nav: navProsa, submenu: prosaSubmenu }
};

buildSubmenu(prosaData, prosaSubmenu);
buildSubmenu(puisiData, puisiSubmenu);

function initializePage() {
  // Tutup semua submenu terlebih dahulu
  document.querySelectorAll(".nav-submenu").forEach(el => el.classList.remove("open"));
  document.querySelectorAll(".nav-parent").forEach(el => el.classList.remove("open"));

  let targetCategory = categoryMap[selectedCategory];

  // Jika kategori dari URL tidak valid atau tidak ada, gunakan default (puisi)
  if (!targetCategory) {
    targetCategory = categoryMap["puisi"];
  }

  // Set data, buka nav & submenu yang sesuai
  currentData = targetCategory.data;
  targetCategory.nav.classList.add("open");
  targetCategory.submenu.classList.add("open");

  // Bangun pagination dan tampilkan konten
  buildPagination(currentData);
  showKonten(selectedId);
}

initializePage();

/* ================== BUILD SUBMENU ================== */
function buildSubmenu(data, submenu){

    submenu.innerHTML = "";

    data.forEach(item => {

        const subItem = document.createElement("div");

        subItem.className = "sub-nav-item";

        subItem.dataset.index = item.id;

        subItem.innerHTML = `
            <span class="sub-nav-icon">${item.id}</span>
            <span class="sub-nav-label">${item.label}</span>
        `;

        subItem.addEventListener("click", () => {

            currentData = data;
            showKonten(item.id);

        });

        submenu.appendChild(subItem);

    });

}

function buildPagination(data) {

    pageDots.innerHTML = "";

    data.forEach(item => {

        const dot = document.createElement("span");

        dot.className = "page-dot";
        dot.dataset.index = item.id;

        dot.addEventListener("click", () => {

            currentData = data;
            showKonten(item.id);

        });

        pageDots.appendChild(dot);

    });

}

function showKonten(index){
  const item = currentData.find(k => k.id === index);
  if(!item) return;

  activeSection = 'resepsi';
  activeKontenIndex = index;

  pageTitle.textContent = "METODE RESEPSI";
  // breadcrumbCurrent.textContent = item.label; // Ini sudah diatur di baris berikutnya
  breadcrumb.innerHTML = `Resepsi / <span id="breadcrumbCurrent">${item.label}</span>`;
  contentCardTitle.textContent = item.label;
  renderPDF(item.pdf);

  paginationBar.style.display = 'flex';
  prevBtn.disabled = index === 1;
  nextBtn.disabled = index === currentData.length;

  updateActiveNav();
}

function showSpecialPage(key){
  const data = specialPages[key];
  if(!data) return;

  activeSection = key;

  pageTitle.textContent = data.title;
  breadcrumb.textContent = data.breadcrumb;
  contentCardTitle.textContent = data.cardTitle;
  contentText.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');

  paginationBar.style.display = 'none';

  updateActiveNav();
}

function updateActiveNav(){

    document.querySelectorAll(".nav-parent").forEach(nav=>{
        nav.classList.remove("active");
    });

    switch(currentData){

        case prosaData:
            navProsa.classList.add("active");
            break;

        case puisiData:
            navPuisi.classList.add("active");
            break;

    }

    document.querySelectorAll(".sub-nav-item").forEach(item=>{

        item.classList.toggle(
            "active",
            Number(item.dataset.index)===activeKontenIndex
        );

    });

    document.querySelectorAll(".page-dot").forEach(dot=>{

        dot.classList.toggle(
            "active",
            Number(dot.dataset.index)===activeKontenIndex
        );

    });

}

/* ================== EVENTS ================== */
navProsa.addEventListener("click",()=>{
    openCategory(
        prosaData,
        prosaSubmenu,
        navProsa
    );
});

navPuisi.addEventListener("click",()=>{
    openCategory(
        puisiData,
        puisiSubmenu,
        navPuisi
    );
});

brandLink.addEventListener('click', (e) => {
  e.preventDefault();
  showSpecialPage('mainpage');
  appShell.classList.remove('sidebar-collapsed');
});

prevBtn.addEventListener('click', () => {
  if(activeKontenIndex > 1) showKonten(activeKontenIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if(activeKontenIndex < currentData.length) showKonten(activeKontenIndex + 1);
});

hamburgerBtn.addEventListener('click', () => {
  const isCollapsed = appShell.classList.toggle('sidebar-collapsed');
  // Set aria-expanded: true jika sidebar terbuka (tidak collapsed), false jika tertutup (collapsed)
  hamburgerBtn.setAttribute('aria-expanded', String(!isCollapsed));
});

sidebarBackdrop.addEventListener('click', () => {
  appShell.classList.remove('sidebar-collapsed');
});

function openCategory(data, submenu, nav) {

    document.querySelectorAll(".nav-submenu").forEach(el => {
        el.classList.remove("open");
    });

    document.querySelectorAll(".nav-parent").forEach(el => {
        el.classList.remove("open");
        el.classList.remove("active");
    });

    submenu.classList.add("open");
    nav.classList.add("open");

    currentData = data;
    activeKontenIndex = 1;

    buildSubmenu(data, submenu);
    buildPagination(data);

    showKonten(1);

}

/* ================== PDF RENDER ================== */
async function renderPDF(url){

    console.log("URL PDF:", url);

    pdfContainer.innerHTML = "";

    const loadingTask = pdfjsLib.getDocument({
        url: url
    });

    const pdf = await loadingTask.promise;

    for(let pageNumber=1;
        pageNumber<=pdf.numPages;
        pageNumber++){

        const page =
        await pdf.getPage(pageNumber);

        const viewport =
        page.getViewport({scale:2.5});

        const canvas =
        document.createElement("canvas");

        const context =
        canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext:context,
            viewport
        }).promise;

        const wrapper =
        document.createElement("div");
        wrapper.className="pdf-page";
        wrapper.appendChild(canvas);
        pdfContainer.appendChild(wrapper);
    }
}