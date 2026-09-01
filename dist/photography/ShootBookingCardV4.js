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
exports.ShootBookingCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const STATUS = {
    requested: { label: 'Requested', tone: 'warn' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    completed: { label: 'Completed', tone: 'primary' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
/**
 * ShootBookingCard — **V4** "studio" design (web parity of the native V4). A
 * booking summary on a clean, elevated studio surface: an elevated `shadow-md`
 * card, bold client name, muted shoot type, and a date/time/location block with
 * muted glyphs. The lifecycle `status` is a labelled `Badge` with the correct
 * tone per status — `requested` (warn), `confirmed` (success), `completed`
 * (primary), `cancelled` (danger) — never color alone. The confirm `Button`
 * only shows for `requested` and stops propagation so it never triggers the
 * card. Optional quoted price via {@link PriceTag}. Identical props/behavior to
 * {@link ShootBookingCardProps}; `onClick` makes the card a keyboard-operable
 * `button`. All colors from `--xen-*` token classes (no literals).
 */
exports.ShootBookingCardV4 = React.forwardRef(function ShootBookingCardV4({ clientName, shootType, dateText, timeText, location, status = 'requested', priceCents, currency = 'USD', onConfirm, confirmLabel = 'Confirm', formatMoney, onClick, className, ...rest }, ref) {
    const meta = STATUS[status];
    const interactive = typeof onClick === 'function';
    const line = (glyph, text) => text ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: text })] })) : null;
    const showFooter = typeof priceCents === 'number' || (onConfirm && status === 'requested');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-shoot-booking-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${clientName}, ${meta.label}` : undefined, onClick: onClick, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md', interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: clientName }), shootType ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: shootType }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [line('📅', dateText), line('🕐', timeText), line('📍', location)] }), showFooter ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex items-center justify-between gap-[var(--xen-space-sm)]", children: [typeof priceCents === 'number' ? ((0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney })) : ((0, jsx_runtime_1.jsx)("span", {})), onConfirm && status === 'requested' ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onClick: (e) => {
                            e.stopPropagation();
                            onConfirm();
                        }, children: confirmLabel })) : null] })) : null] }));
});
//# sourceMappingURL=ShootBookingCardV4.js.map