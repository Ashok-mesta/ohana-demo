# Ohana click-through demos

Interactive, captioned walkthroughs of Ohana (Mesta's payments product): Create a Beneficiary,
Create a Sender and Create a Payment Order,, built the way the
AiPrise Token Sharing demo is built: the product UI is rebuilt as stateful HTML, and one step
list drives the fake cursor, the ripple clicks, the caption pill and the screen changes. Because
cursor, caption and screen all come from the same op, they cannot drift apart.

No build step. Plain HTML + vanilla JS. The only network requests are Google Fonts.

```
index.html        landing page: embeds the prototype in a 16:9 iframe with Play / Pause / Restart / Slow
prototype.html    the demo itself (UI, state, steps, DEMOS, CAPS, autoplay runner)
mesta-logo.svg    Mesta wordmark (inlined into prototype.html at the top of the script, `LOGO`)
```

## URLs

| URL | What it does |
|---|---|
| `prototype.html?flow=beneficiary` | self-service prototype: click the real buttons; a pulsing ring and a label mark the exact element to use next, and the presenter bar advances when a substep's `done()` is true |
| `prototype.html?flow=sender` / `?flow=order` | the other two flows, same shell |
| `prototype.html?flow=sender&play=1` | guided demo: cursor, ripple, captions, loops after the last op |
| `prototype.html?flow=order&play=1&slow=1` | guided demo at 1.8x the hold times |
| `prototype.html?demo=1` (2, 3) | legacy aliases for beneficiary / sender / order; `&demo=1` without `play` is a static preview for thumbnails |
| `prototype.html?flow=portal-setup` / `portal-default` / `portal-sender` / `portal-senders` | the four Portal Studio flows (Ohana admin, Global Fincon account) |
| `prototype.html?flow=aloha-register` / `aloha-wallet` / `aloha-account` / `aloha-beneficiary` / `aloha-payment` | the five Aloha sender-portal flows (the white-label portal a sender uses; `aloha.css` + `aloha.js` add the skin, screens and flows on top of the same engine) |
| `prototype.html?demo=4` … `demo=12` | numeric aliases: 4–7 Portal Studio, 8–12 Aloha |
| `prototype.html?flow=…&still=1&jump=K` | a still frame: the state after op K, no cursor or captions (the landing page's tiles and the screenshot capture use it) |

The page is a fixed 1600x900 design that scales itself to fill whatever window or iframe it is in,
and the presenter bar has a Full screen button (Fullscreen API; inside an iframe it asks the parent).
`index.html` opens both the guided demo and the self-service run in a full-screen lightbox.

The page listens for `postMessage({type:'demo', cmd:'pause'|'play'|'restart'|'fullscreen', speed})` so a
parent page can control it. Debug: `app._jump(k)` applies ops `0..k-1` instantly and runs op `k`.

Run locally with any static server, e.g. `python3 -m http.server 8765` in this folder.

## How a demo is wired

Everything lives in the `<script>` of `prototype.html`. `FLOWS` is the registry: one entry per flow
(`beneficiary`, `sender`, `order`) holding its `title`, `steps(c)`, `ops` and `caps`; `?flow=` picks one.

1. **`INIT`** - the shared state object (`screen`, `entity`, `country`, `upload`, `form`, `methods`, `modal`, ...)
   plus per-flow sub-objects (`sf` for the sender form, `o` for the order).
2. **`steps(c)`** - five main steps, each with nested substeps:
   `{ title, screen, doneIf?, subs: [{ t, target, say, act(state), done(state) }] }`.
   - `target` is the on-screen element the viewer must use (same label syntax as the demo ops;
     `bar: true` allows a presenter-bar button such as "Do it for me").
   - `say` is the self-service prompt shown next to that element.
   - `act` is what "Do it for me" performs for that substep; `done` says when it is complete.
   - A main step is complete when all its substeps are, or when `doneIf` is true (lets a viewer
     skip optional substeps, e.g. SWIFT). The current substep is the first one not done.
3. **Screen renderers** - `rLogin`, `rDash`, `rList`, `rCreate` (+ `rUpload`, `rBasic`, `rPayment`, `rSending`).
   Every clickable element carries `data-act="name"` (+ `data-arg`), handled in `act(name, arg)`.
   Text inputs carry `data-bind="key"` and an `aria-label`.
4. **`DEMOS[n]`** - the guided-demo op list. Each op is `[kind, arg, target?]`:
   - `['go', stepIdx]` jump to a main step
   - `['set', patch | state => patch, ['Button label']]` patch the state directly
   - `['next', 0, ['Button label']]` perform the current substep's `act`
   - the optional third element is the click target: the visible text the cursor should find
     (`startsWith` match; `'=Exact text'` for an exact match; inputs match on their `aria-label`)
   - a `set` patch may also carry `_scroll: '#css-selector'` (scroll the pane there) or
     `_type: ['formKey', 'text to type']` (typewriter into that input)
   Step and substep progress in the presenter bar follow from the `done()` checks, so the guided
   demo and the self-service run share one definition of "complete".
5. **`CAPS[n]`** - one caption per op, same length as `DEMOS[n]`. The captions are the narration of
   the approved tutorial video, split into short advancing chunks. The caption pill's counter shows
   the main step (`1/5` ... `5/5`), not the op index.

Timing (from the reference): the cursor travels 0.9s, waits 1.0s, clicks (ripple + press squash),
the op applies, then holds 3.4s. The last op holds 6s, then the demo loops from a fresh `INIT`.

## The site

Four pages share `site.css` and `site.js`. `index.html` is the home page with one panel per product; each panel links to its page. `ohana.html` (3 demos), `portal-studio.html` (4 demos) and `aloha.html` (5 demos) each show only their own demos, filtered by `<body data-product="…">` against the `group` in the `DEMOS` registry in `site.js`. Every page has the Guided / Hands-on switch, the full-screen lightbox with Copy link, and the shared nav. `page.html#flow` lands on that demo's tile. The look is deliberately plain: white and stone grounds, ink type, Geist only. Tile pictures are `assets/stills/<flow>.jpg`, captured from `prototype.html?flow=…&still=1&jump=K`.

## Aloha · the sender-portal skin

`aloha.js` is loaded after the engine and before `app.mount()`. It extends `Component.prototype` with the Aloha screens (`rAlShell`, `rAlOnb`, `rAlWalletNew`, `rAlPay`, …), a second action map (`alAct`, consulted before the Ohana one), a dotted-path binder for `data-bind="al.…"` inputs, and five `FLOWS` entries whose `shell: 'aloha'` switches the chrome. Per-flow state lives in `state.al` (`reg`, `onb`, `w`, `fa`, `p`), screens are prefixed `al-`, and the Aloha beneficiary flow reuses the Ohana `rCreate` form inside the Aloha shell, exactly as the footage does. Substep targets that open a dropdown and then pick a value are one substep with a target computed from `c.state.openSel` (see `dyn()`), so the self-service prompt moves from the select to the option.

## Adding another flow

1. **Pull the screens from the footage.** Extract one frame every 2s from the approved MP4
   (`ffmpeg -i video.mp4 -vf fps=1/2 frames/f_%03d.jpg`), tile them into a contact sheet, and list
   every distinct screen. Sample colours, labels and copy from the frames; do not invent UI.
2. **Add state + screens.** Extend `INIT` with the new fields (e.g. `senderType`, `kyc`, `order`),
   add a renderer per screen (`rSenders`, `rCreateSender`, ...), register it in `rShell()`'s
   `body` map, and add the sidebar highlight. Reuse `sel()`, `inp()`, `.fcard`, `.choice`, `.pm`,
   `.chip`, the stepper and the sending modal: they are the same components in the real product.
3. **Add the steps.** Keep five main steps per flow and nest the detail as substeps, each with a
   `target` and a `say` prompt so the self-service run can point at the exact element. Either
   append to `steps()` with a `flow` key or keep one `steps()` per flow and pick by `?demo=`.
   `screensFor(i)` must return the screen each step starts on; `stateAt(i)` replays the substep
   `act`s so Back / dots / Reset keep working.
4. **Transcribe the narration.** `python3 transcribe.py "Sender- OHANA.mp4" out.json` with whisper
   `small.en` (word timestamps on), fix "Ojana" -> "Ohana", then split each sentence into short
   chunks: one chunk per click, `set` ops with no target for explanatory chunks.
5. **Write the flow's `ops` and `caps`** (same length) in its `FLOWS` entry. Every click target must be unique text on
   that screen among `cursor:pointer` elements; prefix with `=` when a longer label shares a prefix.
6. **Embed it.** Add an entry to `DEMOS` in `index.html` (title, intro, the five steps with substeps);
   the gallery, thumbnails and the shared lightbox are generated from it.
7. Open `prototype.html?flow=<key>&play=1`, watch a full loop, and check the console is clean
   (a missing click target logs `demo target not found`).

## Publishing to GitHub Pages

The site is served from the `gh-pages` branch (GitHub enables Pages automatically for a public
repository when that branch is first pushed). `main` holds the same files; after each change:

```bash
cd ~/Developer/ohana-demo
git add -A && git commit -m "feat: ..."
git push origin main
git push -f origin main:gh-pages
```

Live URLs: `https://ashok-mesta.github.io/ohana-demo/` (landing page) and
`https://ashok-mesta.github.io/ohana-demo/prototype.html?demo=1&play=1` (autoplay).
Pages serves the folder as-is: no build, no secrets, nothing else to configure.

## Out of scope in this pass

Narration audio and MP4 export. The captions carry the narration text; adding a voice track means
syncing a per-op audio clip to the op holds (each op's hold would become the clip length).
