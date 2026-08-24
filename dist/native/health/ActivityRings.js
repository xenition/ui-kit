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
exports.ActivityRings = ActivityRings;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const DEFAULT_COLORS = ['danger', 'success', 'primary', 'accent'];
/**
 * Apple-style concentric activity rings drawn with `react-native-svg`. Each ring
 * is a `border` track plus a semantic-color arc (dash-array technique, starting
 * at 12 o'clock). Guards divide-by-zero per ring and renders a muted "No data"
 * note when `rings` is empty. The whole figure exposes one `accessibilityLabel`
 * summarizing every ring. Token-only colors.
 */
function ActivityRings({ rings, size = 140, strokeWidth = 14, gap = 4, showLegend = false, accessibilityLabel, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const surface = appearance !== 'classic'
        ? { ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens), borderRadius: tokens.radius.lg, padding: tokens.spacing.lg }
        : null;
    if (rings.length === 0) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" });
    }
    const cx = size / 2;
    const cy = size / 2;
    const summary = accessibilityLabel ??
        `Activity rings: ${rings
            .map((ring) => {
            const g = Math.max(ring.goal, 0);
            const pct = g > 0 ? Math.round((Math.min(Math.max(ring.value, 0), g) / g) * 100) : 0;
            return `${ring.label} ${pct}%`;
        })
            .join(', ')}`;
    const figure = ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: summary, style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.G, { rotation: -90, origin: `${cx}, ${cy}`, children: rings.map((ring, i) => {
                    const r = size / 2 - strokeWidth / 2 - i * (strokeWidth + gap);
                    if (r <= 0)
                        return null;
                    const circumference = 2 * Math.PI * r;
                    const g = Math.max(ring.goal, 0);
                    const frac = g > 0 ? Math.min(Math.max(ring.value, 0), g) / g : 0;
                    const dash = circumference * frac;
                    const arcColor = colors[ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary'];
                    return ((0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: r, fill: "none", stroke: colors.border, strokeWidth: strokeWidth }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: cx, cy: cy, r: r, fill: "none", stroke: arcColor, strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: `${dash} ${circumference}` })] }, i));
                }) }) }) }));
    if (!showLegend) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [surface, style], children: figure });
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg }, surface, style], children: [figure, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: rings.map((ring, i) => {
                    const g = Math.max(ring.goal, 0);
                    const arcColor = colors[ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary'];
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 10,
                                    height: 10,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: arcColor,
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: ring.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [Math.min(Math.max(ring.value, 0), g), " / ", g, ring.unit ? ` ${ring.unit}` : ''] })] }, i));
                }) })] }));
}
//# sourceMappingURL=ActivityRings.js.map