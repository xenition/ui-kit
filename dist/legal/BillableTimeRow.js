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
exports.BillableTimeRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * One billable time entry: date, narrative, duration, and the computed amount.
 * Money is carried as integer **cents** (computed from `hours × rateCents` when
 * `amountCents` is absent) and rendered through the shared `formatMoney` for a
 * stable 2-decimal string. Billing status is a glyph + word pill so it never
 * rests on color alone. When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. When `onClick` is set the row is an accessible
 * `role="button"`. All colors are `--xen-*` token classes — no literals.
 */
exports.BillableTimeRow = React.forwardRef(function BillableTimeRow({ date, description, hours, rateCents, amountCents, currency = 'USD', timekeeper, status = 'draft', variant = 'default', actionable = false, onLog, onClick, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const amount = amountCents ?? (0, internal_1.billableCents)(hours, rateCents);
    const canLog = actionable && (status === 'draft' || status === 'unbilled');
    const interactive = Boolean(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Time entry ${date}, ${(0, internal_1.formatHours)(hours)}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer hover:bg-neutral-100', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-muted", children: date }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-primary", children: (0, internal_1.formatHours)(hours) })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-on-surface', compact ? 'truncate' : 'line-clamp-2'), children: description }), !compact && timekeeper ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: timekeeper })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, internal_1.formatMoney)(amount, currency) }), status ? ((0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.BILLABLE_STATUS_META[status], variant: "inline", size: "sm" })) : null] })] }), canLog && onLog ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", className: "self-start", onClick: (e) => {
                    e.stopPropagation();
                    onLog();
                }, children: "Log time" })) : null] }));
});
//# sourceMappingURL=BillableTimeRow.js.map