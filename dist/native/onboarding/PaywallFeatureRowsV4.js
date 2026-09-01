"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallFeatureRowsV4 = PaywallFeatureRowsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const flow_v4_1 = require("./internal/flow-v4");
const icon_names_1 = require("../../primitives/icon-names");
/**
 * Below this many rows the connecting rail is off by default: two badges
 * joined by a line read as a diagram of something, and there is nothing to
 * diagram. At three or more the rail is what makes the rows read as one list
 * rather than three fragments (spec §8).
 */
const RAIL_MIN_ROWS = 3;
/**
 * **V4 feature rows** — same props as {@link PaywallFeatureRows} plus `accent`
 * and `numbered`.
 *
 * The §8 anatomy, and the component the reference welcome-offer screen is
 * mostly made of: a circular tinted badge, a semibold title, a muted
 * description, and a hairline rail joining the badges into one list.
 *
 * ## Four changes
 *
 * 1. **The tint is mixed, not ramped.** The base read
 *    `tokens.ramps.primary[50]` behind a `scheme` branch — the ramps carry the
 *    light orientation in both schemes, so the branch existed to undo the
 *    wrong token. `flowGrounds()` mixes from resolved semantic colours and the
 *    branch goes away.
 * 2. **The rail joins badges, not rows.** It runs between the badge centres
 *    and stops at the last badge. The base drew it down the full height of the
 *    group, so it overshot past the final badge into the description below it.
 * 3. **`numbered`** — the same rows as an ordered list.
 * 4. **Descriptions take `mutedText`.** `muted` carries no contrast promise
 *    and this is the copy carrying the value proposition.
 *
 * **Renders nothing for an empty `rows`** (§4.5) — a heading with no list under
 * it is worse than no section.
 */
function PaywallFeatureRowsV4({ rows, heading, rail, dense = false, accent = 'primary', numbered = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const grounds = (0, flow_v4_1.flowGrounds)(theme, 'plain', accent);
    const { badge } = (0, flow_v4_1.flowMetrics)(theme, 0);
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0)
        return null;
    const gap = dense ? tokens.spacing.sm : tokens.spacing.md;
    const showRail = rail ?? list.length >= RAIL_MIN_ROWS;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [{ alignSelf: 'stretch', gap }, style], children: [heading ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "mutedText", children: heading })) : null, list.map((row, i) => {
                const last = i === list.length - 1;
                const glyph = row.icon;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: badge,
                                        height: badge,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: grounds.badge,
                                    }, children: numbered ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", numeric: "tabular", style: { color: grounds.ink }, children: i + 1 })) : glyph && (0, icon_names_1.isIconName)(glyph) ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: glyph, size: "lg", style: { color: grounds.ink } })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph ?? '✦', size: "lg", style: { color: grounds.ink } })) }), showRail && !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        flex: 1,
                                        width: 1,
                                        marginTop: tokens.spacing.xs,
                                        // Bridges the container's own row gap so the rail is
                                        // continuous, stopping `xs` short of the next badge.
                                        marginBottom: tokens.spacing.xs - gap,
                                        backgroundColor: colors.border,
                                    } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: row.description })) : null] })] }, row.id ?? row.title));
            })] }));
}
//# sourceMappingURL=PaywallFeatureRowsV4.js.map