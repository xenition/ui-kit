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
import type { SnoozeRowProps } from './SnoozeRow';

export interface SnoozeRowV4Props extends SnoozeRowProps {}

/**
 * **V4 snooze row** — the same props as {@link SnoozeRow}, and no new ones. The
 * defects here were all in what it drew and what it said.
 *
 * ## Four changes
 *
 * 1. **A hovered preset stops looking like the chosen one.** Selected was
 *    `bg-primary-50` and hover was `bg-neutral-100` — two ramp steps of nearly
 *    the same lightness on a light page, and both near-white on a dark one. In
 *    a picker of five presets the pointer marked whichever row it was passing
 *    over as the answer. Selected is now the `selected` container and hover is
 *    the M3 state layer over it, so they are a step apart by construction.
 * 2. **The check mark is decorative.** It carried `aria-label="Selected"`, so a
 *    reader landed on the row, heard the whole preset, then landed again on a
 *    lone word "Selected" — a second stop saying what `aria-pressed` already
 *    said. Native had it hidden; only web spoke it.
 * 3. **The row clears 44.** `py-md` on a `base` line comes close, but it was
 *    coincidence rather than a floor, and a dense seed lost it.
 * 4. **The ink is the contrast-corrected slot**, and on the selected ground it
 *    is that ground's guaranteed pair — `primary` and `muted` are fills and
 *    neither was measured against the wash the row was painting behind them.
 */
export const SnoozeRowV4 = React.forwardRef<HTMLButtonElement, SnoozeRowV4Props>(
  function SnoozeRowV4({ label, when, glyph = '⏰', selected = false, onClick, className }, ref) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    return (
      <button
        ref={ref}
        type="button"
        aria-label={spokenLine([`Snooze ${label}`, when])}
        aria-pressed={selected}
        onClick={onClick}
        data-xen-v4-state=""
        style={
          stateGroundVars(
            selected ? 'var(--xen-selected)' : 'var(--xen-surface)',
            selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'
          ) as React.CSSProperties
        }
        className={cn(
          'flex w-full items-center gap-md rounded-[var(--xen-radius-md)] px-md py-md text-left',
          MIN_TAP_CLASS,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          selected ? ROW_SELECTED_CLASS : 'bg-transparent text-on-surface',
          className
        )}
      >
        <span aria-hidden="true" className={cn('text-lg leading-none', !selected && TONE_INK.muted)}>
          {glyph}
        </span>
        <span className={cn('min-w-0 flex-1 truncate text-base', selected ? 'font-bold' : 'font-medium')}>
          {label}
        </span>
        {when ? (
          <span className={cn('shrink-0 text-sm', !selected && TONE_INK.muted)}>{when}</span>
        ) : null}
        {/* `aria-pressed` already said this; a second stop repeating it is noise. */}
        {selected ? (
          <span aria-hidden="true" className="shrink-0 text-base leading-none">
            ✓
          </span>
        ) : null}
      </button>
    );
  }
);
