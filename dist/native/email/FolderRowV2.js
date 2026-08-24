"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderRowV2 = FolderRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const tint_1 = require("./tint");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * FolderRow — design V2. A **tile**: a large folder glyph on a soft tinted
 * chip, the name beneath, and the unread count as a corner `Badge`. The
 * `selected` state raises the tile (shadow + primary border) and reports
 * `selected` to a11y so it isn't color-alone. Same props as `FolderRow` — the
 * `depth` indent still applies. No literal colors.
 */
function FolderRowV2({ name, glyph, count = 0, selected = false, depth = 0, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const indent = Math.max(0, depth) * tokens.spacing.lg;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${count > 0 ? `, ${count} unread` : ''}`, accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => [
            {
                margin: tokens.spacing.xs,
                marginLeft: tokens.spacing.xs + indent,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1.5,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? (0, tint_1.withAlpha)(colors.primary, 0.08) : pressed ? colors.border : colors.surface,
                gap: tokens.spacing.sm,
                ...(0, elevation_1.shadow)(selected ? 'md' : 'none', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 40,
                            height: 40,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: selected ? (0, tint_1.withAlpha)(colors.primary, 0.16) : (0, tint_1.withAlpha)(colors.onSurface, 0.06),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph ?? '📁', size: "lg", color: selected ? 'primary' : 'muted' }) }), count > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: selected ? 'primary' : 'neutral', variant: selected ? 'solid' : 'soft', size: "sm", children: count > 999 ? '999+' : String(count) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: selected ? colors.primaryText : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: selected ? '700' : '600',
                }, children: name })] }));
}
//# sourceMappingURL=FolderRowV2.js.map