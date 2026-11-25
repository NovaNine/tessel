// A gallery of the 88 distinct elementary cellular automata, sorted by how compressible their output is.
//
// Usage in a post:
//   <figure class="live" data-eca-gallery data-src="/data/eca-compress.json">
//     <div class="controls"></div><div class="gallery"></div>
//   </figure>
//   <script type="module" src="/js/eca-gallery.js"></script>
//
// Two modes:
//   random: each rule starts from a random row (fixed seed, so everyone sees the same pictures)
//   single: each rule starts from one black cell
// The sort order and numbers come from the precomputed measurements in the JSON (zlib on much larger runs).
// The thumbnails are just small renders of the same rules, for the eye.

const W = 81, H = 54;

function render(canvas, rule, mode) {
  const ctx = canvas.getContext("2d");
  const ink = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#000";
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = ink;
  let row = new Uint8Array(W);
  if (mode === "random") {
    let s = 12345;                              // tiny LCG: same "random" row for every visitor
    for (let i = 0; i < W; i++) { s = (s * 1103515245 + 12345) >>> 0; row[i] = (s >>> 16) & 1; }
  } else {
    row[W >> 1] = 1;
  }
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) if (row[x]) ctx.fillRect(x, y, 1, 1);
    const next = new Uint8Array(W);
    for (let i = 0; i < W; i++) {
      const n = (row[(i - 1 + W) % W] << 2) | (row[i] << 1) | row[(i + 1) % W];
      next[i] = (rule >> n) & 1;
    }
    row = next;
  }
}

async function mount(fig) {
  const data = await (await fetch(fig.dataset.src)).json();
  const rules = Object.entries(data.rules).map(([r, v]) => ({ rule: Number(r), ...v }));
  const controls = fig.querySelector(".controls");
  const gallery = fig.querySelector(".gallery");
  let mode = fig.dataset.mode || "random";

  controls.innerHTML = `
    <span>start from:</span>
    <button type="button" data-mode="random">a random row</button>
    <button type="button" data-mode="single">one black cell</button>
    <span class="hint">sorted from least to most compressible</span>`;

  const draw = () => {
    controls.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    gallery.innerHTML = "";
    const sorted = [...rules].sort((a, b) => b[mode] - a[mode]);
    sorted.forEach((r, i) => {
      const cell = document.createElement("div");
      cell.className = "tile" + ([30, 110].includes(r.rule) ? " marked" : "");
      cell.title = `Rule ${r.rule} (same family: ${r.family.join(", ")}). Compression ratio ${r[mode].toFixed(3)}`;
      const c = document.createElement("canvas");
      c.width = W; c.height = H;
      render(c, r.rule, mode);
      const label = document.createElement("span");
      label.textContent = `${i + 1}. rule ${r.rule}`;
      cell.append(c, label);
      gallery.append(cell);
    });
  };
  controls.addEventListener("click", (e) => {
    const m = e.target.closest("button")?.dataset.mode;
    if (m) { mode = m; draw(); }
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", draw);
  draw();
}

document.querySelectorAll("figure[data-eca-gallery]").forEach(mount);
