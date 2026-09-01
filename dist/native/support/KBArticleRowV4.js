"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KBArticleRowV4 = KBArticleRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
// published → success, draft → warn, archived → muted. Each has a distinct glyph
// so status is never color-only.
const STATUS = {
    published: { slot: 'success', glyph: '✓', label: 'Published' },
    draft: { slot: 'warn', glyph: '✎', label: 'Draft' },
    archived: { slot: 'muted', glyph: '⌷', label: 'Archived' },
};
/**
 * KBArticleRow — **V4** "calm console" design. A knowledge-base article row as an
 * elevated rounded card: a leading doc glyph disc, title, a soft-tint status pill
 * carrying glyph + label (published→success, draft→warn, archived→muted — never
 * color alone), and a category · views · helpful meta hint. Tapping fires
 * `onPress(id)`; an optional `onInsertLink` gets its own ≥44px affordance that
 * does not bubble. Press paints a soft-primary tint. Same props/behavior as
 * {@link KBArticleRowProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
function KBArticleRowV4({ article, onPress, onInsertLink, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cardBase = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        padding: tokens.spacing.md,
        minHeight: 44,
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading article", style: [cardBase, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 36, height: 36, borderRadius: 18, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 6 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '65%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '35%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08) } })] })] }));
    }
    const status = article.status ?? 'published';
    const spec = STATUS[status] ?? STATUS.published;
    const statusColor = colors[spec.slot];
    const views = typeof article.views === 'number' && article.views >= 0 ? article.views : undefined;
    const helpful = typeof article.helpful === 'number' && article.helpful >= 0 ? article.helpful : undefined;
    const metaParts = [];
    if (article.category)
        metaParts.push(article.category);
    if (views !== undefined)
        metaParts.push(`${views} views`);
    if (helpful !== undefined)
        metaParts.push(`${helpful} helpful`);
    if (article.updatedLabel)
        metaParts.push(article.updatedLabel);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Article: ${article.title}, ${spec.label}`, onPress: onPress ? () => onPress(article.id) : undefined, disabled: !onPress, style: ({ pressed }) => [
            cardBase,
            { backgroundColor: pressed && onPress ? (0, internal_1.withAlpha)(colors.primary, 0.1) : colors.card },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.12),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: "\uD83D\uDCC4" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }, children: article.title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 4,
                                    paddingHorizontal: tokens.spacing.sm,
                                    paddingVertical: 2,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: (0, internal_1.withAlpha)(statusColor, 0.12),
                                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs }, children: spec.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: spec.label })] })] }), metaParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaParts.join(' · ') })) : null] }), onInsertLink ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Insert link to ${article.title}`, hitSlop: 8, onPress: () => onInsertLink(article), style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: pressed ? (0, internal_1.withAlpha)(colors.primary, 0.1) : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: "\uD83D\uDD17" }) })) : null] }));
}
//# sourceMappingURL=KBArticleRowV4.js.map