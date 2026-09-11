/* =====================================================================
   ПУТЬ ДРАКОНА — программа поездки с аудиозаданиями
   Весь контент — в TRIP и DAYS ниже. Остальной код трогать не нужно.
   ===================================================================== */

const TRIP = {
  name: "Путь Дракона",
  group: "Турнир лидеров 2026, Пекин — Хайнань",
  tzOffset: "+08:00",          // Пекин и Хайнань — один пояс, UTC+8
  tzLabel: "по Пекину",
  unlockTime: "05:00",         // во сколько по местному открывается задание дня
  // SHA-256 пароля организатора (по умолчанию «drakon2026»). Как сменить — в README.
  orgHash: "f538c2bac59812ff33a6095a730bb7e6868de46215622f5ed873d08494a30859",
  version: "v1",               // для подписи внизу; держите в паре с CACHE в sw.js
};

/* Форматирование абзацев в text: "**…" — жирный абзац, "!!…" — красный акцент.
   task.audio: null → карточка «Запись готовится».
   task.unlock можно задать вручную (ISO с офсетом), иначе — дата дня + TRIP.unlockTime. */
const DAYS = [
  {
    date: "2026-10-24", title: "В путь!", img: "assets/img/d1.jpg", imgPos: "50% 100%",
    task: { title: "Задание дня", audio: "assets/audio/d1.mp3", hint: "" },
    text: [
      "**Мы долго ждали этого дня и наконец начинаем наше путешествие.",
      "Кто-то вылетает рано утром, кто-то ближе к обеду, но все мы летим навстречу большому приключению, новому городу и друг другу. Завтра Пекин встретит нас шумом, красками и ароматами совсем другой жизни.",
      "!!А пока — дорога, ожидание и приятное предвкушение.",
    ],
    schedule: [],
    important: true,
  },
  {
    date: "2026-10-25", title: "Нихао, Пекин!", img: "assets/img/d2.jpg", imgPos: "25% 50%",
    task: { title: "Задание дня", audio: "assets/audio/d2.mp3", hint: "" },
    schedule: [
      ["до\n13:00", "Размещение в отеле Hilton Beijing Wangfujing Hotel 5*"],
      ["13:00", "Обед в отеле"],
      ["16:45", "Парк Бэйхай", true],
      ["19:00", "Ужин в ресторане «Утка по-пекински»"],
    ],
    text: [
      "Первый день в столице Китая — и сразу с головой в историю. Разместимся в Hilton Beijing Wangfujing Hotel 5* и немного отдохнём после перелёта.",
      "Начнём знакомство с городом с парка Бэйхай. Белая пагода на острове Цюнхуа, мост Юнъань, тихие аллеи и отражения в воде — здесь чувствуется дыхание многовековой истории.",
      "А вечером — то, ради чего многие летят в Китай: утка по-пекински. Хрустящая корочка, тонкие блинчики, соус и атмосфера знаменитого пекинского ресторана.",
      "**Идеальное завершение первого дня в Пекине!",
    ],
  },
  {
    date: "2026-10-26", title: "Путь длиной в две тысячи лет", img: "assets/img/d3.jpg", imgPos: "40% 50%",
    task: { title: "Задание дня", audio: "assets/audio/d3.mp3", hint: "" },
    schedule: [
      ["08:00", "Завтрак в отеле"],
      ["10:00", "Великая Китайская стена", true],
      ["14:30", "Обед в городе"],
      ["16:30", "Посещение чайного дома с традиционной чайной церемонией"],
      ["19:00", "Ужин в ресторане отеля"],
    ],
    text: [
      "Сегодня мы отправимся туда, куда мечтал попасть каждый, кто хоть раз слышал о Китае, — на Великую Китайскую стену. Полтора часа в пути, и вот перед нами она: каменная лента, уходящая за горизонт, по гребням гор и холмов.",
      "Поднимемся, пройдёмся, почувствуем масштаб и, конечно, сделаем те самые фотографии.",
      "После обеда вернёмся в Пекин и заглянем в Чайный дом — место, где спешить не принято. Традиционная чайная церемония и неспешный разговор. Китай умеет замедлять — и сегодня он покажет нам, как.",
    ],
  },
  {
    date: "2026-10-27", title: "Из столицы — к тропическому морю", img: "assets/img/d4.jpg", imgPos: "45% 50%",
    task: { title: "Задание дня", audio: "assets/audio/d4.mp3", hint: "" },
    schedule: [
      ["08:00", "Завтрак в отеле"],
      ["09:30", "Трансфер в аэропорт"],
      ["12:45", "Вылет в Санью, авиакомпания Air China, время в пути 4 часа"],
      ["16:45", "Прилёт в Санью, трансфер в отель Raffles Clear Water Bay 5*", true],
      ["19:00", "Welcome-ужин в отеле"],
    ],
    text: [
      "Начало дня пройдёт спокойно: завтрак, неспешные сборы и прощание с Пекином. Впереди — перелёт на остров Хайнань.",
      "Четыре часа в небе, и за иллюминатором вместо городских пейзажей — бирюзовое море и пальмы. Санья встретит нас теплом и солнцем.",
      "Разместимся в великолепном Raffles Clear Water Bay 5*, выдохнем, переоденемся и вечером соберёмся вместе на welcome-коктейль и первый общий ужин на Хайнане.",
      "**Знакомство с островом начинается!",
    ],
  },
  {
    date: "2026-10-28", title: "Китай, который нужно увидеть и почувствовать", img: "assets/img/d5.jpg", imgPos: "62% 50%",
    task: { title: "Задание дня", audio: "assets/audio/d5.mp3", hint: "" },
    schedule: [
      ["08:00", "Завтрак в отеле"],
      ["09:00", "Свободное время в отеле"],
      ["12:00", "Обед в ресторане отеля"],
      ["13:30", "Выезд в буддийский центр Наньшань", true],
      ["18:00", "Трансфер в отель"],
      ["19:30", "Ужин в отеле"],
    ],
    text: [
      "Утром насладимся отелем, морем, тропическим воздухом и никуда не будем торопиться. А после обеда отправимся в Наньшань — один из крупнейших буддийских культурных центров Восточной Азии.",
      "Грандиозный храмовый комплекс, статуи, сады и атмосфера покоя, которой так не хватает большим городам. Здесь время течёт иначе: медленнее, спокойнее, осознаннее.",
      "Вечером вернёмся в отель на ужин — спокойное завершение дня, которое зарядит нас энергией перед завтрашним приключением.",
    ],
  },
  {
    date: "2026-10-29", title: "В самое сердце джунглей", img: "assets/img/d6.jpg", imgPos: "55% 50%",
    task: { title: "Задание дня", audio: "assets/audio/d6.mp3", hint: "" },
    schedule: [
      ["08:00", "Завтрак в отеле"],
      ["10:00", "Посещение тропического парка Янода", true],
      ["13:00–\n14:00", "Обед в парке"],
      ["15:00", "Трансфер в отель, свободное время"],
      ["18:30", "Гала-ужин"],
    ],
    text: [
      "После завтрака отправимся навстречу настоящим приключениям — в тропический парк Янода. Здесь Китай предстанет совсем не таким, каким мы увидели его в Пекине. Вместо древних стен и императорских парков — густые джунгли, водопады и тысячелетние деревья. Вместо городского шума — тропическая природа во всём её великолепии.",
      "Вечером вернёмся в отель, подготовимся и соберёмся на главное событие поездки — гала-ужин. Лужайка под открытым небом, праздничная атмосфера, танцы народности Ли, интерактив и музыка. Китай, который танцует и смеётся.",
    ],
  },
  {
    date: "2026-10-30", title: "Путь домой", img: "assets/img/d7.jpg", imgPos: "20% 50%",
    task: { title: "Задание дня", audio: "assets/audio/d7.mp3", hint: "" },
    schedule: [
      ["08:00", "Завтрак в отеле, свободное время"],
      ["12:00", "Обед в отеле"],
      ["13:00", "Трансфер в аэропорт"],
      ["15:35", "Вылет в Пекин", true],
      ["20:00", "Трансфер в отель Hilton Beijing Wangfujing Hotel 5*"],
      ["20:30", "Ужин в отеле"],
    ],
    text: [
      "Последнее утро на Хайнане — и оно целиком наше!",
      "Купание, прогулки, бассейн, завтрак без будильника — каждый проведёт его так, как хочется.",
      "После обеда скажем острову «спасибо» и отправимся в аэропорт. Впереди короткий перелёт обратно в Пекин, ужин в знакомом Hilton и вечерние разговоры о том, каким удивительным получилось это путешествие.",
    ],
  },
  {
    date: "2026-10-31", title: "До новых встреч, Китай!", img: "assets/img/d8.jpg", imgPos: "50% 50%",
    task: { title: "Задание дня", audio: "assets/audio/d8.mp3", hint: "" },
    schedule: [
      ["07:00–\n15:30", "Трансферы в аэропорт ко времени вылета участников"],
      ["08:00", "Завтрак в отеле"],
      ["10:00", "Свободное время для участников, вылетающих поздними рейсами"],
      ["13:00", "Обед в отеле"],
    ],
    text: [
      "Путешествие постепенно подходит к концу, и наша группа начинает разъезжаться по домам.",
      "Те, кто остаётся чуть дольше, получат возможность ещё немного насладиться Пекином, прогуляться и сказать Китаю «до свидания».",
      "Позади — Великая Китайская стена, хутуны и буддийские храмы, тропические джунгли, гала-ужин и десятки новых впечатлений. Впереди — дорога домой.",
      "Только теперь с фотографиями, историями и воспоминаниями, которых точно хватит надолго.",
    ],
  },
];

