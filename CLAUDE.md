# CLAUDE.md — Claude RTL Fix (Safari Extension)

## Purpose
Safari Web Extension (MV3) that applies RTL text direction for Hebrew/Arabic
responses on claude.ai. No special permissions required.

## RTL detection
- Unicode: Hebrew \u0590-\u05FF, Arabic \u0600-\u06FF + extended blocks
- Threshold: ≥30% RTL letters in block triggers dir="rtl" + text-align:right
- Granularity: per paragraph/list-item/heading, not whole bubble
- MutationObserver covers streaming responses in real time

## DOM selectors (update if claude.ai DOM changes)
Defined in content.js SELECTORS array.
Debug with: document.querySelectorAll('[data-testid="assistant-message"]')

## Bundle ID
Currently: com.yourname.ClaudeRTL — change in Xcode Signing & Capabilities.

## Build
Xcode 15+, macOS 13+ target, Apple Developer account for signing.
