"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestionV2 = QuizQuestionV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const MARKERS = 'ABCDEFGH';
const CELL_VISUAL = {
    default: { border: 'border', glyph: null, tint: 'muted', a11ySuffix: '' },
    selected: { border: 'primary', glyph: '●', tint: 'primary', a11ySuffix: ', selected' },
    correct: { border: 'success', glyph: '✓', tint: 'success', a11ySuffix: ', correct answer' },
    incorrect: { border: 'danger', glyph: '✕', tint: 'danger', a11ySuffix: ', incorrect answer' },
};
/**
 * QuizQuestion, design v2 — a **two-column grid of answer cards**. A progress
 * bar replaces the eyebrow, then each choice is a tall radio card carrying its
 * letter badge and, in `review`, a state glyph (`✓`/`✕`) plus a spoken suffix —
 * never color alone. Renders an empty note when there are no choices. Same props
 * as {@link QuizQuestion}. Token-only colors.
 */
function QuizQuestionV2({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, style, }) {
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
    const showProgress = questionNumber != null && totalQuestions != null && totalQuestions > 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: showProgress ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt, style: [
            {
                gap: tokens.spacing.md,
                padding: tokens.spacing.lg,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
            },
            style,
        ], children: [showProgress ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: [questionNumber, " / ", totalQuestions] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: questionNumber ?? 0, max: totalQuestions ?? 1, tone: "primary", size: "sm" })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: prompt }), choices.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No choices available" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: choices.map((choice, i) => {
                    const state = resolveState(choice);
                    const visual = CELL_VISUAL[state];
                    const isSelected = choice.id === selectedId;
                    const marker = MARKERS[i] ?? String(i + 1);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { checked: isSelected, disabled: review }, accessibilityLabel: `${marker}. ${choice.label}${visual.a11ySuffix}`, disabled: review || !onSelect, onPress: review ? undefined : () => onSelect?.(choice.id), style: ({ pressed }) => ({
                            flexGrow: 1,
                            flexBasis: '46%',
                            minHeight: 84,
                            gap: tokens.spacing.sm,
                            padding: tokens.spacing.md,
                            borderWidth: 1.5,
                            borderColor: colors[visual.border],
                            borderRadius: tokens.radius.md,
                            backgroundColor: state === 'default' ? colors.surface : (0, color_1.withAlpha)(colors[visual.tint], 0.08),
                            opacity: review ? 0.95 : pressed ? 0.9 : 1,
                        }), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: 26,
                                            height: 26,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: (0, color_1.withAlpha)(colors[visual.tint], 0.16),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[visual.tint], fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: marker }) }), visual.glyph ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors[visual.tint], fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: visual.glyph })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: choice.label })] }, choice.id));
                }) })), hint ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: hint }) : null] }));
}
//# sourceMappingURL=QuizQuestionV2.js.map