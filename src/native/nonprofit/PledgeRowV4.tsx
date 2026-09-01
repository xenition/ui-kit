import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/Button';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from './internal';
import type { PledgeRowProps, PledgeStatus } from './PledgeRow';

/** Drop-in for {@link PledgeRowProps} — same props, the V4 "rally" design. */
export type PledgeRowV4Props = PledgeRowProps;

const STATUS: Record<PledgeStatus, { tone: BadgeTone; label: string; glyph: string }> = {
  pending: { tone: 'warn', label: 'Pending', glyph: '⏳' },
  fulfilled: { tone: 'success', label: 'Fulfilled', glyph: '✅' },
  overdue: { tone: 'danger', label: 'Overdue', glyph: '⚠️' },
  declined: { tone: 'neutral', label: 'Declined', glyph: '🚫' },
};

/**
 * PledgeRow — **V4** "rally" design. An elevated, rounded pledge-ledger row on a
 * clean surface (no gradient): a leading donor avatar in a soft-primary well, a
 * bold donor name with a glyph + labelled status {@link Badge} (never color
 * alone), an optional due-date chip, a trailing bold pledged amount (integer
 * cents → `formatMoney`), and — for still-open (pending/overdue) pledges — a
 * "Mark fulfilled" action. The whole row is pressable via `onPress`. Identical
 * props/behavior to {@link PledgeRowProps}. Token-only colors via
 * `useXenitionTheme()`.
 */
export function PledgeRowV4({
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
}: PledgeRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS[status];
  const open = status === 'pending' || status === 'overdue';
  const label = `${donorName}, ${formatMoney(amountCents, currency)} pledge, ${meta.label}`;

  const containerStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      minHeight: 44,
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

  const inner = (
    <>
      <View style={{ height: 44, width: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
        <Avatar name={donorName} src={avatarUrl} size="sm" />
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{donorName}</Text>
          <Badge tone={meta.tone} variant="soft">{`${meta.glyph} ${meta.label}`}</Badge>
        </View>
        {dueLabel ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: tokens.spacing.xs, paddingVertical: 2, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.lg, backgroundColor: withAlpha(colors.primary, 0.1) }}>
            <Icon glyph="📅" size="xs" />
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>{dueLabel}</Text>
          </View>
        ) : null}
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

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View accessibilityLabel={label} style={containerStyle}>
      {inner}
    </View>
  );
}
