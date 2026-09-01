"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_EMOJI_OPTIONS = void 0;
exports.EmojiScale = EmojiScale;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/** Default 5-face satisfaction set, Terrible → Great. */
exports.DEFAULT_EMOJI_OPTIONS = [
    { emoji: '😡', label: 'Terrible' },
    { emoji: '😞', label: 'Poor' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😍', label: 'Great' },
];
/**
 * EmojiScale — **V4** "clean form / focus" emoji-face satisfaction picker. A row
 * of big emoji buttons on a calm neutral surface; the selected face gets the
 * single signature accent — a `primary` ring plus a soft `primary` tint
 * (`withAlpha`) — and scales up slightly, with its label shown beneath the row.
 * The face label carries the meaning so selection is never conveyed by color
 * alone. Exposed as a `radiogroup` of `radio`s with spoken labels. Controlled
 * via `value` + `onChange`; token-only colors via `useXenitionTheme()`.
 */
function EmojiScale({ value, onChange, options = exports.DEFAULT_EMOJI_OPTIONS, accessibilityLabel = 'Satisfaction', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const selectedOption = value != null ? options[value] : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: options.map((opt, index) => {
                    const selected = value === index;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: opt.label, disabled: disabled, onPress: () => onChange(index), style: {
                            width: 48,
                            height: 48,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            borderWidth: selected ? 2 : 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: selected ? (0, color_1.withAlpha)(colors.primary, 0.12) : colors.surface,
                            transform: [{ scale: selected ? 1.1 : 1 }],
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: 24 }, children: opt.emoji }) }, index));
                }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    minHeight: tokens.typography.scale.sm * 1.4,
                    textAlign: 'center',
                    color: colors.primary,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                }, children: selectedOption?.label ?? '' })] }));
}
//# sourceMappingURL=EmojiScale.js.map