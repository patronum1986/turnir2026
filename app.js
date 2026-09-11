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
  version: "v4",               // для подписи внизу; держите в паре с CACHE в sw.js
};

/* Форматирование абзацев в text: "**…" — жирный абзац, "!!…" — красный акцент.
   Аудиозадания здесь НЕ описываются — они в tasks.json и заполняются через админ-панель
   (режим организатора → «Изменить задание» под карточкой дня). */
const DAYS = [
  {
    date: "2026-10-24", title: "В путь!", img: "assets/img/d1.jpg", imgPos: "50% 100%",
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

/* Контакты организаторов. phone — в международном формате, wechat — ID (не номер), telegram — без @.
   Пустое поле не показывается. */
const CONTACTS = [
  { name: "Имя Фамилия", role: "Руководитель поездки", phone: "+7 900 000-00-00", wechat: "wechat_id", telegram: "username" },
  { name: "Имя Фамилия", role: "Координатор группы", phone: "+7 900 000-00-00", wechat: "wechat_id", telegram: "" },
  { name: "Имя Фамилия", role: "Гид на месте, говорит по-русски", phone: "+86 130 0000 0000", wechat: "wechat_id", telegram: "" },
];

/* Отели — карточка «показать таксисту». Китайские названия ПРОВЕРИТЬ у принимающей стороны. */
const PLACES = [
  { name: "Hilton Beijing Wangfujing", zh: "北京王府井希尔顿酒店", note: "Пекин, 25–27 и 30–31 октября", phone: "" },
  { name: "Raffles Clear Water Bay", zh: "海南清水湾莱佛士度假酒店", note: "Санья, 27–30 октября", phone: "" },
];

/* ===================================================================== */

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const LS = { had: "pd-had-all", org: "pd-org", people: "pd-people-draft", tasks: "pd-tasks-draft", view: "pd-view" };
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
const unlockAt = (d) => Date.parse(T(d).unlock || `${d.date}T${TRIP.unlockTime}:00${TRIP.tzOffset}`);
const localParts = (ms) => { const t = new Date(ms + OFFSET_MIN * 60000); return { y: t.getUTCFullYear(), mo: t.getUTCMonth(), d: t.getUTCDate(), h: t.getUTCHours(), mi: t.getUTCMinutes(), wd: t.getUTCDay() }; };
const pad = (n) => String(n).padStart(2, "0");
const dayParts = (d) => { const [y, m, dd] = d.date.split("-").map(Number); const wd = new Date(Date.UTC(y, m - 1, dd)).getUTCDay(); return { y, m, dd, wd }; };
const tripToday = () => { const p = localParts(now()); return `${p.y}-${pad(p.mo + 1)}-${pad(p.d)}`; };
const isOrg = () => localStorage.getItem(LS.org) === "1";
/* Задание дня = запись из tasks.json (или черновик организатора на этом телефоне) */
const T = (d) => Object.assign({ title: "Задание дня", audio: "", hint: "", open: false }, (S.tasks || {})[d.date] || {});
const isOpen = (d) => isOrg() || T(d).open === true || now() >= unlockAt(d);

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
  tasks: {}, fileTasks: {}, tasksDraft: false, tasksLoaded: false, taskEdit: -1, pendingAudio: null,
  saved: new Map(),     // url → objectURL (готово к мгновенному воспроизведению)
  busy: false, doneN: 0, fileP: 0, error: "",
  current: -1,          // индекс дня, чья запись в плеере
  installEvt: null,
};
const tracks = () => [...new Set(DAYS.map((d) => T(d).audio).filter(Boolean))];

async function loadSaved() {
  try {
    const all = await idbGetAll(), want = new Set(tracks());
    for (const [k, v] of all) {
      if (!want.has(k)) { if (S.tasksLoaded && !S.tasksDraft) idbDel(k); continue; } // старые/переименованные файлы
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
  const org = isOrg() ? `<div class="org">Режим организатора: все задания открыты. <button class="linkbtn" data-act="org-off">Выключить</button>${hasDraft() ? `<div class="draft">Есть правки, которых пока нет на сайте. <button class="linkbtn" data-act="pack">Скачать пакет для сайта</button> · <button class="linkbtn" data-act="pack-clear">Правки уже выложены</button></div>` : ""}</div>` : "";
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
  const t = T(d);
  let card;
  if (!t.audio) {
    card = `<div class="task pending"><div class="lock">${ICON.hourglass}</div><div class="tt"><h3>${esc(t.title)}</h3><p>Запись готовится</p></div></div>`;
  } else if (!isOpen(d)) {
    const l = lockText(d);
    card = `<div class="task locked" data-lock="${i}"><div class="lock">${ICON.lock}</div><div class="tt"><h3>${esc(t.title)}</h3><p>${esc(l.main)}</p>${l.sub ? `<p class="sub">${esc(l.sub)}</p>` : ""}</div></div>`;
  } else {
    const playing = S.current === i && !A.paused;
    const note = t.hint || (S.saved.has(t.audio) ? "Запись открыта. Слушайте, когда будете готовы." : "Запись открыта, но не сохранена на телефон.");
    card = `<div class="task${playing ? " playing" : ""}${justOpened ? " just-opened" : ""}" data-task="${i}">
      <div class="tt"><h3>${esc(t.title)}</h3><p>${esc(note)}</p></div>
      <button class="go" data-play="${i}" aria-label="${playing ? "Пауза" : "Слушать задание"}">${ICON.play}${ICON.pause}</button></div>`;
  }
  return card + (isOrg() ? taskAdminHTML(d, i, t) : "");
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
  const d = DAYS[i], t = T(d); if (!t.audio || !isOpen(d)) return;
  if (S.current === i && A.src) { A.paused ? A.play() : A.pause(); return; }
  let src = S.saved.get(t.audio);
  if (!src) {
    if (!navigator.onLine) { toast("Эта запись не сохранена на телефон. Подключитесь к интернету и нажмите «Скачать всё»."); return; }
    src = t.audio;   // есть сеть — играем напрямую
  }
  S.current = i;
  A.src = src; A.play().catch(() => toast("Не удалось включить запись. Нажмите ещё раз."));
  const p = dayParts(d);
  $("plThumb").src = d.img;
  $("plTitle").textContent = `День ${i + 1}. ${t.title}`;
  $("plSub").textContent = `${pad(p.dd)}.${pad(p.m)}, ${d.title}`;
  $("player").hidden = false; document.body.classList.add("has-player");
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: `День ${i + 1}. ${t.title}`, artist: TRIP.name, album: d.title,
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
  else if (b.dataset.act === "org-off") { localStorage.removeItem(LS.org); S.edit = false; renderStatus(); renderDay(); }
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


/* =====================================================================
   РАЗДЕЛЫ: Программа / Участники / Контакты
   ===================================================================== */
const VIEWS = ["program", "people", "contacts"];
S.view = VIEWS.includes(localStorage.getItem(LS.view)) ? localStorage.getItem(LS.view) : "program";
S.people = []; S.filePeople = []; S.draft = false; S.edit = false; S.editId = null; S.q = ""; S.photo = "";

function showView(v) {
  S.view = v; localStorage.setItem(LS.view, v);
  VIEWS.forEach((k) => { $("view-" + k).hidden = k !== v; });
  document.querySelectorAll(".nav button").forEach((b) => b.setAttribute("aria-current", b.dataset.view === v ? "page" : "false"));
  if (v === "people") renderPeople();
  if (v === "contacts") renderContacts();
  scrollTo(0, 0);
}

/* ---------- Участники ---------- */
const PEOPLE_URL = "participants.json";
const AVA_COLORS = ["#FF0A3C", "#C9971E", "#12875A", "#2F6FD6", "#8A4FBF", "#D6672F", "#0F8F9E"];
const initials = (n) => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
const hue = (n) => AVA_COLORS[[...n].reduce((a, c) => a + c.charCodeAt(0), 0) % AVA_COLORS.length];
const avatar = (p, cls = "ava") => p.photo
  ? `<span class="${cls}"><img src="${p.photo}" alt=""></span>`
  : `<span class="${cls}" style="background:${hue(p.name || "?")}">${esc(initials(p.name || "?"))}</span>`;
const uid = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-3);

function readDraft() {
  try { const j = JSON.parse(localStorage.getItem(LS.people) || "null"); if (j && Array.isArray(j.people)) { S.people = j.people; S.draft = true; } } catch (e) {}
}
function saveDraft() {
  localStorage.setItem(LS.people, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), people: S.people }));
  S.draft = true;
}
async function loadPeople() {
  readDraft();
  try {
    const r = await fetch(PEOPLE_URL, { cache: "no-store" });
    if (r.ok) { const j = await r.json(); S.filePeople = Array.isArray(j.people) ? j.people : []; if (!S.draft) S.people = S.filePeople; }
  } catch (e) {}
  if (S.view === "people") renderPeople();
}

