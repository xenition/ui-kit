"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclaimerBannerV4 = DisclaimerBannerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * DisclaimerBanner — **V4** "chambers" design (native twin of the web V4). The
 * severity is carried by a glyph in its own toned chip + a heading + a token tint
 * (never color alone), and it exposes an `alert` a11y role. `soft` (default)
 * rides a tinted well with a soft shadow; `solid` fills for critical notices;
 * `outline` rings for a lighter footprint. Reuses the base `variant`
 * (`soft` / `solid` / `outline`). Token-only colors via `useXenitionTheme()`.
 */
function DisclaimerBannerV4({ tone = 'info', title, message, variant = 'soft', onDismiss, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.DISCLAIMER_META[tone];
    const tint = (0, internal_1.toneColor)(colors, meta.tone);
    const onTint = colors[(0, internal_1.onToneSlot)(meta.tone)];
    const heading = title ?? meta.label;
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const bg = solid ? tint : outline ? colors.surface : (0, color_1.withAlpha)(tint, 0.12);
    const fg = solid ? onTint : colors.onSurface;
    const accentFg = solid ? onTint : tint;
    const shell = {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: tokens.spacing.sm,
        padding: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        backgroundColor: bg,
        borderWidth: outline ? 1 : 0,
        borderColor: outline ? tint : 'transparent',
        ...(solid || outline
            ? {}
            : { shadowColor: colors.onSurface, shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 }),
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${heading}. ${message}`, testID: testID, style: [shell, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, height: 28, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: solid ? (0, color_1.withAlpha)(onTint, 0.2) : tint }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", allowFontScaling: false, style: { color: solid ? onTint : onTint, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accentFg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: heading }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }, children: message })] }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss notice", onPress: onDismiss, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingHorizontal: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accentFg, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=DisclaimerBannerV4.js.map