const IMPORTANT = {
  intro: "Несколько вещей, которые стоит сделать уже сейчас, чтобы поездка прошла комфортнее:",
  items: [
    ["WeChat", "установите заранее: это наш основной мессенджер в поездке"],
    ["Alipay", "установите и привяжите карту: в Китае почти всё оплачивается по QR-коду"],
    ["Туристическая eSIM для интернета", "например, на trip.com"],
    ["Офлайн-переводчик", "лучше заранее скачайте языковой пакет"],
    ["Офлайн-карты Maps.me или Organic Maps", "чтобы не потеряться"],
  ],
};

/* ===================================================================== */

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const LS = { had: "pd-had-all", org: "pd-org" };
const MONTHS = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
const WD = ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"];
const WD_SHORT = ["вс","пн","вт","ср","чт","пт","сб"];

const ICON = {
  play: '<svg class="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
  pause: '<svg class="i-pause" viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
  lock: '<svg viewBox="0 0 24 24"><path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm-7-2a2 2 0 0 1 4 0v2h-4zm3 9.7V18h-2v-1.3a2 2 0 1 1 2 0z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.4 14.2-4.3-4.3 1.4-1.4 2.9 2.9 5.9-5.9 1.4 1.4z"/></svg>',
  hourglass: '<svg viewBox="0 0 24 24"><path d="M6 2h12v5l-4 5 4 5v5H6v-5l4-5-4-5zm2 2v2.3L12 11l4-4.7V4z"/></svg>',
  share: '<svg class="share" viewBox="0 0 24 24"><path d="M12 2 7.5 6.5l1.4 1.4L11 5.8V15h2V5.8l2.1 2.1 1.4-1.4zM5 10v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10h-2v10H7V10z"/></svg>',
};

