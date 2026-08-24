"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestionV3 = QuizQuestionV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const MARKERS = 'ABCDEFGH';
const ROW_VISUAL = {
    default: { border: 'border', glyph: null, tint: 'muted', a11ySuffix: '' },
    selected: { border: 'primary', glyph: '●', tint: 'primary', a11ySuffix: ', selected' },
    correct: { border: 'success', glyph: '✓', tint: 'success', a11ySuffix: ', correct answer' },
    incorrect: { border: 'danger', glyph: '✕', tint: 'danger', a11ySuffix: ', incorrect answer' },
};
/**
 * QuizQuestion, design v3 — **full-width stacked rows with big letter badges**.
 * A pill counter and an oversized prompt sit on a chrome-less surface; each
 * choice is a wide filled row led by a large circular letter badge that flips
 * to a state glyph (`✓`/`✕`) in `review`, with the state also spoken — never
 * color alone. Empty state supported. Same props as {@link QuizQuestion}.
 * Token-only colors.
 */
function QuizQuestionV3({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const resolveState = (choice) => {
        const isSelected = choice.id === selectedId;
        if (review) {
            if (choice.correct)
                return 'correct';
            if (isSelected)
                return 'incorrect';
            return 'default';
        }
        return isSelected ? 'selected' : 'default';
    };
    const showCounter = questionNumber != null && totalQuestions != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: showCounter ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt, style: [{ gap: tokens.spacing.md, paddingVertical: tokens.spacing.md }, style], children: [showCounter ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'flex-start',
                    paddingVertical: 3,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: [questionNumber, " of ", totalQuestions] }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: prompt }), choices.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No choices available" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { gap: tokens.spacing.sm }, children: choices.map((choice, i) => {
                    const state = resolveState(choice);
                    const visual = ROW_VISUAL[state];
                    const isSelected = choice.id === selectedId;
                    const marker = MARKERS[i] ?? String(i + 1);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { checked: isSelected, disabled: review }, accessibilityLabel: `${marker}. ${choice.label}${visual.a11ySuffix}`, disabled: review || !onSelect, onPress: review ? undefined : () => onSelect?.(choice.id), style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.md,
                            paddingVertical: tokens.spacing.md,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: colors[visual.border],
                            backgroundColor: state === 'default' ? (0, color_1.withAlpha)(colors.onSurface, 0.03) : (0, color_1.withAlpha)(colors[visual.tint], 0.1),
                            opacity: review ? 0.95 : pressed ? 0.9 : 1,
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 44,
                                    height: 44,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, color_1.withAlpha)(colors[visual.tint], 0.16),
                                    borderWidth: 1.5,
                                    borderColor: colors[visual.border],
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }, children: visual.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors[visual.tint], fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: visual.glyph })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[visual.tint], fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: marker })) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: choice.label })] }, choice.id));
                }) })), hint ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: hint }) : null] }));
}
//# sourceMappingURL=QuizQuestionV3.js.map