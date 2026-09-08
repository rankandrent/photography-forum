# Launch playbook

The hard part of a forum is not the software. An empty forum reads as abandoned,
and people do not post into silence. This is the sequence that works.

---

## Before you open the doors

**1. Narrow the niche.** "Photography" competes with Reddit and DPReview. Pick
something you can be the best place for: wedding photography in Pakistan, street
photography with fixed lenses, the business side of commercial work. You can widen
later; you cannot start wide.

**2. Rewrite the identity.** `src/lib/site.ts` holds the name, tagline and
description used across every page and meta tag. Change these before you post
anything, because the tagline shapes what people post.

**3. Seed 25–30 real threads.** Not filler — actual questions you have had, with
actual answers. Spread them across the categories over "past" dates so the forum
looks lived-in rather than launched-yesterday. The demo seed shows the shape and
length that works; replace its content with yours.

**4. Recruit 8–10 founding members** privately, before launch. People who will
answer questions for the first month. Give them the MOD role if they will help
moderate. This is the single biggest predictor of whether a forum survives.

**5. Post the guidelines** and make sure they say what a good critique looks like.
The critique culture is set in the first two weeks and is almost impossible to
change afterwards.

**6. Start the first weekly challenge** on launch day. It gives every new visitor
something to do that does not require them to have a question.

---

## First 90 days

**Every day**
- Answer every unanswered thread within 24 hours, even if briefly. An unanswered
  thread is a visitor who does not come back.
- Clear the moderation queue.

**Every week**
- Close the old challenge, publish the podium, open the next one.
- Rewrite three bad thread titles into questions people actually search for.
- Post two threads yourself.

**Every month**
- Add editorial descriptions to the five gear pages with the most photos.
- Check Search Console for queries you are nearly ranking for, and write the
  thread that answers them properly.

---

## What kills new forums

| Cause | Prevention |
| --- | --- |
| Launching empty | Seed content and founding members first |
| Unanswered threads | Commit to a 24-hour answer rule for the first three months |
| "Nice shot 🔥" culture | Enforce the critique guidelines from day one; the rating fields exist to force specificity |
| Spam | Reports go to `/moderation`; check it daily. Add email verification before you get big |
| Owner burnout | Promote moderators early. Two active mods beat one exhausted founder |
| Chasing traffic before community | 100 people who post beat 10,000 who bounce |

---

## When to add what

- **Email digests** — once there is enough weekly activity to be worth an email.
  Not before; a digest of nothing teaches people to unsubscribe.
- **Private messages** — when members start asking for them.
- **Marketplace / buy-and-sell** — a strong draw for photographers, but it needs
  moderation capacity and scam-handling rules. Do not launch with it.
- **Paid membership** — only once free members are getting real value. Portfolio
  hosting and larger uploads are the natural first perks.
- **Real search engine** (Meilisearch, Typesense) — when the built-in `ILIKE`
  search gets slow, somewhere past a few thousand threads.
