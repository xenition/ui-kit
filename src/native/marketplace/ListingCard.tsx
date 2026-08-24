import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, PriceTag, formatMoney } from '../primitives';
import { ConditionBadge } from './ConditionBadge';
import { withAlpha, type Condition } from './internal';

/** Layout treatment of the card. */
export type ListingCardVariant = 'grid' | 'list' | 'featured';

export interface ListingCardProps {
  /** Listing headline. */
  title: string;
  /** Asking price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Optional struck "was" price in cents (higher than `priceCents`). */
  compareAtCents?: number;
  /** Hero image URI. Omit for a token-styled placeholder. */
  imageUrl?: string;
  /** Item condition; renders a `ConditionBadge` when set. */
  condition?: Condition;
  /** Short location / seller line (e.g. "Brooklyn · 2mi"). */
  subtitle?: string;
  /** Whether the current user is watching this listing (drives the ♥ chip). */
  watched?: boolean;
  /** Fires when the watch chip is tapped (kept out of the card press target). */
  onToggleWatch?: (next: boolean) => void;
  /** Fires when the card body is pressed (open detail). */
  onPress?: () => void;
  /** Layout variant. Default `grid`. */
  variant?: ListingCardVariant;
  /** Renders a token placeholder recap instead of data. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single marketplace listing summary — hero media, price (with optional
 * compare-at), title, condition chip, and a location/seller line, plus an
 * optional ♥ watch toggle. Presentational: shaped data + callbacks only,
 * nothing fetches. `grid` (default) stacks media over text, `list` is a compact
 * horizontal row, `featured` enlarges the media. Colors come exclusively from
 * the compiled theme via `useXenitionTheme()`; tints use a token-derived alpha.
 * Pass `loading` for a recap.
 */
export function ListingCard({
  title,
  priceCents,
  currency = 'USD',
  compareAtCents,
  imageUrl,
  condition,
  subtitle,
  watched = false,
  onToggleWatch,
  onPress,
  variant = 'grid',
  loading = false,
  style,
}: ListingCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const horizontal = variant === 'list';
  const mediaSize = variant === 'featured' ? 220 : horizontal ? 96 : 160;

  const watchChip =
    onToggleWatch != null ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={watched ? `Unwatch ${title}` : `Watch ${title}`}
        accessibilityState={{ selected: watched }}
        onPress={() => onToggleWatch(!watched)}
        hitSlop={8}
        style={{
          position: 'absolute',
          top: tokens.spacing.sm,
          right: tokens.spacing.sm,
          width: 32,
          height: 32,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.surface, 0.85),
        }}
      >
        <Text style={{ fontSize: tokens.typography.scale.base, color: watched ? colors.danger : colors.muted }}>
          {watched ? '♥' : '♡'}
        </Text>
      </Pressable>
    ) : null;

  const media = (
    <View
      style={{
        width: horizontal ? mediaSize : '100%',
        height: mediaSize,
        borderRadius: tokens.radius.md,
        overflow: 'hidden',
        backgroundColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No photo</Text>
      )}
      {horizontal ? null : watchChip}
    </View>
  );

  const info = (
    <View style={{ flex: 1, gap: 2, justifyContent: 'center' }}>
      {loading ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Loading listing…</Text>
      ) : (
        <>
          <PriceTag cents={priceCents} currency={currency} compareAtCents={compareAtCents} size={variant === 'featured' ? 'lg' : 'md'} />
          <Text
            numberOfLines={2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {condition ? <ConditionBadge condition={condition} size="sm" /> : null}
            {subtitle ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, flexShrink: 1 }}>
                {subtitle}
              </Text>
            ) : null}
          </View>
        </>
      )}
    </View>
  );

  const body = (
    <View
      style={[
        {
          flexDirection: horizontal ? 'row' : 'column',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      {media}
      {info}
      {horizontal ? watchChip : null}
    </View>
  );

  if (!onPress) return body;
  const priceLabel = formatMoney(priceCents, currency);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${priceLabel}${condition ? `, ${condition}` : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {body}
    </Pressable>
  );
}