function renderPeople() {
  const el = $("view-people"), org = isOrg();
  const q = S.q.trim().toLowerCase();
  const list = S.people.filter((p) => !q || (p.name + " " + (p.bank || "")).toLowerCase().includes(q));
  const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name, "ru"));
  const rows = (arr) => arr.map((p) => `<div class="prow">${avatar(p)}<div><div class="pname">${esc(p.name)}</div><div class="pbank">${esc(p.bank || "")}</div></div>
    ${S.edit ? `<div class="acts"><button class="icobtn" data-pedit="${p.id}" aria-label="Изменить"><svg viewBox="0 0 24 24"><path d="M3 17.3V21h3.7L17.8 9.9l-3.7-3.7zm17.7-10.2a1 1 0 0 0 0-1.4l-2.4-2.4a1 1 0 0 0-1.4 0l-1.8 1.8 3.7 3.7z"/></svg></button><button class="icobtn" data-pdel="${p.id}" aria-label="Удалить"><svg viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"/></svg></button></div>` : ""}</div>`).join("");
  const body = list.length
    ? `<section class="group">${rows(sorted)}</section>`
    : `<div class="empty">${S.people.length ? "Никого не нашлось" : "Список участников пока пуст"}</div>`;

  const banks = [...new Set(S.people.map((p) => p.bank).filter(Boolean))].sort();
  const cur = S.editId ? S.people.find((p) => p.id === S.editId) : null;
  const form = S.edit ? `<form class="form" id="pform">
    <div class="photo-pick">${avatar({ name: cur ? cur.name : "?", photo: S.photo })}<div>
      <label class="btn ghost" style="display:inline-block">${S.photo ? "Заменить фото" : "Добавить фото"}<input type="file" accept="image/*" id="pphoto" hidden></label>
      ${S.photo ? ` <button type="button" class="linkbtn" data-act="photo-clear">убрать</button>` : ""}</div></div>
    <label for="pname">ФИО</label><input type="text" id="pname" required autocomplete="off" value="${esc(cur ? cur.name : "")}" placeholder="Фамилия Имя">
    <label for="pbank">Банк</label><input type="text" id="pbank" list="banks" autocomplete="off" value="${esc(cur ? cur.bank || "" : "")}" placeholder="Название банка"><datalist id="banks">${banks.map((b) => `<option value="${esc(b)}">`).join("")}</datalist>
    <div class="row"><button class="btn" type="submit">${cur ? "Сохранить" : "Добавить"}</button>${cur ? `<button class="btn ghost" type="button" data-act="pcancel">Отмена</button>` : ""}</div></form>` : "";

  const tools = S.edit ? `<div class="row tools">
      <button class="btn ghost" data-act="pack">Скачать пакет для сайта</button>
      <label class="btn ghost">Загрузить из файла<input type="file" accept="application/json,.json" id="pimport" hidden></label>
      ${S.draft ? `<button class="btn ghost" data-act="preset">Отменить правки</button>` : ""}
      <button class="btn" data-act="pdone">Готово</button></div>` : "";
  const draft = S.draft ? `<div class="draft">Правки пока только на этом телефоне. Чтобы их увидели участники: «Скачать пакет для сайта» → распаковать в папку сайта → закоммитить.</div>` : "";
  const edit = org && !S.edit ? `<div class="row tools"><button class="btn" data-act="pedit-on">Редактировать список</button></div>` : "";

  el.innerHTML = `<div class="sec"><div class="sec-head"><h1>Участники</h1><span class="cnt">${S.people.length}</span></div>
    ${draft}${edit}${form}${tools}
    <input class="search" type="search" id="pq" placeholder="Поиск по имени или банку" value="${esc(S.q)}">
    ${body}</div>`;
  const pq = $("pq"); pq.oninput = () => { const pos = pq.selectionStart; S.q = pq.value; renderPeople(); const n = $("pq"); n.focus(); n.setSelectionRange(pos, pos); };
  const ph = $("pphoto"); if (ph) ph.onchange = () => ph.files[0] && shrinkPhoto(ph.files[0]).then((d) => { S.photo = d; renderPeople(); }).catch(() => toast("Не удалось открыть фото"));
  const pi = $("pimport"); if (pi) pi.onchange = () => pi.files[0] && importPeople(pi.files[0]);
  const f = $("pform"); if (f) f.onsubmit = (e) => {
    e.preventDefault();
    const name = $("pname").value.trim(), bank = $("pbank").value.trim();
    if (!name) { $("pname").focus(); return; }
    if (cur) Object.assign(cur, { name, bank, photo: S.photo });
    else S.people.push({ id: uid(), name, bank, photo: S.photo });
    saveDraft(); S.editId = null; S.photo = ""; renderPeople(); toast(cur ? "Сохранено" : `${name} — в списке`);
  };
}

