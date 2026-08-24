import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';

export type DeliveryEstimateVariant = 'inline' | 'badge' | 'card';
export type FulfilmentMode = 'delivery' | 'pickup';

export interface DeliveryEstimateProps {
  /** Low end of the ETA window, in minutes. */
  minMinutes: number;
  /** High end of the ETA window, in minutes. When absent a single value shows. */
  maxMinutes?: number;
  /** Delivery vs. pickup — changes the glyph and default caption. */
  mode?: FulfilmentMode;
  /** Presentation (default `inline`). */
  variant?: DeliveryEstimateVariant;
  /** Caption under/next to the time (default derives from `mode`). */
  caption?: string;
  /** Loading placeholder — shows an em-dash while the ETA resolves. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const MODE_GLYPH: Record<FulfilmentMode, string> = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION: Record<FulfilmentMode, string> = {
  delivery: 'Estimated delivery',
  pickup: 'Ready for pickup',
};

/**
 * A compact ETA readout — "25–35 min" with a mode glyph and caption. `variant`
 * renders it inline (glyph + text), as a token-tinted `badge` pill, or as a
 * bordered `card`. `loading` shows an em-dash placeholder. The window text is
 * built defensively so a missing `maxMinutes` collapses to a single value.
 * Token-only.
 */
export function DeliveryEstimate({
  minMinutes,
  maxMinutes,
  mode = 'delivery',
  variant = 'inline',
  caption,
  loading = false,
  style,
}: DeliveryEstimateProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const window =
    typeof maxMinutes === 'number' && maxMinutes > minMinutes
      ? `${minMinutes}–${maxMinutes} min`
      : `${minMinutes} min`;
  const timeText = loading ? '—' : window;
  const captionText = caption ?? MODE_CAPTION[mode];
  const label = `${captionText}: ${loading ? 'estimating' : window}`;

  if (variant === 'badge') {
    return (
      <View
        accessibilityLabel={label}
        style={[
          {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            backgroundColor: tokens.ramps.neutral[100],
            borderRadius: tokens.radius.full,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
          },
          style,
        ]}
      >
        <Icon glyph={MODE_GLYPH[mode]} size="xs" />
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {timeText}
        </Text>
      </View>
    );
  }

  if (variant === 'card') {
    return (
      <View
        accessibilityLabel={label}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
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
        <Icon glyph={MODE_GLYPH[mode]} size="xl" />
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {timeText}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{captionText}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={label}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      <Icon glyph={MODE_GLYPH[mode]} size="sm" />
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {timeText}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>· {captionText}</Text>
    </View>
  );
}
