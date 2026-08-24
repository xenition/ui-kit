import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import type { MultipleChoiceProps } from './MultipleChoice';

/** Same public contract as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV2Props = MultipleChoiceProps;

/**
 * MultipleChoice, redesigned (v2): **big option cards**. Each choice is a bordered
 * tile with a radio/checkbox marker, optional glyph, label and description; a
 * selected tile fills primary-tinted with a ring. Bolder than v1's list. Same
 * props, token-only.
 */
export const MultipleChoiceV2 = React.forwardRef<HTMLDivElement, MultipleChoiceV2Props>(
  function MultipleChoiceV2({ options, value, onChange, selection = 'single', disabled = false, className, ...rest }, ref) {
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
      <div ref={ref} data-xen-multiple-choice="" role={multiple ? 'group' : 'radiogroup'} aria-label={rest['aria-label'] ?? 'Answer options'} className={cn('flex flex-col gap-2', className)}>
        {options.map((opt) => {
          const selected = isSel(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={selected}
              disabled={disabled}
              onClick={() => toggle(opt.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors disabled:opacity-50',
                selected ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:bg-neutral-50'
              )}
            >
              <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center border-2', multiple ? 'rounded' : 'rounded-full', selected ? 'border-primary bg-primary text-on-primary' : 'border-border')}>
                {selected ? <span className="text-xs">{multiple ? '✓' : '●'}</span> : null}
              </span>
              {opt.icon ? <span className="text-lg" aria-hidden>{opt.icon}</span> : null}
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-on-surface">{opt.label}</span>
                {opt.description ? <span className="block text-xs text-muted">{opt.description}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);
