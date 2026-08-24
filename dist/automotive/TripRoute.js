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
exports.TripRoute = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const clamp01 = (n) => (Number.isFinite(n) ? (n < 0 ? 0 : n > 1 ? 1 : n) : 0.5);
/**
 * A trip's origin→destination route rendered as a STATIC, dependency-free styled
 * `div` placeholder — NOT a live map. It draws a token-tinted frame with faux
 * grid tiles, a dashed connecting line, and labelled A/B (plus numbered
 * waypoint) markers; there is intentionally no map library, so it renders in any
 * environment. Endpoints are text-labelled, not color-coded alone. Colors come
 * from `--xen-*` token classes — no literal colors. Wire a real map behind
 * `onClick` when needed. Web parity of the native `TripRoute`.
 */
exports.TripRoute = React.forwardRef(function TripRoute({ origin, destination, waypoints = [], distance, duration, height = 180, onClick, className, ...rest }, ref) {
    const oAt = origin.at ?? { x: 0.2, y: 0.75 };
    const dAt = destination.at ?? { x: 0.8, y: 0.25 };
    const ox = clamp01(oAt.x);
    const oy = clamp01(oAt.y);
    const dx = clamp01(dAt.x);
    const dy = clamp01(dAt.y);
    const DOTS = 7;
    const dots = Array.from({ length: DOTS }, (_, i) => {
        const t = (i + 1) / (DOTS + 1);
        return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
    });
    const marker = (x, y, glyph, bg, testid) => ((0, jsx_runtime_1.jsx)("span", { "data-testid": testid, "aria-hidden": "true", className: (0, cn_1.cn)('absolute inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-surface text-xs font-extrabold text-on-primary', bg), style: { left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -12, marginTop: -12 }, children: glyph }, testid));
    const a11y = `Route from ${origin.label}${origin.address ? ` ${origin.address}` : ''} to ${destination.label}${destination.address ? ` ${destination.address}` : ''}${distance ? `, ${distance}` : ''}${duration ? `, ${duration}` : ''}`;
    const frame = ((0, jsx_runtime_1.jsxs)("div", { "data-xen-trip-route": "", className: "relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-100", style: { height }, children: [(0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: "pointer-events-none absolute inset-0", children: [[0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-0 right-0 h-px bg-border", style: { top: `${f * 100}%` } }, `h-${f}`))), [0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute bottom-0 top-0 w-px bg-border", style: { left: `${f * 100}%` } }, `v-${f}`)))] }), dots.map((p, i) => ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute h-1.5 w-1.5 rounded-full bg-primary", style: { left: `${p.x * 100}%`, top: `${p.y * 100}%`, marginLeft: -3, marginTop: -3 } }, `dot-${i}`))), waypoints.map((w, i) => marker(clamp01(w.at?.x ?? 0.5), clamp01(w.at?.y ?? 0.5), String(i + 1), 'bg-accent', `xen-trip-waypoint-${i}`)), marker(ox, oy, 'A', 'bg-primary', 'xen-trip-origin'), marker(dx, dy, 'B', 'bg-success', 'xen-trip-destination'), distance || duration ? ((0, jsx_runtime_1.jsxs)("div", { className: "absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [distance ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-on-surface", children: distance }) : null, duration ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: duration }) : null] })) : null] }));
    const legend = ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-sm)] flex gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "block text-xs font-semibold text-muted", children: ["A \u00B7 ", origin.label] }), origin.address ? (0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm text-on-surface", children: origin.address }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "block text-xs font-semibold text-muted", children: ["B \u00B7 ", destination.label] }), destination.address ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm text-on-surface", children: destination.address })) : null] })] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": a11y, className: className, ...rest, children: [frame, legend] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": `Open map. ${a11y}`, onClick: onClick, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
            }
        }, className: (0, cn_1.cn)('cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [frame, legend] }));
});
//# sourceMappingURL=TripRoute.js.map