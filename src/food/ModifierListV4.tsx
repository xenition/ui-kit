import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { TABULAR_CLASS, spokenLine } from './internal/menu-v4';
import type { ModifierListProps } from './ModifierList';

export interface ModifierListV4Props extends ModifierListProps {
  /** The word marking the group required. Default `'Required'`. */
  requiredLabel?: string;
}

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * **V4 modifier list** — the web twin of the native `ModifierListV4`, same
 * props as {@link ModifierList} plus `requiredLabel`.
 *
 * ## Five changes
 *
 * 1. **A paid extra is no longer added in silence.** `role="checkbox"` and
 *    `role="radio"` are children-presentational exactly as `role="button"` is,
 *    and the option's `aria-label` was the bare label — so the `+$1.50` beside
 *    "Extra cheese" was rendered, was correct, and was pruned. The delta now
 *    goes into the name through `spokenLine`, which is the difference between
 *    knowing what an order will cost and finding out at checkout.
 * 2. **`required` reaches assistive tech.** It was a red word next to the
 *    heading and nothing more; it now joins the group's own name and sets
 *    `aria-required` on the radio group.
 * 3. **Rows clear 44.** They were about 38px — a control whose entire job is
 *    to be tapped, under the HIG floor.
 * 4. **A disabled option is disabled, and does not brighten under the
 *    pointer.** `opacity-50` is not a scale step; M3 disables content at 0.38,
 *    and `V4_DISABLED_CLASS` is where that number lives.
 * 5. **Press is a state layer and focus is the `ring` token.**
 *    `hover:bg-neutral-100` is a light-oriented ramp step that paints a
 *    near-white slab across a dark sheet, and `ring-primary-300` is a ramp
 *    step where the preset ships a `ring` colour corrected against the page.
 */
export const ModifierListV4 = React.forwardRef<HTMLDivElement, ModifierListV4Props>(
  function ModifierListV4(
    {
      options,
      mode = 'multi',
      title,
      required = false,
      requiredLabel = 'Required',
      onToggle,
      currency = 'USD',
      emptyLabel = 'No options',
      formatMoney = defaultFormat,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const single = mode === 'single';
    // The group's name says it is required, because the visible word beside
    // the heading is not attached to the group in any way a reader can follow.
    const groupLabel = spokenLine([title, required ? requiredLabel : undefined]);

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        {title ? (
          <div className="flex items-center justify-between gap-sm">
            <h4 className="font-heading text-base font-semibold text-on-surface">{title}</h4>
            {required ? (
              <span aria-hidden="true" className="text-xs font-semibold text-danger-text">
                {requiredLabel}
              </span>
            ) : null}
          </div>
        ) : null}

        {options.length === 0 ? (
          <p role="status" className="text-sm text-muted-text">
            {emptyLabel}
          </p>
        ) : (
          <div
            role={single ? 'radiogroup' : 'group'}
            aria-label={groupLabel !== '' ? groupLabel : undefined}
            // `aria-required` is defined for `radiogroup` and not for `group`,
            // so the multi-select case carries it in the name instead.
            aria-required={single && required ? true : undefined}
            className="overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-card text-on-card"
          >
            {options.map((option, index) => {
              const selected = option.selected === true;
              const cents = option.priceCents ?? 0;
              const hasDelta = typeof option.priceCents === 'number' && option.priceCents !== 0;
              const deltaText = hasDelta
                ? `${cents > 0 ? '+' : '−'}${formatMoney(Math.abs(cents), currency)}`
                : undefined;

              return (
                <button
                  key={option.id}
                  type="button"
                  role={single ? 'radio' : 'checkbox'}
                  aria-checked={selected}
                  // The delta is part of the option, and the role prunes
                  // everything under it.
                  aria-label={spokenLine([option.label, deltaText])}
                  disabled={option.disabled}
                  onClick={() => onToggle?.(option.id)}
                  data-xen-v4-state=""
                  style={CARD_STATE}
                  className={cn(
                    'flex w-full items-center gap-sm px-md py-sm text-left',
                    MIN_TAP_CLASS,
                    index > 0 && 'border-t border-border',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                    V4_DISABLED_CLASS
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'inline-flex h-lg w-lg shrink-0 items-center justify-center border-2 text-xs font-bold leading-none',
                      single ? 'rounded-full' : 'rounded-[var(--xen-radius-sm)]',
                      selected
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-border bg-card'
                    )}
                  >
                    {selected ? (single ? '●' : '✓') : ''}
                  </span>
                  <span className="flex-1 text-sm text-on-card">{option.label}</span>
                  {deltaText ? (
                    <span className={cn('text-sm text-muted-text', TABULAR_CLASS)}>{deltaText}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
