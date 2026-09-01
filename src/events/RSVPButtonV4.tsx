import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_SOFT_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { RSVPButtonProps, RSVPStatus } from './RSVPButton';
import { RSVP_TONE } from './internal/event-v4';

export interface RSVPButtonV4Props extends RSVPButtonProps {
  /** The word on each segment. Defaults to `Going` / `Maybe` / `Can't go`. */
  optionLabels?: Partial<Record<RSVPStatus, string>>;
}

interface Option {
  status: RSVPStatus;
  label: string;
  /** A distinct glyph, so the answer is shape and text as well as fill. */
  glyph: string;
}

const OPTIONS: Option[] = [
  { status: 'going', label: 'Going', glyph: '✓' },
  { status: 'maybe', label: 'Maybe', glyph: '?' },
  { status: 'declined', label: "Can't go", glyph: '✕' },
];

const SEGMENT_STATE = stateGroundVars(
  'var(--xen-card)',
  'var(--xen-on-card)'
) as React.CSSProperties;

/**
 * **V4 RSVP control** — the web twin of the native `RSVPButtonV4`, same props
 * as {@link RSVPButton} plus `optionLabels`.
 *
 * ## Four changes
 *
 * 1. **An RSVP answer is a choice, not a status.** The base painted
 *    `going → success`, `maybe → warn`, `declined → danger` — the same three
 *    slots this module spends on a cancelled session and a sold-out tier. A
 *    guest saying they cannot come has not made an error, and "Maybe" is not a
 *    warning. `RSVP_TONE` keeps `going` on the brand and leaves the other two
 *    neutral; a chosen neutral segment wears `selected`/`on-selected`, the
 *    compiler's own pair for a chosen container, so the label keeps a contrast
 *    promise instead of borrowing `on-surface` onto an unchecked tint.
 * 2. **The radiogroup has the roving focus a radiogroup owes.** Three tab stops
 *    for one answer is not a radiogroup; one stop plus arrows is, and the
 *    arrows change the answer the way a real radio group does.
 * 3. **Every segment clears 44, at both sizes.** `sm` was about 26 points tall
 *    — under the floor at the moment a guest is answering with one thumb.
 * 4. **Press is a state layer and disabled is 0.38.** `hover:bg-neutral-100` is
 *    a ramp step that mirrors under `[data-theme="dark"]`, and `opacity-50` is
 *    a rounder number than the band the theme actually ships.
 */
export const RSVPButtonV4 = React.forwardRef<HTMLDivElement, RSVPButtonV4Props>(
  function RSVPButtonV4(
    { value, onChange, size = 'md', disabled = false, optionLabels, className, ...rest },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const segmentRefs = React.useRef(new Map<number, HTMLButtonElement>());
    const sizeCls = size === 'sm' ? 'px-sm text-xs' : 'px-md text-sm';

    const selectedIndex = OPTIONS.findIndex((opt) => opt.status === value);
    // The one tab stop: the chosen answer, or the first segment when unanswered.
    const tabIndexTarget = selectedIndex >= 0 ? selectedIndex : 0;

    const move = (from: number, delta: number): void => {
      const next = (from + delta + OPTIONS.length) % OPTIONS.length;
      const option = OPTIONS[next];
      if (!option) return;
      segmentRefs.current.get(next)?.focus();
      onChange?.(option.status);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number): void => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          move(index, -1);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          move(index, 1);
          break;
        default:
          break;
      }
    };

    return (
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          'inline-flex flex-row overflow-hidden rounded-[var(--xen-radius-md)] border border-border',
          disabled && V4_DISABLED_SOFT_CLASS,
          className
        )}
        {...rest}
      >
        {OPTIONS.map((opt, i) => {
          const selected = value === opt.status;
          const label = optionLabels?.[opt.status] ?? opt.label;
          const tone = RSVP_TONE[opt.status] ?? 'neutral';
          return (
            <button
              key={opt.status}
              ref={(el) => {
                if (el) segmentRefs.current.set(i, el);
                else segmentRefs.current.delete(i);
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={label}
              tabIndex={i === tabIndexTarget ? 0 : -1}
              disabled={disabled}
              onClick={() => onChange?.(opt.status)}
              onKeyDown={(e) => onKeyDown(e, i)}
              data-xen-v4-state=""
              style={SEGMENT_STATE}
              className={cn(
                'inline-flex flex-1 items-center justify-center gap-xs font-medium',
                MIN_TAP_CLASS,
                sizeCls,
                i > 0 && 'border-l border-border',
                selected
                  ? tone === 'primary'
                    ? 'bg-primary font-bold text-on-primary'
                    : 'bg-selected font-bold text-on-selected'
                  : 'bg-card text-on-card',
                'disabled:pointer-events-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'
              )}
            >
              <span aria-hidden="true" className="font-bold">
                {opt.glyph}
              </span>
              <span aria-hidden="true">{label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);
