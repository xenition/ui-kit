import * as React from 'react';
import { type MoneyFormatter } from './internal/format';
/** What kind of thing happened. **Identity**, so every one of them is neutral. */
export type ClaimTimelineKind = 'filed' | 'note' | 'document' | 'payment' | 'decision';
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
export interface ClaimTimelineV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
export declare const ClaimTimelineV4: React.ForwardRefExoticComponent<ClaimTimelineV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ClaimTimelineV4.d.ts.map