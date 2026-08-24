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
exports.AirQualityCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const weather_utils_1 = require("./weather-utils");
const BANDS = [
    { max: 50, band: 'good', meta: { label: 'Good', glyph: '🟢', tone: 'success' } },
    { max: 100, band: 'moderate', meta: { label: 'Moderate', glyph: '🟡', tone: 'warn' } },
    { max: 150, band: 'sensitive', meta: { label: 'Unhealthy for sensitive groups', glyph: '🟠', tone: 'warn' } },
    { max: 200, band: 'unhealthy', meta: { label: 'Unhealthy', glyph: '🔴', tone: 'danger' } },
    { max: 300, band: 'very-unhealthy', meta: { label: 'Very unhealthy', glyph: '🟣', tone: 'danger' } },
    { max: Infinity, band: 'hazardous', meta: { label: 'Hazardous', glyph: '🟤', tone: 'danger' } },
];
/** Token class for the scale-marker fill, keyed by severity tone. */
const TONE_MARKER = {
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
function bandFor(aqi) {
    return (BANDS.find((b) => aqi <= b.max) ?? BANDS[BANDS.length - 1]).meta;
}
/**
 * Air-quality index card (web parity of the native `AirQualityCard`): the
 * numeric AQI, its severity band shown as a `Badge` glyph + text label (never
 * color alone), a token scale track with a positioned marker, and optional
 * pollutant/advice captions. Severity maps to success/warn/danger token tones.
 * Renders a muted empty state when `aqi` is absent and a token skeleton when
 * `loading`. All colors come from the `--xen-*` tokens via Tailwind classes.
 */
exports.AirQualityCard = React.forwardRef(function AirQualityCard({ aqi, pollutant, advice, loading = false, emptyLabel = 'Air quality unavailable', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, role: "img", "aria-label": "Loading air quality", className: className, ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-8 w-full animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }) }));
    }
    if (aqi == null) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, role: "img", "aria-label": emptyLabel, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const meta = bandFor(aqi);
    const markerPct = (0, weather_utils_1.clamp)(aqi, 0, 300) / 300;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, role: "img", "aria-label": `Air quality index ${aqi}, ${meta.label}`, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDEC1", size: "lg", "aria-label": "Air quality" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Air Quality" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-row items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold text-on-surface", children: aqi }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })] }), (0, jsx_runtime_1.jsx)("div", { className: "relative mt-2 h-2 rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full', TONE_MARKER[meta.tone]), style: { left: `${markerPct * 100}%`, marginLeft: -2 } }) }), pollutant ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-2 text-xs text-muted", children: ["Dominant: ", pollutant] }) : null, advice ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-on-surface", children: advice }) : null] }));
});
//# sourceMappingURL=AirQualityCard.js.map