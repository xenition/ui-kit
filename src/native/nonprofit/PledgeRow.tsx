import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { formatMoney } from './internal';

/** Lifecycle of a pledge. */
export type PledgeStatus = 'pending' | 'fulfilled' | 'overdue' | 'declined';

export interface PledgeRowProps {
  /** Donor name. */
  donorName: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Pledged amount, integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Pledge status (default `pending`). */
  status?: PledgeStatus;
  /** Pre-formatted due-date label (e.g. `Due Sep 1`). */
  dueLabel?: string;
  /** Fires when a pending/overdue pledge is marked fulfilled. */
  onFulfill?: () => void;
  /** Fires when the row is pressed (e.g. to open detail). */
  onPress?: () => void;
  /** Block the fulfill action. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const STATUS: Record<PledgeStatus, { tone: BadgeTone; label: string }> = {
  pending: { tone: 'warn', label: 'Pending' },
  fulfilled: { tone: 'success', label: 'Fulfilled' },
  overdue: { tone: 'danger', label: 'Overdue' },
  declined: { tone: 'neutral', label: 'Declined' },
};

/**
 * A single pledge in a campaign ledger: donor avatar + name, the pledged amount
 * (integer cents → `formatMoney`), a status badge, and — for still-open pledges
 * — a "Mark fulfilled" action. Status is carried by both the badge text and
 * `accessibilityLabel`, never color alone. All colors come from the compiled
 * theme tokens — no literal colors.
 */
export function PledgeRow({
  donorName,
  avatarUrl,
  amountCents,
  currency = 'USD',
  status = 'pending',
  dueLabel,
  onFulfill,
  onPress,
  loading = false,
  style,
}: PledgeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS[status];
  const open = status === 'pending' || status === 'overdue';

  const inner = (
    <>
      <Avatar name={donorName} src={avatarUrl} size="sm" />
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{donorName}</Text>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </View>
        {dueLabel ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{dueLabel}</Text> : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {formatMoney(amountCents, currency)}
        </Text>
        {open && onFulfill ? (
          <Button size="sm" variant="soft" tone="success" loading={loading} onPress={onFulfill}>
            Mark fulfilled
          </Button>
        ) : null}
      </View>
    </>
  );

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      backgroundColor: colors.surface,
    },
    style,
  ];

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${donorName}, ${formatMoney(amountCents, currency)} pledge, ${meta.label}`}
        onPress={onPress}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={`${donorName}, ${formatMoney(amountCents, currency)} pledge, ${meta.label}`} style={rowStyle}>
      {inner}
    </View>
  );
}
