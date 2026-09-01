"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealCardV4 = DealCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const WinLossBadgeV4_1 = require("./WinLossBadgeV4");
const crm_v4_1 = require("./internal/crm-v4");
/** The meter's own thickness — a bar, not a hairline. */
const METER = 6;
/**
 * **V4 deal card** — same props as {@link DealCard} plus `probabilityLabel`
 * and `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The probability meter has a name.** Both twins gave it
 *    `accessibilityRole="progressbar"` and a value with **no label**, leaving
 *    the visible word "Probability" as a detached sibling — so a reader heard
 *    "60 percent" of nothing. The word and the meter are now one control.
 * 2. **The card announces everything it shows** — deal, account, value, stage,
 *    probability, owner and close date. `Deal Acme, Acme Inc` replaced the
 *    whole subtree, so the money was silent (rule A).
 * 3. **Money and the percentage are tabular**, so a column of deal cards has
 *    its figures on one grid instead of jittering per digit.
 * 4. **The owner avatar is `sm` on both twins.** Native drew `xs`; the same
 *    card was two different densities per platform.
 * 5. **The skeleton is the shared opaque placeholder** rather than
 *    `colors.border`, and its bar heights come off the spacing scale — the
 *    base sized a box with a **type-scale** token, which is a font size.
 * 6. **`highlighted` is a ring, not a translucent wash.** A wash makes the
 *    card's ink pair depend on whatever is behind it; the card keeps
 *    `card`/`onCard` and gains a `primary` edge. Plus rules B and C.
 *
 * **Renders nothing without a `name`.**
 */
function DealCardV4({ name, company, valueCents, currency = 'USD', stage, probability, owner, closeDate, outcome = 'open', variant = 'default', loading = false, probabilityLabel = 'Probability', loadingLabel = 'Loading deal', onPress, testID, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const pct = Math.round((0, crm_v4_1.clampPercent)(probability) ?? 0);
    const showMeter = !compact && probability != null;
    const money = (0, money_1.formatMoney)(valueCents, currency);
    const cardStyle = [
        highlighted ? { borderWidth: 1, borderColor: colors.primary } : null,
        { gap: tokens.spacing.sm },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: highlighted ? 'elevated' : 'outlined', padding: compact ? 'sm' : 'md', testID: testID, style: cardStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.spacing.md + tokens.spacing.xs,
                            width: '70%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: tokens.spacing.sm + tokens.spacing.xs,
                            width: '40%',
                            borderRadius: tokens.radius.sm,
                            backgroundColor: (0, crm_v4_1.skeletonFill)(theme),
                        } })] }) }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 2, children: name }), company ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: company })) : null] }), (0, jsx_runtime_1.jsx)(WinLossBadgeV4_1.WinLossBadgeV4, { outcome: outcome, size: "sm" })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", style: crm_v4_1.TABULAR, children: money }), stage ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", numberOfLines: 1, children: stage })) : null] }), showMeter ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: probabilityLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", style: crm_v4_1.TABULAR, children: `${pct}%` })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: probabilityLabel, accessibilityValue: { min: 0, max: 100, now: pct, text: `${pct}%` }, style: {
                            height: METER,
                            borderRadius: tokens.radius.full,
                            backgroundColor: colors.selected,
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', backgroundColor: colors.primary } }) })] })) : null, !compact && (owner || closeDate) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [owner ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: owner.name, src: owner.avatarUrl }), owner.name ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: owner.name })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), closeDate ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: crm_v4_1.TABULAR, children: closeDate })) : null] })) : null] }));
    const name_ = (0, crm_v4_1.spokenLine)([
        name,
        company,
        money,
        stage,
        showMeter ? `${probabilityLabel} ${pct}%` : null,
        owner?.name,
        closeDate,
    ]);
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: highlighted ? 'elevated' : 'outlined', padding: compact ? 'sm' : 'md', accessible: true, accessibilityLabel: name_, testID: testID, style: cardStyle, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name_, onPress: onPress, testID: testID, style: { borderRadius: tokens.radius.lg, minHeight: (0, chrome_v4_1.minTap)(tokens.spacing) }, children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: highlighted ? 'elevated' : 'outlined', padding: compact ? 'sm' : 'md', style: [
                ...cardStyle,
                pressed ? { backgroundColor: (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) } : null,
            ], children: body })) }));
}
//# sourceMappingURL=DealCardV4.js.map