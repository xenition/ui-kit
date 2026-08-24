import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon } from '../primitives';
import { withAlpha } from './internal';

export type CategoryTileVariant = 'tile' | 'chip';

export interface CategoryTileProps {
  /** Category label. */
  label: string;
  /** Emoji/unicode glyph rendered in the icon slot. */
  glyph?: string;
  /** Optional listing count shown under the label. */
  count?: number;
  /** Marks the tile as the active/selected filter. */
  selected?: boolean;
  /** Fires when the tile is pressed. */
  onPress?: () => void;
  /** `tile` (default) is a square block; `chip` is a compact horizontal pill. */
  variant?: CategoryTileVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tappable category entry for a marketplace browse grid — an icon glyph, a
 * label, and an optional listing count. `tile` (default) stacks the glyph over
 * the label as a square block; `chip` lays them out inline as a pill. The
 * `selected` state is carried by an accent ring + tinted surface and the a11y
 * selected state (never color alone). Reuses `Icon`; token-only colors with a
 * token-derived alpha tint.
 */
export function CategoryTile({
  label,
  glyph,
  count,
  selected = false,
  onPress,
  variant = 'tile',
  style,
}: CategoryTileProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const chip = variant === 'chip';

  const countLabel = typeof count === 'number' ? `${count.toLocaleString()} items` : undefined;

  const inner = (
    <View
      style={[
        {
          flexDirection: chip ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: chip ? tokens.spacing.sm : tokens.spacing.xs,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? withAlpha(colors.primary, 0.1) : colors.surface,
          paddingVertical: chip ? tokens.spacing.sm : tokens.spacing.lg,
          paddingHorizontal: chip ? tokens.spacing.md : tokens.spacing.sm,
          minHeight: chip ? undefined : 96,
        },
        style,
      ]}
    >
      {glyph ? <Icon glyph={glyph} size={chip ? 'base' : '2xl'} color={selected ? 'primary' : 'onSurface'} /> : null}
      <View style={{ alignItems: chip ? 'flex-start' : 'center' }}>
        <Text
          numberOfLines={1}
          style={{
            color: selected ? colors.primary : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {label}
        </Text>
        {countLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{countLabel}</Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`${label}${countLabel ? `, ${countLabel}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
