"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingGiftBanner = MatchingGiftBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * A promotional banner announcing a gift-matching offer: sponsor, multiplier,
 * an optional matched/cap progress bar (integer cents → `formatMoney`, cap
 * divide-by-zero guarded), a deadline, and an optional CTA. `variant` chooses a
 * solid accent fill, a soft tint (`withAlpha`), or an outline. Progress is shown
 * as a bar plus a printed cap figure — not color alone. All colors come from the
 * compiled theme tokens — no literal colors.
 */
function MatchingGiftBanner({ matcherName, multiplier = 2, matchedCents, capCents, currency = 'USD', deadlineLabel, actionLabel = 'Give now', onAction, variant = 'soft', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const solid = variant === 'solid';
    const bg = solid ? colors.primary : variant === 'soft' ? (0, internal_1.withAlpha)(colors.primary, 0.12) : colors.surface;
    const fg = solid ? colors.onPrimary : colors.onSurface;
    const subFg = solid ? colors.onPrimary : colors.muted;
    const borderWidth = variant === 'outline' ? 1 : 0;
    const hasBar = typeof matchedCents === 'number' && typeof capCents === 'number';
    const pct = hasBar ? (0, internal_1.goalPct)(matchedCents, capCents) : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `${matcherName} is matching gifts ${multiplier}x`, style: [
            { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.lg, borderWidth, borderColor: colors.primary, backgroundColor: bg },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2728", size: "lg", color: solid ? 'onPrimary' : 'primary' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.base, fontWeight: '800', flex: 1 }, children: `${matcherName} matches ${multiplier}× your gift` })] }), hasBar ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: Math.round(pct) }, style: { width: '100%', height: 8, borderRadius: tokens.radius.full, backgroundColor: solid ? (0, internal_1.withAlpha)(colors.onPrimary, 0.3) : colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: `${pct}%`, backgroundColor: solid ? colors.onPrimary : colors.primary, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subFg, fontSize: tokens.typography.scale.xs }, children: `${(0, internal_1.formatMoney)(matchedCents, currency)} of ${(0, internal_1.formatMoney)(capCents, currency)} matched` })] })) : null, deadlineLabel ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subFg, fontSize: tokens.typography.scale.sm }, children: deadlineLabel }) : null, onAction ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: solid ? 'elevated' : 'primary', onPress: onAction, children: actionLabel })) : null] }));
}
//# sourceMappingURL=MatchingGiftBanner.js.map