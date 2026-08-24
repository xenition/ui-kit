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
exports.Sparkline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Compact inline trend line — a minimal SVG `<polyline>` with no axes, stroked
 * with `var(--xen-<color>)`. Scales the series into the box with a zero-range
 * guard; a single point renders a centered dot.
 */
exports.Sparkline = React.forwardRef(function Sparkline({ data, width = 100, height = 28, color = 'primary', className, ...rest }, ref) {
    if (data.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const hi = Math.max(...data);
    const lo = Math.min(...data);
    const range = hi - lo || 1;
    const stroke = (0, internal_1.colorVar)(color);
    const pad = 2;
    const pts = data.map((v, i) => {
        const x = data.length === 1 ? width / 2 : pad + (i / (data.length - 1)) * (width - pad * 2);
        const y = height - pad - ((v - lo) / range) * (height - pad * 2);
        return { x, y };
    });
    return ((0, jsx_runtime_1.jsx)("svg", { ref: ref, viewBox: `0 0 ${width} ${height}`, width: width, height: height, preserveAspectRatio: "none", role: "img", className: (0, cn_1.cn)('inline-block align-middle', className), ...rest, children: data.length === 1 ? ((0, jsx_runtime_1.jsx)("circle", { cx: pts[0].x, cy: pts[0].y, r: 2, fill: stroke })) : ((0, jsx_runtime_1.jsx)("polyline", { points: pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '), fill: "none", stroke: stroke, strokeWidth: 1.5, strokeLinejoin: "round", strokeLinecap: "round" })) }));
});
//# sourceMappingURL=Sparkline.js.map