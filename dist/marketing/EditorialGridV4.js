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
exports.EditorialItemV4 = exports.EditorialGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
/** Provided by `EditorialGridV4` so items can derive their default z-order. */
const EditorialIndexContext = React.createContext(0);
const EditorialCountContext = React.createContext(1);
/**
 * The V4 "showcase" editorial keeps the base's asymmetric 12-column overlap
 * geometry (per-item spans, starts, offsets, z-order in custom properties) but
 * re-skins each cell as an elevated, image-forward showcase card: a clean
 * rounded surface with a soft shadow, a floating media area, and a bold
 * caption. NO brand gradient. Geometry lives in per-item custom properties
 * consumed only inside the `lg` media block, so the asymmetric layout collapses
 * to a clean single column on small screens. Token-only.
 */
const EDITORIAL_V4_CSS = `
[data-xen-editorial-grid-v4] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  column-gap: var(--xen-space-lg);
  row-gap: var(--xen-space-2xl);
}
[data-xen-editorial-item-v4] {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border-radius: var(--xen-radius-lg);
  border: 1px solid var(--xen-border);
  background-color: var(--xen-surface);
  box-shadow: 0 1px 2px 0 color-mix(in srgb, var(--xen-on-surface) 6%, transparent);
  transition: box-shadow 300ms ease;
}
[data-xen-editorial-item-v4]:hover {
  box-shadow: 0 8px 24px -12px color-mix(in srgb, var(--xen-on-surface) 22%, transparent);
}
[data-xen-editorial-media-v4] {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 9rem;
  background-color: color-mix(in srgb, var(--xen-primary) 8%, var(--xen-surface));
  color: var(--xen-primary);
  overflow: hidden;
}
[data-xen-editorial-caption-v4] {
  position: relative;
  padding: var(--xen-space-md) var(--xen-space-lg) var(--xen-space-lg);
  background-color: var(--xen-surface);
}
@media (min-width: 1024px) {
  [data-xen-editorial-grid-v4] {
    grid-template-columns: repeat(var(--xen-editorial-cols, 12), minmax(0, 1fr));
    row-gap: 0;
  }
  [data-xen-editorial-item-v4] {
    grid-column: var(--xen-editorial-col, auto / span 6);
    margin-top: var(--xen-editorial-offset, 0px);
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-editorial-item-v4] { transition: none; }
}
`;
/**
 * EditorialGrid — **V4** "showcase" design (web parity of the native V4). The
 * same asymmetric 12-column overlap canvas as the base `EditorialGrid` (uneven
 * spans/starts + negative offsets, z-order keeping captions readable), re-skinned
 * so each cell is an elevated image-forward showcase card. Same props/behavior as
 * {@link EditorialGridProps} (`columns` drives the `lg` grid). Token-only colors,
 * no literals.
 */
exports.EditorialGridV4 = React.forwardRef(function EditorialGridV4({ columns = 12, className, children, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-editorial-v4-styles', EDITORIAL_V4_CSS);
    const items = React.Children.toArray(children);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-editorial-grid-v4": "", className: (0, cn_1.cn)(className), style: { ['--xen-editorial-cols']: columns, ...style }, ...rest, children: (0, jsx_runtime_1.jsx)(EditorialCountContext.Provider, { value: items.length, children: items.map((child, index) => ((0, jsx_runtime_1.jsx)(EditorialIndexContext.Provider, { value: index, children: child }, index))) }) }));
});
/**
 * EditorialItem — **V4** "showcase" design (web parity of the native V4). One
 * editorial cell as an elevated rounded showcase card: the media (children)
 * floats in a soft-primary media well, with the `caption` slotted below on the
 * surface backing and a bold, tight-tracked heading. Honors the base's
 * `span`/`start`/`offset`/`z` geometry (grid placement + stacking) and the
 * `caption` slot. Same props/behavior as {@link EditorialItemProps}; token-only
 * colors, no literals.
 */
exports.EditorialItemV4 = React.forwardRef(function EditorialItemV4({ span = 6, start, offset = 0, z, caption, className, children, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-editorial-v4-styles', EDITORIAL_V4_CSS);
    const index = React.useContext(EditorialIndexContext);
    const count = React.useContext(EditorialCountContext);
    const zIndex = z ?? count - index;
    return ((0, jsx_runtime_1.jsxs)("article", { ref: ref, "data-xen-editorial-item-v4": "", className: (0, cn_1.cn)('group', className), style: {
            zIndex,
            ['--xen-editorial-col']: start !== undefined ? `${start} / span ${span}` : `span ${span} / span ${span}`,
            ['--xen-editorial-offset']: `${offset}px`,
            ...style,
        }, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-editorial-media-v4": "", children: children !== undefined && React.Children.count(children) > 0 ? (children) : ((0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.75", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "3" }), (0, jsx_runtime_1.jsx)("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M21 15l-5-5L5 21" })] })) }), caption !== undefined ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-editorial-caption-v4": "", className: "font-heading text-xl font-extrabold tracking-tight text-on-surface", style: { zIndex: count + 1 }, children: caption })) : null] }));
});
//# sourceMappingURL=EditorialGridV4.js.map