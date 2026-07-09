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
exports.PriceTag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("./money");
const SIZE_CLASSES = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
};
/**
 * Formatted price with an optional strikethrough "compare-at" original. All
 * money is integer cents formatted through {@link formatMoney} (overridable
 * via the `formatMoney` prop). Token-only: the sale price reads `on-surface`,
 * the struck original is `muted`.
 */
exports.PriceTag = React.forwardRef(function PriceTag({ cents, currency = 'USD', compareAtCents, formatMoney: format = money_1.formatMoney, size = 'md', className, ...rest }, ref) {
    const hasCompare = typeof compareAtCents === 'number' && compareAtCents > cents;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-price-tag": "", className: (0, cn_1.cn)('inline-flex items-baseline gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-price": "", className: (0, cn_1.cn)('font-heading font-semibold text-on-surface', SIZE_CLASSES[size]), children: format(cents, currency) }), hasCompare ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-compare-at": "", className: "text-sm text-muted line-through", children: format(compareAtCents, currency) })) : null] }));
});
//# sourceMappingURL=PriceTag.js.map