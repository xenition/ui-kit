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
exports.CurrentWeather = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Hero current-conditions block (web parity of the native `CurrentWeather`):
 * location eyebrow, a large temperature, and the condition shown as a glyph
 * beside its text label (accessibility never relies on color). Feels-like plus
 * daily high/low sit underneath. `variant='compact'` collapses to a single row.
 * Renders a `—` placeholder when `temperature` is absent and a token skeleton
 * when `loading`. Pass `onClick` to make the hero tappable (keyboard-activatable).
 * All colors come from the `--xen-*` tokens via Tailwind classes — no literals.
 */
exports.CurrentWeather = React.forwardRef(function CurrentWeather({ location, temperature, unit = '°', condition, feelsLike, high, low, variant = 'hero', loading = false, className, onKeyDown, ...rest }, ref) {
    const hasData = temperature != null;
    const label = (0, weather_utils_1.conditionLabel)(condition);
    const glyph = (0, weather_utils_1.conditionGlyph)(condition);
    const clickable = rest.onClick != null;
    const a11y = hasData && !loading
        ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
        : loading
            ? 'Loading current weather'
            : 'Current weather unavailable';
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
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, role: "img", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-32 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-12 w-40 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200" })] }));
    }
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-row items-center gap-3', clickable && 'cursor-pointer', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "xl", "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [location ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: location }) : null, (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: label })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: hasData ? `${temperature}${unit}` : '—' })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col', clickable && 'cursor-pointer', className), ...interactive, ...rest, children: [location ? (0, jsx_runtime_1.jsx)("p", { className: "mb-1 text-sm text-muted", children: location }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-3", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "3xl", "aria-hidden": true }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold text-on-surface sm:text-5xl", children: hasData ? `${temperature}${unit}` : '—' })] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-lg font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-row flex-wrap gap-3", children: [feelsLike != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["Feels like ", feelsLike, unit] })) : null, high != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["H ", high, unit] })) : null, low != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["L ", low, unit] })) : null] })] }));
});
//# sourceMappingURL=CurrentWeather.js.map