import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, PriceTag, Badge } from '../primitives';
import { ConditionBadge } from './ConditionBadge';
import { withAlpha } from './internal';
import { shadow } from '../primitives/internal/elevation';
import type { WatchlistRowProps } from './WatchlistRow';

/** Drop-in alternate of {@link WatchlistRowProps} — identical prop contract. */
export type WatchlistRowV2Props = WatchlistRowProps;

/**
 * WatchlistRow — Design V2: an **elevated media-left tile that leans into the
 * price drop**. A larger thumbnail leads; the title, condition, and price stack
 * in the middle; and when a `compareAtCents` is higher than the current price a
 * success-toned "▼ Save $X" callout announces the drop — the reason a shopper
 * saved the item. The ♥ toggle is a circular tinted button on the trailing
 * edge, kept outside the row press target. `ended` dims the tile and shows a
 * "Sold" badge (state via text + tone). Same props as `WatchlistRow`;
 * token-pure with `withAlpha` tints; elevated surface.
 */
export function WatchlistRowV2({
  title,
  priceCents,
  currency = 'USD',
  compareAtCents,
  imageUrl,
  condition,
  watched = true,
  ended = false,
  onToggleWatch,
  onPress,
  style,
}: WatchlistRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const thumb = 88;
  const dropCents =
    typeof compareAtCents === 'number' && compareAtCents > priceCents ? compareAtCents - priceCents : 0;

  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1, opacity: ended ? 0.6 : 1 }}>
      <View
        style={{
          width: thumb,
          height: thumb,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={{ width: thumb, height: thumb }} resizeMode="cover" />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No photo</Text>
        )}
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {title}
        </Text>
        <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="md" />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
          {ended ? (
            <Badge tone="neutral" variant="soft" size="sm">
              Sold
            </Badge>
          ) : dropCents > 0 ? (
            <Badge tone="success" variant="soft" size="sm">
              {`▼ Save ${new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(dropCents / 100)}`}
            </Badge>
          ) : null}
        </View>
      </View>
    </View>
  );

  const toggle =
    onToggleWatch != null ? (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: watched }}
        accessibilityLabel={watched ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
        onPress={() => onToggleWatch(!watched)}
        hitSlop={8}
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: watched ? withAlpha(colors.danger, 0.12) : withAlpha(colors.muted, 0.1),
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{ fontSize: tokens.typography.scale.lg, color: watched ? colors.danger : colors.muted }}>
          {watched ? '♥' : '♡'}
        </Text>
      </Pressable>
    ) : null;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
        },
        shadow('md', tokens),
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 })}
        >
          {content}
        </Pressable>
      ) : (
        content
      )}
      {toggle}
    </View>
  );
}
