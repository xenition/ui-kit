"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialV4 = TestimonialV4;
exports.TestimonialsV4 = TestimonialsV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const Testimonials_1 = require("./Testimonials");
/**
 * Testimonial — **V4** "showcase" design (native mirror of the web V4). A clean,
 * elevated quote card: the `quote` over a caption of an avatar (or initials
 * derived from `author`), an extra-bold name, and a muted role line. NOT a
 * gradient surface. Same props as the base `TestimonialItem`. Token-only.
 */
function TestimonialV4({ quote, author, role, avatar }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: tokens.spacing.md,
            padding: tokens.spacing.lg,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    lineHeight: tokens.typography.scale.sm * 1.6,
                }, children: quote }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [avatar !== undefined ? (avatar) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                            height: 36,
                            width: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.primary,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '600',
                            }, children: (0, Testimonials_1.initialsFromName)(author) }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '800',
                                    letterSpacing: -0.3,
                                }, children: author }), role !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: role })) : null] })] })] }));
}
/**
 * Testimonials — **V4** "showcase" design (native mirror of the web V4). A
 * content section: a stack of elevated `TestimonialV4` quote cards. Mirrors the
 * web V4; native takes the base's `items` data array (the web `marquee` mode is
 * dropped, as on the base). Same props/behavior as {@link TestimonialsProps}.
 * Token-only colors, no literals.
 */
function TestimonialsV4({ items, style }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-testimonials", style: [{ gap: tokens.spacing.lg }, style], children: items.map((t, i) => ((0, jsx_runtime_1.jsx)(TestimonialV4, { ...t }, i))) }));
}
//# sourceMappingURL=TestimonialsV4.js.map