import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card } from '../primitives/Card';
import { Statistic, type StatisticTrend } from '../primitives/Statistic';
import { withAlpha } from './internal';

/** Accent tone for the stat tile's icon chip / emphasis. */
export type QueueStatTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface QueueStatProps {
  /** Caption (e.g. "Open tickets"). */
  label: string;
  /** Headline value (number or preformatted string). */
  value: React.ReactNode;
  /** Optional change indicator (see `Statistic`). */
  delta?: string | number;
  /** Explicit delta trend; otherwise inferred from a numeric delta. */
  trend?: StatisticTrend;
  /** Optional unit suffix (e.g. `%`, `min`). */
  suffix?: React.ReactNode;
  /** Accent tone for the leading glyph chip (default `neutral`). */
  tone?: QueueStatTone;
  /** Optional glyph shown in a tinted chip. */
  glyph?: string;
  /** Render a loading placeholder. */
  loading?: boolean;
  /** Wrap in a card surface (default true). */
  card?: boolean;
  style?: StyleProp<ViewStyle>;
}

const TONE_SLOT: Record<QueueStatTone, keyof SemanticColors> = {
  neutral: 'muted',
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * A single queue KPI tile — a leading tinted glyph chip plus a `Statistic`
 * (caption, big value, optional delta/suffix). Built for helpdesk dashboards
 * ("Open", "Waiting", "Breached SLA", "CSAT"). The chip tone maps to
 * `SemanticColors` via a token tint; the delta arrow/tone comes from the
 * underlying `Statistic`. Supports a `loading` placeholder. No literal hex.
 */
export function QueueStat({
  label,
  value,
  delta,
  trend,
  suffix,
  tone = 'neutral',
  glyph,
  loading = false,
  card = true,
  style,
}: QueueStatProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[TONE_SLOT[tone] ?? 'muted'];

  const inner = loading ? (
    <View accessibilityLabel="Loading metric" style={{ gap: tokens.spacing.xs }}>
      <View style={{ height: 10, width: '50%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
      <View style={{ height: 28, width: '35%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.12) }} />
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {glyph ? (
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(accent, 0.14),
          }}
        >
          <Text style={{ color: accent, fontSize: tokens.typography.scale.lg }}>{glyph}</Text>
        </View>
      ) : null}
      <Statistic label={label} value={value} delta={delta} trend={trend} suffix={suffix} style={{ flex: 1 }} />
    </View>
  );

  if (!card) {
    return (
      <View accessibilityLabel={`${label}: ${String(value)}`} style={style}>
        {inner}
      </View>
    );
  }

  return (
    <Card variant="outlined" padding="md" accessibilityLabel={`${label}: ${String(value)}`} style={style}>
      {inner}
    </Card>
  );
}
