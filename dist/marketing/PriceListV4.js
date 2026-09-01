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
exports.PriceRowV4 = exports.PriceListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Eyebrow_1 = require("../primitives/Eyebrow");
const OrnamentRule_1 = require("./OrnamentRule");
/**
 * The dotted leader carries the only color: a soft-primary dotted rule,
 * baseline-aligned via a small negative translate (V4 "showcase" recolors the
 * base accent leader to the primary token accent).
 */
const PRICE_CSS = `
[data-xen-price-leader-v4] {
  flex: 1 1 auto;
  min-width: 2rem;
  margin: 0 0.85rem;
  border-bottom: 1px dotted color-mix(in srgb, var(--xen-primary-400) 40%, transparent);
  transform: translateY(-0.3em);
}
`;
/**
 * PriceList — **V4** "showcase" design (web parity of the native V4). A clean
 * menu-style price group on the page ground: an optional ornamented rule, a
 * small-caps group heading, and dotted-leader rows. Same props/behavior as
 * {@link PriceListProps}; token-only colors, no literals.
 */
exports.PriceListV4 = React.forwardRef(function PriceListV4({ heading, ornament = 'diamond', className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "data-xen-price-list": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)]', className), ...rest, children: [ornament !== 'none' ? (0, jsx_runtime_1.jsx)(OrnamentRule_1.OrnamentRule, { ornament: ornament, "aria-hidden": "true" }) : null, heading !== undefined ? (0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { align: "center", children: heading }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-lg)]", children: children })] }));
});
/**
 * PriceRow — **V4** "showcase" design (web parity of the native V4). One
 * menu-style row: `name ········ price`, the leading name left, a spaced dotted
 * leader, and an extra-bold `tabular-nums` price right, with an optional
 * description beneath. The leader is `aria-hidden`; screen readers hear "name,
 * price". Same props/behavior as {@link PriceRowProps}; token-only colors, no
 * literals.
 */
exports.PriceRowV4 = React.forwardRef(function PriceRowV4({ name, price, description, as: Heading = 'h3', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-price-styles-v4', PRICE_CSS);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-price-row": "", className: (0, cn_1.cn)('group', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline", children: [(0, jsx_runtime_1.jsx)(Heading, { className: "font-heading text-xl font-semibold leading-snug text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { "data-xen-price-leader-v4": "", "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { "data-xen-price": "", className: "whitespace-nowrap font-heading text-lg font-extrabold tabular-nums text-primary", children: price })] }), description !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 max-w-xl text-sm leading-relaxed text-muted", children: description })) : null] }));
});
//# sourceMappingURL=PriceListV4.js.map