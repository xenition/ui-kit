import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { formatUsage } from './internal/format';
import { utilityKind } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { MeterReadingProps } from './MeterReading';

/** Drop-in for {@link MeterReadingProps} — same props, a different design. */
export type MeterReadingV4Props = MeterReadingProps;

const SOURCE_LABEL: Record<NonNullable<MeterReadingProps['source']>, string> = {
  estimated: 'Estimated',
  actual: 'Actual read',
  customer: 'Self-reported',
};

/**
 * MeterReading — **V4** design. The clean, trust-first meter card: an elevated
 * rounded surface with the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch). Keeps the previous → current → used reading trio, the
 * derived consumption clamped to `0` and printed via `formatUsage`, the date, and
 * the source tag. Restraint by design — only the disc is gradient. Same props as
 * {@link MeterReadingProps}; token-only colors.
 */
export function MeterReadingV4({
  kind,
  previous,
  current,
  unit,
  decimals = 0,
  date,
  source,
  style,
}: MeterReadingV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;
  const prev = Number.isFinite(previous) ? previous : 0;
  const curr = Number.isFinite(current) ? current : 0;
  const consumption = Math.max(0, curr - prev);

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  return (
    <View style={[card, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{ width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <Icon glyph={kd.glyph} size="xl" accessibilityLabel={`${kd.label} meter`} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {kd.label} meter
          </Text>
          {date != null ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
              {date}
              {source != null ? ` · ${SOURCE_LABEL[source]}` : ''}
            </Text>
          ) : source != null ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{SOURCE_LABEL[source]}</Text>
          ) : null}
        </View>
      </View>

      <View
        style={{
          marginTop: tokens.spacing.md,
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>Previous</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {formatUsage(prev, u, decimals)}
          </Text>
        </View>
        <Icon glyph="→" accessibilityLabel="to" color="muted" />
        <View style={{ gap: 2, alignItems: 'center' }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>Current</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {formatUsage(curr, u, decimals)}
          </Text>
        </View>
        <View style={{ gap: 2, alignItems: 'flex-end' }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>Used</Text>
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {formatUsage(consumption, u, decimals)}
          </Text>
        </View>
      </View>
    </View>
  );
}
