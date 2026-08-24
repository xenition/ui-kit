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
exports.WeatherAdvisoryV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const KIND_GLYPH = { frost: '❄️', heat: '🔥', rain: '🌧️', wind: '💨', drought: '🌵', storm: '⛈️', general: '⚠️' };
const SEV = {
    info: { text: 'text-primary', label: 'Info' }, watch: { text: 'text-warn', label: 'Watch' }, warning: { text: 'text-warn', label: 'Warning' }, severe: { text: 'text-danger', label: 'Severe' },
};
/**
 * WeatherAdvisory, redesigned (v3): a **compact advisory line**. A kind glyph, the
 * headline over a message·timeframe line, and a severity word (color + text) on
 * the right — a hairline-bordered inline alert. The opposite of v2's banner. Same
 * props, token-only.
 */
exports.WeatherAdvisoryV3 = React.forwardRef(function WeatherAdvisoryV3({ title, message, kind = 'general', severity = 'info', timeframe, icon, className, ...rest }, ref) {
    const s = SEV[severity];
    const sub = [message, timeframe].filter((v) => !!v).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-weather-advisory": "", role: "status", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: icon ?? KIND_GLYPH[kind] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-bold', s.text), children: s.label })] }));
});
//# sourceMappingURL=WeatherAdvisoryV3.js.map