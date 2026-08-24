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
exports.ShipmentCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Badge_1 = require("../primitives/Badge");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * Summary card for one shipment: tracking number headline, a glyph + word
 * status badge, an inline `CarrierBadge`, origin→destination, ETA and piece
 * count. Status meaning is text-first (badge label + glyph), with tone as
 * reinforcement only. Clickable when `onClick` is set (button role + label);
 * otherwise a static summary. Loading renders a muted skeleton. All colors are
 * theme tokens. Web parity of the native `ShipmentCard`.
 */
exports.ShipmentCard = React.forwardRef(function ShipmentCard({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant = 'default', loading = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "outlined", "aria-busy": "true", "aria-label": "Loading shipment", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[55%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[80%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[40%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: interactive ? 'interactive' : 'outlined', "aria-label": interactive ? `Shipment ${trackingNumber}, ${meta.label}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: trackingNumber }), recipient ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: recipient }) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: carrier, service: service, size: "sm" }), pieces != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${pieces} ${pieces === 1 ? 'piece' : 'pieces'}` })) : null] }), variant === 'default' && (origin || destination) ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-on-surface", children: origin ?? '—' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', internal_1.TONE_TEXT[meta.tone]), children: "\u2192" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-right text-sm text-on-surface", children: destination ?? '—' })] })) : null, eta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: `ETA · ${eta}` }) : null] }));
});
//# sourceMappingURL=ShipmentCard.js.map