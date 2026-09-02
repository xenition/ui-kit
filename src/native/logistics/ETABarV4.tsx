import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { clampPct, toneColor, type LogisticsTone } from './internal';
import type { ETABarProps, ETAStatus } from './ETABar';

/** Drop-in for {@link ETABarProps} — same props, the V4 "dispatch" design. */
export type ETABarV4Props = ETABarProps;

const ETA_META: Record<ETAStatus, { glyph: string; label: string; tone: LogisticsTone }> = {
  'on-time': { glyph: '⏱', label: 'On time', tone: 'success' },
  ahead: { glyph: '⚡', label: 'Ahead', tone: 'primary' },
  delayed: { glyph: '⏳', label: 'Delayed', tone: 'warn' },
  arrived: { glyph: '✓', label: 'Arrived', tone: 'success' },
};

/**
 * ETABar — **V4** "dispatch" design (native twin of the web V4). The confident,
 * operations-desk take on a journey/ETA bar: an elevated rounded card with a soft
 * shadow, a labelled glyph + word punctuality badge (never color alone), a big
 * legible **tabular-nums** ETA, a token fill sized to `progress`, and an
 * origin→destination label row. Exposes a `progressbar` role with
 * `accessibilityValue` so completion is announced, not inferred from the fill
 * color. Token-only colors via `useXenitionTheme()`.
 */
export function ETABarV4({
  progress,
  status = 'on-time',
  eta,
  origin,
  destination,
  loading = false,
  style,
}: ETABarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = clampPct(progress);
  const meta = ETA_META[status];
  const fill = toneColor(colors, meta.tone);
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={loading ? 'ETA loading' : `${meta.label}${eta ? `, ETA ${eta}` : ''}, ${pct}% complete`}
      accessibilityValue={loading ? undefined : { min: 0, max: 100, now: pct }}
      style={[shell, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
        {eta ? <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.onSurface, fontVariant: ['tabular-nums'] }}>{eta}</Text> : null}
      </View>

      <View style={{ height: 10, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden' }}>
        {!loading ? (
          <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fill }} />
        ) : (
          <View style={{ width: '40%', height: '100%', borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] }} />
        )}
      </View>

      {origin || destination ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.xs, color: colors.muted }}>{origin ?? ''}</Text>
          <Text numberOfLines={1} style={{ flex: 1, textAlign: 'right', fontSize: tokens.typography.scale.xs, color: colors.muted }}>{destination ?? ''}</Text>
        </View>
      ) : null}
    </View>
  );
}
