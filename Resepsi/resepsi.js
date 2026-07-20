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
const loremPool = [
  "Isi konten pertamanya apa lorem ipsum dolor sit amet consectetur, adipiscing elit. Laudantium, ducimus eligendi accusamus veritatis corporis rem vitae, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Lorem ipsum dolor sit amet consectetur, adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat corporis rem vitae.",
  "Ducimus eligendi accusamus veritatis corporis rem vitae lorem ipsum dolor sit amet consectetur, adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.",
  "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.",
  "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur lorem ipsum dolor sit amet consectetur adipiscing elit.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur."
];

function buildParagraphs(seed, count){
  const out = [];
  for(let i = 0; i < count; i++){
    out.push(loremPool[(seed + i) % loremPool.length]);
  }
  return out;
}

const kontenData = [
  { id: 1, label: "Narasi Sejarah/Kota dalam Prosa Jawa Timur", paragraphs: buildParagraphs(0, 8) },
  { id: 2, label: "Digitalisasi Puitika Sejarah/Kota dalam Khazanah Puisi Jawa Timur", paragraphs: buildParagraphs(1, 8) },
  { id: 3, label: "Digitalisasi Sejarah Prosa Jawa Timur", paragraphs: buildParagraphs(2, 8) },
  { id: 4, label: "Puitika Sejarah/Kota dalam Khazanah Puisi Jawa Timur", paragraphs: buildParagraphs(3, 8) },
  { id: 5, label: "Inventarisasi dan Digitalisasi Karya-Karya Pramoedya Ananta Toer", paragraphs: buildParagraphs(4, 8) },
  { id: 6, label: "Inventarisasi dan Digitalisasi Sastra Cina Peranakan", paragraphs: buildParagraphs(5, 8) },
  { id: 7, label: "Penyusunan Sejarah Komunitas Sastra di Jawa Timur", paragraphs: buildParagraphs(6, 8) }
];

const specialPages = {
  resepsi: {
    title: "Halaman Resepsi",
    breadcrumb: "Resepsi",
    cardTitle: "Resepsi",
    paragraphs: buildParagraphs(2, 4)
  },
  mainpage: {
    title: "Halaman Utama",
    breadcrumb: "Main Page",
    cardTitle: "Main Page",
    paragraphs: buildParagraphs(5, 4)
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

const navPeriodisasi = document.getElementById('navPeriodisasi');
const periodisasiSubmenu = document.getElementById('periodisasiSubmenu');
const navResepsi = document.getElementById('navResepsi');
const navMainPage = document.getElementById('navMainPage');

const pageTitle = document.getElementById('pageTitle');
const breadcrumb = document.getElementById('breadcrumb');
const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
const contentCardTitle = document.getElementById('contentCardTitle');
const contentText = document.getElementById('contentText');
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

/* ================== BUILD SUBMENU ================== */
kontenData.forEach(item => {
  const subItem = document.createElement('div');
  subItem.className = 'sub-nav-item';
  subItem.dataset.index = item.id;
  subItem.innerHTML = `
    <span class="sub-nav-icon">${item.id}</span>
    <span class="sub-nav-label">${item.label}</span>
  `;
  subItem.addEventListener('click', () => showKonten(item.id));
  periodisasiSubmenu.appendChild(subItem);
});

kontenData.forEach(item => {
  const dot = document.createElement('span');
  dot.className = 'page-dot';
  dot.dataset.index = item.id;
  dot.addEventListener('click', () => showKonten(item.id));
  pageDots.appendChild(dot);
});

/* ================== STATE ================== */
let activeSection = 'periodisasi';
let activeKontenIndex = 1;

/* ================== RENDER ================== */
function renderKontenParagraphs(item){
  contentText.innerHTML = item.paragraphs.map(p => `<p>${p}</p>`).join('');
}

function showKonten(index){
  const item = kontenData.find(k => k.id === index);
  if(!item) return;

  activeSection = 'periodisasi';
  activeKontenIndex = index;

  pageTitle.textContent = "RESEPSI XZYABCD";
  breadcrumbCurrent.textContent = item.label;
  breadcrumb.innerHTML = `Resepsi / <span id="breadcrumbCurrent">${item.label}</span>`;
  contentCardTitle.textContent = item.label;
  renderKontenParagraphs(item);

  paginationBar.style.display = 'flex';
  prevBtn.disabled = index === 1;
  nextBtn.disabled = index === kontenData.length;

  periodisasiSubmenu.classList.add('open');
  navPeriodisasi.classList.add('open');

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
  navPeriodisasi.classList.toggle('active', activeSection === 'periodisasi');
  navResepsi.classList.toggle('active', activeSection === 'resepsi');
  navMainPage.classList.toggle('active', activeSection === 'mainpage');

  document.querySelectorAll('.sub-nav-item').forEach(el => {
    el.classList.toggle('active', activeSection === 'periodisasi' && Number(el.dataset.index) === activeKontenIndex);
  });

  document.querySelectorAll('.page-dot').forEach(el => {
    el.classList.toggle('active', activeSection === 'periodisasi' && Number(el.dataset.index) === activeKontenIndex);
  });
}

/* ================== EVENTS ================== */
navPeriodisasi.addEventListener('click', () => {
  const willOpen = !periodisasiSubmenu.classList.contains('open');
  periodisasiSubmenu.classList.toggle('open', willOpen);
  navPeriodisasi.classList.toggle('open', willOpen);

  if(activeSection !== 'periodisasi'){
    showKonten(activeKontenIndex);
  }
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
  if(activeKontenIndex < kontenData.length) showKonten(activeKontenIndex + 1);
});

hamburgerBtn.addEventListener('click', () => {
  const isCollapsed = appShell.classList.toggle('sidebar-collapsed');
  hamburgerBtn.setAttribute('aria-expanded', String(!isCollapsed));
});

sidebarBackdrop.addEventListener('click', () => {
  appShell.classList.remove('sidebar-collapsed');
});

/* ================== INIT ================== */
periodisasiSubmenu.classList.add('open');
navPeriodisasi.classList.add('open');
const params = new URLSearchParams(window.location.search);
const selectedId = parseInt(params.get("id")) || 1;
showKonten(selectedId);