/* ---------- Время ---------- */
// Всё считаем по абсолютному моменту (UTC), а показываем по пекинскому времени.
const OFFSET_MIN = (() => { const m = TRIP.tzOffset.match(/([+-])(\d\d):(\d\d)/); return (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +m[3]); })();
const now = () => Date.now();
const unlockAt = (d) => Date.parse(d.task.unlock || `${d.date}T${TRIP.unlockTime}:00${TRIP.tzOffset}`);
const localParts = (ms) => { const t = new Date(ms + OFFSET_MIN * 60000); return { y: t.getUTCFullYear(), mo: t.getUTCMonth(), d: t.getUTCDate(), h: t.getUTCHours(), mi: t.getUTCMinutes(), wd: t.getUTCDay() }; };
const pad = (n) => String(n).padStart(2, "0");
const dayParts = (d) => { const [y, m, dd] = d.date.split("-").map(Number); const wd = new Date(Date.UTC(y, m - 1, dd)).getUTCDay(); return { y, m, dd, wd }; };
const tripToday = () => { const p = localParts(now()); return `${p.y}-${pad(p.mo + 1)}-${pad(p.d)}`; };
const isOrg = () => localStorage.getItem(LS.org) === "1";
const isOpen = (d) => isOrg() || now() >= unlockAt(d);

