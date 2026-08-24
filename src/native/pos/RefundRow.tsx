import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  REFUND_STATUS_META,
  REFUND_REASON_META,
  type RefundStatus,
  type RefundReason,
} from './internal';

export type RefundRowVariant = 'default' | 'selectable';

export interface RefundRowProps {
  /** Item / line name being refunded. */
  name: string;
  /** Quantity being returned. */
  quantity?: number;
  /** Refund amount in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Why the item is coming back — glyph + word chip. */
  reason?: RefundReason;
  /** Refund lifecycle status — glyph + word pill. */
  status?: RefundStatus;
  /** Restock flag (word, not color alone). */
  restock?: boolean;
  /**
   * `selectable` renders a checkbox so a clerk can choose which lines to
   * refund; `selected`/`onToggle` drive it.
   */
  variant?: RefundRowVariant;
  /** Selection state (for `selectable`). */
  selected?: boolean;
  /** Toggle handler (for `selectable`). */
  onToggle?: () => void;
  /** Tap handler for the whole row. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line of a return / refund: item, quantity, amount (integer **cents** via
 * `formatMoney`), the return reason and refund status as **glyph + word** chips
 * (never color alone), and an optional restock flag. In `selectable` mode a
 * token-styled checkbox (reflected in `accessibilityState.checked`) lets a clerk
 * pick lines to refund. Token-only colors.
 */
export function RefundRow({
  name,
  quantity = 1,
  amountCents,
  currency = 'USD',
  reason,
  status,
  restock,
  variant = 'default',
  selected = false,
  onToggle,
  onPress,
  testID,
  style,
}: RefundRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selectable = variant === 'selectable';

  const checkbox = selectable ? (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`Refund ${name}`}
      onPress={onToggle}
      hitSlop={8}
      style={{
        width: 24,
        height: 24,
        borderRadius: tokens.radius.sm,
        borderWidth: 1,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primary : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected ? (
        <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
          ✓
        </Text>
      ) : null}
    </Pressable>
  ) : null;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {checkbox}
      <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {quantity > 1 ? `${quantity}× ` : ''}
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {reason ? <StatusPill meta={REFUND_REASON_META[reason]} variant="inline" size="sm" /> : null}
          {status ? <StatusPill meta={REFUND_STATUS_META[status]} variant="soft" size="sm" /> : null}
          {restock != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {restock ? '↩ Restock' : 'No restock'}
            </Text>
          ) : null}
        </View>
      </View>
      <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
        −{formatMoney(safeCents(amountCents), currency)}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Refund ${name}, ${formatMoney(safeCents(amountCents), currency)}`}
        onPress={onPress}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
