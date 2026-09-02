import * as React from 'react';
export interface JobListV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Heading above the list. Omitted renders no heading at all. */
    title?: string;
    /** The rows or cards — `JobCardV4`, `SavedJobRowV4`, `ApplicationRowV4`, … */
    children?: React.ReactNode;
    /** Draw placeholder cards instead of content. */
    loading?: boolean;
    /** How many placeholders a loading list draws. Default 3. */
    skeletonRows?: number;
    /** Render the list's count. Default `'12 jobs'` / `'1 job'`. */
    formatCount?: (count: number) => string;
    /** Headline when there is nothing to show. Default `'No jobs found'`. */
    emptyLabel?: string;
    /** The next-step sentence under {@link emptyLabel}. */
    emptyDescription?: string;
    /** Announced while the placeholders are up. Default `'Loading jobs'`. */
    loadingLabel?: string;
    /** Test hook, matching the rest of the V4 line. */
    testID?: string;
}
/**
 * **V4 job list** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * Every one of the twelve components in this module presupposes a list it sits
 * in, and the module never shipped one. `JobCard`, `SavedJobRow`,
 * `ApplicationRow` and `RecruiterMessage` are all rows in a list that does not
 * exist — so every screen built out of them had to invent its own answers to
 * the three questions a list always asks, and `JobFilterBar`'s `resultCount`
 * was the module's only acknowledgement that any of them had an answer:
 *
 * 1. **What does nothing look like?** A job search that matched nothing is the
 *    single most common state in a job board and the one worth designing. A
 *    real empty state with a headline and a next-step sentence — not a silent
 *    blank region below a filter bar the user has just over-narrowed.
 * 2. **What does loading look like?** Placeholder cards in the shape the cards
 *    are about to be, so the list does not collapse to a spinner and then jump
 *    to full height under the reader's cursor. The placeholders are an opaque
 *    mix against the card, never `bg-neutral-100` — which is what `JobCard`'s
 *    own skeleton used, and which mirrors into a near-white slab on a dark
 *    seed.
 * 3. **How many are there?** That count is the reason a job seeker looks at
 *    the screen at all. It names the list for a screen reader and is drawn
 *    beside the heading for everyone else — `aria-hidden` there, because the
 *    list below already carries it: one fact, announced once.
 *
 * The rows are `<li>`s inside a `<ul>`, so a reader is told how many there are
 * before deciding whether to walk them, and can skip the list wholesale. Rows
 * are passed as children rather than as data, because the four things that go
 * in this list take four different records — that is the same contract
 * `ApprovalQueueV4` uses in `hr`.
 */
export declare const JobListV4: React.ForwardRefExoticComponent<JobListV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=JobListV4.d.ts.map