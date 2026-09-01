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
exports.RegisterHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * RegisterHeader — the POS V4 "register" **terminal header** (web parity of the
 * native twin). A confident brand gradient (`from-primary-500 to-primary-700`)
 * carries the store name + `registerLabel`, the `cashierName` subline, a frosted
 * shift-status pill (open/closed by word, not color alone), and the **near-white
 * running total** of the open order (integer cents via `formatMoney`). An optional
 * menu button sits top-right; the shift pill becomes a button when `onShift` is
 * set. Every color derives from the brand ramp via `--xen-*` classes + gradient
 * utilities — no literals, light + dark safe.
 */
exports.RegisterHeader = React.forwardRef(function RegisterHeader({ storeName, registerLabel, cashierName, shiftOpen, runningTotalCents, currency = 'USD', onMenu, onShift, className, ...rest }, ref) {
    const hasShift = typeof shiftOpen === 'boolean';
    const shiftText = shiftOpen ? 'Shift open' : 'Shift closed';
    const shiftGlyph = shiftOpen ? '●' : '○';
    const total = typeof runningTotalCents === 'number' ? Math.max(0, Math.trunc(runningTotalCents)) : undefined;
    const shiftPillContent = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm font-extrabold text-primary-50", children: shiftGlyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-primary-50", children: shiftText })] }));
    const pillClass = 'flex min-h-[44px] items-center gap-[var(--xen-space-xs)] self-start rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-register-header": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-extrabold text-primary-50", children: storeName }), registerLabel ? ((0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-primary-50", children: registerLabel })) : null] }), cashierName ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 truncate text-sm text-primary-100", children: cashierName }) : null] }), onMenu ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Open menu", onClick: onMenu, className: "flex h-11 w-11 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u22EF", size: "lg", className: "text-primary-50" }) })) : null] }), hasShift ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)]", children: onShift ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${shiftText}. Manage shift`, onClick: onShift, className: (0, cn_1.cn)(pillClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: shiftPillContent })) : ((0, jsx_runtime_1.jsx)("span", { role: "status", "aria-label": shiftText, className: pillClass, children: shiftPillContent })) })) : null, typeof total === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: "Open order" }), (0, jsx_runtime_1.jsx)("p", { "aria-label": `Running total ${(0, internal_1.formatMoney)(total, currency)}`, className: "text-3xl font-extrabold tabular-nums tracking-tight text-primary-50", children: (0, internal_1.formatMoney)(total, currency) })] })) : null] }));
});
//# sourceMappingURL=RegisterHeader.js.map