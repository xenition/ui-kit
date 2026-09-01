"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvestLogV4 = HarvestLogV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const EmptyStateV4_1 = require("../commerce/EmptyStateV4");
const farm_v4_1 = require("./internal/farm-v4");
/**
 * **V4 harvest log** — same props as {@link HarvestLog} plus `totalLabel` and
 * `formatRemaining`.
 *
 * ## Four changes
 *
 * 1. **The total is labelled.** The base rendered it as a bare figure in the
 *    header, so the most important number on the card had nothing saying what
 *    it counted.
 * 2. **Quantities are tabular and right-aligned in a fixed column**, which is
 *    the only way a log of harvests reads as a column rather than as ragged
 *    text — with proportional figures `40` and `1,180` have no shared edge.
 * 3. **The empty state is `EmptyStateV4`**, the same one the commerce line
 *    uses, rather than the base line's.
 * 4. **Type comes from `TextV4`** — the base hand-wrote `color`, `fontSize`,
 *    `fontWeight` and `fontFamily` on raw `<Text>` seven times in one file —
 *    and every caption moves to `mutedText`.
 *
 * A `maxRows` cap still truncates the list and says how many were hidden.
 */
function HarvestLogV4({ entries, title = 'Harvest log', total, totalLabel = 'Total', maxRows, emptyTitle = 'No harvests logged', emptyDescription = 'Recorded harvests will appear here.', formatRemaining, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(entries) ? entries : [];
    const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
    const remaining = list.length - visible.length;
    const more = formatRemaining ?? ((n) => `+${n} more`);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83E\uDDFA", size: "base" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", style: { flex: 1 }, children: title }), total != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: totalLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: total })] })) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDF3E", size: "2xl", color: "mutedText" }), title: emptyTitle, description: emptyDescription })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [visible.map((entry, i) => {
                        const last = i === visible.length - 1 && remaining <= 0;
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, farm_v4_1.metaLine)([
                                entry.crop,
                                `${entry.quantity}${entry.unit ? ` ${entry.unit}` : ''}`,
                                entry.grade,
                                entry.field,
                                entry.date,
                            ]), style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.sm,
                                borderBottomWidth: last ? 0 : 1,
                                borderBottomColor: colors.border,
                            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, children: entry.crop }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: (0, farm_v4_1.metaLine)([entry.field, entry.date]) })] }), entry.grade != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "outline", size: "sm", children: entry.grade })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "sm", weight: "bold", tone: "onCard", numeric: "tabular", children: String(entry.quantity) }), entry.unit != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: entry.unit })) : null] })] }, entry.id ?? `harvest-${i}`));
                    }), remaining > 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: { marginTop: tokens.spacing.xs }, children: more(remaining) })) : null] }))] }));
}
//# sourceMappingURL=HarvestLogV4.js.map