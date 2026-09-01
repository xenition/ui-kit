"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureSplitV4 = FeatureSplitV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Eyebrow_1 = require("../primitives/Eyebrow");
const color_1 = require("../primitives/internal/color");
/**
 * FeatureSplit — **V4** "showcase" design (native mirror of the web V4). A
 * content section, so NOT a gradient surface: bold copy beside a media slot.
 * Mirrors the web V4; native always stacks vertically (phones are narrow), with
 * media on top by default and `reverse` flipping it below the copy. Honors every
 * base prop (`eyebrow`/`title`/`description`/`bullets`/`media`/`reverse`/
 * `action`); when no `media` is supplied a token-styled 16:9 placeholder is
 * rendered. Same props/behavior as {@link FeatureSplitProps}. Token-only.
 */
function FeatureSplitV4({ eyebrow, title, description, bullets, media, reverse = false, action, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const mediaNode = media !== undefined ? (media) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            aspectRatio: 16 / 9,
            width: '100%',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: tokens.ramps.neutral[100],
        } }));
    const mediaBlock = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: '100%' }, children: mediaNode }, "media"));
    const copyBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [eyebrow !== undefined && eyebrow !== null ? (typeof eyebrow === 'string' ? ((0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { tone: "accent", align: "start", children: eyebrow })) : (eyebrow)) : null, typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '800',
                    letterSpacing: -0.5,
                }, children: title })) : (title), description !== undefined && description !== null ? (typeof description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg }, children: description })) : (description)) : null, bullets && bullets.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: bullets.map((bullet, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
                                height: 20,
                                width: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontWeight: '800', fontSize: tokens.typography.scale.xs }, children: "\u2713" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }, children: bullet })] }, i))) })) : null, action !== undefined && action !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.sm,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: tokens.spacing.sm,
                }, children: action })) : null] }, "copy"));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-feature-split", style: [{ gap: tokens.spacing.xl }, style], children: reverse ? [copyBlock, mediaBlock] : [mediaBlock, copyBlock] }));
}
//# sourceMappingURL=FeatureSplitV4.js.map