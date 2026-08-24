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
exports.AirQualityCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BANDS = [
    { max: 50, band: 'good', label: 'Good', glyph: '🟢', text: 'text-success', fill: 'bg-success' },
    { max: 100, band: 'moderate', label: 'Moderate', glyph: '🟡', text: 'text-warn', fill: 'bg-warn' },
    { max: 150, band: 'sensitive', label: 'Unhealthy for sensitive groups', glyph: '🟠', text: 'text-warn', fill: 'bg-warn' },
    { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', text: 'text-danger', fill: 'bg-danger' },
    { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', text: 'text-danger', fill: 'bg-danger' },
    { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', text: 'text-danger', fill: 'bg-danger' },
];
const bandFor = (aqi) => BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1];
/**
 * AirQualityCard, redesigned (v2): a **big AQI hero**. The index is a large
 * band-colored figure with the band glyph + label, a 0–300 scale bar with a
 * marker at the reading, the dominant pollutant, and advice. Bolder than v1. Same
 * props, token-only.
 */
exports.AirQualityCardV2 = React.forwardRef(function AirQualityCardV2({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest }, ref) {
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-air-quality-card": "", "aria-label": "Loading air quality", className: (0, cn_1.cn)('h-32 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    if (typeof aqi !== 'number') {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-air-quality-card": "", className: (0, cn_1.cn)('rounded-lg bg-surface p-md text-sm text-muted shadow-sm', className), ...rest, children: emptyLabel });
    }
    const b = bandFor(aqi);
    const pos = Math.min(100, (aqi / 300) * 100);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-air-quality-card": "", "aria-label": `Air quality index ${aqi}, ${b.label}`, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl", "aria-hidden": true, children: b.glyph }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-4xl font-bold', b.text), children: aqi }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-on-surface", children: b.label })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "relative h-2 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', b.fill), style: { width: `${pos}%` } }) }), (pollutant || advice) ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: [pollutant ? `Main pollutant: ${pollutant}` : null, advice].filter(Boolean).join(' · ') })) : null] }));
});
//# sourceMappingURL=AirQualityCardV2.js.map