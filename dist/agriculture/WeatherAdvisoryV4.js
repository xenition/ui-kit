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
exports.WeatherAdvisoryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const farm_v4_1 = require("./internal/farm-v4");
/** Kind → glyph. Domain knowledge, so it stays here. */
const KIND_GLYPH = {
    frost: '❄️',
    heat: '🔥',
    rain: '🌧️',
    wind: '💨',
    drought: '🏜️',
    storm: '⛈️',
    general: '🌤️',
};
/**
 * Severity → tone and default label.
 *
 * `watch` and `warning` share `warn`: the tone scale has three steps and the
 * severity scale has four, and the **word** is what separates a watch from a
 * warning — which is how a meteorological service separates them too.
 */
const SEVERITY_META = {
    info: { label: 'Info', tone: 'primary' },
    watch: { label: 'Watch', tone: 'warn' },
    warning: { label: 'Warning', tone: 'warn' },
    severe: { label: 'Severe', tone: 'danger' },
};
/**
 * **V4 weather advisory** — the web twin of the native `WeatherAdvisoryV4`,
 * same props as {@link WeatherAdvisory} plus `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour**, via the badge word beside the tint.
 * 2. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    correctly in dark mode.
 * 3. **The glyph takes the contrast-corrected ink**, not the fill slot.
 * 4. **`role="alert"` is on the severe end only.** The base announced every
 *    advisory as an alert including `info`, which trains a screen-reader user
 *    to ignore the ones that matter — an `info` advisory is a status, a
 *    `severe` one interrupts.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
exports.WeatherAdvisoryV4 = React.forwardRef(function WeatherAdvisoryV4({ title, message, kind = 'general', severity = 'info', timeframe, icon, severityLabels, className, style, ...rest }, ref) {
    if (!title)
        return null;
    const meta = SEVERITY_META[severity];
    const label = severityLabels?.[severity] ?? meta.label;
    const glyph = icon ?? KIND_GLYPH[kind];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, 
        // Only the severe end interrupts. An `info` advisory that announces
        // itself as an alert is how a user learns to ignore all of them.
        role: severity === 'severe' ? 'alert' : 'status', "data-xen-weather-advisory": severity, className: (0, cn_1.cn)('flex gap-md rounded-[var(--xen-radius-lg)] border border-border p-md', className), style: { background: (0, farm_v4_1.toneGround)(meta.tone), ...style }, ...rest, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "2xl", className: farm_v4_1.TONE_INK[meta.tone] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 font-heading text-base font-bold text-on-card", children: title }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), message ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-card", children: message }) : null, timeframe ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "clock", size: "xs" }), timeframe] })) : null] })] }));
});
//# sourceMappingURL=WeatherAdvisoryV4.js.map