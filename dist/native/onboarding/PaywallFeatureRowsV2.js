"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallFeatureRowsV2 = PaywallFeatureRowsV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const icon_names_1 = require("../../primitives/icon-names");
/** §10.1 geometry: the glyph plate on a tile, larger than the base's 44 badge. */
const PLATE = 56;
/**
 * Feature rows — V2, the editorial line: **tiles, not a list**. Each benefit
 * gets its own card with a large glyph plate above the copy, and the cards
 * stack full-width.
 *
 * The idea: a list says "here are four facts"; tiles say "here are four
 * things". On the screen where the value proposition IS the product — a
 * welcome-offer, a first paywall — the extra weight per row is the point, and
 * a rail joining four cards would fight the separation the cards already have.
 *
 * `rail` is therefore accepted and ignored: cards are separated objects, and
 * a line drawn between them is a diagram of a list they are deliberately not.
 * `dense` still tightens the stack for a longer set.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
function PaywallFeatureRowsV2({ rows, heading, dense = false, style, }) {
    const { colors, tokens, scheme } = (0, theme_1.useXenitionTheme)();
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0)
        return null;
    // The ramps carry the light orientation in both schemes, so the dark end of
    // the same ramp is what a dark page needs — see the note in `PaywallScreen`.
    const plateGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
    const gap = dense ? tokens.spacing.sm : tokens.spacing.md;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [{ alignSelf: 'stretch', gap }, style], children: [heading ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", weight: "semibold", tone: "mutedText", children: heading })) : null, list.map((row) => {
                const glyph = row.icon;
                return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: PLATE,
                                height: PLATE,
                                borderRadius: tokens.radius.lg,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: plateGround,
                            }, children: glyph && (0, icon_names_1.isIconName)(glyph) ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { name: glyph, size: "2xl", color: "primaryText" })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph ?? '✦', size: "2xl", color: "primaryText" })) }), (0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "lg", weight: "bold", tone: "onSurface", children: row.title }), row.description ? ((0, jsx_runtime_1.jsx)(primitives_1.Text, { size: "sm", tone: "mutedText", children: row.description })) : null] }, row.id ?? row.title));
            })] }));
}
//# sourceMappingURL=PaywallFeatureRowsV2.js.map