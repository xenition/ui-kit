import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { formatMoney, safeCents, PAYMENT_METHOD_META } from './internal';
import type { ReceiptViewProps } from './ReceiptView';

/** Drop-in alternate of {@link ReceiptViewProps} — identical prop contract. */
export type ReceiptViewV3Props = ReceiptViewProps;

/**
 * ReceiptView — design variant **V3**: a **minimal, total-first digital
 * receipt**. Where V1/V2 print merchant → items → total top-to-bottom, V3 leads
 * with the grand total as the hero, drops all card chrome, and lists the items
 * and adjustment ladder underneath as quiet supporting text — the shape of an
 * order-confirmation screen rather than a paper slip. An empty item list renders
 * a labelled {@link EmptyState}. Same props as {@link ReceiptViewProps}.
 * Token-only; money is integer cents.
 */
export function ReceiptViewV3({
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
}: ReceiptViewV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const Row = ({ label, value, tone }: { label: string; value: string; tone?: 'success' }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text style={{ color: tone === 'success' ? colors.success : colors.muted, fontSize: tokens.typography.scale.xs }}>{value}</Text>
    </View>
  );

  const tendered = (tenders ?? []).reduce((acc, t) => acc + safeCents(t.amountCents), 0);
  const changeDue = tenders && tenders.length > 0 ? tendered - safeCents(totalCents) : 0;
  const caption = [merchant, orderNumber ? `#${orderNumber}` : null, timestamp].filter(Boolean).join(' · ');

  return (
    <View style={[{ gap: tokens.spacing.md }, style]} testID={testID}>
      <View style={{ gap: 2 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', textTransform: 'uppercase' }}>
          Total
        </Text>
        <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
          {formatMoney(totalCents, currency)}
        </Text>
        {caption ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{caption}</Text> : null}
        {!compact && addressLines
          ? addressLines.map((line, i) => (
              <Text key={i} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {line}
              </Text>
            ))
          : null}
      </View>

      <View style={{ height: 1, backgroundColor: colors.border }} />

      {items.length === 0 ? (
        <EmptyState title={emptyLabel} />
      ) : (
        <View style={{ gap: tokens.spacing.xs }}>
          {items.map((item, i) => {
            const qty = item.quantity ?? 1;
            return (
              <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.md }}>
                <Text numberOfLines={1} style={{ flex: 1, minWidth: 0, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {qty > 1 ? `${qty}× ` : ''}
                  {item.name}
                  {!compact && item.detail ? ` — ${item.detail}` : ''}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{formatMoney(item.amountCents, currency)}</Text>
              </View>
            );
          })}
        </View>
      )}

      <View style={{ gap: tokens.spacing.xs / 2 }}>
        {typeof subtotalCents === 'number' ? <Row label="Subtotal" value={formatMoney(subtotalCents, currency)} /> : null}
        {typeof discountCents === 'number' && discountCents > 0 ? (
          <Row label="Discount" value={`−${formatMoney(discountCents, currency)}`} tone="success" />
        ) : null}
        {typeof taxCents === 'number' ? <Row label="Tax" value={formatMoney(taxCents, currency)} /> : null}
        {typeof tipCents === 'number' && tipCents > 0 ? <Row label="Tip" value={formatMoney(tipCents, currency)} /> : null}
      </View>

      {tenders && tenders.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {tenders.map((t, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <StatusPill meta={PAYMENT_METHOD_META[t.method]} variant="inline" size="sm" />
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{formatMoney(t.amountCents, currency)}</Text>
            </View>
          ))}
          {changeDue > 0 ? <Row label="Change" value={formatMoney(changeDue, currency)} /> : null}
        </View>
      ) : null}

      {footer ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{footer}</Text> : null}
    </View>
  );
}
