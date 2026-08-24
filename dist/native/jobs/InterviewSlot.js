"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewSlot = InterviewSlot;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const format_1 = require("./format");
/** Mode → [glyph, label] — a non-color signal for the interview channel. */
const MODE = {
    onsite: ['📍', 'On-site'],
    video: ['🎥', 'Video'],
    phone: ['📞', 'Phone'],
};
/**
 * A selectable interview slot chip/card: date + time range, a mode marker
 * (on-site / video / phone — glyph + label, not color alone), and the
 * interviewer. Selected state is announced via `accessibilityState.selected` and
 * a token outline; disabled slots never fire `onSelect`. Tokens only.
 */
function InterviewSlot({ interview, selected = false, disabled = false, onSelect, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [glyph, modeLabel] = MODE[interview.mode] ?? MODE.video;
    const start = (0, format_1.formatTime)(interview.startsAt);
    const end = interview.endsAt ? (0, format_1.formatTime)(interview.endsAt) : '';
    const timeRange = end ? `${start} – ${end}` : start;
    const dateLabel = (0, format_1.formatShortDate)(interview.startsAt);
    const a11y = `${dateLabel} ${timeRange}, ${modeLabel}${interview.interviewer ? `, with ${interview.interviewer}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected, disabled }, disabled: disabled || !onSelect, onPress: onSelect ? () => onSelect(interview) : undefined, style: ({ pressed }) => [
            {
                gap: tokens.spacing.xs,
                backgroundColor: selected ? colors.primary : colors.surface,
                borderColor: selected ? colors.primary : colors.border,
                borderWidth: selected ? 2 : 1,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                opacity: disabled ? 0.5 : pressed && onSelect ? 0.9 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                            color: selected ? colors.onPrimary : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '600',
                        }, children: [dateLabel, '  ·  ', modeLabel] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: selected ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                }, children: timeRange }), interview.interviewer ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: selected ? colors.onPrimary : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                }, children: interview.interviewer })) : null] }));
}
//# sourceMappingURL=InterviewSlot.js.map