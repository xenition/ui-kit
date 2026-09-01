import * as React from 'react';
import { Image, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/nav-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { rowMetrics, rowTextStyle } from '../dashboard/internal/row-v4';
import { GenerativeCover } from './GenerativeCover';
import { PriceTagV4 } from './PriceTagV4';
import { QuantityStepperV4 } from './QuantityStepperV4';
import type { CartLineItemProps } from './CartLineItem';
import { MONEY_LINE_SIZE } from './internal/money-v4';

export interface CartLineItemV4Props extends CartLineItemProps {
  /**
   * The line's **unit** compare-at price in integer cents — what one of these
   * used to cost.
   *
   * When it is higher than `unitPriceCents`, the trailing figure becomes a
   * `PriceTagV4` carrying the struck original beside the line total, both
   * multiplied by `quantity` so the two numbers are comparable. That is the
   * whole discount treatment: **a sale price does not turn red** (brief §1.3,
   * `design.md` §35.4). A discount is emphasis, not status, and the struck
   * original is what a shopper already reads it from.
   */
  compareAtUnitPriceCents?: number;
}

/**
 * **V4 cart line** — the native twin of the web `CartLineItemV4`, the base
 * {@link CartLineItem}'s props plus
 * {@link CartLineItemV4Props.compareAtUnitPriceCents}, a different design line.
 *
 * A cart line is a **row**, so it takes the row metric from
 * `dashboard/internal/row-v4.ts` — M3's list-item tokens, two-line container 72
 * as a floor, 16 gutters, a 44 leading slot — rather than the ad-hoc
 * `paddingVertical: md` + 64 thumbnail the base drew. The point of importing
 * rather than restating: a cart line, a settings row and the `Subtotal` line
 * underneath it are then demonstrably one family, which is what
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3 calls the decision that matters most.
 *
 * Four changes beyond the metric:
 *
 * 1. **It composes, and does not redraw.** `PriceTagV4` for the money and
 *    `QuantityStepperV4` for the control — brief §1.7, a V4 composite composes
 *    V4 children, never the base line and never a hand-rolled price. The base
 *    printed the line total itself in a bare `Text`, which is how a cart ended
 *    up setting the same figure differently from the product card it came from
 *    (and, on this twin, in a different typeface).
 * 2. **The discount is carried by the price tag**, via
 *    {@link CartLineItemV4Props.compareAtUnitPriceCents} — the one component in
 *    the module that has already settled how a struck price is drawn and
 *    announced (`Was …`, a line-through, no red).
 * 3. **The remove control clears the tap floor.** The base's "Remove" was a
 *    bare `xs` label — roughly 12 points tall — sitting beside a stepper that a
 *    shopper is already tapping repeatedly. It keeps the word (a glyph alone is
 *    not a label) and gains a 44 target.
 * 4. **The row survives its empty case.** A line with no title and no variant
 *    renders nothing rather than an empty 72-point box with a thumbnail in it
 *    (§4.5).
 *
 * **The remove control stays `mutedText`, not `danger`.** Removing a line from
 * a cart is reversible and routine; spending the error tone on it is the same
 * mistake as painting a sale price red, one component along.
 */
export function CartLineItemV4({
  title,
  variantTitle,
  quantity,
  unitPriceCents,
  compareAtUnitPriceCents,
  currency = 'USD',
  imageUrl,
  imageAlt,
  slug,
  onQuantityChange,
  onRemove,
  min = 1,
  max,
  removeLabel,
  formatMoney: format,
  style,
}: CartLineItemV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = rowMetrics(theme);
  const tap = minTap(tokens.spacing);

  // §4.5: nothing to name, so nothing to draw. A thumbnail and a stepper
  // attached to no product is not a row, it is a hole in the list.
  if (title.trim() === '' && (variantTitle === undefined || variantTitle === '')) return null;

  const lineTotal = unitPriceCents * quantity;
  const compareLineTotal =
    typeof compareAtUnitPriceCents === 'number' && compareAtUnitPriceCents > unitPriceCents
      ? compareAtUnitPriceCents * quantity
      : undefined;

  return (
    <View
      testID="xen-cart-line-item"
      style={[
        {
          flexDirection: 'row',
          // `flex-start` and not the row family's `center`: this row is taller
          // than its leading slot (it carries a stepper), and a 44 thumbnail
          // floated in the middle of a 90-point row reads as detached from the
          // title it belongs to.
          alignItems: 'flex-start',
          gap: metrics.gap,
          paddingHorizontal: metrics.padX,
          paddingVertical: tokens.spacing.sm,
          minHeight: metrics.twoLine,
          backgroundColor: 'transparent',
        },
        style,
      ]}
    >
      <View
        style={{
          width: metrics.leading,
          height: metrics.leading,
          flexShrink: 0,
          overflow: 'hidden',
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            accessible
            accessibilityLabel={imageAlt ?? title}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          // The seeded cover is a *fallback*, not a design-line element — same
          // art, same seed, same props as the base drew.
          <GenerativeCover
            seed={slug ?? title}
            label={title}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </View>

      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {title}
        </TextV4>
        {variantTitle ? (
          // `mutedText`, not `muted`. `muted` is a fill and carries no contrast
          // promise; the whole base line used it as a text colour.
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {variantTitle}
          </TextV4>
        ) : null}
        {onQuantityChange ? (
          <QuantityStepperV4
            value={quantity}
            min={min}
            max={max}
            onChange={onQuantityChange}
            label={`Quantity for ${title}`}
            style={{ marginTop: tokens.spacing.xs }}
          />
        ) : (
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {`Qty ${quantity}`}
          </TextV4>
        )}
      </View>

      <View style={{ flexShrink: 0, alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        <PriceTagV4
          cents={lineTotal}
          compareAtCents={compareLineTotal}
          currency={currency}
          size={MONEY_LINE_SIZE}
          // Passed straight through: `PriceTagV4` already defaults it to
          // `formatMoney`, so there is exactly one place cents become a string
          // on this row (brief §1.1).
          formatMoney={format}
        />
        {onRemove ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={removeLabel ?? `Remove ${title}`}
            testID="xen-cart-remove"
            onPress={onRemove}
            style={({ pressed }): StyleProp<ViewStyle> => ({
              minHeight: tap,
              justifyContent: 'center',
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              // The state layer, not `opacity: pressed ? 0.7 : 1` — dimming the
              // content is M3's signal for *disabled*, which this never is.
              backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
            })}
          >
            <TextV4 size="sm" tone="mutedText">
              Remove
            </TextV4>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
