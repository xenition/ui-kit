"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingScaleInputV4 = RatingScaleInputV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DEFAULT_EMOJI = ['😖', '🙁', '😐', '🙂', '😍'];
/**
 * RatingScaleInput — **V4** "clean form / focus" design. A big, tappable rating
 * (min 44px targets) that reports a 1-based value: `star` fills glyphs up to the
 * selection with the **warn** star tone (empty = muted); `number` shows big
 * primary-filled chips; `emoji` maps each cell to a face. The chosen value is
 * echoed as a large **primary** numeral (`N / total`) so the answer reads at a
 * glance. Calm, one accent, no gradients. Each cell is a `radio` that announces
 * its value and selection (never color-alone). Guards `max`/`emojis` indexing.
 * Same props/behavior as {@link RatingScaleInputProps}; token-only colors via
 * `useXenitionTheme()` (no literal colors).
 */
function RatingScaleInputV4({ value, onChange, max = 5, variant = 'star', emojis = DEFAULT_EMOJI, accessibilityLabel = 'Rating', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(1, Math.floor(max));
    const current = value ?? 0;
    const hasValue = current > 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, alignItems: 'center' }, children: Array.from({ length: total }, (_, i) => {
                    const cell = i + 1;
                    const active = cell <= current; // for star: fill up to selection
                    const selected = cell === current;
                    const emojiGlyph = emojis.length > 0 ? emojis[Math.min(i, emojis.length - 1)] : '🙂';
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${cell} of ${total}`, disabled: disabled, onPress: () => onChange?.(cell), style: {
                            minWidth: 44,
                            minHeight: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: disabled ? 0.5 : 1,
                        }, children: variant === 'star' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: active ? colors.warn : colors.muted, fontSize: tokens.typography.scale['3xl'] }, children: "\u2605" })) : variant === 'emoji' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'], opacity: selected ? 1 : 0.4 }, children: emojiGlyph })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 44,
                                height: 44,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: tokens.radius.full,
                                borderWidth: selected ? 2 : 1,
                                borderColor: selected ? colors.primary : colors.border,
                                backgroundColor: selected ? colors.primary : colors.surface,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: selected ? colors.onPrimary : colors.onSurface,
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '700',
                                }, children: cell }) })) }, cell));
                }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 4 }, accessibilityElementsHidden: true, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: hasValue ? colors.primary : colors.muted,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                        }, children: hasValue ? current : '–' }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg, fontWeight: '600' }, children: ["/ ", total] })] })] }));
}
//# sourceMappingURL=RatingScaleInputV4.js.map