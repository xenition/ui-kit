import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { formatMoney } from './internal';

export interface EventTicketRowProps {
  /** Ticket tier name, e.g. `Gala Table` or `General Entry`. */
  name: string;
  /** Ticket price, integer **cents**. `0` renders as the localized zero (free). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Short perks / description line. */
  description?: string;
  /** Portion of the price that is tax-deductible, integer **cents**. */
  deductibleCents?: number;
  /** Remaining inventory; `0` marks the row sold out and disables it. */
  remaining?: number;
  /** Force the sold-out state regardless of `remaining`. */
  soldOut?: boolean;
  /** Current selection (radio-style). */
  selected?: boolean;
  /** Fires when chosen (never fires while sold out / disabled). */
  onSelect?: () => void;
  /** Disable interaction without the sold-out styling. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A selectable charity-event ticket row: tier name, price (integer cents →
 * `formatMoney`), optional tax-deductible portion, perks, and inventory, with a
 * radio indicator. Selection is conveyed by a filled indicator, a bold border,
 * and `accessibilityState` — not color alone. Sold-out rows are dimmed, badged
 * and non-interactive. All colors come from the compiled theme tokens — no
 * literal colors.
 */
export function EventTicketRow({
  name,
  priceCents,
  currency = 'USD',
  description,
  deductibleCents,
  remaining,
  soldOut,
  selected = false,
  onSelect,
  disabled = false,
  style,
}: EventTicketRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isSoldOut = soldOut === true || remaining === 0;
  const isDisabled = disabled || isSoldOut;
  const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;
  const priceLabel = formatMoney(priceCents, currency);

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: isDisabled }}
      accessibilityLabel={`${name}, ${priceLabel}${isSoldOut ? ', sold out' : ''}`}
      disabled={isDisabled}
      onPress={onSelect}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: pressed && !isDisabled ? tokens.ramps.neutral[50] : colors.surface,
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{name}</Text>
          {isSoldOut ? <Badge tone="danger">Sold out</Badge> : lowStock ? <Badge tone="warn">{`${remaining} left`}</Badge> : null}
        </View>
        {description ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text> : null}
        {typeof deductibleCents === 'number' ? (
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs }}>
            {`${formatMoney(deductibleCents, currency)} tax-deductible`}
          </Text>
        ) : null}
      </View>

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{priceLabel}</Text>

      <View
        style={{
          width: tokens.spacing.lg,
          height: tokens.spacing.lg,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: selected ? colors.primary : colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected ? (
          <View style={{ width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
        ) : null}
      </View>
    </Pressable>
  );
}
