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
exports.Heatmap = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Grid heatmap — one inline SVG `<rect>` per cell, all painting the SAME
 * `var(--xen-<color>)` and varying only `fill-opacity` (`value / max`), so no
 * literal colors are introduced. A floor keeps zero cells faintly visible.
 * Empty / ragged grids are guarded, as is a zero max.
 */
exports.Heatmap = React.forwardRef(function Heatmap({ data, color = 'primary', max, cellSize = 16, gap = 2, className, ...rest }, ref) {
    if (data.length === 0 || data.every((row) => row.length === 0))
        return (0, jsx_runtime_1.jsx)(internal_1.ChartEmpty, {});
    const cols = Math.max(...data.map((row) => row.length), 0);
    const rows = data.length;
    const ceiling = (0, internal_1.safeMax)(data.flat(), max);
    const fill = (0, internal_1.colorVar)(color);
    const width = cols * cellSize + (cols - 1) * gap;
    const height = rows * cellSize + (rows - 1) * gap;
    return ((0, jsx_runtime_1.jsx)("svg", { ref: ref, viewBox: `0 0 ${Math.max(width, 1)} ${Math.max(height, 1)}`, width: width, height: height, role: "img", "aria-label": `Heatmap, ${rows}×${cols} grid, max ${ceiling}`, className: (0, cn_1.cn)('inline-block', className), ...rest, children: data.map((row, r) => Array.from({ length: cols }, (_, c) => {
            const value = row[c] ?? 0;
            const intensity = (0, internal_1.clamp01)(value / ceiling);
            return ((0, jsx_runtime_1.jsx)("rect", { x: c * (cellSize + gap), y: r * (cellSize + gap), width: cellSize, height: cellSize, rx: 2, fill: fill, fillOpacity: 0.08 + intensity * 0.92 }, `${r}-${c}`));
        })) }));
});
//# sourceMappingURL=Heatmap.js.map