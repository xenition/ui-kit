"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorBylineV2 = AuthorBylineV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * AuthorByline — **enclosed author chip** alternate design.
 *
 * The credit sits inside a soft primary-tinted rounded card: avatar, then a
 * "Written by" label over the name, with role and date/read-time on a meta line.
 * A contained attribution block versus the v1 bare row. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: the fill/border are `withAlpha(colors.primary, …)`, the label is
 * `colors.primaryText`. No literal colors.
 */
function AuthorBylineV2({ author, date, readingTime, variant = 'full', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const meta = [date, readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `By ${author.name}${author.role ? `, ${author.role}` : ''}${meta ? `, ${meta}` : ''}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                borderColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: author.avatarUrl, name: author.name, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, gap: 1 }, children: [!compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.primaryText,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '800',
                            letterSpacing: 0.6,
                            textTransform: 'uppercase',
                        }, children: "Written by" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: author.name }), (author.role || meta) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [author.role, meta].filter(Boolean).join('  ·  ') })) : null] })] }));
}
//# sourceMappingURL=AuthorBylineV2.js.map