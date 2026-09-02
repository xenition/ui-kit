import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { formatMoney as defaultFormatMoney, type MoneyFormatter } from './internal/format';
import { isAdverse } from './coverage-v4';
import {
  metaLine,
  moneyParts,
  SKELETON_CLASS,
  spokenLine,
  TABULAR_CLASS,
  toneGroundStyle,
  toneInkClass,
  type ToneV4,
} from './internal/tone-v4';

/** What kind of thing happened. **Identity**, so every one of them is neutral. */
export type ClaimTimelineKind = 'filed' | 'note' | 'document' | 'payment' | 'decision';

const KIND_META: Record<ClaimTimelineKind, { label: string; glyph: string }> = {
  filed: { label: 'Filed', glyph: '📄' },
  note: { label: 'Adjuster note', glyph: '📝' },
  document: { label: 'Document request', glyph: '📎' },
  payment: { label: 'Payment', glyph: '💰' },
  decision: { label: 'Decision', glyph: '⚖️' },
};

/** One dated thing that happened to a claim. */
export interface ClaimTimelineEntry {
  /** Stable key. Falls back to the entry's position when omitted. */
  id?: string;
  /** When, already formatted by the caller. Required — an undated entry is a rumour. */
  date: string;
  /** What happened, in the carrier's words. */
  title: string;
  /** The body — an adjuster's note, the reason for a decision, what is needed. */
  detail?: string;
  /** What kind of entry this is. Default `'note'`. */
  kind?: ClaimTimelineKind;
  /** Money that moved, in integer **cents**. Negative is a recovery. */
  amountCents?: number;
  /** Who did it — the adjuster, the agent, the claimant. */
  actor?: string;
  /** A claim state this entry records — `'denied'`, `'approved'`, `'paid'`. */
  outcome?: string;
}

/** How many placeholder entries a loading timeline draws by default. */
const SKELETON_ROWS = 3;

// `title` is omitted deliberately: this component's `title` is the timeline's
// heading and accessible name, not the DOM tooltip attribute of the same name.
// Leaving both in scope compiles — the types match — but a caller passing
// `title` for a tooltip would silently get the heading instead. The V4 line
// already resolves this the same way in `ApprovalQueueV4`, `LeaveBalanceV4`,
// `PageContainerV4` and the chart cards.
export interface ClaimTimelineV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The activity, newest first — the order is the caller's. */
  items: ClaimTimelineEntry[];
  /** The list's own name. Default `'Claim activity'`. */
  title?: string;
  /** ISO 4217 currency code. Default `'USD'`. */
  currency?: string;
  /** The skeleton's accessible name. Default `'Loading claim activity'`. */
  loadingLabel?: string;
  /** Title when there is no activity. Default `'No claim activity yet'`. */
  emptyLabel?: string;
  /** The next-step sentence under {@link emptyLabel}. */
  emptyDescription?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Draw placeholder entries instead of data. */
  loading?: boolean;
  /** How many placeholders `loading` draws. Default `3`. */
  skeletonRows?: number;
  /** Rename any kind. */
  kindLabels?: Partial<Record<ClaimTimelineKind, string>>;
  /** Test hook, matching the native twin's. */
  testID?: string;
}

/**
 * **V4 claim timeline** — dated claim activity: filings, adjuster notes,
 * document requests, payments and decisions. New in V4; there is no base. The
 * web twin of the native `ClaimTimelineV4`, whose prop shape is canonical.
 *
 * ## Why it exists, and the four things it does that the module did not
 *
 * `ClaimStatusTracker` is the whole of what this module could say about a
 * claim in progress: four fixed stages and one `updated` string. So the answer
 * to "why is this taking three weeks" was a numeral in a circle, and the
 * answer to "why was it denied" was a sentence the component **made up** —
 * *"Reviewed after filing. Contact your agent to appeal."* — because there was
 * nowhere for a real reason to live. This is that place.
 *
 * 1. **A reason belongs to the event that produced it.** A denial is a dated
 *    decision with a body and an author, not a status flag; a payment is a
 *    dated amount; a document request is a dated ask. All three are the same
 *    shape and the tracker had room for none of them. `date` is required for
 *    the same reason the reason is: an undated claim event tells the claimant
 *    nothing about whether anyone is still working on it.
 * 2. **Every entry is one accessible name.** The rest of the module names a
 *    row and then renders the money inside it, so ARIA drops the money. Here
 *    the kind, the date, the actor, the title, the amount and the body are
 *    folded into one name, joined with commas.
 * 3. **The kind is a glyph, not a colour.** A note, a payment and a filing are
 *    categories; spending `success` on a payment would say a payment is good
 *    news, which — on a claim that settled for a third of the estimate — it is
 *    not. Only an adverse `outcome` takes a status colour, and it takes it
 *    because it is a status.
 * 4. **Empty and loading are real.** An empty timeline says so and says what
 *    happens next; loading draws the entries it is about to show rather than a
 *    spinner that collapses the page and then jumps.
 */
