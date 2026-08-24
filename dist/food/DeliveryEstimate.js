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
exports.DeliveryEstimate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const MODE_GLYPH = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION = {
    delivery: 'Estimated delivery',
    pickup: 'Ready for pickup',
};
/**
 * A compact ETA readout — "25–35 min" with a mode glyph and caption. `variant`
 * renders it inline (glyph + text), as a token-tinted `badge` pill, or as a
 * bordered `card`. `loading` shows an em-dash placeholder. The window text is
 * built defensively so a missing `maxMinutes` collapses to a single value. Web
 * parity of the native `DeliveryEstimate`; token-only.
 */
exports.DeliveryEstimate = React.forwardRef(function DeliveryEstimate({ minMinutes, maxMinutes, mode = 'delivery', variant = 'inline', caption, loading = false, className, ...rest }, ref) {
    const window = typeof maxMinutes === 'number' && maxMinutes > minMinutes
        ? `${minMinutes}–${maxMinutes} min`
        : `${minMinutes} min`;
    const timeText = loading ? '—' : window;
    const captionText = caption ?? MODE_CAPTION[mode];
    const label = `${captionText}: ${loading ? 'estimating' : window}`;
    if (variant === 'badge') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": label, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full bg-neutral-100 px-[var(--xen-space-sm)] py-0.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: MODE_GLYPH[mode], size: "xs" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-surface", children: timeText })] }));
    }
    if (variant === 'card') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": label, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: MODE_GLYPH[mode], size: "xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-bold text-on-surface", children: timeText }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: captionText })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": label, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: MODE_GLYPH[mode], size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: timeText }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["\u00B7 ", captionText] })] }));
});
//# sourceMappingURL=DeliveryEstimate.js.map