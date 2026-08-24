import * as React from 'react';
import { cn } from '../primitives/cn';

/** The three RSVP states. */
export type RSVPStatus = 'going' | 'maybe' | 'declined';

export type RSVPButtonSize = 'sm' | 'md';

export interface RSVPButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The current selection, or `null`/`undefined` when unanswered. */
  value?: RSVPStatus | null;
  /** Fires with the tapped status (tapping the active one keeps it selected). */
  onChange?: (status: RSVPStatus) => void;
  /** Control size. */
  size?: RSVPButtonSize;
  /** Disable the whole control. */
  disabled?: boolean;
}

interface Option {
  status: RSVPStatus;
  label: string;
  /** A distinct glyph so state is conveyed by shape + text, not color alone. */
  glyph: string;
  /** Token background + foreground classes applied when the option is selected. */
  selectedBg: string;
  selectedFg: string;
}

const OPTIONS: Option[] = [
  { status: 'going', label: 'Going', glyph: '✓', selectedBg: 'bg-success', selectedFg: 'text-on-success' },
  { status: 'maybe', label: 'Maybe', glyph: '?', selectedBg: 'bg-warn', selectedFg: 'text-on-warn' },
  { status: 'declined', label: "Can't go", glyph: '✕', selectedBg: 'bg-danger', selectedFg: 'text-on-danger' },
];

/**
 * Segmented RSVP control with `going` / `maybe` / `declined` states. The
 * selected state is communicated three ways — a filled token background, a
 * distinct glyph (✓ / ? / ✕), and `aria-checked` on a `radiogroup` — so it is
 * never conveyed by color alone (WCAG 1.4.1). `onChange` is renamed from the DOM
 * `onChange` and reports the chosen status. Colors come from the `--xen-*`
 * tokens; no literal colors.
 */
export const RSVPButton = React.forwardRef<HTMLDivElement, RSVPButtonProps>(function RSVPButton(
  { value, onChange, size = 'md', disabled = false, className, ...rest },
  ref
) {
  const sizeCls = size === 'sm' ? 'px-sm py-xs text-xs' : 'px-sm py-sm text-sm';

  return (
    <div
      ref={ref}
      role="radiogroup"
      className={cn('inline-flex flex-row overflow-hidden rounded-md border border-border', disabled && 'opacity-50', className)}
      {...rest}
    >
      {OPTIONS.map((opt, i) => {
        const selected = value === opt.status;
        return (
          <button
            key={opt.status}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={opt.label}
            disabled={disabled}
            onClick={() => onChange?.(opt.status)}
            className={cn(
              'inline-flex flex-1 items-center justify-center gap-xs font-medium transition-colors',
              sizeCls,
              i > 0 && 'border-l border-border',
              selected ? cn(opt.selectedBg, opt.selectedFg, 'font-bold') : 'bg-surface text-on-surface hover:bg-neutral-100',
              'disabled:pointer-events-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300'
            )}
          >
            <span aria-hidden="true" className={cn('font-bold', selected ? opt.selectedFg : 'text-muted')}>
              {opt.glyph}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
});
