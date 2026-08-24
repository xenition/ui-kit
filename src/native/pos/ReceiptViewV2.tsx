import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { shadow } from '../primitives/internal/elevation';
import { formatMoney, safeCents, withAlpha, PAYMENT_METHOD_META } from './internal';
import type { ReceiptViewProps } from './ReceiptView';

/** Drop-in alternate of {@link ReceiptViewProps} — identical prop contract. */
export type ReceiptViewV2Props = ReceiptViewProps;

/**
 * ReceiptView — design variant **V2**: an **elevated paper receipt**. Where V1
 * is a flat bordered card, V2 floats on a shadowed surface, prints a dashed
 * **perforation** strip beneath the header, and wraps the grand total in a
 * primary-tinted **highlighted band** so the amount due reads at a glance across
 * a counter. Item ladder, tenders with derived change, and footer as in V1. An
 * empty item list renders a labelled {@link EmptyState}. Same props as
 * {@link ReceiptViewProps}. Token-only; money is integer cents.
 */
export function ReceiptViewV2({
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
}: ReceiptViewV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';

  const Perforation = (): React.ReactElement => (
    <Text
      numberOfLines={1}
      style={{ color: colors.border, marginVertical: tokens.spacing.sm, fontSize: tokens.typography.scale.sm, letterSpacing: 2 }}
    >
      {'– '.repeat(40)}
    </Text>
  );

  const Row = ({ label, value, tone }: { label: string; value: string; tone?: 'muted' | 'success' }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      <Text style={{ color: tone === 'success' ? colors.success : colors.onSurface, fontSize: tokens.typography.scale.sm }}>{value}</Text>
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
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      <View style={{ alignItems: 'center', gap: 2 }}>
        {merchant ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }}>
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

      <Perforation />

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

      <Perforation />

      <View style={{ gap: tokens.spacing.xs }}>
        {typeof subtotalCents === 'number' ? <Row label="Subtotal" value={formatMoney(subtotalCents, currency)} /> : null}
        {typeof discountCents === 'number' && discountCents > 0 ? (
          <Row label="Discount" value={`−${formatMoney(discountCents, currency)}`} tone="success" />
        ) : null}
        {typeof taxCents === 'number' ? <Row label="Tax" value={formatMoney(taxCents, currency)} /> : null}
        {typeof tipCents === 'number' && tipCents > 0 ? <Row label="Tip" value={formatMoney(tipCents, currency)} /> : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, 0.12),
        }}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Total</Text>
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
          {formatMoney(totalCents, currency)}
        </Text>
      </View>

      {tenders && tenders.length > 0 ? (
        <View style={{ gap: tokens.spacing.xs, marginTop: tokens.spacing.sm }}>
          {tenders.map((t, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <StatusPill meta={PAYMENT_METHOD_META[t.method]} variant="inline" size="sm" />
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {formatMoney(t.amountCents, currency)}
              </Text>
            </View>
          ))}
          {changeDue > 0 ? <Row label="Change" value={formatMoney(changeDue, currency)} /> : null}
        </View>
      ) : null}

      {footer ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', marginTop: tokens.spacing.md }}>
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
