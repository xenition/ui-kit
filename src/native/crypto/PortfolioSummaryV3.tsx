import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import type { DonutChartColor } from '../charts';
import { MoneyAmount } from '../finance/MoneyAmount';
import { changeGlyph, changeToneKey, formatPct } from './internal/format';
import type { PortfolioSummaryProps } from './PortfolioSummary';

/** Same public contract as {@link PortfolioSummary} — a drop-in alternate design. */
export type PortfolioSummaryV3Props = PortfolioSummaryProps;

/** Same cycled palette DonutChart uses, so the bar segments match a donut view. */
const PALETTE: DonutChartColor[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/** Change → contrast-safe TEXT slot (gains `successText`, losses `dangerText`). */
function changeToneTextKey(delta: number): keyof SemanticColors {
  const safe = Number.isFinite(delta) ? delta : 0;
  if (safe > 0) return 'successText';
  if (safe < 0) return 'dangerText';
  return 'muted';
}

/**
 * PortfolioSummary, redesigned (v3): a **minimal, total-first** block. The total
 * leads big through {@link MoneyAmount} (integer cents — no drift) with an inline
 * ▲/▼ change, then a single compact **stacked allocation bar** replaces the
 * donut, with a small dot legend beneath. No card, no chart deps — a lean
 * header. Distinct at a glance from v1's donut card and v2's hero band. Same
 * props; an empty or all-zero allocation simply hides the bar.
 */
export function PortfolioSummaryV3({
  totalCents,
  currency = 'USD',
  changeCents,
  changePct,
  allocations = [],
  loading = false,
  style,
}: PortfolioSummaryV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const textTone = changeToneTextKey(changePct ?? changeCents ?? 0);

  if (loading) {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        <View
          accessibilityLabel="Loading portfolio"
          style={{ height: 56, borderRadius: tokens.radius.md, backgroundColor: colors.border, opacity: 0.5 }}
        />
      </View>
    );
  }

  const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);
  const hasChange = changeCents != null || changePct != null;

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <View style={{ gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Total balance</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <MoneyAmount cents={totalCents} currency={currency} tone="neutral" size="xl" />
          {hasChange ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text style={{ color: colors[textTone], fontSize: tokens.typography.scale.sm }}>
                {changeGlyph(changePct ?? changeCents ?? 0)}
              </Text>
              {changeCents != null ? (
                <MoneyAmount
                  cents={changeCents}
                  currency={currency}
                  tone={textTone === 'muted' ? 'neutral' : textTone === 'successText' ? 'income' : 'expense'}
                  size="sm"
                  signDisplay="always"
                />
              ) : null}
              {changePct != null ? (
                <Text
                  accessibilityLabel={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
                  style={{ color: colors[textTone], fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }}
                >
                  {formatPct(changePct)}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>

      {allocations.length > 0 && allocTotal > 0 ? (
        <View style={{ gap: tokens.spacing.sm }}>
          <View
            accessibilityRole="image"
            accessibilityLabel={`Allocation across ${allocations.length} assets`}
            style={{ flexDirection: 'row', height: 10, borderRadius: tokens.radius.full, overflow: 'hidden', backgroundColor: tokens.ramps.neutral[100] }}
          >
            {allocations.map((a, i) => {
              const swatch: keyof SemanticColors = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
              const share = Math.max(a.value, 0) / allocTotal;
              if (share <= 0) return null;
              return <View key={`${a.label}-${i}`} style={{ flex: share, backgroundColor: colors[swatch] }} />;
            })}
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
            {allocations.map((a, i) => {
              const swatch: keyof SemanticColors = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
              return (
                <View key={`${a.label}-${i}`} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors[swatch] }} />
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{a.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
}
