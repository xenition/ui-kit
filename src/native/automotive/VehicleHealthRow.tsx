import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** Health state of a monitored vehicle system. */
export type HealthStatus = 'ok' | 'attention' | 'critical' | 'unknown';
/** Presentation for a {@link VehicleHealthRow}. */
export type VehicleHealthVariant = 'default' | 'compact';

/** Status → tone + spelled-out word + glyph (never color alone). */
const HEALTH: Record<HealthStatus, { tone: keyof SemanticColors; word: string; glyph: string }> = {
  ok: { tone: 'success', word: 'OK', glyph: '✓' },
  attention: { tone: 'warn', word: 'Attention', glyph: '!' },
  critical: { tone: 'danger', word: 'Critical', glyph: '✕' },
  unknown: { tone: 'muted', word: 'Unknown', glyph: '?' },
};

export interface VehicleHealthRowProps {
  /** System name, e.g. `'Tire pressure'`. */
  system: string;
  /** Health status. */
  status?: HealthStatus;
  /** Current reading, pre-formatted (e.g. `'32 psi'` / `'Good'`). */
  reading?: string;
  /** Icon glyph/emoji shown before the system name. */
  glyph?: string;
  /**
   * Optional 0–100 percentage that draws a mini meter (e.g. brake pad life).
   * Omit for a status-only row.
   */
  percent?: number;
  /** Presentation variant. */
  variant?: VehicleHealthVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * One vehicle-health system row — its name, a reading, and a status conveyed by
 * a glyph plus a spelled-out word and an a11y label, so meaning never rests on
 * color; a `critical` status maps to the `danger` slot per contract. An optional
 * `percent` draws a token-tinted mini meter (brake life, oil, etc.).
 * Presentational: shaped data only. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors. `percent` is clamped to 0–100.
 */
export function VehicleHealthRow({
  system,
  status = 'ok',
  reading,
  glyph,
  percent,
  variant = 'default',
  style,
}: VehicleHealthRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const h = HEALTH[status] ?? HEALTH.unknown;
  const toneColor = colors[h.tone];
  const compact = variant === 'compact';
  const hasMeter = typeof percent === 'number';
  const clamped = hasMeter ? Math.max(0, Math.min(100, Math.round(percent as number))) : 0;

  const a11y = `${system}: ${h.word}${reading ? `, ${reading}` : ''}${hasMeter ? `, ${clamped} percent` : ''}`;

  return (
    <View
      accessible
      accessibilityLabel={a11y}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(toneColor, 0.16),
        }}
      >
        <Text style={{ color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>{glyph ?? h.glyph}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {system}
        </Text>
        {hasMeter ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              marginTop: 4,
              height: 6,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.muted, 0.2),
              overflow: 'hidden',
            }}
          >
            <View style={{ width: `${clamped}%`, height: '100%', backgroundColor: toneColor, borderRadius: tokens.radius.full }} />
          </View>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        {reading ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{reading}</Text>
        ) : null}
        <Text style={{ color: toneColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{h.word}</Text>
      </View>
    </View>
  );
}
