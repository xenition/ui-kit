import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  withAlpha,
  REFUND_STATUS_META,
  REFUND_REASON_META,
  type RefundStatus,
  type RefundReason,
} from './internal';
import type { RefundRowProps } from './RefundRow';

/** Re-exported so consumers of the V4 line can type refund reasons/status. */
export type { RefundReason, RefundStatus };

/** Drop-in for {@link RefundRowProps} — same props, the V4 "register" design. */
export type RefundRowV4Props = RefundRowProps;

/**
 * RefundRow — **V4** "register" design. The tactile checkout take on a return
 * line: a return glyph in a soft-tint disc, the item + quantity, the reason and
 * refund status as **glyph + word** chips (never color alone), an optional restock
 * flag, and the **refunded amount big and bold** in `tabular-nums` inside a
 * danger-tinted pill. In `selectable` mode a large (≥44px) token-styled checkbox
 * (reflected in `accessibilityState.checked`) lets a clerk pick lines to refund.
 * Same props/behavior as {@link RefundRowProps}; token-only tints via
 * `useXenitionTheme()` + `withAlpha`. Dark-mode safe.
 */
export function RefundRowV4({
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
}: RefundRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const selectable = variant === 'selectable';

  const lead = selectable ? (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`Refund ${name}`}
      onPress={onToggle}
      hitSlop={8}
      style={{
        width: 44,
        height: 44,
        borderRadius: tokens.radius.md,
        borderWidth: 2,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primary : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {selected ? (
        <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
          ✓
        </Text>
      ) : null}
    </Pressable>
  ) : (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: withAlpha(colors.danger, 0.14),
      }}
    >
      <Text allowFontScaling={false} style={{ color: colors.danger, fontSize: tokens.typography.scale.base }}>
        ↩
      </Text>
    </View>
  );

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      {lead}
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
      <View
        style={{
          borderRadius: tokens.radius.md,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
          backgroundColor: withAlpha(colors.danger, 0.14),
        }}
      >
        <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
          −{formatMoney(safeCents(amountCents), currency)}
        </Text>
      </View>
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
