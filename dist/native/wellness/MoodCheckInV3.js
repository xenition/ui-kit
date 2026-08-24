"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodCheckInV3 = MoodCheckInV3;
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
 * MoodCheckIn — **compact face row** design (v3). A tight single line: the prompt
 * on the left and a snug `radiogroup` of small emoji faces on the right, the
 * chosen face lit as a tinted pill with its label revealed inline. Optional note
 * and submit follow underneath. Selection is announced as a radio state (not
 * color alone) and submit is disabled until a mood is picked. Same props as
 * {@link MoodCheckInProps}; token-only colors.
 */
function MoodCheckInV3({ prompt = 'How are you feeling?', value, options, showNote = false, note = '', notePlaceholder = 'Add a note (optional)', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const moods = options && options.length > 0 ? options : MOOD_ORDER;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', flexShrink: 1 }, children: prompt }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginLeft: 'auto' }, children: moods.map((mood) => {
                            const meta = MOOD_META[mood] ?? MOOD_META.okay;
                            const selected = value === mood;
                            const tint = colors[meta.color];
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: meta.label, onPress: () => onChange?.(mood), style: ({ pressed }) => ({
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: selected ? 4 : 0,
                                    height: 34,
                                    paddingHorizontal: selected ? tokens.spacing.sm : 6,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: selected ? (0, color_1.withAlpha)(tint, 0.16) : 'transparent',
                                    opacity: pressed ? 0.7 : selected || value == null ? 1 : 0.55,
                                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: meta.glyph }), selected ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tint, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: meta.label })) : null] }, mood));
                        }) })] }), showNote ? ((0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 2, value: note, onChangeText: onNoteChange, placeholder: notePlaceholder, accessibilityLabel: "Mood note" })) : null, onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", disabled: value == null, onPress: () => {
                    if (value != null)
                        onSubmit({ mood: value, note: showNote ? note : undefined });
                }, children: submitLabel })) : null] }));
}
//# sourceMappingURL=MoodCheckInV3.js.map