function lockText(d) {
  const at = unlockAt(d), p = localParts(at);
  const main = `Откроется ${p.d} ${MONTHS[p.mo]} в ${pad(p.h)}:${pad(p.mi)}`;
  let sub = `${TRIP.tzLabel[0].toUpperCase()}${TRIP.tzLabel.slice(1)}.`;
  const left = at - now();
  if (left > 0 && left < 24 * 3600e3) {
    const mins = Math.ceil(left / 60000), h = Math.floor(mins / 60), m = mins % 60;
    sub += h ? ` Осталось ${h} ч ${m} мин` : ` Осталось ${m} мин`;
  } else {
    // Если телефон ещё живёт по домашнему времени — подскажем, когда это по его часам
    const dev = new Date(at);
    if (-dev.getTimezoneOffset() !== OFFSET_MIN) {
      sub += ` На вашем телефоне: ${dev.getDate()} ${MONTHS[dev.getMonth()]}, ${pad(dev.getHours())}:${pad(dev.getMinutes())}`;
    }
  }
  return { main, sub };
}

/* ---------- IndexedDB: аудио хранится как blob ---------- */
let dbp;
function db() {
  if (!dbp) dbp = new Promise((res, rej) => {
    const r = indexedDB.open("put-drakona", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("audio");
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbp;
}
async function idb(mode, fn) {
  const d = await db();
  return new Promise((res, rej) => {
    const tx = d.transaction("audio", mode), st = tx.objectStore("audio");
    const r = fn(st);
    tx.oncomplete = () => res(r && r.result);
    tx.onerror = () => rej(tx.error);
    tx.onabort = () => rej(tx.error);
  });
}
const idbGetAll = () => new Promise(async (res, rej) => {
  const d = await db(); const out = new Map();
  const tx = d.transaction("audio", "readonly"); const c = tx.objectStore("audio").openCursor();
  c.onsuccess = () => { const cur = c.result; if (cur) { out.set(cur.key, cur.value); cur.continue(); } };
  tx.oncomplete = () => res(out); tx.onerror = () => rej(tx.error);
});
const idbPut = (k, v) => idb("readwrite", (s) => s.put(v, k));
const idbDel = (k) => idb("readwrite", (s) => s.delete(k));

/* ---------- Состояние ---------- */
const S = {
  sel: 0,
  saved: new Map(),     // url → objectURL (готово к мгновенному воспроизведению)
  busy: false, doneN: 0, fileP: 0, error: "",
  current: -1,          // индекс дня, чья запись в плеере
  installEvt: null,
};
const tracks = () => [...new Set(DAYS.map((d) => d.task && d.task.audio).filter(Boolean))];

async function loadSaved() {
  try {
    const all = await idbGetAll(), want = new Set(tracks());
    for (const [k, v] of all) {
      if (!want.has(k)) { idbDel(k); continue; }       // старые/переименованные файлы
      if (v && v.blob && v.blob.size) S.saved.set(k, URL.createObjectURL(v.blob));
    }
  } catch (e) { S.error = "Браузер не даёт сохранять записи. Откройте гид в Safari или Chrome, не в режиме инкогнито."; }
}

async function fetchBlob(url, onP) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = /\.m4a$|\.aac$/i.test(url) ? "audio/mp4" : "audio/mpeg";
  const total = +res.headers.get("content-length") || 0;
  if (!res.body || !total) return new Blob([await res.arrayBuffer()], { type });
  const rd = res.body.getReader(), parts = []; let got = 0;
  for (;;) { const { done, value } = await rd.read(); if (done) break; parts.push(value); got += value.length; onP(got / total); }
  return new Blob(parts, { type });
}

async function downloadAll() {
  if (S.busy) return;
  if (!navigator.onLine) { toast("Нет интернета. Подключитесь к Wi-Fi и нажмите ещё раз."); return; }
  S.busy = true; S.error = ""; const list = tracks();
  S.doneN = list.filter((u) => S.saved.has(u)).length; renderStatus();
  for (let i = 0; i < list.length; i++) {
    const url = list[i]; if (S.saved.has(url)) continue;
    S.fileP = 0; renderStatus();
    try {
      const blob = await fetchBlob(url, (p) => { S.fileP = p; paintBar(); });
      await idbPut(url, { blob, at: Date.now() });
      S.saved.set(url, URL.createObjectURL(blob)); S.doneN++;
    } catch (e) {
      S.error = `Загрузка прервалась на записи ${S.doneN + 1} из ${list.length}. Проверьте интернет и нажмите «Докачать» — уже сохранённые записи не пропадут.`;
      break;
    }
  }
  S.busy = false;
  if (tracks().every((u) => S.saved.has(u))) {
    localStorage.setItem(LS.had, "1");
    try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) {}
  }
  renderStatus(); renderDay();
}

/* ---------- Платформа ---------- */
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isStandalone = () => navigator.standalone === true || matchMedia("(display-mode: standalone)").matches;
addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); S.installEvt = e; renderStatus(); });

