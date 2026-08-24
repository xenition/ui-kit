"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodCheckInV2 = MoodCheckInV2;
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
 * MoodCheckIn — **big face** design (v2). The chosen mood blooms as one large
 * emoji face inside a tinted circle with its label underneath; a compact
 * `radiogroup` of small faces sits below to change the selection. Optional note
 * and submit follow. Selection is announced as a radio state (not color alone)
 * and submit is disabled until a mood is picked. Same props as
 * {@link MoodCheckInProps}; token-only colors.
 */
function MoodCheckInV2({ prompt = 'How are you feeling?', value, options, showNote = false, note = '', notePlaceholder = 'Add a note (optional)', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const moods = options && options.length > 0 ? options : MOOD_ORDER;
    const selectedMeta = value != null ? MOOD_META[value] ?? MOOD_META.okay : null;
    const selectedTint = selectedMeta ? colors[selectedMeta.color] : colors.muted;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                alignItems: 'center',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }, children: prompt }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 104,
                    height: 104,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: selectedMeta ? selectedTint : colors.border,
                    backgroundColor: selectedMeta ? (0, color_1.withAlpha)(selectedTint, 0.14) : (0, color_1.withAlpha)(colors.muted, 0.08),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: selectedMeta ? selectedMeta.glyph : '🫧' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: selectedMeta ? selectedTint : colors.muted,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '800',
                }, children: selectedMeta ? selectedMeta.label : 'Tap a face' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { flexDirection: 'row', justifyContent: 'center', gap: tokens.spacing.sm, alignSelf: 'stretch' }, children: moods.map((mood) => {
                    const meta = MOOD_META[mood] ?? MOOD_META.okay;
                    const selected = value === mood;
                    const tint = colors[meta.color];
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: meta.label, onPress: () => onChange?.(mood), style: ({ pressed }) => ({
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            borderWidth: selected ? 2 : 1,
                            borderColor: selected ? tint : colors.border,
                            backgroundColor: selected ? (0, color_1.withAlpha)(tint, 0.16) : colors.surface,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.7 : selected || value == null ? 1 : 0.55,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }) }, mood));
                }) }), showNote ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 3, value: note, onChangeText: onNoteChange, placeholder: notePlaceholder, accessibilityLabel: "Mood note" }) })) : null, onSubmit ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'stretch' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: value == null, onPress: () => {
                        if (value != null)
                            onSubmit({ mood: value, note: showNote ? note : undefined });
                    }, children: submitLabel }) })) : null] }));
}
//# sourceMappingURL=MoodCheckInV2.js.map