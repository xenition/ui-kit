import * as React from 'react';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { cn } from '../primitives/cn';
import { PLACEHOLDER_CLASS, TABULAR_CLASS } from './internal/tone-v4';

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

/** An empty job list still owes the reader a next step. */
const EMPTY_DESCRIPTION = 'Try removing a filter or widening your search.';

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
export const JobListV4 = React.forwardRef<HTMLDivElement, JobListV4Props>(function JobListV4(
  {
    title,
    children,
    loading = false,
    skeletonRows = 3,
    formatCount,
    emptyLabel = 'No jobs found',
    emptyDescription = EMPTY_DESCRIPTION,
    loadingLabel = 'Loading jobs',
    testID,
    className,
    ...rest
  },
  ref
) {
  const rows = React.Children.toArray(children).filter(Boolean);
  const countText = (formatCount ?? ((n: number) => `${n} job${n === 1 ? '' : 's'}`))(rows.length);

  // Only claim a number once there is one: a count over placeholders is a
  // guess, and an empty list's own state already says there is nothing here.
  const showCount = !loading && rows.length > 0;
  const heading = title ? (
    <div className="flex items-baseline gap-xs">
      <h2 className="min-w-0 truncate text-sm font-bold text-on-surface">{title}</h2>
      {showCount ? (
        <span aria-hidden="true" className={cn('shrink-0 text-xs text-muted-text', TABULAR_CLASS)}>
          {countText}
        </span>
      ) : null}
    </div>
  ) : null;

  if (loading) {
    const placeholders = Math.max(1, Math.floor(skeletonRows));
    return (
      <div
        ref={ref}
        data-testid={testID}
        data-xen-v4-job-list="loading"
        role="status"
        aria-live="polite"
        aria-label={loadingLabel}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {heading}
        {/* The shape the cards are about to be, not a dot in the middle. */}
        {Array.from({ length: placeholders }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md"
          >
            <div className="flex items-center gap-sm">
              <div
                style={{ borderRadius: 'var(--xen-radius-md)' }}
                className={cn('h-xl w-xl shrink-0', PLACEHOLDER_CLASS)}
              />
              <div className="flex min-w-0 flex-1 flex-col gap-xs">
                <div className={cn('h-md w-[55%]', PLACEHOLDER_CLASS)} />
                <div className={cn('h-sm w-[35%]', PLACEHOLDER_CLASS)} />
              </div>
            </div>
            <div className={cn('h-sm w-[45%]', PLACEHOLDER_CLASS)} />
          </div>
        ))}
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div
        ref={ref}
        data-testid={testID}
        data-xen-v4-job-list="empty"
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {heading}
        <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-testid={testID}
      data-xen-v4-job-list=""
      className={cn('flex flex-col gap-sm', className)}
      {...rest}
    >
      {heading}
      <ul aria-label={countText} className="flex flex-col gap-sm">
        {rows.map((row, index) => (
          <li key={index}>{row}</li>
        ))}
      </ul>
    </div>
  );
});
