"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItem = InventoryItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const RARITY_LABEL = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
};
/**
 * An inventory / loadout item — art (or a glyph), a rarity-tinted frame + label
 * (rarity is shown as text, not color alone), an equipped marker, and a stack
 * `×N` quantity badge. The rarity accent resolves to a semantic token via
 * {@link rarityColorKey}. `onPress(item)` inspects it. Composes `Badge`,
 * `Icon`. Token-only.
 */
function InventoryItem({ item, variant = 'tile', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const row = variant === 'row';
    const accent = colors[(0, types_1.rarityColorKey)(item.rarity)];
    const rarityLabel = item.rarity ? RARITY_LABEL[item.rarity] : undefined;
    const artSize = row ? 48 : 64;
    const art = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: artSize,
            height: artSize,
            borderRadius: tokens.radius.md,
            borderWidth: 2,
            borderColor: accent,
            backgroundColor: (0, types_1.withAlpha)(accent, 0.14),
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }, children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.imageUrl }, accessibilityIgnoresInvertColors: true, style: { width: artSize, height: artSize } })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: item.glyph ?? '🎁', size: "xl", color: (0, types_1.rarityColorKey)(item.rarity) })), item.quantity != null && item.quantity > 1 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', right: 2, bottom: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "solid", size: "sm", children: `×${item.quantity}` }) })) : null] }));
    const label = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, flex: row ? 1 : undefined, alignItems: row ? 'flex-start' : 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    textAlign: row ? 'left' : 'center',
                }, children: item.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [rarityLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: rarityLabel })) : null, item.equipped ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: "Equipped" })) : null] })] }));
    const inner = row ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [art, label] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, alignItems: 'center' }, children: [art, label] }));
    const a11y = `${item.name}${rarityLabel ? `, ${rarityLabel}` : ''}${item.equipped ? ', equipped' : ''}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, accessible: true, accessibilityLabel: a11y, children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, accessibilityState: { selected: item.equipped }, onPress: () => onPress(item), style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style], children: inner }));
}
//# sourceMappingURL=InventoryItem.js.map