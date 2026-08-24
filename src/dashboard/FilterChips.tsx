import * as React from 'react';
import { cn } from '../primitives/cn';

export interface FilterChipOption {
  value: string;
  label: string;
}

export interface FilterChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Options as `{value,label}` objects or bare strings (used as both). */
  options: Array<FilterChipOption | string>;
  /** Currently selected value(s). */
  selected: string | string[];
  /** Fires with the next selection. Shape mirrors `multi`. */
  onChange: (next: string | string[]) => void;
  /** Allow multiple chips selected at once. */
  multi?: boolean;
  /** Lay chips in a horizontal scroller instead of wrapping. */
  scroll?: boolean;
}

function normalize(o: FilterChipOption | string): FilterChipOption {
  return typeof o === 'string' ? { value: o, label: o } : o;
}

/**
 * A row of selectable filter chips (single- or multi-select). The selected
 * chip(s) fill with the `primary` token. Token-only; wraps by default, or lays
 * out in a horizontal scroller when `scroll` is set.
 */
export const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  function FilterChips(
    { options, selected, onChange, multi = false, scroll = false, className, ...rest },
    ref
  ) {
    const selectedList = Array.isArray(selected) ? selected : [selected];

    const toggle = (value: string): void => {
      if (multi) {
        const set = new Set(selectedList);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        onChange(Array.from(set));
      } else {
        onChange(value);
      }
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex gap-sm',
          scroll ? 'overflow-x-auto pr-md' : 'flex-wrap',
          className
        )}
        {...rest}
      >
        {options.map(normalize).map((opt) => {
          const active = selectedList.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(opt.value)}
              className={cn(
                'shrink-0 rounded-full border px-md py-xs text-sm transition-colors',
                active
                  ? 'border-primary bg-primary font-semibold text-on-primary'
                  : 'border-border bg-surface font-medium text-on-surface hover:bg-neutral-100'
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }
);
