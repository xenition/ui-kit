"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizOption = QuizOption;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATE_VISUAL = {
    default: { border: 'border', glyph: null, glyphColor: 'muted', a11ySuffix: '' },
    selected: { border: 'primary', glyph: '●', glyphColor: 'primary', a11ySuffix: ', selected' },
    correct: { border: 'success', glyph: '✓', glyphColor: 'success', a11ySuffix: ', correct answer' },
    incorrect: { border: 'danger', glyph: '✕', glyphColor: 'danger', a11ySuffix: ', incorrect answer' },
};
/**
 * A single selectable quiz answer, rendered as an accessibility `radio`.
 * Correct/incorrect states carry an explicit glyph (`✓` / `✕`) and spoken
 * suffix so they never rely on color alone. Token-only colors.
 */
function QuizOption({ label, marker, state = 'default', selected, disabled = false, onSelect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const visual = STATE_VISUAL[state];
    const isSelected = selected ?? state === 'selected';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { checked: isSelected, disabled }, accessibilityLabel: `${marker ? `${marker}. ` : ''}${label}${visual.a11ySuffix}`, disabled: disabled || !onSelect, onPress: onSelect, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                borderWidth: 1,
                borderColor: colors[visual.border],
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
                opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
            },
            style,
        ], children: [marker ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 26,
                    height: 26,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: marker }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: label }), visual.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors[visual.glyphColor], fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: visual.glyph })) : null] }));
}
//# sourceMappingURL=QuizOption.js.map