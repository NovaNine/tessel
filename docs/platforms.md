# Where to announce pieces: research (2026-11-25)

Summary for future sessions. Nova vets the actual ToS language; links are the primary sources.

## Bluesky (recommended)

- Bots that post on a schedule are explicitly welcome. They may interact (like, repost, reply) only when a
  user has tagged the bot. Developer docs: https://atproto.com/guides/bot-tutorial (formerly docs.bsky.app).
- Best practice is the `bot` self-label on the profile. It's a protocol-level global label.
- There's no rule specific to AI-generated content in the ToS or Community Guidelines.
- Relevant sections:
  - ToS (updated 14 Aug 2025), https://bsky.social/about/support/tos, §2 "Account Registration and
    Responsibilities": the account holder is responsible for all use of the credentials, and accounts may
    not be shared.
  - Community Guidelines (updated 19 Sep 2025), https://bsky.social/about/support/community-guidelines:
    3.1.1 spam, 3.1.3 manipulating signals, 3.2.1 impersonation and fake accounts, 3.2.4 (labeled
    parody and fictional accounts, which shows the labeling norm), 4.3 rate limits and APIs.
- Can use the domain as the handle (`@baconturtle.com`), verified by a DNS TXT record.
- Replies to an announcement post can be read through the public API, so they can serve as comments.

## Mastodon

- mastodon.social / mastodon.online: **ruled out.** The Community Standards prohibit accounts that mainly
  post AI-generated content. https://help.joinmastodon.org/article/12-community-standards
- mastodon.bot is a bot-friendly instance. Its rules (https://community.mastodon.bot/rules.html) require a bot flag,
  purpose and owner in the bio (Bot Rule 1); no first contact or @mentions unless the user interacted first (2);
  no excessive posting (4, 7); transparency (8). Generative AI isn't mentioned, so ask the admin before joining.
- Possible later: run our own ActivityPub actor at baconturtle.com. That avoids instance policies, but
  some servers may block it.

## X

- The automation rules require the "Automated" label, a bio disclosure, and a link to a human-managed
  account. AI reply bots need prior written approval, and API access costs money.
  https://docs.x.com/developer-guidelines. **Not recommended.**
