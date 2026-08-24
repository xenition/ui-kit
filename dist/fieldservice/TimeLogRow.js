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
exports.TimeLogRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const TIME_LOG_STATUS = {
    running: { label: 'Running', glyph: '⏱', tone: 'primary', slot: 'primary' },
    stopped: { label: 'Logged', glyph: '■', tone: 'neutral', slot: 'muted' },
    approved: { label: 'Approved', glyph: '✓', tone: 'success', slot: 'success' },
    rejected: { label: 'Rejected', glyph: '✕', tone: 'danger', slot: 'danger' },
};
/**
 * One line in a time-log / timesheet: a tinted status glyph disc, a
 * label/window stack with an optional billable chip, and a right-aligned
 * duration + computed line total. Duration comes from whole minutes via
 * `formatDuration`; the total is `minutes/60 * rate` in integer cents through
 * `formatMoney` (guarded against a missing rate). Status is text + glyph + a
 * color that traces to a semantic token — never color alone. Becomes a
 * `role="button"` surface only when `onClick` is supplied. No literals.
 */
exports.TimeLogRow = React.forwardRef(function TimeLogRow({ label, minutes, status, window, billable = false, rateCentsPerHour, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, style, }, ref) {
    const sd = TIME_LOG_STATUS[status] ?? TIME_LOG_STATUS.stopped;
    const iconColor = sd.slot === 'muted' ? 'muted' : sd.slot;
    const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
    const totalCents = rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
        ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
        : undefined;
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${label}, ${(0, format_1.formatDuration)(safeMinutes)}, ${sd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 items-center justify-center rounded-full', format_1.DISC_TINT[sd.slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: sd.glyph, color: iconColor, "aria-label": sd.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-xs)]", children: [window != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: window }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, children: `${sd.glyph} ${sd.label}` }), billable ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: "$ Billable" }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: (0, format_1.formatDuration)(safeMinutes) }), totalCents != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: format(totalCents, currency) })) : null] })] }));
});
//# sourceMappingURL=TimeLogRow.js.map