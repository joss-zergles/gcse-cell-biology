(function () {
  'use strict';
  const app = document.getElementById('app');
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  const TOPICS = ['Cell structure', 'Cell division', 'Transport in cells'];
  const TOPIC_NUM = { 'Cell structure': '4.1.1', 'Cell division': '4.1.2', 'Transport in cells': '4.1.3' };
  const numKey = (id) => id.split('.').map((n) => n.padStart(3, '0')).join('.');
  const sections = window.CELLBIO_SECTIONS.slice().sort((a, b) => numKey(a.id) < numKey(b.id) ? -1 : 1);
  const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
  // Card ids come from the question text, so editing/reordering a section's cards keeps progress on the others.
  const hash = (str) => { let x = 5381; for (let i = 0; i < str.length; i++) x = ((x << 5) + x + str.charCodeAt(i)) >>> 0; return x.toString(36); };
  const cardIndex = {};
  sections.forEach((s) => s.cards.forEach((c) => { c._id = s.id + '#' + hash(c.q); cardIndex[c._id] = { s, c }; }));
  const cardIds = (s) => s.cards.map((c) => c._id);
  const cardById = (cid) => cardIndex[cid] || null;

  /* ---------- tap-to-define glossary ---------- */
  const GLOSSARY = (window.CELLBIO_GLOSSARY || []).filter((g) => g.term && g.def && g.term !== 'cell');
  const termByForm = {};
  GLOSSARY.forEach((g) => [g.term].concat(g.forms || []).forEach((f) => { termByForm[f.toLowerCase()] = g; }));
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const forms = Object.keys(termByForm).sort((a, b) => b.length - a.length);
  const termRe = forms.length ? new RegExp(`(?<![\\w-])(${forms.map(reEsc).join('|')})(?![\\w-])`, 'gi') : null;
  // Wrap the first mention of each glossary term in `html` with a tappable button. `seen` is shared
  // across the pieces of one screen so each word is only marked once.
  function linkTerms(html, seen) {
    if (!termRe || !html) return html || '';
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const text = node.nodeValue;
      termRe.lastIndex = 0;
      let m, last = 0, frag = null;
      while ((m = termRe.exec(text))) {
        const g = termByForm[m[1].toLowerCase()];
        if (!g || seen.has(g.term)) continue;
        seen.add(g.term);
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'term'; b.dataset.term = g.term; b.textContent = m[1];
        frag.appendChild(b);
        last = m.index + m[1].length;
      }
      if (frag) { frag.appendChild(document.createTextNode(text.slice(last))); node.replaceWith(frag); }
    });
    return tpl.innerHTML;
  }
  const pop = document.getElementById('termPop');
  const glossaryByTerm = Object.fromEntries(GLOSSARY.map((g) => [g.term, g]));
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.term');
    if (b) {
      e.stopPropagation();
      const g = glossaryByTerm[b.dataset.term];
      const from = byId[g.section];
      const word = b.textContent;
      document.getElementById('termBody').innerHTML = `<b>📖 ${esc(word.charAt(0).toUpperCase() + word.slice(1))}</b><p>${esc(g.def)}</p>` +
        (from ? `<small>Taught in ${g.section} ${esc(from.title)}</small>` : '');
      pop.hidden = false;
      return;
    }
    if (!e.target.closest('#termPop') || e.target.closest('.term-close')) pop.hidden = true;
  }, true);

  const PRAISE = ['GOAL! ⚽', 'Top bins! 🎯', 'What a strike! 💥', 'Back of the net! 🥅', 'Worldie! 🌍', 'Hat-trick hero! 🎩', 'Clinical finish! 🧊', 'Absolute screamer! 📣'];
  const MISS = ['Off the post! 😬', 'VAR says no 📺', 'Offside — have another go 🚩', 'Over the bar! 🙈', 'Saved by the keeper 🧤', 'Into row Z 🏟️'];
  const STAGE_NAMES = ['Kick-off: pick the answer', 'Second half: say it from memory', 'Final whistle: one more time to win it'];

  let cleanup = null;
  function setCleanup(fn) { if (cleanup) cleanup(); cleanup = fn || null; }

  /* ---------- progress helpers ---------- */
  function sectionStats(s) {
    const ids = cardIds(s);
    const grad = ids.filter((id) => SRS.isGraduated(id)).length;
    return { total: ids.length, grad, mastered: ids.length > 0 && grad === ids.length };
  }
  function isMastered(s) {
    const m = sectionStats(s).mastered;
    if (m) SRS.markMastered(s.id);
    return m;
  }
  function isUnlocked(s) {
    if (SRS.data.settings.unlockAll) return true;
    const i = sections.indexOf(s);
    return i === 0 || isMastered(sections[i - 1]);
  }
  function dueIds() {
    return sections.filter(isUnlocked).flatMap(cardIds).filter((id) => SRS.isDue(id));
  }

  function renderScoreboard() {
    const d = SRS.data;
    const due = dueIds().length;
    $('#scoreboard').innerHTML =
      `<span title="Correct answers">⚽ <b>${d.goals}</b> goals</span>` +
      `<span title="Days in a row">🔥 <b>${d.streak.count}</b> day run</span>` +
      (due ? `<a href="#/review" class="due-pill" title="Cards due for review">📅 ${due} due</a>` : '');
  }

  function toast(msg) {
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('out'), 2200);
    setTimeout(() => t.remove(), 2700);
  }

  function confetti() {
    const box = document.createElement('div');
    box.className = 'confetti';
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.textContent = pick(['⚽', '🏆', '🎉', '⭐', '🥅']);
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDelay = Math.random() * 1.2 + 's';
      s.style.fontSize = (16 + Math.random() * 22) + 'px';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 4500);
  }

  /* ---------- home ---------- */
  function renderHome() {
    const due = dueIds().length;
    const next = sections.find((s) => isUnlocked(s) && !isMastered(s));
    const masteredCount = sections.filter(isMastered).length;
    let html = `<section class="hero">
      <h1>Welcome to the training ground</h1>
      <p>Watch the lesson, then train each section's flashcards until every one is nailed. Master a section to unlock the next fixture. 🏆 ${masteredCount}/${sections.length} sections mastered.</p>
      <div class="hero-actions">
        ${due ? `<a class="btn big" href="#/review">📅 Daily training — ${due} card${due === 1 ? '' : 's'} due</a>` : `<span class="pill ok">✅ No reviews due today</span>`}
        ${next ? `<a class="btn big alt" href="#/s/${next.id}">▶ Next up: ${esc(next.title)}</a>` : ''}
      </div>
    </section>`;
    TOPICS.forEach((topic) => {
      const list = sections.filter((s) => s.topic === topic);
      if (!list.length) return;
      html += `<h2 class="topic-head"><span>${TOPIC_NUM[topic]}</span> ${esc(topic)}</h2><div class="fixtures">`;
      list.forEach((s) => {
        const st = sectionStats(s), un = isUnlocked(s), m = st.mastered;
        const pct = st.total ? Math.round((st.grad / st.total) * 100) : 0;
        const status = m ? '🏆 Mastered' : un ? (st.grad ? `▶ In progress` : '▶ Ready') : '🔒 Locked';
        html += `<a class="fixture ${un ? '' : 'locked'} ${m ? 'won' : ''}" href="#/s/${s.id}" data-id="${s.id}">
          <span class="fx-emoji">${esc(s.emoji || '⚽')}</span>
          <span class="fx-main"><small>${s.id}${s.biologyOnly ? ' · <em>Biology only</em>' : ''}</small><b>${esc(s.title)}</b>
            <span class="bar"><i style="width:${pct}%"></i></span></span>
          <span class="fx-status">${status}<small>${st.grad}/${st.total} cards</small></span>
        </a>`;
      });
      html += `</div>`;
    });
    app.innerHTML = html;
    app.querySelectorAll('.fixture.locked').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      const i = sections.indexOf(byId[a.dataset.id]);
      toast(`🔒 Master "${sections[i - 1].title}" first to unlock this one`);
    }));
  }

  /* ---------- lesson ---------- */
  function sectionHeader(s, active) {
    const st = sectionStats(s);
    return `<div class="sec-head">
      <a href="#/" class="back">← Fixtures</a>
      <h1><span class="sec-emoji">${esc(s.emoji || '⚽')}</span> <small>${s.id}</small> ${esc(s.title)}</h1>
      ${s.intro ? `<p class="intro">${s.intro}</p>` : ''}
      <nav class="tabs">
        <a href="#/s/${s.id}" class="${active === 'lesson' ? 'on' : ''}">🎬 Watch the lesson</a>
        <a href="#/s/${s.id}/train" class="${active === 'train' ? 'on' : ''}">🏋️ Training ground <small>${st.grad}/${st.total}</small></a>
      </nav>
    </div>`;
  }

  function renderLesson(s, idx) {
    const n = s.scenes.length;
    idx = Math.max(0, Math.min(n - 1, idx || 0));
    const sc = s.scenes[idx];
    const seen = new Set();
    app.innerHTML = sectionHeader(s, 'lesson') + `
      <article class="scene">
        <div class="scene-top"><h2>${esc(sc.title)}</h2><span class="muted">Scene ${idx + 1} of ${n}</span></div>
        <div class="stage" id="stage" title="Tap for the next step"></div>
        <div class="step-bar">
          <button class="btn ghost small" id="stepBack" aria-label="Previous step">◀</button>
          <span class="step-info" id="stepInfo"></span>
          <button class="btn ghost small" id="autoPlay" aria-pressed="false">▶ Auto</button>
          <button class="btn" id="stepNext">Next step ▶</button>
        </div>
        <p class="step-hint">Tap the picture or press → for the next step, ← to go back</p>
        ${sc.commentator ? `<blockquote class="commentator">🎙️ ${esc(sc.commentator)}</blockquote>` : ''}
        <div class="scene-text">${linkTerms(sc.text, seen)}</div>
        ${sc.keyFact ? `<div class="keyfact"><b>📝 Exam key fact</b>${linkTerms(sc.keyFact, seen)}</div>` : ''}
        <div class="scene-nav">
          ${idx > 0 ? `<a class="btn ghost" href="#/s/${s.id}/${idx - 1}">◀ Back</a>` : '<span></span>'}
          <button class="btn ghost" id="replay">↻ Replay</button>
          ${idx < n - 1 ? `<a class="btn" id="nextScene" href="#/s/${s.id}/${idx + 1}">Next scene ▶</a>` : `<a class="btn" id="nextScene" href="#/s/${s.id}/train">Training ground ⚽</a>`}
        </div>
        <div class="dots">${s.scenes.map((_, i) => `<a href="#/s/${s.id}/${i}" class="${i === idx ? 'on' : ''}" aria-label="Scene ${i + 1}"></a>`).join('')}</div>
      </article>`;
    const stage = $('#stage'), info = $('#stepInfo'), back = $('#stepBack'), next = $('#stepNext'), auto = $('#autoPlay'), nextScene = $('#nextScene');
    let ctrl = null, autoTimer = null;
    const update = () => {
      const last = ctrl.index >= ctrl.count - 1;
      info.textContent = `Step ${ctrl.index + 1} of ${ctrl.count}`;
      back.disabled = ctrl.index <= 0;
      next.disabled = last;
      next.classList.toggle('ghost', last);
      nextScene.classList.toggle('ready', last);
      if (last) stopAuto();
    };
    const stopAuto = () => { clearInterval(autoTimer); autoTimer = null; auto.textContent = '▶ Auto'; auto.setAttribute('aria-pressed', 'false'); };
    const go = (d) => { ctrl.go(ctrl.index + d); update(); };
    const play = () => {
      stopAuto();
      ctrl = Scenes.render(stage, sc);
      setCleanup(() => { stopAuto(); ctrl.cleanup(); lessonKeys = null; });
      lessonKeys = (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      };
      update();
    };
    play();
    stage.addEventListener('click', () => { stopAuto(); go(1); });
    next.addEventListener('click', () => { stopAuto(); go(1); });
    back.addEventListener('click', () => { stopAuto(); go(-1); });
    auto.addEventListener('click', () => {
      if (autoTimer) return stopAuto();
      if (ctrl.index >= ctrl.count - 1) play();
      auto.textContent = '⏸ Pause'; auto.setAttribute('aria-pressed', 'true');
      autoTimer = setInterval(() => go(1), 4000);
    });
    $('#replay').addEventListener('click', play);
  }
  let lessonKeys = null;

  /* ---------- training sessions ---------- */
  const SUP = { '⁻': '-', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
  function normalise(s) {
    return String(s).toLowerCase()
      .replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/<[^>]+>/g, '')
      .replace(/[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (m) => '^' + m.split('').map((c) => SUP[c]).join(''))
      .replace(/[µμ]/g, 'u').replace(/(\d),(?=\d{3})/g, '$1')
      .replace(/[^a-z0-9.:^\-\s]/g, ' ')
      .replace(/(\d)([a-z])/g, '$1 $2').replace(/([a-z])(\d)/g, '$1 $2')
      .replace(/\s+/g, ' ').replace(/ [x*] (?=\d)/g, ' ').replace(/^\^/, '')
      .trim();
  }
  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  function typedCorrect(input, accept) {
    const inp = normalise(input);
    if (!inp) return false;
    const words = inp.split(' ');
    return accept.some((raw) => {
      const term = normalise(raw);
      if (!term) return false;
      if (/^-?[\d.]+$/.test(term)) return words.some((w) => parseFloat(w) === parseFloat(term)) || inp === term;
      if ((' ' + inp + ' ').includes(' ' + term + ' ')) return true;
      if (/\d/.test(term)) return false; // numbers/ratios must match exactly (so 12:1 never passes for 2:1)
      if (inp.includes(term)) return true;
      const tol = term.length >= 8 ? 2 : term.length >= 4 ? 1 : 0;
      const tw = term.split(' ').length;
      for (let i = 0; i + tw <= words.length; i++) if (lev(words.slice(i, i + tw).join(' '), term) <= tol) return true;
      return false;
    });
  }

  function makeSession(ids, mode) {
    return {
      mode, turn: 0, last: null, nextAt: {}, relearn: {},
      waiting: ids.slice(),
      pool: [],
      fill() { while (this.pool.length < (mode === 'learn' ? 6 : 999) && this.waiting.length) { const id = this.waiting.shift(); this.pool.push(id); this.nextAt[id] = this.turn; } },
      next() {
        this.fill();
        if (!this.pool.length) return null;
        let cands = this.pool.filter((id) => id !== this.last);
        if (!cands.length) cands = this.pool;
        cands.sort((a, b) => this.nextAt[a] - this.nextAt[b]);
        const ready = cands.filter((id) => this.nextAt[id] <= this.turn);
        const id = ready.length ? ready[0] : cands[0];
        this.last = id;
        return id;
      },
      done(id) { this.pool = this.pool.filter((x) => x !== id); },
      later(id, gap) { this.nextAt[id] = this.turn + gap; },
    };
  }

  function renderTrain(s) {
    const ids = cardIds(s);
    const todo = ids.filter((id) => !SRS.isGraduated(id));
    const session = makeSession(shuffle(todo), 'learn');
    app.innerHTML = sectionHeader(s, 'train') + `<div id="trainer"></div>`;
    const box = $('#trainer');
    if (!todo.length) { renderSectionDone(box, s, false); return; }
    const progress = () => {
      const st = sectionStats(s);
      return `<div class="pitch-progress" title="${st.grad} of ${st.total} cards mastered">
        <span class="pp-ball" style="left:${(st.grad / st.total) * 92}%">⚽</span><span class="pp-goal">🥅</span></div>
        <div class="muted center">${st.grad}/${st.total} cards mastered · each card needs 3 correct answers</div>`;
    };
    const loop = () => {
      const id = session.next();
      if (!id) { renderSectionDone(box, s, true); return; }
      session.turn++;
      const st = SRS.card(id).stage;
      const { c } = cardById(id);
      const type = st === 0 ? 'mcq' : c.accept && c.accept.length ? 'typed' : 'flip';
      showCard(box, progress(), c, type, st, (result) => {
        // result: true / false / 'nearly'
        if (result === 'nearly') { session.later(id, 2); return loop(); }
        const newStage = SRS.learn(id, result);
        if (newStage >= SRS.GRADUATE_STAGE) { session.done(id); toast('🏅 Card mastered!'); }
        else session.later(id, result ? 3 + newStage * 2 : 2);
        renderScoreboard();
        loop();
      });
    };
    loop();
  }

  function renderSectionDone(box, s, justNow) {
    const i = sections.indexOf(s);
    const next = sections[i + 1];
    isMastered(s);
    if (justNow) confetti();
    box.innerHTML = `<div class="done-card">
      <div class="trophy">🏆</div>
      <h2>${justNow ? 'FULL TIME — section mastered!' : 'Already mastered'}</h2>
      <p>Every card in <b>${esc(s.title)}</b> is nailed. They'll come back in <b>Daily training</b> over the next few weeks so they stay locked in.</p>
      <div class="hero-actions">
        ${next ? `<a class="btn big" href="#/s/${next.id}">▶ Next fixture: ${esc(next.title)}</a>` : `<span class="pill ok">🎉 You've completed the whole of Cell Biology!</span>`}
        <a class="btn big alt" href="#/">Back to fixtures</a>
      </div></div>`;
  }

  function renderReview() {
    const ids = shuffle(dueIds()).slice(0, 40);
    const total = ids.length;
    const session = makeSession(ids, 'review');
    app.innerHTML = `<div class="sec-head"><a href="#/" class="back">← Fixtures</a><h1>📅 Daily training</h1>
      <p class="intro">Cards you've mastered come back after 1, 3, 7, 14, 30 and 60 days. Get one wrong and it goes back to tomorrow.</p></div><div id="trainer"></div>`;
    const box = $('#trainer');
    let cleared = 0;
    const finish = () => {
      if (total) confetti();
      box.innerHTML = `<div class="done-card"><div class="trophy">${total ? '🥇' : '😎'}</div>
        <h2>${total ? 'Training session complete!' : 'Nothing due — rest day!'}</h2>
        <p>${total ? `You cleared ${total} card${total === 1 ? '' : 's'}. Come back tomorrow to keep the run going 🔥` : 'No cards are due. Learn a new section or come back tomorrow.'}</p>
        <div class="hero-actions"><a class="btn big" href="#/">Back to fixtures</a></div></div>`;
    };
    const loop = () => {
      const id = session.next();
      if (!id) return finish();
      session.turn++;
      const { s, c } = cardById(id);
      const type = c.accept && c.accept.length ? 'typed' : 'flip';
      const prog = `<div class="pitch-progress"><span class="pp-ball" style="left:${(cleared / total) * 92}%">⚽</span><span class="pp-goal">🥅</span></div>
        <div class="muted center">${cleared}/${total} cleared · from <b>${esc(s.title)}</b></div>`;
      showCard(box, prog, c, type, null, (result) => {
        const grade = result === true ? 2 : result === 'nearly' ? 1 : 0;
        if (session.relearn[id]) {
          if (grade === 2) { session.done(id); cleared++; } else session.later(id, 3);
        } else {
          SRS.review(id, grade);
          if (grade === 0) { session.relearn[id] = true; session.later(id, 3); }
          else { session.done(id); cleared++; }
        }
        renderScoreboard();
        loop();
      });
    };
    loop();
  }

  /* ---------- one flashcard ---------- */
  function showCard(box, progressHtml, c, type, stage, onDone) {
    const stageHtml = stage == null ? '<div class="stage-tag">Review</div>' :
      `<div class="stage-tag">${[0, 1, 2].map((i) => `<i class="${i < stage ? 'got' : i === stage ? 'now' : ''}"></i>`).join('')} ${STAGE_NAMES[stage]}</div>`;
    box.innerHTML = progressHtml + `<div class="flash">
      ${stageHtml}
      <div class="q">${c.q}</div>
      <div class="answer-area" id="area"></div>
      <div class="feedback" id="fb"></div>
      <div class="card-actions" id="acts"></div></div>`;
    const area = $('#area', box), fb = $('#fb', box), acts = $('#acts', box);
    let finished = false;
    const seen = new Set();
    const reveal = (ok, extra) => {
      fb.innerHTML = `<div class="verdict ${ok === true ? 'ok' : ok === false ? 'no' : ''}">${ok === true ? pick(PRAISE) : ok === false ? pick(MISS) : ''}</div>
        ${linkTerms(extra || '', seen)}${c.why ? `<div class="why">💡 ${linkTerms(c.why, seen)}</div>` : ''}`;
    };
    const nextBtn = (result, label) => {
      acts.innerHTML = `<button class="btn" id="go">${label || 'Next ▶'}</button>`;
      const go = $('#go', acts);
      go.focus();
      go.addEventListener('click', () => { if (!finished) { finished = true; onDone(result); } });
    };

    if (type === 'mcq') {
      const opts = shuffle([c.a].concat((c.options || []).slice(0, 3)));
      area.innerHTML = `<div class="options">${opts.map((o, i) => `<button class="opt" data-i="${i}"><kbd>${i + 1}</kbd> ${o}</button>`).join('')}</div>`;
      const buttons = Array.from(area.querySelectorAll('.opt'));
      const choose = (i) => {
        if (buttons[0].disabled) return;
        const ok = opts[i] === c.a;
        buttons.forEach((b, j) => { b.disabled = true; if (opts[j] === c.a) b.classList.add('right'); else if (j === i) b.classList.add('wrong'); });
        reveal(ok);
        nextBtn(ok);
      };
      buttons.forEach((b, i) => b.addEventListener('click', () => choose(i)));
      box._keys = (e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= opts.length) choose(n - 1); };
    } else if (type === 'typed') {
      area.innerHTML = `<form class="typed" autocomplete="off"><input id="ans" placeholder="${c.accept.some((x) => x.includes('^')) ? 'Type your answer (powers like 10^-7)…' : 'Type your answer…'}" autocapitalize="off" spellcheck="false"><button class="btn">Check</button></form>`;
      const input = $('#ans', area);
      input.focus();
      $('form', area).addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.disabled) return;
        if (!input.value.trim()) { input.focus(); return; }
        input.disabled = true; $('button', area).disabled = true;
        const ok = typedCorrect(input.value, c.accept);
        input.classList.add(ok ? 'right' : 'wrong');
        reveal(ok, `<div class="model"><b>Answer:</b> ${c.a}</div>`);
        if (ok) nextBtn(true);
        else {
          acts.innerHTML = `<button class="btn ghost" id="override">I was actually right ✋</button><button class="btn" id="go">Next ▶</button>`;
          $('#go', acts).focus();
          $('#go', acts).addEventListener('click', () => { if (!finished) { finished = true; onDone(false); } });
          $('#override', acts).addEventListener('click', () => { if (!finished) { finished = true; onDone(true); } });
        }
      });
    } else {
      area.innerHTML = `<p class="muted center">Say or write your answer first, then flip the card and be honest! 🤝</p>`;
      acts.innerHTML = `<button class="btn" id="flip">Flip card 🔄</button>`;
      $('#flip', acts).focus();
      $('#flip', acts).addEventListener('click', () => {
        area.innerHTML = `<div class="model big">${linkTerms(c.a, seen)}</div>`;
        reveal(null);
        acts.innerHTML = `<button class="btn grade no" data-r="0">❌ Missed it</button><button class="btn grade meh" data-r="1">😬 Nearly</button><button class="btn grade ok" data-r="2">✅ Nailed it</button>`;
        acts.querySelectorAll('.grade').forEach((b) => b.addEventListener('click', () => {
          if (finished) return; finished = true;
          const r = +b.dataset.r;
          onDone(r === 2 ? true : r === 1 ? 'nearly' : false);
        }));
      });
    }
  }

  document.addEventListener('keydown', (e) => {
    const box = $('#trainer');
    if (box && box._keys && !(e.target instanceof HTMLInputElement)) box._keys(e);
    else if (lessonKeys && !(e.target instanceof HTMLInputElement) && !e.target.closest('button, a, dialog')) lessonKeys(e);
  });

  /* ---------- settings ---------- */
  const dlg = $('#settings');
  $('#settingsBtn').addEventListener('click', () => {
    $('#unlockAll').checked = !!SRS.data.settings.unlockAll;
    $('#progressCode').value = SRS.exportCode();
    dlg.showModal();
  });
  $('#unlockAll').addEventListener('change', (e) => { SRS.data.settings.unlockAll = e.target.checked; SRS.save(); });
  $('#copyCode').addEventListener('click', () => {
    const t = $('#progressCode'); t.select();
    (navigator.clipboard ? navigator.clipboard.writeText(t.value) : Promise.reject()).then(() => toast('📋 Copied'), () => document.execCommand('copy'));
  });
  $('#loadCode').addEventListener('click', () => {
    try { SRS.importCode($('#progressCode').value); toast('✅ Progress loaded'); dlg.close(); route(); }
    catch (e) { toast('⚠️ That code didn\'t work'); }
  });
  $('#resetAll').addEventListener('click', () => {
    if (confirm('Reset ALL progress? This can\'t be undone.')) { SRS.reset(); dlg.close(); location.hash = '#/'; route(); }
  });
  dlg.addEventListener('close', route);

  /* ---------- router ---------- */
  function route() {
    setCleanup(null);
    const box = $('#trainer'); if (box) box._keys = null;
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    renderScoreboard();
    if (parts[0] === 's' && byId[parts[1]]) {
      const s = byId[parts[1]];
      if (!isUnlocked(s)) { location.hash = '#/'; return; }
      if (parts[2] === 'train') renderTrain(s);
      else renderLesson(s, parseInt(parts[2] || '0', 10));
    } else if (parts[0] === 'review') renderReview();
    else renderHome();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
})();
