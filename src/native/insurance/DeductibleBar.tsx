import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Progress } from '../primitives';
import { formatMoney, type MoneyFormatter, formatPct } from './internal/format';

export interface DeductibleBarProps {
  /** Amount already applied toward the deductible, in integer **cents**. */
  metCents: number;
  /** Deductible ceiling, in integer **cents**. */
  deductibleCents: number;
  /** Label above the bar (default "Deductible"). */
  label?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * Progress toward an annual deductible: a token `Progress` bar sized to
 * `met / deductible` with a "met of ceiling" caption and a remaining/"met"
 * line. The bar tone shifts as the deductible is satisfied — `warn` in
 * progress, `success` once fully met — both tracing to `SemanticColors`. A
 * `deductibleCents <= 0` ceiling is guarded (treated as fully met, no
 * divide-by-zero). Amounts are integer cents via `formatMoney`.
 */
export function DeductibleBar({
  metCents,
  deductibleCents,
  label = 'Deductible',
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: DeductibleBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const met = Number.isFinite(metCents) ? Math.max(0, Math.trunc(metCents)) : 0;
  const ceiling = Number.isFinite(deductibleCents) ? Math.max(0, Math.trunc(deductibleCents)) : 0;
  const clampedMet = ceiling > 0 ? Math.min(met, ceiling) : met;
  const ratio = ceiling > 0 ? clampedMet / ceiling : 1;
  const fullyMet = ratio >= 1;
  const remaining = Math.max(0, ceiling - met);

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }}
        >
          {label}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {format(clampedMet, currency)} / {format(ceiling, currency)}
        </Text>
      </View>
      <View accessibilityLabel={`${label}, ${formatPct(ratio * 100)} met`}>
        <Progress value={ratio * 100} max={100} tone={fullyMet ? 'success' : 'warn'} />
      </View>
      <Text style={{ color: fullyMet ? colors.success : colors.muted, fontSize: tokens.typography.scale.xs }}>
        {fullyMet ? 'Deductible met' : `${format(remaining, currency)} to go`}
      </Text>
    </View>
  );
}
