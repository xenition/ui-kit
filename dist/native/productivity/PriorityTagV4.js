"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityTagV4 = PriorityTagV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * Per level, its `[fill slot, text slot, glyph]`. Per the token contract,
 * priority is carried by color **and** a leading glyph — never color alone:
 * `urgent` → danger, `high` → warn, `med` → primary, `low` → neutral/muted.
 * The fill is used as a soft tint via `withAlpha`; the text is a
 * contrast-safe `*Text` slot. Never a literal color.
 */
const LEVEL = {
    low: { fill: 'border', text: 'mutedText', glyph: '▾' },
    med: { fill: 'primary', text: 'primaryText', glyph: '◆' },
    high: { fill: 'warn', text: 'warnText', glyph: '▲' },
    urgent: { fill: 'danger', text: 'dangerText', glyph: '⚑' },
};
const DEFAULT_LABEL = {
    low: 'Low',
    med: 'Medium',
    high: 'High',
    urgent: 'Urgent',
};
/**
 * PriorityTag — **V4** "flow" design. The focused-workspace take on a priority
 * chip: a **soft-tint pill** colored by level with a leading glyph so urgency
 * reads by shape as well as color, keeping the base levels and the `dotOnly`
 * dense mode. Same props/behavior as {@link PriorityTagProps}; token-only colors
 * via `useXenitionTheme()` + `withAlpha`.
 */
function PriorityTagV4({ level, label, dotOnly = false, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { fill, text: textSlot, glyph } = LEVEL[level] ?? LEVEL.low;
    const text = label ?? DEFAULT_LABEL[level] ?? 'Low';
    if (dotOnly) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `${text} priority`, style: [
                { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[fill] },
                style,
            ] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${text} priority`, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: (0, color_1.withAlpha)(colors[fill], 0.16),
                borderRadius: tokens.radius.full,
                paddingVertical: 3,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[textSlot], fontSize: tokens.typography.scale.xs }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[textSlot], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: text })] }));
}
//# sourceMappingURL=PriorityTagV4.js.map