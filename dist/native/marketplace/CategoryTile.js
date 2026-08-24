"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryTile = CategoryTile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * A tappable category entry for a marketplace browse grid — an icon glyph, a
 * label, and an optional listing count. `tile` (default) stacks the glyph over
 * the label as a square block; `chip` lays them out inline as a pill. The
 * `selected` state is carried by an accent ring + tinted surface and the a11y
 * selected state (never color alone). Reuses `Icon`; token-only colors with a
 * token-derived alpha tint.
 */
function CategoryTile({ label, glyph, count, selected = false, onPress, variant = 'tile', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const chip = variant === 'chip';
    const countLabel = typeof count === 'number' ? `${count.toLocaleString()} items` : undefined;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: chip ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: chip ? tokens.spacing.sm : tokens.spacing.xs,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? (0, internal_1.withAlpha)(colors.primary, 0.1) : colors.surface,
                paddingVertical: chip ? tokens.spacing.sm : tokens.spacing.lg,
                paddingHorizontal: chip ? tokens.spacing.md : tokens.spacing.sm,
                minHeight: chip ? undefined : 96,
            },
            style,
        ], children: [glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: chip ? 'base' : '2xl', color: selected ? 'primary' : 'onSurface' }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: chip ? 'flex-start' : 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: selected ? colors.primary : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                        }, children: label }), countLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: countLabel })) : null] })] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected }, accessibilityLabel: `${label}${countLabel ? `, ${countLabel}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=CategoryTile.js.map