function shrinkPhoto(file, size = 192) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas"); c.width = c.height = size;
      const s = Math.min(img.width, img.height), sx = (img.width - s) / 2, sy = (img.height - s) / 2;
      c.getContext("2d").drawImage(img, sx, sy, s, s, 0, 0, size, size);
      URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(); };
    img.src = url;
  });
}
const peopleJSON = () => JSON.stringify({ updated: new Date().toISOString().slice(0, 10), people: S.people }, null, 1);
async function importPeople(file) {
  try { const j = JSON.parse(await file.text()); if (!Array.isArray(j.people)) throw 0; S.people = j.people.map((p) => ({ id: p.id || uid(), name: p.name || "", bank: p.bank || "", photo: p.photo || "" })); saveDraft(); renderPeople(); toast(`Загружено: ${S.people.length}`); }
  catch (e) { toast("Это не файл participants.json"); }
}

/* ---------- Контакты ---------- */
function renderContacts() {
  const ic = {
    call: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z"/></svg>',
    copy: '<svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11z"/></svg>',
  };
  const people = CONTACTS.map((c) => `<section class="ccard"><div class="who">${avatar(c)}<div><div class="pname">${esc(c.name)}</div><div class="role">${esc(c.role || "")}</div></div></div>
    <div class="links">${c.phone ? `<a class="call" href="tel:${esc(c.phone.replace(/[^\d+]/g, ""))}">${ic.call}${esc(c.phone)}</a>` : ""}
    ${c.wechat ? `<button data-copy="${esc(c.wechat)}">${ic.chat}WeChat: ${esc(c.wechat)}</button>` : ""}
    ${c.telegram ? `<a href="https://t.me/${esc(c.telegram)}" target="_blank" rel="noopener">${ic.chat}Telegram</a>` : ""}</div></section>`).join("");
  const places = PLACES.map((p) => `<section class="ccard"><div class="pname">${esc(p.name)}</div><div class="role">${esc(p.note || "")}</div>
    <div class="zh">${esc(p.zh || "")}</div><div class="links">${p.zh ? `<button data-copy="${esc(p.zh)}">${ic.copy}Скопировать название</button>` : ""}${p.phone ? `<a class="call" href="tel:${esc(p.phone.replace(/[^\d+]/g, ""))}">${ic.call}${esc(p.phone)}</a>` : ""}</div></section>`).join("");
  $("view-contacts").innerHTML = `<div class="sec"><div class="sec-head"><h1>Контакты</h1></div>${people}
    <p class="note">В Китае Telegram и WhatsApp не работают без VPN. Основная связь — WeChat, звонки — по местной eSIM.</p>
    <div class="sec-head"><h1 class="h2">Отели</h1></div><p class="note">Покажите китайское название таксисту.</p>${places}</div>`;
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-view],[data-copy],[data-pedit],[data-pdel],[data-tedit],[data-act]"); if (!b) return;
  if (b.dataset.view) showView(b.dataset.view);
  else if (b.dataset.tedit) { S.taskEdit = +b.dataset.tedit; S.pendingAudio = null; renderDay(); const f = $("tform"); if (f) f.scrollIntoView({ block: "center" }); }
  else if (b.dataset.copy) { navigator.clipboard && navigator.clipboard.writeText(b.dataset.copy).then(() => toast("Скопировано")).catch(() => toast(b.dataset.copy)); }
  else if (b.dataset.pedit) { const p = S.people.find((x) => x.id === b.dataset.pedit); if (p) { S.editId = p.id; S.photo = p.photo || ""; renderPeople(); $("pname").focus(); } }
  else if (b.dataset.pdel) { const p = S.people.find((x) => x.id === b.dataset.pdel); if (p && confirm(`Удалить: ${p.name}?`)) { S.people = S.people.filter((x) => x !== p); saveDraft(); renderPeople(); } }
  else switch (b.dataset.act) {
    case "pedit-on": S.edit = true; S.editId = null; S.photo = ""; renderPeople(); break;
    case "pdone": S.edit = false; S.editId = null; S.photo = ""; renderPeople(); break;
    case "pcancel": S.editId = null; S.photo = ""; renderPeople(); break;
    case "photo-clear": S.photo = ""; renderPeople(); break;
    case "pack": exportPack(); break;
    case "pack-clear": clearDrafts(); break;
    case "tcancel": cancelTaskEdit(); break;
    case "preset": if (confirm("Убрать все правки на этом телефоне и вернуть список с сайта?")) { localStorage.removeItem(LS.people); S.draft = false; S.people = S.filePeople; S.editId = null; renderPeople(); } break;
  }
});


