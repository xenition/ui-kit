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
exports.ShipmentCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CarrierBadge_1 = require("./CarrierBadge");
const internal_1 = require("./internal");
/**
 * ShipmentCard, alternate design **V2** — an *elevated hero card*. Where the
 * classic is a flat outlined summary, V2 floats on a soft shadow, leads with a
 * carrier badge + a bold status pill on one header line, dedicates a full-width
 * tinted "route strip" to origin → destination with the tone-glyph as the arrow,
 * and closes with a prominent ETA footer. Status is glyph + word (tone only
 * reinforces). Loading and every prop behave exactly as the classic. No literal
 * colors.
 */
exports.ShipmentCardV2 = React.forwardRef(function ShipmentCardV2({ trackingNumber, recipient, origin, destination, status, carrier, service, eta, pieces, variant = 'default', loading = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    const shell = 'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading shipment", className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[18px] w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-10 w-full animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[35%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Shipment ${trackingNumber}, ${meta.label}` : undefined, className: (0, cn_1.cn)(shell, interactive &&
            'cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(CarrierBadge_1.CarrierBadge, { carrier: carrier, service: service, size: "sm" }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-full px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold', internal_1.TONE_SOFT_STRONG_BG[meta.tone], internal_1.TONE_TEXT[meta.tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: trackingNumber }), recipient ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: recipient }) : null] }), variant === 'default' && (origin || destination) ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-sm)]', internal_1.TONE_SOFT_BG[meta.tone]), children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: origin ?? '—' }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base', internal_1.TONE_TEXT[meta.tone]), children: "\u2192" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-right text-sm font-semibold text-on-surface", children: destination ?? '—' })] })) : null, eta || pieces != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [eta ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: `ETA · ${eta}` })) : ((0, jsx_runtime_1.jsx)("span", {})), pieces != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${pieces} ${pieces === 1 ? 'piece' : 'pieces'}` })) : null] })) : null] }));
});
//# sourceMappingURL=ShipmentCardV2.js.map