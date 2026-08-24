"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingScaleInput = RatingScaleInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DEFAULT_EMOJI = ['😖', '🙁', '😐', '🙂', '😍'];
/**
 * An interactive rating input — a `radiogroup` of tappable cells that report a
 * 1-based rating. `star` fills glyphs up to the selection with the accent
 * token; `number` shows filled numeric chips; `emoji` maps each cell to a face.
 * Each cell announces its value and selection (never color-alone). Guards
 * `max`/`emojis` indexing. No literal colors.
 */
function RatingScaleInput({ value, onChange, max = 5, variant = 'star', emojis = DEFAULT_EMOJI, accessibilityLabel = 'Rating', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = Math.max(1, Math.floor(max));
    const current = value ?? 0;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: [{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }, style], children: Array.from({ length: total }, (_, i) => {
            const cell = i + 1;
            const active = cell <= current; // for star: fill up to selection
            const selected = cell === current;
            const emojiGlyph = emojis.length > 0 ? emojis[Math.min(i, emojis.length - 1)] : '🙂';
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${cell} of ${total}`, disabled: disabled, onPress: () => onChange?.(cell), style: { opacity: disabled ? 0.5 : 1 }, children: variant === 'star' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                        color: active ? colors.accent : colors.muted,
                        fontSize: tokens.typography.scale['2xl'],
                    }, children: "\u2605" })) : variant === 'emoji' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                        fontSize: tokens.typography.scale['2xl'],
                        opacity: selected ? 1 : 0.4,
                    }, children: emojiGlyph })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        borderWidth: selected ? 2 : 1,
                        borderColor: selected ? colors.primary : colors.border,
                        backgroundColor: selected ? colors.primary : colors.surface,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: selected ? colors.onPrimary : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                        }, children: cell }) })) }, cell));
        }) }));
}
//# sourceMappingURL=RatingScaleInput.js.map