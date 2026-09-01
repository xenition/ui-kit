"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmTaskRowV4 = FarmTaskRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CheckboxV4_1 = require("../primitives/CheckboxV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const farm_v4_1 = require("./internal/farm-v4");
/** Priority → tone and default label. Genuinely a status, so the tones stay. */
const PRIORITY_META = {
    low: { label: 'Low', tone: 'neutral' },
    normal: { label: 'Normal', tone: 'primary' },
    high: { label: 'High', tone: 'warn' },
    urgent: { label: 'Urgent', tone: 'danger' },
};
/**
 * **V4 farm task row** — same props as {@link FarmTaskRow} plus
 * `priorityLabels` and `overdueLabel`.
 *
 * ## Five changes
 *
 * 1. **It is a row from the shared row line.** Height, padding, gap, press
 *    fill and separator inset now come from `dashboard/internal/row-v4`, which
 *    is the file that decides them for every row in the kit — so a task row and
 *    a notification row stop being two components that happen to look similar.
 * 2. **The checkbox is `CheckboxV4`**, so its hit area, its focus ring and its
 *    checked animation match every other checkbox in the product.
 * 3. **`overdue` reaches assistive tech.** The base painted the due date red
 *    and stopped — colour alone, which is exactly what §6 forbids.
 * 4. **A done task's title is struck through *and* dimmed**, rather than only
 *    dimmed, so "done" survives a greyscale screenshot.
 * 5. **Type comes from `TextV4`** and the caption takes `mutedText`.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function FarmTaskRowV4({ title, done = false, due, priority = 'normal', field, assignee, icon, overdue = false, priorityLabels, overdueLabel = 'overdue', onToggle, onPress, last = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const meta = PRIORITY_META[priority];
    const label = priorityLabels?.[priority] ?? meta.label;
    const caption = (0, farm_v4_1.metaLine)([due, field, assignee]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: Boolean(caption) }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            style,
        ], children: [onToggle ? ((0, jsx_runtime_1.jsx)(CheckboxV4_1.CheckboxV4, { checked: done, onCheckedChange: onToggle, accessibilityLabel: title })) : icon ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, style: {
                            // Struck AND dimmed: a strike survives greyscale, an opacity
                            // change on its own does not read as "done" to everyone.
                            textDecorationLine: done ? 'line-through' : 'none',
                            opacity: done ? theme.state.disabledContent : 1,
                        }, children: title }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", numberOfLines: 1, style: { color: overdue && !done ? colors.dangerText : colors.mutedText }, children: caption })) : null] }), overdue && !done ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "danger", variant: "soft", size: "sm", children: overdueLabel })) : ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label }))] }));
    if (!onPress)
        return content(false);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [title, caption, overdue ? overdueLabel : null, label]
            .filter(Boolean)
            .join(', '), accessibilityState: { checked: done }, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=FarmTaskRowV4.js.map