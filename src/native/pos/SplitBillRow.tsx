import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, safeCents, withAlpha } from './internal';

export type SplitBillRowVariant = 'even' | 'custom';

export interface SplitBillRowProps {
  /** Party label (e.g. "Guest 1", "Card ending 4242"). */
  label: string;
  /** This party's share in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** How many items assigned to this split (shown when > 0). */
  itemCount?: number;
  /** Already settled — shows a "Paid" flag (word, not color alone). */
  paid?: boolean;
  /** Selection state for the active party being edited/charged. */
  selected?: boolean;
  /** Amount already tendered against this split, in cents. */
  paidCents?: number;
  /** Select/press handler. */
  onPress?: () => void;
  /** Toggle-paid handler; renders a settle control. */
  onTogglePaid?: () => void;
  /** `even` (default) is an equal share; `custom` hints an editable amount. */
  variant?: SplitBillRowVariant;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One party's slice when a bill is split — label, item count, this party's
 * amount (integer **cents** via `formatMoney`), a remaining/paid indicator, and
 * a settle toggle. `paid` is conveyed by a **glyph + word** flag, never color
 * alone; `selected` draws an accent ring reflected in `accessibilityState`.
 * Token-only: accent fill via a token-tinted `withAlpha`.
 */
export function SplitBillRow({
  label,
  amountCents,
  currency = 'USD',
  itemCount,
  paid = false,
  selected = false,
  paidCents,
  onPress,
  onTogglePaid,
  variant = 'even',
  testID,
  style,
}: SplitBillRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const amount = safeCents(amountCents);
  const settled = paid || (typeof paidCents === 'number' && safeCents(paidCents) >= amount && amount > 0);
  const remaining = typeof paidCents === 'number' ? Math.max(0, amount - safeCents(paidCents)) : amount;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? withAlpha(colors.primary, 0.08) : colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {label}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {variant === 'custom' ? 'Custom' : 'Even split'}
          {typeof itemCount === 'number' && itemCount > 0 ? ` · ${itemCount} item${itemCount === 1 ? '' : 's'}` : ''}
        </Text>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {formatMoney(amount, currency)}
        </Text>
        {settled ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            ✓ Paid
          </Text>
        ) : typeof paidCents === 'number' && safeCents(paidCents) > 0 ? (
          <Text style={{ color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {formatMoney(remaining, currency)} left
          </Text>
        ) : null}
      </View>

      {onTogglePaid ? (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: settled }}
          accessibilityLabel={settled ? `Mark ${label} unpaid` : `Mark ${label} paid`}
          onPress={onTogglePaid}
          hitSlop={8}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: tokens.radius.sm,
              borderWidth: 1,
              borderColor: settled ? colors.success : colors.border,
              backgroundColor: settled ? colors.success : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {settled ? (
              <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                ✓
              </Text>
            ) : null}
          </View>
        </Pressable>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected }}
        accessibilityLabel={`${label}, ${formatMoney(amount, currency)}${settled ? ', paid' : ''}`}
        onPress={onPress}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
