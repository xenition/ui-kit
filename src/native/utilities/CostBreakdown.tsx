import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { formatMoney, formatPct, type MoneyFormatter } from './internal/format';

export type CostBreakdownTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

export interface CostBreakdownSlice {
  /** Line item name (e.g. "Energy", "Delivery", "Taxes"). */
  label: string;
  /** This item's amount, in integer **cents**. */
  amountCents: number;
  /** Semantic tone used for its segment + legend dot (default cycles). */
  tone?: CostBreakdownTone;
}

export interface CostBreakdownProps {
  /** Card heading (default "Cost breakdown"). */
  title?: string;
  /** The line items that sum to the total. */
  slices: CostBreakdownSlice[];
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

const TONE_CYCLE: CostBreakdownTone[] = ['primary', 'accent', 'success', 'warn', 'danger'];

/**
 * Where the bill goes — the clean, trust-first breakdown card: the title + the
 * summed total (integer cents via `formatMoney`), a single horizontal stacked
 * bar whose segments are widthed by each slice's share, and a legend listing a
 * tone dot, the label, the amount, and its `formatPct` share. Color-coding is
 * meaningful here — each slice carries a soft, semantic tone. Token-only colors.
 */
export function CostBreakdown({
  title = 'Cost breakdown',
  slices,
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: CostBreakdownProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const items = slices.map((s, i) => ({
    label: s.label,
    amount: Math.max(0, Math.trunc(s.amountCents || 0)),
    tone: (s.tone ?? TONE_CYCLE[i % TONE_CYCLE.length]) as CostBreakdownTone,
  }));
  const total = items.reduce((sum, s) => sum + s.amount, 0);
  const share = (amount: number): number => (total > 0 ? (amount / total) * 100 : 0);

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
    <View style={[card, style]} accessibilityLabel={`${title}, total ${format(total, currency)}`}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.md }}>
        <Text accessibilityRole="header" style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {title}
        </Text>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>Total</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
            {format(total, currency)}
          </Text>
        </View>
      </View>

      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          flexDirection: 'row',
          height: 12,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
          marginTop: tokens.spacing.lg,
          backgroundColor: colors.muted,
        }}
      >
        {items.map((s, i) => (
          <View key={`${s.label}-${i}`} style={{ width: `${share(s.amount)}%`, height: '100%', backgroundColor: colors[s.tone] }} />
        ))}
      </View>

      <View style={{ marginTop: tokens.spacing.lg, gap: tokens.spacing.md }}>
        {items.map((s, i) => (
          <View
            key={`${s.label}-${i}`}
            accessibilityLabel={`${s.label}, ${format(s.amount, currency)}, ${formatPct(share(s.amount))}`}
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
          >
            <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[s.tone] }} />
            <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }} numberOfLines={1}>
              {s.label}
            </Text>
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{formatPct(share(s.amount))}</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', minWidth: 64, textAlign: 'right' }}>
              {format(s.amount, currency)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
