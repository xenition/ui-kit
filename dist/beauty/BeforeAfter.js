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
exports.BeforeAfter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const clamp = (n) => Math.max(0, Math.min(100, n));
const Tag = ({ label, side }) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute bottom-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] bg-on-surface px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-surface opacity-80', side === 'left' ? 'left-[var(--xen-space-sm)]' : 'right-[var(--xen-space-sm)]'), children: label }));
/**
 * A before/after image comparison built from plain styled `div`s + `img` (no
 * gesture/slider library). `variant="split"` overlays the "after" image clipped
 * to `position`% width with a divider and −/+ nudge buttons; `variant="toggle"`
 * swaps between the two full images on click. Missing images render a
 * token-tinted placeholder. Token-only colors — dimensions come from inline
 * px/percent, never literal colors.
 */
exports.BeforeAfter = React.forwardRef(function BeforeAfter({ beforeUrl, afterUrl, position = 50, variant = 'split', height = 220, beforeLabel = 'Before', afterLabel = 'After', onPositionChange, className, ...rest }, ref) {
    const [showAfter, setShowAfter] = React.useState(false);
    const pos = clamp(position);
    const placeholder = (label) => ((0, jsx_runtime_1.jsx)("span", { className: "flex h-full w-full items-center justify-center bg-neutral-100 text-sm text-muted", children: label }));
    if (variant === 'toggle') {
        const label = showAfter ? afterLabel : beforeLabel;
        const url = showAfter ? afterUrl : beforeUrl;
        return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-before-after": "toggle", "aria-label": `Showing ${label}. Activate to compare.`, onClick: () => setShowAfter((v) => !v), style: { height }, className: (0, cn_1.cn)('relative block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [url ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: label, className: "h-full w-full object-cover" })) : (placeholder(label)), (0, jsx_runtime_1.jsx)(Tag, { label: label, side: "left" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-before-after": "split", "aria-label": `Before and after comparison, ${pos}% after`, style: { height }, className: (0, cn_1.cn)('relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border', className), ...rest, children: [beforeUrl ? ((0, jsx_runtime_1.jsx)("img", { src: beforeUrl, alt: beforeLabel, className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0", children: placeholder(beforeLabel) })), (0, jsx_runtime_1.jsx)("span", { className: "absolute inset-y-0 left-0 block overflow-hidden", style: { width: `${pos}%` }, children: afterUrl ? ((0, jsx_runtime_1.jsx)("img", { src: afterUrl, alt: afterLabel, className: "absolute inset-0 h-full w-full object-cover" })) : (placeholder(afterLabel)) }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute inset-y-0 w-0.5 bg-surface", style: { left: `${pos}%` } }), (0, jsx_runtime_1.jsx)(Tag, { label: beforeLabel, side: "right" }), (0, jsx_runtime_1.jsx)(Tag, { label: afterLabel, side: "left" }), onPositionChange ? ((0, jsx_runtime_1.jsxs)("span", { className: "absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(NudgeButton, { label: "Show less after", glyph: "\u2212", onClick: () => onPositionChange(clamp(pos - 10)) }), (0, jsx_runtime_1.jsx)(NudgeButton, { label: "Show more after", glyph: "+", onClick: () => onPositionChange(clamp(pos + 10)) })] })) : null] }));
});
function NudgeButton({ label, glyph, onClick, }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, className: "flex h-7 w-7 items-center justify-center rounded-full bg-on-surface text-base font-bold text-surface opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: glyph }));
}
//# sourceMappingURL=BeforeAfter.js.map