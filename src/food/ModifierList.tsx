import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import type { MoneyFormatter } from '../commerce';

/** How many options may be selected at once. */
export type ModifierSelectionMode = 'single' | 'multi';

export interface ModifierOption {
  /** Stable id passed back to `onToggle`. */
  id: string;
  /** Human label (e.g. "Extra cheese"). */
  label: string;
  /** Price delta in integer cents (e.g. +150). Zero/absent shows nothing. */
  priceCents?: number;
  /** Whether this option is currently selected. */
  selected?: boolean;
  /** Disable this individual option. */
  disabled?: boolean;
}

export interface ModifierListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Options to render. When empty an `emptyLabel` row is shown. */
  options: ModifierOption[];
  /** `single` (radio) or `multi` (checkbox) selection (default `multi`). */
  mode?: ModifierSelectionMode;
  /** Group heading (e.g. "Add-ons", "Choose a size"). */
  title?: string;
  /** Marks the group required; renders a "Required" hint next to the title. */
  required?: boolean;
  /** Fired with the toggled option id. */
  onToggle?: (id: string) => void;
  /** ISO 4217 currency code for price deltas (default `USD`). */
  currency?: string;
  /** Copy shown when `options` is empty (default `No options`). */
  emptyLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
}

/**
 * A selectable list of dish modifiers / add-ons. `mode` picks the semantics:
 * `single` behaves like a radio group (each cell `role="radio"`), `multi` like
 * checkboxes (`role="checkbox"`). Each option is a real `<button>` (keyboard
 * native) carrying `aria-checked` so selected state is not signalled by color
 * alone; a token-drawn check/dot glyph is also shown. Renders an empty row when
 * there are no options. Web parity of the native `ModifierList`; token-only.
 */
export const ModifierList = React.forwardRef<HTMLDivElement, ModifierListProps>(function ModifierList(
  {
    options,
    mode = 'multi',
    title,
    required = false,
    onToggle,
    currency = 'USD',
    emptyLabel = 'No options',
    formatMoney = defaultFormat,
    className,
    ...rest
  },
  ref
) {
  const single = mode === 'single';

  return (
    <div ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      {title ? (
        <div className="flex items-center justify-between">
          <h4 className="font-heading text-base font-semibold text-on-surface">{title}</h4>
          {required ? <span className="text-xs font-semibold text-danger">Required</span> : null}
        </div>
      ) : null}

      {options.length === 0 ? (
        <p className="text-sm text-muted">{emptyLabel}</p>
      ) : (
        <div
          role={single ? 'radiogroup' : 'group'}
          aria-label={title}
          className="overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface"
        >
          {options.map((option, index) => {
            const selected = option.selected === true;
            const hasDelta = typeof option.priceCents === 'number' && option.priceCents !== 0;
            const cents = option.priceCents ?? 0;
            return (
              <button
                key={option.id}
                type="button"
                role={single ? 'radio' : 'checkbox'}
                aria-checked={selected}
                aria-label={option.label}
                disabled={option.disabled}
                onClick={() => onToggle?.(option.id)}
                className={cn(
                  'flex w-full items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left transition-colors',
                  index > 0 && 'border-t border-border',
                  'hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300',
                  option.disabled && 'pointer-events-none opacity-50'
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center border-2 text-xs font-bold leading-none',
                    single ? 'rounded-full' : 'rounded-[var(--xen-radius-sm)]',
                    selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface'
                  )}
                >
                  {selected ? (single ? '●' : '✓') : ''}
                </span>
                <span className="flex-1 text-sm text-on-surface">{option.label}</span>
                {hasDelta ? (
                  <span className="text-sm text-muted tabular-nums">
                    {cents > 0 ? '+' : '−'}
                    {formatMoney(Math.abs(cents), currency)}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
