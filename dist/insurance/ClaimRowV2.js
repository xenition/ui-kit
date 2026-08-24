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
exports.ClaimRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Badge_1 = require("../primitives/Badge");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const pressable_1 = require("./internal/pressable");
/** Happy-path stage labels the timeline chip walks through (denied is off-path). */
const STAGES = ['Filed', 'Review', 'Approved', 'Paid'];
/**
 * ClaimRow, redesigned (**V2**) — an **elevated card** carrying a compact status
 * **timeline chip**: a row of stage dots (Filed → Review → Approved → Paid) with
 * the reached stages filled `bg-primary` and the current one ringed, so progress
 * reads at a glance. A denied claim collapses the timeline to a single danger
 * `Badge`. Status stays glyph + text + color (never color-alone); the amount
 * anchors the top-right. Becomes a keyboard-operable button only when `onClick`
 * is set. Same `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
exports.ClaimRowV2 = React.forwardRef(function ClaimRowV2({ claimNumber, title, status, amountCents, currency = 'USD', date, formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const sd = (0, status_1.claimStatus)(status);
    const denied = status === 'denied';
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "elevated", padding: "md", radius: "md", "aria-label": interactive ? `Claim ${claimNumber}, ${title}, ${sd.label}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: claimNumber })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [amountCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-on-surface", children: format(Math.max(0, Math.trunc(amountCents)), currency) })) : null, date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: date }) : null] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: denied ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: "danger", variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center gap-[var(--xen-space-xs)]", children: STAGES.map((stage, i) => {
                                const done = i < sd.step;
                                const current = i === sd.step;
                                const on = done || current;
                                return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-label": current ? `${stage}, current stage` : undefined, className: (0, cn_1.cn)('shrink-0 rounded-full transition-colors', current ? 'h-3 w-3 ring-2 ring-primary-300' : 'h-2 w-2', on ? 'bg-primary' : 'bg-neutral-100') }), i < STAGES.length - 1 ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mx-[var(--xen-space-xs)] h-0.5 flex-1 rounded-full', done ? 'bg-primary' : 'bg-neutral-100') })) : null] }, stage));
                            }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })] })) })] }));
});
//# sourceMappingURL=ClaimRowV2.js.map