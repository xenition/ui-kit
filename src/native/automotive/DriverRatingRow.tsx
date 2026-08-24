import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar, Rating } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** Presentation for a {@link DriverRatingRow}. */
export type DriverRatingVariant = 'interactive' | 'readonly';

export interface DriverRatingRowProps {
  /** Driver display name. */
  driverName: string;
  /** Optional driver avatar URL. */
  avatarUrl?: string;
  /** Vehicle / trip subtitle, e.g. `'Toyota Prius · Sep 3'`. */
  subtitle?: string;
  /** Current rating value (0–max). Controls the filled glyph count. */
  value?: number;
  /** Number of stars (default 5). */
  max?: number;
  /**
   * Fires with the chosen star (1–max) when tapped. When omitted the row is
   * read-only regardless of `variant`.
   */
  onRate?: (stars: number) => void;
  /** Presentation variant. `readonly` disables tapping. */
  variant?: DriverRatingVariant;
  /** Placeholder skeleton while data loads. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A rate-your-driver row — the driver identity plus a star control that fires
 * `onRate(stars)` when tapped. Interactive stars are real `Pressable`s with per-
 * star a11y labels and a selected state; when there is no `onRate` (or
 * `variant="readonly"`) it falls back to the read-only `Rating` primitive.
 * Colors come from semantic tokens and `withAlpha` tints — no literal colors.
 * The star count is clamped and indexing is guarded.
 */
export function DriverRatingRow({
  driverName,
  avatarUrl,
  subtitle,
  value = 0,
  max = 5,
  onRate,
  variant = 'interactive',
  loading = false,
  style,
}: DriverRatingRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const total = Math.max(1, Math.floor(Number.isFinite(max) ? max : 5));
  const filled = Math.max(0, Math.min(total, Math.round(Number.isFinite(value) ? value : 0)));
  const interactive = variant === 'interactive' && Boolean(onRate);

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading driver rating"
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: tokens.spacing.md,
          },
          style,
        ]}
      >
        <View style={{ width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.muted, 0.25) }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 14, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.25) }} />
          <View style={{ height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.18) }} />
        </View>
      </View>
    );
  }

  return (
    <View
      accessible={!interactive}
      accessibilityLabel={!interactive ? `${driverName} rated ${filled} of ${total} stars` : undefined}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Avatar src={avatarUrl} name={driverName} size="md" />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {driverName}
        </Text>
        {subtitle ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {subtitle}
          </Text>
        ) : null}
        {interactive ? (
          <View
            accessibilityRole="radiogroup"
            accessibilityLabel={`Rate ${driverName}`}
            style={{ flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}
          >
            {Array.from({ length: total }, (_, i) => {
              const star = i + 1;
              const on = star <= filled;
              return (
                <Pressable
                  key={star}
                  accessibilityRole="radio"
                  accessibilityLabel={`${star} star${star > 1 ? 's' : ''}`}
                  accessibilityState={{ selected: on }}
                  onPress={() => onRate?.(star)}
                  hitSlop={6}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <Text style={{ fontSize: tokens.typography.scale.xl, color: on ? colors.accent : withAlpha(colors.muted, 0.5) }}>
                    {on ? '★' : '☆'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View style={{ marginTop: tokens.spacing.xs }}>
            <Rating value={filled} max={total} size="md" showValue />
          </View>
        )}
      </View>
    </View>
  );
}
