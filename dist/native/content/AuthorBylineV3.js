"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorBylineV3 = AuthorBylineV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * AuthorByline — **centered stacked** alternate design.
 *
 * A vertically centered credit: the avatar sits on top, the name below it, then
 * the role, then a middot-joined date/read-time line — the layout you see under
 * a centered article title or at the end of a feature. Same props as
 * {@link AuthorByline}, so it is a drop-in swap.
 *
 * Token-pure: name is `colors.onSurface`, role/meta are `colors.muted`. No
 * literal colors.
 */
function AuthorBylineV3({ author, date, readingTime, variant = 'full', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const meta = [date, readingTime]
        .filter((p) => !!p && p.length > 0)
        .join('  ·  ');
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `By ${author.name}${author.role ? `, ${author.role}` : ''}${meta ? `, ${meta}` : ''}`, style: [{ alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: author.avatarUrl, name: author.name, size: compact ? 'md' : 'lg' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                    textAlign: 'center',
                }, children: author.name }), author.role ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: author.role })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: meta })) : null] }));
}
//# sourceMappingURL=AuthorBylineV3.js.map