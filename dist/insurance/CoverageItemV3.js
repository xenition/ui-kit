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
exports.CoverageItemV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const format_1 = require("./internal/format");
/**
 * CoverageItem, redesigned (**V3**) — a **compact list line**. A bare leading
 * glyph (✓ included / ✕ excluded, colored by the success/muted slot but always
 * paired with the glyph and, for excluded, a struck label — never color-alone)
 * runs into the label and, on the right, the limit or an em-dash. No disc, no
 * card — the tightest possible benefits line. Same `CoverageItemProps` (integer
 * cents via `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
exports.CoverageItemV3 = React.forwardRef(function CoverageItemV3({ label, included = true, limitCents, detail, currency = 'USD', formatMoney: format = format_1.formatMoney, className, ...rest }, ref) {
    const limit = included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : '—';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: included ? '✓' : '✕', size: "sm", color: included ? 'success' : 'muted', "aria-label": included ? 'Included' : 'Not included', className: "w-4 shrink-0 text-center" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('min-w-0 shrink truncate text-sm font-medium', included ? 'text-on-surface' : 'text-muted line-through'), children: label }), detail != null ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-xs text-muted", children: detail })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-semibold', included ? 'text-on-surface' : 'text-muted'), children: limit })] }));
});
//# sourceMappingURL=CoverageItemV3.js.map