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
exports.ColumnChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Horizontal bar chart — one labelled row per datum, each an inline SVG track
 * (`--xen-border`) with a fill `<rect>` in `var(--xen-<color>)` scaled to
 * `value / max`. Labels/values use token classes; scaling is guarded against a
 * zero divisor.
 */
exports.ColumnChart = React.forwardRef(function ColumnChart({ data, color = 'primary', max, barHeight = 12, showValues = false, className, ...rest }, ref) {
    if (data.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const ceiling = (0, internal_1.safeMax)(data.map((d) => d.value), max);
    const fill = (0, internal_1.colorVar)(color);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: data.map((d, i) => {
            const ratio = (0, internal_1.clamp01)(d.value / ceiling);
            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-on-surface text-xs", children: d.label }), showValues ? (0, jsx_runtime_1.jsx)("span", { className: "text-muted text-xs", children: d.value }) : null] }), (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 10", width: "100%", height: barHeight, preserveAspectRatio: "none", role: "img", children: [(0, jsx_runtime_1.jsx)("rect", { x: 0, y: 0, width: 100, height: 10, rx: 5, fill: "var(--xen-border)" }), (0, jsx_runtime_1.jsx)("rect", { x: 0, y: 0, width: Math.max(ratio * 100, 0), height: 10, rx: 5, fill: fill })] })] }, i));
        }) }));
});
//# sourceMappingURL=ColumnChart.js.map