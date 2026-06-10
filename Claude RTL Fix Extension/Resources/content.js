// Claude RTL Fix — content script v4
// Supports Hebrew and Arabic responses.
// Two-pass logic: if any block in a response is ≥30% RTL chars → "RTL mode"
// for the whole response. In RTL mode, a single RTL word is enough per block.

const HEBREW_REGEX = /[\u0590-\u05FF\uFB1D-\uFB4F]/;
const ARABIC_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const RTL_REGEX    = new RegExp(`${HEBREW_REGEX.source}|${ARABIC_REGEX.source}`);

const RESPONSE_THRESHOLD = 0.30;

function rtlRatio(text) {
  if (!text?.trim()) return 0;
  const letters = [...text].filter(c => /\p{L}/u.test(c));
  if (!letters.length) return 0;
  return letters.filter(c => RTL_REGEX.test(c)).length / letters.length;
}

const BLOCK_SELECTOR = 'p, li, h1, h2, h3, h4, h5, h6, td, th, blockquote';

function isRTLResponse(container) {
  const blocks = container.querySelectorAll(BLOCK_SELECTOR);
  const targets = blocks.length ? [...blocks] : [container];
  return targets.some(b => rtlRatio(b.textContent) >= RESPONSE_THRESHOLD);
}

function fixContainer(container) {
  if (container.dataset.rtlContainerDone) return;

  const rtlMode = isRTLResponse(container);
  const blocks  = container.querySelectorAll(BLOCK_SELECTOR);

  const applyToBlock = (el) => {
    if (el.dataset.rtlDone) return;
    const text = el.textContent || '';
    const shouldRTL = rtlMode
      ? RTL_REGEX.test(text)                         // RTL mode: 1 word enough
      : rtlRatio(text) >= RESPONSE_THRESHOLD;        // Normal: 30% threshold
    if (shouldRTL) {
      el.dir = 'rtl';
      el.style.textAlign = 'right';
    }
    el.dataset.rtlDone = '1';
  };

  if (blocks.length > 0) blocks.forEach(applyToBlock);
  else applyToBlock(container);

  container.dataset.rtlContainerDone = '1';
}

const CONTAINER_SELECTOR = 'div.standard-markdown';
const run = () => document.querySelectorAll(CONTAINER_SELECTOR).forEach(fixContainer);
run();

new MutationObserver(() => run()).observe(document.body, {
  childList: true, subtree: true, characterData: true,
});
