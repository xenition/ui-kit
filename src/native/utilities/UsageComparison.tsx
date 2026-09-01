import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import { formatUsage, formatPct, withAlpha, clamp } from './internal/format';
import { utilityKind, type UtilityKind } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';

export interface UsageComparisonProps {
  /** Utility line — picks the glyph and the default unit. */
  kind: UtilityKind;
  /** This period's metered quantity. */
  current: number;
  /** The prior period's metered quantity. */
  previous: number;
  /** Unit label; defaults to the kind's meter unit (e.g. "kWh"). */
  unit?: string;
  /** Human label for the comparison window (default "last period"). */
  period?: string;
  /** Fixed decimals for the rendered quantities (default 0). */
  decimals?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * This period vs last — the clean, trust-first usage card: the utility glyph in a
 * small brand-gradient disc, the current quantity big (`formatUsage`), and a
 * delta chip that spells out the change in **words + an arrow** (never color
 * alone): more usage reads `warn` (⬆), less reads `success` (⬇), equal is muted.
 * Two thin bars compare current against previous by ratio. Token-only colors.
 */
export function UsageComparison({
  kind,
  current,
  previous,
  unit,
  period = 'last period',
  decimals = 0,
  style,
}: UsageComparisonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const kd = utilityKind(kind);
  const u = unit ?? kd.unit;

  const cur = Number.isFinite(current) ? current : 0;
  const prev = Number.isFinite(previous) ? previous : 0;

  const pct = prev > 0 ? ((cur - prev) / prev) * 100 : cur > 0 ? 100 : 0;
  const direction: 'more' | 'less' | 'same' = cur > prev ? 'more' : cur < prev ? 'less' : 'same';

  const deltaTone =
    direction === 'more'
      ? { fg: colors.warnText, bg: withAlpha(colors.warn, 0.14), arrow: '⬆', word: 'more' }
      : direction === 'less'
        ? { fg: colors.successText, bg: withAlpha(colors.success, 0.14), arrow: '⬇', word: 'less' }
        : { fg: colors.mutedText, bg: withAlpha(colors.muted, 0.5), arrow: '→', word: 'same as' };

  const max = Math.max(cur, prev, 1);
  const curRatio = clamp(cur / max, 0, 1);
  const prevRatio = clamp(prev / max, 0, 1);

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

  const Bar = ({ label, value, ratio, strong }: { label: string; value: number; ratio: number; strong: boolean }) => (
    <View style={{ gap: tokens.spacing.xs }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{label}</Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {formatUsage(value, u, decimals)}
        </Text>
      </View>
      <View style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.muted, overflow: 'hidden' }}>
        <View
          style={{
            width: `${ratio * 100}%`,
            height: '100%',
            borderRadius: tokens.radius.full,
            backgroundColor: strong ? colors.primary : withAlpha(colors.primary, 0.4),
          }}
        />
      </View>
    </View>
  );

  const deltaLabel =
    direction === 'same' ? `Same as ${period}` : `${formatPct(Math.abs(pct))} ${deltaTone.word} than ${period}`;

  return (
    <View style={[card, style]} accessibilityLabel={`${kd.label} usage, ${formatUsage(cur, u, decimals)}, ${deltaLabel}`}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{ width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <Icon glyph={kd.glyph} size="xl" accessibilityLabel={`${kd.label} usage`} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{kd.label} this period</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
            {formatUsage(cur, u, decimals)}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: tokens.spacing.xs,
          marginTop: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          backgroundColor: deltaTone.bg,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: deltaTone.fg }}>
          {deltaTone.arrow}
        </Text>
        <Text style={{ color: deltaTone.fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{deltaLabel}</Text>
      </View>

      <View style={{ marginTop: tokens.spacing.lg, gap: tokens.spacing.md }}>
        <Bar label="This period" value={cur} ratio={curRatio} strong />
        <Bar label={period} value={prev} ratio={prevRatio} strong={false} />
      </View>
    </View>
  );
}
