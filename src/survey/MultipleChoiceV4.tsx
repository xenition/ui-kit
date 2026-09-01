import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import type { MultipleChoiceProps } from './MultipleChoice';

/** Drop-in for {@link MultipleChoiceProps} — same props, the V4 "focus" design. */
export type MultipleChoiceV4Props = MultipleChoiceProps;

/**
 * MultipleChoice — **V4** "clean form / focus" design. Calm, legible answer
 * rows rendered as big tappable cards (min height 44px, generous 8-pt padding).
 * Each row carries a leading radio (`single`) or check (`multiple`) indicator,
 * an optional icon, a label and optional description. The selected row lifts to
 * a soft `bg-primary/10` tint with a `border-primary` edge and a solid
 * **primary** indicator with on-primary glyph; unselected rows sit on
 * `bg-surface` + `border-border`. One accent throughout. Same props/behavior as
 * {@link MultipleChoiceProps} — `radiogroup`/`radio` vs. `checkbox` roles,
 * `aria-checked`, single/multiple selection and the empty state are all
 * preserved; all colors come from `--xen-*` token classes (no literal colors).
 */
export const MultipleChoiceV4 = React.forwardRef<HTMLDivElement, MultipleChoiceV4Props>(
  function MultipleChoiceV4(
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
                'flex min-h-[44px] items-center gap-sm rounded-[var(--xen-radius-lg)] border px-md py-sm text-left transition-colors',
                'disabled:pointer-events-none disabled:opacity-50 hover:opacity-90',
                selected ? 'border-2 border-primary bg-primary/10' : 'border-border bg-surface'
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
