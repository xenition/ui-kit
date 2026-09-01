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
exports.MapCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * MapCard — **V4** "journey" design (web parity of the native V4). The
 * boarding-pass take on a location preview: a decorative accent→primary
 * "horizon" gradient ground stands in for the map tiles (the signature V4
 * touch), the pin sits inside a frosted glass tile with near-white ink, and the
 * label/caption ride a matching frosted card so the place name stays legible on
 * the saturated ground. It remains a STATIC, dependency-free placeholder — there
 * is intentionally no map library import, so it renders in any environment. Wire
 * a real map behind `onClick` when needed. Same props/behavior as
 * {@link MapCardProps}; all colors from `--xen-*` token classes (no literal
 * colors).
 */
exports.MapCardV4 = React.forwardRef(function MapCardV4({ label, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onClick, className, ...rest }, ref) {
    const x = clamp01(pin.x);
    const y = clamp01(pin.y);
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-map-card": "", role: interactive ? 'button' : 'img', "aria-label": interactive ? `Open map for ${label}` : `Map showing ${label}`, style: { height }, className: (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-gradient-to-br from-accent-400 to-primary-600', interactive &&
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
            : {}), children: [(0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "absolute inset-0", children: [[0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)("div", { style: { top: `${f * 100}%` }, className: "absolute left-0 right-0 h-px bg-primary-50/20" }, `h-${f}`))), [0.25, 0.5, 0.75].map((f) => ((0, jsx_runtime_1.jsx)("div", { style: { left: `${f * 100}%` }, className: "absolute bottom-0 top-0 w-px bg-primary-50/20" }, `v-${f}`)))] }), (0, jsx_runtime_1.jsx)("div", { "data-testid": "xen-map-pin", "aria-hidden": "true", style: { left: `${x * 100}%`, top: `${y * 100}%`, marginLeft: -14, marginTop: -14 }, className: "absolute flex h-7 w-7 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-sm leading-none text-primary-50", children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute bottom-[var(--xen-space-sm)] left-[var(--xen-space-sm)] right-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "truncate text-sm font-semibold text-primary-50", children: label }), caption ? (0, jsx_runtime_1.jsx)("div", { className: "truncate text-xs text-primary-100", children: caption }) : null] })] }));
});
//# sourceMappingURL=MapCardV4.js.map