"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodPicker = MoodPicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const MOOD_META = {
    awful: { glyph: '😣', label: 'Awful', color: 'danger' },
    bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
    okay: { glyph: '😐', label: 'Okay', color: 'muted' },
    good: { glyph: '🙂', label: 'Good', color: 'primary' },
    great: { glyph: '😄', label: 'Great', color: 'success' },
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * A mood check-in: a row of emoji faces from awful to great. The selected face
 * gets a tinted ring in its mood color; the rest read muted. Each face is an
 * accessible button labelled with its mood. `onChange` fires with the tapped
 * mood. Token-only colors.
 */
function MoodPicker({ value, options = MOOD_ORDER, showLabels = true, onChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: [{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }, style], children: options.map((mood) => {
            const meta = MOOD_META[mood];
            const selected = value === mood;
            const face = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 48,
                            height: 48,
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: selected ? colors[meta.color] : colors.border,
                            backgroundColor: colors.surface,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: selected || value == null ? 1 : 0.5,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }) }), showLabels ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: selected ? colors[meta.color] : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: selected ? '700' : '400',
                        }, children: meta.label })) : null] }));
            if (!onChange) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: meta.label, children: face }, mood));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: meta.label, onPress: () => onChange(mood), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: face }, mood));
        }) }));
}
//# sourceMappingURL=MoodPicker.js.map