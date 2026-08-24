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
exports.AirQualityCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BANDS = [
    { max: 50, band: 'good', label: 'Good', glyph: '🟢', text: 'text-success' },
    { max: 100, band: 'moderate', label: 'Moderate', glyph: '🟡', text: 'text-warn' },
    { max: 150, band: 'sensitive', label: 'Sensitive', glyph: '🟠', text: 'text-warn' },
    { max: 200, band: 'unhealthy', label: 'Unhealthy', glyph: '🔴', text: 'text-danger' },
    { max: 300, band: 'very-unhealthy', label: 'Very unhealthy', glyph: '🟣', text: 'text-danger' },
    { max: Infinity, band: 'hazardous', label: 'Hazardous', glyph: '🟤', text: 'text-danger' },
];
const bandFor = (aqi) => BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1];
/**
 * AirQualityCard, redesigned (v3): a **compact AQI line**. The band glyph, the
 * index number (band-colored) with its label, and the pollutant folded in — a
 * single dense row. The opposite of v2's hero. Same props, token-only.
 */
exports.AirQualityCardV3 = React.forwardRef(function AirQualityCardV3({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest }, ref) {
    void advice;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-air-quality-card": "", "aria-label": "Loading air quality", className: (0, cn_1.cn)('flex items-center gap-3 py-2', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    if (typeof aqi !== 'number') {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-air-quality-card": "", className: (0, cn_1.cn)('py-2 text-sm text-muted', className), ...rest, children: emptyLabel });
    }
    const b = bandFor(aqi);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-air-quality-card": "", "aria-label": `Air quality index ${aqi}, ${b.label}`, className: (0, cn_1.cn)('flex items-center gap-2 py-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: b.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold', b.text), children: aqi }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: b.label }), pollutant ? (0, jsx_runtime_1.jsx)("span", { className: "ml-auto text-xs text-muted", children: pollutant }) : null] }));
});
//# sourceMappingURL=AirQualityCardV3.js.map