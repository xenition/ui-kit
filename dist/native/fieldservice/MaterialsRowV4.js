"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsRowV4 = MaterialsRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const money_1 = require("../../commerce/money");
const job_v4_1 = require("./internal/job-v4");
const STOCK_META = {
    'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
    low: { label: 'Low', glyph: '▲', tone: 'warn' },
    'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};
/**
 * **V4 materials row** — same props as {@link MaterialsRow} plus `glyph` and
 * `stockLabels`.
 *
 * ## Four changes
 *
 * 1. **The stock state is announced.** The row's name was
 *    `"${name}, ${qty} ${unit}, ${total}"`, which replaces the subtree — and
 *    on a parts list "back-ordered" is the single field that changes what the
 *    technician does next. It was the one field the label left out.
 * 2. **It takes a `glyph`**, like every sibling row in the module; the box
 *    emoji was hard-coded, and its disc was labelled "Material", which made a
 *    decorative mark a reader stop.
 * 3. **The row is a row from the shared row line**, clearing 44, with a press
 *    that is a state layer instead of `opacity: 0.7`.
 * 4. **The money column is tabular**, so a parts list's totals line up
 *    digit-for-digit down the page instead of drifting.
 *
 * **Renders nothing without a `name`.**
 */
function MaterialsRowV4({ name, sku, quantity, unit = 'ea', unitCents, stock, currency = 'USD', formatMoney = money_1.formatMoney, glyph = '📦', stockLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const meta = stock ? STOCK_META[stock] : undefined;
    const stockWord = stock ? (stockLabels?.[stock] ?? meta?.label) : undefined;
    const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
    const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
    const totalCents = Math.round(qty * unitSafe);
    const total = formatMoney(totalCents, currency);
    const breakdown = `${qty} ${unit} × ${formatMoney(unitSafe, currency)}`;
    const caption = (0, tone_v4_1.metaLine)([breakdown, sku]);
    const spoken = (0, job_v4_1.spokenLine)([name, breakdown, sku, total, stockWord]);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    { borderRadius: tokens.radius.md, backgroundColor: (0, job_v4_1.discGround)(theme, 'primary') },
                ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: name }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, numeric: "tabular", children: caption })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, row_v4_1.rowTrailingStyle)(theme), { flexDirection: 'column', alignItems: 'flex-end' }], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: total }), meta && stockWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...job_v4_1.BADGE_V4, children: `${meta.glyph} ${stockWord}` })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: [(0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }), style], children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: [{ borderRadius: tokens.radius.md }, style], children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                (0, row_v4_1.rowContainerStyle)(theme, { twoLine: true }),
                { borderRadius: tokens.radius.md, backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            ], children: content })) }));
}
//# sourceMappingURL=MaterialsRowV4.js.map