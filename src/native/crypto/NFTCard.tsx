import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { NetworkBadge } from './NetworkBadge';
import { formatToken } from './internal/format';

export type NFTCardVariant = 'grid' | 'list';

export interface NFTCardProps {
  /** Item name (e.g. `Punk #4231`). */
  name: string;
  /** Collection name (e.g. `CryptoPunks`). */
  collection?: string;
  /** Artwork image URL. When absent a token-bound placeholder is shown. */
  image?: string;
  /** Floor price amount in native token units. */
  floorAmount?: number;
  /** Native token ticker for the floor price. */
  floorSymbol?: string;
  /** Fraction digits for the floor amount (default `3`). */
  floorDecimals?: number;
  /** Chain name for a {@link NetworkBadge} overlay/footer. */
  network?: string;
  variant?: NFTCardVariant;
  /** Skeleton state while metadata loads. */
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A collectible tile: artwork (or a token-bound `No image` placeholder), name,
 * collection, an optional chain {@link NetworkBadge}, and a floor price
 * (fixed-precision — no float drift). `grid` stacks the media over the meta;
 * `list` places a thumbnail beside it. Handles a `loading` skeleton and a
 * missing image gracefully. Token-bound throughout.
 */
export function NFTCard({
  name,
  collection,
  image,
  floorAmount,
  floorSymbol,
  floorDecimals = 3,
  network,
  variant = 'grid',
  loading = false,
  onPress,
  style,
}: NFTCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isList = variant === 'list';
  const mediaSize = isList ? 64 : undefined;

  const media = (
    <View
      style={{
        width: mediaSize ?? '100%',
        height: mediaSize ?? 160,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: tokens.ramps.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <View
          accessibilityLabel="Loading artwork"
          style={{ width: '100%', height: '100%', backgroundColor: colors.border, opacity: 0.5 }}
        />
      ) : image != null ? (
        <Image source={{ uri: image }} accessibilityLabel={name} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No image</Text>
      )}
    </View>
  );

  const meta = (
    <View style={{ flex: isList ? 1 : undefined, gap: tokens.spacing.xs, marginTop: isList ? 0 : tokens.spacing.sm }}>
      {collection != null ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {collection}
        </Text>
      ) : null}
      <Text
        numberOfLines={1}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
      >
        {name}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        {network != null ? <NetworkBadge name={network} size="sm" /> : <View />}
        {floorAmount != null ? (
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Floor</Text>
            <Text
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }}
            >
              {formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );

  const inner = isList ? (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {media}
      {meta}
    </View>
  ) : (
    <View>
      {media}
      {meta}
    </View>
  );

  return (
    <Card variant="outlined" padding="sm" style={style}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={collection ? `${name}, ${collection}` : name}
          onPress={onPress}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          {inner}
        </Pressable>
      ) : (
        inner
      )}
    </Card>
  );
}
