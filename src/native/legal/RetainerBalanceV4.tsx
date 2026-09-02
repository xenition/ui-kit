import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { RETAINER_STATUS_META, clampPct, formatMoney, toneColor, type RetainerStatus } from './internal';
import type { RetainerBalanceProps } from './RetainerBalance';

/** Drop-in for {@link RetainerBalanceProps} — same props, the V4 "chambers" design. */
export type RetainerBalanceV4Props = RetainerBalanceProps;

function deriveStatus(balanceCents: number, low: number): RetainerStatus {
  if (balanceCents <= 0) return 'depleted';
  if (balanceCents <= low) return 'low';
  return 'healthy';
}

/**
 * RetainerBalance — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a big legible **tabular-nums**
 * balance (money carried as integer cents through the shared `formatMoney`), a
 * labelled glyph + word health pill (never color alone), a fill meter against the
 * initial retainer, and a "Replenish" action when funds run low. Exposes an ARIA
 * `progressbar`. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()`.
 */
export function RetainerBalanceV4({
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
}: RetainerBalanceV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const resolved = status ?? deriveStatus(balanceCents, lowThresholdCents);
  const statusMeta = RETAINER_STATUS_META[resolved];
  const fillColor = toneColor(colors, statusMeta.tone);
  const pct = initialCents && initialCents > 0 ? clampPct(Math.round((Math.max(0, balanceCents) / initialCents) * 100)) : undefined;
  const showReplenish = onReplenish && (resolved === 'low' || resolved === 'depleted');
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: compact ? tokens.spacing.md : tokens.spacing.lg,
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading retainer" testID={testID} style={[shell, style]}>
        <View style={{ height: tokens.typography.scale.xs, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: tokens.typography.scale['2xl'], width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 8, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
      </View>
    );
  }

  return (
    <View testID={testID} style={[shell, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 0.4 }}>{label ?? 'Retainer balance'}</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'] }}>{formatMoney(balanceCents, currency)}</Text>
          {!compact && initialCents ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>of {formatMoney(initialCents, currency)} initial</Text>
          ) : null}
        </View>
        <StatusPill meta={statusMeta} variant="soft" size="sm" />
      </View>

      {pct != null ? (
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: pct }}
          accessibilityLabel={`${statusMeta.label}, ${pct}% remaining`}
          style={{ height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }}
        >
          <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: fillColor }} />
        </View>
      ) : null}

      {showReplenish ? (
        <Button size="sm" variant="primary" onPress={onReplenish} style={{ alignSelf: 'flex-start' }}>
          Replenish
        </Button>
      ) : null}
    </View>
  );
}
