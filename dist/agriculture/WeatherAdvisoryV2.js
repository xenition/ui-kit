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
exports.WeatherAdvisoryV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const KIND_GLYPH = { frost: '❄️', heat: '🔥', rain: '🌧️', wind: '💨', drought: '🌵', storm: '⛈️', general: '⚠️' };
const SEV = {
    info: { tint: 'bg-primary/10', text: 'text-primary', label: 'Info' },
    watch: { tint: 'bg-warn/10', text: 'text-warn', label: 'Watch' },
    warning: { tint: 'bg-warn/10', text: 'text-warn', label: 'Warning' },
    severe: { tint: 'bg-danger/10', text: 'text-danger', label: 'Severe' },
};
/**
 * WeatherAdvisory, redesigned (v2): a **bold advisory banner**. A severity-tinted
 * panel with a large kind glyph, the headline, the message, a severity pill, and a
 * timeframe — a prominent alert. Distinct from v1. Same props, token-only.
 */
exports.WeatherAdvisoryV2 = React.forwardRef(function WeatherAdvisoryV2({ title, message, kind = 'general', severity = 'info', timeframe, icon, className, ...rest }, ref) {
    const s = SEV[severity];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-weather-advisory": "", role: "status", className: (0, cn_1.cn)('flex gap-3 rounded-lg p-md', s.tint, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl", "aria-hidden": true, children: icon ?? KIND_GLYPH[kind] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-full px-2 py-0.5 text-xs font-bold', s.text), children: s.label })] }), message ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-on-surface", children: message }) : null, timeframe ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-muted", children: ["\uD83D\uDD50 ", timeframe] }) : null] })] }));
});
//# sourceMappingURL=WeatherAdvisoryV2.js.map