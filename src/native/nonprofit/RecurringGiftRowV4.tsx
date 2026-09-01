import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from './internal';
import type { GiftFrequency, RecurringGiftRowProps, RecurringGiftStatus } from './RecurringGiftRow';

/** Drop-in for {@link RecurringGiftRowProps} — same props, the V4 "rally" design. */
export type RecurringGiftRowV4Props = RecurringGiftRowProps;

const FREQ: Record<GiftFrequency, { label: string; glyph: string }> = {
  weekly: { label: '/week', glyph: '📅' },
  monthly: { label: '/month', glyph: '🗓️' },
  quarterly: { label: '/quarter', glyph: '📆' },
  yearly: { label: '/year', glyph: '🎂' },
};

const STATUS: Record<RecurringGiftStatus, { tone: BadgeTone; label: string; glyph: string }> = {
  active: { tone: 'success', label: 'Active', glyph: '🔁' },
  paused: { tone: 'warn', label: 'Paused', glyph: '⏸️' },
  canceled: { tone: 'neutral', label: 'Canceled', glyph: '🚫' },
};

/**
 * RecurringGiftRow — **V4** "rally" design. An elevated, rounded managed
 * recurring-gift row on a clean surface (no gradient): a leading cadence glyph in
 * a soft-primary well, the bold per-cycle amount (integer cents → `formatMoney`)
 * with its cadence suffix, a glyph + labelled status {@link Badge} (never color
 * alone), a frequency chip, the supported fund, a next-charge hint, and pause /
 * resume / cancel controls appropriate to the status. Honors every `frequency`
 * (weekly/monthly/quarterly/yearly) and `status` (active/paused/canceled).
 * Identical props/behavior to {@link RecurringGiftRowProps}. Token-only colors
 * via `useXenitionTheme()`.
 */
export function RecurringGiftRowV4({
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
}: RecurringGiftRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const freq = FREQ[frequency];
  const statusMeta = STATUS[status];

  const containerStyle: StyleProp<ViewStyle> = [
    {
      gap: tokens.spacing.sm,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  return (
    <View
      accessibilityLabel={`${formatMoney(amountCents, currency)} ${freq.label} recurring gift, ${statusMeta.label}`}
      style={containerStyle}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View style={{ height: 44, width: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Icon glyph={freq.glyph} size="lg" />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs, flex: 1 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {formatMoney(amountCents, currency)}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{freq.label}</Text>
        </View>
        <Badge tone={statusMeta.tone} variant="soft">{`${statusMeta.glyph} ${statusMeta.label}`}</Badge>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingVertical: 2, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.lg, backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Icon glyph={freq.glyph} size="xs" />
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>{`Every ${freq.label.replace('/', '')}`}</Text>
        </View>
        {fund ? <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{fund}</Text> : null}
      </View>

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
