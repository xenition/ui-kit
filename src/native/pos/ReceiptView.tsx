import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  PAYMENT_METHOD_META,
  type PaymentMethod,
} from './internal';

export interface ReceiptLine {
  /** Item name. */
  name: string;
  /** Quantity (default 1). */
  quantity?: number;
  /** Line total in integer **cents**. */
  amountCents: number;
  /** Optional muted sub-line (modifiers / notes). */
  detail?: string;
}

export interface ReceiptTender {
  /** Tender type. */
  method: PaymentMethod;
  /** Amount applied in integer **cents**. */
  amountCents: number;
}

export type ReceiptViewVariant = 'full' | 'compact';

export interface ReceiptViewProps {
  /** Merchant / store name shown at the top. */
  merchant?: string;
  /** Address / contact lines under the merchant. */
  addressLines?: string[];
  /** Human order/receipt reference. */
  orderNumber?: string;
  /** Pre-formatted timestamp string. */
  timestamp?: string;
  /** Purchased lines. When empty an {@link EmptyState} renders. */
  items: ReceiptLine[];
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Subtotal in cents. */
  subtotalCents?: number;
  /** Discount in cents (shown negative). */
  discountCents?: number;
  /** Tax in cents. */
  taxCents?: number;
  /** Tip / gratuity in cents. */
  tipCents?: number;
  /** Grand total in cents. */
  totalCents: number;
  /** Tenders applied (cash/card/…); change is derived when they exceed total. */
  tenders?: ReceiptTender[];
  /** Footer note (e.g. "Thank you!"). */
  footer?: string;
  /** Density. `compact` hides the address block and per-line details. */
  variant?: ReceiptViewVariant;
  /** Empty-state copy when there are no items. */
  emptyLabel?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A token-styled printed-receipt facsimile — pure `View`/`Text`, no printer and
 * no dependency. Header (merchant + address + order ref), item lines, the
 * subtotal / discount / tax / tip / total ladder, tenders with derived change,
 * and a footer. Money is integer **cents** throughout via `formatMoney`. An
 * empty item list renders a labelled {@link EmptyState}. Token-only colors.
 */
export function ReceiptView({
  merchant,
  addressLines,
  orderNumber,
  timestamp,
  items,
  currency = 'USD',
  subtotalCents,
  discountCents,
  taxCents,
  tipCents,
  totalCents,
  tenders,
  footer,
  variant = 'full',
  emptyLabel = 'No items on this receipt',
  testID,
  style,
}: ReceiptViewProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const rule = (
    <View style={{ height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.sm }} />
  );

  const Row = ({
    label,
    value,
    strong,
    tone,
  }: {
    label: string;
    value: string;
    strong?: boolean;
    tone?: 'muted' | 'onSurface' | 'success';
  }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text
        style={{
          color: strong ? colors.onSurface : colors.muted,
          fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm,
          fontWeight: strong ? '700' : '400',
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: tone === 'success' ? colors.success : strong ? colors.onSurface : colors.onSurface,
          fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm,
          fontWeight: strong ? '700' : '400',
        }}
      >
        {value}
      </Text>
    </View>
  );

  const tendered = (tenders ?? []).reduce((acc, t) => acc + safeCents(t.amountCents), 0);
  const changeDue = tenders && tenders.length > 0 ? tendered - safeCents(totalCents) : 0;

  return (
    <View
      testID={testID}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <View style={{ alignItems: 'center', gap: 2 }}>
        {merchant ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }}>
            {merchant}
          </Text>
        ) : null}
        {!compact && addressLines
          ? addressLines.map((line, i) => (
              <Text key={i} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
                {line}
              </Text>
            ))
          : null}
        {orderNumber || timestamp ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
            {[orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </View>

      {rule}

      {items.length === 0 ? (
        <EmptyState title={emptyLabel} />
      ) : (
        <View style={{ gap: tokens.spacing.xs }}>
          {items.map((item, i) => {
            const qty = item.quantity ?? 1;
            return (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                    {qty > 1 ? `${qty}× ` : ''}
                    {item.name}
                  </Text>
                  {!compact && item.detail ? (
                    <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                      {item.detail}
                    </Text>
                  ) : null}
                </View>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                  {formatMoney(item.amountCents, currency)}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {rule}

      <View style={{ gap: tokens.spacing.xs }}>
        {typeof subtotalCents === 'number' ? (
          <Row label="Subtotal" value={formatMoney(subtotalCents, currency)} />
        ) : null}
        {typeof discountCents === 'number' && discountCents > 0 ? (
          <Row label="Discount" value={`−${formatMoney(discountCents, currency)}`} tone="success" />
        ) : null}
        {typeof taxCents === 'number' ? <Row label="Tax" value={formatMoney(taxCents, currency)} /> : null}
        {typeof tipCents === 'number' && tipCents > 0 ? (
          <Row label="Tip" value={formatMoney(tipCents, currency)} />
        ) : null}
        <Row label="Total" value={formatMoney(totalCents, currency)} strong />
      </View>

      {tenders && tenders.length > 0 ? (
        <>
          {rule}
          <View style={{ gap: tokens.spacing.xs }}>
            {tenders.map((t, i) => {
              const meta = PAYMENT_METHOD_META[t.method];
              return (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StatusPill meta={meta} variant="inline" size="sm" />
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                    {formatMoney(t.amountCents, currency)}
                  </Text>
                </View>
              );
            })}
            {changeDue > 0 ? <Row label="Change" value={formatMoney(changeDue, currency)} /> : null}
          </View>
        </>
      ) : null}

      {footer ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', marginTop: tokens.spacing.md }}>
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
