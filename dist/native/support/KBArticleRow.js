"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KBArticleRow = KBArticleRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
const STATUS_LABEL = {
    published: 'Published',
    draft: 'Draft',
    archived: 'Archived',
};
/**
 * A knowledge-base article row for search results / suggested-answers panels —
 * a leading doc glyph, title, category + status, and view/helpful counts.
 * Tapping fires `onPress(id)`; an optional `onInsertLink` lets an agent drop the
 * article link into a reply. Non-published articles carry a text status chip
 * (never color-only). Handles a `loading` placeholder. Token colors only.
 */
function KBArticleRow({ article, onPress, onInsertLink, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading article", style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.md,
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 24, height: 24, borderRadius: 6, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 6 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '65%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '35%', borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.08) } })] })] }));
    }
    const status = article.status ?? 'published';
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Article: ${article.title}${status !== 'published' ? `, ${STATUS_LABEL[status]}` : ''}`, onPress: onPress ? () => onPress(article.id) : undefined, disabled: !onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                backgroundColor: pressed && onPress ? (0, internal_1.withAlpha)(colors.primary, 0.06) : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCC4", size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }, children: article.title }), status !== 'published' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    backgroundColor: (0, internal_1.withAlpha)(colors.muted, 0.16),
                                    borderRadius: tokens.radius.sm,
                                    paddingHorizontal: tokens.spacing.xs,
                                    paddingVertical: 1,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: STATUS_LABEL[status] }) })) : null] }), metaParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaParts.join(' · ') })) : null] }), onInsertLink ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Insert link to ${article.title}`, hitSlop: 8, onPress: () => onInsertLink(article), style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, padding: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD17", size: "sm", color: "primary", accessibilityLabel: "Insert link" }) })) : null] }));
}
//# sourceMappingURL=KBArticleRow.js.map