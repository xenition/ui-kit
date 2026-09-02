import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { cn } from '../primitives/cn';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { Salary } from './types';
import { formatShortDate } from './format';
import { SalaryRangeV4 } from './SalaryRangeV4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  salaryLabelV4,
  spokenLine,
  type ToneV4,
} from './internal/tone-v4';

/** Where an offer stands. `ApplicationStage` ends at `hired` and says nothing about this. */
export type OfferStatus = 'pending' | 'accepted' | 'declined' | 'expired';

/** An offer of employment. Declared identically in the native twin. */
export interface OfferV4 {
  id: string;
  jobTitle: string;
  companyName: string;
  companyLogoUrl?: string;
  /** What is being offered. */
  salary?: Salary;
  /** When the role starts (ISO-8601). */
  startsAt?: string;
  /** When the offer lapses (ISO-8601). */
  respondBy?: string;
  /** Default `'pending'`. */
  status?: OfferStatus;
}

export interface OfferCardV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The offer to render. */
  offer: OfferV4;
  /** Fired when the card body is pressed (open the full offer). `onPress` → `onClick`. */
  onClick?: (offer: OfferV4) => void;
  /** Fired when the offer is accepted. */
  onAccept?: (offer: OfferV4) => void;
  /** Fired when the offer is declined. */
  onDecline?: (offer: OfferV4) => void;
  /** Copy on the accept action. Default `'Accept offer'`. */
  acceptLabel?: string;
  /** Copy on the decline action. Default `'Decline'`. */
  declineLabel?: string;
  /** Caption on the start date. Default `'Starts'`. */
  startLabel?: string;
  /** Caption on the response deadline. Default `'Respond by'`. */
  deadlineLabel?: string;
  /** Re-word the statuses. Defaults Pending / Accepted / Declined / Expired. */
  statusLabels?: Partial<Record<OfferStatus, string>>;
  /** Render a date. Default a localized short date, e.g. `'Jun 15'`. */
  formatDate?: (iso: string) => string;
  /** Render one salary bound. Default the module's compact money formatter. */
  formatMoney?: (amount: number, currency?: string) => string;
  /** Cadence suffixes. Default `/yr`, `/hr`, `/mo`. */
  periodLabels?: { year?: string; hour?: string; month?: string };
}

/** Status → [word, tone]. All four are genuine statuses and keep status colour. */
const STATUS: Record<OfferStatus, [string, ToneV4]> = {
  pending: ['Pending', 'primary'],
  accepted: ['Accepted', 'success'],
  declined: ['Declined', 'danger'],
  expired: ['Expired', 'danger'],
};

/**
 * **V4 offer card** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `ApplicationStage` ends at `'offer' | 'hired'` and nothing in the module
 * renders what sits between them. There are twelve components here for
 * finding, filtering, applying and tracking, and **none at all for the screen
 * that decides the outcome** — the pay, the start date, the deadline, and the
 * two buttons that end it either way. An app building a job-seeker product on
 * this kit reached the last step of its own funnel and had to leave.
 *
 * Four things it does that the rest of the module was not doing:
 *
 * 1. **The deadline is words, not an implication.** `respondBy` is captioned
 *    and folded into the card's accessible name, and while the offer is still
 *    pending it is drawn in `warn-text` — a genuine warning, because the offer
 *    lapses, not a category wearing a status colour.
 * 2. **Accept and Decline are siblings of the card's activation**, never
 *    inside it. That is the defect found in six components in this module and
 *    four more elsewhere in the kit: a `<button>` inside a `role="button"` is
 *    invalid ARIA, and its keyboard activation is cancelled by the ancestor's
 *    own Enter handler. A decision has to be reachable.
 * 3. **The card is one accessible name**, so the role, the employer, the pay,
 *    both dates and the status arrive as a sentence rather than as six stops —
 *    the failure that made every existing row in this module unusable with a
 *    screen reader.
 * 4. **The band is validated.** Pay goes through the same {@link SalaryRangeV4}
 *    as the rest of the module, so an offer whose bounds run backwards says so
 *    rather than printing "$120K – $90K/yr".
 */
