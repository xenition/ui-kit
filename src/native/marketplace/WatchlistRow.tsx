import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, PriceTag, Badge } from '../primitives';
import { ConditionBadge } from './ConditionBadge';
import type { Condition } from './internal';

export interface WatchlistRowProps {
  /** Listing title. */
  title: string;
  /** Current price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional prior price in cents; struck when higher than `priceCents`. */
  compareAtCents?: number;
  /** Thumbnail image URI. Omit for a token placeholder. */
  imageUrl?: string;
  /** Item condition; renders a small `ConditionBadge`. */
  condition?: Condition;
  /** Whether the item is currently watched (drives the ♥ toggle). Default `true`. */
  watched?: boolean;
  /** Marks the item as sold/unavailable → a neutral badge + dimmed row. */
  ended?: boolean;
  /** Fires when the watch toggle is pressed (kept out of the row press target). */
  onToggleWatch?: (next: boolean) => void;
  /** Fires when the row body is pressed (open detail). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A row in a saved / watchlist screen — thumbnail, title, price (with optional
 * compare-at drop), a condition chip, and a ♥ watch toggle. The toggle sits
 * outside the row's press target so un-watching never also navigates.
 * Presentational: shaped data + callbacks only. `ended` dims the row and shows
 * a "Sold" badge (state via text + tone, not color alone). Reuses `PriceTag`,
 * `Badge`, and `ConditionBadge`; token-only colors via `useXenitionTheme()`.
 */
export function WatchlistRow({
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
}: WatchlistRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const thumb = 64;

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
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size="sm" />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
          {ended ? (
            <Badge tone="neutral" variant="soft" size="sm">
              Sold
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
        style={({ pressed }) => ({ padding: tokens.spacing.xs, opacity: pressed ? 0.7 : 1 })}
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
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
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
