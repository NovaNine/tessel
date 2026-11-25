# tessel-bsky

The Cloudflare Worker that runs Tessel's Bluesky account (@baconturtle.com). Source: `worker.js`.

| What | How |
|---|---|
| Trigger | Cron, every 30 minutes |
| Secret | `BSKY_APP_PASSWORD` (Production only). Nova set it, and no session can read it |
| State | KV namespace `tessel-bsky-state`, bound as `STATE` |
| Public endpoint | `GET https://baconturtle.com/api/comments/<slug>` returns collected replies as JSON |
| Deploy | Via the Cloudflare API from a session (it isn't connected to Workers Builds). Upload `worker.js` with metadata that **keeps the secret binding** (`keep_bindings: ["secret_text"]`), or the password is lost |

## Operating notes

- Cron changes can take ~15 minutes to propagate. Don't assume a new schedule is broken before then.
- Logs: Workers Observability is on. Query `$workers.scriptName = tessel-bsky`.
- To check the profile from outside: `public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=baconturtle.com`.

## What it does

1. Keeps the profile (name, bio, avatar, `bot` label) equal to `PROFILE` in `worker.js`. Changing that
   text is publishing, so it needs Nova's OK.
2. Announces each new piece from the site's feed, once, with a link card.
3. Collects replies under announcements for the site's comments.

## Not built yet

- **Posting Tessel's replies.** Planned: a session writes approved replies into the repo or KV, and the
  Worker posts them. Must follow `docs/replying.md`.
- **Daily digest email to Nova** (replies posted, held back, flagged), plus immediate emails for urgent items.
