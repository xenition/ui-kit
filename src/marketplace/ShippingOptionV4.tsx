import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { IconName } from '../primitives/icon-names';
import { V4_DISABLED_CLASS } from '../primitives/internal/v4-state';
import { formatMoney } from '../commerce';
import type { ShippingOptionProps } from './ShippingOption';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';

export interface ShippingOptionV4Props extends ShippingOptionProps {
  /**
   * A name from the kit's icon set for the leading slot, drawn as §4.7's
   * tinted circular badge.
   *
   * The base's `glyph` takes any string, which is how a kit ends up with 🚚 on
   * one screen and 📦 on the next for the same idea (`icon-names.ts` opens with
   * that exact complaint). `icon` is the typed form — a typo is a compile
   * error — and it wins over `glyph`, which stays for the one-off the named set
   * has no name for.
   */
  icon?: IconName;
  /**
   * What a `priceCents` of `0` says. Default `'Free'`.
   *
   * The word was hard-coded in both twins, so a localized storefront had a
   * shipping list reading "Standard · Free" in the middle of German copy. It is
   * the one string in the component `formatMoney` cannot localize, because it
   * is not a number.
   */
  freeLabel?: string;
}

/**
 * **V4 shipping option** — a selectable delivery method, on the row metric, and
 * the component where HIG's option-list rule lands.
 *
 * ## Selection is a highlight *and* a mark
 *
 * HIG draws a line between two kinds of list. A **navigation** list keeps the
 * chosen row persistently highlighted, because the highlight is saying "this is
 * where you are". An **option** list highlights briefly and then confirms with
 * a **checkmark**, because the mark is saying "this is what you chose". A
 * shipping list is an option list, and the base gave it neither: it drew a
 * radio dot and tinted the border, so the only durable signal that Express was
 * selected was a colour — which brief rule 6 and §46 both rule out, and which a
 * colour-blind buyer choosing how to spend money cannot see at all.
 *
 * V4 ships both halves. The row wears the family's `selected` pair (the
 * compiler's slot for a chosen row, with its guaranteed `onSelected` ink) and a
 * `check` `IconV4` at the trailing edge, after the price. `role="radio"` and
 * `aria-checked` are unchanged — the semantics were never the problem.
 *
 * The radio dot goes. Two marks for one fact is one more than the row needs,
 * and the checkmark is the one HIG names.
 *
 * ## Everything else
 *
 * 1. **The row metric**, from `dashboard/internal/row-v4.ts` — 56 with a label
 *    alone, 72 with an `eta`, `md` gutters, a 44 leading slot. The base used
 *    `px-lg py-md`, a gutter of its own that agreed with nothing.
 * 2. **Tabular money** (rule 2) through `formatMoney` (rule 1), so a stack of
 *    shipping prices has an edge to compare down. `Free` is not an amount and
 *    is not run through the formatter.
 * 3. **The state layer, and only the state layer.** `opacity-50` for disabled
 *    becomes `V4_DISABLED_CLASS` (M3's 0.38 for disabled *content*); press and
 *    hover are the shared layer over the pair the row actually wears, so a
 *    pressed row is tinted rather than faded — a faded row reads as dead.
 * 4. **The leading glyph is an `IconV4` badge**, not a bare `Icon` sitting
 *    between the radio and the text.
 *
 * Renders `null` for an option with no name (§4.5).
 */
export const ShippingOptionV4 = React.forwardRef<HTMLButtonElement, ShippingOptionV4Props>(
  function ShippingOptionV4(
    {
      label,
      priceCents,
      currency = 'USD',
      eta,
      glyph,
      icon,
      freeLabel = 'Free',
      selected = false,
      disabled = false,
      onSelect,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

    // §4.5: an option with no name is a blank band with a price on it.
    if (label.trim() === '') return null;

    const priceText =
      priceCents === undefined ? undefined : priceCents === 0 ? freeLabel : formatMoney(priceCents, currency);
    const supporting = eta !== undefined && eta !== '';
    const ink = selected ? 'onSelected' : 'onSurface';
    const leadingNode =
      icon !== undefined ? (
        <IconV4 name={icon} badge="soft" size="base" color={selected ? 'primary' : 'muted'} />
      ) : glyph !== undefined ? (
        <IconV4 glyph={glyph} badge="soft" size="base" color={selected ? 'primary' : 'muted'} />
      ) : null;

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        data-xen-v4-row=""
        data-xen-shipping-option=""
        data-xen-v4-state=""
        aria-checked={selected}
        aria-label={`${label}${priceText ? `, ${priceText}` : ''}${supporting ? `, ${eta}` : ''}`}
        disabled={disabled || onSelect === undefined}
        onClick={onSelect}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(supporting),
          rowGroundClass(selected),
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          V4_DISABLED_CLASS,
          className
        )}
        // The opaque state layer, mixed from the pair this row is actually
        // drawn on — so the promise its text makes stays checkable whichever
        // ground it is wearing.
        style={
          selected
            ? rowStateVars('var(--xen-selected)', 'var(--xen-on-selected)')
            : rowStateVars()
        }
        {...rest}
      >
        {leadingNode != null ? <span className={ROW_V4_LEADING_CLASS}>{leadingNode}</span> : null}
        <span className={ROW_V4_TEXT_CLASS}>
          <TextV4 size="base" weight="semibold" tone={ink} numberOfLines={1}>
            {label}
          </TextV4>
          {supporting ? (
            <TextV4 size="sm" tone={selected ? 'onSelected' : 'mutedText'} numberOfLines={1}>
              {eta}
            </TextV4>
          ) : null}
        </span>
        <span className={ROW_V4_TRAILING_CLASS}>
          {priceText !== undefined ? (
            <TextV4 size="base" weight="bold" tone={ink} numeric="tabular">
              {priceText}
            </TextV4>
          ) : null}
          {selected ? (
            // HIG's option-list confirmation. Decorative to a screen reader —
            // `aria-checked` on the row already says it, and saying it twice is
            // noise.
            <IconV4 name="check" size="base" color="primary" data-xen-shipping-check="" />
          ) : null}
        </span>
      </button>
    );
  }
);
