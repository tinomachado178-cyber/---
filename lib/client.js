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
html.liang-rheostat-bind [data-lr-effort-row] {
  display: none !important;
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
html.liang-rheostat-cards [data-windows-menu] {
  --dsw-alias-label-secondary: var(--lr-ink) !important;
  --dsw-alias-label-primary: var(--lr-ink) !important;
}
html[data-windows-titlebar].liang-rheostat-cards [class*="_toggle"] {
  color: var(--lr-ink) !important;
}
html.liang-rheostat-on [class*="_previewBadge"] {
  background: #171816 !important;
  border-color: #171816 !important;
  color: #d5b56e !important;
}
html.liang-rheostat-cards button[class*="_workspace"][aria-haspopup="menu"],
html.liang-rheostat-cards button[class*="_seat"][aria-haspopup="menu"] {
  color: #d5b56e !important;
}
html.liang-rheostat-cards button[class*="_workspace"][aria-haspopup="menu"] :is([class*="_folder"], [class*="_workspaceLabel"], [class*="_chevron"], svg),
html.liang-rheostat-cards button[class*="_seat"][aria-haspopup="menu"] :is([class*="_seatIcon"], [class*="_seatLabel"], [class*="_chevron"], [class*="_introText"], [class*="_introChar"], svg) {
  color: #d5b56e !important;
}
html.liang-rheostat-cards button[class*="_workspace"][aria-haspopup="menu"]:hover,
html.liang-rheostat-cards button[class*="_workspace"][aria-haspopup="menu"][aria-expanded="true"],
html.liang-rheostat-cards button[class*="_seat"][aria-haspopup="menu"]:hover,
html.liang-rheostat-cards button[class*="_seat"][aria-haspopup="menu"][aria-expanded="true"] {
  background: rgba(0, 0, 0, 0.35) !important;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_itemName"]),
html.liang-rheostat-cards [data-lr-preset-menu],
html.liang-rheostat-cards [data-lr-workspace-menu] {
  --dsw-menu-surface-fill: #171816;
  --dsw-menu-backdrop-filter: none;
  --dsw-alias-interactive-bg-hover: rgba(213, 181, 110, 0.16);
  --dsw-alias-border-l2: rgba(213, 181, 110, 0.28);
  --dsw-elevation-stroke-color: rgba(213, 181, 110, 0.28);
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_itemName"]) > [aria-hidden="true"],
html.liang-rheostat-cards [data-lr-preset-menu] > [aria-hidden="true"],
html.liang-rheostat-cards [data-lr-workspace-menu] > [aria-hidden="true"] {
  background: #171816 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
html.liang-rheostat-cards [data-lr-workspace-menu] {
  --dsw-alias-label-primary: #d5b56e;
  --dsw-alias-label-secondary: #d5b56e;
  --dsw-alias-menu-icon: #d5b56e;
  color: #d5b56e;
}
html.liang-rheostat-cards [data-lr-workspace-menu] :is([role="menuitem"], [class*="_itemIcon"], [class*="_check"], [class*="_itemLabel"], [class*="_title"], [class*="_pathSuffix"], svg) {
  color: #d5b56e !important;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_itemName"]),
html.liang-rheostat-cards [data-lr-preset-menu] {
  --dsw-alias-label-primary: #f4f1e8;
  --dsw-alias-menu-icon: #f4f1e8;
  color: #f4f1e8;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_itemName"]) :is([role="menuitem"], [class*="_check"], svg),
html.liang-rheostat-cards [data-lr-preset-menu] :is([role="menuitem"], [class*="_check"], svg) {
  color: #f4f1e8 !important;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_itemName"]) [class*="_itemName"],
html.liang-rheostat-cards [data-lr-preset-menu] [class*="_itemName"] {
  color: #d5b56e !important;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_itemName"]) [class*="_itemDesc"],
html.liang-rheostat-cards [data-lr-preset-menu] [class*="_itemDesc"] {
  color: rgba(244, 241, 232, 0.78) !important;
}
html.liang-rheostat-cards [data-sidebar-right-expand],
html.liang-rheostat-cards [data-sidebar-right-expand] svg {
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [data-sidebar-right-open] :is([class*="_tabStrip"], [class*="_stripChrome"], [class*="_tabTitle"], [class*="_iconButton"], [class*="_titleIcon"], [class*="_collapseGlyph"]) {
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [data-sidebar-right-open] :is([class*="_tabStrip"], [class*="_stripChrome"], [class*="_tabTitle"], [class*="_iconButton"]) svg {
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_hero"],
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_hero"] svg {
  color: #d5b56e !important;
}
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_entry"] {
  --dsw-alias-label-primary: #d5b56e !important;
  background: #171816 !important;
  border-color: #171816 !important;
  color: #d5b56e !important;
}
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_entry"]:hover,
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_entry"][aria-expanded="true"],
html.liang-rheostat-cards [data-sidebar-right-guide] [data-sidebar-right-guide-entry]:hover {
  background: rgb(41, 35, 30) !important;
}
html.liang-rheostat-cards [data-sidebar-right-guide] :is([class*="_entryDescription"], [class*="_placeholderInk"], [class*="_description"]) {
  color: #f4f1e8 !important;
  -webkit-text-fill-color: #f4f1e8 !important;
}
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_shortcut"],
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_shortcut"] *,
html.liang-rheostat-cards [data-sidebar-right-guide] button[class*="_entry"] > :last-child:not([class*="_entryText"]):not([class*="_entryIcon"]),
html.liang-rheostat-cards [data-sidebar-right-guide] button[class*="_entry"] > :last-child:not([class*="_entryText"]):not([class*="_entryIcon"]) * {
  color: #f4f1e8 !important;
  -webkit-text-fill-color: #f4f1e8 !important;
  background: transparent !important;
}
html.liang-rheostat-cards [data-sidebar-right-guide] [data-sidebar-right-guide-entry] [class*="_entryTitle"],
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_entryTitle"],
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_entryText"] > :first-child,
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_titleRow"] > :first-child,
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_titleRow"] [class$="_title"],
html.liang-rheostat-cards [data-sidebar-right-guide] [data-sidebar-right-guide-entry] [class$="_title"] {
  color: #d5b56e !important;
  -webkit-text-fill-color: #d5b56e !important;
}
html.liang-rheostat-cards [data-sidebar-right-guide] [class*="_entry"][aria-haspopup="menu"] [class*="_entryIcon"] svg {
  stroke: #d5b56e !important;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_moreMenu"]),
html.liang-rheostat-cards [class*="_moreMenu"] {
  --dsw-menu-surface-fill: #171816;
  --dsw-menu-backdrop-filter: none;
  --dsw-alias-label-primary: #d5b56e;
  --dsw-alias-menu-icon: #d5b56e;
  --dsw-alias-interactive-bg-hover: rgba(213, 181, 110, 0.16);
  color: #d5b56e;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_moreMenu"]) > [aria-hidden="true"] {
  background: #171816 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
html.liang-rheostat-cards [data-menu-material]:has([class*="_moreMenu"]) :is([role="menuitem"], [class*="_itemLabel"], [class*="_itemIcon"], [class*="_entryTitle"], [class*="_entryName"], svg),
html.liang-rheostat-cards [class*="_moreMenu"] :is([role="menuitem"], [class*="_itemLabel"], [class*="_itemIcon"], [class*="_entryTitle"], [class*="_entryName"], svg) {
  color: #d5b56e !important;
}
html.liang-rheostat-cards [class*="_titleCluster"] :is([class*="_crumb"], [class*="_crumbCurrent"], [class*="_crumbSep"], [class*="_crumbSeg"]) {
  color: var(--lr-ink) !important;
  -webkit-text-fill-color: var(--lr-ink) !important;
}
html.liang-rheostat-cards :is([class*="_scrollBody"], [class*="_viewArea"], [class*="_thinking"], [class*="_Thinking"], [class*="_thought"], [class*="_Thought"], [class*="_reasoning"], [class*="_thinkBody"], [class*="_summaryText"], [data-lr-thinking], [data-lr-answer]) {
  --dsw-alias-label-primary: var(--lr-ink) !important;
  --dsw-alias-label-secondary: var(--lr-ink) !important;
  --dsw-alias-label-tertiary: rgba(244, 241, 232, 0.85) !important;
  --dsw-alias-label-caption: rgba(244, 241, 232, 0.75) !important;
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards :is([class*="_scrollBody"], [class*="_viewArea"], [data-lr-thinking], [data-lr-answer]) :is(p, li, span, div, button, summary, h1, h2, h3, h4, h5, time, strong, em, blockquote, td, th) {
  color: var(--lr-ink) !important;
  -webkit-text-fill-color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [data-message-bubble],
html.liang-rheostat-cards [class*="_userRow"] [data-message-bubble],
html.liang-rheostat-cards [class*="_userStack"] [data-message-bubble] {
  --dsw-alias-label-primary: #171816 !important;
  --dsw-alias-label-secondary: #171816 !important;
  --dsw-alias-label-tertiary: rgba(23, 24, 22, 0.72) !important;
  color: #171816 !important;
  -webkit-text-fill-color: #171816 !important;
}
html.liang-rheostat-cards [data-message-bubble] :is(p, li, span, div, button, summary, h1, h2, h3, h4, h5, time, strong, em) {
  color: #171816 !important;
  -webkit-text-fill-color: #171816 !important;
}
html.liang-rheostat-cards :is([class*="_scrollBody"], [class*="_viewArea"], [data-lr-thinking], [data-lr-answer]) :is(code, kbd, samp),
html.liang-rheostat-cards [data-lr-light-plate],
html.liang-rheostat-cards [data-lr-light-plate] :is(p, li, span, div, code, kbd, samp, strong, em, button) {
  color: #171816 !important;
  -webkit-text-fill-color: #171816 !important;
}
html.liang-rheostat-cards :is([data-lr-thinking], [class*="_scrollBody"], [data-message-bubble]) a,
html.liang-rheostat-cards :is([data-lr-thinking], [class*="_scrollBody"], [data-message-bubble]) a :is(span, code, strong, em) {
  color: var(--dsw-alias-link, #4176e6) !important;
  -webkit-text-fill-color: var(--dsw-alias-link, #4176e6) !important;
}
html.liang-rheostat-cards :is([class*="_turnErrorTitle"], [class*="_turnErrorCopy"], [class*="_turnErrorMessage"], [class*="_turnErrorRow"], [data-error], [data-lr-error]),
html.liang-rheostat-cards :is([class*="_summary"][data-error], [class*="_body"][data-error]),
html.liang-rheostat-cards [data-lr-error] :is(p, li, span, div, button, summary, strong, em, time) {
  color: var(--dsw-alias-state-error-primary, #ec1313) !important;
  -webkit-text-fill-color: var(--dsw-alias-state-error-primary, #ec1313) !important;
}
html.liang-rheostat-cards [data-plugin-panel],
html.liang-rheostat-cards [data-lr-schedule-page],
html.liang-rheostat-cards [data-lr-market-page] {
  --dsw-alias-label-primary: var(--lr-ink) !important;
  --dsw-alias-label-secondary: var(--lr-ink) !important;
  --dsw-alias-label-tertiary: var(--lr-ink) !important;
  --dsw-alias-label-caption: var(--lr-ink) !important;
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [data-plugin-panel] :is(h1, h2, h3, h4, p, li, span, div, button, a, label, input, textarea, summary, strong, em, time),
html.liang-rheostat-cards [data-lr-schedule-page] :is(h1, h2, h3, h4, p, li, span, div, button, a, label, input, textarea, summary, strong, em, time),
html.liang-rheostat-cards [data-lr-market-page] :is(h1, h2, h3, h4, p, li, span, div, button, a, label, input, textarea, summary, strong, em, time) {
  color: var(--lr-ink) !important;
  -webkit-text-fill-color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [data-plugin-panel] :is(input, textarea)::placeholder,
html.liang-rheostat-cards [data-lr-schedule-page] :is(input, textarea)::placeholder,
html.liang-rheostat-cards [data-lr-market-page] :is(input, textarea)::placeholder {
  color: rgba(244, 241, 232, 0.72) !important;
  -webkit-text-fill-color: rgba(244, 241, 232, 0.72) !important;
}
html.liang-rheostat-cards [data-plugin-panel] :is([class*="_failure"], [class*="_reason"], [class*="_inputError"], [class*="_rowFailure"], [class*="_danger"], [data-plugin-runtime-error]),
html.liang-rheostat-cards [data-plugin-panel] :is([class*="_failure"], [class*="_reason"], [class*="_inputError"], [class*="_rowFailure"], [class*="_danger"]) :is(p, li, span, div, button, strong, em) {
  color: var(--dsw-alias-state-error-primary, #ec1313) !important;
  -webkit-text-fill-color: var(--dsw-alias-state-error-primary, #ec1313) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] {
  --dsw-alias-bg-layer-1: #171816 !important;
  --dsw-alias-bg-layer-2: #1e1b19 !important;
  --dsw-alias-bg-layer-3: #1e1b19 !important;
  --dsw-alias-bg-module-platform: #1e1b19 !important;
  --dsw-alias-bg-base: #171816 !important;
  --dsw-alias-markdown-code-block: #1e1b19 !important;
  --dsw-alias-markdown-code-block-banner: #1e1b19 !important;
  --dsw-alias-label-primary: var(--lr-ink) !important;
  --dsw-alias-label-secondary: var(--lr-ink) !important;
  --dsw-alias-label-tertiary: rgba(244, 241, 232, 0.85) !important;
  --dsw-alias-label-caption: rgba(244, 241, 232, 0.75) !important;
  --dsw-alias-label-dimmed: rgba(244, 241, 232, 0.55) !important;
  --dsw-alias-border-l1: rgba(244, 241, 232, 0.1);
  --dsw-alias-border-l2: rgba(244, 241, 232, 0.16);
  --dsw-alias-border-l3: rgba(244, 241, 232, 0.2);
  --dsw-alias-border-l4: rgba(244, 241, 232, 0.24);
  background: #171816 !important;
  color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [class*="_viewArea"]:has([data-lr-trajectory]),
html.liang-rheostat-cards [class*="_scrollBody"]:has([data-lr-trajectory]) {
  background: #171816 !important;
}
html.liang-rheostat-cards [data-lr-trajectory] :is(input, textarea)::placeholder {
  color: rgba(244, 241, 232, 0.72) !important;
  -webkit-text-fill-color: rgba(244, 241, 232, 0.72) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] :is(code, kbd, samp, pre),
html.liang-rheostat-cards [data-lr-trajectory] [data-lr-light-plate],
html.liang-rheostat-cards [data-lr-trajectory] [data-lr-light-plate] :is(p, li, span, div, code, kbd, samp, strong, em, button) {
  color: var(--lr-ink) !important;
  -webkit-text-fill-color: var(--lr-ink) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] :is([class*="_error"], [class*="_errorPayload"], [class*="_programError"]),
html.liang-rheostat-cards [data-lr-trajectory] [data-error="true"] {
  color: var(--dsw-alias-state-error-primary, #ec1313) !important;
  -webkit-text-fill-color: var(--dsw-alias-state-error-primary, #ec1313) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_user"],
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_user"] * {
  color: var(--dsw-alias-state-business-primary) !important;
  -webkit-text-fill-color: var(--dsw-alias-state-business-primary) !important;
  background: var(--dsw-alias-state-business-tertiary) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_systemNeutral"],
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_compacted"],
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_systemNeutral"] *,
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_compacted"] * {
  color: #61666b !important;
  -webkit-text-fill-color: #61666b !important;
  background: #f5f6f7 !important;
}
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_contextGreen"],
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_contextGreen"] * {
  color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 68%, #61666b) !important;
  -webkit-text-fill-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 68%, #61666b) !important;
  background: var(--dsw-alias-state-success-tertiary) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_assistantVioletBright"],
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_assistantVioletBright"] * {
  color: color-mix(in srgb, var(--dsw-alias-brand-primary-new-colorprimary-new-color) 60%, var(--dsw-alias-state-error-secondary)) !important;
  -webkit-text-fill-color: color-mix(in srgb, var(--dsw-alias-brand-primary-new-colorprimary-new-color) 60%, var(--dsw-alias-state-error-secondary)) !important;
  background: color-mix(in srgb, color-mix(in srgb, var(--dsw-alias-brand-primary-new-colorprimary-new-color) 55%, var(--dsw-alias-state-error-secondary)) 15%, #fff) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_toolAmber"],
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_toolAmber"] * {
  color: var(--dsw-alias-state-warn-label) !important;
  -webkit-text-fill-color: var(--dsw-alias-state-warn-label) !important;
  background: var(--dsw-alias-state-warn-tertiary) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_subtoolAmber"],
html.liang-rheostat-cards [data-lr-trajectory] [class*="_kindTag"][class*="_subtoolAmber"] * {
  color: color-mix(in srgb, var(--dsw-alias-state-warn-label) 62%, #81858c) !important;
  -webkit-text-fill-color: color-mix(in srgb, var(--dsw-alias-state-warn-label) 62%, #81858c) !important;
  background: color-mix(in srgb, var(--dsw-alias-state-warn-tertiary) 58%, #fff) !important;
}
html.liang-rheostat-cards [data-lr-trajectory] [data-timeline-span] {
  --dsw-alias-bg-layer-2: #fff;
  --dsw-alias-label-secondary: #61666b;
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
function findCaptionProbe() {
  const marked = document.querySelector("[data-lr-caption-probe]");
  if (marked) return marked;
  if (!document.body) return null;
  for (const el of document.body.children) {
    if (el.nodeName !== "SPAN") continue;
    const s = el.getAttribute("style") || "";
    if (s.includes("--dsw-specific-sidebar-fill") && s.includes("visibility")) {
      el.setAttribute("data-lr-caption-probe", "");
      return el;
    }
  }
  return null;
}
var lastCaptionSync = "";
function syncCaptionSymbols(on) {
  const probe = findCaptionProbe();
  if (probe) {
    if (on) probe.style.setProperty("--dsw-alias-label-primary", "#f4f1e8");
    else probe.style.removeProperty("--dsw-alias-label-primary");
  }
  const key = `${on ? "1" : "0"}:${probe ? "1" : "0"}`;
  if (key === lastCaptionSync) return;
  lastCaptionSync = key;
  if (on) document.body.style.setProperty("--lr-caption-sync", "1");
  else document.body.style.removeProperty("--lr-caption-sync");
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
  syncCaptionSymbols(solidCards);
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
    markHeroMenus(true);
  };
  const unsub = subscribe(render);
  const onResize = () => render();
  window.addEventListener("resize", onResize);
  const ro = new ResizeObserver(render);
  ro.observe(doc);
  render();
  const boot = requestAnimationFrame(render);
  syncHeroMenus(true);
  return () => {
    cancelAnimationFrame(boot);
    unsub();
    mo.disconnect();
    window.removeEventListener("resize", onResize);
    ro.disconnect();
    stage.remove();
    host?.classList.remove(HOST_CLASS);
    syncHeroMenus(false);
    syncOfficialEffortMenu(false);
    syncCaptionSymbols(false);
    doc.classList.remove("liang-rheostat-on", "liang-rheostat-dark", "liang-rheostat-cards", "liang-rheostat-final", "liang-rheostat-bind");
    ["--lr-bg-center", "--lr-bg-edge", "--lr-glow-amt", "--lr-surface", "--lr-surface-2", "--lr-ink", "--lr-ink-muted"].forEach((k) => {
      doc.style.removeProperty(k);
    });
  };
}
var EFFORT_MENU_LABELS = /* @__PURE__ */ new Set([
  "\u63A8\u7406\u7B49\u7EA7",
  "Effort",
  "\u5F37\u5EA6",
  "Esfuerzo",
  "Aufwand",
  "\u0423\u0441\u0438\u043B\u0438\u0435",
  "Esfor\xE7o"
]);
var effortMenuObserver = null;
var effortMenuRaf = 0;
var heroMenuObserver = null;
var heroMenuRaf = 0;
function isOpenMenuSurface(el) {
  const phase = el.getAttribute("data-menu-phase");
  if (phase === "dismiss") return false;
  const style = window.getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}
var THINKING_LABEL = /已完成[，,]\s*用时|用时\s*\d|正在思考|^思考中|思考完成|处理失败|Thought for|^Thinking(\s|\.|$)|Pensando|Réflexion|^Failed$|^Completed( in)?/i;
var ERROR_LABEL = /处理失败|本轮运行失败|本轮思考失败|This turn failed|^Failed$|^Fallido$|^失敗$|^任务已停止/;
function isThinkingLabel(text) {
  const s = String(text || "").replace(/\s+/g, " ").trim();
  return s.length > 0 && s.length < 80 && THINKING_LABEL.test(s);
}
function isErrorLabel(text) {
  const s = String(text || "").replace(/\s+/g, " ").trim();
  return s.length > 0 && s.length < 80 && ERROR_LABEL.test(s);
}
function containsUserBubble(el) {
  return Boolean(el && (el.matches?.("[data-message-bubble], [class*='_userRow'], [class*='_userStack']") || el.querySelector?.("[data-message-bubble]")));
}
function lumaOf(color) {
  const m = String(color || "").match(/rgba?\(([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\)/i);
  if (!m) return null;
  const a = m[4] == null ? 1 : Number(m[4]);
  if (a < 0.35) return null;
  return 0.2126 * Number(m[1]) + 0.7152 * Number(m[2]) + 0.0722 * Number(m[3]);
}
function isLightSurface(el) {
  if (!el || el.nodeType !== 1) return false;
  const bg = window.getComputedStyle(el).backgroundColor;
  const luma = lumaOf(bg);
  return luma != null && luma >= 200;
}
function isLightPlate(el) {
  if (!isLightSurface(el)) return false;
  if (el.matches("code, kbd, samp, pre")) return true;
  const display = window.getComputedStyle(el).display;
  if (!String(display).includes("inline")) return false;
  const r = el.getBoundingClientRect();
  return r.height > 0 && r.height <= 48 && r.width > 0 && r.width <= 520;
}
function markThinkingBlocks(on) {
  const cards = on && document.documentElement.classList.contains("liang-rheostat-cards");
  for (const el of document.querySelectorAll("[data-lr-thinking], [data-lr-light-plate], [data-lr-error], [data-lr-answer]")) {
    el.removeAttribute("data-lr-thinking");
    el.removeAttribute("data-lr-light-plate");
    el.removeAttribute("data-lr-error");
    el.removeAttribute("data-lr-answer");
  }
  if (!cards) return;
  const roots = document.querySelectorAll('[class*="_scrollBody"], [class*="_viewArea"], [data-pane="conversation"]');
  const seen = /* @__PURE__ */ new Set();
  for (const root of roots) {
    const candidates = root.querySelectorAll('button, [role="button"], summary, [aria-expanded], [class*="think" i], [class*="Thought"], [class*="_label"]');
    for (const el of candidates) {
      if (!isThinkingLabel(el.textContent) && !isErrorLabel(el.textContent)) continue;
      let node = el;
      for (let i = 0; i < 6 && node && node !== root; i++) {
        const parent = node.parentElement;
        if (!parent || parent === root) break;
        if (containsUserBubble(parent)) break;
        const cls = typeof parent.className === "string" ? parent.className : "";
        if (/Message|message|assistant|trajectory/i.test(cls) || parent.matches("article, section, li")) break;
        node = parent;
        if (/think|Thought|reason|Reasoning|turnProcess|Process/i.test(cls)) break;
      }
      const target = node || el;
      if (containsUserBubble(target) || seen.has(target)) continue;
      seen.add(target);
      target.setAttribute("data-lr-thinking", "");
      const sibling = target.nextElementSibling;
      if (sibling && !seen.has(sibling) && !containsUserBubble(sibling)) {
        seen.add(sibling);
        sibling.setAttribute("data-lr-thinking", "");
      }
    }
    for (const el of root.querySelectorAll('[class*="_turnErrorTitle"], [class*="_turnErrorRow"], [class*="_turnErrorCopy"], [data-error]')) {
      el.setAttribute("data-lr-error", "");
    }
    for (const el of root.querySelectorAll('button, [role="button"], [class*="_label"], [class*="_title"], [class*="_summary"]')) {
      if (!isErrorLabel(el.textContent)) continue;
      let node = el;
      for (let i = 0; i < 3 && node && node.parentElement && node.parentElement !== root; i++) {
        const cls = typeof node.className === "string" ? node.className : "";
        if (/label|title|summary|root|turnProcess|Process/i.test(cls)) break;
        node = node.parentElement;
      }
      (node || el).setAttribute("data-lr-error", "");
    }
    for (const el of root.querySelectorAll('[class*="xMeOpW_"], [class*="_body"]')) {
      if (el.closest("[data-message-bubble], [class*='_userRow'], [class*='_userStack'], [data-sidebar-right-guide]")) continue;
      el.setAttribute("data-lr-answer", "");
    }
    for (const el of root.querySelectorAll("code, kbd, samp, pre, span, mark")) {
      if (el.closest("[data-message-bubble], [data-lr-error], a")) continue;
      if (!isLightPlate(el)) continue;
      el.setAttribute("data-lr-light-plate", "");
    }
  }
}
var SCHEDULE_TITLES = /* @__PURE__ */ new Set(["\u81EA\u52A8\u5316\u4EFB\u52A1", "Automation tasks"]);
function markManagerPages(on) {
  for (const el of document.querySelectorAll("[data-lr-schedule-page], [data-lr-market-page]")) {
    el.removeAttribute("data-lr-schedule-page");
    el.removeAttribute("data-lr-market-page");
  }
  const cards = on && document.documentElement.classList.contains("liang-rheostat-cards");
  if (!cards) return;
  for (const h of document.querySelectorAll("h1")) {
    if (!SCHEDULE_TITLES.has((h.textContent || "").trim())) continue;
    let el = h.parentElement;
    while (el && el !== document.body) {
      const cls = typeof el.className === "string" ? el.className : "";
      if (/(?:^|\s)[A-Za-z0-9-]+_page(?:\s|$)/.test(cls)) {
        el.setAttribute("data-lr-schedule-page", "");
        break;
      }
      el = el.parentElement;
    }
  }
  for (const start of document.querySelectorAll("[data-discover-toolbar], [data-market-entry], [data-market-detail]")) {
    if (start.closest("[data-plugin-panel], [data-lr-market-page]")) continue;
    let el = start;
    while (el && el !== document.body) {
      const cls = typeof el.className === "string" ? el.className : "";
      if (/(?:^|\s)[A-Za-z0-9-]+_page(?:\s|$)/.test(cls) || /(?:^|\s)[A-Za-z0-9-]+_main(?:\s|$)/.test(cls)) {
        el.setAttribute("data-lr-market-page", "");
        break;
      }
      el = el.parentElement;
    }
  }
}
function markTrajectory(on) {
  for (const el of document.querySelectorAll("[data-lr-trajectory]")) {
    el.removeAttribute("data-lr-trajectory");
  }
  const cards = on && document.documentElement.classList.contains("liang-rheostat-cards");
  if (!cards) return;
  for (const start of document.querySelectorAll("[data-trajectory-scroll], [data-trajectory-row-key], [data-timeline-span]")) {
    const root = start.closest("[data-conversation-composer-overlay]") || start.closest('[class*="eciBTa_root"]');
    if (root) root.setAttribute("data-lr-trajectory", "");
  }
  for (const root of document.querySelectorAll("[data-lr-trajectory]")) {
    const area = root.closest('[class*="_viewArea"], [class*="_scrollBody"]') || root.parentElement;
    if (!area) continue;
    for (const tabs of area.querySelectorAll('[role="tablist"]')) {
      tabs.setAttribute("data-lr-trajectory", "");
    }
  }
}
function markHeroMenus(on) {
  const cards = on && document.documentElement.classList.contains("liang-rheostat-cards");
  const workspaceOpen = Boolean(
    document.querySelector('button[class*="_workspace"][aria-haspopup="menu"][aria-expanded="true"]')
  );
  for (const el of document.querySelectorAll("[data-menu-material]")) {
    el.removeAttribute("data-lr-preset-menu");
    el.removeAttribute("data-lr-workspace-menu");
    if (!cards || !isOpenMenuSurface(el)) continue;
    if (el.querySelector('[class*="_itemName"]')) {
      el.setAttribute("data-lr-preset-menu", "");
      continue;
    }
    if (workspaceOpen) el.setAttribute("data-lr-workspace-menu", "");
  }
  markThinkingBlocks(on);
  markManagerPages(on);
  markTrajectory(on);
}
function syncHeroMenus(on) {
  if (heroMenuRaf) cancelAnimationFrame(heroMenuRaf);
  const apply2 = () => {
    heroMenuRaf = 0;
    markHeroMenus(on);
  };
  apply2();
  if (on) {
    if (!heroMenuObserver) {
      heroMenuObserver = new MutationObserver(() => {
        if (heroMenuRaf) return;
        heroMenuRaf = requestAnimationFrame(() => {
          heroMenuRaf = 0;
          markHeroMenus(true);
        });
      });
      heroMenuObserver.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-expanded", "data-menu-phase"]
      });
    }
  } else if (heroMenuObserver) {
    heroMenuObserver.disconnect();
    heroMenuObserver = null;
    markHeroMenus(false);
  }
}
function markOfficialEffortRows(on) {
  const menus = document.querySelectorAll('[role="menu"], [role="group"]');
  for (const menu of menus) {
    for (const item of menu.querySelectorAll('button[role="menuitem"]')) {
      const label = item.querySelector('[class*="cellLabel"]')?.textContent?.trim();
      if (label && EFFORT_MENU_LABELS.has(label)) {
        if (on) item.setAttribute("data-lr-effort-row", "");
        else item.removeAttribute("data-lr-effort-row");
      }
    }
  }
}
function syncOfficialEffortMenu(on) {
  const doc = document.documentElement;
  doc.classList.toggle("liang-rheostat-bind", on);
  if (effortMenuRaf) cancelAnimationFrame(effortMenuRaf);
  const apply2 = () => {
    effortMenuRaf = 0;
    markOfficialEffortRows(on);
  };
  apply2();
  if (on) {
    if (!effortMenuObserver) {
      effortMenuObserver = new MutationObserver(() => {
        if (effortMenuRaf) return;
        effortMenuRaf = requestAnimationFrame(() => {
          effortMenuRaf = 0;
          markOfficialEffortRows(true);
        });
      });
      effortMenuObserver.observe(document.body, { childList: true, subtree: true });
    }
  } else if (effortMenuObserver) {
    effortMenuObserver.disconnect();
    effortMenuObserver = null;
    markOfficialEffortRows(false);
  }
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
    syncOfficialEffortMenu(bind);
    return () => syncOfficialEffortMenu(false);
  }, [bind]);
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
