window.__ModuleLoader__.load({id:"dsh-liang-rheostat-skin",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var FRAME_COUNT = 31;
var KEYS = [0, 6, 12, 18, 24, 30];
var NAMES = ["\u5C0F\u96BE\u6881", "\u7262\u6881", "\u6881\u5B50", "\u6881\u5723", "\u6881\u795E", "\u6881\u7956"];
var GRAY = [194, 195, 200];
var GRAY_LIT = [204, 205, 210];
var BLACK = [8, 5, 2];
var BLACK_LIT = [28, 18, 8];
var STORAGE_KEY = "dsh-liang-rheostat-pos";
var STYLE_ID = "liang-rheostat-skin-css";
var HOST_CLASS = "liang-rheostat-host";
function clampPos(p) {
  return Math.min(FRAME_COUNT - 1, Math.max(0, p));
}
function loadPos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return 0;
    const n = Number(raw);
    return Number.isFinite(n) ? clampPos(n) : 0;
  } catch {
    return 0;
  }
}
var listeners = /* @__PURE__ */ new Set();
var pos = loadPos();
function getPos() {
  return pos;
}
function setPos(next) {
  const p = clampPos(next);
  if (p === pos) return;
  pos = p;
  try {
    localStorage.setItem(STORAGE_KEY, String(p));
  } catch {
  }
  for (const fn of listeners) fn();
}
function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
function usePos() {
  return (0, import_react.useSyncExternalStore)(subscribe, getPos, () => 0);
}
function nearestName(p) {
  const i = Math.round(clampPos(p));
  return NAMES[Math.min(NAMES.length - 1, Math.floor(i / 6))];
}
var EFFORT_ALIASES = {
  off: ["off", "none"],
  low: ["low"],
  high: ["high"],
  max: ["max", "xhigh"]
};
function effortFromPos(p) {
  const k = clampPos(p) / 6;
  if (k <= 0) return "off";
  if (k <= 2) return "low";
  if (k <= 4) return "high";
  return "max";
}
function canonicalPosForEffort(effort) {
  if (effort === "off") return 0;
  if (effort === "low") return 6;
  if (effort === "high") return 18;
  if (effort === "max") return 30;
  return null;
}
function normalizeEffortId(id) {
  if (id == null || id === "") return null;
  const raw = String(id).toLowerCase();
  for (const [name2, aliases] of Object.entries(EFFORT_ALIASES)) {
    if (aliases.includes(raw)) return name2;
  }
  return raw;
}
function findEffortEntry(efforts, want) {
  if (!Array.isArray(efforts) || !want) return null;
  const aliases = EFFORT_ALIASES[want] || [want];
  return efforts.find((item) => aliases.includes(String(item.id).toLowerCase())) ?? null;
}
function isDeepSeekSelection(selection) {
  if (!selection) return false;
  const blob = `${selection.provider || ""} ${selection.model || ""}`.toLowerCase();
  return blob.includes("deepseek");
}
var EMPTY_DIRECTORY = { current: null, groups: [], status: "idle", error: null };
function modelReasoning(state) {
  const current = state?.current;
  if (!current) return null;
  const group = (state.groups || []).find((item) => item.id === current.provider);
  const model = group?.models?.find((item) => item.id === current.model);
  if (!model?.reasoning) return null;
  return {
    selection: current,
    efforts: model.reasoning.efforts || [],
    defaultEffort: model.reasoning.defaultEffort
  };
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function lerpRgb(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}
function cssRgb(c, alpha) {
  const r = Math.round(c[0]);
  const g = Math.round(c[1]);
  const b = Math.round(c[2]);
  return alpha == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`;
}
function smoothstep(x) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}
function assetUrl(rel) {
  const base = document.querySelector("base")?.href || new URL("/", location.href).href;
  return new URL(rel.replace(/^\//, ""), base).href;
}
function frameUrl(i) {
  const file = `frame_${String(i).padStart(2, "0")}.jpg`;
  return assetUrl(`plugins/dsh-liang-rheostat-skin/assets/frames/${file}`);
}
var COLUMN_SELECTORS = ['[data-pane="conversation"]', '[class*="centerCol"]'];
var SIDEBAR_SELECTORS = ['[class*="sidebarCol"]', '[class*="_sidebarCol"]', "aside", '[data-pane="sidebar"]'];
function findConversationColumn() {
  for (const selector of COLUMN_SELECTORS) {
    const el = document.querySelector(selector);
    if (el instanceof HTMLElement && el.clientWidth > 200 && el.clientHeight > 200) {
      return el;
    }
  }
  return null;
}
function findSidebar() {
  const root = document.getElementById("root") || document.body;
  for (const selector of SIDEBAR_SELECTORS) {
    const el = root.querySelector(selector);
    if (el instanceof HTMLElement && el.clientWidth > 80 && el.clientHeight > 200) {
      return el;
    }
  }
  return null;
}
function commonAncestor(a, b) {
  const seen = /* @__PURE__ */ new Set();
  for (let n = a; n; n = n.parentElement) seen.add(n);
  for (let n = b; n; n = n.parentElement) {
    if (seen.has(n)) return n;
  }
  return null;
}
function findStageHost() {
  const center = findConversationColumn();
  const sidebar = findSidebar();
  if (center && sidebar) {
    const host = commonAncestor(center, sidebar);
    if (host instanceof HTMLElement && host !== document.body && host !== document.documentElement) {
      return host;
    }
  }
  const root = document.getElementById("root");
  if (root instanceof HTMLElement) return root;
  return center;
}
var images = new Array(FRAME_COUNT);
var preloadStarted = false;
function preloadFrames() {
  if (preloadStarted) return;
  preloadStarted = true;
  for (let i = 0; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.decoding = "async";
    img.src = frameUrl(i);
    img.onload = () => {
      images[i] = img;
      for (const fn of listeners) fn();
    };
  }
}
var STYLE = `
html.liang-rheostat-on,
html.liang-rheostat-on body {
  --dsw-alias-bg-base: transparent !important;
  --dsw-specific-sidebar-fill: transparent !important;
  background: var(--lr-bg-edge, #c2c3c8) !important;
}
html.liang-rheostat-on #root {
  background: transparent !important;
}
html.liang-rheostat-on .liang-rheostat-host {
  position: relative !important;
  background: transparent !important;
}
html.liang-rheostat-on .liang-rheostat-host > :not(#liang-rheostat-scene) {
  position: relative;
}
html.liang-rheostat-on #root [data-pane="conversation"],
html.liang-rheostat-on #root [class*="centerCol"],
html.liang-rheostat-on #root [class*="sidebarCol"],
html.liang-rheostat-on #root [class*="_sidebarCol"],
html.liang-rheostat-on #root [data-pane="sidebar"] {
  background-color: transparent !important;
  background-image: none !important;
}
#liang-rheostat-scene {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
#liang-rheostat-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 120% 90% at 50% 38%, var(--lr-bg-center) 0%, var(--lr-bg-edge) 72%);
}
#liang-rheostat-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle var(--lr-glow-r) at var(--lr-glow-x) var(--lr-glow-y),
    rgba(255, 236, 180, 0.80) 0%,
    rgba(232, 196, 110, 0.55) 28%,
    rgba(180, 130, 50, 0.28) 58%,
    rgba(90, 58, 14, 0.08) 78%,
    transparent 100%
  );
  opacity: var(--lr-glow-amt, 0);
  mix-blend-mode: screen;
}
#liang-rheostat-portrait {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: var(--lr-portrait-left, 48%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 8%, rgba(0,0,0,0.55) 18%, #000 32%, #000 100%);
  mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 8%, rgba(0,0,0,0.55) 18%, #000 32%, #000 100%);
}
#liang-rheostat-portrait canvas {
  width: 100%;
  height: 100%;
  display: block;
}
html.liang-rheostat-cards {
  --lr-ink: #f4f1e8;
  --lr-ink-muted: rgba(244, 241, 232, 0.62);
  --lr-surface: rgb(30, 27, 25);
}
html.liang-rheostat-cards [data-composer-card="true"] {
  background: var(--lr-surface) !important;
  color: var(--lr-ink) !important;
  border-color: rgba(193, 154, 73, 0.28) !important;
}
html.liang-rheostat-cards [data-composer-card="true"] :is(textarea, input, button, [data-input-mirror="true"], [role="textbox"]) {
  color: var(--lr-ink) !important;
  caret-color: #d5b56e !important;
  background-color: transparent !important;
}
html.liang-rheostat-cards [data-composer-card="true"] textarea::placeholder {
  color: var(--lr-ink-muted) !important;
  opacity: 1;
}
html.liang-rheostat-cards button[aria-label="\u65B0\u4F1A\u8BDD"],
html.liang-rheostat-cards button[aria-label="\u65B0\u5EFA\u4F1A\u8BDD"] {
  background: var(--lr-surface) !important;
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards button[aria-label="\u65B0\u4F1A\u8BDD"]:hover,
html.liang-rheostat-cards button[aria-label="\u65B0\u5EFA\u4F1A\u8BDD"]:hover {
  background: rgb(41, 35, 30) !important;
}
html.liang-rheostat-final button[aria-label="\u65B0\u4F1A\u8BDD"],
html.liang-rheostat-final button[aria-label="\u65B0\u5EFA\u4F1A\u8BDD"] {
  background: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}
html.liang-rheostat-final button[aria-label="\u65B0\u4F1A\u8BDD"]:hover,
html.liang-rheostat-final button[aria-label="\u65B0\u5EFA\u4F1A\u8BDD"]:hover {
  background: transparent !important;
}
html.liang-rheostat-cards :is([class*="sidebarCol"], [class*="_sidebarCol"], [data-pane="sidebar"]) {
  --dsw-alias-label-primary: var(--lr-ink) !important;
  --dsw-alias-label-primary-dimmed: rgba(244, 241, 232, 0.82) !important;
  --dsw-alias-label-secondary: var(--lr-ink-muted) !important;
  --dsw-alias-label-tertiary: rgba(244, 241, 232, 0.58) !important;
  --dsw-alias-label-caption: rgba(244, 241, 232, 0.58) !important;
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards :is([class*="sidebarCol"], [class*="_sidebarCol"], [data-pane="sidebar"]) *:not(svg, svg *) {
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards :is([class*="sidebarCol"], [class*="_sidebarCol"], [data-pane="sidebar"]) :is(input, textarea)::placeholder {
  color: var(--lr-ink-muted) !important;
  opacity: 1;
}
html.liang-rheostat-cards :is([class*="sidebarCol"], [class*="_sidebarCol"], [data-pane="sidebar"]) svg:not([viewBox="0 0 182 24"]) {
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards svg[viewBox="0 0 182 24"] > g[clip-path*="badge"] path,
html.liang-rheostat-cards svg[viewBox="0 0 182 24"] [clip-path*="badge"] path {
  fill: #171816 !important;
}
.lr-chip {
  position: relative;
  z-index: 6;
  display: inline-flex;
  align-items: center;
  margin: 0 3px;
  padding: 0;
  overflow: visible;
  user-select: none;
  -webkit-user-select: none;
}
.lr-slider {
  --lr-thumb-ring: #555;
  --lr-thumb-dot: #2c2c2c;
  --lr-thumb-fill: #fff;
  --lr-tick: rgba(15, 17, 21, 0.42);
  --lr-track: rgba(15, 17, 21, 0.16);
  position: relative;
  width: 124px;
  height: 28px;
  display: flex;
  align-items: center;
  overflow: visible;
}
.lr-slider__tooltip {
  position: absolute;
  z-index: 8;
  bottom: calc(100% + 7px);
  left: calc(10px + (100% - 20px) * var(--lr-slider-ratio, 0));
  min-width: max-content;
  padding: 5px 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  color: #171816;
  background: #fff;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.16);
  font-size: 11px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0.01em;
  pointer-events: none;
  transform: translateX(-50%);
  white-space: nowrap;
}
.lr-slider__tooltip::after {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 7px;
  height: 7px;
  content: "";
  background: inherit;
  border-radius: 1px;
  transform: translate(-50%, -4px) rotate(45deg);
}
html.liang-rheostat-dark .lr-slider__tooltip,
html.liang-rheostat-cards .lr-slider__tooltip {
  color: #f4f1e8;
  background: rgb(30, 27, 25);
  border-color: rgba(193, 154, 73, 0.28);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.4);
}
html.liang-rheostat-dark .lr-slider {
  --lr-thumb-ring: #d5b56e;
  --lr-thumb-dot: #c19a49;
  --lr-thumb-fill: #1a1610;
  --lr-tick: rgba(248, 240, 220, 0.5);
  --lr-track: rgba(248, 240, 220, 0.22);
}
.lr-slider__ticks {
  position: absolute;
  z-index: 0;
  inset: 0 10px;
  pointer-events: none;
}
.lr-slider__ticks::before {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  height: 1px;
  content: "";
  background: var(--lr-track);
  transform: translateY(-50%);
}
.lr-slider__tick {
  position: absolute;
  top: 50%;
  width: 1px;
  height: 7px;
  background: var(--lr-tick);
  transform: translate(-50%, -50%);
}
.lr-slider__range {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 28px;
  margin: 0;
  cursor: ew-resize;
  appearance: none;
  background: transparent;
  touch-action: pan-y;
}
.lr-slider__range:focus-visible {
  outline: none;
}
.lr-slider__range::-webkit-slider-runnable-track {
  height: 1px;
  border-radius: 1px;
  background: transparent;
}
.lr-slider__range::-webkit-slider-thumb {
  width: 13px;
  height: 13px;
  margin-top: -6px;
  border: 1.5px solid var(--lr-thumb-ring);
  border-radius: 50%;
  appearance: none;
  background: radial-gradient(circle, var(--lr-thumb-dot) 0 2px, var(--lr-thumb-fill) 2.5px);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.14);
}
.lr-slider__range::-moz-range-track {
  height: 1px;
  background: transparent;
  border: none;
}
.lr-slider__range::-moz-range-thumb {
  width: 11px;
  height: 11px;
  border: 1.5px solid var(--lr-thumb-ring);
  border-radius: 50%;
  background: var(--lr-thumb-fill);
  box-shadow: inset 0 0 0 2.5px var(--lr-thumb-fill), inset 0 0 0 4.5px var(--lr-thumb-dot);
}
@media (max-width: 760px) {
  .lr-slider {
    width: 92px;
  }
}
`;
function ensureStyle() {
  let el = document.getElementById(STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = STYLE;
}
function paintHarnessBadge(on) {
  const exact = document.querySelectorAll('svg[viewBox="0 0 182 24"]');
  const svgs = exact.length ? exact : document.querySelectorAll('[class*="logoRow"] svg, [class*="_logo"] svg, [class*="Logo"] svg');
  for (const svg of svgs) {
    const letters = svg.querySelectorAll('g[clip-path*="badge"] path, [clip-path*="badge"] path');
    for (const path of letters) {
      if (on) path.style.setProperty("fill", "#171816", "important");
      else path.style.removeProperty("fill");
    }
  }
}
function paintBackgroundVars(root, p) {
  const u = p / (FRAME_COUNT - 1);
  const dark = Math.pow(u, 1.7);
  const center = lerpRgb(GRAY_LIT, BLACK_LIT, dark);
  const edge = lerpRgb(GRAY, BLACK, dark);
  const luma = 0.2126 * edge[0] + 0.7152 * edge[1] + 0.0722 * edge[2];
  const amt = smoothstep((p - 18) / 12);
  const doc = document.documentElement;
  doc.style.setProperty("--lr-bg-center", cssRgb(center));
  doc.style.setProperty("--lr-bg-edge", cssRgb(edge));
  doc.style.setProperty("--lr-glow-amt", amt.toFixed(3));
  const darkMode = luma <= 110;
  const solidCards = p >= 24;
  const finalGear = p >= 30;
  doc.classList.toggle("liang-rheostat-dark", darkMode);
  doc.classList.toggle("liang-rheostat-cards", solidCards);
  doc.classList.toggle("liang-rheostat-final", finalGear);
  if (solidCards) {
    doc.style.setProperty("--lr-surface", "rgb(30, 27, 25)");
    doc.style.setProperty("--lr-ink", "#f4f1e8");
    doc.style.setProperty("--lr-ink-muted", "rgba(244, 241, 232, 0.62)");
  } else {
    ["--lr-surface", "--lr-surface-2", "--lr-ink", "--lr-ink-muted"].forEach((k) => {
      doc.style.removeProperty(k);
    });
  }
  paintHarnessBadge(solidCards);
  root.style.background = cssRgb(edge);
}
function placePortraitAndGlow(stage) {
  const stageBox = stage.getBoundingClientRect();
  const column = findConversationColumn();
  const colBox = column ? column.getBoundingClientRect() : stageBox;
  const portraitLeft = Math.max(0, colBox.left - stageBox.left + colBox.width * 0.48);
  stage.style.setProperty("--lr-portrait-left", `${portraitLeft}px`);
  const portrait = stage.querySelector("#liang-rheostat-portrait");
  const pr = portrait?.getBoundingClientRect();
  const gx = pr ? pr.left - stageBox.left + pr.width * 0.55 : stageBox.width * 0.74;
  const gy = pr ? pr.top - stageBox.top + pr.height * 0.42 : stageBox.height * 0.45;
  const gr = pr ? Math.max(pr.width, pr.height) * 1.15 : Math.max(stageBox.width, stageBox.height) * 0.7;
  stage.style.setProperty("--lr-glow-x", `${gx}px`);
  stage.style.setProperty("--lr-glow-y", `${gy}px`);
  stage.style.setProperty("--lr-glow-r", `${gr}px`);
}
function paintPortrait(canvas, p) {
  const a = Math.floor(p);
  const b = Math.min(FRAME_COUNT - 1, a + 1);
  const t = p - a;
  const imgA = images[a];
  if (!imgA) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;
  ctx.clearRect(0, 0, w, h);
  const drawCover = (img, alpha) => {
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    const s = Math.max(w / iw, h / ih);
    const dw = iw * s;
    const dh = ih * s;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, (w - dw) / 2 - dw * 0.04, (h - dh) * 0.12, dw, dh);
    ctx.globalAlpha = 1;
  };
  drawCover(imgA, 1);
  const imgB = images[b];
  if (imgB && t > 1e-3 && a !== b) drawCover(imgB, t);
}
function mountScene() {
  ensureStyle();
  preloadFrames();
  const doc = document.documentElement;
  doc.classList.add("liang-rheostat-on");
  const stage = document.createElement("div");
  stage.id = "liang-rheostat-scene";
  stage.setAttribute("aria-hidden", "true");
  stage.innerHTML = `
    <div id="liang-rheostat-bg"></div>
    <div id="liang-rheostat-glow"></div>
    <div id="liang-rheostat-portrait"><canvas></canvas></div>
  `;
  const canvas = stage.querySelector("canvas");
  let host = null;
  const attach = () => {
    const next = findStageHost();
    if (!next) return false;
    if (host && host !== next) host.classList.remove(HOST_CLASS);
    host = next;
    host.classList.add(HOST_CLASS);
    if (stage.parentElement !== host) host.insertBefore(stage, host.firstChild);
    return true;
  };
  attach();
  const mo = new MutationObserver(() => attach());
  mo.observe(document.body, { childList: true, subtree: true });
  const render = () => {
    const p = getPos();
    paintBackgroundVars(stage, p);
    placePortraitAndGlow(stage);
    paintPortrait(canvas, p);
  };
  const unsub = subscribe(render);
  const onResize = () => render();
  window.addEventListener("resize", onResize);
  const ro = new ResizeObserver(render);
  ro.observe(doc);
  render();
  const boot = requestAnimationFrame(render);
  return () => {
    cancelAnimationFrame(boot);
    unsub();
    mo.disconnect();
    window.removeEventListener("resize", onResize);
    ro.disconnect();
    stage.remove();
    host?.classList.remove(HOST_CLASS);
    doc.classList.remove("liang-rheostat-on", "liang-rheostat-dark", "liang-rheostat-cards", "liang-rheostat-final");
    ["--lr-bg-center", "--lr-bg-edge", "--lr-glow-amt", "--lr-surface", "--lr-surface-2", "--lr-ink", "--lr-ink-muted"].forEach((k) => {
      doc.style.removeProperty(k);
    });
  };
}
function RheostatChip({ directory, load, select, available = true }) {
  const p = usePos();
  const name2 = nearestName(p);
  const state = (0, import_react.useSyncExternalStore)(
    (listener) => directory?.subscribe ? directory.subscribe(listener) : () => {
    },
    () => directory?.getSnapshot?.() ?? EMPTY_DIRECTORY,
    () => EMPTY_DIRECTORY
  );
  const reasoning = modelReasoning(state);
  const bind = Boolean(
    available && reasoning && isDeepSeekSelection(reasoning.selection) && reasoning.efforts.length > 0
  );
  const wanted = effortFromPos(p);
  const entry = bind ? findEffortEntry(reasoning.efforts, wanted) : null;
  const effortLabel = entry?.name || (bind ? wanted : null);
  const pendingRef = (0, import_react.useRef)(false);
  const lastSentRef = (0, import_react.useRef)(null);
  const modelKey = bind ? `${reasoning.selection.provider}::${reasoning.selection.model}` : "";
  (0, import_react.useEffect)(() => {
    if (bind && load) load();
  }, [bind, load]);
  (0, import_react.useEffect)(() => {
    lastSentRef.current = null;
  }, [modelKey]);
  (0, import_react.useEffect)(() => {
    if (!bind || !select || !entry) return;
    const currentId = normalizeEffortId(
      reasoning.selection.reasoningEffort ?? reasoning.defaultEffort
    );
    if (currentId === wanted) {
      lastSentRef.current = entry.id;
      return;
    }
    if (pendingRef.current) return;
    if (lastSentRef.current === entry.id && currentId !== wanted) return;
    const hostChanged = lastSentRef.current != null && currentId != null && currentId !== wanted && normalizeEffortId(lastSentRef.current) !== wanted;
    if (hostChanged) {
      const dest = canonicalPosForEffort(currentId);
      if (dest != null) {
        lastSentRef.current = currentId;
        setPos(dest);
      }
      return;
    }
    pendingRef.current = true;
    lastSentRef.current = entry.id;
    Promise.resolve(select({
      provider: reasoning.selection.provider,
      model: reasoning.selection.model,
      reasoningEffort: entry.id
    })).then((ok) => {
      pendingRef.current = false;
      if (!ok) lastSentRef.current = null;
    }, () => {
      pendingRef.current = false;
      lastSentRef.current = null;
    });
  }, [bind, wanted, entry?.id, modelKey, reasoning?.selection?.reasoningEffort, reasoning?.defaultEffort, select]);
  const [interacting, setInteracting] = (0, import_react.useState)(false);
  const tip = bind && effortLabel ? `${name2} \xB7 ${effortLabel}` : name2;
  const ratio = p / (FRAME_COUNT - 1);
  const onSlide = (raw) => {
    setInteracting(true);
    setPos(raw);
    if (!bind || !select || !reasoning) return;
    const next = effortFromPos(raw);
    const item = findEffortEntry(reasoning.efforts, next);
    if (!item) return;
    const currentId = normalizeEffortId(reasoning.selection.reasoningEffort);
    if (currentId === next || lastSentRef.current === item.id) return;
    lastSentRef.current = item.id;
    pendingRef.current = true;
    Promise.resolve(select({
      provider: reasoning.selection.provider,
      model: reasoning.selection.model,
      reasoningEffort: item.id
    })).then((ok) => {
      pendingRef.current = false;
      if (!ok) lastSentRef.current = null;
    }, () => {
      pendingRef.current = false;
      lastSentRef.current = null;
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: "lr-chip",
      onPointerEnter: () => setInteracting(true),
      onPointerLeave: () => setInteracting(false),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "lr-slider", style: { "--lr-slider-ratio": ratio }, children: [
        interacting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("output", { className: "lr-slider__tooltip", children: tip }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lr-slider__ticks", "aria-hidden": "true", children: KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: "lr-slider__tick",
            style: { left: `${key / (FRAME_COUNT - 1) * 100}%` }
          },
          key
        )) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            className: "lr-slider__range",
            type: "range",
            min: 0,
            max: FRAME_COUNT - 1,
            step: 0.25,
            value: p,
            "aria-label": "\u6ED1\u52A8\u53D8\u963B\u5668",
            "aria-valuetext": bind && effortLabel ? `${name2} \xB7 ${effortLabel}` : name2,
            onPointerDown: (e) => e.stopPropagation(),
            onChange: (e) => onSlide(Number(e.target.value))
          }
        )
      ] })
    }
  );
}
function seat(ctx) {
  try {
    ctx.slots.inject("conversation.input.right", () => {
      ctx.slots.register(
        {
          name: "conversation.input.right",
          id: "liang-rheostat",
          order: 0,
          inject: (sessionId) => {
            let available = true;
            try {
              available = ctx.sessions?.subagentAddress?.(sessionId) === void 0;
            } catch {
              available = true;
            }
            let directory = null;
            try {
              directory = ctx.modelDirectories?.directoryFor?.(sessionId) ?? null;
            } catch {
              directory = null;
            }
            return {
              available,
              directory: directory?.store,
              load: () => {
                if (available && directory?.load) void directory.load().catch(() => void 0);
              },
              select: (selection) => available && directory?.select ? directory.select(selection).then((result) => result.ok, () => false) : Promise.resolve(false)
            };
          }
        },
        RheostatChip
      );
    });
  } catch (err) {
    console.warn("[liang-rheostat-skin] failed to seat conversation.input.right", err);
  }
}
var name = "liang-rheostat-skin";
var inject = ["slots", "modelDirectories", "sessions"];
function apply(ctx) {
  ensureStyle();
  preloadFrames();
  seat(ctx);
  ctx.effect(() => mountScene(), "liang-rheostat-skin: scene");
}
exports.name=name;exports.inject=inject;exports.apply=apply;return module.exports;}});
