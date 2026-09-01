import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { ROW_V4_TEXT_CLASS, ROW_V4_TRAILING_CLASS } from '../dashboard/internal/row-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { PLACEHOLDER_CLASS, TABULAR_CLASS, spokenLine } from './internal/menu-v4';
import type { ReorderRowProps } from './ReorderRow';

/** Adds nothing: every change here is structural. */
export interface ReorderRowV4Props extends ReorderRowProps {}

const THUMB_CLASS =
  'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] shrink-0';

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * **V4 reorder row** — the web twin of the native `ReorderRowV4`, with exactly
 * the same props as {@link ReorderRow}.
 *
 * ## Four changes
 *
 * 1. **Enter on Reorder reorders.** The Reorder button sat *inside* a
 *    `role="button"` row — invalid ARIA, and a live keyboard bug: the row's
 *    `onKeyDown` caught the keydown bubbling out of the button and ran
 *    `e.preventDefault(); onClick()`. Enter's default action on a `<button>`
 *    **is** the click that was just cancelled, and Space's click fires on
 *    keyup, cancelled too — so a keyboard user pressed Enter on Reorder and
 *    opened the past order instead of reordering it. The fix is structural:
 *    the row's activation is a real `<button>` around the thumbnail and the
 *    text, and Reorder is its **sibling**. No `stopPropagation`, no key guard,
 *    nothing left to double-fire.
 * 2. **The items summary is spoken.** `aria-label` was the title and the meta
 *    line on a children-presentational root, so "2× Pad Thai, 1× Spring rolls"
 *    — the one line that says what the order actually was — never reached the
 *    reader. It is the whole point of a reorder row.
 * 3. **`disabled` means disabled.** The base set `aria-disabled` on the row
 *    and passed `onClick` through unguarded, so a row it had just announced as
 *    unavailable still opened.
 * 4. **Dimming and hover stop fighting.** `opacity-60` and `hover:opacity-90`
 *    shared a node, so a disabled row got *brighter* under the pointer. M3
 *    disables content at 0.38 and draws press as a state layer; both live in
 *    `v4-state` and neither is a guess.
 */
export const ReorderRowV4 = React.forwardRef<HTMLDivElement, ReorderRowV4Props>(
  function ReorderRowV4(
    {
      title,
      itemsSummary,
      dateText,
      totalCents,
      currency = 'USD',
      imageUrl,
      onReorder,
      reorderLabel = 'Reorder',
      onClick,
      disabled = false,
      formatMoney = defaultFormat,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!title) return null;

    const totalText = typeof totalCents === 'number' ? formatMoney(totalCents, currency) : undefined;
    const meta = metaLine([dateText, totalText]);
    const spoken = spokenLine([title, itemsSummary, dateText, totalText]);

    const thumb = (
      <span
        aria-hidden="true"
        className={cn('relative block overflow-hidden rounded-[var(--xen-radius-md)]', THUMB_CLASS)}
      >
        <span className={cn('absolute inset-0', PLACEHOLDER_CLASS)} />
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" className="relative h-full w-full object-cover" />
        ) : null}
      </span>
    );

    const text = (
      <span className={ROW_V4_TEXT_CLASS}>
        <span className="truncate font-heading text-base font-semibold text-on-card">{title}</span>
        {itemsSummary ? (
          <span className="truncate text-sm text-muted-text">{itemsSummary}</span>
        ) : null}
        {meta !== '' ? (
          <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{meta}</span>
        ) : null}
      </span>
    );

    const interactive = typeof onClick === 'function';

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card',
          className
        )}
        {...rest}
      >
        {interactive ? (
          <button
            type="button"
            disabled={disabled}
            aria-label={spoken}
            onClick={onClick}
            data-xen-v4-state=""
            style={CARD_STATE}
            className={cn(
              'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              V4_DISABLED_CLASS
            )}
          >
            {thumb}
            {text}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-center gap-md">
            {thumb}
            {text}
          </div>
        )}

        {/* A sibling of the activation — there is no ancestor handler left. */}
        {onReorder ? (
          <span className={ROW_V4_TRAILING_CLASS}>
            <button
              type="button"
              disabled={disabled}
              aria-label={spokenLine([reorderLabel, title])}
              onClick={onReorder}
              data-xen-v4-state=""
              style={CARD_STATE}
              className={cn(
                'inline-flex items-center justify-center px-md',
                MIN_TAP_CLASS,
                'rounded-[var(--xen-radius-md)] border border-border text-sm font-semibold text-on-card',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                V4_DISABLED_CLASS
              )}
            >
              {reorderLabel}
            </button>
          </span>
        ) : null}
      </div>
    );
  }
);
