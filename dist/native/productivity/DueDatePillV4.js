"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DueDatePillV4 = DueDatePillV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * Maps a due tone to its `[tint-source, legible-foreground]` semantic slots:
 * `overdue` escalates to danger, `today` warns, `upcoming` rests on a calm
 * primary wash. The tint slot is softened with `withAlpha`; urgency reads by
 * color *and* glyph, never color alone. No literals.
 */
const TONE = {
    overdue: ['danger', 'dangerText'],
    today: ['warn', 'warnText'],
    upcoming: ['primary', 'primaryText'],
};
const GLYPH = {
    overdue: '⚠',
    today: '●',
    upcoming: '🗓',
};
/**
 * DueDatePill — **V4** "flow" design. The focused-workspace take on a deadline:
 * a rounded **soft-tint** pill with a leading calendar/clock glyph and the date,
 * colored by urgency `tone`. Calm by default (a gentle primary wash), escalating
 * to danger/warn only when the date demands it — and always paired with a glyph
 * so urgency never rides on color alone. Same props/behavior as
 * {@link DueDatePillProps}; token-only colors via `useXenitionTheme()`.
 */
function DueDatePillV4({ label, tone = 'upcoming', glyph, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [tint, fg] = TONE[tone] ?? TONE.upcoming;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Due ${label}${tone === 'overdue' ? ', overdue' : ''}`, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: (0, color_1.withAlpha)(colors[tint], 0.12),
                borderRadius: tokens.radius.full,
                paddingVertical: 4,
                paddingHorizontal: tokens.spacing.sm + 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.sm }, children: glyph ?? GLYPH[tone] ?? GLYPH.upcoming }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label })] }));
}
//# sourceMappingURL=DueDatePillV4.js.map