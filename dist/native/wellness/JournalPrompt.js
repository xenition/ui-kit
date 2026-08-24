"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalPrompt = JournalPrompt;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const JOURNAL_META = {
    reflection: { glyph: '🪞', label: 'Reflection', color: 'primary' },
    gratitude: { glyph: '🙏', label: 'Gratitude', color: 'success' },
    intention: { glyph: '🎯', label: 'Intention', color: 'accent' },
    growth: { glyph: '🌱', label: 'Growth', color: 'success' },
    emotion: { glyph: '💭', label: 'Emotion', color: 'primary' },
};
/**
 * A journaling prompt card: a category-tinted header, the prompt itself, an
 * optional saved-response preview, and a write / continue action with an
 * optional shuffle control for a fresh prompt. `answered` adds a "done" marker
 * and flips the CTA to continue (state via marker + label, not color alone).
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
function JournalPrompt({ prompt, category = 'reflection', response, answered = false, onWrite, onShuffle, writeLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
    const accent = colors[meta.color];
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
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: meta.label }), answered ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u2713 Done" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600' }, children: prompt }), response ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    borderLeftWidth: 3,
                    borderLeftColor: accent,
                    paddingLeft: tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }, children: response }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onWrite ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onWrite, children: cta }) })) : null, onShuffle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onPress: onShuffle, accessibilityLabel: "Shuffle prompt", children: "\uD83D\uDD00" })) : null] })] }));
}
//# sourceMappingURL=JournalPrompt.js.map