const cursor = document.querySelector(".cursor");
const pdfViewer = document.getElementById("pdfViewer");

window.addEventListener("message", (event) => {

    if (!cursor) return;

    if (event.data.type === "pdf-mouseenter") {
        cursor.style.opacity = "0";
    }

    if (event.data.type === "pdf-mouseleave") {
        cursor.style.opacity = "1";
    }

});

document.addEventListener("mousemove", (e) => {
    if (!cursor) return;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

const dramaData = [
  {
    id: 1,
    label: "Sejarah dalam Naskah Drama Jawa Timur Melalui Metode Periodisasi",
    pdf: "../Assets/Artikel Web/PeriodisasiDrama/drama1.pdf"
  },
  {
    id: 2,
    label: "Sejarah Dramaturgi dalam Universitas Airlangga",
    pdf: "../Assets/Artikel Web/PeriodisasiDrama/drama2.pdf"
  },
  {
    id: 3,
    label: "Sejarah Dramaturgi UNAIR",
    pdf: "../Assets/Artikel Web/PeriodisasiDrama/drama3.pdf"
  }
];

const komunitasData = [
  { id: 1, 
    label: "Pemetaan Historis Komunitas Sastra Jawa Timur Melalui Pendekatan Periodisasi", 
    pdf: "../Assets/Artikel Web/PeriodisasiKomunitas/komunitas1.pdf" 
  }
];

const prosaData = [
  { id: 1, 
    label: "Digitalisasi Sejarah Prosa Jawa Timur", 
    pdf: "../Assets/Artikel Web/PeriodisasiProsa/prosa1.pdf"
  },
  { id: 2, 
    label: "Inventarisasi dan Digitalisasi Karya-karya Pramoedya Ananta Toer", 
    pdf: "../Assets/Artikel Web/PeriodisasiProsa/prosa2.pdf" 
  },
  { id: 3, 
    label: "Inventarisasi dan Digitalisasi Sastra Cina Peranakan", 
    pdf: "../Assets/Artikel Web/PeriodisasiProsa/prosa3.pdf"
  },
  { id: 4, 
    label: "Representasi Kota dalam Prosa Jawa Timur Melalui Kajian Sejarah Sastra Berdasarkan Periodisasi", 
    pdf: "../Assets/Artikel Web/PeriodisasiProsa/prosa4.pdf"
  }
];

const puisiData = [
  { id: 1, 
    label: "Fragmen Kota dan Sejarah dalam Tubuh Sastra: Periodisasi Puisi di Jawa Timur (Tahun 2000-Sekarang)", 
    pdf: "../Assets/Artikel Web/PeriodisasiPuisi/puisi1.pdf" 
  },
  { id: 2, 
    label: "Perkembangan Lanskap Kota dan Sejarah Jawa dalam Puisi (1970-Modern): Telaah Kronologis dan Karakteristik Estetika Zaman", 
    pdf: "../Assets/Artikel Web/PeriodisasiPuisi/puisi2.pdf" 
  },
  { id: 3, 
    label: "Perkembangan Kepengarangan Pramoedya Ananta Toer dalam Karya-Karya Prosa Berdasarkan Metode Periodisasi serta Upaya Digitalisasinya", 
    pdf: "../Assets/Artikel Web/PeriodisasiPuisi/puisi3.pdf" 
  }
];

const specialPages = {
  mainpage: {
    title: "Halaman Utama",
    breadcrumb: "Main Page",
    cardTitle: "Main Page"
  }
};

/* ================== ELEMENTS ================== */
const appShell = document.getElementById('appShell');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebarBackdrop = document.getElementById('sidebarBackdrop');
const sidebarEl = document.getElementById('sidebar');
const brandLink = document.getElementById('brandLink');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const body = document.body;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

const navDrama = document.getElementById('navDrama');
const navKomunitas = document.getElementById('navKomunitas');
const navProsa = document.getElementById('navProsa');
const navPuisi = document.getElementById('navPuisi');
const dramaSubmenu = document.getElementById("dramaSubmenu");
const komunitasSubmenu = document.getElementById("komunitasSubmenu");
const prosaSubmenu = document.getElementById("prosaSubmenu");
const puisiSubmenu = document.getElementById("puisiSubmenu");
const navMainPage = document.getElementById('navMainPage');
let currentData = dramaData;

const pageTitle = document.getElementById('pageTitle');
const breadcrumb = document.getElementById('breadcrumb');
const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
const contentCardTitle = document.getElementById('contentCardTitle');
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
let activeSection = 'periodisasi';
let activeKontenIndex = 1;

/* ================== INIT ================== */
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");
const selectedId = Number(params.get("id")) || 1;

const categoryMap = {
  "drama": { data: dramaData, nav: navDrama, submenu: dramaSubmenu },
  "komunitas": { data: komunitasData, nav: navKomunitas, submenu: komunitasSubmenu },
  "prosa": { data: prosaData, nav: navProsa, submenu: prosaSubmenu },
  "puisi": { data: puisiData, nav: navPuisi, submenu: puisiSubmenu }
};

buildSubmenu(dramaData, dramaSubmenu);
buildSubmenu(komunitasData, komunitasSubmenu);
buildSubmenu(prosaData, prosaSubmenu);
buildSubmenu(puisiData, puisiSubmenu);

function initializePage() {
  // Tutup semua submenu terlebih dahulu
  closeAllSubmenus();
  document.querySelectorAll(".nav-parent").forEach(el => el.classList.remove("open"));

  let targetCategory = categoryMap[selectedCategory];

  // Jika kategori dari URL tidak valid atau tidak ada, gunakan default (drama)
  if (!targetCategory) {
    targetCategory = categoryMap["drama"];
  }

  // Set data, buka nav & submenu yang sesuai
  currentData = targetCategory.data;
  targetCategory.nav.classList.add("open");
  targetCategory.submenu.classList.add("open");
  fitSubmenuToViewport(targetCategory.submenu);

  // Bangun pagination dan tampilkan konten
  buildPagination(currentData);
  showKonten(selectedId);
}

initializePage();

/* ================== BUILD SUBMENU ================== */
function closeAllSubmenus() {

    document.querySelectorAll(".nav-submenu").forEach(el => {
        el.classList.remove("open");
        el.style.maxHeight = "";
    });

}

function fitSubmenuToViewport(submenu) {

    const sidebarRect = sidebarEl.getBoundingClientRect();
    const avail = sidebarRect.bottom - submenu.getBoundingClientRect().top - 16;
    submenu.style.maxHeight = Math.max(80, Math.floor(avail)) + "px";

}

window.addEventListener("resize", () => {
    const openSubmenu = document.querySelector(".nav-submenu.open");
    if (openSubmenu) fitSubmenuToViewport(openSubmenu);
});

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
  document.getElementById("contentCardBody").scrollTop = 0;
  const contentText = document.getElementById("contentText");
  if (contentText) contentText.hidden = true;
  const pdfWrapper = document.querySelector('.pdf-viewer-wrapper');
  if (pdfWrapper) pdfWrapper.style.display = '';
  const item = currentData.find(k => k.id === index);
  if(!item) return;

  activeSection = 'periodisasi';
  activeKontenIndex = index;

  pageTitle.textContent = "METODE PERIODISASI";
  // breadcrumbCurrent.textContent = item.label; // Ini sudah diatur di baris berikutnya
  breadcrumb.innerHTML = `Periodisasi / <span id="breadcrumbCurrent">${item.label}</span>`;
  contentCardTitle.textContent = item.label;
  loadPDF(item.pdf);

  paginationBar.style.display = 'flex';
  prevBtn.disabled = index === 1;
  nextBtn.disabled = index === currentData.length;

  updateActiveNav();
}

function showSpecialPage(key){
  const data = specialPages[key];
  if(!data) return;

  activeSection = key;
  activeKontenIndex = 0;

  pageTitle.textContent = data.title;
  breadcrumb.textContent = data.breadcrumb;
  contentCardTitle.textContent = data.cardTitle;

  paginationBar.style.display = 'none';

  const pdfWrapper = document.querySelector('.pdf-viewer-wrapper');
  if (pdfWrapper) pdfWrapper.style.display = 'none';

  const contentText = document.getElementById("contentText");
  if (contentText) {
    contentText.innerHTML = data.html || (data.paragraphs || []).map(p => `<p>${p}</p>`).join('');
    contentText.hidden = !contentText.innerHTML.trim();
  }

  updateActiveNav();
}

function updateActiveNav(){

    document.querySelectorAll(".nav-parent").forEach(nav=>{
        nav.classList.remove("active");
    });

    switch(currentData){

        case dramaData:
            navDrama.classList.add("active");
            break;

        case komunitasData:
            navKomunitas.classList.add("active");
            break;

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
navDrama.addEventListener("click",()=>{
    openCategory(
        dramaData,
        dramaSubmenu,
        navDrama
    );
});

navKomunitas.addEventListener("click",()=>{
    openCategory(
        komunitasData,
        komunitasSubmenu,
        navKomunitas
    );
});

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
  const isMobile = window.innerWidth <= 768;
  const sidebarOpen = isMobile ? isCollapsed : !isCollapsed;
  hamburgerBtn.setAttribute('aria-expanded', String(sidebarOpen));
});

sidebarBackdrop.addEventListener('click', () => {
  appShell.classList.remove('sidebar-collapsed');
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > 120 && currentScrollY > lastScrollY) {
    appShell.classList.add("nav-hidden");
  } else if (currentScrollY < lastScrollY) {
    appShell.classList.remove("nav-hidden");
  }
  lastScrollY = currentScrollY;
}, { passive: true });

