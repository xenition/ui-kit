import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { PriceTag } from '../commerce/PriceTag';
import type { MoneyFormatter } from '../commerce/money';

/** Fulfilment state of a print order line. */
export type PrintOrderStatus = 'pending' | 'printing' | 'shipped' | 'delivered';

const STATUS: Record<PrintOrderStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: 'Pending', tone: 'neutral' },
  printing: { label: 'Printing', tone: 'warn' },
  shipped: { label: 'Shipped', tone: 'primary' },
  delivered: { label: 'Delivered', tone: 'success' },
};

export interface PrintOrderRowProps {
  /** Product name (e.g. "Fine-art matte print"). */
  product: string;
  /** Print size label (e.g. "16 × 24 in"). */
  size?: string;
  /** Finish / paper (e.g. "Lustre"). */
  finish?: string;
  /** Quantity ordered (default 1, clamped to >= 1 in the display). */
  quantity?: number;
  /** Unit price in integer cents. */
  unitPriceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Fulfilment status (default `pending`). */
  status?: PrintOrderStatus;
  /** Press handler for the row. */
  onPress?: () => void;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single print-order line — product, size/finish/quantity meta, a status
 * `Badge`, and a line total ({@link PriceTag} of `unitPriceCents × quantity`).
 * Quantity is clamped to at least 1 so the total is always guarded. Status is a
 * labelled badge (not color alone). Optional `onPress` exposes the row as a
 * `button`. Token-only colors.
 */
export function PrintOrderRow({
  product,
  size,
  finish,
  quantity = 1,
  unitPriceCents,
  currency = 'USD',
  status = 'pending',
  onPress,
  formatMoney,
  style,
}: PrintOrderRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const qty = Math.max(1, Math.floor(quantity));
  const meta = STATUS[status];

  const metaBits: string[] = [];
  if (size) metaBits.push(size);
  if (finish) metaBits.push(finish);
  metaBits.push(`×${qty}`);

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  const inner = (
    <>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {product}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {metaBits.join(' · ')}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <PriceTag cents={unitPriceCents * qty} currency={currency} formatMoney={formatMoney} size="sm" />
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${product}, ${qty}, ${meta.label}`}
        onPress={onPress}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{inner}</View>;
}
