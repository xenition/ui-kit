import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Badge, Icon, useXenitionTheme } from '../primitives';
import { rarityColorKey, withAlpha, type GameItem } from './types';

export type InventoryItemVariant = 'tile' | 'row';

const RARITY_LABEL: Record<NonNullable<GameItem['rarity']>, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export interface InventoryItemProps {
  /** The item to render. */
  item: GameItem;
  /**
   * - `tile` — square art slot with a rarity ring (default, for a grid).
   * - `row`  — art left, name + rarity right (for a list).
   */
  variant?: InventoryItemVariant;
  /** Called when the item is tapped — inspect / open. */
  onPress?: (item: GameItem) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An inventory / loadout item — art (or a glyph), a rarity-tinted frame + label
 * (rarity is shown as text, not color alone), an equipped marker, and a stack
 * `×N` quantity badge. The rarity accent resolves to a semantic token via
 * {@link rarityColorKey}. `onPress(item)` inspects it. Composes `Badge`,
 * `Icon`. Token-only.
 */
export function InventoryItem({
  item,
  variant = 'tile',
  onPress,
  style,
}: InventoryItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const row = variant === 'row';
  const accent = colors[rarityColorKey(item.rarity)];
  const rarityLabel = item.rarity ? RARITY_LABEL[item.rarity] : undefined;
  const artSize = row ? 48 : 64;

  const art = (
    <View
      style={{
        width: artSize,
        height: artSize,
        borderRadius: tokens.radius.md,
        borderWidth: 2,
        borderColor: accent,
        backgroundColor: withAlpha(accent, 0.14),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} accessibilityIgnoresInvertColors style={{ width: artSize, height: artSize }} />
      ) : (
        <Icon glyph={item.glyph ?? '🎁'} size="xl" color={rarityColorKey(item.rarity)} />
      )}
      {item.quantity != null && item.quantity > 1 ? (
        <View style={{ position: 'absolute', right: 2, bottom: 2 }}>
          <Badge tone="neutral" variant="solid" size="sm">
            {`×${item.quantity}`}
          </Badge>
        </View>
      ) : null}
    </View>
  );

  const label = (
    <View style={{ gap: 2, flex: row ? 1 : undefined, alignItems: row ? 'flex-start' : 'center' }}>
      <Text
        numberOfLines={1}
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: '600',
          textAlign: row ? 'left' : 'center',
        }}
      >
        {item.name}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {rarityLabel ? (
          <Text style={{ color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{rarityLabel}</Text>
        ) : null}
        {item.equipped ? (
          <Badge tone="success" variant="soft" size="sm">
            Equipped
          </Badge>
        ) : null}
      </View>
    </View>
  );

  const inner = row ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {art}
      {label}
    </View>
  ) : (
    <View style={{ gap: tokens.spacing.xs, alignItems: 'center' }}>
      {art}
      {label}
    </View>
  );

  const a11y = `${item.name}${rarityLabel ? `, ${rarityLabel}` : ''}${item.equipped ? ', equipped' : ''}`;

  if (!onPress) {
    return (
      <View style={style} accessible accessibilityLabel={a11y}>
        {inner}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      accessibilityState={{ selected: item.equipped }}
      onPress={() => onPress(item)}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style]}
    >
      {inner}
    </Pressable>
  );
}
