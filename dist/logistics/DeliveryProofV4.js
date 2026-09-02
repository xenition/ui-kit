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
exports.DeliveryProofV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
const OUTCOME_META = {
    delivered: { glyph: '✓', label: 'Delivered', tone: 'success', text: 'text-success' },
    attempted: { glyph: '⏳', label: 'Attempted', tone: 'warn', text: 'text-warn' },
    refused: { glyph: '✕', label: 'Refused', tone: 'danger', text: 'text-danger' },
};
/**
 * DeliveryProof — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a proof-of-delivery record: an elevated
 * rounded card with a soft shadow, a captured-media placeholder (a soft-primary
 * panel stands in for the signature/photo — no media dependency), a labelled
 * glyph + word outcome badge (never color alone), the recipient, drop location
 * and timestamp, and an optional driver note. Clickable when `onClick` is set.
 * Empty (`hasMedia={false}`) and loading states supported. Identical
 * props/behavior to {@link DeliveryProofProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
exports.DeliveryProofV4 = React.forwardRef(function DeliveryProofV4({ kind, outcome = 'delivered', recipient, time, location, note, hasMedia = true, loading = false, onClick, className, ...rest }, ref) {
    const proof = internal_1.PROOF_META[kind] ?? internal_1.PROOF_META.signature;
    const oc = OUTCOME_META[outcome];
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-delivery-proof": "", "aria-label": "Loading proof of delivery", "aria-busy": "true", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[84px] rounded-[var(--xen-radius-md)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-3/5 rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-delivery-proof": "", "aria-label": interactive ? `Proof of delivery, ${oc.label}` : undefined, className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": hasMedia ? `${proof.label} captured` : `No ${proof.label.toLowerCase()} captured`, className: (0, cn_1.cn)('flex h-[88px] flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)]', hasMedia ? 'bg-primary/10' : 'border border-dashed border-border bg-neutral-100'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-2xl', hasMedia ? internal_1.TONE_TEXT[proof.tone] : 'text-muted'), children: proof.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: hasMedia ? proof.label : `No ${proof.label.toLowerCase()}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: oc.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: oc.glyph }), " ", oc.label] }), recipient ? (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: recipient }) : null] }), location || time ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: [location, time].filter(Boolean).join('  ·  ') })) : null, note ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-xs text-on-surface", children: note }) : null] }));
});
//# sourceMappingURL=DeliveryProofV4.js.map