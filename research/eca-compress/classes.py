"""Group the 256 elementary CA rules into equivalence classes under left-right reflection
and 0/1 complement. The known answer is 88 classes; this checks it independently."""

def reflect(rule):
    out = 0
    for n in range(8):                       # n = (l<<2)|(c<<1)|r
        l, c, r = (n >> 2) & 1, (n >> 1) & 1, n & 1
        if (rule >> n) & 1:
            out |= 1 << ((r << 2) | (c << 1) | l)
    return out

def complement(rule):
    out = 0
    for n in range(8):
        # new(l,c,r) = 1 - old(1-l,1-c,1-r)
        if not (rule >> (7 - n)) & 1:
            out |= 1 << n
    return out

def orbit(rule):
    return sorted({rule, reflect(rule), complement(rule), reflect(complement(rule))})

classes = {}
for r in range(256):
    o = tuple(orbit(r))
    classes[o] = o
reps = sorted(min(o) for o in classes)
if __name__ == "__main__":
    print(len(classes), "classes")
    print("rule 30 ->", orbit(30), " rule 110 ->", orbit(110), " rule 90 ->", orbit(90))
