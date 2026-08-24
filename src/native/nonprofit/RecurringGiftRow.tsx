import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';

/** Cadence of a recurring gift. */
export type GiftFrequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
/** Lifecycle of a recurring gift. */
export type RecurringGiftStatus = 'active' | 'paused' | 'canceled';

export interface RecurringGiftRowProps {
  /** Per-cycle amount, integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Billing cadence. */
  frequency: GiftFrequency;
  /** Program / fund name the gift supports. */
  fund?: string;
  /** Pre-formatted next-charge label (e.g. `Next: Sep 1`). */
  nextChargeLabel?: string;
  /** Current status (default `active`). */
  status?: RecurringGiftStatus;
  /** Fires when an active gift is paused. */
  onPause?: () => void;
  /** Fires when a paused gift is resumed. */
  onResume?: () => void;
  /** Fires when the gift is canceled (rendered when provided). */
  onCancel?: () => void;
  /** Block the action buttons. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const FREQ_LABEL: Record<GiftFrequency, string> = {
  weekly: '/week',
  monthly: '/month',
  quarterly: '/quarter',
  yearly: '/year',
};

/**
 * A managed recurring-gift row: the per-cycle amount (integer cents →
 * `formatMoney`) with its cadence suffix, the supported fund, a next-charge
 * hint, a status badge, and pause / resume / cancel controls appropriate to the
 * status. Status is carried by badge text + `accessibilityLabel`, not color
 * alone. All colors come from the compiled theme tokens — no literal colors.
 */
export function RecurringGiftRow({
  amountCents,
  currency = 'USD',
  frequency,
  fund,
  nextChargeLabel,
  status = 'active',
  onPause,
  onResume,
  onCancel,
  loading = false,
  style,
}: RecurringGiftRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const statusTone = status === 'active' ? 'success' : status === 'paused' ? 'warn' : 'neutral';
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <View
      accessibilityLabel={`${formatMoney(amountCents, currency)} ${FREQ_LABEL[frequency]} recurring gift, ${statusLabel}`}
      style={[
        { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph="🔁" size="base" color="muted" />
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, flex: 1 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {formatMoney(amountCents, currency)}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{FREQ_LABEL[frequency]}</Text>
        </View>
        <Badge tone={statusTone}>{statusLabel}</Badge>
      </View>

      {fund ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{fund}</Text> : null}
      {nextChargeLabel && status === 'active' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{nextChargeLabel}</Text>
      ) : null}

      {status !== 'canceled' ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {status === 'active' ? (
            <Button size="sm" variant="soft" tone="default" loading={loading} onPress={onPause}>Pause</Button>
          ) : (
            <Button size="sm" variant="soft" tone="success" loading={loading} onPress={onResume}>Resume</Button>
          )}
          {onCancel ? (
            <Button size="sm" variant="ghost" tone="danger" loading={loading} onPress={onCancel}>Cancel</Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
