import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { NetworkBadge } from './NetworkBadge';
import { usePressScale } from '../primitives/internal/motion';
import { formatToken } from './internal/format';
import type { NFTCardProps } from './NFTCard';

/** Same public contract as {@link NFTCard} — a drop-in alternate design. */
export type NFTCardV3Props = NFTCardProps;

/**
 * NFTCard, redesigned (v3): a **grid tile with a bottom info strip**. The artwork
 * runs flush to the top corners as a square; a flat filled strip (neutral ramp)
 * below it — separated by a hairline — carries the name and, on its own line, the
 * collection with a right-aligned floor (fixed precision — no float drift). No
 * overlay, no shadow: a clean gallery tile that tessellates in a grid. Distinct
 * at a glance from v1's outlined card and v2's full-bleed scrim. Same props;
 * handles `loading` and a missing image.
 */
export function NFTCardV3({
  name,
  collection,
  image,
  floorAmount,
  floorSymbol,
  floorDecimals = 3,
  network,
  loading = false,
  onPress,
  style,
}: NFTCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const body = (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ width: '100%', aspectRatio: 1, backgroundColor: tokens.ramps.neutral[100], alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <View accessibilityLabel="Loading artwork" style={{ width: '100%', height: '100%', backgroundColor: colors.border, opacity: 0.5 }} />
        ) : image != null ? (
          <Image source={{ uri: image }} accessibilityLabel={name} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No image</Text>
        )}
      </View>

      {/* Bottom info strip — flat neutral fill, hairline separated. */}
      <View
        style={{
          gap: tokens.spacing.xs,
          padding: tokens.spacing.sm,
          backgroundColor: tokens.ramps.neutral[100],
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
        >
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          {network != null ? (
            <NetworkBadge name={network} size="sm" />
          ) : collection != null ? (
            <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {collection}
            </Text>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {floorAmount != null ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }}>
              {formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={collection ? `${name}, ${collection}` : name}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
