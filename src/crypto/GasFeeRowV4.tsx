import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatMoney } from '../commerce/money';
import { spokenLine, TABULAR_CLASS } from './internal/market-v4';
import { formatToken } from './internal/format';
import type { GasFeeRowProps, GasSpeed } from './GasFeeRow';

export interface GasFeeRowV4Props extends GasFeeRowProps {
  /** Override the tier words. Defaults `'Slow'`, `'Average'`, `'Fast'`. */
  speedLabels?: Partial<Record<GasSpeed, string>>;
}

const SPEED_META: Record<GasSpeed, { label: string; glyph: string }> = {
  slow: { label: 'Slow', glyph: '🐢' },
  average: { label: 'Average', glyph: '🚶' },
  fast: { label: 'Fast', glyph: '⚡' },
};

/**
 * **V4 gas-fee tier** — the web twin of the native `GasFeeRowV4`, same props as
 * {@link GasFeeRow} plus `speedLabels`.
 *
 * ## Four changes
 *
 * 1. **It is a real radio.** The base was a `div` carrying `role="radio"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler — three
 *    approximations of a control the platform already ships, and one that
 *    never joined a radio group. The input is a real `<input type="radio">`
 *    covering the row, so checked state, activation and focus come from the
 *    browser.
 * 2. **The tier announces its numbers.** `aria-label="Average gas"` replaced
 *    the subtree, so the gwei price, the ETA and the fiat cost — the only
 *    things that distinguish one tier from another — were never spoken. Beyond
 *    Slow / Average / Fast, every tier announced identically.
 * 3. **Selected is a token, not a ramp step.** `bg-primary-50` is a
 *    light-oriented step that paints a pale plate onto a dark page;
 *    `--xen-selected` is the compiler's slot for exactly this, and it ships
 *    with `--xen-on-selected` so the copy on it keeps a contrast pair.
 * 4. **The row clears 44, and hover and press are a state layer** rather than
 *    a `cursor-pointer` and nothing else.
 */
export const GasFeeRowV4 = React.forwardRef<HTMLDivElement, GasFeeRowV4Props>(
  function GasFeeRowV4(
    {
      speed,
      gwei,
      costCents,
      currency = 'USD',
      eta,
      selected = false,
      onSelect,
      speedLabels,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const meta = SPEED_META[speed];
    const word = speedLabels?.[speed] ?? meta.label;
    const gweiText = formatToken(gwei, { decimals: 2, symbol: 'gwei' });

    const label = spokenLine([
      word,
      gweiText,
      eta,
      costCents != null ? formatMoney(costCents, currency) : undefined,
    ]);

    const surface = cn(
      'flex items-center gap-md rounded-[var(--xen-radius-md)] border px-md py-sm',
      MIN_TAP_CLASS,
      selected ? 'border-primary bg-selected text-on-selected' : 'border-border bg-card text-on-card'
    );

    const content = (
      <>
        <span aria-hidden="true" className="text-lg">
          {meta.glyph}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="text-base font-semibold">{word}</span>
          <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
            {eta != null ? `${gweiText} · ${eta}` : gweiText}
          </span>
        </span>
        {costCents != null ? (
          <MoneyAmount cents={costCents} currency={currency} tone="neutral" size="sm" />
        ) : null}
      </>
    );

    if (!onSelect) {
      return (
        <div ref={ref} className={className} {...rest}>
          <div className={surface}>{content}</div>
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        <label
          data-xen-v4-state=""
          style={
            stateGroundVars(
              selected ? 'var(--xen-selected)' : 'var(--xen-card)',
              selected ? 'var(--xen-on-selected)' : 'var(--xen-on-card)'
            ) as React.CSSProperties
          }
          className={cn(
            surface,
            'relative cursor-pointer',
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring'
          )}
        >
          {/*
            A real radio, laid over the row and made invisible rather than
            removed: the browser owns checked state, activation and the focus
            the ring reacts to. The state layer sits on the label so hovering
            the input still tints the row it belongs to.
          */}
          <input
            type="radio"
            checked={selected}
            aria-label={label}
            onChange={() => onSelect(speed)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          {content}
        </label>
      </div>
    );
  }
);
