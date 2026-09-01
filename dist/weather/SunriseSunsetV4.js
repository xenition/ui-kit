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
exports.SunriseSunsetV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
function clamp(n, lo, hi) {
    return Math.min(hi, Math.max(lo, n));
}
/**
 * V4 design-line sunrise/sunset card — a polished elevated white card with a
 * static daylight arc. Same props, defaults and empty handling as the base
 * `SunriseSunset`: a dependency-free dome of dots with a sun marker sitting at
 * `progress` along it, and glyph + time labels for sunrise and sunset. The arc
 * is accented with the `accent` token on a `bg-neutral-100` track. All colors
 * flow through Tailwind token classes.
 */
exports.SunriseSunsetV4 = React.forwardRef(function SunriseSunsetV4({ sunrise, sunset, progress = 0.5, arcHeight = 72, emptyLabel = 'Sun times unavailable', className, ...rest }, ref) {
    const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';
    if (sunrise == null && sunset == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "img", "aria-label": emptyLabel, className: (0, cn_1.cn)(shell, className), ...rest, children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel }) }));
    }
    const p = clamp(progress, 0, 1);
    const DOTS = 11;
    const height = clamp(arcHeight, 40, 200);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `Sunrise ${sunrise ?? 'unknown'}, sunset ${sunset ?? 'unknown'}`, className: (0, cn_1.cn)(shell, 'flex flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col justify-end", style: { height }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-row items-end justify-between", style: { height }, children: Array.from({ length: DOTS }).map((_, i) => {
                            const t = i / (DOTS - 1);
                            const dome = Math.sin(t * Math.PI); // 0→1→0
                            const active = t <= p;
                            const dotSize = 6;
                            return ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('rounded-full', active ? 'bg-accent' : 'bg-neutral-100'), style: { width: dotSize, height: dotSize, marginBottom: dome * (height - dotSize * 2) } }, i));
                        }) }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute", style: { left: `${p * 100}%`, bottom: Math.sin(p * Math.PI) * (height - 12), marginLeft: -9 }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2600\uFE0F", size: "lg", color: "warn", "aria-hidden": true }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex flex-row justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF05", size: "sm", className: "text-accent", "aria-label": "Sunrise" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: sunrise ?? '—' })] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-row items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF07", size: "sm", className: "text-accent", "aria-label": "Sunset" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: sunset ?? '—' })] })] })] }));
});
//# sourceMappingURL=SunriseSunsetV4.js.map