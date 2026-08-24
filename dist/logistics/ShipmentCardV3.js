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
exports.ShipmentCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * ShipmentCard, alternate design **V3** — a *dense list line*. Borderless and
 * single-row: a leading status-glyph chip, then a two-line stack (tracking
 * number + inline carrier glyph, then a muted `origin → destination · ETA` meta
 * line), with the status word right-aligned. Built to repeat tightly in a
 * shipments list — the inverse of V2's elevated card. Status stays glyph + word
 * (tone reinforces only). Same props; loading renders a slim skeleton line.
 */
exports.ShipmentCardV3 = React.forwardRef(function ShipmentCardV3({ trackingNumber, recipient, origin, destination, status, carrier = 'generic', service, eta, pieces, loading = false, onClick, className, ...rest }, ref) {
    const meta = internal_1.SHIPMENT_META[status] ?? internal_1.SHIPMENT_META.draft;
    const carrierMeta = internal_1.CARRIER_META[carrier] ?? internal_1.CARRIER_META.generic;
    const shell = 'flex items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-xs)] py-[var(--xen-space-sm)]';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading shipment", className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[26px] w-[26px] animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[45%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-[70%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] })] }));
    }
    const metaLine = [
        origin || destination ? `${origin ?? '—'} → ${destination ?? '—'}` : null,
        recipient,
        eta ? `ETA ${eta}` : null,
        pieces != null ? `${pieces} pc` : null,
        service,
    ]
        .filter(Boolean)
        .join('  ·  ');
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `Shipment ${trackingNumber}, ${meta.label}` : undefined, className: (0, cn_1.cn)(shell, interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-xs', internal_1.TONE_SOFT_STRONG_BG[meta.tone], internal_1.TONE_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs text-muted", children: carrierMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-bold text-on-surface", children: trackingNumber })] }), metaLine ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: metaLine }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', internal_1.TONE_TEXT[meta.tone]), children: meta.label })] }));
});
//# sourceMappingURL=ShipmentCardV3.js.map