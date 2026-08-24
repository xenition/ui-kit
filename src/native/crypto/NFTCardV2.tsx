import * as React from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { NetworkBadge } from './NetworkBadge';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { formatToken } from './internal/format';
import type { NFTCardProps } from './NFTCard';

/** Same public contract as {@link NFTCard} — a drop-in alternate design. */
export type NFTCardV2Props = NFTCardProps;

/**
 * NFTCard, redesigned (v2): **full-bleed artwork** with a scrim overlay. The
 * image fills the whole tile; a stacked translucent veil at the foot (built from
 * `onSurface` at low alpha, so it stays token-pure and adapts to both themes)
 * lets the collection, name, and floor sit over the art in the paired `surface`
 * text color, and the network chip floats top-right. Floor is fixed-precision
 * (no float drift). Distinct at a glance from v1's media-over-meta stack. Same
 * props; handles `loading` and a missing image.
 */
export function NFTCardV2({
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
}: NFTCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  // Scrim + on-scrim text from the base contrast pair, so it reads in both
  // themes without a literal color: a translucent `onSurface` veil, `surface` ink.
  const veil = withAlpha(colors.onSurface, 0.66);
  const veilSoft = withAlpha(colors.onSurface, 0.28);
  const ink = colors.surface;
  const inkSoft = withAlpha(colors.surface, 0.82);

  const body = (
    <View
      style={[
        {
          height: 220,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100],
          justifyContent: 'flex-end',
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      {loading ? (
        <View
          accessibilityLabel="Loading artwork"
          style={{ ...StyleFill, backgroundColor: colors.border, opacity: 0.5 }}
        />
      ) : image != null ? (
        <Image
          source={{ uri: image }}
          accessibilityLabel={name}
          resizeMode="cover"
          style={StyleFill}
        />
      ) : (
        <View style={{ ...StyleFill, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No image</Text>
        </View>
      )}

      {network != null ? (
        <View style={{ position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }}>
          <NetworkBadge name={network} size="sm" />
        </View>
      ) : null}

      {/* Foot scrim — two stacked veils fake a bottom-up gradient. */}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 96, backgroundColor: veilSoft }}
      />
      <View
        style={{
          gap: 2,
          padding: tokens.spacing.md,
          backgroundColor: veil,
        }}
      >
        {collection != null ? (
          <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
            {collection}
          </Text>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {name}
          </Text>
          {floorAmount != null ? (
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>Floor</Text>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
                {formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })}
              </Text>
            </View>
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
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}

const StyleFill = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' } as const;