/* ---------- Аудиозадания: tasks.json + админ-панель ---------- */
const TASKS_URL = "tasks.json";
const tasksJSON = () => JSON.stringify({ updated: new Date().toISOString().slice(0, 10), tasks: S.tasks }, null, 1);
function readTasksDraft() {
  try { const j = JSON.parse(localStorage.getItem(LS.tasks) || "null"); if (j && j.tasks) { S.tasks = j.tasks; S.tasksDraft = true; } } catch (e) {}
}
function saveTasksDraft() { localStorage.setItem(LS.tasks, tasksJSON()); S.tasksDraft = true; }
async function loadTasks() {
  readTasksDraft();
  try {
    const r = await fetch(TASKS_URL, { cache: "no-store" });
    if (r.ok) { const j = await r.json(); S.fileTasks = j.tasks || {}; S.tasksLoaded = true; if (!S.tasksDraft) S.tasks = S.fileTasks; }
  } catch (e) {}
}
const hasDraft = () => S.draft || S.tasksDraft;
const mb = (b) => `${(b / 1048576).toFixed(1).replace(".", ",")} МБ`;
const fileTracks = () => new Set(Object.values(S.fileTasks).map((t) => t.audio).filter(Boolean));

function taskAdminHTML(d, i, t) {
  if (S.taskEdit !== i) {
    const info = t.audio ? `${esc(t.file || t.audio.split("/").pop())}${t.dur ? " · " + fmt(t.dur) : ""}${t.size ? " · " + mb(t.size) : ""}${t.open ? " · открыто для теста" : ""}` : "записи нет";
    return `<div class="torg"><button class="linkbtn" data-tedit="${i}">Изменить задание</button><span>${info}</span></div>`;
  }
  const p = S.pendingAudio, cur = p ? p : (t.audio ? { key: t.audio, file: t.file || t.audio.split("/").pop(), dur: t.dur, size: t.size } : null);
  const fileLine = cur ? `<b>${esc(cur.file)}</b>${cur.dur ? " · " + fmt(cur.dur) : ""}${cur.size ? " · " + mb(cur.size) : ""}${cur.size > 15 * 1048576 ? ' <span class="warn">Больше 15 МБ — лучше пережать до 64–96 kbps моно</span>' : ""}` : "Записи нет";
  return `<form class="form tform" id="tform">
    <div class="tfile">${fileLine}</div>
    <div class="row"><label class="btn ghost">${cur ? "Заменить запись" : "Выбрать запись"}<input type="file" id="tfileInput" accept="audio/mpeg,audio/mp4,audio/x-m4a,audio/aac,.mp3,.m4a" hidden></label>${cur ? `<button type="button" class="btn ghost" data-act="tremove">Убрать запись</button>` : ""}</div>
    <label for="ttitle">Заголовок</label><input type="text" id="ttitle" value="${esc(t.title)}" autocomplete="off">
    <label for="thint">Подпись после открытия</label><input type="text" id="thint" value="${esc(t.hint || "")}" placeholder="Например: послушайте в автобусе по дороге к стене" autocomplete="off">
    <label class="chk"><input type="checkbox" id="topen"${t.open ? " checked" : ""}> Открыто всегда — для теста, перед поездкой снять</label>
    <div class="row"><button class="btn" type="submit">Сохранить</button><button class="btn ghost" type="button" data-act="tcancel">Отмена</button></div></form>`;
}

