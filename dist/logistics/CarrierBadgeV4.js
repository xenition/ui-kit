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
exports.CarrierBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * CarrierBadge — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on the carrier identity chip: a rounded pill
 * with the carrier glyph tucked in its own tone-tinted well, the carrier name,
 * and an optional service level — so the carrier is never conveyed by color
 * alone. Keeps the base `variant` (`soft` / `solid` / `outline`) and `size`
 * (`sm` / `md`) props. Colors resolve from the carrier's tone token class; no
 * literal colors. Identical props/behavior to {@link CarrierBadgeProps}.
 */
exports.CarrierBadgeV4 = React.forwardRef(function CarrierBadgeV4({ carrier = 'generic', name, service, variant = 'soft', size = 'md', className, ...rest }, ref) {
    const meta = internal_1.CARRIER_META[carrier] ?? internal_1.CARRIER_META.generic;
    const label = name ?? meta.label;
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
    const wellSize = size === 'sm' ? 'h-4 w-4 text-[10px]' : 'h-5 w-5 text-xs';
    const treatment = variant === 'solid'
        ? (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone])
        : variant === 'outline'
            ? (0, cn_1.cn)('border', internal_1.TONE_BORDER[meta.tone], internal_1.TONE_TEXT[meta.tone])
            : (0, cn_1.cn)(internal_1.TONE_SOFT_BG[meta.tone], internal_1.TONE_TEXT[meta.tone]);
    // On a solid fill the glyph well reads inverted; otherwise it sits on a tint.
    const well = variant === 'solid' ? (0, cn_1.cn)(internal_1.TONE_ON_TEXT[meta.tone], 'bg-primary-50/20') : (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone]);
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": `Carrier ${label}${service ? `, ${service}` : ''}`, className: (0, cn_1.cn)('inline-flex max-w-max items-center gap-[var(--xen-space-xs)] rounded-full py-0.5 pl-0.5 pr-[var(--xen-space-sm)] font-bold shadow-sm', textSize, treatment, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-full', wellSize, well), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: label }), service ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-medium', variant === 'solid' ? internal_1.TONE_ON_TEXT[meta.tone] : 'text-muted'), children: `· ${service}` })) : null] }));
});
//# sourceMappingURL=CarrierBadgeV4.js.map