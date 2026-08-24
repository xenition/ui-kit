"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueDatePill = DueDatePill;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Maps a due tone to its `[background, foreground]` semantic slots: `overdue`
 * escalates to danger, `today` to warn, `upcoming` stays neutral. No literals.
 */
const TONE = {
    overdue: ['danger', 'onDanger'],
    today: ['warn', 'onWarn'],
    upcoming: ['border', 'onSurface'],
};
const GLYPH = {
    overdue: '⚠',
    today: '●',
    upcoming: '🗓',
};
/**
 * Compact due-date pill — a token-bound background/foreground keyed off the
 * urgency `tone`, with a leading glyph. For deadlines on task rows and cards.
 * Every color traces to a `SemanticColors` slot. No literal colors.
 */
function DueDatePill({ label, tone = 'upcoming', glyph, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [bg, fg] = TONE[tone] ?? TONE.upcoming;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Due ${label}${tone === 'overdue' ? ', overdue' : ''}`, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors[bg],
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs }, children: glyph ?? GLYPH[tone] ?? GLYPH.upcoming }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: label })] }));
}
//# sourceMappingURL=DueDatePill.js.map