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
exports.CurrentWeatherV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * CurrentWeather — **saturated hero** design (v4), web parity of the native
 * `CurrentWeatherV4`. A full `primary`-colored panel in the mold of a modern
 * weather app: an oversized temperature, the condition as a big glyph + label,
 * and feels-like / high / low as soft pill chips. Text sits on the brand ground
 * via the contrast-guaranteed `on-primary` token; chips use a lighter ramp step
 * — all colors come from `--xen-*` Tailwind classes, no literals. The condition
 * is a glyph AND text — never color alone. Renders a skeleton when `loading` and
 * a `—` placeholder when `temperature` is absent; `variant='compact'` collapses
 * to a single row. Same props as {@link CurrentWeatherProps}.
 */
exports.CurrentWeatherV4 = React.forwardRef(function CurrentWeatherV4({ location, temperature, unit = '°', condition, feelsLike, high, low, variant = 'hero', loading = false, className, onKeyDown, ...rest }, ref) {
    const hasData = temperature != null;
    const label = (0, weather_utils_1.conditionLabel)(condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(condition);
    const clickable = rest.onClick != null;
    const a11y = hasData && !loading
        ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
        : loading
            ? 'Loading current weather'
            : 'Current weather unavailable';
    const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-5';
    const interactive = clickable
        ? {
            role: 'button',
            tabIndex: 0,
            onKeyDown: (e) => {
                onKeyDown?.(e);
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    rest.onClick?.(e);
                }
            },
        }
        : { role: 'img', onKeyDown };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)(ground, 'flex flex-col gap-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-32 animate-pulse rounded-[var(--xen-radius-sm)] bg-primary-500" }), (0, jsx_runtime_1.jsx)("div", { className: "h-14 w-44 animate-pulse rounded-[var(--xen-radius-md)] bg-primary-500" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 w-36 animate-pulse rounded-[var(--xen-radius-sm)] bg-primary-500" })] }));
    }
    const chips = [];
    if (feelsLike != null)
        chips.push(`Feels ${feelsLike}${unit}`);
    if (high != null)
        chips.push(`H ${high}${unit}`);
    if (low != null)
        chips.push(`L ${low}${unit}`);
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(ground, 'flex flex-row items-center gap-3', clickable && 'cursor-pointer', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "xl", "aria-hidden": true, color: "onPrimary" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [location ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-primary-100", children: location }) : null, (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-primary", children: label })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-primary", children: hasData ? `${temperature}${unit}` : '—' })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(ground, 'flex flex-col', clickable && 'cursor-pointer', className), ...interactive, ...rest, children: [location ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-primary-100", children: location }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-row items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-6xl font-extrabold tracking-tight text-on-primary", children: hasData ? `${temperature}${unit}` : '—' }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "3xl", "aria-hidden": true, color: "onPrimary" })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-lg font-bold text-on-primary", children: label }), chips.length ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3 flex flex-row flex-wrap gap-2", children: chips.map((c) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary-500 px-3 py-1 text-sm font-semibold text-on-primary", children: c }, c))) })) : null] }));
});
//# sourceMappingURL=CurrentWeatherV4.js.map