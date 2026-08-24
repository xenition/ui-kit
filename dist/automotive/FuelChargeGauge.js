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
exports.FuelChargeGauge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Level bands → progress tone + word + text class. A low level maps to `danger`. */
function bandFor(pct, low) {
    if (pct <= low)
        return { tone: 'danger', word: 'Low', textClass: 'text-danger' };
    if (pct <= low * 2.5)
        return { tone: 'warn', word: 'Fair', textClass: 'text-warn' };
    return { tone: 'success', word: 'Good', textClass: 'text-success' };
}
/**
 * A fuel-tank or EV-battery level gauge — draws a token-tinted meter (the
 * {@link Progress} primitive) filled to `percent`, with an estimated-range
 * readout. A low level (at/under `lowThreshold`) resolves to the `danger` tone
 * per contract, but the band is always spelled out ("Low"/"Fair"/"Good") and the
 * a11y label states the number plus a glyph, so meaning never rests on color.
 * Colors come from `--xen-*` token classes — no literal colors. Input is clamped
 * to 0–100. Web parity of the native `FuelChargeGauge`.
 */
exports.FuelChargeGauge = React.forwardRef(function FuelChargeGauge({ percent, kind = 'fuel', label, rangeLabel, lowThreshold = 15, charging = false, variant = 'bar', loading = false, className, ...rest }, ref) {
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(percent) ? percent : 0)));
    const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
    const band = bandFor(clamped, low);
    const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
    const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';
    const compact = variant === 'compact';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fuel-gauge": "", "aria-busy": "true", "aria-label": `Loading ${heading.toLowerCase()} level`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('animate-pulse rounded-full bg-neutral-100', compact ? 'h-2.5' : 'h-3.5') })] }));
    }
    const a11y = `${heading}${charging ? ' charging' : ''}: ${clamped} percent, ${band.word}${rangeLabel ? `, ${rangeLabel} range` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fuel-gauge": "", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }), " ", heading, charging ? ' · Charging' : ''] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-base font-extrabold', band.textClass), children: [clamped, "%"] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: band.word })] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: clamped, max: 100, tone: band.tone, size: compact ? 'sm' : 'md', "aria-hidden": "true" }), rangeLabel ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Est. range ", rangeLabel] }) : null] }));
});
//# sourceMappingURL=FuelChargeGauge.js.map