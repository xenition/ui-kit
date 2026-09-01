"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallFeatureRowsV3 = PaywallFeatureRowsV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Feature rows — V3, the compact line: **a checklist**. One `✓` per row in the
 * success tone, the title inline beside it, and the description folded onto
 * the same block at caption size.
 *
 * Where it earns its place: the confirmation half of a flow — a plan card with
 * "what's included" under it, a sheet, the second half of a screen whose hero
 * already spent the vertical budget. Six benefits as §8 rows is a scroll; six
 * as a checklist is a paragraph.
 *
 * `rail` is accepted and ignored — a rail is what makes badges read as one
 * list, and a checklist already reads as one. The row's glyph is ignored too:
 * a checklist's mark is the check, and letting each row bring its own turns
 * the column of ticks back into the icon list this line exists to compress.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
function PaywallFeatureRowsV3({ rows, heading, dense = false, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0)
        return null;
    const gap = dense ? tokens.spacing.xs : tokens.spacing.sm;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [{ alignSelf: 'stretch', gap }, style], children: [heading ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "mutedText", children: heading })) : null, list.map((row) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: "check", size: "base", color: "successText" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "base", weight: "semibold", tone: "onSurface", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "xs", tone: "mutedText", children: row.description })) : null] })] }, row.id ?? row.title)))] }));
}
//# sourceMappingURL=PaywallFeatureRowsV3.js.map