import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { AvatarV4 } from '../primitives/AvatarV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { formatMoney } from '../commerce/money';
import { WinLossBadgeV4 } from './WinLossBadgeV4';
import { clampPercent, PLACEHOLDER_CLASS, spokenLine, TABULAR_CLASS } from './internal/crm-v4';
import { OUTCOME_META } from './internal';
import type { DealCardProps } from './DealCard';

export interface DealCardV4Props extends DealCardProps {
  /** The word in front of the probability figure. Default `'Probability'`. */
  probabilityLabel?: string;
  /** Announced while the skeleton is up. Default `'Loading deal'`. */
  loadingLabel?: string;
}

/**
 * **V4 deal card** — the web twin of the native `DealCardV4`, same props as
 * {@link DealCard} plus `probabilityLabel` and `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The probability meter has a name.** Both twins gave it `aria-valuenow`
 *    and nothing else, with the visible word "Probability" sitting in a
 *    detached sibling — so the meter announced a bare number with no idea what
 *    it was measuring. It is named now, and on an interactive card the figure
 *    also joins the card's own name, because a `button`'s label replaces
 *    everything under it.
 * 2. **One accessible name.** `Deal Acme` replaced the subtree, so the value,
 *    the stage, the probability, the owner and the close date were all silent —
 *    every fact the card draws is in the name, comma-joined.
 * 3. **`compact` actually densifies.** `padding` reached `Card` on native only,
 *    so the web card dropped its meter and its meta row and kept the full `lg`
 *    inset — less information in the same space.
 * 4. **Money is tabular**, so a column of deal values lines up on the decimal
 *    instead of drifting with the digit widths.
 * 5. **The skeleton is the shared placeholder.** The base painted
 *    `bg-neutral-100` — a ramp step, so a pale plate on a dark page — and sized
 *    one block off a **type-scale** token, which is a font size, not a height.
 * 6. **A press is a state layer on a real button**, in place of a
 *    `role="button"` div with a hand-written Enter/Space handler.
 */
export const DealCardV4 = React.forwardRef<HTMLDivElement, DealCardV4Props>(function DealCardV4(
  {
    name,
    company,
    valueCents,
    currency = 'USD',
    stage,
    probability,
    owner,
    closeDate,
    outcome = 'open',
    variant = 'default',
    loading = false,
    probabilityLabel = 'Probability',
    loadingLabel = 'Loading deal',
    onClick,
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

  // A deal with no name is the blank bordered box the line rules out.
  if (!name) return null;

  const compact = variant === 'compact';
  const highlighted = variant === 'highlighted';
  const clamped = clampPercent(probability);
  // `clampPercent` clamps but does not round; the meter prints a whole percent.
  const pct = clamped != null ? Math.round(clamped) : undefined;
  const showMeter = !compact && pct != null;
  const interactive = onClick != null && !loading;
  const money = formatMoney(valueCents, currency);
  const meterName = pct != null ? `${probabilityLabel}, ${pct}%` : undefined;

  const label = spokenLine([
    name,
    company,
    money,
    stage,
    showMeter ? meterName : undefined,
    OUTCOME_META[outcome].label,
    !compact ? owner?.name : undefined,
    !compact ? closeDate : undefined,
  ]);

  const body = (
    <>
      <span className="flex items-start justify-between gap-sm">
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="truncate font-bold text-on-surface">{name}</span>
          {company ? <span className="truncate text-sm text-muted-text">{company}</span> : null}
        </span>
        <WinLossBadgeV4 outcome={outcome} size="sm" />
      </span>

      <span className="flex items-center justify-between gap-sm">
        <span className={cn('text-lg font-bold text-on-surface', TABULAR_CLASS)}>{money}</span>
        {stage ? (
          <span className="truncate text-xs font-semibold text-muted-text">{stage}</span>
        ) : null}
      </span>

      {showMeter ? (
        <span className="flex flex-col gap-xs">
          <span className="flex justify-between text-xs text-muted-text">
            <span>{probabilityLabel}</span>
            <span className={cn('font-semibold', TABULAR_CLASS)}>{`${pct}%`}</span>
          </span>
          {/*
            Spans, not divs: on an interactive card this whole subtree lives
            inside a real `<button>`, whose content model is phrasing only. The
            meter keeps its name either way — on a plain card it is the thing a
            reader lands on, and on an interactive one the card's own name
            carries the figure.
          */}
          <span
            role="progressbar"
            aria-label={meterName}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            className="block h-xs overflow-hidden rounded-[var(--xen-radius-full)] bg-selected"
          >
            <span className="block h-full bg-primary" style={{ width: `${pct}%` }} />
          </span>
        </span>
      ) : null}

      {!compact && (owner || closeDate) ? (
        <span className="flex items-center justify-between gap-sm">
          {owner ? (
            <span className="flex min-w-0 items-center gap-xs">
              {/* `sm` on both twins — native drew this one avatar at `xs`. */}
              <AvatarV4 size="sm" name={owner.name} src={owner.avatarUrl} alt="" />
              {owner.name ? (
                <span className="truncate text-xs text-muted-text">{owner.name}</span>
              ) : null}
            </span>
          ) : (
            <span />
          )}
          {closeDate ? <span className="text-xs text-muted-text">{closeDate}</span> : null}
        </span>
      ) : null}
    </>
  );

  return (
    <Card
      ref={ref}
      // Both reach `Card` on this twin now, so `compact` is a real density
      // rather than only a content cut.
      variant={highlighted ? 'elevated' : 'outlined'}
      padding={compact ? 'md' : undefined}
      // `highlighted` is a **ring**, not a wash. The base tinted the ground
      // with `bg-primary-50` — a ramp step that inverts on a dark page — and
      // then drew `on-surface` text on it, a pair nobody measured. The card
      // keeps its own ground and says "this one" with its border.
      className={cn('flex flex-col gap-sm', highlighted && 'border-primary', className)}
      {...rest}
    >
      {loading ? (
        <div role="status" aria-live="polite" aria-label={loadingLabel} className="flex flex-col gap-sm">
          <div className={cn('h-md w-[70%]', PLACEHOLDER_CLASS)} />
          <div className={cn('h-sm w-[40%]', PLACEHOLDER_CLASS)} />
        </div>
      ) : interactive ? (
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
          className="flex w-full flex-col gap-sm rounded-[var(--xen-radius-md)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {body}
        </button>
      ) : (
        <div className="flex w-full flex-col gap-sm">{body}</div>
      )}
    </Card>
  );
});
