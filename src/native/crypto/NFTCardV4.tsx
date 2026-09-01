import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { NetworkBadgeV4 } from './NetworkBadgeV4';
import { skeletonFill, spokenLine } from './internal/market-v4';
import { formatToken } from './internal/format';
import type { NFTCardProps } from './NFTCard';

export interface NFTCardV4Props extends NFTCardProps {
  /** Announced while the artwork loads. Default `'Loading artwork'`. */
  loadingLabel?: string;
  /** Caption over the floor price. Default `'Floor'`. */
  floorLabel?: string;
}

/** The `list` variant's thumbnail edge, and the `grid` variant's media height. */
const THUMB_STEPS = 4;
const MEDIA_STEPS = 10;

/**
 * **V4 collectible tile** — same props as {@link NFTCard} plus `loadingLabel`
 * and `floorLabel`.
 *
 * ## Four changes
 *
 * 1. **The skeleton is visible.** The base painted `colors.border` at 50%
 *    opacity inside a `ramps.neutral[100]` well — two near-identical greys, so
 *    the only thing separating "loading" from "loaded, no image" was the pulse.
 *    It is now the shared opaque skeleton mix against the well's own ground.
 * 2. **A floor price never prints without its unit.** `floorSymbol` is
 *    optional and had no fallback, so a tile could show a bare `0.5` — a
 *    number a user has to guess the denomination of on a screen that exists to
 *    compare prices. With no symbol the floor is omitted rather than
 *    misreported.
 * 3. **The tile announces itself once, with the price in it.** The base's name
 *    was `"Punk #4231, CryptoPunks"` — the collection and nothing else. The
 *    chain and the floor now join it.
 * 4. **A press is a state layer**, not `opacity: 0.85`, and the card takes the
 *    same `outlined` variant its web twin does.
 */
export function NFTCardV4({
  name,
  collection,
  image,
  floorAmount,
  floorSymbol,
  floorDecimals = 3,
  network,
  variant = 'grid',
  loading = false,
  loadingLabel = 'Loading artwork',
  floorLabel = 'Floor',
  onPress,
  style,
}: NFTCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const isList = variant === 'list';
  const thumb = tokens.spacing.md * THUMB_STEPS;
  const mediaHeight = tokens.spacing.md * MEDIA_STEPS;

  // A quantity with no unit is not a price. `floorSymbol` carries the unit and
  // has no default, so an amount without one is dropped rather than guessed at.
  const floorText =
    floorAmount != null && floorSymbol != null && floorSymbol !== ''
      ? formatToken(floorAmount, { decimals: floorDecimals, symbol: floorSymbol })
      : null;

  const media = (
    <View
      style={{
        width: isList ? thumb : '100%',
        height: isList ? thumb : mediaHeight,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <View
          accessible
          accessibilityLabel={loadingLabel}
          // Opaque, and mixed against the well it sits in — the base's
          // translucent hairline colour was the same grey as the well.
          style={{ width: '100%', height: '100%', backgroundColor: skeletonFill(theme) }}
        />
      ) : image != null ? (
        <Image
          source={{ uri: image }}
          accessibilityLabel={name}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <TextV4 size="xs" tone="mutedText">
          No image
        </TextV4>
      )}
    </View>
  );

  const meta = (
    <View
      style={{
        flex: isList ? 1 : undefined,
        gap: tokens.spacing.xs,
        marginTop: isList ? 0 : tokens.spacing.sm,
      }}
    >
      {collection != null ? (
        <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
          {collection}
        </TextV4>
      ) : null}
      <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
        {name}
      </TextV4>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        {network != null ? <NetworkBadgeV4 name={network} size="sm" /> : <View />}
        {floorText != null ? (
          <View style={{ alignItems: 'flex-end' }}>
            <TextV4 size="xs" tone="mutedText">
              {floorLabel}
            </TextV4>
            <TextV4 size="sm" weight="semibold" tone="onSurface" numeric="tabular">
              {floorText}
            </TextV4>
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

  const spoken = spokenLine([
    name,
    collection,
    network,
    floorText != null ? `${floorLabel} ${floorText}` : null,
  ]);

  return (
    <CardV4 variant="outlined" padding="sm" style={style}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spoken}
          onPress={onPress}
          style={({ pressed }) => ({
            borderRadius: tokens.radius.md,
            backgroundColor: pressed
              ? pressOver(theme, colors.surface, colors.onSurface)
              : 'transparent',
          })}
        >
          {inner}
        </Pressable>
      ) : (
        inner
      )}
    </CardV4>
  );
}
