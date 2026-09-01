"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteCardV4 = QuoteCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const internal_1 = require("./internal");
const crm_v4_1 = require("./internal/crm-v4");
/**
 * **V4 quote card** — same props as {@link QuoteCard} plus `formatLineItems`
 * and `statusLabel`.
 *
 * ## Five changes
 *
 * 1. **The status is announced on native.** `accessibilityLabel` sat on a bare
 *    `View` with no `accessible` flag, so the label was silently dropped and
 *    the one thing a quote row exists to report — draft, sent, accepted — was
 *    never read out.
 * 2. **The action button is not nested inside a button.** The card's own
 *    activation wrapped the whole surface, action included; the web twin had
 *    to guard the identical nesting with `stopPropagation`. The activation now
 *    covers only the quote's summary and the action is its sibling.
 * 3. **The card announces everything it shows** — number, account, total,
 *    status, item count and validity (rule A).
 * 4. **The grand total is tabular**, so a stack of quotes lines up.
 * 5. **A press is a state layer** (rule B) and the badge is `BADGE_V4`
 *    (rule C).
 *
 * **Renders nothing without a `number`.**
 */
function QuoteCardV4({ number, company, totalCents, currency = 'USD', lineItems, status, validUntil, actionLabel, formatLineItems, statusLabel = 'Status', onAction, onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!number)
        return null;
    const meta = internal_1.QUOTE_META[status];
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const total = (0, money_1.formatMoney)(totalCents, currency);
    const itemsLabel = lineItems != null && lineItems > 0
        ? (formatLineItems ?? ((n) => `${n} item${n === 1 ? '' : 's'}`))(lineItems)
        : undefined;
    const caption = (0, crm_v4_1.metaLine)([itemsLabel, validUntil]);
    const name = (0, crm_v4_1.spokenLine)([
        number,
        company,
        total,
        `${statusLabel} ${meta.label}`,
        itemsLabel,
        validUntil,
    ]);
    const summary = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", children: number }), company ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: company })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: `${statusLabel} ${meta.label}`, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...crm_v4_1.BADGE_V4, tone: meta.tone, children: `${meta.glyph} ${meta.label}` }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", weight: "bold", tone: "onCard", style: crm_v4_1.TABULAR, children: total }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { padding: "md", testID: testID, style: [{ gap: tokens.spacing.sm }, style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => summary(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: summary(false) })), actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "soft", size: "sm", onPress: onAction, style: { minHeight: tap }, children: actionLabel })) : null] }));
}
//# sourceMappingURL=QuoteCardV4.js.map