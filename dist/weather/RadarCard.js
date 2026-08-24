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
exports.RadarCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Static radar map placeholder (web parity of the native `RadarCard`) —
 * INTENTIONALLY dependency-free: no maps SDK, no image, no chart. The "canvas"
 * is built purely from styled `div`s: a token-tinted backdrop, three concentric
 * range rings, a crosshair, and a labelled centre. It gives weather layouts a
 * radar slot before (or without) a real tile provider is wired. Pass `onClick`
 * to open a full view (renders a keyboard-focusable button). All colors come
 * from the `--xen-*` tokens via Tailwind classes — no literal colors, no deps.
 */
exports.RadarCard = React.forwardRef(function RadarCard({ title = 'Radar', caption, height = 180, placeholderLabel = 'Radar preview', className, onClick, ...rest }, ref) {
    const canvas = (0, weather_utils_1.clamp)(height, 96, 480);
    const rings = [0.9, 0.6, 0.3];
    const clickable = onClick != null;
    const Canvas = ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-neutral-100", style: { height: canvas }, children: [rings.map((scale, i) => {
                const dim = canvas * scale;
                return ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute rounded-full border border-border", style: { width: dim, height: dim } }, i));
            }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute h-px w-full bg-border" }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute h-full w-px bg-border" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCE1", size: "xl", "aria-label": "Radar" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: placeholderLabel })] })] }));
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, role: "img", "aria-label": `${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex flex-row items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: caption }) : null] }), clickable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Open radar", onClick: onClick, className: "block w-full rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: Canvas })) : (Canvas)] }));
});
//# sourceMappingURL=RadarCard.js.map