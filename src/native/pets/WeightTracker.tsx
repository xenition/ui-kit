import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Sparkline } from '../charts';

export type WeightStatus = 'ideal' | 'under' | 'over';

const STATUS_META: Record<WeightStatus, { label: string; tone: keyof SemanticColors }> = {
  ideal: { label: 'Ideal weight', tone: 'success' },
  under: { label: 'Underweight', tone: 'warn' },
  over: { label: 'Overweight', tone: 'danger' },
};

export interface WeightTrackerProps {
  /** Latest weight reading. */
  current: number;
  /** Unit label, e.g. "kg" or "lb". */
  unit?: string;
  /** Change vs. previous reading (same unit). */
  delta?: number;
  /** Recent readings, oldest → newest, for the trend line. */
  history?: number[];
  /** Ideal range `[min, max]` in the same unit; drives the status classification. */
  idealRange?: [number, number];
  /** Explicit status override; computed from `idealRange` otherwise. */
  status?: WeightStatus;
  /** Copy when there is no reading yet. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

function classify(current: number, range?: [number, number]): WeightStatus | undefined {
  if (!range) return undefined;
  const min = range[0] ?? 0;
  const max = range[1] ?? 0;
  if (current < min) return 'under';
  if (current > max) return 'over';
  return 'ideal';
}

/**
 * A pet weight tracker: the current reading with unit, a change delta (down is
 * neutral-good here — vets track both directions, so the delta tone follows the
 * ideal range, not the sign), a status chip vs. the ideal band, and a
 * {@link Sparkline} of recent history. Renders an empty state when there is no
 * reading. Status reads via a labelled chip (not color alone). Token-only colors.
 */
export function WeightTracker({
  current,
  unit = 'kg',
  delta,
  history,
  idealRange,
  status,
  emptyLabel = 'No weight logged yet',
  style,
}: WeightTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeHistory = history ?? [];

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (current == null || Number.isNaN(current)) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <View style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            ⚖️
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  const resolvedStatus = status ?? classify(current, idealRange);
  const statusMeta = resolvedStatus ? STATUS_META[resolvedStatus] : undefined;
  const trendColor: keyof SemanticColors = statusMeta?.tone ?? 'primary';
  const deltaColor = delta == null || delta === 0 ? colors.muted : colors.onSurface;

  return (
    <View
      accessibilityLabel={`Weight ${current} ${unit}${statusMeta ? `, ${statusMeta.label}` : ''}`}
      style={container}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>{current}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }}>{unit}</Text>
        </View>
        {statusMeta ? (
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: 'transparent',
              borderColor: colors[statusMeta.tone],
              borderWidth: 1,
              borderRadius: tokens.radius.full,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            <Text style={{ color: colors[statusMeta.tone], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {statusMeta.label}
            </Text>
          </View>
        ) : null}
      </View>

      {delta != null ? (
        <Text style={{ color: deltaColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : ''}
          {Math.abs(delta)} {unit} since last
        </Text>
      ) : null}

      {idealRange ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          Ideal range {idealRange[0] ?? 0}–{idealRange[1] ?? 0} {unit}
        </Text>
      ) : null}

      {safeHistory.length > 0 ? (
        <Sparkline data={safeHistory} color={trendColor} accessibilityLabel={`Weight trend over ${safeHistory.length} readings`} />
      ) : null}
    </View>
  );
}
