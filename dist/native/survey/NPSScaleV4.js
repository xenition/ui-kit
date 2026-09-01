"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPSScaleV4 = NPSScaleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const NPSScale_1 = require("./NPSScale");
const BUCKET_ON = {
    detractor: 'onDanger',
    passive: 'onWarn',
    promoter: 'onSuccess',
};
const BUCKET_BASE = {
    detractor: 'danger',
    passive: 'warn',
    promoter: 'success',
};
/**
 * NPSScale — **V4** "clean form / focus" design. Eleven big 0–10 cells (min
 * height 44, bold 800 numerals) in a calm, legible row that wraps, with the
 * anchor labels underneath. The selected cell is a solid **primary** fill with
 * on-primary numeral by default, or its semantic **bucket** color
 * (detractor→danger, passive→warn, promoter→success) when `colorByBucket`;
 * unselected cells sit on `surface` + `border` with a soft primary tint on press.
 * One accent otherwise. Same props/behavior as {@link NPSScaleProps} — the
 * `radiogroup`/`radio` roles, `accessibilityState`, bucket announcements and
 * `onChange` are all preserved; token-only colors via `useXenitionTheme()` (no
 * literal colors).
 */
function NPSScaleV4({ value, onChange, minLabel = 'Not at all likely', maxLabel = 'Extremely likely', colorByBucket = false, accessibilityLabel = 'Likelihood to recommend, 0 to 10', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: Array.from({ length: 11 }, (_, score) => {
                    const selected = value === score;
                    const bucket = (0, NPSScale_1.npsBucket)(score);
                    const baseColor = colorByBucket ? colors[BUCKET_BASE[bucket]] : colors.primary;
                    const onColor = colorByBucket ? colors[BUCKET_ON[bucket]] : colors.onPrimary;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${score}, ${bucket}`, disabled: disabled, onPress: () => onChange?.(score), style: ({ pressed }) => ({
                            flex: 1,
                            minWidth: 44,
                            minHeight: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.md,
                            borderWidth: selected ? 2 : 1,
                            borderColor: selected ? baseColor : colors.border,
                            backgroundColor: selected
                                ? baseColor
                                : pressed
                                    ? (0, color_1.withAlpha)(colors.primary, 0.12)
                                    : colors.surface,
                            opacity: disabled ? 0.5 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: selected ? onColor : colors.onSurface,
                                fontSize: tokens.typography.scale.lg,
                                fontWeight: '800',
                            }, children: score }) }, score));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            flexShrink: 1,
                            textAlign: 'right',
                        }, children: maxLabel })] })] }));
}
//# sourceMappingURL=NPSScaleV4.js.map