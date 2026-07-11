"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHeading = SectionHeading;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Eyebrow_1 = require("../primitives/Eyebrow");
/**
 * Eyebrow + title + lede — the native mirror of the web `SectionHeading`, the
 * standard section opener. Token-only. The web `as` heading-level prop is kept
 * for prop parity but is inert on native (no DOM heading elements).
 */
function SectionHeading({ eyebrow, title, lede, align = 'left', as: _as = 'h2', style, }) {
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
                    fontWeight: '700',
                    textAlign: centered ? 'center' : 'left',
                }, children: title })) : (title), lede !== undefined && lede !== null ? (typeof lede === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.lg,
                    textAlign: centered ? 'center' : 'left',
                }, children: lede })) : (lede)) : null] }));
}
//# sourceMappingURL=SectionHeading.js.map