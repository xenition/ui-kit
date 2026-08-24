"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestion = QuizQuestion;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const QuizOption_1 = require("./QuizOption");
const MARKERS = 'ABCDEFGH';
/**
 * A quiz question block: a "Question X of Y" eyebrow, the prompt, and a
 * `radiogroup` of {@link QuizOption}s. In `review` mode each option resolves to
 * a correct / incorrect / selected state (with glyphs, not color alone). Renders
 * an empty-state note when there are no choices. Token-only colors.
 */
function QuizQuestion({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, style, }) {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: questionNumber != null && totalQuestions != null
            ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}`
            : prompt, style: [
            {
                gap: tokens.spacing.md,
                padding: tokens.spacing.lg,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
            },
            style,
        ], children: [questionNumber != null && totalQuestions != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: ["Question ", questionNumber, " of ", totalQuestions] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: prompt }), choices.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No choices available" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { gap: tokens.spacing.sm }, children: choices.map((choice, i) => ((0, jsx_runtime_1.jsx)(QuizOption_1.QuizOption, { label: choice.label, marker: MARKERS[i] ?? String(i + 1), state: resolveState(choice), selected: choice.id === selectedId, disabled: review, onSelect: review ? undefined : () => onSelect?.(choice.id) }, choice.id))) })), hint ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: hint })) : null] }));
}
//# sourceMappingURL=QuizQuestion.js.map