import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { metaLine } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { BADGE_V4, discGround, spokenLine, TABULAR_CLASS, type ToneV4 } from './internal/job-v4';
import { formatMoney } from './internal/format';
import type { MaterialsRowProps, MaterialStock } from './MaterialsRow';

export interface MaterialsRowV4Props extends MaterialsRowProps {
  /** Leading glyph for the material disc. Default `'📦'`. */
  glyph?: string;
  /** Override the stock words — three English phrases lived inside. */
  stockLabels?: Partial<Record<MaterialStock, string>>;
}

const STOCK_V4: Record<MaterialStock, { label: string; glyph: string; tone: ToneV4 }> = {
  'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
  low: { label: 'Low', glyph: '▲', tone: 'warn' },
  'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};

/**
 * **V4 materials row** — the web twin of the native `MaterialsRowV4`, same
 * props as {@link MaterialsRow} plus `glyph` and `stockLabels`.
 *
 * ## Four changes
 *
 * 1. **The stock state is announced.** On a parts list "back-ordered" is the
 *    single field that changes what the technician does next — and it was the
 *    single field the row's `` `${name}, ${qty} ${unit}, ${total}` `` name
 *    omitted. The SKU joins the name too.
 * 2. **It takes the `glyph` every sibling row has.** The box emoji was
 *    hard-coded, so a materials list could not distinguish a fitting from a
 *    length of pipe the way the equipment register distinguishes its assets.
 * 3. **Money is tabular**, so a column of extended totals lines up on the
 *    decimal instead of drifting with the digits.
 * 4. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, and the disc no longer announces "Material" ahead of
 *    the part's own name.
 */
export const MaterialsRowV4 = React.forwardRef<HTMLDivElement, MaterialsRowV4Props>(
  function MaterialsRowV4(
    {
      name,
      sku,
      quantity,
      unit = 'ea',
      unitCents,
      stock,
      currency = 'USD',
      formatMoney: format = formatMoney,
      onClick,
      glyph = '📦',
      stockLabels,
      className,
      style,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const sd = stock ? STOCK_V4[stock] : undefined;
    const stockWord = stock ? (stockLabels?.[stock] ?? sd?.label) : undefined;
    const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
    const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
    const totalCents = Math.round(qty * unitSafe);
    const breakdown = `${qty} ${unit} × ${format(unitSafe, currency)}`;
    const caption = metaLine([breakdown, sku]);
    const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(true));

    const body = (
      <>
        <span
          aria-hidden
          className={cn(ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-md)]')}
          style={{ background: discGround('neutral') }}
        >
          <IconV4 glyph={glyph} />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{name}</span>
          <span className="truncate text-xs text-muted-text">{caption}</span>
        </span>
        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          <span className={cn('text-base font-bold text-on-card', TABULAR_CLASS)}>
            {format(totalCents, currency)}
          </span>
          {sd ? (
            <BadgeV4 tone={sd.tone} {...BADGE_V4}>
              {`${sd.glyph} ${stockWord}`}
            </BadgeV4>
          ) : null}
        </span>
      </>
    );

    if (onClick == null) {
      return (
        <div ref={ref} style={style} className={cn(rowClass, className)}>
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} style={style} className={cn('w-full', className)}>
        <button
          type="button"
          onClick={onClick}
          aria-label={spokenLine([
            name,
            sku,
            breakdown,
            format(totalCents, currency),
            stockWord,
          ])}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(rowClass, 'rounded-[var(--xen-radius-md)]')}
        >
          {body}
        </button>
      </div>
    );
  }
);
