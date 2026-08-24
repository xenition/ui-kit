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
exports.StackedBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Single horizontal stacked bar — inline SVG `<rect>`s, each sized to its share
 * of the total. Colors come from the cycled series vars (or an explicit token),
 * distinguished by `opacity` rather than literal hex. Guards an empty list and
 * a zero total.
 */
exports.StackedBar = React.forwardRef(function StackedBar({ segments, height = 16, className, ...rest }, ref) {
    if (segments.length === 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const total = segments.reduce((s, seg) => s + Math.max(seg.value, 0), 0);
    if (total <= 0)
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    let x = 0;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full', className), ...rest, children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 10", width: "100%", height: height, preserveAspectRatio: "none", role: "img", children: [(0, jsx_runtime_1.jsx)("rect", { x: 0, y: 0, width: 100, height: 10, rx: 5, fill: "var(--xen-border)" }), segments.map((seg, i) => {
                    const w = (Math.max(seg.value, 0) / total) * 100;
                    if (w <= 0)
                        return null;
                    const rectX = x;
                    x += w;
                    return ((0, jsx_runtime_1.jsx)("rect", { x: rectX, y: 0, width: w, height: 10, fill: seg.color ? (0, internal_1.colorVar)(seg.color) : (0, internal_1.seriesColor)(i), fillOpacity: seg.opacity ?? 1 }, i));
                })] }) }));
});
//# sourceMappingURL=StackedBar.js.map