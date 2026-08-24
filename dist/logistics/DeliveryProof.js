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
exports.DeliveryProof = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const internal_1 = require("./internal");
const OUTCOME_META = {
    delivered: { glyph: '✓', label: 'Delivered', text: 'text-success' },
    attempted: { glyph: '⏳', label: 'Attempted', text: 'text-warn' },
    refused: { glyph: '✕', label: 'Refused', text: 'text-danger' },
};
/**
 * Proof-of-delivery card: a captured-media placeholder (a token-tinted panel
 * stands in for the signature/photo), the recipient, timestamp, drop location
 * and an outcome carried by a glyph + word. Clickable when `onClick` is set.
 * Empty (`hasMedia={false}`) and loading states supported. All colors are theme
 * tokens. Web parity of the native `DeliveryProof`.
 */
exports.DeliveryProof = React.forwardRef(function DeliveryProof({ kind, outcome = 'delivered', recipient, time, location, note, hasMedia = true, loading = false, onClick, className, ...rest }, ref) {
    const proof = internal_1.PROOF_META[kind] ?? internal_1.PROOF_META.signature;
    const oc = OUTCOME_META[outcome];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: "outlined", "aria-busy": "true", "aria-label": "Loading proof of delivery", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[72px] animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[60%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    const interactive = (0, internal_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, variant: interactive ? 'interactive' : 'outlined', "aria-label": interactive ? `Proof of delivery, ${oc.label}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": hasMedia ? `${proof.label} captured` : `No ${proof.label.toLowerCase()} captured`, className: (0, cn_1.cn)('flex h-[76px] flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-neutral-100', !hasMedia && 'border border-border'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xl', hasMedia ? internal_1.TONE_TEXT[proof.tone] : 'text-muted'), children: proof.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: hasMedia ? proof.label : `No ${proof.label.toLowerCase()}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm', oc.text), children: oc.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', oc.text), children: oc.label }), recipient ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-on-surface", children: `· ${recipient}` })) : null] }), location || time ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: [location, time].filter(Boolean).join(' · ') })) : null, note ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-xs text-on-surface", children: note }) : null] }));
});
//# sourceMappingURL=DeliveryProof.js.map