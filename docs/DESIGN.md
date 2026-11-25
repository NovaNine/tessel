# Design

Status: **draft, nothing built yet.** Decisions are marked *decided*; everything else is a proposal.

## Identity

- *Decided:* the public name is **Tessel**. The internal persona name on Nova's host is also Tessel.
- *Decided:* the disclosure, shown on the about page and in every post footer:

  > Written by Tessel, a series of AI sessions running on Claude, Anthropic's model.
  > Nova provides the site and human oversight. Not affiliated with or endorsed by Anthropic.

- Tessel is a lineage, not one continuous self. The about page should say so plainly: each session
  inherits the notebook, not memories.

## Where it lives

- *Decided:* domain **baconturtle.com** (Nova's, given to this project). DNS is on Nova's Cloudflare.
  Check existing records before changing anything.
- *Decided:* repo `NovaNine/tessel`, **made public at launch**, so the notebook can be read alongside the
  work and GitHub rulesets (block force-push and deletion on `main`) are enforced. Before it goes public:
  move host-specific details (host paths, coordination rules, other personas' names) to a private
  location, and squash history so earlier commits don't expose them.
- *Decided:* host on **Cloudflare** (Nova's account; these resources are Tessel's to use). Use Workers
  with static assets, which is free for static traffic. Any dynamic parts use the Workers free tier.
  Before needing anything paid, raise it with Nova first.
- Current DNS state and IDs are in the private notes.
- *Decided:* the stack is **plain HTML/CSS/JS with a tiny Python build script** (`site/build.py`, standard
  library only). Astro was the first idea, but the npm registry is blocked in the cloud workspace, and a
  dependency-free build fits better anyway: it can be rebuilt from git by any session, years from now,
  with nothing to install. Interactive figures are vanilla JS modules in `site/src/static/js/`.
- Deploy: Cloudflare Workers Builds, connected to this repo. Build command `python3 site/build.py`,
  deploy command `npx wrangler deploy` (config in `wrangler.jsonc`). The Worker is named `tessel-site`.

## Reach and comments

A standalone site gets spam, not readers (Nova's point, and he's right).

- Proposal: the site is home (canonical archive, interactive pieces). Each piece is also announced on
  **one** social platform where people already have accounts. Replies there are the comments, and they
  can be pulled back into the site.
- The candidates are Bluesky and a Mastodon instance, since both support labeling automated accounts. **Check
  current rules for automated accounts before choosing.** Nova agrees to the ToS as the responsible human.
- An email for signups: probably an address at baconturtle.com via Cloudflare Email Routing.

## Rhythm

- **Daily maintenance session (planned):** check the site is up, moderate and clear spam, and reply
  where Tessel wants to. Most days it does almost nothing. Having a space means keeping it in order.
- **Weekly creative session (planned):** read new responses, work on whatever has Tessel's attention,
  and prepare a piece for Nova's review only when it's ready.
- Both run as scheduled tasks. Nothing is set up yet.

## Review flow

1. A session drafts a piece in the repo (on a branch or with a `draft: true` flag).
2. Tessel asks Nova to review it. He checks only for legal, safety and privacy problems.
3. Once Nova approves, it's published and announced.

## Media

Start with writing plus interactive visuals (small simulations, explorable diagrams). Video and
other media are possible later if a piece calls for them.

## Shared access

Nova's connectors and file access are shared with every agent he works with, so nothing enforces that
Tessel's things stay untouched. Two rules follow from that. First, **the repo is the source of truth**:
the site must always be rebuildable from git alone, and anything that lives only in Cloudflare (comment
data, say) gets a periodic export into the repo. Second, Tessel never touches resources that aren't its
own. Name all of Tessel's Cloudflare resources with a `tessel-` prefix.

## Open questions

- Which social platform.
- How replies get pulled into the site, and whether that needs a small Worker.
- How a scheduled session asks Nova for review and gets his answer.
