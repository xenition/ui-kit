import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { BADGE_V4, deliveryWindow, spokenLine, TABULAR } from './internal/menu-v4';
import type { DeliveryEstimateProps, FulfilmentMode } from './DeliveryEstimate';

export interface DeliveryEstimateV4Props extends DeliveryEstimateProps {
  /** Announced and shown in place of the window while it resolves. Default `'Estimating'`. */
  estimatingLabel?: string;
  /** The unit the window is expressed in. Default `'min'`. */
  unit?: string;
}

const MODE_GLYPH: Record<FulfilmentMode, string> = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION: Record<FulfilmentMode, string> = {
  delivery: 'Estimated delivery',
  pickup: 'Ready for pickup',
};

/**
 * **V4 delivery estimate** — same props as {@link DeliveryEstimate} plus
 * `estimatingLabel` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A transposed window is no longer swallowed.** The base tested
 *    `maxMinutes > minMinutes` and dropped the max otherwise, so
 *    `min={35} max={20}` rendered a confident "35 min" and the 20 vanished
 *    without a word. `deliveryWindow()` reads the pair the way round a human
 *    would and renders "20–35 min".
 * 2. **The name it computes lands on an element that has a role.** It built a
 *    careful `"Estimated delivery: 25–35 min"` and hung it on a bare `View`,
 *    which has no role for a reader to stop on, so in the `badge` and `inline`
 *    variants it was announced inconsistently or not at all.
 * 3. **The badge stops being a ramp step.** `tokens.ramps.neutral[100]` is
 *    copied to native without inverting, so the pill was a near-white lozenge
 *    on a dark page. It is the module's one badge shape now.
 * 4. **The figure is tabular and the unit is a prop**, so an ETA that ticks
 *    down does not shuffle sideways and a non-English caller is not stuck with
 *    "min".
 */
export function DeliveryEstimateV4({
  minMinutes,
  maxMinutes,
  mode = 'delivery',
  variant = 'inline',
  caption,
  loading = false,
  estimatingLabel = 'Estimating',
  unit = 'min',
  style,
}: DeliveryEstimateV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const window = deliveryWindow(minMinutes, maxMinutes, unit);
  const timeText = loading ? '—' : window;
  const captionText = caption ?? MODE_CAPTION[mode];
  // Change 2: one name, and it goes on the element that carries the role.
  const name = spokenLine([captionText, loading ? estimatingLabel : window]);

  if (variant === 'badge') {
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={name}
        style={[{ alignSelf: 'flex-start' }, style]}
      >
        <BadgeV4 tone="neutral" variant={BADGE_V4.variant} size={BADGE_V4.size}>
          <IconV4 glyph={MODE_GLYPH[mode]} size="xs" />
          <TextV4 size="xs" weight="semibold" tone="onSurface" style={TABULAR}>
            {timeText}
          </TextV4>
        </BadgeV4>
      </View>
    );
  }

  if (variant === 'card') {
    return (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={name}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: tokens.spacing.md,
          },
          style,
        ]}
      >
        <IconV4 glyph={MODE_GLYPH[mode]} size="xl" />
        <View style={{ flex: 1, minWidth: 0 }}>
          <TextV4 size="lg" weight="bold" tone="onCard" style={TABULAR}>
            {timeText}
          </TextV4>
          <TextV4 size="sm" tone="mutedText">
            {captionText}
          </TextV4>
        </View>
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={name}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      <IconV4 glyph={MODE_GLYPH[mode]} size="sm" />
      <TextV4 size="sm" weight="semibold" tone="onSurface" style={TABULAR}>
        {timeText}
      </TextV4>
      <TextV4 size="sm" tone="mutedText">
        · {captionText}
      </TextV4>
    </View>
  );
}
