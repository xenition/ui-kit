import * as React from 'react';
import { cn } from './cn';

export interface ToggleGroupOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  /** The toggles. */
  options: ToggleGroupOption[];
  /**
   * Controlled value: a single `string` in single mode, or a `string[]` in
   * `multiple` mode.
   */
  value?: string | string[];
  /** Fires with the next value (string in single mode, string[] in multiple). */
  onChange?: (value: string | string[]) => void;
  /** Allow more than one active option at a time. */
  multiple?: boolean;
  disabled?: boolean;
  /** Accessible label for the group. */
  accessibilityLabel?: string;
  className?: string;
}

/**
 * Segmented toggle group — a row of connected buttons that toggle on/off. Single
 * mode is deselectable; `multiple` mode lets several be active at once (value
 * becomes a `string[]`). Web parity of the native `ToggleGroup`; active options
 * fill with `primary`/`on-primary`. No literal colors (kit lint rule).
 */
export function ToggleGroup({
  options,
  value,
  onChange,
  multiple = false,
  disabled = false,
  accessibilityLabel,
  className,
}: ToggleGroupProps): React.ReactElement {
  const selected = React.useMemo<string[]>(() => {
    if (multiple) return Array.isArray(value) ? value : [];
    return typeof value === 'string' && value ? [value] : [];
  }, [value, multiple]);

  const toggle = (v: string): void => {
    if (multiple) {
      const set = new Set(selected);
      if (set.has(v)) set.delete(v);
      else set.add(v);
      onChange?.(Array.from(set));
    } else {
      onChange?.(selected[0] === v ? '' : v);
    }
  };

  return (
    <div
      role="group"
      aria-label={accessibilityLabel}
      className={cn(
        'inline-flex overflow-hidden border border-border rounded-[var(--xen-radius-md)]',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      {options.map((opt, i) => {
        const active = selected.includes(opt.value);
        const itemDisabled = disabled || opt.disabled;
        return (
          <button
            key={opt.value}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={active}
            aria-label={opt.label}
            disabled={itemDisabled}
            onClick={() => toggle(opt.value)}
            className={cn(
              'px-md py-sm text-sm transition-colors',
              i > 0 && 'border-l border-border',
              'disabled:pointer-events-none disabled:opacity-50',
              active
                ? 'bg-primary font-bold text-on-primary'
                : 'bg-surface font-medium text-on-surface hover:bg-neutral-100'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
