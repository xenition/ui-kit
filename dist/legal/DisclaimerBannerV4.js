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
exports.DisclaimerBannerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/** `text-on-*` token class paired to a solid tone fill. */
const ON_TEXT = {
    neutral: 'text-on-surface',
    primary: 'text-on-primary',
    accent: 'text-on-accent',
    success: 'text-on-success',
    warn: 'text-on-warn',
    danger: 'text-on-danger',
};
/** `bg-*` solid fill token class per tone (for the `solid` variant). */
const SOLID_BG = {
    neutral: 'bg-neutral-200',
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
/** `border-*` token class per tone (for the `outline` variant). */
const BORDER = {
    neutral: 'border-border',
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
};
/**
 * DisclaimerBanner — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a legal notice / disclaimer: the severity is
 * carried by a glyph in its own toned chip + a heading + a token tint (never
 * color alone), and it exposes `role="alert"`. `soft` (default) rides a tinted
 * well with a toned left rail; `solid` fills for critical notices; `outline`
 * rings for a lighter footprint. Reuses the base `variant`
 * (`soft` / `solid` / `outline`). All colors from `--xen-*` token classes
 * (no literals).
 */
exports.DisclaimerBannerV4 = React.forwardRef(function DisclaimerBannerV4({ tone = 'info', title, message, variant = 'soft', onDismiss, testID, className, ...rest }, ref) {
    const meta = internal_1.DISCLAIMER_META[tone];
    const heading = title ?? meta.label;
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const containerTone = solid
        ? SOLID_BG[meta.tone]
        : outline
            ? (0, cn_1.cn)('border', BORDER[meta.tone], 'bg-surface')
            : (0, cn_1.cn)((0, internal_1.toneSoftBgClass)(meta.tone), 'shadow-sm');
    const bodyText = solid ? ON_TEXT[meta.tone] : 'text-on-surface';
    const accentText = solid ? ON_TEXT[meta.tone] : (0, internal_1.toneTextClass)(meta.tone);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "data-testid": testID, "data-xen-disclaimer-banner": meta.tone, "aria-label": `${heading}. ${message}`, className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-sm)] overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]', containerTone, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold leading-none', solid ? 'bg-primary-50/20' : (0, internal_1.toneBgClass)(meta.tone), ON_TEXT[meta.tone]), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', accentText), children: heading }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs leading-relaxed', bodyText), children: message })] }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss notice", onClick: onDismiss, className: (0, cn_1.cn)('shrink-0 rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] text-base font-bold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', accentText), children: "\u2715" })) : null] }));
});
//# sourceMappingURL=DisclaimerBannerV4.js.map