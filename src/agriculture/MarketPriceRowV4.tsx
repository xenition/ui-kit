import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowEdgeClass,
} from '../dashboard/internal/row-v4';
import { metaLine } from './internal/farm-v4';
import type { MarketPriceRowProps, PriceDirection } from './MarketPriceRow';

export interface MarketPriceRowV4Props extends MarketPriceRowProps {
  /**
   * Format the change. Default `'+2.4%'` / `'-1.1%'` / `'0.0%'`.
   *
   * The base built the string inline with a hard-coded `toFixed(1)` and a
   * hand-written sign, so a host could not localize the decimal separator or
   * choose a different precision for a thinly-traded commodity.
   */
  formatChange?: (changePct: number, direction: PriceDirection) => string;
  /** Announced after the change, so direction is never colour alone. */
  directionLabels?: Partial<Record<PriceDirection, string>>;
}

/**
 * Direction → glyph, spoken label and sign.
 *
 * The colours are **not** here: a price movement genuinely is good or bad news
 * to the person reading it, so `up` keeps `success-text` and `down` keeps
 * `danger-text` — but the glyph and the word carry it too, because a
 * red-green-only signal is the single most common accessibility defect in a
 * markets table.
 */
const DIR_META: Record<PriceDirection, { glyph: string; label: string; sign: string }> = {
  up: { glyph: '▲', label: 'up', sign: '+' },
  down: { glyph: '▼', label: 'down', sign: '' },
  flat: { glyph: '▪', label: 'unchanged', sign: '' },
};

const DIR_INK: Record<PriceDirection, string> = {
  up: 'text-success-text',
  down: 'text-danger-text',
  flat: 'text-muted-text',
};

/**
 * **V4 market price row** — the web twin of the native `MarketPriceRowV4`,
 * same props as {@link MarketPriceRow} plus `formatChange` and
 * `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **Direction is not carried by colour alone.** The glyph was already
 *    there; the spoken label is new, so a screen reader says "up 2.4 percent"
 *    rather than reading a triangle.
 * 2. **The change is formattable** — see `formatChange`.
 * 3. **It is a row from the shared row line**, with the shared hover layer.
 * 4. **The price and the change are tabular**, which is the whole point of a
 *    column of prices.
 *
 * **Renders nothing without a `commodity`** (§4.5).
 */
export const MarketPriceRowV4 = React.forwardRef<HTMLDivElement, MarketPriceRowV4Props>(
  function MarketPriceRowV4(
    {
      commodity,
      price,
      unit,
      changePct,
      direction,
      icon = '🌽',
      market,
      formatChange,
      directionLabels,
      last = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (!commodity) return null;

    const dir: PriceDirection =
      direction ??
      (typeof changePct === 'number'
        ? changePct > 0
          ? 'up'
          : changePct < 0
            ? 'down'
            : 'flat'
        : 'flat');
    const meta = DIR_META[dir];
    const dirLabel = directionLabels?.[dir] ?? meta.label;

    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const changeText = hasChange
      ? (formatChange ??
          ((n: number, d: PriceDirection) => `${DIR_META[d].sign}${n.toFixed(1)}%`))(
          changePct as number,
          dir
        )
      : null;

    const caption = metaLine([market, unit]);
    const name = [commodity, String(price), unit, changeText ? `${dirLabel} ${changeText}` : null]
      .filter(Boolean)
      .join(', ');

    return (
      <div
        ref={ref}
        data-xen-market-price-row=""
        data-xen-v4-chrome={onClick ? 'on-surface' : undefined}
        role={onClick ? 'button' : undefined}
        onClick={onClick}
        aria-label={name}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(Boolean(caption)),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        <IconV4 glyph={icon} size="lg" />

        <div className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{commodity}</span>
          {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
        </div>

        <div className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-0')}>
          <span className="font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]">
            {String(price)}
          </span>
          {changeText ? (
            <span className={cn('flex items-center gap-xs text-xs', DIR_INK[dir])}>
              <span aria-hidden>{meta.glyph}</span>
              <span className="font-semibold [font-variant-numeric:tabular-nums]">
                {changeText}
              </span>
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
