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
exports.CurrentWeatherV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const weather_utils_1 = require("./weather-utils");
/**
 * CurrentWeather, redesigned (v3): a **compact condition bar**. The glyph, the
 * temperature and location, and a high/low·feels line pack onto one dense row —
 * for a header or list. The opposite of v2's hero. Same props, token-only.
 */
exports.CurrentWeatherV3 = React.forwardRef(function CurrentWeatherV3({ location, temperature, unit = '°', condition, feelsLike, high, low, variant, loading = false, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-current-weather": "", "aria-label": "Loading weather", className: (0, cn_1.cn)('flex items-center gap-3 py-2', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const right = [
        typeof high === 'number' ? `H ${high}${unit}` : null,
        typeof low === 'number' ? `L ${low}${unit}` : null,
        typeof feelsLike === 'number' ? `Feels ${feelsLike}${unit}` : null,
    ].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-current-weather": "", className: (0, cn_1.cn)('flex items-center gap-3 py-2', className), ...rest, children: [condition ? (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", "aria-hidden": true, children: (0, weather_utils_1.conditionGlyph)(condition) }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-lg font-bold text-on-surface", children: [typeof temperature === 'number' ? `${temperature}${unit}` : '', location ? (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-xs font-normal text-muted", children: location }) : null] }), condition ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: (0, weather_utils_1.conditionLabel)(condition) }) : null] }), right ? (0, jsx_runtime_1.jsx)("span", { className: "ml-auto text-xs text-muted", children: right }) : null] }));
});
//# sourceMappingURL=CurrentWeatherV3.js.map