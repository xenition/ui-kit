import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { BADGE_V4, remainingParts, spokenLine } from './internal/event-v4';
import type { TicketTypeRowProps } from './TicketTypeRow';

export interface TicketTypeRowV4Props extends TicketTypeRowProps {
  /** At or below this many remaining, the row is low stock. Default `10`. */
  lowStockAt?: number;
  /** The scarcity caption. Default `'2 left'`. */
  formatRemaining?: (remaining: number) => string;
  /** The sold-out badge and announcement. Default `'Sold out'`. */
  soldOutLabel?: string;
}

/**
 * **V4 ticket type row** — same props as {@link TicketTypeRow} plus
 * `lowStockAt`, `formatRemaining` and `soldOutLabel`.
 *
 * ## Five changes
 *
 * 1. **Negative inventory is sold out, not purchasable.** `remaining === 0`
 *    was a strict equality, so a tier at `-3` — an oversold count, which is
 *    exactly the state a ticketing backend produces under load — was neither
 *    sold out nor low stock: the row rendered normal, enabled, and `onSelect`
 *    fired. `remainingParts()` treats anything at or below zero as sold out.
 * 2. **`lowStockAt` replaces the hard-coded `<= 10`**, which was the same
 *    threshold for a 40-seat workshop and a 40,000-seat stadium.
 * 3. **The row announces its scarcity.** The name was `"General, $49"` and
 *    replaced the subtree, so "2 left" — the one fact that changes whether
 *    someone buys now — was drawn and never spoken.
 * 4. **The row clears 44 and a press is a state layer**, where the base
 *    pressed to `tokens.ramps.neutral[50]`, a light-oriented ramp step that
 *    flashes white on a dark page.
 * 5. **Disabled is M3's 0.38**, not the 0.6 the base guessed at.
 *
 * **Renders nothing without a `name`.**
 */
export function TicketTypeRowV4({
  name,
  price,
  description,
  remaining,
  soldOut,
  lowStockAt = 10,
  formatRemaining,
  soldOutLabel = 'Sold out',
  selected = false,
  onSelect,
  disabled = false,
  style,
}: TicketTypeRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const stock = remainingParts(remaining, soldOut, lowStockAt);
  const isDisabled = disabled || stock.soldOut;
  const tap = minTap(tokens.spacing);
  const scarcity =
    stock.lowStock && stock.remaining != null
      ? (formatRemaining ?? ((n: number) => `${n} left`))(stock.remaining)
      : null;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: isDisabled }}
      accessibilityLabel={spokenLine([
        name,
        price,
        description,
        stock.soldOut ? soldOutLabel : scarcity,
      ])}
      disabled={isDisabled}
      onPress={onSelect}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          minHeight: tap,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: pressed && !isDisabled ? pressFill(theme) : colors.card,
          opacity: disabledOpacity(theme.state, isDisabled),
        },
        style,
      ]}
    >
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          <TextV4 size="base" weight="bold" tone="onCard">
            {name}
          </TextV4>
          {stock.soldOut ? (
            <BadgeV4 {...BADGE_V4} tone="danger">
              {soldOutLabel}
            </BadgeV4>
          ) : scarcity ? (
            <BadgeV4 {...BADGE_V4} tone="warn">
              {scarcity}
            </BadgeV4>
          ) : null}
        </View>
        {description ? (
          <TextV4 size="sm" tone="mutedText">
            {description}
          </TextV4>
        ) : null}
      </View>

      <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
        {price}
      </TextV4>

      {/* Radio indicator — filled when selected, so state is shape + a11y, not
          colour. Hidden from the reader: the row already announces `selected`. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
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
          <View
            style={{
              width: tokens.spacing.sm,
              height: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
