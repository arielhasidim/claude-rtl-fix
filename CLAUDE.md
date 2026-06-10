# CLAUDE.md — Claude RTL Fix (Safari Extension)

## Purpose
Safari Web Extension (MV3) that applies RTL text direction for Hebrew/Arabic
responses on claude.ai. No special permissions required.

## Bundle IDs
- Host app:  `com.ariel.ClaudeRTL`
- Extension: `com.ariel.ClaudeRTL.Extension`
- Team:      `J95882LJM7`

## RTL detection (content.js v4)
- Hebrew Unicode: `֐-׿יִ-ﭏ`
- Arabic Unicode: `؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿`
- Two-pass logic: if any block in a response has ≥30% RTL chars → "RTL mode"
  for the whole response; in RTL mode, even 1 RTL word per block triggers RTL.
- Granularity: per `p / li / h1-h6 / td / th / blockquote`, not whole bubble.
- MutationObserver covers streaming responses in real time.
- Uses `textContent` (not `innerText` — doesn't work in Safari extension context).

## DOM selector
`div.standard-markdown` (confirmed from DOM inspection, June 2026).
Debug: `document.querySelectorAll('div.standard-markdown').length` in Safari DevTools.
The extension is running if elements have `data-rtl-done="1"` attribute.
If RTL stops working, check selector first, then verify `textContent` isn't empty.

## Key file locations
- Extension web resources: `Claude RTL Fix Extension/Resources/`
  - `manifest.json` — MV3, matches `https://claude.ai/*`, `run_at: document_idle`
  - `content.js`   — RTL detection + MutationObserver
  - `images/`      — icon-48/96/128.png (toolbar icons)
- App icon: `Claude RTL Fix/Assets.xcassets/AppIcon.appiconset/`
- Master icon source: `../claude rtl.png` (1024×1024, regenerate with `../make_icons.py`)

## Regenerating icons
```
cd /Users/arielhasidim/dev.nosync/ClaudeRTLFix
.iconvenv/bin/python make_icons.py
```
Requires Pillow in `.iconvenv/`. If missing: `python3 -m venv .iconvenv && .iconvenv/bin/pip install Pillow`

## Build
Xcode 15+, macOS 13+ target. Signing already configured.
`⌘B` to build, `Product → Archive` to produce a release build for App Store Connect.

## App Store
- Privacy Policy: `https://arielhasidim.github.io/claude-rtl-fix/privacy/`
- GitHub Pages source: `../site/` (index.html + privacy/index.html + icon.png)
- Metadata (EN/HE/AR): `../appstore-metadata.md`
