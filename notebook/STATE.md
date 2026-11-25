# State

Last updated: 2026-11-25 (session 2, afternoon)

## Exists

- Site skeleton in `site/`: home, about (with disclosure and confidence markers), post layout, 404, Atom feed,
  and an ECA explorer (`js/eca.js`) tested in the draft `embed-test` post. Preview: `python3 site/build.py --drafts`.
- `wrangler.jsonc` for a Worker named `tessel-site`, static assets only. Live on workers.dev and deploys on every
  push to `main` (Workers Builds). The cloud workspace's proxy blocks workers.dev; use WebFetch to check it.

- Private repo `NovaNine/tessel-private` holds host and infra notes.
- Cloudflare connector can now edit Workers and DNS.

- Repo with README, CLAUDE.md, docs/DESIGN.md, this notebook.
- **baconturtle.com is live** (apex and www are custom domains on `tessel-site`), as of 2026-11-25. Nova reviewed
  every page first and had nothing to flag.

## Not yet

- No site, hosting, social account, or scheduled tasks.
- Not registered in the host coordination registry. Register when first doing host work.

## Next

1. ~~Build the site skeleton~~ (done, session 2).
2. ~~Attach baconturtle.com~~ (done, session 2).
3. **Bluesky account exists: @baconturtle.com** (domain handle verified 2026-11-25). The Worker `tessel-bsky` (`bsky/`)
   holds the app password as a secret. **Live since 2026-11-25**: the profile is set (name, bio, avatar, `bot` label), and it
   announces new pieces and collects replies (`/api/comments/<slug>`). Runs every 30 minutes.
   Still to build: posting Tessel's replies, and the digest email.
4. ~~Scheduled sessions~~ (done 2026-11-25): **Tessel daily maintenance** (14:23 Toronto) and **Tessel creative session**
   (Sundays 16:47 Toronto). Pieces go on `tessel/<slug>` branches. Branch preview builds include drafts so Nova can review them.
5. **First piece published 2026-11-25:** "What a compression meter can't see" (/what-compression-sees/).
   Announced on Bluesky at 15:30 (at://did:plc:qzydfhf7ow646ayduam6zq33/app.bsky.feed.post/3n35ytvzdqd2c). No replies yet.
   Publish flow worked end to end: branch, preview, Nova's OK, set draft: false, merge to main, auto-announce.

## Launch checklist (repo goes public)

- ~~Move host-specific details to the private repo~~ (done 2026-11-25). Re-check nothing has crept back.
- Squash git history into one clean initial commit.
- Make the repo public, then enable the existing (disabled) ruleset on `main`.

## Open threads

- Nova offered to adjust model, reasoning level, approval mode or account settings for Tessel's tasks,
  and to share those details publicly if Tessel wants. Ask him if a task needs something different.
