import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from './internal';
import { GradientSurface } from './internal/GradientSurface';
import {
  registerGradient,
  registerInk,
  registerInkSoft,
  registerTile,
  registerBorder,
} from './internal/register';

/** One entry in the optional top-sellers list. */
export interface SalesSummaryTopItem {
  /** Product / line name. */
  name: string;
  /** Units sold in the period. */
  count: number;
}

export interface SalesSummaryProps {
  /** Gross takings for the period, in integer **cents** — the big near-white numeral. */
  grossCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Transaction count for the period. Shown as a frosted stat tile when set. */
  transactions?: number;
  /** Period label for the hero (default `"Today"`). */
  period?: string;
  /** Net takings (after refunds), in integer **cents**. Shown as a frosted stat tile when set. */
  netCents?: number;
  /** Refunds issued in the period, in integer **cents**. Shown as a frosted stat tile when set. */
  refundsCents?: number;
  /** Best-selling lines for the period — rendered as a compact frosted list when non-empty. */
  topItems?: readonly SalesSummaryTopItem[];
  /** Percentage change vs the prior comparable period (e.g. `12.5` → up 12.5%). Rendered as a signed delta pill when set. */
  deltaPct?: number;
  /** Optional container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * SalesSummary — the POS V4 "register" daily/shift **sales hero**. A confident
 * brand gradient (`registerGradient`) carries the `period` label, the **big
 * near-white gross numeral** (integer cents via `formatMoney`), and an optional
 * signed `deltaPct` pill vs the prior period. Transactions, net, and refunds read
 * as frosted glass stat tiles; `topItems` render as a compact frosted list. Every
 * color derives from the brand ramp via `useXenitionTheme()` — no literals, light
 * + dark safe.
 */
export function SalesSummary({
  grossCents,
  currency = 'USD',
  transactions,
  period = 'Today',
  netCents,
  refundsCents,
  topItems,
  deltaPct,
  style,
}: SalesSummaryProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = registerInk(r);
  const inkSoft = registerInkSoft(r);
  const gross = Math.max(0, Math.trunc(grossCents || 0));
  const hasDelta = typeof deltaPct === 'number' && Number.isFinite(deltaPct);
  const deltaUp = hasDelta && (deltaPct as number) >= 0;
  const items = topItems ?? [];

  const Stat = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: registerTile(r),
        borderWidth: 1,
        borderColor: registerBorder(r),
      }}
    >
      <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{label}</Text>
      <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={registerGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{period}</Text>
          {hasDelta ? (
            <View
              accessible
              accessibilityLabel={`${deltaUp ? 'Up' : 'Down'} ${Math.abs(deltaPct as number)} percent vs prior period`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                backgroundColor: registerTile(r),
                borderWidth: 1,
                borderColor: registerBorder(r),
              }}
            >
              <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
                {deltaUp ? '▲' : '▼'}
              </Text>
              <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {`${Math.abs(deltaPct as number)}%`}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: tokens.spacing.md }}>
          Gross sales
        </Text>
        <Text
          accessibilityLabel={`Gross sales ${formatMoney(gross, currency)}`}
          allowFontScaling={false}
          style={{
            color: ink,
            fontSize: tokens.typography.scale['3xl'] * 1.3,
            fontWeight: '800',
            letterSpacing: -1,
            marginTop: 2,
          }}
        >
          {formatMoney(gross, currency)}
        </Text>

        {typeof transactions === 'number' || typeof netCents === 'number' || typeof refundsCents === 'number' ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {typeof transactions === 'number' ? <Stat label="Transactions" value={String(Math.max(0, Math.trunc(transactions)))} /> : null}
            {typeof netCents === 'number' ? <Stat label="Net" value={formatMoney(Math.trunc(netCents), currency)} /> : null}
            {typeof refundsCents === 'number' ? <Stat label="Refunds" value={formatMoney(Math.max(0, Math.trunc(refundsCents)), currency)} /> : null}
          </View>
        ) : null}

        {items.length > 0 ? (
          <View
            style={{
              marginTop: tokens.spacing.lg,
              padding: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              backgroundColor: registerTile(r),
              borderWidth: 1,
              borderColor: registerBorder(r),
              gap: tokens.spacing.sm,
            }}
          >
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>Top items</Text>
            {items.map((it, i) => (
              <View
                key={`${it.name}-${i}`}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.md }}
              >
                <Text numberOfLines={1} style={{ flex: 1, minWidth: 0, color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                  {it.name}
                </Text>
                <Text allowFontScaling={false} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  {`×${Math.max(0, Math.trunc(it.count))}`}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
