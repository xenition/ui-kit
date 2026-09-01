"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateRowV4 = ExchangeRateRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const row_v4_1 = require("../dashboard/internal/row-v4");
const ledger_v4_1 = require("./internal/ledger-v4");
/** The words the move is announced with — the arrow's shape said in speech. */
const CHANGE_WORDS = { credit: 'up', debit: 'down' };
/**
 * **V4 exchange rate row** — same props as {@link ExchangeRateRow} plus
 * `locale`.
 *
 * ## Four changes
 *
 * 1. **A large `precision` no longer throws.** `Math.max(0, precision)`
 *    clamped the bottom and left the top open, so anything above 100 was a
 *    `RangeError` out of `toFixed` — an uncaught throw from a display row.
 *    `ratePrecision()` clamps both ends.
 * 2. **The rate is formatted through `Intl`.** `toFixed` hard-locks the
 *    decimal mark to `.`, so a de-DE app showed "1.234,56 EUR" beside
 *    "0.9184" — two number systems in one row.
 * 3. **A zero change is not a green gain.** `(changePct ?? 0) >= 0` painted a
 *    flat 0.00% in `success` with an up arrow. Zero has its own branch, no
 *    arrow and a neutral ink.
 * 4. **The row announces the change**, clears 44 from the shared row family,
 *    and draws its press as a state layer rather than `opacity: 0.7` — which
 *    dims content and so reads as *disabled*.
 */
function ExchangeRateRowV4({ baseCurrency, quoteCurrency, rate, changePct, precision = 4, locale, onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const safeRate = Number.isFinite(rate) ? rate : 0;
    const digits = (0, ledger_v4_1.ratePrecision)(precision);
    const rateText = new Intl.NumberFormat(locale, {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(safeRate);
    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const change = (0, ledger_v4_1.signParts)(changePct ?? 0, undefined, CHANGE_WORDS);
    const changeText = hasChange ? `${(0, ledger_v4_1.pctText)(changePct, locale)}%` : null;
    const arrow = change.direction === 'credit' ? '▲' : change.direction === 'debit' ? '▼' : '';
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const name = (0, ledger_v4_1.spokenLine)([
        `${baseCurrency} to ${quoteCurrency}`,
        rateText,
        hasChange ? change.word : null,
        changeText,
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            (0, row_v4_1.rowContainerStyle)(theme),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: [baseCurrency, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", tone: "mutedText", children: ' → ' }), quoteCurrency] }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numeric: "tabular", children: rateText }), hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [arrow !== '' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: (0, ledger_v4_1.moneyInk)(theme, change.tone) }, children: arrow })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: [{ color: (0, ledger_v4_1.moneyInk)(theme, change.tone) }, ledger_v4_1.TABULAR], children: changeText })] })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=ExchangeRateRowV4.js.map