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
exports.ShipmentCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CarrierBadge_1 = require("./CarrierBadge");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
/**
 * ShipmentCard — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a shipment: an elevated rounded card with a
 * soft shadow, the tracking-number headline, a labelled glyph + word status
 * badge (never color alone), a soft-primary meta strip carrying the
 * `CarrierBadge` + piece count, an origin→destination lane, and an ETA line.
 * Clickable when `onClick` is set (keyboard-operable button). Honors the V4
 * `variant` — `full` (card, default) and `compact` (a dense single row) —
 * identical props/behavior to {@link ShipmentCardProps}. All colors from
 * `--xen-*` token classes (no literals).
 */
exports.ShipmentCardV4 = React.forwardRef(function ShipmentCardV4({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant = 'default', loading = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-shipment-card": "", "aria-label": "Loading shipment", "aria-busy": "true", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-8 w-full rounded-[var(--xen-radius-md)] bg-neutral-100" })] }));
    }
    const interactive = (0, internal_1.pressableProps)(onClick);
    const a11y = `Shipment ${trackingNumber}, ${meta.label}`;
    const statusBadge = ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] }));
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-shipment-card": "", "aria-label": interactive ? a11y : undefined, className: (0, cn_1.cn)(shell, 'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', interactive &&
                'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-base", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDE9A" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: trackingNumber }), recipient ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: recipient }) : null] }), statusBadge] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-shipment-card": "", "aria-label": interactive ? a11y : undefined, className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold tabular-nums text-on-surface", children: trackingNumber }), recipient ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: recipient }) : null] }), statusBadge] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: carrier, service: service, size: "sm" }), pieces != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${pieces} ${pieces === 1 ? 'piece' : 'pieces'}` })) : null] }), origin || destination ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: origin ?? '—' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', internal_1.TONE_TEXT[meta.tone]), children: "\u2192" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-right text-sm font-semibold text-on-surface", children: destination ?? '—' })] })) : null, eta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: `ETA · ${eta}` }) : null] }));
});
//# sourceMappingURL=ShipmentCardV4.js.map