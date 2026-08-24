import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card } from '../primitives';
import { DonutChart, type DonutChartColor } from '../charts';
import { MoneyAmount } from '../finance/MoneyAmount';
import { changeGlyph, changeToneKey, formatPct } from './internal/format';

/** One slice of the allocation donut. */
export interface AllocationSlice {
  /** Asset label (e.g. `ETH`). */
  label: string;
  /** Share weight (fiat value or percentage — the donut normalizes). */
  value: number;
  /** Optional semantic color; falls back to a cycled palette. */
  color?: DonutChartColor;
}

export interface PortfolioSummaryProps {
  /** Total portfolio value in integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** 24h change in integer **cents** (signed → tone). */
  changeCents?: number;
  /** 24h change as a percentage (signed → tone; ▲/▼ glyph so not color-only). */
  changePct?: number;
  /** Allocation breakdown → a reused {@link DonutChart}. */
  allocations?: AllocationSlice[];
  /** Skeleton state while the portfolio loads. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The top-of-portfolio hero: a big total ({@link MoneyAmount}), a token-toned
 * 24h change (gain = `success`, loss = `danger`, with a ▲/▼ glyph + accessible
 * up/down label so it is never color-only), and a reused {@link DonutChart} of
 * the allocation breakdown with a legend. All amounts are integer cents — no
 * float drift. Empty `allocations` simply hides the chart.
 */
export function PortfolioSummary({
  totalCents,
  currency = 'USD',
  changeCents,
  changePct,
  allocations = [],
  loading = false,
  style,
}: PortfolioSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const changeToneSlot: keyof SemanticColors = changeToneKey(changePct ?? changeCents ?? 0);

  if (loading) {
    return (
      <Card variant="elevated" style={style}>
        <View
          accessibilityLabel="Loading portfolio"
          style={{ height: 120, borderRadius: tokens.radius.md, backgroundColor: colors.border, opacity: 0.5 }}
        />
      </Card>
    );
  }

  return (
    <Card variant="elevated" style={style}>
      <View style={{ gap: tokens.spacing.md }}>
        <View style={{ gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            Total balance
          </Text>
          <MoneyAmount cents={totalCents} currency={currency} tone="neutral" size="xl" />
          {changeCents != null || changePct != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Text style={{ color: colors[changeToneSlot], fontSize: tokens.typography.scale.sm }}>
                {changeGlyph(changePct ?? changeCents ?? 0)}
              </Text>
              {changeCents != null ? (
                <MoneyAmount
                  cents={changeCents}
                  currency={currency}
                  tone={changeToneSlot === 'muted' ? 'neutral' : changeToneSlot === 'success' ? 'income' : 'expense'}
                  size="sm"
                  signDisplay="always"
                />
              ) : null}
              {changePct != null ? (
                <Text
                  accessibilityLabel={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
                  style={{ color: colors[changeToneSlot], fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }}
                >
                  {formatPct(changePct)}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>

        {allocations.length > 0 ? (
          <View style={{ alignItems: 'center' }}>
            <DonutChart
              data={allocations.map((a) => ({ label: a.label, value: a.value, color: a.color }))}
              size={180}
              thickness={26}
              showLegend
              accessibilityLabel={`Allocation across ${allocations.length} assets`}
            />
          </View>
        ) : null}
      </View>
    </Card>
  );
}
