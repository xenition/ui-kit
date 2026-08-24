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
exports.WeatherAdvisory = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const KIND_GLYPH = {
    frost: '❄️',
    heat: '🔥',
    rain: '🌧️',
    wind: '💨',
    drought: '🏜️',
    storm: '⛈️',
    general: '🌤️',
};
const SEVERITY_META = {
    info: { label: 'Info', iconColor: 'primary', edge: 'border-primary', tone: 'primary' },
    watch: { label: 'Watch', iconColor: 'warn', edge: 'border-warn', tone: 'warn' },
    warning: { label: 'Warning', iconColor: 'warn', edge: 'border-warn', tone: 'warn' },
    severe: { label: 'Severe', iconColor: 'danger', edge: 'border-danger', tone: 'danger' },
};
/**
 * A weather advisory banner — a token-tinted, accent-barred callout carrying a
 * category glyph, headline, optional message + timeframe, and a severity
 * {@link Badge}. Severity drives the accent color, but the text chip states it
 * too, so the alert never relies on color alone. Announced to assistive tech
 * via `role="alert"`. The tint and left edge come from token classes
 * (`bg-neutral-50` + `border-<tone>`) — no literal colors.
 */
exports.WeatherAdvisory = React.forwardRef(function WeatherAdvisory({ title, message, kind = 'general', severity = 'info', timeframe, icon, className, ...rest }, ref) {
    const meta = SEVERITY_META[severity];
    const glyph = icon ?? KIND_GLYPH[kind];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "data-xen-weather-advisory": "", "aria-label": `${meta.label} advisory: ${title}${message ? `. ${message}` : ''}`, className: (0, cn_1.cn)('flex gap-2 rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3', meta.edge, className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", color: meta.iconColor }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }), message != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-on-surface", children: message })) : null, timeframe != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-muted", children: ["\uD83D\uDD53 ", timeframe] })) : null] })] }));
});
//# sourceMappingURL=WeatherAdvisory.js.map