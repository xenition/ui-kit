"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceHeaderV4 = BalanceHeaderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
const SparklineV4_1 = require("../charts/SparklineV4");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
/** The words the change is announced with — the arrow's shape said in speech. */
const CHANGE_WORDS = { credit: 'up', debit: 'down' };
/** The placeholder's width, in `xl` steps, where the base wrote `width: 160`. */
const PLACEHOLDER_STEPS = 5;
/**
 * **V4 balance header** — same props as {@link BalanceHeader} plus `locale`
 * and `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The sparkline is toned from the series it draws.** Its colour came from
 *    `changeCents`, which is optional — so a header given only a `trend` fell
 *    to the `up` branch and drew a *collapsing* balance in `success`. The line
 *    now reads its own first and last datum, and a flat series takes no status
 *    hue at all, because flat is not good news either.
 * 2. **A zero change is not a green gain.** `>= 0` painted "+$0.00" in
 *    `success` with an up arrow. `signParts()` gives zero its own branch.
 * 3. **The percentage goes through `Intl`.** It was built by string
 *    concatenation — unrounded and unclamped, so `12.3456789` printed in full,
 *    and its decimal mark was hard-locked to `.` while the amount beside it
 *    was localised.
 * 4. **The placeholder is the shared skeleton**, an opaque state mix, not
 *    `colors.border` — the hairline colour, which is a different thing on
 *    every ground and reads as a rule rather than as content arriving. The
 *    loading region is announced once, with wording the caller owns.
 * 5. **The block is one summary** carrying the label, the balance and the
 *    change, and the captions take `mutedText` rather than the promise-free
 *    `colors.muted`.
 */
function BalanceHeaderV4({ label = 'Total balance', balanceCents, currency = 'USD', changeCents, changePct, trend, formatMoney: format = money_1.formatMoney, loading = false, locale, loadingLabel = 'Loading balance', appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const enter = (0, motion_1.useEnter)();
    const balance = format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency);
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const change = (0, ledger_v4_1.signParts)(changeCents ?? 0, undefined, CHANGE_WORDS);
    const changeText = hasChange
        ? `${format(Math.abs(Math.trunc(changeCents)), currency)}${typeof changePct === 'number' ? ` (${(0, ledger_v4_1.pctText)(changePct, locale)}%)` : ''}`
        : null;
    // Zero has no arrow: an arrow is a direction, and there is no direction.
    const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';
    // The line's tone comes from the series, not from an optional sibling prop.
    const first = trend?.[0];
    const last = trend != null && trend.length > 0 ? trend[trend.length - 1] : undefined;
    const trendTone = first == null || last == null || last === first
        ? undefined
        : last > first
            ? 'success'
            : 'danger';
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: loading
            ? loadingLabel
            : (0, ledger_v4_1.spokenLine)([label, balance, hasChange ? change.word : null, changeText]), style: [surface, { gap: tokens.spacing.xs }, enter, style], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: label }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.typography.scale['3xl'],
                    width: tokens.spacing.xl * PLACEHOLDER_STEPS,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, ledger_v4_1.placeholderGround)(theme),
                } })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onSurface", numeric: "tabular", children: balance })), hasChange && !loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [arrow !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", size: "xs", style: { color: (0, ledger_v4_1.moneyInk)(theme, change.tone) }, children: arrow })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: [{ color: (0, ledger_v4_1.moneyInk)(theme, change.tone) }, ledger_v4_1.TABULAR], children: changeText })] })) : null, trend != null && trend.length > 0 && !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { marginTop: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(SparklineV4_1.SparklineV4, { data: trend, tone: trendTone }) })) : null] }));
}
//# sourceMappingURL=BalanceHeaderV4.js.map