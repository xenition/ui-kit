import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, Badge, type BadgeTone } from '../primitives';
import { withAlpha, formatMoney, type MoneyFormatter } from './internal/format';

/** Stock state — text + glyph + color (never color-alone). */
export type MaterialStock = 'in-stock' | 'low' | 'back-ordered';

interface StockDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const MATERIAL_STOCK: Record<MaterialStock, StockDescriptor> = {
  'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
  low: { label: 'Low', glyph: '▲', tone: 'warn' },
  'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};

export interface MaterialsRowProps {
  /** Part / material name (e.g. "3/4in copper elbow"). */
  name: string;
  /** SKU / part number shown as a meta line. */
  sku?: string;
  /** Quantity used / requested. */
  quantity: number;
  /** Unit of measure (e.g. "ea", "ft", "box"). Default `ea`. */
  unit?: string;
  /** Unit price in integer **cents**. */
  unitCents: number;
  /** Stock availability — text + glyph + color. */
  stock?: MaterialStock;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Fires on row press (e.g. edit the line item). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a materials / parts list: a leading box glyph disc, a name/SKU
 * stack with a quantity × unit-price breakdown, an optional stock pill (text +
 * glyph + a color that traces to a `SemanticColors` slot — never color alone),
 * and a right-aligned extended total (`qty × unit` in integer cents through
 * `formatMoney`, guarded against negatives). Becomes a button only when
 * `onPress` is supplied. No literals.
 */
export function MaterialsRow({
  name,
  sku,
  quantity,
  unit = 'ea',
  unitCents,
  stock,
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: MaterialsRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = stock ? MATERIAL_STOCK[stock] : undefined;
  const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
  const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
  const totalCents = Math.round(qty * unitSafe);

  const row = (
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
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.1),
        }}
      >
        <Icon glyph="📦" accessibilityLabel="Material" />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {qty} {unit} × {format(unitSafe, currency)}
          </Text>
          {sku != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {sku}</Text>
          ) : null}
        </View>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {format(totalCents, currency)}
        </Text>
        {sd ? (
          <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${qty} ${unit}, ${format(totalCents, currency)}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
