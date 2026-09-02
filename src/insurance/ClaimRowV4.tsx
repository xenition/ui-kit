import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
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
import { formatMoney as defaultFormatMoney } from './internal/format';
import { claimStatus } from './internal/status';
import {
  FOCUS_RING_CLASS,
  moneyParts,
  NEGATIVE_AMOUNT_LABEL,
  spokenLine,
  TABULAR_CLASS,
  toneGroundStyle,
  toneInkClass,
} from './internal/tone-v4';
import type { ClaimRowProps } from './ClaimRow';

export interface ClaimRowV4Props extends ClaimRowProps {}

/**
 * **V4 claim row** — same props as {@link ClaimRow}; every one of them
 * unchanged, and the row now says the amount out loud.
 *
 * ## Five changes
 *
 * 1. **The settled amount is announced.** The row put `aria-label="Claim
 *    CLM-20481, Windshield replacement, Approved"` on the same element that
 *    rendered the money and the date. ARIA replaces an element's contents with
 *    its name, so a screen-reader user scanning a claims list heard a status
 *    for every claim and **not one figure** — on the screen whose entire
 *    subject is how much was paid. The amount and the date are folded into the
 *    name, joined with commas.
 * 2. **`amountCents={-1}` no longer prints "$0.00".** The base clamped with
 *    `Math.max(0, …)`, so a recovery, a sentinel and a genuine zero settlement
 *    all rendered identically. The figure is printed as given and captioned
 *    when it is below zero.
 * 3. **It is a real `<button>`, joined to the row family.** `pressableProps`
 *    made it a `div` with `role="button"`, `tabIndex` and a hand-written
 *    Enter/Space handler — and that handler is what steals the keydown from
 *    any control nested in a row. The row now takes the shared height, the
 *    shared 44 leading slot and the shared state layer, so a claims list, a
 *    settings list and a notification list are one family rather than three
 *    row heights.
 * 4. **Press is a state layer, not `hover:opacity-80`.** Dimming fades the
 *    row's own content, which is M3's *disabled* signal.
 * 5. **The status disc is inked with an ink slot.** `internal/tint.ts` drew
 *    the glyph in `text-success` / `text-danger` — fill tokens the compiler
 *    guarantees nothing about as text — over `bg-neutral-100`, a ramp step
 *    that mirrors under `[data-theme="dark"]`. Both are gone; focus is
 *    `ring-ring` rather than `ring-primary-300`.
 */
export const ClaimRowV4 = React.forwardRef<HTMLDivElement, ClaimRowV4Props>(function ClaimRowV4(
  {
    claimNumber,
    title,
    status,
    amountCents,
    currency = 'USD',
    date,
    formatMoney: format = defaultFormatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
  }, []);

  if (!title) return null;

  const sd = claimStatus(status);
  const interactive = onClick != null;
  const amount = moneyParts(amountCents, currency, format);

  const content = (
    <>
      <span className={ROW_V4_LEADING_CLASS}>
        <span
          aria-hidden="true"
          className={cn(
            'flex h-full w-full items-center justify-center rounded-[var(--xen-radius-full)] text-base',
            toneInkClass(sd.tone)
          )}
          style={toneGroundStyle(sd.tone)}
        >
          {sd.glyph}
        </span>
      </span>

      <span className={ROW_V4_TEXT_CLASS}>
        <span className="truncate text-base font-semibold text-on-card">{title}</span>
        <span className="flex min-w-0 items-center gap-xs">
          <span className="truncate text-xs text-muted-text">{claimNumber}</span>
          <span className={cn('shrink-0 text-xs font-semibold', toneInkClass(sd.tone))}>
            {sd.label}
          </span>
        </span>
      </span>

      <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
        {amount ? (
          <span
            className={cn(
              'text-base font-bold',
              TABULAR_CLASS,
              amount.negative ? 'text-danger-text' : 'text-on-card'
            )}
          >
            {amount.text}
          </span>
        ) : null}
        {date != null ? <span className="text-xs text-muted-text">{date}</span> : null}
      </span>
    </>
  );

  const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(true), rowGroundClass(false));

  if (!interactive) {
    return (
      <div ref={ref} data-xen-v4-row="" className={cn(rowClass, className)} {...rest}>
        {content}
      </div>
    );
  }

  // The activation is the row, and the row's own element stays a plain `div`
  // so the props a caller passes keep landing on a div — and so a sibling
  // control can be added here without ever being nested inside the button.
  return (
    <div ref={ref} className={cn('w-full', className)} {...rest}>
      <button
        type="button"
        aria-label={spokenLine([
          `Claim ${claimNumber}`,
          title,
          sd.label,
          amount?.text,
          amount?.negative ? NEGATIVE_AMOUNT_LABEL : undefined,
          date,
        ])}
        onClick={onClick}
        data-xen-v4-row=""
        data-interactive="true"
        data-xen-v4-state=""
        style={rowStateVars()}
        className={cn(rowClass, 'rounded-[var(--xen-radius-md)]', FOCUS_RING_CLASS)}
      >
        {content}
      </button>
    </div>
  );
});
