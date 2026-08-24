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
exports.CurrentWeatherV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const weather_utils_1 = require("./weather-utils");
/**
 * CurrentWeather, redesigned (v2): a **big gradient hero**. A primary-tinted panel
 * with the location eyebrow, an oversized temperature beside the condition glyph,
 * the condition label, and a feels-like · high · low strip. Bolder than v1. Same
 * props, token-only.
 */
exports.CurrentWeatherV2 = React.forwardRef(function CurrentWeatherV2({ location, temperature, unit = '°', condition, feelsLike, high, low, variant, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-current-weather": "", "aria-label": "Loading weather", className: (0, cn_1.cn)('h-40 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const meta = [
        typeof feelsLike === 'number' ? `Feels ${feelsLike}${unit}` : null,
        typeof high === 'number' ? `H ${high}${unit}` : null,
        typeof low === 'number' ? `L ${low}${unit}` : null,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-current-weather": "", className: (0, cn_1.cn)('flex flex-col gap-2 rounded-lg bg-primary/10 p-md', className), ...rest, children: [location ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold uppercase tracking-wide text-muted", children: location }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [condition ? (0, jsx_runtime_1.jsx)("span", { className: "text-5xl", "aria-hidden": true, children: (0, weather_utils_1.conditionGlyph)(condition) }) : null, typeof temperature === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-6xl font-bold text-on-surface", children: [temperature, unit] }) : null] }), condition ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-on-surface", children: (0, weather_utils_1.conditionLabel)(condition) }) : null, meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: meta.join(' · ') }) : null] }));
});
//# sourceMappingURL=CurrentWeatherV2.js.map