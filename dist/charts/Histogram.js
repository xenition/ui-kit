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
exports.Histogram = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Frequency histogram — inline SVG `<rect>`s sitting flush (a hairline
 * `--xen-surface` gap between them) to read as a distribution. Bars fill with
 * `var(--xen-<color>)` and a `--xen-muted` baseline stands in for the axis.
 * Divide-by-zero is guarded via {@link safeMax}.
 */
exports.Histogram = React.forwardRef(function Histogram({ bins, height = 120, color = 'primary', max, className, ...rest }, ref) {
    if (bins.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const width = 320;
    const ceiling = (0, internal_1.safeMax)(bins, max);
    const fill = (0, internal_1.colorVar)(color);
    const slot = width / bins.length;
    return ((0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: `0 0 ${width} ${height}`, width: "100%", height: height, preserveAspectRatio: "none", role: "img", className: (0, cn_1.cn)('inline-block', className), ...rest, children: [bins.map((count, i) => {
                const h = Math.max((0, internal_1.clamp01)(count / ceiling) * height, 1);
                return ((0, jsx_runtime_1.jsx)("rect", { x: i * slot, y: height - h, width: slot, height: h, fill: fill, stroke: "var(--xen-surface)", strokeWidth: 1 }, i));
            }), (0, jsx_runtime_1.jsx)("line", { x1: 0, y1: height, x2: width, y2: height, stroke: "var(--xen-muted)", strokeWidth: 1 })] }));
});
//# sourceMappingURL=Histogram.js.map