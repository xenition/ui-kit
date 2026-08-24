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
exports.MapCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * Web parity of the native `MapCard`: a location preview — a STATIC,
 * dependency-free styled `div` placeholder, NOT a live map. It draws a
 * token-tinted frame with faux grid lines and a single pin marker; there is
 * intentionally no map library import, so it renders in any environment. Wire a
 * real map behind `onClick` when needed. Token-only colors.
 */
exports.MapCard = React.forwardRef(function MapCard({ label, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onClick, className, ...rest }, ref) {
    const x = clamp01(pin.x);
    const y = clamp01(pin.y);
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-map-card": "", role: interactive ? 'button' : 'img', "aria-label": interactive ? `Open map for ${label}` : `Map showing ${label}`, style: { height }, className: (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, ...(interactive
            ? {
                tabIndex: 0,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "absolute inset-0", children: [[0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)("div", { style: { top: `${f * 100}%` }, className: "absolute left-0 right-0 h-px bg-border" }, `h-${f}`))), [0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)("div", { style: { left: `${f * 100}%` }, className: "absolute bottom-0 top-0 w-px bg-border" }, `v-${f}`)))] }), (0, jsx_runtime_1.jsxs)("div", { "data-testid": "xen-map-pin", "aria-hidden": "true", style: { left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -10, marginTop: -20 }, className: "absolute flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 w-5 rounded-full border-2 border-on-primary bg-primary" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 w-[2px] bg-primary" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] right-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "truncate text-sm font-semibold text-on-surface", children: label }), caption ? (0, jsx_runtime_1.jsx)("div", { className: "truncate text-xs text-muted", children: caption }) : null] })] }));
});
//# sourceMappingURL=MapCard.js.map