export const OfferCardV4 = React.forwardRef<HTMLDivElement, OfferCardV4Props>(function OfferCardV4(
  {
    offer,
    onClick,
    onAccept,
    onDecline,
    acceptLabel = 'Accept offer',
    declineLabel = 'Decline',
    startLabel = 'Starts',
    deadlineLabel = 'Respond by',
    statusLabels,
    formatDate,
    formatMoney,
    periodLabels,
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  // An offer with no role and no employer is not an offer; a frame around
  // nothing is worse than nothing.
  if (!offer.jobTitle && !offer.companyName) return null;

  const status: OfferStatus = offer.status ?? 'pending';
  const meta = STATUS[status];
  const statusWord = statusLabels?.[status] ?? meta[0];

  const date = (iso?: string): string | undefined => {
    if (!iso) return undefined;
    return (formatDate ? formatDate(iso) : formatShortDate(iso)) || undefined;
  };
  const start = date(offer.startsAt);
  const deadline = date(offer.respondBy);
  const pay = salaryLabelV4(offer.salary, { formatMoney, periodLabels }).text;

  const name = spokenLine([
    offer.jobTitle,
    offer.companyName,
    pay,
    start ? `${startLabel} ${start}` : undefined,
    deadline ? `${deadlineLabel} ${deadline}` : undefined,
    statusWord,
  ]);

  const summary = (
    <>
      <AvatarV4 src={offer.companyLogoUrl} name={offer.companyName} size="md" alt="" />
      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span className="line-clamp-2 text-base font-bold text-on-card">{offer.jobTitle}</span>
        <span className="truncate text-sm text-muted-text">{offer.companyName}</span>
      </span>
    </>
  );

  const decidable = status === 'pending' && (onAccept != null || onDecline != null);

  return (
    <div
      ref={ref}
      data-xen-v4-offer-card=""
      className={cn(
        'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border',
        'bg-card p-lg text-on-card',
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-md">
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            onClick={() => onClick(offer)}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex min-w-0 flex-1 items-start gap-md rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {summary}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-start gap-md">{summary}</div>
        )}
        {/*
          Beside the activation, not inside it: a badge inside `role="button"`
          is flattened to presentational and its word is dropped.
        */}
        <BadgeV4 tone={meta[1]} className="shrink-0" aria-hidden={onClick != null || undefined}>
          {statusWord}
        </BadgeV4>
      </div>

      {offer.salary ? (
        <SalaryRangeV4
          salary={offer.salary}
          size="md"
          formatMoney={formatMoney}
          periodLabels={periodLabels}
          aria-hidden={onClick != null || undefined}
        />
      ) : null}

      {start || deadline ? (
        <div
          aria-hidden={onClick != null || undefined}
          className="flex flex-wrap items-center gap-md text-sm"
        >
          {start ? (
            <span className="text-on-card">
              <span className="text-muted-text">{`${startLabel} `}</span>
              <span className="font-semibold">{start}</span>
            </span>
          ) : null}
          {/*
            The only date on this card a user can miss. `warn` is a genuine
            warning — the offer lapses — and it is spent only while the offer
            is still open, because a deadline that has already been answered
            is history, not a risk.
          */}
          {deadline ? (
            <span className={status === 'pending' ? 'text-warn-text' : 'text-on-card'}>
              <span className="text-muted-text">{`${deadlineLabel} `}</span>
              <span className="font-semibold">{deadline}</span>
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Siblings of the card's activation. A decision has to be reachable. */}
      {decidable ? (
        <div className="flex flex-wrap gap-xs">
          {onAccept ? (
            <ButtonV4
              size="md"
              variant="primary"
              onClick={() => onAccept(offer)}
              className={cn('flex-1', MIN_TAP_CLASS)}
            >
              {acceptLabel}
            </ButtonV4>
          ) : null}
          {onDecline ? (
            <ButtonV4
              size="md"
              variant="outline"
              tone="danger"
              onClick={() => onDecline(offer)}
              className={cn('flex-1', MIN_TAP_CLASS)}
            >
              {declineLabel}
            </ButtonV4>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
