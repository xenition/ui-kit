"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPSScaleV3 = NPSScaleV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const NPSScale_1 = require("./NPSScale");
/**
 * NPSScale, design V3 — the 0–10 scale as a **slider-style horizontal track**.
 * Eleven tick cells sit on one continuous rail; the rail fills with the primary
 * token up to the selected score and drops a thumb on it, so the answer reads as
 * a position on a line rather than a grid of buttons. A readout above names the
 * current score and its bucket (detractor / passive / promoter), so meaning is
 * never color-alone. `radiogroup`/`radio` with each tick announced; tapping a
 * tick selects it. Token-pure.
 */
function NPSScaleV3({ value, onChange, minLabel = 'Not at all likely', maxLabel = 'Extremely likely', colorByBucket = false, accessibilityLabel = 'Likelihood to recommend, 0 to 10', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasValue = value != null;
    const bucket = hasValue ? (0, NPSScale_1.npsBucket)(value) : null;
    const railTint = (0, color_1.withAlpha)(colors.primary, 0.14);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { minHeight: tokens.typography.scale.xl, justifyContent: 'center' }, children: hasValue ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: value }), `  ·  ${bucket}`] })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Tap a point to rate" })) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', opacity: disabled ? 0.5 : 1 }, children: Array.from({ length: 11 }, (_, score) => {
                    const selected = value === score;
                    const filled = hasValue && score <= value;
                    const isFirst = score === 0;
                    const isLast = score === 10;
                    void colorByBucket; // palette intentionally primary-driven in the slider treatment
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${score}, ${(0, NPSScale_1.npsBucket)(score)}`, disabled: disabled, onPress: () => onChange?.(score), style: { flex: 1, minHeight: 44, justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: 8,
                                    backgroundColor: filled ? colors.primary : railTint,
                                    borderTopLeftRadius: isFirst ? tokens.radius.full : 0,
                                    borderBottomLeftRadius: isFirst ? tokens.radius.full : 0,
                                    borderTopRightRadius: isLast ? tokens.radius.full : 0,
                                    borderBottomRightRadius: isLast ? tokens.radius.full : 0,
                                } }), selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 22,
                                        height: 22,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: colors.surface,
                                        borderWidth: 3,
                                        borderColor: colors.primary,
                                        ...(0, elevation_1.shadow)('sm', tokens),
                                    } }) })) : null] }, score));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1, textAlign: 'right' }, children: maxLabel })] })] }));
}
//# sourceMappingURL=NPSScaleV3.js.map