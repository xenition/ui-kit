import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { InputV4 } from '../primitives/InputV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { amountValue, useAmountField } from './amount-v4';
import { TABULAR_CLASS } from './internal/market-v4';
import { formatToken } from './internal/format';
import type { SwapFormProps } from './SwapForm';

export interface SwapFormV4Props extends SwapFormProps {
  /**
   * How many fraction digits the pay field accepts. Default `18` — the ERC-20
   * maximum, so the field never silently truncates a legal amount.
   */
  maxDecimals?: number;
  /** Name for the direction control. Default `'Flip direction'`. */
  flipLabel?: string;
  /** Announced while a quote is in flight. Default `'Fetching quote'`. */
  loadingLabel?: string;
}

/** The one panel both money fields sit in — a card, not a ramp step. */
const PANEL_CLASS =
  'flex flex-col gap-xs rounded-[var(--xen-radius-md)] border border-border bg-card p-md';

/** 44 on both axes. `MIN_TAP_CLASS` supplies the height; this the width. */
const FLIP_WIDTH_CLASS = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

/**
 * **V4 swap form** — the web twin of the native `SwapFormV4`, same props as
 * {@link SwapForm} plus `maxDecimals`, `flipLabel` and `loadingLabel`.
 *
 * ## Seven changes
 *
 * 1. **A decimal amount can finally be typed.** The field was fully controlled
 *    off a *number*: `value={String(fromAmount)}` with
 *    `onChange={(e) => emit(parseAmount(e.target.value))}`. `parseFloat('1.')`
 *    is `1`, so the instant the user typed the decimal point the parent was
 *    handed `1`, the field re-rendered as `"1"`, and the point vanished from
 *    under the caret; a leading `0` collapsed to `''` and disappeared outright.
 *    Only whole token units could ever be entered — in the one component whose
 *    submit hands a value to a chain transaction. Someone swapping 0.25 typed
 *    `0`, saw nothing, typed `.`, saw nothing, typed `2`, and submitted **2**.
 *    The field now binds to `useAmountField`, which holds the draft as text and
 *    emits the parsed number.
 * 2. **The pay field has a visible focus indicator.** The base set `border-0`
 *    *and* `focus:ring-0` on the form's only editable control, so a keyboard
 *    user tabbing into the amount got no indication of where they were.
 * 3. **Both money figures are tabular.** Only the receive side was, so the two
 *    large stacked numbers did not line up digit for digit.
 * 4. **The receive amount is not replaced by its own label.** `aria-label`
 *    sat on the very element whose text *was* the quote, so a reader heard
 *    "Receive amount" and never the number.
 * 5. **The flip control clears 44** — it was a 32px disc — and its disabled
 *    state is M3's 0.38, not a guessed 0.5.
 * 6. **`loading` says so.** It disabled the button and nothing else, so a
 *    quote in flight was indistinguishable from an invalid form.
 * 7. **The same-token hint is not `role="alert"`.** It is present from first
 *    render rather than arriving as an urgent update, and interrupting a
 *    reader with a condition that was already true teaches them to ignore the
 *    channel.
 */
export const SwapFormV4 = React.forwardRef<HTMLDivElement, SwapFormV4Props>(function SwapFormV4(
  {
    from,
    to,
    fromAmount = 0,
    rate,
    onChange,
    onFlip,
    onSubmit,
    submitLabel = 'Swap',
    loading = false,
    maxDecimals = 18,
    flipLabel = 'Flip direction',
    loadingLabel = 'Fetching quote',
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  const emit = React.useCallback(
    (next: number): void => {
      onChange?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: next });
    },
    [onChange, from.symbol, to.symbol]
  );

  const amount = useAmountField(fromAmount, emit, maxDecimals);

  // Read the draft rather than the prop, so the form still works for a caller
  // who mounts it without `onChange` — the base's own barrel doc shows exactly
  // that usage, and it could never produce a positive amount.
  const typed = amountValue(amount.text);
  const toAmount = rate != null ? typed * rate : undefined;
  const sameToken = from.symbol === to.symbol;
  const canSubmit = typed > 0 && !sameToken;

  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
      <div className={PANEL_CLASS}>
        <span className="text-xs font-semibold text-muted-text">You pay</span>
        <div className="flex items-center gap-sm">
          <InputV4
            aria-label="Pay amount"
            inputMode="decimal"
            value={amount.text}
            placeholder="0.0"
            onChange={(event) => amount.setText(event.target.value)}
            containerClassName="min-w-0 flex-1"
            // Borderless inside the panel, but `InputV4`'s focus halo is a
            // box-shadow rather than a border swap, so dropping the border
            // costs nothing and the focus indicator survives.
            className={cn('border-0 bg-transparent px-0 text-xl font-bold', TABULAR_CLASS)}
          />
          <span className="text-base font-bold text-on-card">{from.symbol}</span>
        </div>
      </div>

      <button
        type="button"
        aria-label={flipLabel}
        onClick={onFlip}
        disabled={!onFlip}
        data-xen-v4-state=""
        style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
        className={cn(
          'flex items-center justify-center self-center rounded-[var(--xen-radius-full)]',
          'border border-border bg-surface text-on-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          MIN_TAP_CLASS,
          FLIP_WIDTH_CLASS,
          V4_DISABLED_CLASS
        )}
      >
        <span aria-hidden="true">⇅</span>
      </button>

      <div className={PANEL_CLASS}>
        <span className="text-xs font-semibold text-muted-text">You receive</span>
        <div className="flex items-center gap-sm">
          {/*
            No `aria-label` here. It sat on the element whose text is the quote,
            and an accessible name replaces the subtree — so the one number the
            panel exists to show was the one thing never announced.
          */}
          <span
            className={cn(
              'flex-1 text-xl font-bold',
              TABULAR_CLASS,
              toAmount != null ? 'text-on-card' : 'text-muted-text'
            )}
          >
            {toAmount != null ? formatToken(toAmount, { decimals: to.decimals ?? 4 }) : '—'}
          </span>
          <span className="text-base font-bold text-on-card">{to.symbol}</span>
        </div>
      </div>

      {rate != null ? (
        <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
          {`1 ${from.symbol} ≈ ${formatToken(rate, { decimals: to.decimals ?? 4 })} ${to.symbol}`}
        </span>
      ) : null}

      {sameToken ? (
        <p className="text-xs text-danger-text">Choose two different tokens.</p>
      ) : null}

      {loading ? (
        <span role="status" aria-live="polite" className="text-xs text-muted-text">
          {loadingLabel}
        </span>
      ) : null}

      <ButtonV4
        onClick={() =>
          onSubmit?.({ fromSymbol: from.symbol, toSymbol: to.symbol, fromAmount: typed })
        }
        disabled={!canSubmit || loading}
      >
        {submitLabel}
      </ButtonV4>
    </div>
  );
});
