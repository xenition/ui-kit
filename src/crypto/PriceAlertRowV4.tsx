import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { SwitchV4 } from '../primitives/SwitchV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { spokenLine, TABULAR_CLASS } from './internal/market-v4';
import { formatPrice } from './internal/format';
import type { AlertCondition, PriceAlertRowProps } from './PriceAlertRow';

export interface PriceAlertRowV4Props extends PriceAlertRowProps {
  /** Override the trigger words. Defaults `'Above'` and `'Below'`. */
  directionLabels?: { above?: string; below?: string };
}

/**
 * The trigger condition's glyph.
 *
 * No tone: `above → success` / `below → danger` spent the gain and error slots
 * on a condition the user *chose*. Neither is a status — an alert set below the
 * market is not an error — and once the two are toned, a row that has genuinely
 * failed has nothing left to say it with.
 */
const CONDITION_GLYPH: Record<AlertCondition, string> = { above: '▲', below: '▼' };

const CONDITION_LABEL: Record<AlertCondition, string> = { above: 'Above', below: 'Below' };

/**
 * **V4 price-alert row** — the web twin of the native `PriceAlertRowV4`, same
 * props as {@link PriceAlertRow} plus `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A disarmed alert is not drawn as an unavailable one.** The base dropped
 *    the whole row — the `Switch` included — to `opacity-60`, putting a live,
 *    toggleable control inside M3's disabled band. Whether an alert is armed
 *    is what the switch is *for*; dimming the row to say it a second time only
 *    makes the control look dead. The row keeps full strength.
 * 2. **Direction is identity, not status.** See {@link CONDITION_GLYPH}.
 * 3. **The switch clears 44.** It was the primitive's own compact size, in the
 *    only place on the row a finger can land.
 * 4. **The row joins the shared row family**, so an alert list, a settings
 *    screen and a notification feed are one object — one height, one text
 *    column, one trailing slot.
 */
export const PriceAlertRowV4 = React.forwardRef<HTMLDivElement, PriceAlertRowV4Props>(
  function PriceAlertRowV4(
    {
      symbol,
      condition,
      targetPrice,
      currentPrice,
      currencySymbol = '$',
      decimals = 2,
      enabled = false,
      onToggle,
      directionLabels,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

    const word = directionLabels?.[condition] ?? CONDITION_LABEL[condition];
    const target = formatPrice(targetPrice, { symbol: currencySymbol, decimals });

    return (
      <div ref={ref} className={className} {...rest}>
        <div className={cn(ROW_V4_BASE_CLASS, rowHeightClass(currentPrice != null))}>
          <span className={ROW_V4_TEXT_CLASS}>
            <span className="text-base font-bold text-on-card">{symbol}</span>
            <span className="flex items-center gap-xs">
              <span aria-hidden="true" className="text-sm text-muted-text">
                {CONDITION_GLYPH[condition]}
              </span>
              <span className="text-sm text-muted-text">{word}</span>
              <span className={cn('text-sm font-semibold text-on-card', TABULAR_CLASS)}>
                {target}
              </span>
            </span>
            {currentPrice != null ? (
              <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
                {`Now ${formatPrice(currentPrice, { symbol: currencySymbol, decimals })}`}
              </span>
            ) : null}
          </span>

          <span className={ROW_V4_TRAILING_CLASS}>
            <SwitchV4
              checked={enabled}
              onCheckedChange={onToggle}
              aria-label={spokenLine([symbol, word, target])}
              className={MIN_TAP_CLASS}
            />
          </span>
        </div>
      </div>
    );
  }
);
