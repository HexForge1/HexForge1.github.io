(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };

  /* ------------------------------------------------------------------
     i18n
     ------------------------------------------------------------------ */
  const I18N = {
    en: {
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.stack": "Stack",
      "nav.contact": "Contact",
      "nav.hire": "Hire me",
      "hero.status": "Open to new opportunities",
      "hero.role": "Full-stack developer",
      "hero.lead": "I build complete web products end to end — from database design and APIs to real-time features and the interface. Python first, with Node.js, React and PostgreSQL.",
      "hero.cta1": "See my work",
      "hero.cta2": "Download CV",
      "hero.local": "local time",
      "about.title": "Profile",
      "about.text1": "Full-stack developer with Python as my main language, also working with Node.js, Express, React and PostgreSQL.",
      "about.text2": "I take products from an empty repo to production: schema, API, auth, real-time and UI. An economics background helps me design products with a clear business and monetization model.",
      "stat.built": "products built",
      "stat.live": "live in production",
      "stat.e2e": "database → API → UI",
      "stat.english": "English (CEFR)",
      "term.hint": "interactive — type help",
      "projects.title": "Projects",
      "projects.sub": "Real products, built from scratch.",
      "status.live": "Live",
      "status.wip": "Nearly complete",
      "visit": "Visit site",
      "p1.title": "Vezora — Freelance & Job Marketplace",
      "p1.desc": "Multi-category platform connecting clients with specialists: design, programming, SMM, repair and more.",
      "p1.b1": "Separate employer and worker roles with role-based access.",
      "p1.b2": "Real-time chat that automatically blocks phone numbers and messenger contacts to keep deals on the platform.",
      "p1.b3": "JWT authentication; commission and premium-plan monetization model.",
      "p2.title": "Anime Wear — Anime Clothing Store",
      "p2.desc": "An online store for anime streetwear and accessories for a global audience — built from scratch, no CMS.",
      "p2.b1": "Custom product catalog and checkout.",
      "p2.b2": "Dropshipping flow in progress: order and payment on the site, automatic forwarding to a supplier, direct delivery to the customer.",
      "p3.title": "Restaurant QR Ordering & Table Booking",
      "p3.desc": "A web app that lets restaurant guests order and book a table without waiting for a waiter.",
      "p3.b1": "Digital menu with prices; a QR code on every table for instant ordering.",
      "p3.b2": "Timed online booking with a live map of free and busy tables; layout customizable per restaurant.",
      "stack.title": "Stack & education",
      "stack.db": "Database",
      "stack.other": "Other",
      "stack.responsive": "Responsive UI",
      "stack.api": "API integrations",
      "stack.rbac": "Role-based access",
      "lang.title": "Languages",
      "lang.uz": "Uzbek",
      "lang.en": "English",
      "lang.native": "Native",
      "lang.b2": "B2 · Upper-intermediate",
      "edu.title": "Education",
      "edu.name": "Tashkent State University of Economics",
      "edu.sub": "TSUE · Economics",
      "edge.title": "Code × economics",
      "edge.text": "While designing the schema I'm already thinking about commissions, plans and conversion — so the product doesn't just work, it earns.",
      "contact.title": "Let's build something real.",
      "contact.sub": "I'm looking for my next role. Write to me — let's talk.",
      "contact.loc": "Tashkent, Uzbekistan",
      "contact.cta": "Write to me",
      "copy": "Copy",
      "copied": "Email copied to clipboard",
      "footer": "designed & built from scratch",
      rotator: ["builds marketplaces", "ships e-commerce", "wires real-time chat", "designs PostgreSQL schemas", "thinks in business models"],
    },
    uz: {
      "nav.about": "Men haqimda",
      "nav.projects": "Loyihalar",
      "nav.stack": "Texnologiyalar",
      "nav.contact": "Aloqa",
      "nav.hire": "Bog‘lanish",
      "hero.status": "Yangi imkoniyatlarga ochiqman",
      "hero.role": "Full-stack dasturchi",
      "hero.lead": "Ma’lumotlar bazasi va API’dan tortib real vaqt funksiyalari va interfeysgacha — veb-mahsulotlarni boshidan oxirigacha yarataman. Asosiy tilim Python, shuningdek Node.js, React va PostgreSQL.",
      "hero.cta1": "Ishlarimni ko‘rish",
      "hero.cta2": "CV yuklab olish",
      "hero.local": "mahalliy vaqt",
      "about.title": "Profil",
      "about.text1": "Asosiy tilim Python bo‘lgan full-stack dasturchiman, shuningdek Node.js, Express, React va PostgreSQL bilan ishlayman.",
      "about.text2": "Mahsulotni bo‘sh repozitoriydan production’gacha olib chiqaman: sxema, API, autentifikatsiya, real vaqt va UI. Iqtisodiy ma’lumotim mahsulotni aniq biznes va monetizatsiya modeli bilan loyihalashga yordam beradi.",
      "stat.built": "ta mahsulot yaratilgan",
      "stat.live": "tasi production’da ishlamoqda",
      "stat.e2e": "baza → API → UI",
      "stat.english": "Ingliz tili (CEFR)",
      "term.hint": "interaktiv — help deb yozing",
      "projects.title": "Loyihalar",
      "projects.sub": "Noldan qurilgan haqiqiy mahsulotlar.",
      "status.live": "Ishlamoqda",
      "status.wip": "Deyarli tayyor",
      "visit": "Saytga o‘tish",
      "p1.title": "Vezora — frilans va ish topish platformasi",
      "p1.desc": "Mijozlarni mutaxassislar bilan bog‘lovchi ko‘p kategoriyali platforma: dizayn, dasturlash, SMM, ta’mirlash va boshqalar.",
      "p1.b1": "Ish beruvchi va ishchi uchun alohida rollar, rolga asoslangan kirish huquqlari.",
      "p1.b2": "Kelishuvlar platformada qolishi uchun telefon raqamlar va messenjer kontaktlarini avtomatik bloklaydigan real vaqtdagi chat.",
      "p1.b3": "JWT autentifikatsiya; komissiya va premium-tarif monetizatsiya modeli.",
      "p2.title": "Anime Wear — anime kiyimlar do‘koni",
      "p2.desc": "Global auditoriya uchun anime uslubidagi kiyim va aksessuarlar onlayn do‘koni — CMS’siz, noldan yozilgan.",
      "p2.b1": "Maxsus mahsulot katalogi va buyurtma (checkout) jarayoni.",
      "p2.b2": "Dropshipping oqimi ishlab chiqilmoqda: saytda buyurtma va to‘lov, yetkazib beruvchiga avtomatik yuborish, mijozga to‘g‘ridan-to‘g‘ri yetkazish.",
      "p3.title": "Restoran uchun QR buyurtma va stol bron qilish",
      "p3.desc": "Restoran mehmonlariga ofitsiantni kutmasdan buyurtma berish va stol band qilish imkonini beruvchi veb-ilova.",
      "p3.b1": "Narxlari bilan raqamli menyu; har bir stolda tezkor buyurtma uchun QR kod.",
      "p3.b2": "Bo‘sh va band stollarning jonli xaritasi bilan vaqtli onlayn bron; joylashuvni har bir restoranga moslash mumkin.",
      "stack.title": "Texnologiyalar va ta’lim",
      "stack.db": "Ma’lumotlar bazasi",
      "stack.other": "Boshqa",
      "stack.responsive": "Moslashuvchan UI",
      "stack.api": "API integratsiyalar",
      "stack.rbac": "Rolga asoslangan kirish",
      "lang.title": "Tillar",
      "lang.uz": "O‘zbek tili",
      "lang.en": "Ingliz tili",
      "lang.native": "Ona tili",
      "lang.b2": "B2 · O‘rtadan yuqori",
      "edu.title": "Ta’lim",
      "edu.name": "Toshkent davlat iqtisodiyot universiteti",
      "edu.sub": "TDIU · Iqtisodiyot",
      "edge.title": "Kod × iqtisod",
      "edge.text": "Sxemani loyihalayotganda komissiya, tariflar va konversiya haqida ham o‘ylayman — mahsulot nafaqat ishlashi, balki daromad keltirishi uchun.",
      "contact.title": "Keling, haqiqiy mahsulot quramiz.",
      "contact.sub": "Hozir yangi ish izlayapman. Yozing — gaplashamiz.",
      "contact.loc": "Toshkent, O‘zbekiston",
      "contact.cta": "Menga yozing",
      "copy": "Nusxalash",
      "copied": "Email nusxalandi",
      "footer": "noldan loyihalangan va yaratilgan",
      rotator: ["marketpleyslar quradi", "onlayn do‘konlar yaratadi", "real vaqt chatlarini ulaydi", "PostgreSQL sxemalarini loyihalaydi", "biznes model bilan fikrlaydi"],
    },
    ru: {
      "nav.about": "Обо мне",
      "nav.projects": "Проекты",
      "nav.stack": "Стек",
      "nav.contact": "Контакты",
      "nav.hire": "Связаться",
      "hero.status": "Открыт к новым предложениям",
      "hero.role": "Full-stack разработчик",
      "hero.lead": "Создаю веб-продукты целиком — от проектирования базы данных и API до real-time функций и интерфейса. Основной язык — Python, также Node.js, React и PostgreSQL.",
      "hero.cta1": "Мои проекты",
      "hero.cta2": "Скачать CV",
      "hero.local": "местное время",
      "about.title": "Профиль",
      "about.text1": "Full-stack разработчик, основной язык — Python; также работаю с Node.js, Express, React и PostgreSQL.",
      "about.text2": "Довожу продукт от пустого репозитория до продакшена: схема, API, авторизация, real-time и UI. Экономическое образование помогает проектировать продукты с понятной бизнес-моделью и монетизацией.",
      "stat.built": "продукта создано",
      "stat.live": "работают в продакшене",
      "stat.e2e": "БД → API → UI",
      "stat.english": "Английский (CEFR)",
      "term.hint": "интерактивно — введите help",
      "projects.title": "Проекты",
      "projects.sub": "Реальные продукты, созданные с нуля.",
      "status.live": "Работает",
      "status.wip": "Почти готово",
      "visit": "Открыть сайт",
      "p1.title": "Vezora — биржа фриланса и вакансий",
      "p1.desc": "Мультикатегорийная платформа, которая соединяет заказчиков со специалистами: дизайн, программирование, SMM, ремонт и другое.",
      "p1.b1": "Отдельные роли заказчика и исполнителя, доступ на основе ролей.",
      "p1.b2": "Чат в реальном времени, который автоматически блокирует номера телефонов и контакты мессенджеров, чтобы сделки оставались на платформе.",
      "p1.b3": "JWT-авторизация; монетизация через комиссию и премиум-тарифы.",
      "p2.title": "Anime Wear — магазин аниме-одежды",
      "p2.desc": "Интернет-магазин аниме-стритвира и аксессуаров для глобальной аудитории — написан с нуля, без CMS.",
      "p2.b1": "Собственный каталог товаров и оформление заказа.",
      "p2.b2": "В разработке дропшиппинг: заказ и оплата на сайте, автоматическая передача поставщику, доставка напрямую клиенту.",
      "p3.title": "QR-заказ и бронирование столов для ресторанов",
      "p3.desc": "Веб-приложение, где гости ресторана заказывают и бронируют стол без ожидания официанта.",
      "p3.b1": "Цифровое меню с ценами; QR-код на каждом столе для мгновенного заказа.",
      "p3.b2": "Онлайн-бронирование по времени с живой картой свободных и занятых столов; планировка настраивается под каждый ресторан.",
      "stack.title": "Стек и образование",
      "stack.db": "Базы данных",
      "stack.other": "Другое",
      "stack.responsive": "Адаптивный UI",
      "stack.api": "API-интеграции",
      "stack.rbac": "Доступ по ролям",
      "lang.title": "Языки",
      "lang.uz": "Узбекский",
      "lang.en": "Английский",
      "lang.native": "Родной",
      "lang.b2": "B2 · Выше среднего",
      "edu.title": "Образование",
      "edu.name": "Ташкентский государственный экономический университет",
      "edu.sub": "ТГЭУ · Экономика",
      "edge.title": "Код × экономика",
      "edge.text": "Проектируя схему, я уже думаю о комиссиях, тарифах и конверсии — чтобы продукт не просто работал, а приносил доход.",
      "contact.title": "Давайте создадим что-то настоящее.",
      "contact.sub": "Сейчас ищу новую работу. Пишите — обсудим.",
      "contact.loc": "Ташкент, Узбекистан",
      "contact.cta": "Написать мне",
      "copy": "Копировать",
      "copied": "Email скопирован",
      "footer": "дизайн и разработка с нуля",
      rotator: ["строит маркетплейсы", "запускает e-commerce", "делает real-time чаты", "проектирует схемы PostgreSQL", "мыслит бизнес-моделями"],
    },
  };

  const LANGS = Object.keys(I18N);
  const detectLang = () => {
    const param = new URLSearchParams(location.search).get("lang");
    if (param && LANGS.includes(param)) return param;
    const saved = store.get("lang");
    if (saved && LANGS.includes(saved)) return saved;
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : "en";
  };
  let lang = detectLang();
  const t = (key) => (I18N[lang] && I18N[lang][key]) ?? I18N.en[key] ?? key;

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    store.set("lang", lang);
    rotator.reset();
  }

  /* ------------------------------------------------------------------
     Split name into animated letters
     ------------------------------------------------------------------ */
  let charIndex = 0;
  $$(".split").forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    for (const ch of text) {
      const s = document.createElement("span");
      s.className = "ch";
      s.textContent = ch;
      s.style.setProperty("--i", charIndex++);
      el.appendChild(s);
    }
  });

  /* ------------------------------------------------------------------
     Role rotator (typewriter)
     ------------------------------------------------------------------ */
  const rotator = (() => {
    const el = $("#rotator-text");
    let word = 0, pos = 0, deleting = false, timer = null;
    function tick() {
      const words = t("rotator");
      const current = words[word % words.length];
      if (!deleting) {
        pos++;
        el.textContent = current.slice(0, pos);
        if (pos === current.length) { deleting = true; timer = setTimeout(tick, 1900); return; }
        timer = setTimeout(tick, 55 + Math.random() * 45);
      } else {
        pos--;
        el.textContent = current.slice(0, pos);
        if (pos === 0) { deleting = false; word++; timer = setTimeout(tick, 350); return; }
        timer = setTimeout(tick, 28);
      }
    }
    return {
      reset() {
        clearTimeout(timer);
        word = 0; pos = 0; deleting = false;
        if (reduceMotion) { el.textContent = t("rotator")[0]; return; }
        timer = setTimeout(tick, 900);
      },
    };
  })();

  $$(".lang button").forEach((b) => b.addEventListener("click", () => applyLang(b.dataset.lang)));
  applyLang(lang);

  /* ------------------------------------------------------------------
     Interactive hexagon field (background)
     ------------------------------------------------------------------ */
  (() => {
    const cv = $("#hexfield");
    const ctx = cv.getContext("2d");
    const R = 26;
    const HW = Math.sqrt(3) * R;
    const VH = 1.5 * R;
    const corners = Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 180) * (60 * k - 90);
      return [Math.cos(a) * (R - 1.5), Math.sin(a) * (R - 1.5)];
    });
    let W = 0, H = 0, dpr = 1, hexes = [], base = null, running = false, lastPulse = 0;
    const mouse = { x: -1e4, y: -1e4 };

    function hexPath(c, x, y) {
      c.moveTo(x + corners[0][0], y + corners[0][1]);
      for (let k = 1; k < 6; k++) c.lineTo(x + corners[k][0], y + corners[k][1]);
      c.closePath();
    }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      hexes = [];
      for (let row = -1; row * VH < H + R; row++) {
        for (let col = -1; col * HW < W + HW; col++) {
          hexes.push({ x: col * HW + (row & 1 ? HW / 2 : 0), y: row * VH, v: 0 });
        }
      }
      base = document.createElement("canvas");
      base.width = cv.width;
      base.height = cv.height;
      const b = base.getContext("2d");
      b.setTransform(dpr, 0, 0, dpr, 0, 0);
      b.beginPath();
      hexes.forEach((h) => hexPath(b, h.x, h.y));
      b.strokeStyle = "rgba(255,255,255,0.035)";
      b.lineWidth = 1;
      b.stroke();
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(base, 0, 0, W, H);
      for (const h of hexes) {
        if (h.v < 0.02) continue;
        ctx.beginPath();
        hexPath(ctx, h.x, h.y);
        ctx.fillStyle = `rgba(62,230,196,${h.v * 0.07})`;
        ctx.fill();
        ctx.strokeStyle = `rgba(62,230,196,${h.v * 0.55})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function frame(now) {
      if (!running) return;
      if (now - lastPulse > 140) {
        lastPulse = now;
        const h = hexes[(Math.random() * hexes.length) | 0];
        if (h) h.v = Math.max(h.v, 0.35 + Math.random() * 0.35);
      }
      for (const h of hexes) {
        const dx = h.x - mouse.x, dy = h.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const target = d < 170 ? 1 - d / 170 : 0;
        h.v = target > h.v ? h.v + (target - h.v) * 0.35 : h.v * 0.955;
      }
      draw();
      requestAnimationFrame(frame);
    }

    function start() { if (!running && !reduceMotion) { running = true; requestAnimationFrame(frame); } }
    function stop() { running = false; }

    window.addEventListener("resize", () => { clearTimeout(build._t); build._t = setTimeout(build, 150); });
    window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -1e4; });
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    build();
    start();
  })();

  /* ------------------------------------------------------------------
     Reveal on scroll + counters
     ------------------------------------------------------------------ */
  // Stagger siblings that reveal together.
  $$(".reveal").forEach((el) => {
    const group = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--rd", `${Math.min(group.indexOf(el), 6) * 0.07}s`);
  });

  function countUp(el) {
    const end = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = end; return; }
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / 1200, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      $$("[data-count]", e.target).forEach(countUp);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ------------------------------------------------------------------
     Nav: scrolled state + active section
     ------------------------------------------------------------------ */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const navLinks = $$(".nav-links a");
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => secObs.observe(s));

  /* ------------------------------------------------------------------
     Tashkent clock
     ------------------------------------------------------------------ */
  const clockEl = $("#clock");
  const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tashkent", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const tickClock = () => { clockEl.textContent = fmt.format(new Date()); };
  tickClock();
  setInterval(tickClock, 1000);
  $("#year").textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Cursor spotlight on cards + tilt on mockups
     ------------------------------------------------------------------ */
  if (finePointer) {
    $$(".card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
    if (!reduceMotion) {
      $$(".mock").forEach((m) => {
        m.addEventListener("pointermove", (e) => {
          const r = m.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          m.style.setProperty("--ry", `${px * 7}deg`);
          m.style.setProperty("--rx", `${-py * 7}deg`);
        });
        m.addEventListener("pointerleave", () => { m.style.setProperty("--ry", "0deg"); m.style.setProperty("--rx", "0deg"); });
      });

      const portrait = $(".portrait");
      window.addEventListener("pointermove", (e) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        portrait.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`;
      }, { passive: true });
    }
  }

  /* ------------------------------------------------------------------
     Mockups: chat replay, restaurant floor, QR
     ------------------------------------------------------------------ */
  const chat = $('[data-mock="chat"]');
  let chatTimer = null;
  function replayChat() {
    chat.classList.remove("play");
    void chat.offsetWidth;
    chat.classList.add("play");
  }

  const tables = $$("#floor .t");
  const STATES = ["free", "busy", "booked"];
  let floorTimer = null;
  function shuffleTable() {
    const tbl = tables[(Math.random() * tables.length) | 0];
    const next = STATES.filter((s) => s !== tbl.dataset.s)[(Math.random() * 2) | 0];
    tbl.dataset.s = next;
    tbl.classList.add("flash");
    setTimeout(() => tbl.classList.remove("flash"), 400);
  }

  const mockObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const kind = e.target.dataset.mock;
      if (kind === "chat") {
        clearInterval(chatTimer);
        if (e.isIntersecting) {
          replayChat();
          if (!reduceMotion) chatTimer = setInterval(replayChat, 9000);
        }
      }
      if (kind === "resto") {
        clearInterval(floorTimer);
        if (e.isIntersecting && !reduceMotion) floorTimer = setInterval(shuffleTable, 1500);
      }
    });
  }, { threshold: 0.35 });
  $$("[data-mock]").forEach((m) => mockObs.observe(m));

  // Decorative QR-style pattern (not a real code).
  (() => {
    const svg = $("#qr");
    const N = 25;
    let seed = 20090409;
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
    const isFinder = (x, y) => (x < 8 && y < 8) || (x > N - 9 && y < 8) || (x < 8 && y > N - 9);
    const rects = [];
    const finder = (ox, oy) => {
      rects.push(`<rect x="${ox}" y="${oy}" width="7" height="7" rx="1.2"/>`);
      rects.push(`<rect x="${ox + 1}" y="${oy + 1}" width="5" height="5" rx="0.8" style="fill:#f3f6fa"/>`);
      rects.push(`<rect x="${ox + 2}" y="${oy + 2}" width="3" height="3" rx="0.5"/>`);
    };
    finder(0, 0); finder(N - 7, 0); finder(0, N - 7);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (isFinder(x, y)) continue;
        if (rnd() > 0.52) rects.push(`<rect x="${x}" y="${y}" width="1" height="1" rx="0.25"/>`);
      }
    }
    svg.innerHTML = rects.join("");
  })();

  /* ------------------------------------------------------------------
     Toast + copy email
     ------------------------------------------------------------------ */
  const toast = $("#toast");
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }
  const EMAIL = "abdulazizhakimov2009@gmail.com";
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    showToast(`✓ ${t("copied")}`);
  }
  $("#copy-email").addEventListener("click", copyEmail);

  /* ------------------------------------------------------------------
     Terminal
     ------------------------------------------------------------------ */
  (() => {
    const out = $("#term-out");
    const input = $("#term-in");
    const body = $("#term-body");
    const history = [];
    let hIndex = 0;
    let busy = false;

    const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const print = (html, cls = "o") => {
      const div = document.createElement("div");
      div.className = cls;
      div.innerHTML = html;
      out.appendChild(div);
      body.scrollTop = body.scrollHeight;
    };
    const echo = (cmd) => print(`<span class="prompt">➜ <b>~</b></span> ${esc(cmd)}`, "cmd");

    const FILES = ["about.txt", "projects/", "stack.json", "contact.md", "cv.pdf"];
    const COMMANDS = {
      help: () => print(
        `<span class="hl">available commands</span>\n` +
        `  <span class="hl2">whoami</span>      who is this guy\n` +
        `  <span class="hl2">about</span>       short profile\n` +
        `  <span class="hl2">projects</span>    things I've shipped\n` +
        `  <span class="hl2">stack</span>       tools I use\n` +
        `  <span class="hl2">education</span>   where I study\n` +
        `  <span class="hl2">languages</span>   languages I speak\n` +
        `  <span class="hl2">contact</span>     how to reach me\n` +
        `  <span class="hl2">cv</span>          download my CV (PDF)\n` +
        `  <span class="hl2">lang</span> uz|en|ru  switch site language\n` +
        `  <span class="hl2">ls</span>, <span class="hl2">cat</span>, <span class="hl2">date</span>, <span class="hl2">echo</span>, <span class="hl2">clear</span>\n` +
        `  <span class="warn">sudo hire-me</span>  ;)`
      ),
      whoami: () => print(`<span class="hl">Abdulaziz Hakimov</span> — full-stack developer · Tashkent, UZ\nPython first · Node.js · React · PostgreSQL`),
      about: () => print(esc(t("about.text1") + "\n" + t("about.text2"))),
      projects: () => print(
        `<span class="hl">●</span> Vezora          <span class="hl">[live]</span>  <a href="https://vezora.uz" target="_blank" rel="noopener">vezora.uz</a>\n` +
        `  freelance & job marketplace · Node.js, PostgreSQL, Prisma, React, Socket.io\n` +
        `<span class="hl">●</span> Anime Wear      <span class="hl">[live]</span>  <a href="https://animewear.duckdns.org" target="_blank" rel="noopener">animewear.duckdns.org</a>\n` +
        `  anime clothing store · custom build, no CMS, dropshipping flow\n` +
        `<span class="warn">●</span> Restaurant QR   <span class="warn">[wip]</span>   QR ordering + live table booking`
      ),
      stack: () => print(
        `{\n` +
        `  <span class="hl2">"backend"</span>:  [<span class="hl">"Python"</span>, "Node.js", "Express", "REST API", "JWT", "Socket.io"],\n` +
        `  <span class="hl2">"database"</span>: [<span class="hl">"PostgreSQL"</span>, "Prisma ORM"],\n` +
        `  <span class="hl2">"frontend"</span>: [<span class="hl">"React"</span>, "Vite", "i18n", "Responsive UI"],\n` +
        `  <span class="hl2">"other"</span>:    ["API integrations", "Role-based access"]\n` +
        `}`
      ),
      education: () => print(`Tashkent State University of Economics (TSUE) — Economics`),
      languages: () => print(`Uzbek    ██████████  native\nEnglish  ████████░░  B2 (CEFR)`),
      contact: () => print(
        `email   <a href="mailto:${EMAIL}">${EMAIL}</a>\n` +
        `phone   <a href="tel:+998999440409">+998 99 944 04 09</a>\n` +
        `github  <a href="https://github.com/HexForge1" target="_blank" rel="noopener">github.com/HexForge1</a>`
      ),
      cv: () => {
        print(`downloading <span class="hl">Abdulaziz_Hakimov_CV.pdf</span> …`);
        const a = document.createElement("a");
        a.href = "assets/Abdulaziz_Hakimov_CV.pdf";
        a.download = "Abdulaziz_Hakimov_CV.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      },
      ls: () => print(FILES.map((f) => (f.endsWith("/") ? `<span class="hl2">${f}</span>` : f)).join("   ")),
      cat: (arg) => {
        const map = { "about.txt": "about", "stack.json": "stack", "contact.md": "contact", "projects/": "projects", projects: "projects", "cv.pdf": "cv" };
        if (!arg) return print("usage: cat &lt;file&gt;", "err");
        const cmd = map[arg];
        if (cmd) return COMMANDS[cmd]();
        print(`cat: ${esc(arg)}: No such file`, "err");
      },
      date: () => print(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Tashkent", dateStyle: "full", timeStyle: "medium" }).format(new Date()) + " (Tashkent)"),
      echo: (arg) => print(esc(arg || "")),
      lang: (arg) => {
        if (!LANGS.includes(arg)) return print("usage: lang uz | en | ru", "err");
        applyLang(arg);
        print(`language → <span class="hl">${arg}</span>`);
      },
      clear: () => { out.innerHTML = ""; },
      sudo: (arg) => {
        if (arg === "hire-me" || arg === "hire me") {
          print(`<span class="warn">[sudo]</span> password for recruiter: ********`);
          setTimeout(() => print(`<span class="hl">✓ access granted.</span> Great choice. Let's talk → <a href="mailto:${EMAIL}?subject=Job%20opportunity">${EMAIL}</a>`), 600);
          return;
        }
        print("nice try. try: sudo hire-me", "warn");
      },
      hire: () => COMMANDS.sudo("hire-me"),
      github: () => { window.open("https://github.com/HexForge1", "_blank", "noopener"); print("opening github.com/HexForge1 …"); },
      exit: () => print("there is no escape. try <span class=\"hl2\">contact</span> instead :)"),
    };

    function run(raw) {
      const line = raw.trim();
      echo(line);
      if (!line) return;
      history.push(line);
      hIndex = history.length;
      const [name, ...rest] = line.split(/\s+/);
      const fn = COMMANDS[name.toLowerCase()];
      if (fn) fn(rest.join(" "));
      else print(`command not found: ${esc(name)} — type <span class="hl2">help</span>`, "err");
    }

    input.addEventListener("keydown", (e) => {
      if (busy) { e.preventDefault(); return; }
      if (e.key === "Enter") {
        run(input.value);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (hIndex > 0) input.value = history[--hIndex];
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        hIndex = Math.min(history.length, hIndex + 1);
        input.value = history[hIndex] || "";
      } else if (e.key === "Tab") {
        e.preventDefault();
        const v = input.value.toLowerCase();
        const match = Object.keys(COMMANDS).find((c) => c.startsWith(v) && v);
        if (match) input.value = match + " ";
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        COMMANDS.clear();
      }
    });
    body.addEventListener("click", (e) => { if (!e.target.closest("a") && !window.getSelection().toString()) input.focus({ preventScroll: true }); });

    // Intro: type a couple of commands when the terminal first appears.
    const typeCmd = (cmd) => new Promise((resolve) => {
      if (reduceMotion) { input.value = cmd; return resolve(); }
      let i = 0;
      const step = () => {
        input.value = cmd.slice(0, ++i);
        if (i < cmd.length) setTimeout(step, 70 + Math.random() * 60);
        else setTimeout(resolve, 280);
      };
      step();
    });
    const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));

    async function intro() {
      busy = true;
      print(`<span class="hl">hexforge</span> shell v1.0 — welcome 👋`);
      await wait(500);
      for (const cmd of ["whoami", "ls"]) {
        await typeCmd(cmd);
        run(cmd);
        input.value = "";
        await wait(650);
      }
      print(`type <span class="hl2">help</span> to see what else I can do`, "o");
      busy = false;
    }

    const termObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { termObs.disconnect(); intro(); }
    }, { threshold: 0.4 });
    termObs.observe($("#terminal"));
  })();

  console.log("%c⬡ Abdulaziz Hakimov", "color:#3ee6c4;font:600 16px monospace");
  console.log("%cLooking at the source? Good sign. Let's talk: abdulazizhakimov2009@gmail.com", "color:#8f99ab;font:12px monospace");
})();
