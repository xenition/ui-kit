import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  EXPENSE_STATUS_META,
  EXPENSE_CATEGORY_META,
  type ExpenseStatus,
  type ExpenseCategory,
} from './internal';

export type ExpenseClaimVariant = 'default' | 'compact';

export interface ExpenseClaimProps {
  /** Merchant / vendor name. */
  merchant: string;
  /** Expense category — glyph + word chip. */
  category: ExpenseCategory;
  /** Claim amount in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Pre-formatted transaction date. */
  date?: string;
  /** Claim lifecycle status — glyph + word pill. */
  status: ExpenseStatus;
  /** Free-text description / memo. */
  description?: string;
  /** Whether a receipt is attached — flagged by word + glyph. */
  hasReceipt?: boolean;
  /** Show approve/reject actions (meaningful while `submitted`). */
  actionable?: boolean;
  /** Density. */
  variant?: ExpenseClaimVariant;
  onApprove?: () => void;
  onReject?: () => void;
  /** Tap handler for the whole card. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * An expense-claim card: merchant, category, amount (integer **cents** via
 * `formatMoney`), date, and lifecycle status. Status is a glyph + word pill
 * (approved → success, rejected → danger, never color alone) and a missing
 * receipt is flagged by a word. When `actionable` and still `submitted`,
 * approve / reject buttons render for an approver. `compact` drops the memo.
 * All colors are theme tokens — no literals.
 */
export function ExpenseClaim({
  merchant,
  category,
  amountCents,
  currency = 'USD',
  date,
  status,
  description,
  hasReceipt,
  actionable = false,
  variant = 'default',
  onApprove,
  onReject,
  onPress,
  testID,
  style,
}: ExpenseClaimProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const catMeta = EXPENSE_CATEGORY_META[category];
  const showActions = actionable && status === 'submitted';

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {merchant}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text style={{ fontSize: tokens.typography.scale.sm }}>{catMeta.glyph}</Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {catMeta.label}
              {date ? ` · ${date}` : ''}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {formatMoney(amountCents, currency)}
          </Text>
          <StatusPill meta={EXPENSE_STATUS_META[status]} variant="inline" size="sm" />
        </View>
      </View>

      {!compact && description ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {description}
        </Text>
      ) : null}

      {hasReceipt != null ? (
        <Text style={{ color: hasReceipt ? colors.muted : colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {hasReceipt ? '📎 Receipt attached' : '⚠ No receipt'}
        </Text>
      ) : null}

      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <Button size="sm" tone="success" onPress={onApprove} style={{ flex: 1 }}>
            Approve
          </Button>
          <Button size="sm" variant="outline" tone="danger" onPress={onReject} style={{ flex: 1 }}>
            Reject
          </Button>
        </View>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Expense ${merchant}, ${formatMoney(amountCents, currency)}, ${EXPENSE_STATUS_META[status].label}`}
        onPress={onPress}
        testID={testID}
      >
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
