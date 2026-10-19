/* QUINT — landing page behaviour */
(() => {
  'use strict';

  const SERUMS = {
    ha: {
      id: 'hyaluronic-acid', name: 'Hyaluronic Acid', pct: '2% + B5', short: 'HA 2%', color: 'var(--ha)',
      chip: 'Hyaluronic Acid · AM + PM',
      line: 'A drink of water for your skin, morning and night.',
      when: 'AM + PM', dose: '3–4 drops', results: 'Instantly plumper; lasting hydration in 2–4 weeks',
      img: 'images/cutout/hyaluronic-acid.png', alt: 'QUINT Hyaluronic Acid 2% + B5 serum in a glass dropper bottle'
    },
    vc: {
      id: 'vitamin-c', name: 'Vitamin C', pct: '10%', short: 'VIT C 10%', color: 'var(--vc)',
      chip: 'Vitamin C · AM',
      line: 'Your morning brightener, and a second shield under sunscreen.',
      when: 'AM only, before sunscreen', dose: '3 drops', results: '4–8 weeks, brighter, more even tone',
      img: 'images/cutout/vitamin-c.png', alt: 'QUINT Vitamin C 10% serum in a glass dropper bottle'
    },
    nia: {
      id: 'niacinamide', name: 'Niacinamide', pct: '10% + Zinc 1%', short: 'NIA 10%', color: 'var(--nia)',
      chip: 'Niacinamide · AM + PM',
      line: 'Less shine by lunchtime, smaller-looking pores by next month.',
      when: 'AM + PM', dose: '2–3 drops', results: '4–6 weeks, less oil, smoother-looking pores',
      img: 'images/cutout/niacinamide.png', alt: 'QUINT Niacinamide 10% + Zinc 1% serum in a glass dropper bottle'
    },
    aa: {
      id: 'alpha-arbutin', name: 'Alpha Arbutin', pct: '2% + HA', short: 'AA 2%', color: 'var(--aa)',
      chip: 'Alpha Arbutin · AM + PM',
      line: 'Slow and steady on the spots that will not leave.',
      when: 'AM + PM', dose: '2–3 drops', results: '8–12 weeks, visibly lighter spots',
      img: 'images/cutout/alpha-arbutin.png', alt: 'QUINT Alpha Arbutin 2% + HA serum in a glass dropper bottle'
    },
    ret: {
      id: 'retinol', name: 'Retinol', pct: '0.3% in Squalane', short: 'RET 0.3%', color: 'var(--ret)',
      chip: 'Retinol · PM',
      line: 'The night shift. It works while you sleep.',
      when: 'PM only, start 2 nights a week', dose: '2–3 drops', results: '8–12 weeks, smoother texture, softer lines',
      img: 'images/cutout/retinol.png', alt: 'QUINT Retinol 0.3% in Squalane serum in a glass dropper bottle'
    }
  };
  const ORDER = ['ha', 'vc', 'nia', 'aa', 'ret'];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Swap a .media block (CSS bottle + optional photo) to another serum. */
  function setMedia(media, s) {
    const label = media.querySelector('.bottle__label b');
    const img = media.querySelector('img');
    if (label) label.textContent = s.short;
    if (img && img.getAttribute('src') !== s.img) {
      img.hidden = false;
      img.alt = s.alt;
      img.src = s.img; // onerror in the markup hides it again if the file isn't there yet
    }
  }

  /* ---------- Product view: serum details open on their own, from the URL hash ---------- */
  const serumArticles = document.querySelectorAll('.serum');
  if (serumArticles.length) {
    const homeTitle = document.title;
    const pills = document.querySelectorAll('.pnav__list a');
    const byId = {};
    ORDER.forEach((k) => { byId[SERUMS[k].id] = SERUMS[k]; });

    const route = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const s = byId[id];
      document.body.classList.toggle('view-product', !!s);
      serumArticles.forEach((a) => a.classList.toggle('is-active', a.id === id));
      pills.forEach((p) => {
        if (p.getAttribute('href') === '#' + id) p.setAttribute('aria-current', 'page');
        else p.removeAttribute('aria-current');
      });

      if (s) {
        document.title = s.name + ' ' + s.pct + ' | QUINT';
        window.scrollTo({ top: 0, behavior: 'instant' });
        const h = document.getElementById(id).querySelector('h3');
        if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      } else {
        document.title = homeTitle;
        // The browser tried to scroll before the home sections were visible again
        const target = id && document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'instant' });
      }
    };
    window.addEventListener('hashchange', route);
    route();
    // Opened straight on a product link: the browser jumps to the anchor after load, so return to the top bar
    window.addEventListener('load', () => {
      if (document.body.classList.contains('view-product')) window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      links.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* ---------- Serums dropdown in the nav ---------- */
  const ddBtn = document.querySelector('.nav__dd-btn');
  if (ddBtn) {
    const dd = ddBtn.parentElement;
    const setDd = (open) => ddBtn.setAttribute('aria-expanded', String(open));
    ddBtn.addEventListener('click', () => setDd(ddBtn.getAttribute('aria-expanded') !== 'true'));
    dd.addEventListener('click', (e) => { if (e.target.closest('a')) setDd(false); });
    document.addEventListener('click', (e) => { if (!dd.contains(e.target)) setDd(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && ddBtn.getAttribute('aria-expanded') === 'true') { setDd(false); ddBtn.focus(); }
    });
  }

  /* ---------- Your picks: side drawer opened from the bag in the nav ---------- */
  const bag = document.querySelector('.nav__bag');
  if (bag) {
    const STORE = 'quint-picks';
    let picks = {};
    try { picks = JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { picks = {}; }

    const drawer = document.createElement('div');
    drawer.className = 'picks';
    drawer.id = 'picks';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-labelledby', 'picks-title');
    drawer.innerHTML =
      '<div class="picks__scrim" data-close></div>' +
      '<aside class="picks__panel">' +
        '<header class="picks__head"><h2 class="picks__title" id="picks-title">Your picks</h2>' +
        '<button class="picks__close" type="button" data-close aria-label="Close your picks"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button></header>' +
        '<div class="picks__body">' +
          '<p class="picks__empty">Nothing picked yet.</p>' +
          '<ul class="picks__list" aria-label="Picked serums"></ul>' +
          '<p class="picks__label">Pick a serum</p>' +
          '<div class="picks__grid">' +
            ORDER.map((k) => '<button type="button" class="pick-tile" data-add="' + k + '" style="--c:' + SERUMS[k].color + '">' +
              '<span class="mini-bottle" aria-hidden="true"></span><span class="pick-tile__name">' + SERUMS[k].name + '</span>' +
              '<span class="pick-tile__plus" aria-hidden="true">+</span><span class="sr-only"> add to picks</span></button>').join('') +
          '</div>' +
        '</div>' +
        '<footer class="picks__foot">' +
          '<div class="picks__row"><span>Pre-launch</span><strong data-picks-total>0 bottles</strong></div>' +
          '<p class="picks__note">No payment yet. Join the waitlist and we’ll email you when your picks are ready.</p>' +
          '<a class="picks__cta" href="#waitlist">Get first access</a>' +
        '</footer>' +
      '</aside>';
    document.body.appendChild(drawer);

    const list = drawer.querySelector('.picks__list');
    const empty = drawer.querySelector('.picks__empty');
    const total = drawer.querySelector('[data-picks-total]');
    const cta = drawer.querySelector('.picks__cta');
    const badge = bag.querySelector('.nav__bag-count');
    const panel = drawer.querySelector('.picks__panel');

    // Picks travel with the waitlist signup
    const form = document.querySelector('.signup');
    let picksField = null;
    if (form) {
      picksField = document.createElement('input');
      picksField.type = 'hidden';
      picksField.name = 'picks';
      form.appendChild(picksField);
    }

    const count = () => ORDER.reduce((n, k) => n + (picks[k] || 0), 0);
    const save = () => { try { localStorage.setItem(STORE, JSON.stringify(picks)); } catch (e) { /* private mode: keep in memory */ } };

    const render = () => {
      const n = count();
      list.innerHTML = ORDER.filter((k) => picks[k]).map((k) => {
        const s = SERUMS[k];
        return '<li class="pick-row" style="--c:' + s.color + '">' +
          '<span class="mini-bottle" aria-hidden="true"></span>' +
          '<span class="pick-row__name">' + s.name + '<small>' + s.pct + '</small></span>' +
          '<span class="qty"><button type="button" data-dec="' + k + '" aria-label="One less ' + s.name + '">−</button>' +
          '<output aria-live="polite">' + picks[k] + '</output>' +
          '<button type="button" data-add="' + k + '" aria-label="One more ' + s.name + '">+</button></span></li>';
      }).join('');
      empty.hidden = n > 0;
      total.textContent = n + (n === 1 ? ' bottle' : ' bottles');
      cta.classList.toggle('is-ready', n > 0);
      badge.hidden = n === 0;
      badge.textContent = n;
      bag.setAttribute('aria-label', 'Your picks, ' + n + (n === 1 ? ' item' : ' items'));
      if (picksField) picksField.value = ORDER.filter((k) => picks[k]).map((k) => SERUMS[k].name + ' x' + picks[k]).join(', ');
    };

    drawer.addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]');
      const dec = e.target.closest('[data-dec]');
      if (add) { picks[add.dataset.add] = (picks[add.dataset.add] || 0) + 1; save(); render(); }
      else if (dec) { const k = dec.dataset.dec; picks[k] = Math.max(0, (picks[k] || 0) - 1); if (!picks[k]) delete picks[k]; save(); render(); }
      else if (e.target.closest('[data-close]')) close();
    });

    let lastFocus = null;
    const open = () => {
      lastFocus = document.activeElement;
      drawer.classList.add('is-open');
      bag.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('is-locked');
      drawer.querySelector('.picks__close').focus();
    };
    function close() {
      drawer.classList.remove('is-open');
      bag.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('is-locked');
      if (lastFocus) lastFocus.focus();
    }
    bag.addEventListener('click', open);
    cta.addEventListener('click', () => {
      close();
      // after the jump to the footer, put the cursor in the email field
      setTimeout(() => { const email = document.getElementById('email'); if (email) email.focus({ preventScroll: true }); }, 60);
    });

    // Keep keyboard focus inside the open drawer; Esc closes it
    drawer.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      const f = panel.querySelectorAll('button, a[href]');
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    render();
  }

  /* ---------- Hero rotation ---------- */
  const hero = document.querySelector('.hero');
  if (hero) {
    const stripes = hero.querySelectorAll('.stripe');
    const product = hero.querySelector('.hero__product');
    const media = product.querySelector('.media');
    const chip = product.querySelector('.chip');
    let index = 0;
    let timer = null;

    // Warm the cache so swaps don't flash
    ORDER.forEach((k) => { const i = new Image(); i.src = SERUMS[k].img; });

    const show = (i) => {
      if (i === index && stripes[i].classList.contains('is-active')) return;
      index = i;
      const s = SERUMS[ORDER[i]];
      stripes.forEach((el, n) => el.classList.toggle('is-active', n === i));
      product.style.setProperty('--c', s.color);
      chip.textContent = s.chip;
      setMedia(media, s);
    };
    const start = () => {
      if (timer || reducedMotion.matches) return;
      timer = setInterval(() => show((index + 1) % ORDER.length), 3000);
    };
    const stop = () => { clearInterval(timer); timer = null; };

    // Hover a stripe to bring up that serum in the same spot
    stripes.forEach((el, n) => {
      el.addEventListener('pointerenter', () => { stop(); if (n !== index) show(n); });
    });

    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    reducedMotion.addEventListener?.('change', () => (reducedMotion.matches ? stop() : start()));
    start();
  }

  /* ---------- Serum finder ---------- */
  const result = document.querySelector('.finder__result');
  if (result) {
    const buttons = document.querySelectorAll('.concern');
    const fields = {};
    result.querySelectorAll('[data-f]').forEach((el) => { fields[el.dataset.f] = el; });
    const media = result.querySelector('.media');

    const render = (key) => {
      const s = SERUMS[key];
      result.style.setProperty('--c', s.color);
      fields.name.textContent = s.name;
      fields.pct.textContent = s.pct;
      fields.line.textContent = s.line;
      fields.when.textContent = s.when;
      fields.dose.textContent = s.dose;
      fields.results.textContent = s.results;
      fields.link.href = '#' + s.id;
      fields.link.setAttribute('aria-label', 'See full details for ' + s.name);
      setMedia(media, s);
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.getAttribute('aria-pressed') === 'true') return;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        if (reducedMotion.matches) { render(btn.dataset.serum); return; }
        result.classList.add('is-swapping');
        setTimeout(() => { render(btn.dataset.serum); result.classList.remove('is-swapping'); }, 180);
      });
    });
  }

  /* ---------- What's inside: dial ---------- */
  const inside = document.querySelector('.inside');
  if (inside) {
    const DIAL = {
      ha: { num: '2%', job: 'Hydration' },
      vc: { num: '10%', job: 'Brightening' },
      nia: { num: '10%', job: 'Oil + pores' },
      aa: { num: '2%', job: 'Dark spots' },
      ret: { num: '0.3%', job: 'Lines + texture' }
    };
    const nodes = inside.querySelectorAll('.dial__node');
    const out = {};
    inside.querySelectorAll('[data-d]').forEach((el) => { out[el.dataset.d] = el; });
    const slots = {};
    inside.querySelectorAll('[data-slot]').forEach((el) => { slots[el.dataset.slot] = el; });

    const setBottle = (el, key) => { el.src = SERUMS[key].img; };

    const select = (key) => {
      const i = ORDER.indexOf(key);
      inside.style.setProperty('--c', SERUMS[key].color);
      nodes.forEach((n) => n.setAttribute('aria-pressed', String(n.dataset.serum === key)));
      out.num.textContent = DIAL[key].num;
      out.name.textContent = SERUMS[key].name;
      out.job.textContent = DIAL[key].job;
      setBottle(slots.main, key);
      setBottle(slots.prev, ORDER[(i + ORDER.length - 1) % ORDER.length]);
      setBottle(slots.next, ORDER[(i + 1) % ORDER.length]);
    };

    // Auto-advance round the dial while it's on screen
    const STEP = 2200;          // ms between serums
    const RESUME_AFTER = 4000;  // pause after a manual pick before carrying on
    let current = 'ha', hovering = false, resumeAt = 0;
    const dial = inside.querySelector('.dial');
    const onScreen = () => {
      const r = dial.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.height > 0 && r.top < vh - r.height * .3 && r.bottom > r.height * .3;
    };
    setInterval(() => {
      if (hovering || document.hidden || reducedMotion.matches || Date.now() < resumeAt || !onScreen()) return;
      current = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
      select(current);
    }, STEP);
    dial.addEventListener('mouseenter', () => { hovering = true; });
    dial.addEventListener('mouseleave', () => { hovering = false; });
    dial.addEventListener('focusin', () => { hovering = true; });
    dial.addEventListener('focusout', () => { hovering = false; });

    nodes.forEach((n) => n.addEventListener('click', () => {
      current = n.dataset.serum;
      resumeAt = Date.now() + RESUME_AFTER;
      select(current);
    }));
  }

  /* ---------- Retinol week grid ---------- */
  const weeksBody = document.querySelector('[data-weeks]');
  if (weeksBody) {
    // Days: 0 = Mon ... 6 = Sun
    const PLAN = [
      ['Week 1–2', [1, 4]],
      ['Week 3–4', [0, 2, 4]],
      ['Week 5–6', [0, 2, 4, 6]],
      ['Week 7+', [0, 1, 2, 3, 4, 5, 6]]
    ];
    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    weeksBody.innerHTML = PLAN.map(([label, on]) =>
      '<tr><th scope="row">' + label + '</th>' +
      DAYS.map((d, i) => {
        const yes = on.includes(i);
        return '<td><span class="sq' + (yes ? ' is-on' : '') + '"><span class="sr-only">' + d + ': ' + (yes ? 'retinol night' : 'rest') + '</span></span></td>';
      }).join('') + '</tr>'
    ).join('');
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Waitlist (Formspree) ---------- */
  const form = document.querySelector('.signup');
  if (form) {
    const input = form.querySelector('#email');
    const msg = form.querySelector('.signup__msg');
    const btn = form.querySelector('.signup__btn');
    const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
    const SUCCESS = "Thanks. We'll email you when the first batch is ready.";

    const say = (text, type) => {
      msg.textContent = text;
      msg.classList.toggle('is-error', type === 'error');
      msg.classList.toggle('is-ok', type === 'ok');
    };

    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true' && EMAIL.test(input.value.trim())) {
        input.removeAttribute('aria-invalid');
        say('');
      }
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();
      if (!EMAIL.test(email)) {
        input.setAttribute('aria-invalid', 'true');
        say(email ? 'That email doesn’t look right. Check it and try again.' : 'Enter your email to get first access.', 'error');
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');

      // Not wired up yet: show the success state so the page can be previewed.
      if (form.action.includes('YOUR_FORM_ID')) {
        console.warn('[QUINT] Waitlist not connected: set your Formspree form ID in index.html.');
        form.classList.add('is-done');
        say(SUCCESS, 'ok');
        return;
      }

      btn.disabled = true;
      say('Sending…');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        form.classList.add('is-done');
        say(SUCCESS, 'ok');
      } catch (err) {
        say('Something went wrong. Please try again in a moment.', 'error');
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
