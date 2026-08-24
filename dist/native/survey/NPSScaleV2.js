"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPSScaleV2 = NPSScaleV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const NPSScale_1 = require("./NPSScale");
const BASE = {
    detractor: 'danger',
    passive: 'warn',
    promoter: 'success',
};
const ON = {
    detractor: 'onDanger',
    passive: 'onWarn',
    promoter: 'onSuccess',
};
const TEXT = {
    detractor: 'dangerText',
    passive: 'warnText',
    promoter: 'successText',
};
const LEGEND = [
    { bucket: 'detractor', label: 'Detractors 0–6' },
    { bucket: 'passive', label: 'Passives 7–8' },
    { bucket: 'promoter', label: 'Promoters 9–10' },
];
function NPSCell({ score, selected, disabled, colorByBucket, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const bucket = (0, NPSScale_1.npsBucket)(score);
    const base = colorByBucket ? colors[BASE[bucket]] : colors.primary;
    const on = colorByBucket ? colors[ON[bucket]] : colors.onPrimary;
    const restText = colorByBucket ? colors[TEXT[bucket]] : colors.onSurface;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { flexBasis: '18%', flexGrow: 1, transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${score}, ${bucket}`, disabled: disabled, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                minHeight: 56,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? base : (0, color_1.withAlpha)(base, 0.35),
                backgroundColor: selected ? base : (0, color_1.withAlpha)(base, 0.08),
                opacity: disabled ? 0.5 : 1,
                ...(selected ? (0, elevation_1.shadow)('sm', tokens) : null),
            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: selected ? on : restText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: score }) }) }));
}
/**
 * NPSScale, design V2 — the 0–10 scale as a **grid of numbered cards with bucket
 * coloring baked in**. Every card carries a faint tint of its bucket color
 * (detractor / passive / promoter) at rest and fills solid with a lift when
 * selected, and a labeled legend spells out each band so the meaning is never
 * color-alone. `colorByBucket` drives the palette; otherwise all cards read as
 * primary. `radiogroup`/`radio` with each cell's bucket announced; cards spring
 * on press. Token-pure.
 */
function NPSScaleV2({ value, onChange, minLabel = 'Not at all likely', maxLabel = 'Extremely likely', colorByBucket = false, accessibilityLabel = 'Likelihood to recommend, 0 to 10', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: Array.from({ length: 11 }, (_, score) => ((0, jsx_runtime_1.jsx)(NPSCell, { score: score, selected: value === score, disabled: disabled, colorByBucket: colorByBucket, onPress: () => onChange?.(score) }, score))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1, textAlign: 'right' }, children: maxLabel })] }), colorByBucket ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: LEGEND.map(({ bucket, label }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 12,
                                height: 12,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: colors[BASE[bucket]],
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label })] }, bucket))) })) : null] }));
}
//# sourceMappingURL=NPSScaleV2.js.map