import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { MultipleChoiceProps } from './MultipleChoice';

/** Same public contract as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV3Props = MultipleChoiceProps;

/**
 * MultipleChoice, redesigned (v3): **compact option rows**. A small radio/checkbox
 * marker, glyph and label share a hairline-bordered line with the description
 * folded in — dense for long option lists. The opposite of v2's tiles. Same
 * props, token-only.
 */
export const MultipleChoiceV3 = React.forwardRef<HTMLDivElement, MultipleChoiceV3Props>(
  function MultipleChoiceV3({ options, value, onChange, selection = 'single', disabled = false, className, ...rest }, ref) {
    if (options.length === 0) {
      return <EmptyState ref={ref} icon={<span className="text-3xl">📝</span>} title="No options" className={className} />;
    }
    const multiple = selection === 'multiple';
    const isSel = (id: string): boolean => (multiple ? Array.isArray(value) && value.includes(id) : value === id);
    const toggle = (id: string): void => {
      if (multiple) {
        const arr = Array.isArray(value) ? value : [];
        onChange(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
      } else {
        onChange(id);
      }
    };

    return (
      <div ref={ref} data-xen-multiple-choice="" role={multiple ? 'group' : 'radiogroup'} aria-label={rest['aria-label'] ?? 'Answer options'} className={cn('flex flex-col', className)}>
        {options.map((opt) => {
          const selected = isSel(opt.id);
          const sub = [opt.description].filter(Boolean).join('');
          return (
            <button
              key={opt.id}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={selected}
              disabled={disabled}
              onClick={() => toggle(opt.id)}
              className="flex items-center gap-3 border-b border-border py-2.5 text-left transition-colors hover:bg-neutral-50 disabled:opacity-50"
            >
              <span className={cn('flex h-4 w-4 shrink-0 items-center justify-center border', multiple ? 'rounded' : 'rounded-full', selected ? 'border-primary bg-primary' : 'border-border')}>
                {selected ? <span className="h-1.5 w-1.5 rounded-full bg-on-primary" /> : null}
              </span>
              {opt.icon ? <span aria-hidden>{opt.icon}</span> : null}
              <span className="min-w-0 flex-1 truncate text-sm text-on-surface">
                {opt.label}
                {sub ? <span className="text-muted"> · {sub}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);
