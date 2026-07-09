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
exports.EditorialItem = exports.EditorialGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
/** Provided by `EditorialGrid` so items can derive their default z-order. */
const EditorialIndexContext = React.createContext(0);
const EditorialCountContext = React.createContext(1);
/**
 * Geometry lives in per-item custom properties consumed only inside the `lg`
 * media block, so the asymmetric layout collapses to a clean single column on
 * small screens. The caption backing is the only color rule (surface token).
 */
const EDITORIAL_CSS = `
[data-xen-editorial-grid] {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  column-gap: var(--xen-space-lg);
  row-gap: var(--xen-space-2xl);
}
[data-xen-editorial-item] { position: relative; min-width: 0; }
[data-xen-editorial-caption] {
  position: relative;
  background-color: var(--xen-surface);
}
@media (min-width: 1024px) {
  [data-xen-editorial-grid] {
    grid-template-columns: repeat(var(--xen-editorial-cols, 12), minmax(0, 1fr));
    row-gap: 0;
  }
  [data-xen-editorial-item] {
    grid-column: var(--xen-editorial-col, auto / span 6);
    margin-top: var(--xen-editorial-offset, 0px);
  }
}
`;
/**
 * Asymmetric editorial layout generalized from the portfolio template's
 * overlap grid: a 12-column canvas where items take uneven spans, uneven
 * starts, and negative offsets so covers overlap each other's rows like
 * proofs pinned to a wall — with z-order managed so captions stay readable.
 * Static layout (pair items with `Reveal`/`Parallax` for motion).
 *
 * ```tsx
 * <EditorialGrid>
 *   <EditorialItem span={7} caption={<h3>Alpha</h3>}><GenerativeCover seed="alpha" /></EditorialItem>
 *   <EditorialItem span={4} start={9} offset={176} caption={<h3>Beta</h3>}>…</EditorialItem>
 *   <EditorialItem span={5} start={2} offset={-96} caption={<h3>Gamma</h3>}>…</EditorialItem>
 * </EditorialGrid>
 * ```
 */
exports.EditorialGrid = React.forwardRef(function EditorialGrid({ columns = 12, className, children, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-editorial-styles', EDITORIAL_CSS);
    const items = React.Children.toArray(children);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-editorial-grid": "", className: (0, cn_1.cn)(className), style: { ['--xen-editorial-cols']: columns, ...style }, ...rest, children: (0, jsx_runtime_1.jsx)(EditorialCountContext.Provider, { value: items.length, children: items.map((child, index) => ((0, jsx_runtime_1.jsx)(EditorialIndexContext.Provider, { value: index, children: child }, index))) }) }));
});
/** One cell of the editorial grid — media plus a surface-backed caption. */
exports.EditorialItem = React.forwardRef(function EditorialItem({ span = 6, start, offset = 0, z, caption, className, children, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-editorial-styles', EDITORIAL_CSS);
    const index = React.useContext(EditorialIndexContext);
    const count = React.useContext(EditorialCountContext);
    const zIndex = z ?? count - index;
    return ((0, jsx_runtime_1.jsxs)("article", { ref: ref, "data-xen-editorial-item": "", className: (0, cn_1.cn)(className), style: {
            zIndex,
            ['--xen-editorial-col']: start !== undefined ? `${start} / span ${span}` : `span ${span} / span ${span}`,
            ['--xen-editorial-offset']: `${offset}px`,
            ...style,
        }, ...rest, children: [children, caption !== undefined ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-editorial-caption": "", style: { zIndex: count + 1 }, children: caption })) : null] }));
});
//# sourceMappingURL=EditorialGrid.js.map