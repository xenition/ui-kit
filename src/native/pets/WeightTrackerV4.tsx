import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Sparkline } from '../charts';
import { withAlpha } from '../primitives/internal/color';
import type { WeightTrackerProps, WeightStatus } from './WeightTracker';

/** Drop-in for {@link WeightTrackerProps} — same props, the V4 "companion" design. */
export type WeightTrackerV4Props = WeightTrackerProps;

/** Per-status label / glyph / token color — a labelled chip, never color alone. */
const STATUS_META: Record<WeightStatus, { label: string; glyph: string; tone: keyof SemanticColors }> = {
  ideal: { label: 'Ideal weight', glyph: '✓', tone: 'success' },
  under: { label: 'Underweight', glyph: '▼', tone: 'warn' },
  over: { label: 'Overweight', glyph: '▲', tone: 'danger' },
};

function classify(current: number, range?: [number, number]): WeightStatus | undefined {
  if (!range) return undefined;
  const min = range[0] ?? 0;
  const max = range[1] ?? 0;
  if (current < min) return 'under';
  if (current > max) return 'over';
  return 'ideal';
}

/**
 * WeightTracker — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a pet weight tracker: an elevated rounded card with a
 * soft shadow, a big legible current reading with its unit, a change delta (tone
 * follows the ideal range, not the sign — vets track both directions), a status
 * carried in a soft-tinted labelled chip with a glyph (never color alone), and the
 * charts {@link Sparkline} of recent history (kept token-fed and unchanged from
 * the base). Same props/behavior as {@link WeightTrackerProps}: `status` (ideal /
 * under / over) resolves from `idealRange` when omitted; renders an empty state
 * when there is no reading. Token-only colors via `useXenitionTheme()`.
 */
export function WeightTrackerV4({
  current,
  unit = 'kg',
  delta,
  history,
  idealRange,
  status,
  emptyLabel = 'No weight logged yet',
  style,
}: WeightTrackerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeHistory = history ?? [];

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
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
    <View accessibilityLabel={`Weight ${current} ${unit}${statusMeta ? `, ${statusMeta.label}` : ''}`} style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        {/* Big legible central value. */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>{current}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }}>{unit}</Text>
        </View>
        {statusMeta ? (
          // Status as a soft-tinted labelled chip + glyph (never color alone).
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              backgroundColor: withAlpha(colors.primary, 0.1),
              borderRadius: tokens.radius.full,
              paddingVertical: 2,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            <Text allowFontScaling={false} style={{ color: colors[statusMeta.tone], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {statusMeta.glyph}
            </Text>
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
