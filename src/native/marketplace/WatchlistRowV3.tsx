import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, PriceTag, Badge } from '../primitives';
import { ConditionBadge } from './ConditionBadge';
import { withAlpha } from './internal';
import type { WatchlistRowProps } from './WatchlistRow';

/** Drop-in alternate of {@link WatchlistRowProps} — identical prop contract. */
export type WatchlistRowV3Props = WatchlistRowProps;

/**
 * WatchlistRow — Design V3: an **ultra-minimal list line**. A small rounded
 * thumbnail leads, the title takes a single line, and the price is right-aligned
 * as a trailing stack with a compact ♥ toggle — separation comes from a single
 * bottom hairline, no card border or fill. Built for long, dense saved-item
 * lists. The toggle stays outside the row press target; `ended` dims the line
 * and appends a "Sold" badge (state via text + tone). Same props as
 * `WatchlistRow`; token-pure with `withAlpha` tints.
 */
export function WatchlistRowV3({
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
}: WatchlistRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const thumb = 44;

  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1, opacity: ended ? 0.6 : 1 }}>
      <View
        style={{
          width: thumb,
          height: thumb,
          borderRadius: tokens.radius.sm,
          overflow: 'hidden',
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={{ width: thumb, height: thumb }} resizeMode="cover" />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>—</Text>
        )}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        {condition && !ended ? (
          <View style={{ flexDirection: 'row' }}>
            <ConditionBadge condition={condition} size="sm" />
          </View>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="sm" />
        {ended ? (
          <Badge tone="neutral" variant="soft" size="sm">
            Sold
          </Badge>
        ) : null}
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
        style={({ pressed }) => ({ paddingLeft: tokens.spacing.sm, opacity: pressed ? 0.6 : 1 })}
      >
        <Text style={{ fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }}>
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
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
          borderBottomWidth: 1,
          borderBottomColor: withAlpha(colors.border, 0.6),
          backgroundColor: 'transparent',
        },
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
