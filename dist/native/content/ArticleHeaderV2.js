"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleHeaderV2 = ArticleHeaderV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const AuthorBylineV2_1 = require("./AuthorBylineV2");
/**
 * ArticleHeader — **centered hero** alternate design.
 *
 * A big display title, category eyebrow, and dek are centered *over* a
 * full-bleed cover image darkened by a gradient scrim, with the byline centered
 * beneath. Cinematic masthead rather than the v1 stacked layout. Same props as
 * {@link ArticleHeader}, so it is a drop-in swap.
 *
 * Token-pure: scrim is `withAlpha(ramps.neutral[900], …)`, reversed text is
 * `ramps.neutral[50]`. With no cover image it degrades to a centered header on
 * the normal surface with on-surface text.
 * Stays inside its own design line: the byline is {@link AuthorBylineV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
function ArticleHeaderV2({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const titleSize = variant === 'hero' ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];
    const ink = tokens.ramps.neutral[50] ?? colors.surface;
    const inkSoft = (0, color_1.withAlpha)(ink, 0.85);
    const scrimHex = tokens.ramps.neutral[900] ?? tokens.ramps.neutral[800] ?? colors.onSurface;
    const hasCover = !!coverImageUrl;
    const minHeight = variant === 'hero' ? 360 : 300;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg, overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: "100%", height: minHeight }) }));
    }
    const meta = [date, readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                minHeight,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                padding: tokens.spacing.xl,
                gap: tokens.spacing.md,
                backgroundColor: hasCover ? colors.border : colors.surface,
                borderWidth: hasCover ? 0 : 1,
                borderColor: colors.border,
            },
            style,
        ], children: [hasCover ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverImageUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: (0, color_1.withAlpha)(scrimHex, 0.5),
                        } })] })) : null, category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: hasCover ? inkSoft : colors.primaryText,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '800',
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                }, children: category })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: hasCover ? ink : colors.onSurface,
                    fontSize: titleSize,
                    lineHeight: titleSize * 1.15,
                    fontWeight: '800',
                    textAlign: 'center',
                }, children: title }), deck ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: hasCover ? inkSoft : colors.muted,
                    fontSize: tokens.typography.scale.lg,
                    lineHeight: tokens.typography.scale.lg * 1.4,
                    textAlign: 'center',
                }, children: deck })) : null, author ? (hasCover ? (
            // Reversed-out inline credit so it stays legible over the scrim.
            (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: inkSoft,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textAlign: 'center',
                }, children: [author.name, meta].filter(Boolean).join('  ·  ') })) : ((0, jsx_runtime_1.jsx)(AuthorBylineV2_1.AuthorBylineV2, { author: author, date: date, readingTime: readingTime, variant: "compact" }))) : meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: hasCover ? inkSoft : colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    textAlign: 'center',
                }, children: meta })) : null] }));
}
//# sourceMappingURL=ArticleHeaderV2.js.map