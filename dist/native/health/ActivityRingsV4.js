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
exports.ActivityRingsV4 = ActivityRingsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
const DEFAULT_COLORS = ['danger', 'success', 'primary', 'accent'];
/**
 * **V4 activity rings** — same props as {@link ActivityRings} plus
 * `emptyLabel`, `noGoalLabel` and `formatRing`.
 *
 * ## Five changes
 *
 * 1. **A ring with no goal says so instead of announcing "0%".** The base read
 *    `goal: 0` as nought per cent, so 540 burned calories with the target
 *    switched off were reported as no progress at all.
 * 2. **The figure stops claiming rings it did not draw.** Rings whose radius
 *    fell to zero — the fifth ring on a 140px figure, say — were dropped
 *    silently and then legended and announced anyway. Only the rings that
 *    actually fit are drawn, listed and spoken.
 * 3. **The empty branch keeps `style` and `appearance`.** It returned a bare
 *    `<Text>` before either was applied, so a caller's layout and surface
 *    treatment vanished at exactly the moment the component had least to say.
 * 4. **Each legend row is a real `progressbar` with a value**, so the numbers
 *    the rings encode are reachable. When there is no legend the figure keeps
 *    the one summary sentence; when there is one, the drawing becomes
 *    decorative rather than repeating everything the legend already says.
 * 5. **The ring track is a surface, not the hairline colour**, which on a dark
 *    seed made an empty ring and a full one hard to distinguish.
 */
function ActivityRingsV4({ rings, size = 140, strokeWidth = 14, gap = 4, showLegend = false, accessibilityLabel, emptyLabel = 'No activity yet', noGoalLabel = 'no goal', formatRing, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const surface = (0, tone_v4_1.looseCardStyle)(theme, appearance);
    // The radius a ring at index `i` would take; at or below zero it cannot be
    // drawn, and the base kept announcing it regardless.
    const radiusAt = (i) => size / 2 - strokeWidth / 2 - i * (strokeWidth + gap);
    const drawn = (rings ?? [])
        .map((ring, i) => ({ ring, index: i, r: radiusAt(i), parts: (0, goal_v4_1.goalParts)(ring.value, ring.goal) }))
        .filter((entry) => entry.r > 0);
    if (drawn.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [surface, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: emptyLabel, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }) }));
    }
    const arcColor = (ring, i) => colors[ring.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] ?? 'primary'];
    const ringName = (ring, parts) => formatRing
        ? formatRing(ring, parts)
        : (0, tone_v4_1.spokenLine)([
            ring.label,
            parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
            `${parts.value}${ring.unit ? ` ${ring.unit}` : ''}`,
        ]);
    const summary = accessibilityLabel ??
        `Activity rings: ${drawn.map((entry) => ringName(entry.ring, entry.parts)).join('; ')}`;
    const figure = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsx)(react_native_svg_1.G, { rotation: -90, origin: `${size / 2}, ${size / 2}`, children: drawn.map((entry) => {
                    const circumference = 2 * Math.PI * entry.r;
                    return ((0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: size / 2, cy: size / 2, r: entry.r, fill: "none", stroke: (0, tone_v4_1.trackGround)(theme), strokeWidth: strokeWidth }), (0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: size / 2, cy: size / 2, r: entry.r, fill: "none", stroke: arcColor(entry.ring, entry.index), strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: `${circumference * (entry.parts.ratio ?? 0)} ${circumference}` })] }, entry.index));
                }) }) }) }));
    if (!showLegend) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [surface, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: summary, children: figure }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg },
            surface,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: figure }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm, flex: 1, minWidth: 0 }, children: drawn.map((entry) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: entry.parts.hasGoal ? 'progressbar' : 'text', accessibilityLabel: ringName(entry.ring, entry.parts), accessibilityValue: entry.parts.hasGoal ? (0, tone_v4_1.percentValue)(entry.parts.percent) : undefined, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: tokens.spacing.sm,
                                height: tokens.spacing.sm,
                                borderRadius: tokens.radius.full,
                                backgroundColor: arcColor(entry.ring, entry.index),
                            } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", children: entry.ring.label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", numberOfLines: 1, style: { flex: 1 }, children: entry.parts.hasGoal
                                ? (0, tone_v4_1.metaLine)([`${entry.parts.value} / ${entry.parts.target}`, entry.ring.unit])
                                : (0, tone_v4_1.metaLine)([`${entry.parts.value}`, entry.ring.unit, noGoalLabel]) })] }, entry.index))) })] }));
}
//# sourceMappingURL=ActivityRingsV4.js.map