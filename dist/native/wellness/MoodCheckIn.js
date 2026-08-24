"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodCheckIn = MoodCheckIn;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const MOOD_META = {
    awful: { glyph: '😣', label: 'Awful', color: 'danger' },
    bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
    okay: { glyph: '😐', label: 'Okay', color: 'muted' },
    good: { glyph: '🙂', label: 'Good', color: 'primary' },
    great: { glyph: '😄', label: 'Great', color: 'success' },
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * A daily mood check-in: a prompt, a row of tappable emoji faces from awful to
 * great, an optional note field, and a submit action. The selected face keeps a
 * tinted ring in its mood color and is announced as selected (state, not color
 * alone); submit is disabled until a mood is chosen. `onSubmit` returns the
 * mood plus the note. Token-only colors (semantic slots + a `withAlpha` tint).
 */
function MoodCheckIn({ prompt = 'How are you feeling?', value, options, showNote = false, note = '', notePlaceholder = 'Add a note (optional)', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const moods = options && options.length > 0 ? options : MOOD_ORDER;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: prompt }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: moods.map((mood) => {
                    const meta = MOOD_META[mood] ?? MOOD_META.okay;
                    const selected = value === mood;
                    const tint = colors[meta.color];
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: meta.label, onPress: () => onChange?.(mood), style: ({ pressed }) => ({ flex: 1, alignItems: 'center', opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 48,
                                        height: 48,
                                        borderRadius: tokens.radius.full,
                                        borderWidth: 2,
                                        borderColor: selected ? tint : colors.border,
                                        backgroundColor: selected ? (0, color_1.withAlpha)(tint, 0.16) : colors.surface,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: selected || value == null ? 1 : 0.5,
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: selected ? tint : colors.muted,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: selected ? '700' : '400',
                                    }, children: meta.label })] }) }, mood));
                }) }), showNote ? ((0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 3, value: note, onChangeText: onNoteChange, placeholder: notePlaceholder, accessibilityLabel: "Mood note" })) : null, onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: value == null, onPress: () => {
                    if (value != null)
                        onSubmit({ mood: value, note: showNote ? note : undefined });
                }, children: submitLabel })) : null] }));
}
//# sourceMappingURL=MoodCheckIn.js.map