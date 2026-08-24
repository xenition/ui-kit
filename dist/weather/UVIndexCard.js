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
exports.UVIndexCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const weather_utils_1 = require("./weather-utils");
const TONE_MARKER = {
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
function uvBand(uv) {
    if (uv <= 2)
        return { label: 'Low', glyph: '🕶️', tone: 'success' };
    if (uv <= 5)
        return { label: 'Moderate', glyph: '🧢', tone: 'warn' };
    if (uv <= 7)
        return { label: 'High', glyph: '🧴', tone: 'warn' };
    if (uv <= 10)
        return { label: 'Very high', glyph: '⛱️', tone: 'danger' };
    return { label: 'Extreme', glyph: '🚫', tone: 'danger' };
}
/**
 * UV index card (web parity of the native `UVIndexCard`): the numeric UV value,
 * its exposure band shown as a `Badge` glyph + text label (never color alone), a
 * token 0–11 scale track with a marker, and an optional protection tip. Band
 * severity maps to success/warn/danger token tones. Renders a muted empty state
 * when `uv` is absent. All colors come from the `--xen-*` tokens via Tailwind
 * classes — no literal colors.
 */
exports.UVIndexCard = React.forwardRef(function UVIndexCard({ uv, advice, emptyLabel = 'UV index unavailable', className, ...rest }, ref) {
    if (uv == null) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, role: "img", "aria-label": emptyLabel, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const meta = uvBand(uv);
    const markerPct = (0, weather_utils_1.clamp)(uv, 0, 11) / 11;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, role: "img", "aria-label": `UV index ${uv}, ${meta.label}`, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF1E", size: "lg", "aria-label": "UV index" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "UV Index" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-row items-baseline gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold text-on-surface", children: uv }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), meta.label] })] }), (0, jsx_runtime_1.jsx)("div", { className: "relative mt-2 h-2 rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full', TONE_MARKER[meta.tone]), style: { left: `${markerPct * 100}%`, marginLeft: -2 } }) }), advice ? (0, jsx_runtime_1.jsx)("p", { className: "mt-2 text-sm text-on-surface", children: advice }) : null] }));
});
//# sourceMappingURL=UVIndexCard.js.map