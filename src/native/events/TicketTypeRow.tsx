import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';

export interface TicketTypeRowProps {
  /** Tier name, e.g. `General Admission`. */
  name: string;
  /** Pre-formatted price, e.g. `$49` or `Free`. */
  price: string;
  /** Short description / perks line. */
  description?: string;
  /** Remaining inventory; `0` marks the row sold out and disables it. */
  remaining?: number;
  /** Force the sold-out state regardless of `remaining`. */
  soldOut?: boolean;
  /** Whether this row is the current selection. */
  selected?: boolean;
  /** Fires when the row is chosen (never fires while sold out/disabled). */
  onSelect?: () => void;
  /** Disable interaction without the sold-out styling. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A selectable ticket-tier row for a purchase sheet: name, price, description
 * and inventory, with a radio-style indicator on the right. Selection is
 * conveyed by a filled indicator, a bold border, and `accessibilityState`
 * (`selected` / `disabled`) — not color alone. Sold-out rows are dimmed,
 * badged, and non-interactive. Colors come from the compiled theme tokens; no
 * literal colors.
 */
export function TicketTypeRow({
  name,
  price,
  description,
  remaining,
  soldOut,
  selected = false,
  onSelect,
  disabled = false,
  style,
}: TicketTypeRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isSoldOut = soldOut === true || remaining === 0;
  const isDisabled = disabled || isSoldOut;
  const lowStock = !isSoldOut && typeof remaining === 'number' && remaining > 0 && remaining <= 10;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: isDisabled }}
      accessibilityLabel={`${name}, ${price}${isSoldOut ? ', sold out' : ''}`}
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
        {description ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
        ) : null}
      </View>

      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{price}</Text>

      {/* Radio indicator — filled when selected, so state is shape + a11y, not color. */}
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
