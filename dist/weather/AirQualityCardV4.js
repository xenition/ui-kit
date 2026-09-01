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
exports.AirQualityCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/** Same thresholds + EXACT label strings as the base `AirQualityCard`. */
const BANDS = [
    { max: 50, meta: { band: 'good', label: 'Good', glyph: '🟢', tone: 'success' } },
    { max: 100, meta: { band: 'moderate', label: 'Moderate', glyph: '🟡', tone: 'warn' } },
    { max: 150, meta: { band: 'sensitive', label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' } },
    { max: 200, meta: { band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', tone: 'danger' } },
    { max: 300, meta: { band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', tone: 'danger' } },
    { max: Infinity, meta: { band: 'hazardous', label: 'Hazardous', glyph: '🟤', tone: 'danger' } },
];
/** Filled severity pill classes (solid tokens only — no opacity modifiers). */
const TONE_PILL = {
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
/** Token class for the scale-marker fill, keyed by severity tone. */
const TONE_MARKER = {
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
/** `Icon` color slot for the severity glyph. */
const TONE_ICON = {
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
}
function bandFor(aqi) {
    return (BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]).meta;
}
/**
 * V4 design-line air-quality card — a polished elevated white card that sits on
 * the page. Same props, defaults, band thresholds and EXACT label strings as the
 * base `AirQualityCard`, restyled onto the V4 surface: a big glyph, a large
 * numeral, a filled severity pill, and a token scale track with a positioned
 * marker. All colors flow through Tailwind token classes.
 */
exports.AirQualityCardV4 = React.forwardRef(function AirQualityCardV4({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest }, ref) {
    const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "img", "aria-label": "Loading air quality", className: (0, cn_1.cn)(shell, className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-8 w-full animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }) }));
    }
    if (aqi == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "img", "aria-label": emptyLabel, className: (0, cn_1.cn)(shell, className), ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const meta = bandFor(aqi);
    const markerPct = clamp(aqi, 0, 300) / 300;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `Air quality index ${aqi}, ${meta.label}`, className: (0, cn_1.cn)(shell, 'flex flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDEC1", size: "2xl", color: TONE_ICON[meta.tone], "aria-label": "Air quality" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Air Quality" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-row items-baseline gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-4xl font-extrabold text-on-surface", children: aqi }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold', TONE_PILL[meta.tone]), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })] }), (0, jsx_runtime_1.jsx)("div", { className: "relative mt-3 h-2 rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full', TONE_MARKER[meta.tone]), style: { left: `${markerPct * 100}%`, marginLeft: -2 } }) }), pollutant ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-3 text-xs text-muted", children: ["Dominant: ", pollutant] }) : null, advice ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-on-surface", children: advice }) : null] }));
});
//# sourceMappingURL=AirQualityCardV4.js.map