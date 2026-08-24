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
exports.ScatterChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Scatter plot — one inline SVG `<circle>` per point, filled with
 * `var(--xen-<color>)`; axes use `--xen-border`. Domains auto-fit the data (or
 * take explicit bounds) with zero-span guards, and y is flipped so larger
 * values sit higher.
 */
exports.ScatterChart = React.forwardRef(function ScatterChart({ data, width = 320, height = 200, color = 'primary', radius = 4, xDomain, yDomain, className, ...rest }, ref) {
    if (data.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const xs = data.map((p) => p.x);
    const ys = data.map((p) => p.y);
    const [x0, x1] = xDomain ?? [Math.min(...xs), Math.max(...xs)];
    const [y0, y1] = yDomain ?? [Math.min(...ys), Math.max(...ys)];
    const xSpan = x1 - x0 || 1;
    const ySpan = y1 - y0 || 1;
    const pad = radius + 2;
    const fill = (0, internal_1.colorVar)(color);
    const px = (x) => pad + ((x - x0) / xSpan) * (width - pad * 2);
    const py = (y) => height - pad - ((y - y0) / ySpan) * (height - pad * 2);
    return ((0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: `0 0 ${width} ${height}`, width: "100%", height: height, role: "img", "aria-label": `Scatter plot, ${data.length} points`, className: (0, cn_1.cn)('inline-block', className), ...rest, children: [(0, jsx_runtime_1.jsx)("line", { x1: pad, y1: height - pad, x2: width - pad, y2: height - pad, stroke: "var(--xen-border)", strokeWidth: 1 }), (0, jsx_runtime_1.jsx)("line", { x1: pad, y1: pad, x2: pad, y2: height - pad, stroke: "var(--xen-border)", strokeWidth: 1 }), data.map((p, i) => ((0, jsx_runtime_1.jsx)("circle", { cx: px(p.x), cy: py(p.y), r: radius, fill: fill, fillOpacity: 0.75 }, i)))] }));
});
//# sourceMappingURL=ScatterChart.js.map