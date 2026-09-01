import * as React from 'react';
import { cn } from '../primitives/cn';

export interface YesNoToggleProps {
  /** Current answer. `null`/`undefined` → nothing selected. */
  value?: boolean | null;
  /** Fires with the chosen answer. */
  onChange: (value: boolean) => void;
  /** Label for the affirmative side. Default `'Yes'`. */
  yesLabel?: string;
  /** Label for the negative side. Default `'No'`. */
  noLabel?: string;
  /** Accessible name for the group. Default `'Yes or no'`. */
  'aria-label'?: string;
  /** Non-interactive + dimmed when `true`. Default `false`. */
  disabled?: boolean;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * YesNoToggle — **V4** "clean form / focus" binary segmented control. Two big
 * (≥44px) side-by-side buttons on a calm neutral surface: the selected side
 * fills with the single signature accent — solid `primary` with `on-primary`
 * text — while the other stays `surface` + `border`. No gradients. Exposed as a
 * `radiogroup` of two `radio`s so the choice is announced. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
export const YesNoToggle = React.forwardRef<HTMLDivElement, YesNoToggleProps>(function YesNoToggle(
  {
    value,
    onChange,
    yesLabel = 'Yes',
    noLabel = 'No',
    'aria-label': ariaLabel = 'Yes or no',
    disabled = false,
    className,
  },
  ref
) {
  const options: readonly { label: string; answer: boolean }[] = [
    { label: yesLabel, answer: true },
    { label: noLabel, answer: false },
  ];

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('flex gap-sm', disabled && 'opacity-50', className)}
    >
      {options.map(({ label, answer }) => {
        const selected = value === answer;
        return (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={label}
            disabled={disabled}
            onClick={() => onChange(answer)}
            className={cn(
              'flex h-14 flex-1 items-center justify-center rounded-[var(--xen-radius-lg)] border text-lg font-extrabold transition-colors',
              'disabled:pointer-events-none',
              selected
                ? 'border-2 border-primary bg-primary text-on-primary'
                : 'border-border bg-surface text-on-surface hover:bg-primary/10'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
});
