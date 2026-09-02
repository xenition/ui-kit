"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizQuestionV4 = QuizQuestionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const QuizOptionV4_1 = require("./QuizOptionV4");
const MARKERS = 'ABCDEFGH';
/**
 * QuizQuestion — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded card with a soft shadow holding a "Question X of Y" pill, the prompt,
 * and a `radiogroup` of {@link QuizOptionV4}s. In `review` mode each option
 * resolves to a correct / incorrect / selected state (glyph + border, never color
 * alone). Renders an empty-state note when there are no choices. Token-only
 * colors via `useXenitionTheme()`.
 */
function QuizQuestionV4({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const numbered = questionNumber != null && totalQuestions != null;
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
    const shell = {
        gap: tokens.spacing.md,
        padding: tokens.spacing.lg,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt, style: [shell, style], children: [numbered ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', fontVariant: ['tabular-nums'] }, children: ["Question ", questionNumber, " of ", totalQuestions] }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: prompt }), choices.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No choices available" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", style: { gap: tokens.spacing.sm }, children: choices.map((choice, i) => ((0, jsx_runtime_1.jsx)(QuizOptionV4_1.QuizOptionV4, { label: choice.label, marker: MARKERS[i] ?? String(i + 1), state: resolveState(choice), selected: choice.id === selectedId, disabled: review, onSelect: review ? undefined : () => onSelect?.(choice.id) }, choice.id))) })), hint ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: hint }) : null] }));
}
//# sourceMappingURL=QuizQuestionV4.js.map