import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { BenefitCardProps, BenefitStatus, BenefitType } from './BenefitCard';
import { formatMoney } from './internal/format';
import {
  BADGE_V4,
  CARD_V4,
  IDENTITY_TONE,
  isAdverse,
  labelledId,
  spokenLine,
  tintGround,
  tintInkClass,
  type ToneV4,
} from './internal/civic-v4';

export interface BenefitCardV4Props extends BenefitCardProps {
  /** Why the case was denied or suspended. Rendered and announced when adverse. */
  reason?: string;
  /** Override the seven programme words — `'Food assistance'`, `'Housing'`, … */
  typeLabels?: Partial<Record<BenefitType, string>>;
  /** Override the six status words — `'Active'`, `'Suspended'`, … */
  statusLabels?: Partial<Record<BenefitStatus, string>>;
  /** What the next payment date is called. Default `'Next'`. */
  nextLabel?: string;
}

const TYPE_V4: Record<BenefitType, { label: string; glyph: string }> = {
  food: { label: 'Food assistance', glyph: '🥫' },
  unemployment: { label: 'Unemployment', glyph: '💼' },
  housing: { label: 'Housing', glyph: '🏘️' },
  medical: { label: 'Medical', glyph: '⚕️' },
  disability: { label: 'Disability', glyph: '♿' },
  family: { label: 'Family support', glyph: '👪' },
  other: { label: 'Benefit', glyph: '🤝' },
};

const STATUS_V4: Record<BenefitStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
  expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
  suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};

/**
 * **V4 benefit card** — the web twin of the native `BenefitCardV4`, same props
 * as {@link BenefitCard} plus `reason`, `typeLabels`, `statusLabels` and
 * `nextLabel`.
 *
 * ## Five changes
 *
 * 1. **A suspension says why, and announces.** The status that stops someone's
 *    food assistance was a pill and nothing else — the interface had no field
 *    for the reason at all. `reason` renders under the header whenever
 *    {@link isAdverse} is true, and reaches a polite live region one commit
 *    after mount, because a live region announces *changes* and text present at
 *    first paint is read by nobody.
 * 2. **The card's name carries the money and the dates.** The fixed
 *    `` `${name}, ${type}, ${status}` `` template dropped the amount, the
 *    cadence, the next payment date and the case number — everything a
 *    claimant opens the card for — and `role="button"` made the subtree
 *    presentational, so none of it was reachable another way.
 * 3. **The case number is labelled and on its own line**, instead of glued to
 *    the programme type with a bare `·` so a reader hears "Housing dot
 *    SNP-4471".
 * 4. **The amount is ink, not a fill.** `text-primary` is the *fill* slot with
 *    no contrast promise as words; the headline figure takes `primary-text`.
 *    The programme disc likewise stops being `bg-primary-50` — a ramp step that
 *    mirrors under `[data-theme="dark"]` — and takes the neutral identity tint,
 *    because a benefit type is identity and has no status to report.
 * 5. **An interactive card is a real `<button>` that clears 44 and answers with
 *    a state layer**, not a `div` with `role="button"`, a hand-written
 *    Enter/Space handler, `hover:opacity-90` (M3's *disabled* signal) and a
 *    `primary-300` focus ring off the neutral ramp.
 */
export const BenefitCardV4 = React.forwardRef<HTMLDivElement, BenefitCardV4Props>(
  function BenefitCardV4(
    {
      name,
      benefitType,
      status = 'active',
      amountCents,
      cadence = '/mo',
      caseNumber,
      nextDate,
      currency = 'USD',
      formatMoney: format = formatMoney,
      onClick,
      reason,
      typeLabels,
      statusLabels,
      nextLabel = 'Next',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!name) return null;

    const bt = TYPE_V4[benefitType] ?? TYPE_V4.other;
    const typeWord = typeLabels?.[benefitType] ?? bt.label;
    const sd = STATUS_V4[status] ?? STATUS_V4.active;
    const word = statusLabels?.[status] ?? sd.label;
    const reference = labelledId('Case', caseNumber);
    const adverse = isAdverse(status);
    const why = adverse ? reason : undefined;

    const amount =
      amountCents != null
        ? `${format(Math.max(0, Math.trunc(amountCents)), currency)}${cadence}`
        : undefined;
    const next = nextDate != null ? `${nextLabel}: ${nextDate}` : undefined;

    const announcement = spokenLine([name, word, why]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
      setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);

    const header = (
      <>
        <span
          aria-hidden
          className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
          style={{ background: tintGround(IDENTITY_TONE) }}
        >
          <IconV4 glyph={bt.glyph} size="xl" className={tintInkClass(IDENTITY_TONE)} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="truncate text-lg font-bold text-on-surface">{name}</span>
          <span className="truncate text-sm text-muted-text">{typeWord}</span>
          {reference != null ? (
            <span className="truncate text-xs text-muted-text">{reference}</span>
          ) : null}
        </span>
        <BadgeV4 tone={sd.tone} {...BADGE_V4}>
          {`${sd.glyph} ${word}`}
        </BadgeV4>
      </>
    );

    const headerClass = 'flex w-full items-center gap-md text-left';

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={cn('flex flex-col', className)} {...rest}>
        <span role="status" aria-live="polite" className="sr-only">
          {announced}
        </span>

        {onClick != null ? (
          <button
            type="button"
            onClick={onClick}
            aria-label={spokenLine([name, typeWord, word, reference, amount, next, why])}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
            className={cn(
              headerClass,
              MIN_TAP_CLASS,
              'rounded-[var(--xen-radius-md)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {header}
          </button>
        ) : (
          <div className={headerClass}>{header}</div>
        )}

        {why != null ? (
          <p className={cn('mt-sm text-sm font-medium', tintInkClass(sd.tone))}>{why}</p>
        ) : null}

        {amountCents != null || nextDate != null ? (
          <div className="mt-md flex items-end justify-between border-t border-border pt-md">
            {amountCents != null ? (
              <span className="flex items-baseline gap-xs">
                <span className="text-xl font-bold text-primary-text">
                  {format(Math.max(0, Math.trunc(amountCents)), currency)}
                </span>
                <span className="text-xs text-muted-text">{cadence}</span>
              </span>
            ) : (
              <span />
            )}
            {next != null ? <span className="text-xs text-muted-text">{next}</span> : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
