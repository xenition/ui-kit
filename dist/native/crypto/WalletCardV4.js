"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletCardV4 = WalletCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const money_1 = require("../../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
const KIND_META = {
    hot: { label: 'Hot', tone: 'warn', glyph: '🔥' },
    hardware: { label: 'Hardware', tone: 'success', glyph: '🔒' },
    watch: { label: 'Watch-only', tone: 'neutral', glyph: '👁' },
};
/** How much brand the `accent` variant's ground carries — `BadgeV4`'s 14%. */
const ACCENT_MIX = 0.14;
/**
 * **V4 wallet header** — same props as {@link WalletCard} plus `copyLabel`,
 * `copiedLabel` and `addressLead`.
 *
 * ## Four changes
 *
 * 1. **Copy does one thing.** The copy chip was a *descendant* of the card's
 *    own activation, so on the web twin one tap fired both `onCopy` and
 *    `onClick` — and native, where a nested `Pressable` swallows the touch,
 *    did not. Same tap, two behaviours, depending on the platform. The card's
 *    control now wraps the identity region only and the chip is its sibling,
 *    the restructure `ContactCardV4` already made.
 * 2. **The address shows enough of itself to verify.** See
 *    {@link WalletCardV4Props.addressLead}.
 * 3. **The card announces its balance.** `label` — `"Main Wallet"` — was the
 *    whole name and it replaced the subtree, so the fiat balance and the
 *    native amount were never spoken. They are one line now, with the custody
 *    kind; the 🔥/🔒/👁 mark stays out of it, as it already does on web.
 * 4. **A copy that lands says so.** `onCopy` is a handler the component cannot
 *    see the result of, so the acknowledgement is the one thing it can
 *    honestly give: `copiedLabel`, announced. The chip also clears 44, has a
 *    real disabled state, and presses as a state layer rather than
 *    `opacity: 0.7`.
 */
function WalletCardV4({ address, label = 'Wallet', balanceCents, currency = 'USD', nativeAmount, nativeSymbol, nativeDecimals = 4, kind, variant = 'elevated', loading = false, copyLabel = 'Copy address', copiedLabel = 'Address copied', addressLead = 8, onCopy, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!address)
        return null;
    const short = (0, format_1.truncateHash)(address, addressLead, 4);
    const kindMeta = kind ? KIND_META[kind] : undefined;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    // `variant` reaches `Card` here and — in V4 — on the web twin too, where the
    // component's own `elevated` default was dropped entirely.
    const cardVariant = variant === 'accent' ? 'elevated' : variant;
    const accentStyle = variant === 'accent'
        ? { backgroundColor: (0, v4_depth_1.mixToken)(colors.surface, colors.primary, ACCENT_MIX) }
        : null;
    const nativeText = nativeAmount != null
        ? (0, format_1.formatToken)(nativeAmount, {
            decimals: nativeDecimals,
            ...(nativeSymbol != null ? { symbol: nativeSymbol } : {}),
        })
        : null;
    const identityName = (0, market_v4_1.spokenLine)([
        label,
        kindMeta?.label,
        balanceCents != null ? (0, money_1.formatMoney)(balanceCents, currency) : null,
        nativeText,
    ]);
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 1, style: { flex: 1, minWidth: 0 }, children: label }), kindMeta ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: kindMeta.tone, ...market_v4_1.BADGE_V4, children: `${kindMeta.glyph} ${kindMeta.label}` })) : null] }), loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.spacing.xl,
                    width: '60%',
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, market_v4_1.skeletonFill)(theme),
                } })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [balanceCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: balanceCents, currency: currency, tone: "neutral", size: "xl" })) : null, nativeText != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: nativeText })) : null] }))] }));
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { variant: cardVariant, style: [accentStyle, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: loading ? (0, market_v4_1.spokenLine)([label, 'Loading balance']) : identityName, onPress: onPress, style: ({ pressed }) => ({
                        borderRadius: tokens.radius.md,
                        backgroundColor: pressed
                            ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                            : 'transparent',
                    }), children: identity })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: loading ? (0, market_v4_1.spokenLine)([label, 'Loading balance']) : identityName, children: identity })), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, market_v4_1.spokenLine)([copyLabel, address]), accessibilityState: { disabled: !onCopy }, disabled: !onCopy, onPress: onCopy
                        ? () => {
                            onCopy(address);
                            // The only acknowledgement the component can honestly make:
                            // it does not own the clipboard and cannot read it back.
                            react_native_1.AccessibilityInfo.announceForAccessibility(copiedLabel);
                        }
                        : undefined, style: ({ pressed }) => ({
                        alignSelf: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.xs,
                        minHeight: tap,
                        backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : colors.card,
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: tokens.radius.full,
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.md,
                        opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, !onCopy),
                    }), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", numeric: "tabular", children: short }), onCopy ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: "\u29C9" })) : null] })] }) }));
}
//# sourceMappingURL=WalletCardV4.js.map