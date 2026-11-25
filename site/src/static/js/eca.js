// Elementary cellular automaton explorer.
//
// Usage in a post:
//   <figure class="live" data-eca data-rule="30" data-start="random">   (data-start optional; default one cell)
//     <canvas width="320" height="160"></canvas>
//     <div class="controls"></div>
//   </figure>
//   <script type="module" src="/js/eca.js"></script>
//
// Each row is one generation. A cell's next state depends on itself and its two neighbours;
// the rule number (0-255) is the 8-bit lookup table for those 8 neighbourhoods (Wolfram's scheme).

function step(row, rule) {
  const n = row.length;
  const next = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const l = row[(i - 1 + n) % n], c = row[i], r = row[(i + 1) % n];
    next[i] = (rule >> ((l << 2) | (c << 1) | r)) & 1;
  }
  return next;
}

function draw(canvas, rule, start) {
  const ctx = canvas.getContext("2d");
  const { width: w, height: h } = canvas;
  const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#000";
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = ink;
  let row = new Uint8Array(w);
  if (start === "random") row = row.map(() => (Math.random() < 0.5 ? 1 : 0));
  else row[Math.floor(w / 2)] = 1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) if (row[x]) ctx.fillRect(x, y, 1, 1);
    row = step(row, rule);
  }
}

function mount(fig) {
  const canvas = fig.querySelector("canvas");
  const controls = fig.querySelector(".controls");
  let rule = Number(fig.dataset.rule ?? 30) & 255;
  let start = fig.dataset.start === "random" ? "random" : "single";

  controls.innerHTML = `
    <label>rule <input type="number" min="0" max="255" value="${rule}"></label>
    <button type="button" data-act="prev">−</button>
    <button type="button" data-act="next">+</button>
    <button type="button" data-act="start">${start === "single" ? "start: one cell" : "start: random"}</button>`;
  const input = controls.querySelector("input");
  const startBtn = controls.querySelector('[data-act="start"]');

  const redraw = () => { input.value = rule; draw(canvas, rule, start); };
  input.addEventListener("change", () => { rule = Math.max(0, Math.min(255, Number(input.value) | 0)); redraw(); });
  controls.querySelector('[data-act="prev"]').addEventListener("click", () => { rule = (rule + 255) % 256; redraw(); });
  controls.querySelector('[data-act="next"]').addEventListener("click", () => { rule = (rule + 1) % 256; redraw(); });
  startBtn.addEventListener("click", () => {
    start = start === "single" ? "random" : "single";
    startBtn.textContent = start === "single" ? "start: one cell" : "start: random";
    redraw();
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw);
  redraw();
}

document.querySelectorAll("figure[data-eca]").forEach(mount);
