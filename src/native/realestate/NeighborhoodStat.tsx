import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Statistic, Icon, type StatisticTrend } from '../primitives';

export interface NeighborhoodStatProps {
  /** Metric caption (e.g. "Walk Score", "Median rent"). */
  label: string;
  /** Headline value (already formatted, e.g. "92", "$3,200"). */
  value: React.ReactNode;
  /** Optional change indicator shown beside the value. */
  delta?: string | number;
  /** Tone/arrow for `delta`; inferred from a numeric delta when omitted. */
  trend?: StatisticTrend;
  /** Optional unit/suffix (e.g. "/100", "%"). */
  suffix?: React.ReactNode;
  /** Optional leading glyph/emoji. */
  glyph?: string;
  /** Optional one-line context under the value. */
  caption?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single neighborhood metric tile — a labelled value with an optional trend
 * delta, wrapped in a token-styled card with an optional leading glyph and a
 * caption. Composes the shared `Statistic` (which owns the delta tone/arrow
 * logic) and `Icon`. Presentational only; token-only colors.
 */
export function NeighborhoodStat({
  label,
  value,
  delta,
  trend,
  suffix,
  glyph,
  caption,
  style,
}: NeighborhoodStatProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {glyph ? <Icon glyph={glyph} size="xl" color="primary" /> : null}
      <View style={{ flex: 1 }}>
        <Statistic label={label} value={value} delta={delta} trend={trend} suffix={suffix} />
        {caption ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
            {caption}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
