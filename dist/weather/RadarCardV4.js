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
exports.RadarCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
}
/**
 * RadarCard — **sky scope** design (v4), web parity of the native `RadarCardV4`.
 * A dependency-free radar placeholder that actually looks like a scope: a gradient
 * sky canvas with concentric range rings, a crosshair, a rotated sweep beam, a
 * couple of translucent "precip" returns and a pinging center marker — all built
 * from `div`s (no maps SDK, no SVG, no image). A header carries the title and a
 * live pill. Pass `onClick` to open a full view. All colors flow through Tailwind
 * token classes; only geometry is inline. Same props as {@link RadarCardProps}.
 */
exports.RadarCardV4 = React.forwardRef(function RadarCardV4({ title = 'Radar', caption, height = 200, placeholderLabel = 'Radar preview', className, onClick, ...rest }, ref) {
    const canvas = clamp(height, 120, 480);
    const clickable = onClick != null;
    const rings = [1, 0.68, 0.36];
    const Scope = ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-b from-primary-400 to-primary-700", style: { height: canvas }, children: [rings.map((s, i) => {
                const dim = canvas * 0.86 * s;
                return ((0, jsx_runtime_1.jsx)("div", { className: "absolute rounded-full border border-primary-200", style: { width: dim, height: dim } }, i));
            }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bg-primary-200", style: { width: '86%', height: 1 } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bg-primary-200", style: { width: 1, height: '86%' } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bg-primary-100", style: { width: canvas * 0.42, height: 2, left: '50%', top: '50%', transform: 'rotate(-35deg)', transformOrigin: 'left center' } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute rounded-full bg-accent", style: { width: canvas * 0.2, height: canvas * 0.2, top: canvas * 0.24, left: canvas * 0.3, opacity: 0.5 } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute rounded-full bg-warn", style: { width: canvas * 0.14, height: canvas * 0.14, bottom: canvas * 0.22, right: canvas * 0.26, opacity: 0.5 } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute rounded-full border border-accent", style: { width: 22, height: 22 } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute rounded-full bg-accent", style: { width: 8, height: 8 } }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-2 flex flex-row items-center gap-1 rounded-full bg-primary-500 px-3 py-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCE1", size: "sm", color: "onPrimary", "aria-label": "Radar" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-primary", children: placeholderLabel })] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`, className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex flex-row items-center justify-between px-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: title }), caption ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-on-accent", children: caption }) })) : null] }), clickable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Open radar", onClick: onClick, className: "block w-full rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: Scope })) : (Scope)] }));
});
//# sourceMappingURL=RadarCardV4.js.map