/* ---------- Плашка статуса ---------- */
function paintBar() {
  const b = document.querySelector("#status .bar i"); if (!b) return;
  const n = tracks().length; b.style.width = `${Math.min(100, ((S.doneN + S.fileP) / n) * 100)}%`;
  const t = document.querySelector("#status h2"); if (t && S.busy) t.textContent = `Сохраняю записи: ${Math.min(S.doneN + 1, n)} из ${n}`;
}

function renderStatus() {
  const el = $("status"), n = tracks().length, have = tracks().filter((u) => S.saved.has(u)).length;
  const org = isOrg() ? `<div class="org">Режим организатора: все задания открыты. <button class="linkbtn" data-act="org-off">Выключить</button></div>` : "";
  el.className = "status";

  if (S.busy) {
    el.innerHTML = `<h2></h2><div class="bar"><i></i></div><p>Не закрывайте страницу до конца загрузки.</p>`;
    paintBar(); return;
  }
  if (have === n && n > 0 && !S.error) {
    el.className = "status ok";
    el.innerHTML = `${ICON.check}<h2>Все записи сохранены. Гид работает без интернета.</h2>${org}`;
    return;
  }

  const lost = localStorage.getItem(LS.had) === "1" && have < n;
  let h, p, btn;
  if (lost) {
    el.className = "status bad";
    h = "Часть записей удалена с телефона";
    p = `Сохранено ${have} из ${n}. Подключитесь к интернету и скачайте заново.`;
    btn = "Скачать заново";
  } else if (have === 0) {
    h = "Записи ещё не сохранены";
    p = "Скачайте их заранее, дома по Wi-Fi, — в Китае гид будет работать без интернета.";
    btn = "Скачать всё";
  } else {
    h = `Сохранено ${have} из ${n}`;
    p = "Докачайте остальные, пока есть интернет.";
    btn = "Докачать";
  }
  if (S.error) { p = S.error; if (!lost) el.className = "status bad"; }

  let hint = "";
  if (isIOS && !isStandalone()) {
    hint = `<div class="hint"><b>Сначала добавьте гид на экран «Домой».</b> В Safari нажмите ${ICON.share} «Поделиться» → «На экран „Домой“». Потом откройте гид с иконки и скачайте записи уже там: из обычного Safari они сотрутся через неделю.</div>`;
  }
  const inst = S.installEvt ? `<button class="btn ghost" data-act="install">Установить на телефон</button>` : "";
  el.innerHTML = `<h2>${h}</h2><p>${p}</p>${hint}<div class="row"><button class="btn" data-act="dl">${btn}</button>${inst}</div>${org}`;
}

