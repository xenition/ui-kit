import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { formatMoney as defaultFormat } from '../commerce';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { TABULAR_CLASS, spokenLine } from './internal/menu-v4';
import type { TipSelectorProps } from './TipSelector';

export interface TipSelectorV4Props extends TipSelectorProps {
  /** Copy on the leading "no tip" option. Default `'No tip'`. */
  noTipLabel?: string;
  /**
   * The option selected before anything is chosen, when the component runs
   * **uncontrolled** — that is, when `selectedPercent` is not passed at all.
   *
   * `null` (the default) is "no tip", which is exactly what the base rendered.
   * The difference is that the choice can now move.
   */
  defaultSelectedPercent?: number | null;
}

const DEFAULT_PERCENTS = [10, 15, 20, 25];

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;
const PRIMARY_STATE = stateGroundVars(
  'var(--xen-primary)',
  'var(--xen-on-primary)'
) as React.CSSProperties;

/**
 * **V4 tip selector** — the web twin of the native `TipSelectorV4`, same props
 * as {@link TipSelector} plus `noTipLabel` and `defaultSelectedPercent`.
 *
 * ## Five changes
 *
 * 1. **It works when you drop it in.** `selectedPercent` was optional,
 *    `selected` was recomputed from props on every render and the component
 *    held no state — so an uncontrolled `TipSelector` rendered "No tip" filled
 *    and `aria-checked` **forever**, and every tap emitted `onSelect` while
 *    nothing on screen moved. This is the third module in the kit with that
 *    exact shape, after `EmailThread` and `SwipeDeck`. Passing
 *    `selectedPercent` still hands control back to the caller; omitting it now
 *    means the control owns its own state, seeded from
 *    `defaultSelectedPercent`.
 * 2. **Options clear 44.** They were a 14px label in `py-sm` — roughly half a
 *    target, on a row of controls a thumb hits at checkout.
 * 3. **The computed amount is part of the option's name.** `role="radio"` is
 *    children-presentational, so the `$4.50` under "20%" was drawn and pruned.
 * 4. **Press is a state layer and focus is the `ring` token**, replacing
 *    `hover:bg-neutral-100` — a light-oriented ramp step — and
 *    `ring-primary-300`.
 * 5. **The unselected amount is inked with `mutedText`**, the
 *    contrast-corrected slot, rather than `muted`, which is a fill.
 */
export const TipSelectorV4 = React.forwardRef<HTMLDivElement, TipSelectorV4Props>(
  function TipSelectorV4(
    {
      percents = DEFAULT_PERCENTS,
      selectedPercent,
      defaultSelectedPercent = null,
      onSelect,
      subtotalCents,
      currency = 'USD',
      title = 'Add a tip',
      allowNone = true,
      noTipLabel = 'No tip',
      formatMoney = defaultFormat,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const controlled = selectedPercent !== undefined;
    const [internal, setInternal] = React.useState<number | null>(defaultSelectedPercent);
    const active = controlled ? selectedPercent : internal;

    const choose = (percent: number | null): void => {
      if (!controlled) setInternal(percent);
      onSelect?.(percent);
    };

    type Choice = { key: string; percent: number | null; label: string };
    const choices: Choice[] = [
      ...(allowNone ? [{ key: 'none', percent: null as number | null, label: noTipLabel }] : []),
      ...percents.map((p) => ({ key: String(p), percent: p as number | null, label: `${p}%` })),
    ];

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        {title ? (
          <h4 className="font-heading text-base font-semibold text-on-surface">{title}</h4>
        ) : null}
        <div role="radiogroup" aria-label={title} className="flex gap-sm">
          {choices.map((choice) => {
            const selected = choice.percent === active;
            const amount =
              choice.percent !== null && typeof subtotalCents === 'number'
                ? Math.round((subtotalCents * choice.percent) / 100)
                : null;
            const amountText = amount !== null ? formatMoney(amount, currency) : undefined;

            return (
              <button
                key={choice.key}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={spokenLine([choice.label, amountText])}
                onClick={() => choose(choice.percent)}
                data-xen-v4-state=""
                style={selected ? PRIMARY_STATE : CARD_STATE}
                className={cn(
                  'flex flex-1 flex-col items-center justify-center gap-xs px-xs py-sm',
                  MIN_TAP_CLASS,
                  'rounded-[var(--xen-radius-md)] border',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  selected
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-card text-on-card'
                )}
              >
                <span className="text-sm font-bold">{choice.label}</span>
                {amountText ? (
                  <span
                    className={cn(
                      'text-xs',
                      TABULAR_CLASS,
                      selected ? 'text-on-primary' : 'text-muted-text'
                    )}
                  >
                    {amountText}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
