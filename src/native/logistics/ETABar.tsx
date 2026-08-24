import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clampPct, toneColor, type LogisticsTone } from './internal';

export type ETAStatus = 'on-time' | 'ahead' | 'delayed' | 'arrived';

const ETA_META: Record<ETAStatus, { glyph: string; label: string; tone: LogisticsTone }> = {
  'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
  ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
  delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
  arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};

export interface ETABarProps {
  /** Journey completion, 0–100 (clamped, NaN-safe). */
  progress?: number;
  /** ETA punctuality — carried by glyph + word, never color alone. */
  status?: ETAStatus;
  /** Human ETA text (e.g. `12:40 PM`, `~25 min`). */
  eta?: string;
  /** Origin label, shown at the left end. */
  origin?: string;
  /** Destination label, shown at the right end. */
  destination?: string;
  /** Render a muted, indeterminate placeholder while the ETA is unknown. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontal journey/ETA progress bar for a shipment or vehicle: a token
 * fill sized to `progress`, with an origin→destination label row and a
 * glyph + word punctuality status. Exposes an `adjustable`-free `progressbar`
 * role with `accessibilityValue` so the completion is announced, not inferred
 * from the fill color. No literal colors — the fill and track come from theme
 * tokens.
 */
export function ETABar({
  progress,
  status = 'on-time',
  eta,
  origin,
  destination,
  loading = false,
  style,
}: ETABarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = clampPct(progress);
  const meta = ETA_META[status];
  const fill = toneColor(colors, meta.tone);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={
        loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`
      }
      accessibilityValue={loading ? undefined : { min: 0, max: 100, now: pct }}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: fill }}>
            {meta.glyph}
          </Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, color: fill, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
        {eta ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.onSurface, fontWeight: '600' }}>
            {eta}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          height: 8,
          borderRadius: tokens.radius.full,
          backgroundColor: tokens.ramps.neutral[100],
          overflow: 'hidden',
        }}
      >
        {!loading ? (
          <View
            style={{
              width: `${pct}%`,
              height: '100%',
              borderRadius: tokens.radius.full,
              backgroundColor: fill,
            }}
          />
        ) : (
          <View style={{ width: '40%', height: '100%', borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
        )}
      </View>

      {origin || destination ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, flex: 1 }}>
            {origin ?? ''}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, flex: 1, textAlign: 'right' }}
          >
            {destination ?? ''}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
