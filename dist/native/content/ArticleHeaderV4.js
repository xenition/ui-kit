"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleHeaderV4 = ArticleHeaderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const AuthorBylineV4_1 = require("./AuthorBylineV4");
const CategoryChipV4_1 = require("./CategoryChipV4");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * The line box a display headline occupies, as a ratio of its own step.
 *
 * One ratio, so the skeleton is the height of the headline it is standing in
 * for. The web twin wrote `44` and `36` as literals and this twin derived its
 * own number, so the *same* variant drew two different placeholders and the
 * page jumped by a different amount on each platform when the article landed.
 */
const TITLE_LEADING = 1.3;
/**
 * **V4 article masthead** — same props as {@link ArticleHeader} plus
 * `loadingLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is the shape of the headline it replaces.** Both twins now
 *    derive the placeholder's height from the type scale times one shared
 *    leading ratio, instead of one twin measuring and the other guessing.
 * 2. **The loading state says what is loading**, once, politely — the base
 *    showed a silent stack of grey blocks.
 * 3. **The hero and cover placeholders take the shared media ground**, not
 *    `colors.border`, which is the hairline token.
 * 4. **The deck and the meta line take `mutedText`**, the contrast-corrected
 *    slot, rather than the `muted` fill they were set in.
 *
 * **Renders nothing without a title** (§4.5).
 */
function ArticleHeaderV4({ title, deck, category, coverImageUrl, author, date, readingTime, variant = 'standard', loading = false, loadingLabel = 'Loading article', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const hero = variant === 'hero';
    const titleSize = hero ? tokens.typography.scale['3xl'] : tokens.typography.scale['2xl'];
    const coverHeight = tokens.spacing['2xl'] * 4 + tokens.spacing.lg;
    const heroHeight = tokens.spacing['2xl'] * 5 + tokens.spacing.md;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, accessibilityLiveRegion: "polite", style: [{ gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: tokens.spacing['2xl'] * 2, height: tokens.spacing.lg }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "90%", height: titleSize * TITLE_LEADING }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "70%", height: titleSize * TITLE_LEADING }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: "100%", height: hero ? heroHeight : coverHeight }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: tokens.spacing['2xl'] * 4, height: (0, chrome_v4_1.minTap)(tokens.spacing) })] }));
    }
    if (!title)
        return null;
    const meta = (0, reading_v4_1.metaLine)([date, readingTime]);
    const cover = (height) => ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: coverImageUrl }, accessibilityIgnoresInvertColors: true, style: {
            width: '100%',
            height,
            borderRadius: tokens.radius.lg,
            backgroundColor: (0, reading_v4_1.mediaGround)(theme),
        }, resizeMode: "cover" }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.md }, style], children: [coverImageUrl && !hero ? cover(coverHeight) : null, category ? (0, jsx_runtime_1.jsx)(CategoryChipV4_1.CategoryChipV4, { label: category, variant: hero ? 'solid' : 'soft' }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: hero ? '3xl' : '2xl', weight: "bold", tone: "onSurface", measure: true, children: title }), deck ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: "mutedText", measure: true, children: deck })) : null, coverImageUrl && hero ? cover(heroHeight) : null, author ? ((0, jsx_runtime_1.jsx)(AuthorBylineV4_1.AuthorBylineV4, { author: author, date: date, readingTime: readingTime, variant: "full" })) : meta ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: meta })) : null] }));
}
//# sourceMappingURL=ArticleHeaderV4.js.map