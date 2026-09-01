"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityCardV4 = EntityCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Eyebrow_1 = require("../primitives/Eyebrow");
const color_1 = require("../primitives/internal/color");
const GenerativeCover_1 = require("../commerce/GenerativeCover");
/**
 * EntityCard — **V4** "showcase" design (native mirror of the web V4). The
 * generic content/entity card re-skinned as an image-forward showcase card: a
 * floating rounded media frame (an `Image` when `media.imageUrl` is set, else a
 * seeded {@link GenerativeCover}; a soft-primary well with a glyph when no media
 * is given at all), the `eyebrow` as a soft-primary chip, a bold tight-tracked
 * `title`, muted `description`, an emphasized `meta` line, a corner `badge`, and
 * a `footer` slot — all on a clean elevated card (`colors.card` + border + soft
 * shadow; NO gradient). `onPress` is native's `href` (wraps the whole card in a
 * Pressable). Honors every base prop; token-only colors, no literals.
 */
function EntityCardV4({ title, eyebrow, description, meta, media, badge, footer, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const mediaBox = media ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            aspectRatio: media.aspect ?? 1.6,
            width: '100%',
            overflow: 'hidden',
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.ramps.neutral[100],
        }, children: media.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: media.imageUrl }, accessible: true, accessibilityLabel: title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: media.seed ?? title, label: title, style: { width: '100%', height: '100%' } })) })) : (
    // No media descriptor at all — a soft-primary well with a glyph.
    (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            aspectRatio: 1.6,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: tokens.radius.md,
            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 28, width: 28, borderRadius: 6, borderWidth: 2, borderColor: colors.primary } }) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            },
            style,
        ], children: [badge ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-entity-badge", style: { position: 'absolute', right: tokens.spacing.md, top: tokens.spacing.md, zIndex: 10 }, children: badge })) : null, mediaBox, eyebrow ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'flex-start',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsx)(Eyebrow_1.Eyebrow, { children: eyebrow }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '800',
                    letterSpacing: -0.3,
                }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { testID: "xen-entity-meta", style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: meta })) : null, footer ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: footer }) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
    }
    return body;
}
//# sourceMappingURL=EntityCardV4.js.map