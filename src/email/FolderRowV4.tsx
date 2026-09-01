import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { ROW_SELECTED_CLASS, spokenLine, TONE_INK } from './internal/mail-v4';
import type { FolderRowProps } from './FolderRow';

export interface FolderRowV4Props extends FolderRowProps {
  /** How the trailing count is spoken. Default `` (n) => `${n} items` ``. */
  formatCount?: (count: number) => string;
}

/** Above this the pill reads `999+` — four digits push the name off the row. */
const COUNT_CAP = 999;

/**
 * **V4 folder row** — same props as {@link FolderRow} plus `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It stops saying "unread" for a number that is often not unread.** The
 *    prop's own doc defines `count` as "unread / item count", and the row
 *    announced "Drafts, 3 unread" — wrong for Drafts, wrong for Spam, wrong for
 *    any folder where the number is a total. `formatCount` names the unit and
 *    defaults to the honest one.
 * 2. **A hovered folder stops looking like the open one.** `bg-primary-50`
 *    selected against `bg-neutral-100` hover is two ramp steps a shade apart on
 *    a light page and two near-white slabs on a dark one, so running the mouse
 *    down the sidebar lit every folder as "the current one". Selected is the
 *    `selected` container; hover is the state layer over it.
 * 3. **The row clears 44.** `py-sm` on a `base` line left it near 32 — a
 *    sidebar target hit with a thumb while the other hand holds the phone.
 * 4. **The ink is the corrected slot and the pill has a guaranteed pair.**
 *    `text-primary` on the selected name and `bg-neutral-100 text-muted` on the
 *    pill were a fill used as ink and a ramp step used as a container.
 */
export const FolderRowV4 = React.forwardRef<HTMLButtonElement, FolderRowV4Props>(
  function FolderRowV4(
    {
      name,
      glyph,
      count = 0,
      selected = false,
      depth = 0,
      onClick,
      formatCount = (value: number) => `${value} items`,
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const indent = Math.max(0, depth);
    const shown = count > COUNT_CAP ? `${COUNT_CAP}+` : String(count);

    return (
      <button
        ref={ref}
        type="button"
        aria-label={spokenLine([name, count > 0 ? formatCount(count) : undefined])}
        aria-current={selected ? 'page' : undefined}
        onClick={onClick}
        data-xen-v4-state=""
        style={
          {
            paddingLeft: `calc(var(--xen-space-md) + ${indent} * var(--xen-space-lg))`,
            ...stateGroundVars(
              selected ? 'var(--xen-selected)' : 'var(--xen-surface)',
              selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'
            ),
          } as React.CSSProperties
        }
        className={cn(
          'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] py-sm pr-md text-left',
          MIN_TAP_CLASS,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          selected ? ROW_SELECTED_CLASS : 'bg-transparent text-on-surface',
          className
        )}
      >
        {glyph ? (
          <span aria-hidden="true" className={cn('text-base leading-none', !selected && TONE_INK.muted)}>
            {glyph}
          </span>
        ) : null}
        <span className={cn('min-w-0 flex-1 truncate text-base', selected ? 'font-bold' : 'font-medium')}>
          {name}
        </span>
        {count > 0 ? (
          // The numeral is decorative here: the unit went into the row's name,
          // and a reader hearing "42" twice learns nothing the second time.
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-full px-xs text-xs font-bold',
              'min-w-[calc(var(--xen-space-md)_+_var(--xen-space-xs))]',
              selected ? 'bg-primary text-on-primary' : 'bg-muted text-on-surface'
            )}
          >
            {shown}
          </span>
        ) : null}
      </button>
    );
  }
);