async function pickTaskAudio(file, i) {
  const ext = /\.m4a$|\.aac$|audio\/mp4|audio\/x-m4a|audio\/aac/i.test(file.name + file.type) ? "m4a" : "mp3";
  const key = `assets/audio/d${i + 1}-${Date.now().toString(36)}.${ext}`;
  const blob = new Blob([await file.arrayBuffer()], { type: ext === "m4a" ? "audio/mp4" : "audio/mpeg" });
  const dur = await new Promise((res) => { const a = new Audio(), u = URL.createObjectURL(blob); a.onloadedmetadata = () => { URL.revokeObjectURL(u); res(a.duration); }; a.onerror = () => { URL.revokeObjectURL(u); res(0); }; a.src = u; });
  if (S.pendingAudio) { idbDel(S.pendingAudio.key); S.saved.delete(S.pendingAudio.key); }
  await idbPut(key, { blob, at: Date.now(), draft: true });
  S.saved.set(key, URL.createObjectURL(blob));
  S.pendingAudio = { key, file: file.name, dur: Math.round(dur), size: blob.size };
  renderDay();
}
function cancelTaskEdit() {
  if (S.pendingAudio) { idbDel(S.pendingAudio.key); S.saved.delete(S.pendingAudio.key); S.pendingAudio = null; }
  S.taskEdit = -1; renderDay();
}
function saveTaskEdit(i) {
  const d = DAYS[i], t = Object.assign({}, T(d));
  t.title = $("ttitle").value.trim() || "Задание дня"; t.hint = $("thint").value.trim(); t.open = $("topen").checked;
  if (S.pendingAudio) {
    if (t.audio && t.audio !== S.pendingAudio.key && !fileTracks().has(t.audio)) { idbDel(t.audio); S.saved.delete(t.audio); } // прежний черновик
    Object.assign(t, { audio: S.pendingAudio.key, file: S.pendingAudio.file, dur: S.pendingAudio.dur, size: S.pendingAudio.size });
  } else if (S.taskRemove) {
    if (t.audio && !fileTracks().has(t.audio)) { idbDel(t.audio); S.saved.delete(t.audio); }
    t.audio = ""; delete t.file; delete t.dur; delete t.size;
  }
  if (!t.open) delete t.open;
  S.tasks = Object.assign({}, S.tasks, { [d.date]: t }); saveTasksDraft();
  S.pendingAudio = null; S.taskRemove = false; S.taskEdit = -1;
  if (S.current === i) { A.pause(); A.removeAttribute("src"); S.current = -1; $("player").hidden = true; document.body.classList.remove("has-player"); }
  renderStatus(); renderDay(); toast("Сохранено на этом телефоне");
}
document.addEventListener("change", (e) => {
  if (e.target.id === "tfileInput" && e.target.files[0]) { S.taskRemove = false; pickTaskAudio(e.target.files[0], S.taskEdit).catch(() => toast("Не удалось открыть файл")); }
});
document.addEventListener("submit", (e) => { if (e.target.id === "tform") { e.preventDefault(); saveTaskEdit(S.taskEdit); } });
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-act='tremove']"); if (!b) return;
  if (S.pendingAudio) { idbDel(S.pendingAudio.key); S.saved.delete(S.pendingAudio.key); S.pendingAudio = null; }
  S.taskRemove = true; const el = document.querySelector(".tfile"); if (el) el.textContent = "Записи нет";
  b.remove();
});

