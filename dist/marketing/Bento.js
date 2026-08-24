"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BentoCard = exports.BentoGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
/**
 * Card surface, borders, hover glow, and the energy wash are all `color-mix`
 * over tokens. Spans travel as custom properties consumed only inside the
 * media queries, so the grid degrades to 1 → 2 → N columns.
 */
const BENTO_CSS = `
[data-xen-bento-grid] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--xen-space-md);
}
[data-xen-bento-card] {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--xen-space-sm);
  padding: var(--xen-space-lg);
  border-radius: var(--xen-radius-lg);
  background-color: color-mix(in srgb, var(--xen-surface) 94%, var(--xen-on-surface) 6%);
  border: 1px solid color-mix(in srgb, var(--xen-border) 60%, transparent);
  transition: box-shadow 500ms ease;
}
[data-xen-bento-card]:hover {
  box-shadow: 0 0 90px -30px color-mix(in srgb, var(--xen-primary-600) 45%, transparent);
}
[data-xen-bento-card][data-wash="true"]::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 500ms ease;
  background-image: radial-gradient(420px circle at 20% 0%, color-mix(in srgb, var(--xen-primary-500) 14%, transparent), transparent 70%);
}
[data-xen-bento-card][data-wash="true"]:hover::after { opacity: 1; }
[data-xen-bento-icon] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--xen-radius-md);
  background-image: linear-gradient(135deg, var(--xen-primary-600), var(--xen-accent-600));
  color: var(--xen-on-primary);
}
[data-xen-bento-metric] {
  border: 1px solid color-mix(in srgb, var(--xen-accent) 35%, transparent);
  background-color: color-mix(in srgb, var(--xen-accent) 10%, transparent);
  color: var(--xen-accent);
  border-radius: 9999px;
}
@media (min-width: 768px) {
  [data-xen-bento-grid] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  [data-xen-bento-grid] { grid-template-columns: repeat(var(--xen-bento-cols, 6), minmax(0, 1fr)); }
  [data-xen-bento-card] {
    grid-column: span var(--xen-bento-span, 2) / span var(--xen-bento-span, 2);
    grid-row: span var(--xen-bento-row, 1) / span var(--xen-bento-row, 1);
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-bento-card], [data-xen-bento-card]::after { transition: none; }
}
`;
/**
 * Asymmetric bento feature grid generalized from the SaaS template: a
 * 6-column canvas where cards declare their own spans (4/2 over 2/4 is the
 * signature rhythm). Pure composition — wrap cards in `Reveal`/`Stagger`
 * for the cascade.
 */
exports.BentoGrid = React.forwardRef(function BentoGrid({ columns = 6, className, style, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-bento-styles', BENTO_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-bento-grid": "", className: (0, cn_1.cn)(className), style: { ['--xen-bento-cols']: columns, ...style }, ...rest, children: children }));
});
/**
 * One bento cell: icon tile + metric chip header, title, body (children), an
 * optional micro-visual slot, and a pinned detail line — with a token-mixed
 * hover energy wash. All slots optional; an empty card is a styled panel.
 */
exports.BentoCard = React.forwardRef(function BentoCard({ span = 2, rowSpan = 1, icon, metric, title, visual, detail, wash = true, className, style, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-bento-styles', BENTO_CSS);
    return ((0, jsx_runtime_1.jsxs)("article", { ref: ref, "data-xen-bento-card": "", "data-wash": wash ? 'true' : 'false', className: (0, cn_1.cn)('group', className), style: {
            ['--xen-bento-span']: span,
            ['--xen-bento-row']: rowSpan,
            ...style,
        }, ...rest, children: [icon !== undefined || metric !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [icon !== undefined ? (0, jsx_runtime_1.jsx)("span", { "data-xen-bento-icon": "", children: icon }) : (0, jsx_runtime_1.jsx)("span", {}), metric !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-bento-metric": "", className: "px-3 py-1 font-heading text-xs font-bold", children: metric })) : null] })) : null, title !== undefined ? ((0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-xl font-bold tracking-tight text-on-surface", children: title })) : null, children !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "max-w-md text-sm leading-relaxed text-muted", children: children })) : null, visual !== undefined ? (0, jsx_runtime_1.jsx)("div", { "data-xen-bento-visual": "", children: visual }) : null, detail !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-auto text-xs font-medium text-primary", children: detail })) : null] }));
});
//# sourceMappingURL=Bento.js.map