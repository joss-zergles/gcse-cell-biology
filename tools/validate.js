// Checks every content file against CONTENT_GUIDE.md. Run: node tools/validate.js
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'content');
const TYPES = ['squad','versus','flow','split','cycle','ladder','triangle','branch','chain','growth','cubes','commentary'];
let problems = 0;
const bad = (id, msg) => { problems++; console.log(`  ✗ ${id}: ${msg}`); };
for (const f of fs.readdirSync(dir).filter((f) => /^\d.*\.js$/.test(f)).sort()) {
  let s;
  global.registerSection = (x) => { s = x; };
  try { require(path.join(dir, f)); } catch (e) { bad(f, 'does not load: ' + e.message); continue; }
  const id = s.id;
  console.log(`${id} ${s.title} — ${s.scenes.length} scenes, ${s.cards.length} cards (${s.cards.filter(c=>c.accept).length} typed)`);
  if (f !== id + '.js') bad(id, 'filename mismatch');
  if (!['Cell structure','Cell division','Transport in cells'].includes(s.topic)) bad(id, 'topic ' + s.topic);
  s.scenes.forEach((sc, i) => {
    const p = sc.params || {}, t = `scene ${i} (${sc.type})`;
    if (!TYPES.includes(sc.type)) bad(id, t + ' unknown type');
    if (!sc.title || !sc.text) bad(id, t + ' missing title/text');
    if (sc.type === 'split') { const n = p.kind === 'binary' ? 4 : 6; if ((p.steps||[]).length !== n) bad(id, `${t} needs ${n} steps, has ${(p.steps||[]).length}`); }
    if (sc.type === 'ladder') (p.items||[]).forEach((it) => { if (!(it.metres > 0)) bad(id, t + ' bad metres ' + it.label); });
    if (sc.type === 'squad' && !['animal','plant','bacteria'].includes(p.cellType)) bad(id, t + ' cellType ' + p.cellType);
    if (sc.type === 'flow' && !['diffusion','osmosis','active'].includes(p.mode)) bad(id, t + ' mode ' + p.mode);
    const lists = { squad: 'parts', versus: 'rows', cycle: 'stages', ladder: 'items', branch: 'outcomes', chain: 'steps', commentary: 'lines' };
    const max = { squad: 8, versus: 7, cycle: 6, ladder: 7, branch: 6, chain: 8, commentary: 5 };
    if (lists[sc.type] && !((p[lists[sc.type]]||[]).length)) bad(id, t + ' empty ' + lists[sc.type]);
    if (lists[sc.type] && (p[lists[sc.type]]||[]).length > max[sc.type]) bad(id, `${t} too many ${lists[sc.type]} (${p[lists[sc.type]].length} > ${max[sc.type]}) — extras hidden`);
    if (sc.type === 'branch' && !p.centre) bad(id, t + ' no centre');
  });
  s.cards.forEach((c, i) => {
    if (!c.q || !c.a) bad(id, `card ${i} missing q/a`);
    if (!Array.isArray(c.options) || c.options.length !== 3) bad(id, `card ${i} options != 3`);
    else if (c.options.some((o) => o.trim().toLowerCase() === c.a.trim().toLowerCase())) bad(id, `card ${i} answer duplicated in options`);
    if (c.accept && (!Array.isArray(c.accept) || !c.accept.length)) bad(id, `card ${i} accept malformed`);
  });
}
console.log(problems ? `\n${problems} problem(s)` : '\nAll content OK');

// Explain-before-use check: flag glossary words that appear in a section BEFORE the section that teaches them.
const gPath = path.join(dir, 'glossary.js');
if (fs.existsSync(gPath)) {
  let G = [];
  global.registerGlossary = (g) => { G = g; };
  require(gPath);
  const order = fs.readdirSync(dir).filter((f) => /^\d/.test(f)).map((f) => f.replace('.js', '')).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const rank = (id) => order.indexOf(id);
  console.log(`\nGlossary: ${G.length} terms`);
  const early = [];
  for (const id of order) {
    let s; global.registerSection = (x) => { s = x; }; delete require.cache[require.resolve(path.join(dir, id + '.js'))]; require(path.join(dir, id + '.js'));
    const text = JSON.stringify([s.intro, s.scenes, s.cards]).toLowerCase();
    for (const g of G) {
      if (rank(g.section) <= rank(id)) continue;
      const hit = [g.term].concat(g.forms || []).find((f) => new RegExp(`(?<![\\w-])${f.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`).test(text));
      if (hit) early.push(`${id} uses "${hit}" (taught in ${g.section})`);
    }
  }
  console.log(early.length ? `Words used before the section that teaches them (check each is explained where used):\n  ${early.join('\n  ')}` : 'No words used before they are taught');
}
