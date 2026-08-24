import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import type { SurveyChoice, ChoiceSelection } from './types';

export interface MultipleChoiceProps {
  /** The answer options. Empty renders the empty state. */
  options: SurveyChoice[];
  /**
   * Controlled selection. In `single` mode a string id (or `null`); in
   * `multiple` mode an array of ids.
   */
  value: string | string[] | null;
  /**
   * Fires with the next selection — a string id in `single` mode, an id array
   * in `multiple` mode.
   */
  onChange: (value: string | string[]) => void;
  /** `single` = radios, `multiple` = checkboxes. Default `'single'`. */
  selection?: ChoiceSelection;
  /** Accessible name for the option group. Default `'Answer options'`. */
  'aria-label'?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A choice list — the answer control for pick-one (`single`) or pick-many
 * (`multiple`) questions. Each option is a full-width clickable row with a
 * token-bound radio/checkbox indicator; the selected row fills its indicator
 * with the primary token and is announced via `aria-checked`, so state is never
 * conveyed by color alone. `single` exposes a `radiogroup` of `radio` rows,
 * `multiple` a group of `checkbox` rows. Empty options render a muted
 * {@link EmptyState}. No literal colors.
 */
export const MultipleChoice = React.forwardRef<HTMLDivElement, MultipleChoiceProps>(
  function MultipleChoice(
    {
      options,
      value,
      onChange,
      selection = 'single',
      'aria-label': ariaLabel = 'Answer options',
      disabled = false,
      className,
    },
    ref
  ) {
    const multiple = selection === 'multiple';

    const selectedSet = React.useMemo(() => {
      if (multiple) return new Set(Array.isArray(value) ? value : []);
      return new Set(typeof value === 'string' ? [value] : []);
    }, [multiple, value]);

    const toggle = (id: string): void => {
      if (multiple) {
        const next = new Set(selectedSet);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        onChange(Array.from(next));
      } else {
        onChange(id);
      }
    };

    if (options.length === 0) {
      return <EmptyState ref={ref} title="No options available." className={className} />;
    }

    return (
      <div
        ref={ref}
        role={multiple ? 'group' : 'radiogroup'}
        aria-label={ariaLabel}
        className={cn('flex flex-col gap-sm', className)}
      >
        {options.map((opt) => {
          const selected = selectedSet.has(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={selected}
              aria-label={opt.label}
              disabled={disabled}
              onClick={() => toggle(opt.id)}
              className={cn(
                'flex items-center gap-sm rounded-md border bg-surface px-md py-sm text-left transition-colors',
                'disabled:pointer-events-none disabled:opacity-50 hover:opacity-90',
                selected ? 'border-primary' : 'border-border'
              )}
            >
              {/* Indicator: circle for single, square for multiple. */}
              <span
                className={cn(
                  'flex h-[22px] w-[22px] shrink-0 items-center justify-center',
                  multiple ? 'rounded-sm' : 'rounded-full',
                  selected ? 'bg-primary' : 'border border-border bg-surface'
                )}
              >
                {selected ? <Icon glyph={multiple ? '✓' : '●'} size="xs" color="onPrimary" /> : null}
              </span>

              {opt.icon ? <Icon glyph={opt.icon} size="base" color="onSurface" /> : null}

              <span className="flex-1">
                <span className={cn('block text-base text-on-surface', selected ? 'font-bold' : 'font-medium')}>
                  {opt.label}
                </span>
                {opt.description ? (
                  <span className="block text-sm text-muted">{opt.description}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);
