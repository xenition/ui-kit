"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizOptionV4 = QuizOptionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const STATE_VISUAL = {
    default: { tone: null, glyph: null, glyphColor: 'muted', onWell: 'onSurface', a11ySuffix: '' },
    selected: { tone: 'primary', glyph: '●', glyphColor: 'primary', onWell: 'onPrimary', a11ySuffix: ', selected' },
    correct: { tone: 'success', glyph: '✓', glyphColor: 'success', onWell: 'onSuccess', a11ySuffix: ', correct answer' },
    incorrect: { tone: 'danger', glyph: '✕', glyphColor: 'danger', onWell: 'onDanger', a11ySuffix: ', incorrect answer' },
};
/**
 * QuizOption — **V4** "campus" design (native twin of the web V4). A single
 * selectable quiz answer rendered as an accessibility `radio` on an elevated
 * rounded surface. The lead marker sits in a tone-filled well and correct /
 * incorrect / selected states carry an explicit glyph (`✓` / `✕` / `●`) + spoken
 * suffix + a toned border, so they never rely on color alone. Token-only colors
 * via `useXenitionTheme()`.
 */
function QuizOptionV4({ label, marker, state = 'default', selected, disabled = false, onSelect, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const visual = STATE_VISUAL[state];
    const isSelected = selected ?? state === 'selected';
    const toneColor = visual.tone ? colors[visual.tone] : colors.border;
    const markerBg = visual.tone ? colors[visual.tone] : colors.border;
    const markerFg = visual.tone ? colors[visual.onWell] : colors.muted;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { checked: isSelected, disabled }, accessibilityLabel: `${marker ? `${marker}. ` : ''}${label}${visual.a11ySuffix}`, disabled: disabled || !onSelect, onPress: onSelect, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: 48,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderWidth: visual.tone ? 2 : 1,
                borderColor: toneColor,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.card,
                opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 1,
            },
            style,
        ], children: [marker ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: visual.tone ? markerBg : (0, color_1.withAlpha)(colors.onSurface, 0.06) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: markerFg, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: marker }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: label }), visual.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors[visual.glyphColor], fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: visual.glyph })) : null] }));
}
//# sourceMappingURL=QuizOptionV4.js.map