/* Animated lesson scenes. Each renderer draws into a 16:10 "stage" element and is
   driven step by step: elements registered with st.add(el, i) appear at step i, and
   st.on(fn) handlers run on every step change. Renderers may return a cleanup function
   (used to stop timers / animation frames). */
(function () {
  'use strict';

  function h(tag, cls, html) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html != null) el.innerHTML = html;
    return el;
  }
  function place(el, x, y, w, hgt) {
    el.style.left = x + '%';
    el.style.top = y + '%';
    if (w != null) el.style.width = w + '%';
    if (hgt != null) el.style.height = hgt + '%';
    return el;
  }
  // Step controller: reveal elements step by step instead of on a timer.
  function stepper() {
    const items = [], handlers = [];
    let total = 1, cur = -1;
    return {
      add(el, i) { items.push([el, i]); total = Math.max(total, i + 1); el.classList.add('hold'); el.style.animationDelay = '0s'; return el; },
      on(fn) { handlers.push(fn); },
      setTotal(n) { total = Math.max(1, n); },
      get count() { return total; },
      get index() { return cur; },
      go(i) {
        i = Math.max(0, Math.min(total - 1, i));
        const prev = cur;
        cur = i;
        items.forEach(([el, k]) => el.classList.toggle('hold', k > i));
        handlers.forEach((fn) => fn(i, prev));
      },
    };
  }
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function timers() {
    const ids = [];
    return {
      after(ms, fn) { ids.push(setTimeout(fn, ms)); },
      every(ms, fn) { ids.push(setInterval(fn, ms)); },
      clear() { ids.forEach((id) => { clearTimeout(id); clearInterval(id); }); },
    };
  }

  // Caption strip that steps through a list of strings in time with an animation.
  function captionStrip(stage, lines) {
    const cap = h('div', 'st-caption');
    stage.appendChild(cap);
    return {
      show(i) {
        if (!lines || !lines.length) { cap.style.display = 'none'; return; }
        const text = lines[Math.min(i, lines.length - 1)];
        cap.classList.remove('flash');
        void cap.offsetWidth;
        cap.innerHTML = text;
        cap.classList.add('flash');
      },
    };
  }

  const S = {};

  /* 1. squad — a cell drawn as a pitch, organelles join as players. */
  S.squad = function (stage, p, st) {
    const parts = (p.parts || []).slice(0, 8);
    const type = p.cellType || 'animal';
    const cell = place(h('div', 'cell cell-' + type), 3, 7, 50, 86);
    stage.appendChild(cell);
    if (type === 'bacteria') cell.appendChild(h('div', 'flagellum'));
    const narrow = stage.clientWidth < 600;
    const cols = parts.length > 4 && !narrow ? 3 : parts.length > 1 ? 2 : 1;
    const rows = Math.ceil(parts.length / cols) || 1;
    const list = place(h('div', 'squad-list'), 56, 5, 42, 90);
    stage.appendChild(list);
    parts.forEach((pt, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const tok = h('div', 'token pop', `<span class="tok-emoji">${esc(pt.emoji || '⚽')}</span><span class="tok-label">${esc(pt.label)}</span>`);
      const top = type === 'bacteria' ? 30 : 12, span = type === 'bacteria' ? 40 : 70;
      place(tok, 6 + (c + 0.5) * (41 / cols), top + (r + 0.5) * (span / rows));
      tok.classList.add('centered');
      tok.style.maxWidth = (41 / cols - 1.5) + '%';
      st.add(tok, i);
      stage.appendChild(tok);
      const li = h('div', 'squad-item slide-in', `<span>${esc(pt.emoji || '⚽')}</span><div><b>${esc(pt.label)}</b> ${esc(pt.role || '')}</div>`);
      st.add(li, i);
      list.appendChild(li);
    });
  };

  /* 2. versus — head-to-head comparison table. */
  S.versus = function (stage, p, st) {
    const L = p.left || {}, R = p.right || {};
    const head = place(h('div', 'vs-head fade'), 2, 3, 96, 18);
    head.innerHTML = `<div class="vs-team"><span>${esc(L.emoji || '🔵')}</span>${esc(L.name)}</div><div class="vs-vs">VS</div><div class="vs-team"><span>${esc(R.emoji || '🔴')}</span>${esc(R.name)}</div>`;
    stage.appendChild(head);
    const rows = (p.rows || []).slice(0, 7);
    const box = place(h('div', 'vs-rows'), 2, 23, 96, 75);
    stage.appendChild(box);
    const val = (v) => v === true ? '✅' : v === false ? '❌' : esc(v);
    rows.forEach((r, i) => {
      const row = h('div', 'vs-row slide-in', `<div class="vs-l">${val(r.left)}</div><div class="vs-f">${esc(r.feature)}</div><div class="vs-r">${val(r.right)}</div>`);
      st.add(row, i);
      box.appendChild(row);
    });
  };

  /* 3. flow — particles moving across a membrane (diffusion / osmosis / active transport). */
  S.flow = function (stage, p, st) {
    const mode = p.mode || 'diffusion';
    const canvas = h('canvas', 'flow-canvas');
    stage.appendChild(canvas);
    const lbl = (txt, x) => { const d = place(h('div', 'flow-label', esc(txt)), x, 2, 46); stage.appendChild(d); return d; };
    lbl(p.leftLabel || 'High concentration', 2);
    lbl(p.rightLabel || 'Low concentration', 52);
    const countL = place(h('div', 'flow-count'), 2, 84, 46), countR = place(h('div', 'flow-count'), 52, 84, 46);
    stage.appendChild(countL); stage.appendChild(countR);
    const memLabel = place(h('div', 'flow-mem'), 35, 92, 30);
    memLabel.textContent = p.membraneLabel || (mode === 'osmosis' ? 'partially permeable membrane' : 'cell membrane');
    stage.appendChild(memLabel);
    const cap = captionStrip(stage, p.captions);
    st.setTotal((p.captions || []).length);
    st.on((i) => cap.show(i));

    const parts = [];
    const add = (x, y, emoji, kind, size) => parts.push({ x, y, vx: (Math.random() - 0.5) * 0.004, vy: (Math.random() - 0.5) * 0.004, emoji, kind, size: size || 1, hold: 0 });
    const emoji = p.particle || (mode === 'osmosis' ? '💧' : '⚽');
    if (mode === 'diffusion') {
      for (let i = 0; i < 34; i++) add(0.05 + Math.random() * 0.38, 0.18 + Math.random() * 0.6, emoji, 'p');
      for (let i = 0; i < 4; i++) add(0.57 + Math.random() * 0.38, 0.18 + Math.random() * 0.6, emoji, 'p');
    } else if (mode === 'osmosis') {
      for (let i = 0; i < 26; i++) add(0.05 + Math.random() * 0.38, 0.18 + Math.random() * 0.6, emoji, 'w');
      for (let i = 0; i < 12; i++) add(0.57 + Math.random() * 0.38, 0.18 + Math.random() * 0.6, emoji, 'w');
      for (let i = 0; i < 9; i++) add(0.57 + Math.random() * 0.38, 0.18 + Math.random() * 0.6, p.solute || '🍬', 's', 1.4);
    } else {
      for (let i = 0; i < 8; i++) add(0.05 + Math.random() * 0.38, 0.18 + Math.random() * 0.6, emoji, 'p');
      for (let i = 0; i < 20; i++) add(0.57 + Math.random() * 0.38, 0.18 + Math.random() * 0.6, emoji, 'p');
    }
    const pump = { y: 0.48, busy: null, t: 0 };
    const ctx = canvas.getContext('2d');
    let raf, W = 0, H = 0, last = performance.now(), crossTimer = 0;

    function resize() {
      const r = stage.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function step(dt) {
      const speed = dt / 16;
      crossTimer += dt;
      for (const q of parts) {
        if (q.hold > 0) continue;
        q.vx += (Math.random() - 0.5) * 0.0012 * speed;
        q.vy += (Math.random() - 0.5) * 0.0012 * speed;
        const sp = Math.hypot(q.vx, q.vy), max = q.kind === 's' ? 0.0025 : 0.0045;
        if (sp > max) { q.vx *= max / sp; q.vy *= max / sp; }
        const nx = q.x + q.vx * speed;
        const crossing = (q.x < 0.5) !== (nx < 0.5);
        let allow = true;
        if (crossing) {
          if (q.kind === 's') allow = false;
          else if (mode === 'active') allow = false;
          else if (mode === 'osmosis' && q.x > 0.5) allow = Math.random() < 0.3;
          // pores: only cross through gaps in the membrane
          const gap = (q.y * 10) % 1;
          if (gap < 0.45) allow = false;
        }
        if (allow) q.x = nx; else q.vx = -q.vx;
        q.y += q.vy * speed;
        if (q.x < 0.03) { q.x = 0.03; q.vx = Math.abs(q.vx); }
        if (q.x > 0.97) { q.x = 0.97; q.vx = -Math.abs(q.vx); }
        if (q.y < 0.17) { q.y = 0.17; q.vy = Math.abs(q.vy); }
        if (q.y > 0.8) { q.y = 0.8; q.vy = -Math.abs(q.vy); }
      }
      if (mode === 'active') {
        if (!pump.busy && crossTimer > 1400) {
          const cands = parts.filter((q) => q.x < 0.5);
          if (cands.length) {
            cands.sort((a, b) => Math.hypot(a.x - 0.46, a.y - pump.y) - Math.hypot(b.x - 0.46, b.y - pump.y));
            pump.busy = cands[0]; pump.busy.hold = 1; pump.t = 0; crossTimer = 0;
          }
        }
        if (pump.busy) {
          pump.t += dt;
          const q = pump.busy, f = Math.min(1, pump.t / 1100);
          q.x = q.x + (((f < 0.5) ? 0.47 : 0.6) - q.x) * 0.08;
          q.y = q.y + (pump.y - q.y) * 0.08;
          if (f >= 1) { q.hold = 0; q.x = 0.6; q.vx = 0.003; pump.busy = null; }
        }
      }
    }

    function draw(now) {
      const dt = Math.min(50, now - last); last = now;
      step(dt);
      ctx.clearRect(0, 0, W, H);
      // membrane with pores
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 1.5; i < 8.2; i++) {
        const y0 = (i / 10) * H, y1 = y0 + 0.055 * H;
        ctx.fillRect(W * 0.5 - 4, y0, 8, y1 - y0);
      }
      if (mode === 'active') {
        ctx.font = `${Math.round(H * 0.11)}px serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('🧤', W * 0.5, pump.y * H);
        if (pump.busy) { ctx.font = `${Math.round(H * 0.06)}px serif`; ctx.fillText('⚡', W * 0.5, pump.y * H - H * 0.1); }
      }
      let l = 0, r = 0;
      for (const q of parts) {
        ctx.font = `${Math.round(H * 0.055 * q.size)}px serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(q.emoji, q.x * W, q.y * H);
        if (q.kind !== 's') { if (q.x < 0.5) l++; else r++; }
      }
      const name = mode === 'osmosis' ? 'water' : (p.particleName || 'particles');
      countL.textContent = `${l} ${name}`;
      countR.textContent = `${r} ${name}`;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  };

  /* 4. split — cell division (mitosis) or bacterial binary fission. */
  S.split = function (stage, p, st) {
    const kind = p.kind === 'binary' ? 'binary' : 'mitosis';
    const cap = captionStrip(stage, p.steps);
    const wrap = place(h('div', 'split-wrap'), 0, 0, 100, 80);
    stage.appendChild(wrap);
    const cellA = h('div', 'split-cell ' + kind), cellB = h('div', 'split-cell ' + kind);
    wrap.appendChild(cellA); wrap.appendChild(cellB);
    const bits = [];
    const mk = (cls, color) => { const b = h('div', 'split-bit ' + cls); if (color) b.style.background = color; wrap.appendChild(b); bits.push(b); return b; };
    const setBox = (el, x, y, w, hh, extra) => { Object.assign(el.style, { left: x + '%', top: y + '%', width: w + '%', height: hh + '%' }, extra || {}); };

    let originals = [], copies = [];
    if (kind === 'mitosis') {
      const cols = ['#ff5c5c', '#ff9f43', '#4dabf7', '#9775fa'];
      originals = cols.map((c) => mk('chromo', c));
      copies = cols.map((c) => mk('chromo', c));
    } else {
      originals = [mk('loop'), mk('plasmid'), mk('plasmid')];
      copies = [mk('loop'), mk('plasmid'), mk('plasmid')];
    }

    const states = kind === 'mitosis' ? [
      () => { // 0: one cell, chromosomes scattered
        setBox(cellA, 35, 15, 30, 70, { opacity: 1 }); setBox(cellB, 35, 15, 30, 70, { opacity: 0 });
        const pos = [[42, 30], [55, 55], [45, 62], [54, 32]];
        originals.forEach((b, i) => setBox(b, pos[i][0], pos[i][1], 1.4, 14, { opacity: 1, transform: `rotate(${i * 40 - 30}deg)` }));
        copies.forEach((b, i) => setBox(b, pos[i][0], pos[i][1], 1.4, 14, { opacity: 0, transform: `rotate(${i * 40 - 30}deg)` }));
      },
      () => { // 1: cell grows
        setBox(cellA, 31, 8, 38, 84, { opacity: 1 }); setBox(cellB, 31, 8, 38, 84, { opacity: 0 });
      },
      () => { // 2: chromosomes copied
        copies.forEach((b, i) => { const o = originals[i]; setBox(b, parseFloat(o.style.left) + 1.6, parseFloat(o.style.top), 1.4, 14, { opacity: 1, transform: o.style.transform }); });
      },
      () => { // 3: line up in the middle
        originals.forEach((b, i) => setBox(b, 48.4, 14 + i * 17, 1.4, 14, { transform: 'rotate(0deg)' }));
        copies.forEach((b, i) => setBox(b, 50.2, 14 + i * 17, 1.4, 14, { transform: 'rotate(0deg)' }));
      },
      () => { // 4: pulled apart, cell stretches
        setBox(cellA, 18, 10, 64, 80, {});
        originals.forEach((b, i) => setBox(b, 26, 14 + i * 17, 1.4, 14, {}));
        copies.forEach((b, i) => setBox(b, 72, 14 + i * 17, 1.4, 14, {}));
      },
      () => { // 5: two identical cells
        setBox(cellA, 8, 12, 36, 76, {}); setBox(cellB, 56, 12, 36, 76, { opacity: 1 });
        originals.forEach((b, i) => setBox(b, 18 + (i % 2) * 12, 28 + Math.floor(i / 2) * 26, 1.4, 14, { transform: `rotate(${i * 30 - 20}deg)` }));
        copies.forEach((b, i) => setBox(b, 66 + (i % 2) * 12, 28 + Math.floor(i / 2) * 26, 1.4, 14, { transform: `rotate(${i * 30 - 20}deg)` }));
      },
    ] : [
      () => {
        setBox(cellA, 36, 30, 28, 40, { opacity: 1 }); setBox(cellB, 36, 30, 28, 40, { opacity: 0 });
        setBox(originals[0], 43, 38, 12, 24, { opacity: 1 }); setBox(originals[1], 57, 36, 3, 5, { opacity: 1 }); setBox(originals[2], 57, 58, 3, 5, { opacity: 1 });
        copies.forEach((b, i) => { const o = originals[i]; setBox(b, parseFloat(o.style.left), parseFloat(o.style.top), parseFloat(o.style.width), parseFloat(o.style.height), { opacity: 0 }); });
      },
      () => { setBox(cellA, 28, 28, 44, 44, {}); },
      () => {
        setBox(copies[0], 52, 38, 12, 24, { opacity: 1 }); setBox(copies[1], 66, 36, 3, 5, { opacity: 1 }); setBox(copies[2], 66, 58, 3, 5, { opacity: 1 });
        setBox(originals[0], 34, 38, 12, 24, {}); setBox(originals[1], 30, 36, 3, 5, {}); setBox(originals[2], 30, 58, 3, 5, {});
      },
      () => {
        setBox(cellA, 8, 30, 36, 40, {}); setBox(cellB, 56, 30, 36, 40, { opacity: 1 });
        setBox(originals[0], 18, 38, 12, 24, {}); setBox(originals[1], 33, 36, 3, 5, {}); setBox(originals[2], 33, 58, 3, 5, {});
        setBox(copies[0], 66, 38, 12, 24, {}); setBox(copies[1], 81, 36, 3, 5, {}); setBox(copies[2], 81, 58, 3, 5, {});
      },
    ];

    // states build on each other: jump instantly to the step before, then animate the last one
    st.setTotal(states.length);
    st.on((i, prev) => {
      if (prev === -1 || i !== prev + 1) {
        wrap.classList.add('no-trans');
        for (let j = 0; j < Math.max(1, i); j++) states[j]();
        void wrap.offsetWidth;
        wrap.classList.remove('no-trans');
      }
      if (i > 0) states[i]();
      cap.show(i);
    });
  };

  /* 5. cycle — stages round a circle with a ball travelling round. */
  S.cycle = function (stage, p, st) {
    const stages = (p.stages || []).slice(0, 6);
    const n = stages.length || 1;
    const ring = place(h('div', 'cycle-ring'), 6, 8, 46, 0);
    ring.style.aspectRatio = '1';
    stage.appendChild(ring);
    const nodes = stages.map((s, i) => {
      const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
      const node = h('div', 'cycle-node', esc(s.label));
      node.style.left = (50 + 50 * Math.cos(ang)) + '%';
      node.style.top = (50 + 50 * Math.sin(ang)) + '%';
      ring.appendChild(node);
      return node;
    });
    const ball = h('div', 'cycle-ball', '⚽');
    ring.appendChild(ball);
    const detail = place(h('div', 'cycle-detail'), 56, 12, 40, 76);
    stage.appendChild(detail);
    const show = (i) => {
      nodes.forEach((nd, j) => nd.classList.toggle('on', j === i));
      const ang = -Math.PI / 2 + (i / n) * Math.PI * 2;
      ball.style.left = (50 + 38 * Math.cos(ang)) + '%';
      ball.style.top = (50 + 38 * Math.sin(ang)) + '%';
      const s = stages[i] || {};
      detail.classList.remove('flash'); void detail.offsetWidth; detail.classList.add('flash');
      detail.innerHTML = `<div class="cycle-step">Stage ${i + 1} of ${n}</div><h4>${esc(s.label)}</h4><p>${esc(s.detail)}</p>`;
    };
    st.setTotal(n);
    st.on(show);
  };

  /* 6. ladder — orders of magnitude, biggest to smallest. */
  S.ladder = function (stage, p, st) {
    // Two neighbouring items drawn side by side at TRUE relative size, then the view zooms
    // into the smaller one. A powers-of-ten ruler underneath shows where everything sits.
    const items = (p.items || []).filter((x) => x.metres > 0).slice(0, 7).sort((a, b) => b.metres - a.metres);
    if (items.length < 2) return null;
    const sup = (n) => String(n).replace(/-/g, '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
    const UNIT = { 0: '1 m', '-2': '1 cm', '-3': '1 mm', '-6': '1 µm', '-9': '1 nm' };
    const fmtN = (n) => { const r = Number(n.toPrecision(2)); return r >= 1000 ? r.toLocaleString('en-GB') : String(r); };
    const t = timers();

    const view = place(h('div', 'zoom-view'), 0, 0, 100, 76);
    stage.appendChild(view);

    // powers-of-ten ruler
    const ruler = place(h('div', 'ruler'), 5, 77, 90, 22);
    stage.appendChild(ruler);
    const maxE = Math.ceil(Math.log10(items[0].metres)), minE = Math.floor(Math.log10(items[items.length - 1].metres));
    const span = Math.max(1, maxE - minE);
    const xOf = (m) => ((maxE - Math.log10(m)) / span) * 100;
    ruler.innerHTML = '<div class="ruler-title">Powers-of-ten ruler: each tick is 10× smaller than the one before</div><div class="ruler-line"></div>';
    for (let e = maxE; e >= minE; e--) {
      const x = ((maxE - e) / span) * 100;
      const tick = h('div', 'ruler-tick'); tick.style.left = x + '%'; ruler.appendChild(tick);
      if (UNIT[e] || span <= 8 || (maxE - e) % 2 === 0) {
        const tl = h('div', 'ruler-tl', UNIT[e] || `10${sup(e)} m`); tl.style.left = x + '%'; ruler.appendChild(tl);
      }
    }
    const marks = items.map((it) => { const m = h('div', 'ruler-mark', esc(it.emoji || '⚽')); m.style.left = xOf(it.metres) + '%'; m.title = it.label; ruler.appendChild(m); return m; });

    let zoomTo = null;
    function showPair(i) {
      t.clear();
      view.innerHTML = '';
      const big = items[i], small = items[i + 1];
      const ratio = big.metres / small.metres;
      const W = view.clientWidth, H = view.clientHeight;
      const D = Math.min(H * 0.5, W * 0.38);
      const d = D / ratio;
      const tiny = d < 5;
      const baseY = H * 0.8, bigX = W * 0.3, smallX = bigX + D / 2 + Math.max(d / 2, 6) + W * 0.1;
      const group = h('div', 'zoom-group');
      view.appendChild(group);
      const circle = (cx, dia, it, cls) => {
        const c = h('div', 'zc ' + cls, dia > 28 ? `<span style="font-size:${Math.min(dia * 0.4, 64)}px">${esc(it.emoji || '⚽')}</span>` : '');
        Object.assign(c.style, { left: cx + 'px', top: (baseY - Math.max(dia, 4)) + 'px', width: Math.max(dia, 4) + 'px', height: Math.max(dia, 4) + 'px' });
        group.appendChild(c);
        const l = h('div', 'zl', `${esc(it.label)}<small>${esc(it.size || '')}</small>`);
        Object.assign(l.style, { left: cx + 'px', top: (baseY + 4) + 'px' });
        group.appendChild(l);
      };
      circle(bigX, D, big, 'big');
      circle(smallX, d, small, tiny ? 'small tiny' : 'small');
      if (tiny) {
        const arrow = h('div', 'zl tiny-note', '⬇ it\'s this dot!');
        Object.assign(arrow.style, { left: smallX + 'px', top: (baseY - 34) + 'px' });
        group.appendChild(arrow);
      }
      const oom = Math.log10(ratio);
      const cap = place(h('div', 'zoom-cap fade'), 3, 3, 94);
      cap.innerHTML = `<b>${esc(big.label)}</b> (${esc(big.size)}) is about <b class="hl">${fmtN(ratio)} times</b> bigger than <b>${esc(small.label)}</b> (${esc(small.size)})` +
        ` — ${oom < 1 ? 'less than 1 order' : (Math.round(oom * 10) / 10) + ' orders'} of magnitude.` +
        (tiny ? ` You could line up ${fmtN(ratio)} of them across it. Drawn to scale, it's just a dot!` : ' Both drawn to scale.');
      view.appendChild(cap);
      marks.forEach((m, j) => m.classList.toggle('on', j === i || j === i + 1));

      // on the next step: zoom into the smaller item before showing the next pair
      zoomTo = () => {
        group.style.transformOrigin = `${smallX}px ${baseY - Math.max(d, 4) / 2}px`;
        group.style.transform = `scale(${Math.min(D / Math.max(d, 4), 80)})`;
        group.style.opacity = '0';
        cap.style.opacity = '0';
      };
    }
    st.setTotal(items.length - 1);
    st.on((i, prev) => {
      t.clear();
      if (i === prev + 1 && prev >= 0 && zoomTo) { zoomTo(); t.after(1400, () => showPair(i)); }
      else showPair(i);
    });
    const onResize = () => showPair(Math.max(0, st.index));
    window.addEventListener('resize', onResize);
    return () => { t.clear(); window.removeEventListener('resize', onResize); };
  };

  /* 7. triangle — formula triangle with rearrangements and worked examples. */
  S.triangle = function (stage, p, st) {
    const T = esc(p.top), L = esc(p.left), R = esc(p.right);
    const tri = place(h('div', 'tri'), 3, 6, 40, 86);
    tri.innerHTML = `<svg viewBox="0 0 200 180" class="tri-svg"><polygon points="100,8 192,172 8,172" /><line x1="52" y1="96" x2="148" y2="96"/><line x1="100" y1="96" x2="100" y2="172"/></svg>
      <div class="tri-t tri-top">${T}</div><div class="tri-t tri-left">${L}</div><div class="tri-t tri-right">${R}</div>`;
    stage.appendChild(tri);
    const side = place(h('div', 'tri-side'), 46, 6, 52, 90);
    stage.appendChild(side);
    const lines = [
      `<b>${T}</b> = ${L} × ${R}`,
      `<b>${L}</b> = ${T} ÷ ${R}`,
      `<b>${R}</b> = ${T} ÷ ${L}`,
    ].concat((p.examples || []).map(esc));
    lines.forEach((ln, i) => {
      const d = h('div', 'tri-line slide-in' + (i > 2 ? ' ex' : ''), ln);
      st.add(d, i);
      side.appendChild(d);
    });
    const order = ['tri-top', 'tri-left', 'tri-right'];
    // highlight each quantity in step with its rearranged formula
    const cover = (k) => tri.querySelectorAll('.tri-t').forEach((el) => el.classList.toggle('covered', k >= 0 && k < 3 && el.classList.contains(order[k])));
    st.on(cover);
  };

  /* 8. branch — one thing (e.g. a stem cell) branching into several outcomes. */
  S.branch = function (stage, p, st) {
    const outs = (p.outcomes || []).slice(0, 6);
    const c = p.centre || {};
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 62.5'); svg.setAttribute('preserveAspectRatio', 'none');
    svg.classList.add('branch-svg');
    stage.appendChild(svg);
    const cx = 50, cy = 16;
    const centre = h('div', 'token big pop centered', `<span class="tok-emoji">${esc(c.emoji || '🌱')}</span><span class="tok-label">${esc(c.label)}</span>`);
    place(centre, cx, cy);
    stage.appendChild(centre);
    const n = outs.length, twoRows = n > 3;
    outs.forEach((o, i) => {
      const x = n === 1 ? 50 : 14 + (i * 72) / (n - 1);
      const y = twoRows ? (i % 2 ? 82 : 58) : 72;
      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy * 0.625 + 6);
      line.setAttribute('x2', x); line.setAttribute('y2', y * 0.625 - 6);
      line.setAttribute('class', 'branch-line');
      st.add(line, i);
      svg.appendChild(line);
      const tok = h('div', 'token pop centered', `<span class="tok-emoji">${esc(o.emoji || '⚽')}</span><span class="tok-label">${esc(o.label)}</span>${o.note ? `<span class="tok-note">${esc(o.note)}</span>` : ''}`);
      place(tok, x, y);
      tok.style.maxWidth = Math.min(30, (twoRows ? 144 : 72) / Math.max(1, n - 1) - 2) + '%';
      st.add(tok, i);
      stage.appendChild(tok);
    });
  };

  /* 9. chain — a sequence of steps with arrows (hierarchy, method steps). */
  S.chain = function (stage, p, st) {
    const steps = (p.steps || []).slice(0, 8);
    const box = place(h('div', 'chain'), 2, 4, 96, 92);
    stage.appendChild(box);
    steps.forEach((s, i) => {
      if (i) { const a = h('div', 'chain-arrow fade', '➜'); st.add(a, i); box.appendChild(a); }
      const d = h('div', 'chain-step pop', `<span class="tok-emoji">${esc(s.emoji || '⚽')}</span><b>${esc(s.label)}</b>${s.note ? `<small>${esc(s.note)}</small>` : ''}`);
      st.add(d, i);
      box.appendChild(d);
    });
  };

  /* 10. growth — bacteria doubling every generation. */
  S.growth = function (stage, p, st) {
    const start = Math.max(1, p.start || 1), div = Math.max(1, p.divisionMinutes || 20);
    const gens = Math.min(10, Math.floor((p.totalMinutes || div * 6) / div));
    const fmt = (n) => n.toLocaleString('en-GB');
    const chart = place(h('div', 'growth'), 3, 6, 94, 68);
    stage.appendChild(chart);
    const maxN = start * Math.pow(2, gens);
    for (let g = 0; g <= gens; g++) {
      const n = start * Math.pow(2, g);
      const col = h('div', 'growth-col');
      col.innerHTML = `<span class="growth-n">${fmt(n)}</span><i style="height:${Math.max(2, (n / maxN) * 100)}%"></i><span class="growth-t">${g * div}m</span>`;
      st.add(col, g); st.add(col.querySelector('i'), g); st.add(col.querySelector('.growth-n'), g);
      chart.appendChild(col);
    }
    const f = place(h('div', 'growth-formula fade'), 3, 80, 94, 18);
    f.innerHTML = `${esc(p.label || 'bacteria')} after ${gens * div} min = ${fmt(start)} × 2<sup>${gens}</sup> = <b>${fmt(maxN)}</b> <small>(${gens} divisions, one every ${div} min)</small>`;
    st.add(f, gens + 1);
    stage.appendChild(f);
  };

  /* 11. cubes — surface area to volume ratio for cubes of different sizes. */
  S.cubes = function (stage, p, st) {
    const sizes = (p.sizes || [1, 2, 4]).slice(0, 4);
    const unit = esc(p.unit || 'cm');
    const box = place(h('div', 'cubes'), 2, 4, 96, 92);
    stage.appendChild(box);
    const maxS = Math.max.apply(null, sizes);
    sizes.forEach((s, i) => {
      const sa = 6 * s * s, v = s * s * s, ratio = sa / v;
      const r = Math.round(ratio * 100) / 100;
      const col = h('div', 'cube-col pop');
      const px = (s / maxS) * 80; // true relative side length
      col.innerHTML = `<div class="cube-wrap"><div class="cube" style="width:${px}%;"></div></div>
        <div class="cube-stats"><b>${s} ${unit} cube</b><span>SA = 6 × ${s}² = ${sa} ${unit}²</span><span>Vol = ${s}³ = ${v} ${unit}³</span><span class="cube-r">SA:V = ${r} : 1</span></div>`;
      st.add(col, i);
      box.appendChild(col);
    });
  };

  /* 12. commentary — bouncing emoji and commentator lines (general purpose). */
  S.commentary = function (stage, p, st) {
    const em = place(h('div', 'comm-emoji'), 0, 6, 100, 30);
    (p.emoji || ['⚽']).slice(0, 6).forEach((e, i) => { const s = h('span', 'bounce', esc(e)); s.style.animationDelay = (i * 0.15) + 's'; em.appendChild(s); });
    stage.appendChild(em);
    const box = place(h('div', 'comm-lines'), 6, 40, 88, 56);
    stage.appendChild(box);
    (p.lines || []).slice(0, 5).forEach((ln, i) => {
      const d = h('div', 'comm-line slide-in', '🎙️ ' + esc(ln));
      st.add(d, i);
      box.appendChild(d);
    });
  };

  window.Scenes = {
    types: Object.keys(S),
    // Draws a scene and returns a controller: { count, index, go(i), cleanup() }
    render(stage, scene) {
      stage.innerHTML = '';
      const fn = S[scene.type] || S.commentary;
      const st = stepper();
      let cleanup = null;
      try {
        cleanup = fn(stage, scene.params || {}, st) || null;
      } catch (e) {
        console.error('Scene failed', scene, e);
        stage.innerHTML = '<div class="st-caption">⚠️ This animation picked up an injury.</div>';
      }
      st.go(0);
      return { get count() { return st.count; }, get index() { return st.index; }, go: (i) => st.go(i), cleanup: () => cleanup && cleanup() };
    },
  };
})();
