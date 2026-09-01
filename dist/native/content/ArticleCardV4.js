"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleCardV4 = ArticleCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const AuthorBylineV4_1 = require("./AuthorBylineV4");
const CategoryChipV4_1 = require("./CategoryChipV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 article card** — same props as {@link ArticleCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A loading card cannot be tapped.** The web twin computed its
 *    interactivity before the loading branch and wrapped the skeleton in a
 *    `role="button"` with the live `onClick` still attached, so a reader could
 *    open an article that had not arrived. Both twins now return the inert
 *    skeleton, announced once as `loadingLabel`.
 * 2. **The image placeholder is the shared media ground.** This twin painted
 *    it `colors.border` — a hairline token spent as a fill — while the web
 *    twin painted a raw ramp step that ignored the seed entirely.
 * 3. **Press is a state layer, not a dim.** `opacity: 0.85` lightens the
 *    card's own content, which is the signal M3 spends on *disabled*; the card
 *    now tints its ground and leaves the headline at full strength.
 * 4. **Meta text takes `mutedText`.** `muted` is a fill slot with no contrast
 *    promise; the date and read length were set in it on every variant.
 * 5. **The card composes the V4 chip and byline**, so a feed does not mix two
 *    design lines inside one card.
 *
 * **Renders nothing without an article title** (§4.5).
 */
function ArticleCardV4({ article, onPress, variant = 'standard', loading = false, loadingLabel = 'Loading article', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const compact = variant === 'compact';
    const featured = variant === 'featured';
    // 88 and 192/144 off the spacing scale, so a denser seed scales its media too.
    const thumb = (0, chrome_v4_1.minTap)(tokens.spacing) * 2;
    const imageHeight = featured ? tokens.spacing['2xl'] * 4 : tokens.spacing['2xl'] * 3;
    if (loading) {
        // Inert, and before any interactivity is computed — the whole point of the
        // fix. A skeleton that answers a tap answers it with an empty article.
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { accessible: true, accessibilityLabel: loadingLabel, accessibilityLiveRegion: "polite", style: style, children: compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: thumb, height: thumb }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "90%", height: tokens.typography.scale.lg }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "60%", height: tokens.typography.scale.sm })] })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: imageHeight }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "90%", height: tokens.typography.scale.xl }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "70%", height: tokens.typography.scale.sm })] })) }));
    }
    if (!article?.title)
        return null;
    const meta = (0, reading_v4_1.metaLine)([article.date, article.readingTime]);
    const body = compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: article.imageUrl }, accessibilityIgnoresInvertColors: true, style: {
                    width: thumb,
                    height: thumb,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, reading_v4_1.mediaGround)(theme),
                }, resizeMode: "cover" })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [article.category ? (0, jsx_runtime_1.jsx)(CategoryChipV4_1.CategoryChipV4, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onSurface", numberOfLines: 3, children: article.title }), meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: meta })) : null] })] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [article.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: article.imageUrl }, accessibilityIgnoresInvertColors: true, style: {
                    width: '100%',
                    height: imageHeight,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, reading_v4_1.mediaGround)(theme),
                }, resizeMode: "cover" })) : null, article.category ? (0, jsx_runtime_1.jsx)(CategoryChipV4_1.CategoryChipV4, { label: article.category, variant: "soft" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: featured ? 'xl' : 'lg', weight: "bold", tone: "onSurface", numberOfLines: featured ? 3 : 2, children: article.title }), article.excerpt ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: featured ? 3 : 2, children: article.excerpt })) : null, article.author ? ((0, jsx_runtime_1.jsx)(AuthorBylineV4_1.AuthorBylineV4, { author: article.author, date: article.date, readingTime: article.readingTime, variant: "compact" })) : meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: meta })) : null] }));
    const content = (pressed) => ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: [pressed ? { backgroundColor: (0, state_v4_1.pressFill)(theme) } : null, style], children: body }));
    if (!onPress)
        return content(false);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: article.title, onPress: () => onPress(article), style: { borderRadius: tokens.radius.lg }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=ArticleCardV4.js.map