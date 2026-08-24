"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCardV2 = ArticleCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * ArticleCard — **magazine full-bleed** alternate design.
 *
 * Where the v1 card stacks image → text on a bordered surface, this variant
 * fills the whole card with the cover image and overlays a bottom gradient
 * scrim with the category, headline, and byline reversed out in near-white.
 * Same props as {@link ArticleCard}, so it is a drop-in swap.
 *
 * Token-pure: the scrim is `withAlpha(ramps.neutral[900], …)` and the reversed
 * text is `ramps.neutral[50]` — both real compiled-theme hexes, never literals.
 * When no cover image is supplied it degrades to a soft-tinted panel with the
 * normal on-surface text so the headline stays legible.
 */
function ArticleCardV2({ article, onPress, variant = 'standard', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const height = variant === 'featured' ? 288 : variant === 'compact' ? 168 : 224;
    const radius = tokens.radius.lg;
    const ink = tokens.ramps.neutral[50] ?? colors.surface;
    const inkSoft = (0, color_1.withAlpha)(ink, 0.82);
    const scrimHex = tokens.ramps.neutral[900] ?? tokens.ramps.neutral[800] ?? colors.onSurface;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: radius, overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: height }) }));
    }
    const meta = [article.author?.name, article.date, article.readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    const hasImage = !!article.imageUrl;
    const titleSize = variant === 'featured' ? tokens.typography.scale.xl : tokens.typography.scale.lg;
    const overlaid = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                height,
                borderRadius: radius,
                overflow: 'hidden',
                justifyContent: 'flex-end',
                backgroundColor: hasImage ? colors.border : (0, color_1.withAlpha)(colors.primary, 0.08),
                borderWidth: hasImage ? 0 : 1,
                borderColor: colors.border,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [hasImage ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: article.imageUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' } })) : null, hasImage ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: height * 0.7,
                            backgroundColor: (0, color_1.withAlpha)(scrimHex, 0.28),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: height * 0.45,
                            backgroundColor: (0, color_1.withAlpha)(scrimHex, 0.42),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: height * 0.24,
                            backgroundColor: (0, color_1.withAlpha)(scrimHex, 0.5),
                        } })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [article.category ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            backgroundColor: colors.accent,
                            borderRadius: tokens.radius.sm,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onAccent,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '800',
                                letterSpacing: 0.6,
                                textTransform: 'uppercase',
                            }, children: article.category }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: variant === 'compact' ? 2 : 3, style: {
                            color: hasImage ? ink : colors.onSurface,
                            fontSize: titleSize,
                            lineHeight: titleSize * 1.2,
                            fontWeight: '800',
                        }, children: article.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: hasImage ? inkSoft : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '600',
                        }, children: meta })) : null] })] }));
    if (!onPress)
        return overlaid;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: article.title, onPress: () => onPress(article), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: overlaid }));
}
//# sourceMappingURL=ArticleCardV2.js.map