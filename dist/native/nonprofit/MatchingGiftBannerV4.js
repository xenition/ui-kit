"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchingGiftBannerV4 = MatchingGiftBannerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * MatchingGiftBanner — **V4** "rally" design. A rallying banner announcing a
 * gift-matching offer, drawn with the warm "rally" identity: a glyph in the tone
 * color, the sponsor + match ratio in a bold legible line, an optional
 * matched/cap progress bar (integer cents → `formatMoney`, cap divide-by-zero
 * guarded via `goalPct`), a deadline, and an optional CTA. Honors all three
 * `variant`s — `solid` (a strong primary fill with near-white `onPrimary` ink),
 * `soft` (a soft-primary tint via `withAlpha`), and `outline` (a bordered
 * surface) — identical props/behavior to {@link MatchingGiftBannerProps}. These
 * are token FILL treatments, not a brand gradient. Progress is a bar plus a
 * printed cap figure — not color alone. Token-only colors via
 * `useXenitionTheme()`.
 */
function MatchingGiftBannerV4({ matcherName, multiplier = 2, matchedCents, capCents, currency = 'USD', deadlineLabel, actionLabel = 'Give now', onAction, variant = 'soft', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const solid = variant === 'solid';
    const bg = solid ? colors.primary : variant === 'soft' ? (0, color_1.withAlpha)(colors.primary, 0.12) : colors.surface;
    const fg = solid ? colors.onPrimary : colors.onSurface;
    const subFg = solid ? colors.onPrimary : colors.muted;
    const borderWidth = variant === 'outline' ? 1 : 0;
    const surfaceStyle = solid
        ? { shadowColor: colors.onSurface, shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 3 }
        : null;
    const hasBar = typeof matchedCents === 'number' && typeof capCents === 'number';
    const pct = hasBar ? (0, internal_1.goalPct)(matchedCents, capCents) : 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `${matcherName} is matching gifts ${multiplier}x`, style: [
            { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.lg, borderWidth, borderColor: colors.border, backgroundColor: bg },
            surfaceStyle,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2728", size: "lg", color: solid ? 'onPrimary' : 'primary' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.base, fontWeight: '800', flex: 1 }, children: `${matcherName} matches ${multiplier}× your gift` })] }), hasBar ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: Math.round(pct) }, style: { width: '100%', height: 8, borderRadius: tokens.radius.full, backgroundColor: solid ? (0, color_1.withAlpha)(colors.onPrimary, 0.3) : colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: `${pct}%`, backgroundColor: solid ? colors.onPrimary : colors.primary, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subFg, fontSize: tokens.typography.scale.xs }, children: `${(0, internal_1.formatMoney)(matchedCents, currency)} of ${(0, internal_1.formatMoney)(capCents, currency)} matched` })] })) : null, deadlineLabel ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: subFg, fontSize: tokens.typography.scale.sm }, children: deadlineLabel }) : null, onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: solid ? 'elevated' : 'primary', onPress: onAction, children: actionLabel })) : null] }));
}
//# sourceMappingURL=MatchingGiftBannerV4.js.map