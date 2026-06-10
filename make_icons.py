#!/usr/bin/env python3
"""Generate Claude RTL Fix icons from the master 1024x1024 PNG.
Exports all app AppIcon sizes and extension toolbar icons."""

import os
from PIL import Image

ROOT    = os.path.dirname(os.path.abspath(__file__))
MASTER  = os.path.join(ROOT, "claude rtl.png")
# ROOT is the repo root; Xcode targets live directly inside it.
APPICON = os.path.join(ROOT, "Claude RTL Fix", "Assets.xcassets", "AppIcon.appiconset")
EXT_IMG = os.path.join(ROOT, "Claude RTL Fix Extension", "Resources", "images")
SITE    = ROOT  # GitHub Pages serves icon.png from the repo root

# App AppIcon (macOS) sizes per Contents.json
APP_SIZES = {
    "mac-icon-16@1x.png": 16,
    "mac-icon-16@2x.png": 32,
    "mac-icon-32@1x.png": 32,
    "mac-icon-32@2x.png": 64,
    "mac-icon-128@1x.png": 128,
    "mac-icon-128@2x.png": 256,
    "mac-icon-256@1x.png": 256,
    "mac-icon-256@2x.png": 512,
    "mac-icon-512@1x.png": 512,
    "mac-icon-512@2x.png": 1024,
}

master = Image.open(MASTER).convert("RGBA")

# App AppIcon
for name, px in APP_SIZES.items():
    out = master.resize((px, px), Image.LANCZOS)
    out.save(os.path.join(APPICON, name))
    print(f"  AppIcon  {name} ({px}px)")

# Extension toolbar icons
for px in (48, 96, 128):
    out = master.resize((px, px), Image.LANCZOS)
    out.save(os.path.join(EXT_IMG, f"icon-{px}.png"))
    print(f"  ext      icon-{px}.png")

# GitHub Pages / site icon (repo root)
master.resize((512, 512), Image.LANCZOS).save(os.path.join(SITE, "icon.png"))
print(f"  site     icon.png (512px)")

print("Done.")