/* ---------- Вкладки ---------- */
function renderTabs() {
  const today = tripToday();
  $("tabs").innerHTML = DAYS.map((d, i) => {
    const p = dayParts(d);
    return `<button class="tab${d.date === today ? " today" : ""}" role="tab" aria-selected="${i === S.sel}" data-day="${i}">
      <small>День ${i + 1}</small><span>${pad(p.dd)}.${pad(p.m)}</span></button>`;
  }).join("");
  const a = $("tabs").querySelector('[aria-selected="true"]');
  if (a) a.scrollIntoView({ block: "nearest", inline: "center" });
}

/* ---------- День ---------- */
function para(t) {
  if (t.startsWith("**")) return `<p class="strong${para.first ? " lead" : ""}">${esc(t.slice(2))}</p>`;
  if (t.startsWith("!!")) return `<p class="accent">${esc(t.slice(2))}</p>`;
  return `<p>${esc(t)}</p>`;
}

function taskHTML(d, i, justOpened) {
  const t = d.task;
  if (!t || !t.audio) {
    return `<div class="task pending"><div class="lock">${ICON.hourglass}</div><div class="tt"><h3>${esc((t && t.title) || "Задание дня")}</h3><p>Запись готовится</p></div></div>`;
  }
  if (!isOpen(d)) {
    const l = lockText(d);
    return `<div class="task locked" data-lock="${i}"><div class="lock">${ICON.lock}</div><div class="tt"><h3>${esc(t.title)}</h3><p>${esc(l.main)}</p>${l.sub ? `<p class="sub">${esc(l.sub)}</p>` : ""}</div></div>`;
  }
  const playing = S.current === i && !A.paused;
  const note = t.hint || (S.saved.has(t.audio) ? "Запись открыта. Слушайте, когда будете готовы." : "Запись открыта, но не сохранена на телефон.");
  return `<div class="task${playing ? " playing" : ""}${justOpened ? " just-opened" : ""}" data-task="${i}">
    <div class="tt"><h3>${esc(t.title)}</h3><p>${esc(note)}</p></div>
    <button class="go" data-play="${i}" aria-label="${playing ? "Пауза" : "Слушать задание"}">${ICON.play}${ICON.pause}</button></div>`;
}

