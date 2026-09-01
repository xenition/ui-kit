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
exports.BentoCardV4 = exports.BentoGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
/**
 * The V4 "showcase" bento is image-forward: cards are clean, elevated rounded
 * surfaces (no brand gradient ground) that keep the base's asymmetric span
 * geometry as custom properties. A `featured` card (declared via `data-featured`,
 * which the base's `wash`/hover-glow slot maps onto) reads as a soft-primary
 * tint + primary ring instead of an energy wash. Spans still travel as custom
 * properties consumed only inside the media queries, so the grid degrades to
 * 1 → 2 → N columns. Token-only.
 */
const BENTO_V4_CSS = `
[data-xen-bento-grid-v4] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--xen-space-lg);
}
[data-xen-bento-card-v4] {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--xen-space-sm);
  padding: var(--xen-space-lg);
  border-radius: var(--xen-radius-lg);
  background-color: var(--xen-surface);
  border: 1px solid var(--xen-border);
  box-shadow: 0 1px 2px 0 color-mix(in srgb, var(--xen-on-surface) 6%, transparent);
  transition: box-shadow 300ms ease;
}
[data-xen-bento-card-v4]:hover {
  box-shadow: 0 8px 24px -12px color-mix(in srgb, var(--xen-on-surface) 22%, transparent);
}
[data-xen-bento-card-v4][data-featured="true"] {
  background-color: color-mix(in srgb, var(--xen-primary) 6%, var(--xen-surface));
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--xen-primary) 55%, transparent);
}
[data-xen-bento-media-v4] {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 7rem;
  border-radius: var(--xen-radius-md);
  background-color: color-mix(in srgb, var(--xen-primary) 8%, var(--xen-surface));
  color: var(--xen-primary);
  overflow: hidden;
}
[data-xen-bento-icon-v4] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--xen-radius-md);
  background-color: color-mix(in srgb, var(--xen-primary) 12%, transparent);
  color: var(--xen-primary);
}
[data-xen-bento-metric-v4] {
  border-radius: 9999px;
  background-color: color-mix(in srgb, var(--xen-primary) 12%, transparent);
  color: var(--xen-primary);
}
@media (min-width: 768px) {
  [data-xen-bento-grid-v4] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1024px) {
  [data-xen-bento-grid-v4] { grid-template-columns: repeat(var(--xen-bento-cols, 6), minmax(0, 1fr)); }
  [data-xen-bento-card-v4] {
    grid-column: span var(--xen-bento-span, 2) / span var(--xen-bento-span, 2);
    grid-row: span var(--xen-bento-row, 1) / span var(--xen-bento-row, 1);
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-bento-card-v4] { transition: none; }
}
`;
/**
 * BentoGrid — **V4** "showcase" design (web parity of the native V4). The same
 * asymmetric 6-column bento canvas as the base `BentoGrid` where cards declare
 * their own spans, re-skinned for the image-forward showcase look: cards are
 * clean elevated surfaces on the page ground rather than the base's hover-glow
 * panels. Same props/behavior as {@link BentoGridProps} (`columns` drives the
 * `lg` grid). Token-only colors, no literals.
 */
exports.BentoGridV4 = React.forwardRef(function BentoGridV4({ columns = 6, className, style, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-bento-v4-styles', BENTO_V4_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-bento-grid-v4": "", className: (0, cn_1.cn)(className), style: { ['--xen-bento-cols']: columns, ...style }, ...rest, children: children }));
});
/**
 * BentoCard — **V4** "showcase" design (web parity of the native V4). One bento
 * cell re-skinned as an elevated rounded showcase card: a floating soft-primary
 * media well carrying the `visual` (or an icon glyph placeholder when empty), a
 * soft-primary metric chip, an extra-bold tight-tracked title, muted body copy,
 * and a pinned detail line. The base's hover energy `wash` is repurposed as a
 * "featured" flag: `wash` cards get a soft-primary tint + primary ring (not a
 * full brand gradient). Honors `span`/`rowSpan` (grid geometry), `icon`,
 * `metric`, `title`, `visual`, `detail`. Same props/behavior as
 * {@link BentoCardProps}; token-only colors, no literals.
 */
exports.BentoCardV4 = React.forwardRef(function BentoCardV4({ span = 2, rowSpan = 1, icon, metric, title, visual, detail, wash = false, className, style, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-bento-v4-styles', BENTO_V4_CSS);
    return ((0, jsx_runtime_1.jsxs)("article", { ref: ref, "data-xen-bento-card-v4": "", "data-featured": wash ? 'true' : 'false', className: (0, cn_1.cn)('group', className), style: {
            ['--xen-bento-span']: span,
            ['--xen-bento-row']: rowSpan,
            ...style,
        }, ...rest, children: [icon !== undefined || metric !== undefined ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [icon !== undefined ? (0, jsx_runtime_1.jsx)("span", { "data-xen-bento-icon-v4": "", children: icon }) : (0, jsx_runtime_1.jsx)("span", {}), metric !== undefined ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-bento-metric-v4": "", className: "px-3 py-1 font-heading text-xs font-bold", children: metric })) : null] })) : null, (0, jsx_runtime_1.jsx)("div", { "data-xen-bento-media-v4": "", className: "mb-[var(--xen-space-xs)]", children: visual !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "h-full w-full", children: visual })) : ((0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M21 15l-5-5L5 21" })] })) }), title !== undefined ? ((0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-xl font-extrabold leading-tight tracking-tight text-on-surface", children: title })) : null, children !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "max-w-md text-sm leading-relaxed text-muted", children: children })) : null, detail !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-auto text-xs font-medium text-primary", children: detail })) : null] }));
});
//# sourceMappingURL=BentoV4.js.map