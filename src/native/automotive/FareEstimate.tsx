import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** Presentation for a {@link FareEstimate}. */
export type FareEstimateVariant = 'detailed' | 'summary';

/** A single line in the fare breakdown. */
export interface FareLineItem {
  /** Line label, e.g. `'Base fare'`. */
  label: string;
  /** Amount in integer minor units (cents); negatives render as discounts. */
  cents: number;
}

export interface FareEstimateProps {
  /** Line items making up the fare. */
  items?: FareLineItem[];
  /**
   * Explicit total in cents. When omitted the total is summed from `items`
   * (after applying `surgeMultiplier` to the summed subtotal).
   */
  totalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Surge multiplier applied to the subtotal (e.g. `1.5`). */
  surgeMultiplier?: number;
  /** Estimated distance, pre-formatted (e.g. `'8.4 mi'`). */
  distanceLabel?: string;
  /** Estimated duration, pre-formatted (e.g. `'22 min'`). */
  durationLabel?: string;
  /** Presentation variant. `summary` hides the line-item breakdown. */
  variant?: FareEstimateVariant;
  /** Loading skeleton. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

function formatMoney(cents: number, currency: string): string {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  try {
    return sign + new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(abs / 100);
  } catch {
    return `${sign}$${(abs / 100).toFixed(2)}`;
  }
}

/**
 * A ride fare estimate — an optional itemised breakdown (base, distance, time,
 * discounts) with an optional surge multiplier, plus distance/duration context
 * and a bold total. The total is either supplied or summed from the items (with
 * surge applied to the subtotal); a surge is spelled out in a badge, not colour
 * alone. Presentational: shaped data only, nothing fetches. Colors come from
 * semantic tokens and `withAlpha` tints — no literal colors. `variant="summary"`
 * collapses to the total. Item indexing is guarded against a missing array.
 */
export function FareEstimate({
  items,
  totalCents,
  currency = 'USD',
  surgeMultiplier,
  distanceLabel,
  durationLabel,
  variant = 'detailed',
  loading = false,
  style,
}: FareEstimateProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(items) ? items : [];
  const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;

  const subtotal = list.reduce((sum, it) => sum + (Number.isFinite(it.cents) ? it.cents : 0), 0);
  const computed = hasSurge ? Math.round(subtotal * (surgeMultiplier as number)) : subtotal;
  const total = typeof totalCents === 'number' ? totalCents : computed;

  if (loading) {
    return (
      <View
        accessibilityLabel="Loading fare estimate"
        style={[
          {
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.sm,
          },
          style,
        ]}
      >
        <View style={{ height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.2) }} />
        <View style={{ height: 22, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: withAlpha(colors.muted, 0.28) }} />
      </View>
    );
  }

  const showBreakdown = variant === 'detailed' && list.length > 0;
  const a11y = `Estimated fare ${formatMoney(total, currency)}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`;

  return (
    <View
      accessible
      accessibilityLabel={a11y}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>
          Fare estimate
        </Text>
        {hasSurge ? <Badge tone="warn" variant="soft" size="sm">{`${surgeMultiplier}x surge`}</Badge> : null}
      </View>

      {distanceLabel || durationLabel ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[distanceLabel, durationLabel].filter(Boolean).join(' · ')}
        </Text>
      ) : null}

      {showBreakdown ? (
        <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
          {list.map((it, i) => {
            const discount = it.cents < 0;
            return (
              <View key={`${it.label}-${i}`} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{it.label}</Text>
                <Text
                  style={{
                    color: discount ? colors.success : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: discount ? '700' : '500',
                  }}
                >
                  {formatMoney(it.cents, currency)}
                </Text>
              </View>
            );
          })}
          {hasSurge ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Surge ×{surgeMultiplier}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopWidth: showBreakdown ? 1 : 0,
          borderTopColor: colors.border,
          paddingTop: showBreakdown ? tokens.spacing.sm : 0,
        }}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Total</Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
          {formatMoney(total, currency)}
        </Text>
      </View>
    </View>
  );
}
