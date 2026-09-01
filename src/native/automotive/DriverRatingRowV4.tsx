import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { ratingParts, skeletonFill } from './internal/fleet-v4';
import type { DriverRatingRowProps } from './DriverRatingRow';

export interface DriverRatingRowV4Props extends DriverRatingRowProps {
  /**
   * Build the accessible name for the group and for each star.
   * Default `'4 out of 5'` / `'Rate 4 of 5 stars'`.
   */
  formatRating?: (value: number, max: number) => string;
  formatStarLabel?: (star: number, max: number) => string;
  /** Shown in place of the value when nothing is rated. Default `'Not rated'`. */
  unratedLabel?: string;
}

/**
 * **V4 driver rating row** — same props as {@link DriverRatingRow} plus three
 * copy hooks.
 *
 * ## Four changes
 *
 * 1. **The read-only form is `RatingV4` with its value showing.** The base
 *    hand-drew five glyphs; the primitive already draws them, and `showValue`
 *    puts the numeral beside them — which is the half a low-vision user reads.
 * 2. **Each interactive star is a real 44pt target.** The base's stars were
 *    laid out at glyph size, so rating a driver on a phone meant hitting a
 *    16pt box. The stars stay visually the same size; the *target* grows.
 * 3. **The skeleton is opaque**, not a translucent wash of `muted` that
 *    borrows whatever is behind it.
 * 4. **The whole group has one accessible name.** The base announced the
 *    read-only form and left the interactive one as five unlabelled presses.
 *
 * **Renders nothing without a `driverName`** (§4.5).
 */
export function DriverRatingRowV4({
  driverName,
  avatarUrl,
  subtitle,
  value = 0,
  max = 5,
  onRate,
  variant = 'interactive',
  loading = false,
  formatRating,
  formatStarLabel,
  unratedLabel = 'Not rated',
  style,
}: DriverRatingRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  if (loading) {
    return (
      <CardV4 style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}>
        <View
          style={{
            width: tokens.spacing['2xl'],
            height: tokens.spacing['2xl'],
            borderRadius: tokens.radius.full,
            backgroundColor: skeletonFill(theme),
          }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View
            style={{
              height: tokens.typography.scale.base,
              width: '50%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View
            style={{
              height: tokens.typography.scale.sm,
              width: '70%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        </View>
      </CardV4>
    );
  }

  if (!driverName) return null;

  const parts = ratingParts({ value, max, format: formatRating });
  const interactive = variant === 'interactive' && Boolean(onRate);
  const starLabel =
    formatStarLabel ?? ((star: number, total: number) => `Rate ${star} of ${total} stars`);

  return (
    <CardV4
      accessible={!interactive}
      accessibilityLabel={
        interactive ? undefined : `${driverName}, ${parts.text ? parts.label : unratedLabel}`
      }
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
    >
      <AvatarV4 src={avatarUrl} name={driverName} size="md" />

      <View style={{ flex: 1 }}>
        <TextV4 face="heading" size="base" weight="bold" tone="onCard" numberOfLines={1}>
          {driverName}
        </TextV4>
        {subtitle ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {subtitle}
          </TextV4>
        ) : null}
      </View>

      {interactive ? (
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel={parts.label}
          style={{ flexDirection: 'row' }}
        >
          {Array.from({ length: parts.total }, (_, i) => {
            const star = i + 1;
            const on = star <= parts.filled;
            return (
              <Pressable
                key={star}
                accessibilityRole="radio"
                accessibilityLabel={starLabel(star, parts.total)}
                accessibilityState={{ selected: on }}
                onPress={() => onRate?.(star)}
                /*
                  The target is 44; the glyph stays small. The base laid the
                  stars out at glyph size, so rating a driver meant hitting a
                  16pt box with a thumb.
                */
                style={({ pressed }) => ({
                  width: tap,
                  height: tap,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: tokens.radius.full,
                  backgroundColor: pressed ? pressFill(theme) : 'transparent',
                })}
              >
                <IconV4
                  name={on ? 'star' : 'star-outline'}
                  size="lg"
                  style={{ color: on ? colors.warnText : colors.mutedText }}
                />
              </Pressable>
            );
          })}
        </View>
      ) : parts.text ? (
        <RatingV4 value={value} max={max} size="sm" showValue />
      ) : (
        <TextV4 size="xs" tone="mutedText">
          {unratedLabel}
        </TextV4>
      )}
    </CardV4>
  );
}
