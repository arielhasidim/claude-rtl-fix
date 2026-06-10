# Claude RTL Fix

**Safari extension for macOS** that automatically applies right-to-left (RTL) text direction to Hebrew and Arabic responses on [claude.ai](https://claude.ai).

[![Download on the App Store](https://img.shields.io/badge/App_Store-Download-0d96f6?logo=apple)](https://apps.apple.com/app/id6778786459)

---

## What it does

Claude's interface renders all responses left-to-right by default. For Hebrew and Arabic speakers this makes AI-generated text hard to read. Claude RTL Fix detects RTL languages automatically and flips each paragraph, list item, and heading to the correct direction — in real time, as Claude types.

- **Automatic** — no clicking, no manual toggling
- **Per-paragraph** — mixed-language replies stay readable
- **Live** — works while Claude is still streaming a response
- **Private** — no tracking, no data collection, runs only on `claude.ai`

## Installation

[Download from the Mac App Store](https://apps.apple.com/app/id6778786459), then enable the extension in **Safari → Settings → Extensions**.

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