function openCategory(data, submenu, nav) {

    closeAllSubmenus();

    document.querySelectorAll(".nav-parent").forEach(el => {
        el.classList.remove("open");
        el.classList.remove("active");
    });

    submenu.classList.add("open");
    fitSubmenuToViewport(submenu);
    nav.classList.add("open");

    currentData = data;
    activeKontenIndex = 1;

    buildSubmenu(data, submenu);
    buildPagination(data);

    showKonten(1);

}

/* ================== PDF RENDER ================== */
function loadPDF(url) {

    const pdfUrl = new URL(url, window.location.href).href;

    pdfViewer.src =
        `../Extension/pdfjs-6.1.200-dist/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;

}

/* ================== SEARCH ARTICLES ================== */

const searchInput = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-btn");

const allData = [
    { category: "drama", data: dramaData },
    { category: "komunitas", data: komunitasData },
    { category: "prosa", data: prosaData },
    { category: "puisi", data: puisiData }
];

function searchArticle(keyword){

    keyword = keyword.trim().toLowerCase();

    if(!keyword) return;

    for(const group of allData){

        const found = group.data.find(item =>
            item.label.toLowerCase().includes(keyword)
        );

        if(found){

            currentData = group.data;

            const target = categoryMap[group.category];

            closeAllSubmenus();
            document.querySelectorAll(".nav-parent").forEach(el => {
                el.classList.remove("open");
                el.classList.remove("active");
            });

            target.nav.classList.add("open");
            target.submenu.classList.add("open");
            fitSubmenuToViewport(target.submenu);

            buildSubmenu(group.data, target.submenu);

            buildPagination(group.data);

            showKonten(found.id);

            return;

        }

    }

    alert("Artikel tidak ditemukan");

}

searchBtn.addEventListener("click", () => {

    searchArticle(searchInput.value);

});

searchInput.addEventListener("keydown", e => {

    if(e.key === "Enter"){

        searchArticle(searchInput.value);

    }

});