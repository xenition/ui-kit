import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  /** The choices. */
  options: MultiSelectOption[];
  /** Controlled set of selected values. */
  value?: string[];
  /** Fires with the full next selection array. */
  onChange?: (value: string[]) => void;
  /** Shown on the trigger when nothing is selected. */
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible label for the trigger. */
  accessibilityLabel?: string;
  className?: string;
}

/**
 * Multi-select — like the themed `Select` but the popover lets several options
 * be checked. The trigger shows the picked options as token-bound chips (or the
 * `placeholder`). Web parity of the native `MultiSelect`; `onChange` reports the
 * whole next `string[]`. No literal colors (kit lint rule).
 */
export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  className,
}: MultiSelectProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const selectedOptions = options.filter((o) => value.includes(o.value));

  const toggle = (v: string): void => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        aria-label={accessibilityLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex w-full items-center justify-between gap-sm bg-surface',
          'border rounded-[var(--xen-radius-sm)] px-md py-sm text-base transition-colors',
          'focus:outline-none focus:ring-1',
          invalid
            ? 'border-danger focus:border-danger focus:ring-danger'
            : 'border-border focus:border-primary focus:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50'
        )}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-muted">{placeholder}</span>
        ) : (
          <span className="flex flex-1 flex-wrap gap-xs">
            {selectedOptions.map((o) => (
              <span
                key={o.value}
                className="rounded-[var(--xen-radius-full)] bg-accent px-sm py-0.5 text-xs text-on-accent"
              >
                {o.label}
              </span>
            ))}
          </span>
        )}
        <span aria-hidden className="text-sm text-muted">
          ▾
        </span>
      </button>
      {open ? (
        <div
          role="listbox"
          aria-multiselectable
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-[var(--xen-radius-lg)] border border-border bg-surface py-1 shadow-lg"
        >
          {options.map((opt) => {
            const active = value.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => toggle(opt.value)}
                className={cn(
                  'flex w-full items-center justify-between px-md py-sm text-left text-base transition-colors hover:bg-neutral-100',
                  active ? 'font-semibold text-primary' : 'text-on-surface'
                )}
              >
                <span>{opt.label}</span>
                <span aria-hidden className={active ? 'text-primary' : 'text-muted'}>
                  {active ? '✓' : ''}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
