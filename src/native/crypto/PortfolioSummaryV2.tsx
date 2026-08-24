import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { DonutChart, type DonutChartColor } from '../charts';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import { changeGlyph, changeToneKey, formatPct } from './internal/format';
import type { PortfolioSummaryProps } from './PortfolioSummary';

/** Same public contract as {@link PortfolioSummary} — a drop-in alternate design. */
export type PortfolioSummaryV2Props = PortfolioSummaryProps;

/** Same cycled palette DonutChart uses, so the custom legend swatches match. */
const PALETTE: DonutChartColor[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/**
 * PortfolioSummary, redesigned (v2): a **big total hero** over a donut. The total
 * sits in a filled primary hero band (rendered in the guaranteed `onPrimary`
 * slot via `formatMoney`, integer cents — no drift) with a translucent on-fill
 * change chip; below, a reused {@link DonutChart} pairs with a custom legend that
 * spells out each asset's share % (guarded against a zero total). Distinct at a
 * glance from v1's plain total + built-in legend. Same props.
 */
export function PortfolioSummaryV2({
  totalCents,
  currency = 'USD',
  changeCents,
  changePct,
  allocations = [],
  loading = false,
  style,
}: PortfolioSummaryV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const onColor = colors.onPrimary;
  const subColor = withAlpha(onColor, 0.72);
  const fillTone = changeToneKey(changePct ?? changeCents ?? 0);
  const safeTotal = Number.isFinite(totalCents) ? Math.trunc(totalCents) : 0;

  const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);
  const hasChange = changeCents != null || changePct != null;

  if (loading) {
    return (
      <View
        style={[
          { borderRadius: tokens.radius.lg, backgroundColor: colors.surface, ...shadow('md', tokens) },
          style,
        ]}
      >
        <View
          accessibilityLabel="Loading portfolio"
          style={{ height: 220, borderRadius: tokens.radius.lg, backgroundColor: colors.border, opacity: 0.5 }}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        { borderRadius: tokens.radius.lg, overflow: 'hidden', backgroundColor: colors.surface, ...shadow('md', tokens) },
        style,
      ]}
    >
      {/* Hero band. */}
      <View style={{ padding: tokens.spacing.lg, backgroundColor: colors.primary, gap: tokens.spacing.xs, overflow: 'hidden' }}>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: -60,
            right: -40,
            width: 180,
            height: 180,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(onColor, 0.1),
          }}
        />
        <Text style={{ color: subColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>Total balance</Text>
        <Text
          style={{ color: onColor, fontSize: tokens.typography.scale['3xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }}
        >
          {formatMoney(safeTotal, currency)}
        </Text>
        {hasChange ? (
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              backgroundColor: withAlpha(onColor, 0.16),
              borderRadius: tokens.radius.full,
              paddingVertical: 3,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            <Text style={{ color: onColor, fontSize: tokens.typography.scale.xs }}>
              {changeGlyph(changePct ?? changeCents ?? 0)}
            </Text>
            {changeCents != null ? (
              <Text style={{ color: onColor, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }}>
                {formatMoney(Math.abs(Math.trunc(changeCents)), currency)}
              </Text>
            ) : null}
            {changePct != null ? (
              <Text
                accessibilityLabel={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct))}`}
                style={{ color: onColor, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }}
              >
                {formatPct(changePct)}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      {/* Donut + custom share legend. */}
      {allocations.length > 0 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.lg, padding: tokens.spacing.lg }}>
          <DonutChart
            data={allocations.map((a) => ({ label: a.label, value: a.value, color: a.color }))}
            size={116}
            thickness={20}
            accessibilityLabel={`Allocation across ${allocations.length} assets`}
          />
          <View style={{ flex: 1, gap: tokens.spacing.sm }}>
            {allocations.map((a, i) => {
              const swatch: keyof SemanticColors = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
              const pct = allocTotal > 0 ? (Math.max(a.value, 0) / allocTotal) * 100 : 0;
              return (
                <View key={`${a.label}-${i}`} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                  <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[swatch] }} />
                  <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                    {a.label}
                  </Text>
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600', fontVariant: ['tabular-nums'] }}>
                    {`${pct.toFixed(1)}%`}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      ) : null}
    </View>
  );
}
