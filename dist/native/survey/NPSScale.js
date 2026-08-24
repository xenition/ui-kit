"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npsBucket = npsBucket;
exports.NPSScale = NPSScale;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Classify a 0-10 score into its Net Promoter bucket. */
function npsBucket(score) {
    if (score <= 6)
        return 'detractor';
    if (score <= 8)
        return 'passive';
    return 'promoter';
}
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
 * The 0-10 Net Promoter Score picker — eleven `radio` cells in a `radiogroup`
 * with anchor labels under the extremes. Each cell announces its bucket
 * (detractor / passive / promoter) so the meaning is never conveyed by color
 * alone; `colorByBucket` additionally tints selected cells by bucket using the
 * danger / warn / success tokens. Selection uses the primary token otherwise.
 * No literal colors.
 */
function NPSScale({ value, onChange, minLabel = 'Not at all likely', maxLabel = 'Extremely likely', colorByBucket = false, accessibilityLabel = 'Likelihood to recommend, 0 to 10', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: Array.from({ length: 11 }, (_, score) => {
                    const selected = value === score;
                    const bucket = npsBucket(score);
                    const baseColor = colorByBucket ? colors[BUCKET_BASE[bucket]] : colors.primary;
                    const onColor = colorByBucket ? colors[BUCKET_ON[bucket]] : colors.onPrimary;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${score}, ${bucket}`, disabled: disabled, onPress: () => onChange?.(score), style: {
                            width: 34,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.sm,
                            borderWidth: selected ? 2 : 1,
                            borderColor: selected ? baseColor : colors.border,
                            backgroundColor: selected ? baseColor : colors.surface,
                            opacity: disabled ? 0.5 : 1,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: selected ? onColor : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '700',
                            }, children: score }) }, score));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            flexShrink: 1,
                            textAlign: 'right',
                        }, children: maxLabel })] })] }));
}
//# sourceMappingURL=NPSScale.js.map