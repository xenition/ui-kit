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
exports.TripHistoryEmpty = exports.TripHistoryRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/** Outcome → badge tone + spelled-out word (never color alone). */
const OUTCOME = {
    completed: { tone: 'success', word: 'Completed' },
    cancelled: { tone: 'danger', word: 'Cancelled' },
    'no-show': { tone: 'warn', word: 'No-show' },
};
/**
 * One past trip in a history list — the from→to route, when it happened, the
 * fare, an outcome (completed/cancelled/no-show, shown as a text-labelled badge
 * so meaning never rests on color), and an optional rider rating. Data +
 * `onClick` only; nothing fetches. Colors come from `--xen-*` token classes — no
 * literal colors. When `onClick` is set the row is a keyboard-operable
 * `role="button"`. `variant="compact"` tightens the row. For an empty history
 * list, render {@link TripHistoryEmpty} instead. Web parity of the native
 * `TripHistoryRow`.
 */
exports.TripHistoryRow = React.forwardRef(function TripHistoryRow({ from, to, dateLabel, fareCents, currency = 'USD', outcome = 'completed', rating, variant = 'default', onClick, className, ...rest }, ref) {
    const o = OUTCOME[outcome] ?? OUTCOME.completed;
    const compact = variant === 'compact';
    const a11y = `Trip from ${from} to ${to}${dateLabel ? `, ${dateLabel}` : ''}, ${o.word}${typeof fareCents === 'number' ? `, ${(0, commerce_1.formatMoney)(fareCents, currency)}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm font-bold text-on-surface", children: [from, " \u2192 ", to] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [dateLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: dateLabel }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: o.tone, children: o.word }), typeof rating === 'number' && !compact ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }) : null] })] }), typeof fareCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, commerce_1.formatMoney)(fareCents, currency) })) : null] }));
    const rootClass = (0, cn_1.cn)('rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)]', compact ? 'py-[var(--xen-space-sm)]' : 'py-[var(--xen-space-md)]', onClick &&
        'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-trip-history-row": "", "aria-label": a11y, className: rootClass, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-trip-history-row": "", role: "button", tabIndex: 0, "aria-label": a11y, onClick: onClick, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
            }
        }, className: rootClass, ...rest, children: body }));
});
/**
 * The empty-state companion to {@link TripHistoryRow} — shown when a rider or
 * driver has no past trips. Wraps the shared {@link EmptyState}; token-only.
 */
exports.TripHistoryEmpty = React.forwardRef(function TripHistoryEmpty({ title = 'No trips yet', message = 'Completed rides will appear here.', ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, "data-xen-trip-history-empty": "", icon: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl", children: "\uD83D\uDE97" }), title: title, description: message, ...rest }));
});
//# sourceMappingURL=TripHistoryRow.js.map