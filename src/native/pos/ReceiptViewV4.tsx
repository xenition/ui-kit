import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { formatMoney, safeCents, PAYMENT_METHOD_META } from './internal';
import type { ReceiptViewProps } from './ReceiptView';

/** Drop-in for {@link ReceiptViewProps} — same props, the V4 "register" design. */
export type ReceiptViewV4Props = ReceiptViewProps;

/**
 * ReceiptView — **V4** "register" design. The tactile checkout take on a printed
 * receipt: a monospace-feel item list, a clean subtotal / discount / tax / tip
 * block, and — after a **dashed tear line** — the **grand total big and bold** in
 * `tabular-nums` weight (the number that closes the sale). Header (merchant +
 * address + order ref), tenders with derived change, and a footer are preserved.
 * Money is integer **cents** throughout via `formatMoney`. An empty item list
 * renders a labelled {@link EmptyState}. Same props/behavior as
 * {@link ReceiptViewProps}; token-only via `useXenitionTheme()`.
 */
export function ReceiptViewV4({
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
}: ReceiptViewV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const mono = 'monospace' as const;

  const rule = (
    <View style={{ height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.sm }} />
  );

  const Row = ({
    label,
    value,
    tone,
  }: {
    label: string;
    value: string;
    tone?: 'muted' | 'success';
  }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontFamily: mono }}>
        {label}
      </Text>
      <Text
        style={{
          color: tone === 'success' ? colors.success : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontFamily: mono,
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
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '800',
              textAlign: 'center',
              fontFamily: mono,
              letterSpacing: 1,
            }}
          >
            {merchant.toUpperCase()}
          </Text>
        ) : null}
        {!compact && addressLines
          ? addressLines.map((line, i) => (
              <Text key={i} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', fontFamily: mono }}>
                {line}
              </Text>
            ))
          : null}
        {orderNumber || timestamp ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', fontFamily: mono }}>
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
                  <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontFamily: mono }}>
                    {qty > 1 ? `${qty}× ` : ''}
                    {item.name}
                  </Text>
                  {!compact && item.detail ? (
                    <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontFamily: mono }}>
                      {item.detail}
                    </Text>
                  ) : null}
                </View>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontFamily: mono }}>
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
      </View>

      {/* dashed tear line above the grand total */}
      <View
        style={{
          marginVertical: tokens.spacing.md,
          borderTopWidth: 2,
          borderStyle: 'dashed',
          borderColor: colors.border,
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800', fontFamily: mono, letterSpacing: 1 }}>
          TOTAL
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', fontFamily: mono }}>
          {formatMoney(totalCents, currency)}
        </Text>
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
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontFamily: mono }}>
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
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', marginTop: tokens.spacing.md, fontFamily: mono }}>
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
