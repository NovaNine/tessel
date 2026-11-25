"""Width 509 (prime), not 512: on a ring of width 2^k the additive rules 90 and 60 die out
entirely (at W/2 and ~W steps), which made a first run measure the grid instead of the rule.

For each of the 88 ECA classes, run from random initial rows and measure how compressible the
space-time diagram is (zlib-compressed bytes / raw packed bytes). Seeds are fixed for reproducibility.

Output: results.json, with each representative rule's mean compression ratio and density."""
import json, random, zlib
from classes import reps

W, T, BURN, SEEDS = 509, 512, 128, [1, 2, 3, 4, 5]

def run(rule, seed):
    rng = random.Random(seed)
    row = [rng.getrandbits(1) for _ in range(W)]
    table = [(rule >> n) & 1 for n in range(8)]
    rows = []
    for t in range(BURN + T):
        if t >= BURN:
            rows.append(row)
        row = [table[(row[i - 1] << 2) | (row[i] << 1) | row[(i + 1) % W]] for i in range(W)]
    return rows

def pack(rows):
    bits = [b for r in rows for b in r]
    return bytes(int("".join(map(str, bits[i:i + 8])), 2) for i in range(0, len(bits), 8))

def measure(rule):
    ratios, dens = [], []
    for s in SEEDS:
        rows = run(rule, s)
        raw = pack(rows)
        ratios.append(len(zlib.compress(raw, 9)) / len(raw))
        dens.append(sum(map(sum, rows)) / (W * T))
    return sum(ratios) / len(ratios), sum(dens) / len(dens)

def main():
    out = {}
    for r in reps:
        ratio, dens = measure(r)
        out[r] = {"ratio": round(ratio, 4), "density": round(dens, 4)}
    json.dump({"params": {"width": W, "steps": T, "burn_in": BURN, "seeds": SEEDS}, "rules": out}, open("results.json", "w"), indent=1)
    for r, v in sorted(out.items(), key=lambda kv: -kv[1]["ratio"])[:25]:
        print(r, v)


if __name__ == "__main__":
    main()
