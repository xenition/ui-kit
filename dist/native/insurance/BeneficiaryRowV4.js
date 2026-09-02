"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryRowV4 = BeneficiaryRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const coverage_v4_1 = require("../../insurance/coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Default copy for an out-of-balance set. */
function unbalancedLine(remainder, total) {
    const over = remainder > 0;
    return `Allocations total ${total}% — ${Math.abs(remainder)}% ${over ? 'over' : 'short'}`;
}
/**
 * **V4 beneficiary row** — same props as {@link BeneficiaryRow} plus
 * `allocationTotal` and `formatUnbalanced`.
 *
 * ## Five changes
 *
 * 1. **Three rows at 50% no longer render three confident figures.** Each row
 *    clamped its own percentage to 0–100 and knew nothing about the others, so
 *    a life policy split 50/50/50 drew three calm blue percentages adding to
 *    150% and nothing anywhere said so. Hand the row the set's
 *    `allocationTotal` and the imbalance is drawn *and* announced — the caller
 *    already summed the list to render it, so this costs them nothing.
 * 2. **The relationship reaches the reader.** The base's name was
 *    `"Ana Reyes, Primary beneficiary, 50%"` — the one fact that distinguishes
 *    a spouse from a child was drawn on screen and left out of the spoken
 *    string, and because the whole row is a flattened `Pressable` subtree there
 *    was no second stop to hear it from.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` is a dim, and
 *    0.38 is M3's *disabled* band — the base's pressed row read as an
 *    unavailable one.
 * 4. **Primary vs contingent is identity, not a tone.** It gets an ordered
 *    glyph and a word on a neutral chip. Nobody is in trouble for being a
 *    contingent beneficiary.
 * 5. **It is a row from the shared row family**, at the same height, with the
 *    same 44 leading slot, as `ClaimRowV4` and `PolicyDocumentRowV4`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function BeneficiaryRowV4({ name, relationship, allocationPct, kind = 'primary', avatarUrl, allocationTotal, formatUnbalanced = unbalancedLine, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const meta = tone_v4_1.BENEFICIARY_KIND_V4[kind] ?? tone_v4_1.BENEFICIARY_KIND_V4.primary;
    // The row's own share, clamped by the shared reader rather than inline —
    // `allocationParts` is written for a set, and one row is a set of one.
    const share = (0, coverage_v4_1.allocationParts)([allocationPct]).shares[0] ?? 0;
    const pct = `${share}%`;
    /*
      The set's verdict cannot come from `allocationParts` here: the row holds one
      share and the function reads a whole list. The caller has the list, sums it,
      and hands the answer down — which is also why `allocationTotal` is a number
      and not a boolean. Clamping it would destroy the signal (150 → 100 is
      exactly the bug), so it is compared as given.
    */
    const total = typeof allocationTotal === 'number' && Number.isFinite(allocationTotal)
        ? Math.round(allocationTotal)
        : null;
    const warning = total != null && total !== 100 ? formatUnbalanced(total - 100, total) : null;
    const spoken = (0, tone_v4_1.spokenLine)([name, relationship, meta.label, pct, warning]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "md" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, tone_v4_1.chipStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "onCard", children: meta.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onCard", children: meta.label })] }), relationship ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, style: { flexShrink: 1 }, children: relationship })) : null] }), warning ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numberOfLines: 2, style: { color: (0, tone_v4_1.toneInk)(theme, 'warn') }, children: warning })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTrailingStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: pct }) })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=BeneficiaryRowV4.js.map