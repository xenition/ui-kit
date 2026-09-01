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
exports.FuelChargeGaugeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const fleet_v4_1 = require("./internal/fleet-v4");
const BAND_META = {
    low: { label: 'Low', tone: 'danger' },
    fair: { label: 'Fair', tone: 'warn' },
    good: { label: 'Good', tone: 'success' },
};
function bandFor(pct, low) {
    if (pct <= low)
        return 'low';
    if (pct <= low * 2.5)
        return 'fair';
    return 'good';
}
/**
 * **V4 fuel / charge gauge** — the web twin of the native
 * `FuelChargeGaugeV4`, same props as {@link FuelChargeGauge} plus
 * `bandLabels` and `chargingLabel`.
 *
 * ## Four changes
 *
 * 1. **The percentage takes contrast-corrected ink** — the base painted the
 *    largest number in the component with a **fill** slot.
 * 2. **The glyph is an element, not part of the string**, so it can be tinted
 *    and is not read aloud as the emoji's name.
 * 3. **The meter is a real `role="progressbar"`** with its value, rather than
 *    a decorative div.
 * 4. **The band word is a prop**, and the whole gauge has one spoken name.
 */
exports.FuelChargeGaugeV4 = React.forwardRef(function FuelChargeGaugeV4({ percent, kind = 'fuel', label, rangeLabel, lowThreshold = 15, charging = false, variant = 'bar', bandLabels, chargingLabel = 'Charging', loading = false, className, ...rest }, ref) {
    const compact = variant === 'compact';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-3 w-2/5', fleet_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)(compact ? 'h-1.5' : 'h-2', 'w-full', fleet_v4_1.SKELETON_CLASS) })] }));
    }
    const pct = (0, fleet_v4_1.clampPercent)(percent) ?? 0;
    const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
    const meta = BAND_META[bandFor(pct, low)];
    const word = bandLabels?.[bandFor(pct, low)] ?? meta.label;
    const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
    const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';
    const spoken = [heading, charging ? chargingLabel : null, `${pct} percent`, word, rangeLabel]
        .filter(Boolean)
        .join(', ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fuel-gauge": kind, "aria-label": spoken, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs text-sm font-semibold text-on-surface", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "sm" }), heading, charging ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-text", children: chargingLabel }) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-base font-bold [font-variant-numeric:tabular-nums]', fleet_v4_1.TONE_INK[meta.tone]), children: [pct, "%"] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: word })] })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, className: (0, cn_1.cn)('w-full overflow-hidden rounded-full bg-muted', compact ? 'h-1.5' : 'h-2'), children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', fleet_v4_1.TONE_BG[meta.tone]), style: { width: `${pct}%` } }) }), rangeLabel && !compact ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: rangeLabel })) : null] }));
});
//# sourceMappingURL=FuelChargeGaugeV4.js.map