# Claude RTL Fix

A **free Safari extension for macOS** that automatically fixes right-to-left (RTL) text direction for Hebrew and Arabic responses on [claude.ai](https://claude.ai).

[![Download on the Mac App Store](https://img.shields.io/badge/Mac_App_Store-Download-0d96f6?logo=apple)](https://apps.apple.com/app/id6778786459)

> **Requires:** macOS · Safari

---

## What it does

Claude renders all responses left-to-right by default. For Hebrew and Arabic speakers this makes AI-generated text hard or impossible to read. Claude RTL Fix is a Safari extension that detects RTL languages automatically and flips each paragraph, list item, and heading to the correct direction — in real time, as Claude types.

- **Automatic** — no clicking, no manual toggling
- **Per-paragraph** — mixed-language replies stay readable
- **Live** — works while Claude is still streaming a response
- **Private** — no tracking, no data collection, runs only on `claude.ai`

## Installation

1. [Download from the Mac App Store](https://apps.apple.com/app/id6778786459)
2. Open the app and click **"Quit and Open Safari Extensions Preferences…"**
3. Enable **Claude RTL Fix** in the list
4. Open [claude.ai](https://claude.ai) — Hebrew and Arabic responses are now RTL automatically

## How it works

`content.js` runs as a Manifest V3 content script on `claude.ai`. It:

1. Selects every `div.standard-markdown` container (one per response)
2. Counts RTL characters (`֐–׿` Hebrew, `؀–ۿ` Arabic + extended blocks) per block
3. If any block is ≥ 30 % RTL → entire response enters **RTL mode** (one RTL word per block is then enough to flip it)
4. Sets `dir="rtl"` and `text-align: right` on matching blocks
5. A `MutationObserver` repeats this for every DOM change (streaming)

## Debugging

If RTL stops working after a claude.ai update, check the selector:

```js
// In Safari DevTools console on claude.ai:
document.querySelectorAll('div.standard-markdown').length
// Should be > 0. If 0, the selector has drifted.
```

Elements processed by the extension have `data-rtl-done="1"`.

## Regenerating icons

Icons are generated from `claude rtl.png` (1024 × 1024 master):

```bash
python3 -m venv .iconvenv && .iconvenv/bin/pip install Pillow
.iconvenv/bin/python make_icons.py
```

## License

MIT — see [LICENSE](LICENSE).
