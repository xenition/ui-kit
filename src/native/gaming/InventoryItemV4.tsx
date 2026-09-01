import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, IDENTITY_TONE, placeholderGround, spokenLine } from './internal/arcade-v4';
import { rarityRank, type ItemRarity } from './types';
import type { InventoryItemProps } from './InventoryItem';

export interface InventoryItemV4Props extends InventoryItemProps {
  /** Rarity wording. Each key defaults to the base's own copy. */
  rarityLabels?: Partial<Record<ItemRarity, string>>;
}

const RARITY_LABEL: Record<ItemRarity, string> = {
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
export function InventoryItemV4({
  item,
  variant = 'tile',
  rarityLabels,
  onPress,
  style,
}: InventoryItemV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const row = variant === 'row';
  const tap = minTap(tokens.spacing);
  const artSize = row ? tokens.spacing['2xl'] : tokens.spacing['2xl'] + tokens.spacing.md;

  /** The card's pressed state layer, or nothing — never a dimmed content. */
  const pressGround = (pressed: boolean): string =>
    pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent';

  const rarityText = item.rarity
    ? (rarityLabels?.[item.rarity] ?? RARITY_LABEL[item.rarity])
    : null;
  // Change 2: the tier as a shape. Two steps, off `rarityRank`, so a rare or
  // better item reads as framed without any colour carrying the tier.
  const frame = rarityRank(item.rarity) >= 2 ? 2 : 1;
  const stack = item.quantity != null && item.quantity > 1 ? `×${item.quantity}` : null;

  const art = (
    <View
      style={{
        width: artSize,
        height: artSize,
        borderRadius: tokens.radius.md,
        borderWidth: frame,
        borderColor: colors.border,
        backgroundColor: placeholderGround(theme),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          accessibilityIgnoresInvertColors
          style={{ width: artSize, height: artSize }}
        />
      ) : (
        <TextV4 size="xl" tone="onCard">
          {item.glyph ?? '🎁'}
        </TextV4>
      )}
      {stack ? (
        <View
          style={{
            position: 'absolute',
            right: tokens.spacing.xs / 2,
            bottom: tokens.spacing.xs / 2,
          }}
        >
          <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE}>
            {stack}
          </BadgeV4>
        </View>
      ) : null}
    </View>
  );

  const label = (
    <View
      style={{
        gap: tokens.spacing.xs / 2,
        flex: row ? 1 : undefined,
        minWidth: 0,
        alignItems: row ? 'flex-start' : 'center',
      }}
    >
      <TextV4
        size="sm"
        weight="semibold"
        tone="onCard"
        numberOfLines={1}
        align={row ? 'auto' : 'center'}
      >
        {item.name}
      </TextV4>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {rarityText ? (
          <TextV4 size="xs" weight="bold" tone="mutedText">
            {rarityText}
          </TextV4>
        ) : null}
        {item.equipped ? (
          <BadgeV4 {...BADGE_V4} tone="success">
            Equipped
          </BadgeV4>
        ) : null}
      </View>
    </View>
  );

  const inner = (pressed: boolean): React.ReactElement => (
    <View
      style={
        row
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
            }
      }
    >
      {art}
      {label}
    </View>
  );

  const name = spokenLine([item.name, rarityText, stack, item.equipped ? 'Equipped' : null]);

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name} style={style}>
        {inner(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={() => onPress(item)}
      style={style}
    >
      {({ pressed }) => inner(pressed)}
    </Pressable>
  );
}