function renderDay(justOpened) {
  const i = S.sel, d = DAYS[i], p = dayParts(d);
  para.first = true;
  const story = (d.text || []).map((t, k) => { const h = para(t); para.first = false; return h; }).join("");
  const sched = (d.schedule || []).length
    ? `<ul class="sched">${d.schedule.map(([tm, what, acc]) => `<li${acc ? ' class="accent"' : ""}><time>${esc(tm)}</time><span>${esc(what)}</span></li>`).join("")}</ul>` : "";
  const imp = d.important
    ? `<section class="panel solo imp"><h2>Важное<i>:</i></h2><p>${esc(IMPORTANT.intro)}</p><ul>${IMPORTANT.items.map(([b, t]) => `<li><b>${esc(b)}</b> — ${esc(t)}</li>`).join("")}</ul></section>` : "";

  $("day").innerHTML = `<article class="day">
    <div class="hero"><img src="${esc(d.img)}" alt="" style="object-position:${d.imgPos || "50% 50%"}"><div class="pill">${esc(d.title)}</div></div>
    <section class="panel first">
      <div class="dhead"><h1>День ${i + 1}</h1><div class="date">${pad(p.dd)}.${pad(p.m)}<i>|</i>${WD[p.wd]}</div></div>
      ${taskHTML(d, i, justOpened)}
      ${sched}
    </section>
    <section class="panel solo story">${story}</section>
    ${imp}
  </article>`;
}

function selectDay(i) {
  S.sel = i; renderTabs(); renderDay();
  const y = $("day").getBoundingClientRect().top + scrollY - $("tabs").offsetHeight;
  if (scrollY > y) scrollTo(0, y);
}

/* ---------- Плеер ---------- */
const A = new Audio(); A.preload = "auto";
const fmt = (s) => { s = Math.max(0, Math.floor(s || 0)); return `${Math.floor(s / 60)}:${pad(s % 60)}`; };
const absUrl = (u) => new URL(u, location.href).href;

function playDay(i) {
  const d = DAYS[i]; if (!d.task || !d.task.audio || !isOpen(d)) return;
  if (S.current === i && A.src) { A.paused ? A.play() : A.pause(); return; }
  let src = S.saved.get(d.task.audio);
  if (!src) {
    if (!navigator.onLine) { toast("Эта запись не сохранена на телефон. Подключитесь к интернету и нажмите «Скачать всё»."); return; }
    src = d.task.audio;   // есть сеть — играем напрямую
  }
  S.current = i;
  A.src = src; A.play().catch(() => toast("Не удалось включить запись. Нажмите ещё раз."));
  const p = dayParts(d);
  $("plThumb").src = d.img;
  $("plTitle").textContent = `День ${i + 1}. ${d.task.title}`;
  $("plSub").textContent = `${pad(p.dd)}.${pad(p.m)}, ${d.title}`;
  $("player").hidden = false; document.body.classList.add("has-player");
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: `День ${i + 1}. ${d.task.title}`, artist: TRIP.name, album: d.title,
      artwork: [{ src: absUrl(d.img), sizes: "1200x408", type: "image/jpeg" }, { src: absUrl("assets/icon-512.png"), sizes: "512x512", type: "image/png" }],
    });
  }
}

