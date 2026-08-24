"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityTag = PriorityTag;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Maps a priority level to its `[background, foreground]` semantic slots. Per the
 * token contract: `urgent` → danger, `high` → warn; `med`/`low` de-escalate to
 * primary/neutral. Never a literal color.
 */
const LEVEL = {
    low: ['border', 'onSurface'],
    med: ['primary', 'onPrimary'],
    high: ['warn', 'onWarn'],
    urgent: ['danger', 'onDanger'],
};
const DEFAULT_LABEL = {
    low: 'Low',
    med: 'Medium',
    high: 'High',
    urgent: 'Urgent',
};
/**
 * Small priority pill — a token-bound background/foreground per level, with a
 * `dotOnly` mode that collapses to a colored dot for dense task rows. Every
 * color traces to a `SemanticColors` slot. No literal colors.
 */
function PriorityTag({ level, label, dotOnly = false, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const [bg, fg] = LEVEL[level] ?? LEVEL.low;
    const text = label ?? DEFAULT_LABEL[level] ?? 'Low';
    if (dotOnly) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `${text} priority`, style: [
                { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[bg] },
                style,
            ] }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${text} priority`, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors[bg],
                borderRadius: tokens.radius.sm,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[fg], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: text }) }));
}
//# sourceMappingURL=PriorityTag.js.map