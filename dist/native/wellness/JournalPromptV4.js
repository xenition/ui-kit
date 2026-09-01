"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalPromptV4 = JournalPromptV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
const JOURNAL_META = {
    reflection: { glyph: '🪞', label: 'Reflection' },
    gratitude: { glyph: '🙏', label: 'Gratitude' },
    intention: { glyph: '🎯', label: 'Intention' },
    growth: { glyph: '🌱', label: 'Growth' },
    emotion: { glyph: '💭', label: 'Emotion' },
};
/**
 * JournalPromptV4 — the calm redesign of {@link JournalPrompt}. Same props,
 * defaults, labels, answered affordance, and write/shuffle controls. Only the
 * visuals change: a clean surface card with a small gradient category badge as
 * the single calm accent; the prompt, response preview, and controls stay calm.
 */
function JournalPromptV4({ prompt, category = 'reflection', response, answered = false, onWrite, onShuffle, writeLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
    const cta = writeLabel ?? (answered ? 'Continue' : 'Write');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} prompt${answered ? ', answered' : ''}: ${prompt}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg, color: (0, calm_1.calmInk)(r) }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            flex: 1,
                            color: colors.primary,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '700',
                            textTransform: 'uppercase',
                        }, children: meta.label }), answered ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713 Done" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600' }, children: prompt }), response ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderLeftWidth: 3,
                    borderLeftColor: colors.primary,
                    paddingLeft: tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }, children: response }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onWrite ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onWrite, children: cta }) })) : null, onShuffle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onPress: onShuffle, accessibilityLabel: "Shuffle prompt", children: "\uD83D\uDD00" })) : null] })] }));
}
//# sourceMappingURL=JournalPromptV4.js.map