"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatCardV4 = StatCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
/**
 * The kit has no `arrow-up` / `arrow-down` name — brief §6's open question 6
 * asked that the names be confirmed before agents started guessing, and the
 * confirmed set (`primitives/icon-names.ts`) has `chevron-up`, `chevron-down`
 * and `forward` and no arrows. So the direction mark is a chevron, from the
 * named set, rather than a `▲` typed into this file: brief §1 rule 2 retires
 * the literal `▲` / `▼` characters the base shipped, and inventing an icon
 * name that does not resolve is how those characters got there the first time.
 */
const TREND_ICON = {
    up: 'chevron-up',
    down: 'chevron-down',
    flat: 'forward',
};
/**
 * Trend → ink.
 *
 * The contrast-corrected `*Text` slots, never the fills. `success` is what a
 * filled chip is painted with and the compiler makes no promise about it as
 * ink on a card; `successText` is exactly that promise. Identical to the
 * mapping `StatisticV4` already uses, because there must not be two numeric
 * treatments in one kit.
 */
const TREND_TONE = {
    up: 'successText',
    down: 'dangerText',
    flat: 'mutedText',
};
/**
 * **V4 stat card** — the on-page KPI card, and where brief §3's decision lands.
 *
 * The base is a bordered box the same colour as the page with a `2xl` number in
 * it. §3 names that for what it is — a spreadsheet cell — and describes what
 * this product's stat actually is: a white card floating on the warm ground,
 * generous, one loud thing in it. Five changes, in the order they matter.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** This is the single
 *    most visible change in the whole dashboard pass. `card` was split out in
 *    the shadcn pass precisely so a raised surface reads as raised in *both*
 *    schemes, and this module never adopted it — every card in it paints the
 *    same colour as the page it sits on, which is why the border was doing all
 *    the work. `CardV4` supplies the recipe (radius, hairline,
 *    `elevation.card`, and the shadow that gets *more* opacity in dark); the
 *    one thing overridden on top of it is the fill.
 * 2. **The value is the loudest thing on the block.** `3xl`, bold, on the
 *    display face, in tabular figures — the treatment `StatisticV4` already
 *    typesets a hero number with, reused rather than re-invented. `2xl` ties
 *    the page title, and a KPI that ties the page title has no hierarchy.
 * 3. **The label is above the value, small and calm.** `sm` / `mutedText` —
 *    `mutedText`, never the `muted` *fill*, which the base used as a text
 *    colour and which carries no contrast promise as ink. HIG's charting
 *    guidance is the argument for the order: a short descriptive headline
 *    first, so the number underneath is graspable at a glance.
 * 4. **The delta is not colour alone.** Green and red are the whole signal in
 *    the base, which fails for the ~8% of men who cannot separate them. V4
 *    pairs the `successText` / `dangerText` ink with a real direction glyph
 *    from the named icon set. The sign is already in the delta *string*
 *    ("+12%"), so the spoken label carries the direction without this file
 *    inventing an English word for a screen reader to read.
 * 5. **The icon became a badge.** It floated at the trailing edge of the
 *    label row in the base, competing with it; §3 and §4.7 put a categorical
 *    glyph in a soft tinted 44 circle at the top of the block.
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5 — a V4 composite composes V4
 * children). Renders **nothing** when it has neither a label nor a value:
 * brief §4.5, a component with nothing to show is never a blank bordered box.
 */
function StatCardV4({ label, value, delta, trend, icon, iconName, tone = 'primary', caption, raised = true, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Only a string or a number has a reading; a caller's node stringifies to
    // "[object Object]", which is what the base put in its accessibility label.
    const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    const hasValue = value !== undefined && value !== null && value !== '';
    const hasLabel = label !== undefined && label !== null && label !== '';
    // Nothing to say, so nothing is drawn (§4.5). A stat card with no label and
    // no value is a blank bordered box, which is the one outcome that section
    // rules out.
    if (!hasLabel && !hasValue)
        return null;
    const resolvedTrend = trend ?? 'flat';
    const slot = (0, nav_v4_1.minTap)(tokens.spacing);
    const badge = iconName !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: iconName, badge: "soft", color: tone })) : icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: slot, height: slot, alignItems: 'center', justifyContent: 'center' }, children: icon })) : null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { accessibilityLabel: `${String(label ?? '')}${valueText ? `: ${valueText}` : ''}${delta ? `, ${delta}` : ''}`, variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "lg", style: [
            {
                // §4.2's headline fix. Everything else in the recipe — the radius,
                // the hairline, the elevation — is `CardV4`'s; only the fill is
                // stated here, because `CardV4` still paints the page colour.
                backgroundColor: colors.card,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [badge, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [hasLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: label })) : null, hasValue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onCard", numeric: "tabular", children: value })) : null, delta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: TREND_ICON[resolvedTrend], size: "xs", color: TREND_TONE[resolvedTrend] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: TREND_TONE[resolvedTrend], numeric: "tabular", children: delta })] })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption })) : null] })] }));
}
//# sourceMappingURL=StatCardV4.js.map