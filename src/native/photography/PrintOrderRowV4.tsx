import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, type BadgeTone } from '../primitives';
import { PriceTag } from '../commerce/PriceTag';
import type { PrintOrderRowProps, PrintOrderStatus } from './PrintOrderRow';

/** Drop-in for {@link PrintOrderRowProps} — same props, the V4 "studio" design. */
export type PrintOrderRowV4Props = PrintOrderRowProps;

const STATUS: Record<PrintOrderStatus, { label: string; tone: BadgeTone; glyph: string }> = {
  pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
  printing: { label: 'Printing', tone: 'warn', glyph: '🖨' },
  shipped: { label: 'Shipped', tone: 'primary', glyph: '📦' },
  delivered: { label: 'Delivered', tone: 'success', glyph: '✅' },
};

/**
 * PrintOrderRow — **V4** "studio" design (native parity of the web V4). The
 * matted take on a print-order line: an elevated clean-surface row with a leading
 * glyph tile floating inside a thin neutral **mat**, a bold product name, a soft
 * muted meta line (size · finish · ×qty), and a trailing line total
 * ({@link PriceTag} of `unitPriceCents × quantity`) above a labelled status
 * `Badge`. Every `status` value carries glyph + token tone + label (never color
 * alone). Quantity is clamped to at least 1. Identical props/behavior to
 * {@link PrintOrderRowProps}; optional `onPress` exposes the row as a `button`.
 * Token-only colors via `useXenitionTheme()`.
 */
export function PrintOrderRowV4({
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
}: PrintOrderRowV4Props): React.ReactElement {
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
      gap: tokens.spacing.md,
      padding: tokens.spacing.md,
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
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          {meta.glyph}
        </Text>
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
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