export const ClaimTimelineV4 = React.forwardRef<HTMLDivElement, ClaimTimelineV4Props>(
  function ClaimTimelineV4(
    {
      items,
      title = 'Claim activity',
      currency = 'USD',
      loadingLabel = 'Loading claim activity',
      emptyLabel = 'No claim activity yet',
      emptyDescription,
      formatMoney: format = defaultFormatMoney,
      loading = false,
      skeletonRows = SKELETON_ROWS,
      kindLabels,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    // An entry with no date or no title is not an event, and rendering the
    // half of it that survived is how a timeline starts asserting things.
    const list = (Array.isArray(items) ? items : []).filter(
      (entry) => entry?.date != null && entry?.title != null
    );

    if (loading) {
      const rows = Math.max(1, Math.floor(Number.isFinite(skeletonRows) ? skeletonRows : 1));
      return (
        <div
          ref={ref}
          data-testid={testID}
          role="status"
          aria-live="polite"
          aria-label={loadingLabel}
          className={cn('flex flex-col gap-md', className)}
          {...rest}
        >
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="flex items-start gap-md">
              <span className={cn(SKELETON_CLASS, 'h-xl w-xl shrink-0 rounded-full')} />
              <div className="flex min-w-0 flex-1 flex-col gap-xs">
                <span className={cn(SKELETON_CLASS, 'h-3 w-1/4')} />
                <span className={cn(SKELETON_CLASS, 'h-4 w-2/3')} />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (list.length === 0) {
      return (
        <div ref={ref} data-testid={testID} className={className} {...rest}>
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </div>
      );
    }

    return (
      <div ref={ref} data-testid={testID} className={className} {...rest}>
        <ol aria-label={title} className="flex flex-col gap-md">
          {list.map((entry, index) => {
            const kind = entry.kind ?? 'note';
            const meta = KIND_META[kind] ?? KIND_META.note;
            const kindLabel = kindLabels?.[kind] ?? meta.label;
            const adverse = entry.outcome != null && isAdverse(entry.outcome);
            const tone: ToneV4 = adverse ? 'danger' : 'neutral';
            const amount = moneyParts(entry.amountCents, currency, format);

            return (
              // One name for the whole entry: ARIA drops the children of a
              // named element, and the children here are the entry.
              <li
                key={entry.id ?? `${entry.date}-${index}`}
                aria-label={spokenLine([
                  kindLabel,
                  entry.date,
                  entry.title,
                  entry.actor,
                  entry.outcome,
                  amount?.text,
                  entry.detail,
                ])}
                className="flex items-start gap-md"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] text-sm',
                    toneInkClass(tone)
                  )}
                  style={toneGroundStyle(tone)}
                >
                  {meta.glyph}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-xs">
                  <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>
                    {metaLine([entry.date, kindLabel, entry.actor])}
                  </span>
                  <span className="text-sm font-semibold text-on-card">{entry.title}</span>
                  {entry.detail != null && entry.detail !== '' ? (
                    <span
                      className={cn('text-xs', adverse ? 'text-danger-text' : 'text-muted-text')}
                    >
                      {entry.detail}
                    </span>
                  ) : null}
                </span>
                {amount ? (
                  <span className={cn('shrink-0 text-sm font-bold text-on-card', TABULAR_CLASS)}>
                    {amount.text}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
);
