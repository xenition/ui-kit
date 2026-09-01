"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHeadingV4 = SectionHeadingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Eyebrow_1 = require("../primitives/Eyebrow");
/**
 * SectionHeading — **V4** "showcase" design (native mirror of the web V4). NOT
 * a gradient surface: a clean, refined section opener with a strong soft-primary
 * eyebrow, an extra-bold tight-tracked heading, and a muted supporting lede.
 * Honors every prop of {@link SectionHeadingProps}
 * (`eyebrow`/`title`/`lede`/`align`/`as`); the `as` heading-level prop is kept
 * for web parity but is inert on native. Token-only colors, no literals.
 */
function SectionHeadingV4({ eyebrow, title, lede, align = 'left', as: _as = 'h2', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const centered = align === 'center';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                alignItems: centered ? 'center' : 'flex-start',
            },
            style,
        ], children: [eyebrow !== undefined && eyebrow !== null ? (typeof eyebrow === 'string' ? ((0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { tone: "primary", align: centered ? 'center' : 'start', children: eyebrow })) : (eyebrow)) : null, typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '800',
                    letterSpacing: -0.5,
                    textAlign: centered ? 'center' : 'left',
                }, children: title })) : (title), lede !== undefined && lede !== null ? (typeof lede === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.lg,
                    textAlign: centered ? 'center' : 'left',
                }, children: lede })) : (lede)) : null] }));
}
//# sourceMappingURL=SectionHeadingV4.js.map