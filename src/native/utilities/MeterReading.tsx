import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon } from '../primitives';
import { formatUsage } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';

export type { UtilityKind };

export interface MeterReadingProps {
  /** Utility line — drives the leading glyph, label, and default unit. */
  kind: UtilityKind;
  /** Prior reading value (in `unit`s). */
  previous: number;
  /** Current reading value (in `unit`s). */
  current: number;
  /** Metered unit override (defaults to the utility's canonical unit). */
  unit?: string;
  /** Decimal places for the printed quantities (default `0`). */
  decimals?: number;
  /** Localized reading date (e.g. "Read Aug 1"). */
  date?: string;
  /** How the reading was captured. */
  source?: 'estimated' | 'actual' | 'customer';
  style?: StyleProp<ViewStyle>;
}

const SOURCE_LABEL: Record<NonNullable<MeterReadingProps['source']>, string> = {
  estimated: 'Estimated',
  actual: 'Actual read',
  customer: 'Self-reported',
};

/**
 * A meter reading entry: previous and current dial values with the derived
 * consumption between them. Consumption is `current − previous`, guarded to
 * never render negative (a rollover / correction clamps to 0) and always printed
 * via `formatUsage` (fixed decimals, no `NaN` leak). A "source" tag distinguishes
 * an estimated read from an actual one. Every color traces to a token.
 */
export function MeterReading({
  kind,
  previous,
  current,
  unit,
  decimals = 0,
  date,
  source,
  style,
}: MeterReadingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;
  const prev = Number.isFinite(previous) ? previous : 0;
  const curr = Number.isFinite(current) ? current : 0;
  const consumption = Math.max(0, curr - prev);

  return (
    <Card style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Icon glyph={kd.glyph} size="lg" accessibilityLabel={`${kd.label} meter`} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {kd.label} meter
          </Text>
          {date != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {date}
              {source != null ? ` · ${SOURCE_LABEL[source]}` : ''}
            </Text>
          ) : source != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{SOURCE_LABEL[source]}</Text>
          ) : null}
        </View>
      </View>

      <View
        style={{
          marginTop: tokens.spacing.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Previous</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {formatUsage(prev, u, decimals)}
          </Text>
        </View>
        <Icon glyph="→" accessibilityLabel="to" color="muted" />
        <View style={{ gap: 2, alignItems: 'center' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Current</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {formatUsage(curr, u, decimals)}
          </Text>
        </View>
        <View style={{ gap: 2, alignItems: 'flex-end' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Used</Text>
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {formatUsage(consumption, u, decimals)}
          </Text>
        </View>
      </View>
    </Card>
  );
}
