"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclaimerBanner = DisclaimerBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * A legal disclaimer / notice banner — "not legal advice", attorney-client
 * privilege, confidentiality, statute-of-limitations warnings, etc. Severity is
 * carried by a glyph + heading + token tint (never color alone), and it exposes
 * an `alert` a11y role so screen readers announce it. `solid` fills for critical
 * notices; `outline` for a lighter footprint. All colors are theme tokens — no
 * literals.
 */
function DisclaimerBanner({ tone = 'info', title, message, variant = 'soft', onDismiss, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = internal_1.DISCLAIMER_META[tone];
    const tint = (0, internal_1.toneColor)(colors, meta.tone);
    const heading = title ?? meta.label;
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const bg = solid ? tint : outline ? 'transparent' : (0, color_1.withAlpha)(tint, 0.12);
    const fg = solid ? colors[(0, internal_1.onToneSlot)(meta.tone)] : colors.onSurface;
    const accentFg = solid ? colors[(0, internal_1.onToneSlot)(meta.tone)] : tint;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${heading}. ${message}`, testID: testID, style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: bg,
                borderWidth: outline ? 1 : 0,
                borderColor: outline ? tint : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { color: accentFg, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accentFg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: heading }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, lineHeight: tokens.typography.scale.xs * 1.5 }, children: message })] }), onDismiss ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss notice", onPress: onDismiss, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingHorizontal: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accentFg, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "\u2715" }) })) : null] }));
}
//# sourceMappingURL=DisclaimerBanner.js.map