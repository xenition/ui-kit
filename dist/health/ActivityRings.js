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
exports.ActivityRings = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const charts_1 = require("../charts");
const internal_1 = require("./internal");
const DEFAULT_COLORS = ['danger', 'success', 'primary', 'accent'];
/**
 * Apple-style concentric activity rings drawn as inline SVG. Each ring is a
 * `--xen-border` track plus a `var(--xen-<color>)` arc (dash-array technique,
 * starting at 12 o'clock). Guards divide-by-zero per ring and renders a muted
 * "No data" note when `rings` is empty. The whole figure carries one
 * `aria-label` summarizing every ring. Web parity of the native `ActivityRings`;
 * token-only colors.
 */
exports.ActivityRings = React.forwardRef(function ActivityRings({ rings, size = 140, strokeWidth = 14, gap = 4, showLegend = false, 'aria-label': ariaLabel, className, ...rest }, ref) {
    if (rings.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('text-sm text-muted', className), ...rest, children: "No data" }));
    }
    const cx = size / 2;
    const cy = size / 2;
    const summary = ariaLabel ??
        `Activity rings: ${rings
            .map((ring) => {
            const g = Math.max(ring.goal, 0);
            const pct = g > 0 ? Math.round((Math.min(Math.max(ring.value, 0), g) / g) * 100) : 0;
            return `${ring.label} ${pct}%`;
        })
            .join(', ')}`;
    const figure = ((0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, role: "img", "aria-label": summary, children: (0, jsx_runtime_1.jsx)("g", { transform: `rotate(-90 ${cx} ${cy})`, children: rings.map((ring, i) => {
                const r = size / 2 - strokeWidth / 2 - i * (strokeWidth + gap);
                if (r <= 0)
                    return null;
                const circumference = 2 * Math.PI * r;
                const g = Math.max(ring.goal, 0);
                const frac = g > 0 ? Math.min(Math.max(ring.value, 0), g) / g : 0;
                const dash = circumference * frac;
                const arcColor = (0, charts_1.colorVar)(ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary');
                return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: r, fill: "none", stroke: "var(--xen-border)", strokeWidth: strokeWidth }), (0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: r, fill: "none", stroke: arcColor, strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: `${dash} ${circumference}` })] }, i));
            }) }) }));
    if (!showLegend) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex', className), ...rest, children: figure }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-lg)]', className), ...rest, children: [figure, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: rings.map((ring, i) => {
                    const g = Math.max(ring.goal, 0);
                    const arcColor = ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary';
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', internal_1.BG_CLASS[arcColor]) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: ring.label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [Math.min(Math.max(ring.value, 0), g), " / ", g, ring.unit ? ` ${ring.unit}` : ''] })] }, i));
                }) })] }));
});
//# sourceMappingURL=ActivityRings.js.map