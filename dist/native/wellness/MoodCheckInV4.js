"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodCheckInV4 = MoodCheckInV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
const MOOD_META = {
    awful: { glyph: '😣', label: 'Awful', color: 'danger' },
    bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
    okay: { glyph: '😐', label: 'Okay', color: 'muted' },
    good: { glyph: '🙂', label: 'Good', color: 'primary' },
    great: { glyph: '😄', label: 'Great', color: 'success' },
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * MoodCheckInV4 — the calm redesign of {@link MoodCheckIn}. Same props, defaults,
 * labels, radiogroup a11y, note field, and disabled-until-selected submit. Only
 * the visuals change: a clean surface card where the *selected* face sits on a
 * small gradient circle (the one calm accent), the others staying soft neutral.
 */
function MoodCheckInV4({ prompt = 'How are you feeling?', value, options, showNote = false, note = '', notePlaceholder = 'Add a note (optional)', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
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
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: meta.label, onPress: () => onChange?.(mood), style: ({ pressed }) => ({ flex: 1, alignItems: 'center', opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [selected ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                                        width: 48,
                                        height: 48,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 48,
                                        height: 48,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: (0, color_1.withAlpha)(colors.border, 0.4),
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: value == null ? 1 : 0.5,
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }) })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: selected ? colors.primary : colors.muted,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: selected ? '700' : '400',
                                    }, children: meta.label })] }) }, mood));
                }) }), showNote ? ((0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 3, value: note, onChangeText: onNoteChange, placeholder: notePlaceholder, accessibilityLabel: "Mood note" })) : null, onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: value == null, onPress: () => {
                    if (value != null)
                        onSubmit({ mood: value, note: showNote ? note : undefined });
                }, children: submitLabel })) : null] }));
}
//# sourceMappingURL=MoodCheckInV4.js.map