/* Пакет для сайта: zip с participants.json, tasks.json и новыми аудио — распаковать в корень сайта */
const CRC = (() => { const t = new Int32Array(256); for (let i = 0; i < 256; i++) { let c = i; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[i] = c; } return (b) => { let c = -1; for (let i = 0; i < b.length; i++) c = t[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ -1) >>> 0; }; })();
async function makeZip(files) {
  const enc = new TextEncoder(), parts = [], cd = []; let off = 0;
  const n = new Date(), tm = (n.getHours() << 11) | (n.getMinutes() << 5) | (n.getSeconds() >> 1), dt = ((n.getFullYear() - 1980) << 9) | ((n.getMonth() + 1) << 5) | n.getDate();
  for (const f of files) {
    const name = enc.encode(f.name), data = new Uint8Array(await f.blob.arrayBuffer()), crc = CRC(data);
    const h = new DataView(new ArrayBuffer(30)); h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x800, true); h.setUint16(10, tm, true); h.setUint16(12, dt, true); h.setUint32(14, crc, true); h.setUint32(18, data.length, true); h.setUint32(22, data.length, true); h.setUint16(26, name.length, true);
    parts.push(h.buffer, name, data);
    const c = new DataView(new ArrayBuffer(46)); c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x800, true); c.setUint16(12, tm, true); c.setUint16(14, dt, true); c.setUint32(16, crc, true); c.setUint32(20, data.length, true); c.setUint32(24, data.length, true); c.setUint16(28, name.length, true); c.setUint32(42, off, true);
    cd.push(c.buffer, name); off += 30 + name.length + data.length;
  }
  const cdLen = cd.reduce((a, b) => a + b.byteLength, 0);
  const e = new DataView(new ArrayBuffer(22)); e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cdLen, true); e.setUint32(16, off, true);
  return new Blob([...parts, ...cd, e.buffer], { type: "application/zip" });
}
async function exportPack() {
  const files = [];
  if (S.draft) files.push({ name: "participants.json", blob: new Blob([peopleJSON()]) });
  if (S.tasksDraft) {
    files.push({ name: "tasks.json", blob: new Blob([tasksJSON()]) });
    const had = fileTracks(), all = await idbGetAll();
    for (const key of tracks()) if (!had.has(key) && all.get(key)) files.push({ name: key, blob: all.get(key).blob });
  }
  if (!files.length) { toast("Правок нет — нечего выкладывать"); return; }
  const zip = await makeZip(files);
  const a = document.createElement("a"); a.href = URL.createObjectURL(zip); a.download = `put-drakona-pack-${new Date().toISOString().slice(0, 10)}.zip`; document.body.appendChild(a); a.click(); a.remove();
  toast(`Пакет: ${files.map((f) => f.name.split("/").pop()).join(", ")}. Распакуйте в папку сайта.`);
}
function clearDrafts() {
  if (!confirm("Пакет уже выложен на сайт? Черновики на телефоне будут заменены версией с сайта после обновления.")) return;
  localStorage.removeItem(LS.people); localStorage.removeItem(LS.tasks);
  S.draft = false; S.tasksDraft = false; S.people = S.filePeople; S.tasks = S.fileTasks;
  loadPeople(); loadTasks().then(() => { renderStatus(); renderDay(); });
  renderStatus(); renderDay(); toast("Черновики убраны");
}

/* ---------- Старт ---------- */
(async function init() {
  const today = tripToday();
  const idx = DAYS.findIndex((d) => d.date === today);
  S.sel = idx >= 0 ? idx : today > DAYS[DAYS.length - 1].date ? DAYS.length - 1 : 0;
  $("ver").textContent = `Версия ${TRIP.version}`;
  readTasksDraft();
  renderTabs(); renderDay();
  showView(S.view);
  await loadTasks();
  await loadSaved();
  renderStatus(); renderDay();
  loadPeople();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
