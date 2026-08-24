import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  RETAINER_STATUS_META,
  clampPct,
  formatMoney,
  toneColor,
  type RetainerStatus,
} from './internal';

export type RetainerBalanceVariant = 'default' | 'compact';

export interface RetainerBalanceProps {
  /** Current trust / retainer balance in integer **cents**. */
  balanceCents: number;
  /**
   * Original / target retainer in integer **cents** — the meter denominator.
   * When omitted the meter is hidden and only the balance is shown.
   */
  initialCents?: number;
  /**
   * Low-balance threshold in integer **cents**. At or below it the status is
   * derived as `low`; at/below zero, `depleted`.
   */
  lowThresholdCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Explicit status override — otherwise derived from balance vs. threshold. */
  status?: RetainerStatus;
  /** Client / matter label. */
  label?: string;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** Density. */
  variant?: RetainerBalanceVariant;
  /** Render a "Replenish" action (shown when low / depleted). */
  onReplenish?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

function deriveStatus(balanceCents: number, low: number): RetainerStatus {
  if (balanceCents <= 0) return 'depleted';
  if (balanceCents <= low) return 'low';
  return 'healthy';
}

/**
 * Trust / retainer balance meter: the current balance carried as integer
 * **cents** and rendered through the shared `formatMoney`, a fill meter against
 * the initial retainer, and a health pill (glyph + word so status never rests on
 * color alone). Status is derived from the balance vs. a low-water threshold
 * unless explicitly overridden. A "Replenish" action surfaces when funds run
 * low. All colors are theme tokens — no literals.
 */
export function RetainerBalance({
  balanceCents,
  initialCents,
  lowThresholdCents = 0,
  currency = 'USD',
  status,
  label,
  loading = false,
  variant = 'default',
  onReplenish,
  testID,
  style,
}: RetainerBalanceProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
  const statusMeta = RETAINER_STATUS_META[resolved];
  const fillColor = toneColor(colors, statusMeta.tone);

  const pct =
    initialCents && initialCents > 0
      ? clampPct(Math.round((Math.max(0, balanceCents) / initialCents) * 100))
      : undefined;

  const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]} testID={testID}>
      {loading ? (
        <View accessibilityLabel="Loading retainer" style={{ gap: tokens.spacing.xs }}>
          <View style={{ height: tokens.typography.scale.xs, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: tokens.typography.scale['2xl'], width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 8, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        </View>
      ) : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {label ?? 'Retainer balance'}
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
                {formatMoney(balanceCents, currency)}
              </Text>
              {!compact && initialCents ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  of {formatMoney(initialCents, currency)} initial
                </Text>
              ) : null}
            </View>
            <StatusPill meta={statusMeta} size="sm" />
          </View>

          {pct != null ? (
            <View
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: pct }}
              accessibilityLabel={`${statusMeta.label}, ${pct}% remaining`}
              style={{ height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}
            >
              <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor }} />
            </View>
          ) : null}

          {showReplenish ? (
            <Button size="sm" variant="primary" onPress={onReplenish} style={{ alignSelf: 'flex-start' }}>
              Replenish
            </Button>
          ) : null}
        </>
      )}
    </Card>
  );

  return body;
}
