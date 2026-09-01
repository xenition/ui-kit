import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { rowContainerStyle, rowTextStyle } from '../dashboard/internal/row-v4';
import { formatMoney } from '../commerce/money';
import { MoneyAmountV4 } from './MoneyAmountV4';
import { lineTotal, spokenLine } from './internal/ledger-v4';
import type { InvoiceLineProps } from './InvoiceLine';

export interface InvoiceLineV4Props extends InvoiceLineProps {}

/** A quantity, through `Intl` — `3.5`, and `3,5` where that is the decimal mark. */
const QUANTITY = new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 });

/**
 * **V4 invoice line** — same props as {@link InvoiceLine}.
 *
 * ## Four changes
 *
 * 1. **A fractional line no longer under-reports.** The total was
 *    `Math.trunc(unitPriceCents) * quantity`, which truncated the *price* and
 *    left the *quantity* alone — so `333 × 3.5` produced `1165.5`, a
 *    non-integer cents value `MoneyAmount` then floored to `$11.65`, while the
 *    breakdown line directly above it honestly printed "3.5 × $3.33". The line
 *    under-reported the invoice and disagreed with itself on screen.
 *    `lineTotal()` rounds once, at the end.
 * 2. **`emphasized` actually changes something.** The amount is already bold,
 *    so `emphasized ? { fontWeight: '700' }` re-applied the weight it had and
 *    the grand total looked exactly like the line above it. The difference is
 *    now carried by props both twins honour — the amount's `size` step and the
 *    description's weight — rather than by a style override that applies on
 *    native and is dropped by `cn` on web.
 * 3. **The line is one announced object** carrying the description, the
 *    breakdown and the total, instead of three loose nodes — and the quantity
 *    goes through `Intl` rather than being concatenated.
 * 4. **The breakdown is `mutedText`**, and the line clears 44 from the shared
 *    row family rather than from a bare `paddingVertical`.
 *
 * **Renders nothing without a `description`** (§4.5).
 */
export function InvoiceLineV4({
  description,
  unitPriceCents,
  quantity = 1,
  currency = 'USD',
  amountCents,
  emphasized = false,
  appearance = 'classic',
  style,
}: InvoiceLineV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!description) return null;

  const qty = Number.isFinite(quantity) ? quantity : 1;
  const total = typeof amountCents === 'number' ? amountCents : lineTotal(unitPriceCents, qty);
  const showBreakdown = !emphasized && qty !== 1;
  const unitPrice = formatMoney(
    Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0,
    currency
  );
  const breakdown = showBreakdown ? `${QUANTITY.format(qty)} × ${unitPrice}` : null;

  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  return (
    <View
      accessible
      accessibilityLabel={spokenLine([description, breakdown, formatMoney(total, currency)])}
      style={[surface, rowContainerStyle(theme, { twoLine: showBreakdown }), style]}
    >
      <View style={rowTextStyle(theme)}>
        <TextV4
          size="sm"
          weight={emphasized ? 'bold' : 'medium'}
          tone="onSurface"
          numberOfLines={2}
        >
          {description}
        </TextV4>
        {breakdown != null ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {breakdown}
          </TextV4>
        ) : null}
      </View>
      {/*
        The step, not a style override. `MoneyAmount` is already bold, so the
        base's `emphasized ? { fontWeight: '700' }` re-applied the weight it
        had — and a style override applies on native while its web twin's
        `className` is silently dropped by `cn`, so the same total rendered at
        two different weights on the two platforms. `size` is the prop both
        twins honour.
      */}
      <MoneyAmountV4
        cents={total}
        currency={currency}
        tone="neutral"
        size={emphasized ? 'md' : 'sm'}
      />
    </View>
  );
}
