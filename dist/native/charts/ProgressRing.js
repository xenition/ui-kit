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
exports.ProgressRing = ProgressRing;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
/**
 * SVG progress ring — token-bound (uses `react-native-svg`). A `border` track
 * circle plus a semantic-`color` arc drawn with the stroke-dasharray technique
 * (rotated so it starts at 12 o'clock). `max` guards divide-by-zero. Renders a
 * `muted` "No data" note only when `max <= 0`.
 */
function ProgressRing({ value, max = 100, size = 120, strokeWidth = 12, color = 'primary', label, showPercent = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (max <= 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const clamped = Math.min(Math.max(value, 0), max);
    const frac = clamped / max;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * r;
    const dash = circumference * frac;
    const centerText = label ?? (showPercent ? `${Math.round(frac * 100)}%` : undefined);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { rotation: -90, origin: `${cx}, ${cy}`, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: r, fill: "none", stroke: colors.border, strokeWidth: strokeWidth }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: r, fill: "none", stroke: colors[color], strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: `${dash} ${circumference}` })] }) }), centerText !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    position: 'absolute',
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontFamily: tokens.typography.fontHeading,
                }, children: centerText })) : null] }));
}
//# sourceMappingURL=ProgressRing.js.map