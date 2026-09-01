"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItemV4 = InventoryItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
const types_1 = require("./types");
const RARITY_LABEL = {
    common: 'Common',
    uncommon: 'Uncommon',
    rare: 'Rare',
    epic: 'Epic',
    legendary: 'Legendary',
};
/**
 * **V4 inventory item** — same props as {@link InventoryItem} plus
 * `rarityLabels`.
 *
 * ## Four changes
 *
 * 1. **The inspect button stops claiming a state it cannot change.** It
 *    announced `accessibilityState={{ selected: item.equipped }}` — and on web
 *    the same control says `aria-pressed={item.equipped}` — so a reader was
 *    told it was a toggle and that the toggle was on. Pressing it inspects the
 *    item; nothing it does can turn that state off. The twins even told
 *    different lies about which kind of toggle it was. It is an action now,
 *    with a name and no state.
 * 2. **A rarity tier is identity, not status.** The frame ran
 *    `muted → success → primary → accent → warn`, so an uncommon sword was
 *    painted in the tone that means "this succeeded" and a legendary one in
 *    the tone that means "be careful". The tier survives as the written label
 *    and as the **weight of the frame**, which is a shape, works in greyscale,
 *    and does not spend three status slots on loot.
 * 3. **The tile clears 44 and presses as a state layer**, rather than sitting
 *    at whatever height its art happened to be and dimming to 0.85 — inside
 *    M3's disabled band.
 * 4. **The art ground is the module's opaque placeholder**, not a translucent
 *    tint of a rarity colour, which was a different colour on every surface it
 *    sat on. The item's name, tier, quantity and equipped state are one spoken
 *    line.
 */
function InventoryItemV4({ item, variant = 'tile', rarityLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const row = variant === 'row';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const artSize = row ? tokens.spacing['2xl'] : tokens.spacing['2xl'] + tokens.spacing.md;
    /** The card's pressed state layer, or nothing — never a dimmed content. */
    const pressGround = (pressed) => pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent';
    const rarityText = item.rarity
        ? (rarityLabels?.[item.rarity] ?? RARITY_LABEL[item.rarity])
        : null;
    // Change 2: the tier as a shape. Two steps, off `rarityRank`, so a rare or
    // better item reads as framed without any colour carrying the tier.
    const frame = (0, types_1.rarityRank)(item.rarity) >= 2 ? 2 : 1;
    const stack = item.quantity != null && item.quantity > 1 ? `×${item.quantity}` : null;
    const art = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: artSize,
            height: artSize,
            borderRadius: tokens.radius.md,
            borderWidth: frame,
            borderColor: colors.border,
            backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }, children: [item.imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.imageUrl }, accessibilityIgnoresInvertColors: true, style: { width: artSize, height: artSize } })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xl", tone: "onCard", children: item.glyph ?? '🎁' })), stack ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    right: tokens.spacing.xs / 2,
                    bottom: tokens.spacing.xs / 2,
                }, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, children: stack }) })) : null] }));
    const label = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            gap: tokens.spacing.xs / 2,
            flex: row ? 1 : undefined,
            minWidth: 0,
            alignItems: row ? 'flex-start' : 'center',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onCard", numberOfLines: 1, align: row ? 'auto' : 'center', children: item.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [rarityText ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "mutedText", children: rarityText })) : null, item.equipped ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: "success", children: "Equipped" })) : null] })] }));
    const inner = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: row
            ? {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: tap,
                borderRadius: tokens.radius.md,
                backgroundColor: pressGround(pressed),
            }
            : {
                gap: tokens.spacing.xs,
                alignItems: 'center',
                minHeight: tap,
                borderRadius: tokens.radius.md,
                backgroundColor: pressGround(pressed),
            }, children: [art, label] }));
    const name = (0, arcade_v4_1.spokenLine)([item.name, rarityText, stack, item.equipped ? 'Equipped' : null]);
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: style, children: inner(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(item), style: style, children: ({ pressed }) => inner(pressed) }));
}
//# sourceMappingURL=InventoryItemV4.js.map