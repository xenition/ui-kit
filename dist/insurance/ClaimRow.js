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
exports.ClaimRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const tint_1 = require("./internal/tint");
const pressable_1 = require("./internal/pressable");
/**
 * One line in a claims list: a tinted status glyph disc, a title/number stack,
 * a status pill, and an optional right-aligned amount + date. The status is
 * conveyed redundantly (glyph + label + a color that traces to a semantic token
 * slot: approved → success, denied → danger) so it is never color-alone. Amount
 * is integer cents via `formatMoney`. Becomes a keyboard-operable button only
 * when `onClick` is supplied. Web parity of the native `ClaimRow`.
 */
exports.ClaimRow = React.forwardRef(function ClaimRow({ claimNumber, title, status, amountCents, currency = 'USD', date, formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const sd = (0, status_1.claimStatus)(status);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Claim ${claimNumber}, ${title}, ${sd.label}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', tint_1.TONE_TINT[sd.tone]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: sd.glyph, "aria-label": sd.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-0.5 flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: claimNumber }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: sd.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [amountCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: format(Math.max(0, Math.trunc(amountCents)), currency) })) : null, date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: date }) : null] })] }));
});
//# sourceMappingURL=ClaimRow.js.map