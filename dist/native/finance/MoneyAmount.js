"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyAmount = MoneyAmount;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const money_1 = require("../commerce/money");
const SIZE_KEY = {
    sm: 'sm',
    md: 'base',
    lg: 'xl',
    xl: '3xl',
};
function toneColorKey(tone, cents) {
    // FILL-AS-TEXT: the amount is TEXT, so it reads the AA-guaranteed *Text slots
    // (successText / dangerText) rather than the fill-oriented success / danger.
    switch (tone) {
        case 'income':
            return 'successText';
        case 'expense':
            return 'dangerText';
        case 'neutral':
            return 'onSurface';
        case 'muted':
            return 'muted';
        case 'auto':
        default:
            if (cents > 0)
                return 'successText';
            if (cents < 0)
                return 'dangerText';
            return 'onSurface';
    }
}
/**
 * The finance module's canonical money display: a single signed, token-toned
 * `Text`. Amounts are integer cents so the printed value never drifts —
 * `formatMoney` renders exactly two decimals via `Intl.NumberFormat`, and the
 * magnitude is formatted from `Math.abs(cents)` with the sign applied
 * separately. Color traces to a `SemanticColors` slot (income = `success`,
 * expense = `danger`) — never a literal. Every other finance component funnels
 * its amounts through here.
 */
function MoneyAmount({ cents, currency = 'USD', tone = 'auto', size = 'md', signDisplay = 'auto', formatMoney: format = money_1.formatMoney, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeCents = Number.isFinite(cents) ? Math.trunc(cents) : 0;
    const magnitude = format(Math.abs(safeCents), currency);
    let sign = '';
    if (safeCents < 0)
        sign = signDisplay === 'never' ? '' : '−'; // minus sign
    else if (safeCents > 0 && signDisplay === 'always')
        sign = '+';
    const color = colors[toneColorKey(tone, safeCents)];
    const text = `${sign}${magnitude}`;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: accessibilityLabel ??
            `${safeCents < 0 ? 'debit' : safeCents > 0 ? 'credit' : ''} ${magnitude}`.trim(), style: [
            {
                color,
                fontSize: tokens.typography.scale[SIZE_KEY[size]],
                fontWeight: '700',
                fontVariant: ['tabular-nums'],
            },
            style,
        ], children: text }));
}
//# sourceMappingURL=MoneyAmount.js.map