function syncPlaying() {
  const on = !A.paused && !A.ended;
  $("player").classList.toggle("playing", on);
  $("plToggle").setAttribute("aria-label", on ? "Пауза" : "Слушать");
  document.querySelectorAll(".task[data-task]").forEach((el) => el.classList.toggle("playing", on && +el.dataset.task === S.current));
  if ("mediaSession" in navigator) navigator.mediaSession.playbackState = on ? "playing" : "paused";
}
let seeking = false;
A.addEventListener("play", syncPlaying);
A.addEventListener("pause", syncPlaying);
A.addEventListener("ended", syncPlaying);
A.addEventListener("loadedmetadata", () => { $("plDur").textContent = fmt(A.duration); });
A.addEventListener("timeupdate", () => {
  $("plCur").textContent = fmt(A.currentTime);
  if (!seeking && A.duration) $("plRange").value = Math.round((A.currentTime / A.duration) * 1000);
  if ("mediaSession" in navigator && A.duration && navigator.mediaSession.setPositionState) {
    try { navigator.mediaSession.setPositionState({ duration: A.duration, position: A.currentTime, playbackRate: 1 }); } catch (e) {}
  }
});
$("plToggle").onclick = () => { A.paused ? A.play() : A.pause(); };
$("plBack").onclick = () => { A.currentTime = Math.max(0, A.currentTime - 15); };
$("plFwd").onclick = () => { if (A.duration) A.currentTime = Math.min(A.duration - 0.5, A.currentTime + 15); };
$("plRange").addEventListener("input", () => { seeking = true; if (A.duration) $("plCur").textContent = fmt((A.duration * $("plRange").value) / 1000); });
$("plRange").addEventListener("change", () => { if (A.duration) A.currentTime = (A.duration * $("plRange").value) / 1000; seeking = false; });
if ("mediaSession" in navigator) {
  const ms = navigator.mediaSession, set = (a, f) => { try { ms.setActionHandler(a, f); } catch (e) {} };
  set("play", () => A.play()); set("pause", () => A.pause());
  set("seekbackward", () => { A.currentTime = Math.max(0, A.currentTime - 15); });
  set("seekforward", () => { A.currentTime = Math.min(A.duration || 0, A.currentTime + 15); });
  set("seekto", (e) => { A.currentTime = e.seekTime; });
}

/* ---------- Мелочи ---------- */
let toastT;
function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 4200); }

async function sha256(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// Скрытый вход организатора: удерживать обложку 1,5 секунды
(() => {
  const c = $("cover"); let t;
  const start = () => { c.classList.add("pressing"); t = setTimeout(async () => {
    c.classList.remove("pressing");
    if (isOrg()) { toast("Режим организатора уже включён"); return; }
    const pw = prompt("Пароль организатора");
    if (!pw) return;
    try {
      if ((await sha256(pw.trim())) === TRIP.orgHash) { localStorage.setItem(LS.org, "1"); toast("Все задания открыты на этом телефоне"); renderStatus(); renderDay(); }
      else toast("Неверный пароль");
    } catch (e) { toast("Режим организатора работает только по https"); }
  }, 1500); };
  const stop = () => { c.classList.remove("pressing"); clearTimeout(t); };
  c.addEventListener("pointerdown", start); ["pointerup", "pointerleave", "pointercancel"].forEach((e) => c.addEventListener(e, stop));
  c.addEventListener("contextmenu", (e) => e.preventDefault());
})();

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-day],[data-play],[data-act]"); if (!b) return;
  if (b.dataset.day) selectDay(+b.dataset.day);
  else if (b.dataset.play) playDay(+b.dataset.play);
  else if (b.dataset.act === "dl") downloadAll();
  else if (b.dataset.act === "install" && S.installEvt) { S.installEvt.prompt(); S.installEvt = null; renderStatus(); }
  else if (b.dataset.act === "org-off") { localStorage.removeItem(LS.org); renderStatus(); renderDay(); }
});

// Раз в 20 секунд проверяем, не пора ли открыть задание
let lastOpen = DAYS.map(isOpen);
function tick() {
  const open = DAYS.map(isOpen);
  const changed = open.some((o, i) => o !== lastOpen[i]);
  const newlyOpenSel = open[S.sel] && !lastOpen[S.sel];
  lastOpen = open;
  if (changed) { renderTabs(); renderDay(newlyOpenSel); }
  else if (!open[S.sel]) { const l = document.querySelector(".task.locked"); if (l) renderDay(); }
}
setInterval(tick, 20000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
addEventListener("online", renderStatus); addEventListener("offline", renderStatus);

/* ---------- Старт ---------- */
(async function init() {
  const today = tripToday();
  const idx = DAYS.findIndex((d) => d.date === today);
  S.sel = idx >= 0 ? idx : today > DAYS[DAYS.length - 1].date ? DAYS.length - 1 : 0;
  $("ver").textContent = `Версия ${TRIP.version}`;
  renderTabs(); renderDay();
  await loadSaved();
  renderStatus(); renderDay();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
