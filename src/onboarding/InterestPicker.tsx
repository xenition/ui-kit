import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce';
import type { InterestOption } from './types';

export interface InterestPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  /** Choosable topics. Empty renders the empty state. */
  options: InterestOption[];
  /** Currently selected ids (controlled). */
  selectedIds: string[];
  /** Fires with the full next selection set on each toggle. */
  onChange: (selectedIds: string[]) => void;
  /** Optional heading above the chips. */
  title?: string;
  /** Optional helper line (e.g. `'Pick at least 3'`). */
  helper?: string;
  /** Cap on selections; chips past the cap disable when unselected. */
  maxSelections?: number;
  /** Accessible name for the chip group. Default `'Interests'`. */
  groupLabel?: string;
}

/**
 * Multi-select interest chips — the "personalize your feed" onboarding step. A
 * wrap of toggleable chips where a selected chip fills with the primary token
 * and shows a check; selection state is announced per-chip (`aria-checked`) and
 * the running count is exposed on the group label plus a polite live region, so
 * screen-reader users hear their progress. Enforces an optional `maxSelections`
 * cap. Guards an empty option list with the {@link EmptyState}. No literal
 * colors.
 */
export const InterestPicker = React.forwardRef<HTMLDivElement, InterestPickerProps>(
  function InterestPicker(
    {
      options,
      selectedIds,
      onChange,
      title,
      helper,
      maxSelections,
      groupLabel = 'Interests',
      className,
      ...rest
    },
    ref
  ) {
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const atCap = maxSelections != null && selectedSet.size >= maxSelections;

    const toggle = (id: string): void => {
      const next = new Set(selectedSet);
      if (next.has(id)) next.delete(id);
      else {
        if (atCap) return;
        next.add(id);
      }
      onChange(Array.from(next));
    };

    if (options.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          <EmptyState title="No topics to choose from." />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-4', className)} {...rest}>
        {title ? <h2 className="text-xl font-bold text-on-surface">{title}</h2> : null}
        {helper ? <p className="text-sm text-muted">{helper}</p> : null}

        <div
          role="group"
          aria-label={`${groupLabel}, ${selectedSet.size} selected`}
          className="flex flex-wrap gap-2"
        >
          {options.map((opt) => {
            const selected = selectedSet.has(opt.id);
            const disabled = !selected && atCap;
            return (
              <button
                key={opt.id}
                type="button"
                role="checkbox"
                aria-checked={selected}
                aria-label={opt.label}
                disabled={disabled}
                onClick={() => toggle(opt.id)}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-semibold transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  'disabled:pointer-events-none disabled:opacity-45',
                  selected
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-surface text-on-surface'
                )}
              >
                {selected ? (
                  <Icon glyph="✓" size="sm" color="onPrimary" />
                ) : opt.icon ? (
                  <Icon glyph={opt.icon} size="sm" color="onSurface" />
                ) : null}
                {opt.label}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="sr-only">
          {selectedSet.size} selected
        </p>
      </div>
    );
  }
);
