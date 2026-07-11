"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialsFromName = initialsFromName;
exports.Testimonials = Testimonials;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
/** Derive up to two initials from a display name. */
function initialsFromName(name) {
    return name
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}
/**
 * Stacked quote cards — the native mirror of the web `Testimonials` +
 * `Testimonial`. The web version composes children and offers a `marquee` mode;
 * native takes an `items` data array and only renders the `grid`-equivalent
 * vertical stack (the infinite marquee is dropped — native motion is
 * Reveal/Stagger only). Token-only.
 */
function Testimonials({ items, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-testimonials", style: [{ gap: tokens.spacing.lg }, style], children: items.map((t, i) => ((0, jsx_runtime_1.jsxs)(Card_1.Card, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.sm,
                        lineHeight: tokens.typography.scale.sm * 1.6,
                    }, children: t.quote }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [t.avatar !== undefined ? (t.avatar) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                                height: 36,
                                width: 36,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: tokens.radius.full,
                                backgroundColor: tokens.ramps.primary[100],
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: tokens.ramps.primary[700],
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                }, children: initialsFromName(t.author) }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '600',
                                    }, children: t.author }), t.role !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: t.role })) : null] })] })] }, i))) }));
}
//# sourceMappingURL=Testimonials.js.map