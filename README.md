# Ohana click-through demos

Interactive, captioned walkthroughs of Ohana (Mesta's payments product), built the way the
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
| `prototype.html` | manual prototype: click the real buttons; the presenter bar advances when a step's `done()` is true |
| `prototype.html?demo=1` | same, but a static preview for thumbnails |
| `prototype.html?demo=1&play=1` | autoplay: cursor, ripple, captions, loops after the last op |
| `prototype.html?demo=1&play=1&slow=1` | autoplay at 1.8x the hold times |

The page listens for `postMessage({type:'demo', cmd:'pause'|'play'|'restart', speed})` so a parent
page can control it (see `index.html`). Debug: `app._jump(k)` applies ops `0..k-1` instantly and runs op `k`.

Run locally with any static server, e.g. `python3 -m http.server 8765` in this folder.

## How a demo is wired

Everything lives in the `<script>` of `prototype.html`:

1. **`INIT`** - the state object (`screen`, `entity`, `country`, `upload`, `form`, `methods`, `modal`, ...).
2. **`steps()`** - one entry per presenter-bar step: `{ title, hint, screen, act(state), done(state) }`.
   `act` is what "Do it for me" performs; `done` says when the viewer has completed the step by hand.
3. **Screen renderers** - `rLogin`, `rDash`, `rList`, `rCreate` (+ `rUpload`, `rBasic`, `rPayment`, `rSending`).
   Every clickable element carries `data-act="name"` (+ `data-arg`), handled in `act(name, arg)`.
   Text inputs carry `data-bind="key"` and an `aria-label`.
4. **`DEMOS[n]`** - the op list. Each op is `[kind, arg, target?]`:
   - `['go', stepIdx]` jump to a step
   - `['next', 0, ['Button label']]` perform the current step's `act` and advance
   - `['set', { patch }, ['Button label']]` patch the state directly
   - the optional third element is the click target: the visible text the cursor should find
     (`startsWith` match; `'=Exact text'` for an exact match; inputs match on their `aria-label`)
   - a `set` patch may also carry `_scroll: '#css-selector'` (scroll the pane there) or
     `_type: ['formKey', 'text to type']` (typewriter into that input)
5. **`CAPS[n]`** - one caption per op, same length as `DEMOS[n]`. The captions are the narration of
   the approved tutorial video, split into short advancing chunks.

Timing (from the reference): the cursor travels 0.9s, waits 1.0s, clicks (ripple + press squash),
the op applies, then holds 3.4s. The last op holds 6s, then the demo loops from a fresh `INIT`.

## Adding demo 2 (Create a Sender) and demo 3 (Create a Payment Order)

1. **Pull the screens from the footage.** Extract one frame every 2s from the approved MP4
   (`ffmpeg -i video.mp4 -vf fps=1/2 frames/f_%03d.jpg`), tile them into a contact sheet, and list
   every distinct screen. Sample colours, labels and copy from the frames; do not invent UI.
2. **Add state + screens.** Extend `INIT` with the new fields (e.g. `senderType`, `kyc`, `order`),
   add a renderer per screen (`rSenders`, `rCreateSender`, ...), register it in `rShell()`'s
   `body` map, and add the sidebar highlight. Reuse `sel()`, `inp()`, `.fcard`, `.choice`, `.pm`,
   `.chip`, the stepper and the sending modal: they are the same components in the real product.
3. **Add the steps.** Either append new entries to `steps()` with a `flow` key, or keep one
   `steps()` per flow and pick by `?demo=`. `screensFor(i)` must return the screen each step
   starts on; `stateAt(i)` replays `act` so Back / dots / Reset keep working.
4. **Transcribe the narration.** `python3 transcribe.py "Sender- OHANA.mp4" out.json` with whisper
   `small.en` (word timestamps on), fix "Ojana" -> "Ohana", then split each sentence into short
   chunks: one chunk per click, `set` ops with no target for explanatory chunks.
5. **Write `DEMOS[2]` and `CAPS[2]`** (same length). Every click target must be unique text on
   that screen among `cursor:pointer` elements; prefix with `=` when a longer label shares a prefix.
6. **Embed it.** In `index.html` add a second frame (`prototype.html?demo=2`) and a step list, or
   turn the demo picker into a `<select>` like the reference's "Demo layout" section.
7. Open `prototype.html?demo=2&play=1`, watch a full loop, and check the console is clean.

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
