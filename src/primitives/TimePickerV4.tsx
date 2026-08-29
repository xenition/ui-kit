import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from './internal/v4-state';
import { cn } from './cn';
import type { TimePickerProps, TimeValue } from './TimePicker';
import { FIELD_CLASS, PICKER_V4_CSS, useDepth } from './internal/picker-v4';
import { useDismiss } from './useDismiss';

export type { TimePickerProps as TimePickerV4Props, TimeValue };

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * **V4 time field** — the web twin of `TimePickerV4`, the same props as
 * {@link TimePicker}, a different design line.
 *
 * ## Two columns, because that is what a time picker is
 *
 * §31: hours on the left, minutes on the right, scroll and click. Every
 * platform's time picker is some version of this, and inventing a dial or a
 * text mask here would only mean the user has to learn our one. What changes is
 * the size of the things being clicked and how obviously the current time is
 * marked.
 *
 * ## The changes
 *
 * 1. **Rows you can hit.** The base row is `py-sm` around a line of text —
 *    roughly 30px, well under the 44px floor, in a list where the neighbouring
 *    row is a different minute. Every row here is `--xen-space-2xl` tall. That
 *    is the single change that makes the control stop feeling like a lottery.
 * 2. **A field that belongs in the form.** `InputV4`'s treatment: the same
 *    minimum height, the same `md` radius, and the same `box-shadow` halo, so
 *    focusing costs no layout (§36.11). The field stays ringed while its
 *    popover is open.
 * 3. **A selection that survives dark mode.** The active hour and minute are
 *    filled `primary` with `on-primary` ink — the pair the compiler
 *    contrast-checks. Hover is a `color-mix` against `--xen-surface`, never
 *    `hover:bg-neutral-100`, which is a light-oriented ramp step in both
 *    schemes and flashes near-white on a dark page.
 * 4. **A confirm button that says what it does.** `Done` is `primary`, at the
 *    same tap-target height as everything else.
 *
 * The popover floats on `--xen-elevation-card` with its hairline, takes glass
 * only when the seed asked for `depth: 'glass'`, and drops its entrance under
 * `prefers-reduced-motion` (§36.10).
 */
export function TimePickerV4({
  value,
  onChange,
  minuteStep = 5,
  placeholder = 'Select a time',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  className,
}: TimePickerProps): React.ReactElement {
  injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  const glass = useDepth() === 'glass';
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = React.useMemo(() => {
    const step = Math.max(1, Math.min(60, Math.round(minuteStep)));
    const out: number[] = [];
    for (let m = 0; m < 60; m += step) out.push(m);
    return out;
  }, [minuteStep]);

  const current: TimeValue = value ?? { h: 0, m: 0 };

  const column = (
    label: string,
    items: number[],
    active: number,
    onPick: (n: number) => void
  ): React.ReactElement => (
    <div className="flex-1">
      <div className="pb-xs text-center text-xs font-semibold text-muted-text">{label}</div>
      {/*
        Five rows of visible list. Any less and the column reads as a stub; any
        more and the panel outgrows a small viewport.
      */}
      <div className="max-h-[calc(var(--xen-space-2xl)_*_5)] overflow-auto">
        {items.map((n) => {
          const isActive = n === active;
          return (
            <button
              key={n}
              type="button"
              aria-label={`${label} ${n}`}
              aria-pressed={isActive}
              onClick={() => onPick(n)}
              data-xen-v4-hover={isActive ? undefined : ''}
              className={cn(
                'flex w-full items-center justify-center rounded-[var(--xen-radius-md)] text-base',
                'h-[var(--xen-space-2xl)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive ? 'bg-primary font-bold text-on-primary' : 'text-on-surface'
              )}
            >
              {pad(n)}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        data-xen-v4-field={invalid ? 'invalid' : ''}
        data-open={open ? 'true' : undefined}
        aria-label={accessibilityLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          FIELD_CLASS,
          'justify-between text-left disabled:pointer-events-none disabled:opacity-[0.38]'
        )}
        style={
          {
            '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
          } as React.CSSProperties
        }
      >
        <span className={cn('truncate', value ? 'text-on-surface' : 'text-muted-text')}>
          {value ? `${pad(current.h)}:${pad(current.m)}` : placeholder}
        </span>
        <span aria-hidden="true" className="text-base text-muted-text">
          ▾
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Choose a time"
          data-xen-v4-pop="card"
          data-glass={glass ? 'true' : undefined}
          className="absolute z-50 mt-xs w-[calc(var(--xen-space-2xl)_*_5)] p-md text-on-surface"
        >
          <div className="flex gap-md">
            {column('Hour', hours, current.h, (h) => onChange?.({ h, m: current.m }))}
            {column('Min', minutes, current.m, (m) => onChange?.({ h: current.h, m }))}
          </div>
          <button
            type="button"
            aria-label="Done"
            data-xen-v4-state=""
            onClick={() => setOpen(false)}
            className={cn(
              'mt-md flex w-full items-center justify-center rounded-[var(--xen-radius-md)]',
              'h-[var(--xen-space-2xl)] bg-primary text-base font-semibold text-on-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}
