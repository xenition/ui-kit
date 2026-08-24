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
exports.TableReservationRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const STATUS_META = {
    requested: { label: 'Requested', tone: 'warn' },
    confirmed: { label: 'Confirmed', tone: 'primary' },
    seated: { label: 'Seated', tone: 'success' },
    completed: { label: 'Completed', tone: 'neutral' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
/**
 * A single table-reservation row — guest name, a party-size chip, date/time,
 * an optional table label, and a status `Badge`. The status is shown as a
 * labelled badge (text + tone), so it never depends on color alone. Optionally
 * activatable to open the booking. Reuses the `Badge` and `Icon` primitives.
 * Web parity of the native `TableReservationRow`; token-only. When `onClick` is
 * set the root is a keyboard-operable `role="button"`.
 */
exports.TableReservationRow = React.forwardRef(function TableReservationRow({ name, partySize, dateText, timeText, tableLabel, status = 'requested', onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status] ?? STATUS_META.requested;
    const when = [dateText, timeText].filter(Boolean).join(' · ');
    const containerClass = (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDC65", size: "sm", "aria-label": `Party of ${partySize}` }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-on-surface", children: partySize })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-semibold text-on-surface", children: name }), when ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: when }) : null, tableLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: tableLabel }) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, children: meta.label })] }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(containerClass, interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...rest, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${name}, party of ${partySize}${when ? `, ${when}` : ''}, ${meta.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: inner }));
});
//# sourceMappingURL=TableReservationRow.js.map