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
  /**
   * Fires with the next selection. Shape mirrors `multi` — and in single-select
   * mode the next selection is `''` when the active chip is clicked again, i.e.
   * nothing is selected. A row where a selection is mandatory can simply ignore
   * the empty value: `onChange={(v) => v && setFilter(v as string)}`.
   */
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
 * out in a horizontal scroller when `scroll` is set. Clicking a selected chip
 * deselects it in either mode — see `onChange`.
 */
export const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  function FilterChips(
    { options, selected, onChange, multi = false, scroll = false, className, ...rest },
    ref
  ) {
    const selectedList = Array.isArray(selected) ? selected : [selected];

    /*
      A chip is a toggle in both modes, and the active one turns itself off.

      Multi-select always did this; single-select used to re-fire the value that
      was already selected, which is not a state change at all — so there was no
      way to say "no filter" through the control. Every app worked around it the
      same way, by inventing an "All" option whose value is the empty string, and
      then had to keep that fake option out of anything that iterated the real
      ones. Clearing to `''` is that same escape hatch, minus the fake chip.
    */
    const toggle = (value: string): void => {
      if (multi) {
        const set = new Set(selectedList);
        if (set.has(value)) set.delete(value);
        else set.add(value);
        onChange(Array.from(set));
      } else {
        onChange(selectedList.includes(value) ? '' : value);
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
