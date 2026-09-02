import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { pluralizeCount } from './workforce-v4';
import {
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  PLACEHOLDER_CLASS,
  TABULAR_CLASS,
} from './internal/tone-v4';

export interface ApprovalQueueV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Heading above the queue. Default `'Awaiting your decision'`. */
  title?: string;
  /** The rows — `LeaveRequestV4`, `ExpenseClaimV4`, `TimesheetRowV4`, … */
  children?: React.ReactNode;
  /** Ids of the rows currently ticked. Non-empty raises the bulk bar. */
  selectedIds?: string[];
  /** Draw placeholder rows instead of content. */
  loading?: boolean;
  /** How many placeholder rows a loading queue draws. Default 3. */
  skeletonRows?: number;
  /** Fires with {@link selectedIds} when the bulk approve is pressed. */
  onApproveSelected?: (ids: string[]) => void;
  /** Fires with {@link selectedIds} when the bulk reject is pressed. */
  onRejectSelected?: (ids: string[]) => void;
  /** Fires when the selection is cleared. */
  onClearSelection?: () => void;
  /** Copy on the bulk approve. Default `'Approve'`. */
  approveLabel?: string;
  /** Copy on the bulk reject. Default `'Reject'`. */
  rejectLabel?: string;
  /** Copy on the clear-selection action. Default `'Clear'`. */
  clearLabel?: string;
  /** Render the selection count. Default `'3 selected'`. */
  formatSelected?: (count: number) => string;
  /** Render the queue's own count, drawn beside {@link title} and used as the list's name. */
  formatCount?: (count: number) => string;
  /** Headline when there is nothing waiting. Default `'Nothing to approve'`. */
  emptyLabel?: string;
  /** The next-step sentence under {@link emptyLabel}. */
  emptyDescription?: string;
  /** Announced while the placeholders are up. Default `'Loading approvals'`. */
  loadingLabel?: string;
  /** Test hook, matching the rest of the module. */
  testID?: string;
}

/** The empty state's next-step sentence — an empty queue still owes one. */
const EMPTY_DESCRIPTION = 'Requests that need your decision will appear here.';

/**
 * **V4 approval queue** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `LeaveRequest`, `ExpenseClaim` and `TimesheetRow` all presuppose a list they
 * sit in, and the module never shipped one. `ShiftSchedule` is the only list
 * in `hr` and the only file with an empty state at all, so every screen built
 * out of the other twelve had to invent its own answers to the three questions
 * a queue always asks:
 *
 * 1. **What does nothing look like?** A manager with a clear queue is the
 *    common case and the one worth designing: a real empty state with a title
 *    and a next-step sentence, not a silent blank region.
 * 2. **What does *loading* look like?** Placeholder rows in the shape the rows
 *    are about to be, so the queue does not collapse to a spinner and then
 *    jump to full height under the manager's cursor.
 * 3. **What happens with twenty of them?** Deciding twenty expense claims one
 *    card at a time is the workflow this module exists for and the one it
 *    never addressed. The bulk bar is a `role="region"` with its own name,
 *    announced politely when a selection appears — it is a summary of what the
 *    user just did, not an emergency, and `assertive` on every tick teaches a
 *    user to ignore the live region entirely.
 * 4. **How many are waiting?** That count is the reason a manager opens this
 *    screen, and `formatCount` used to feed the list's accessible name only —
 *    so a sighted user had to count the cards. It is now drawn beside the
 *    heading as well, `aria-hidden` there because the list below already
 *    carries it: one fact, announced once.
 *
 * The bar's two buttons are siblings of the rows, never wrappers around them,
 * for the same reason every card in this module was restructured: an
 * interactive control inside another one is invalid ARIA and loses its own
 * keyboard activation to the ancestor's handler.
 */
export const ApprovalQueueV4 = React.forwardRef<HTMLDivElement, ApprovalQueueV4Props>(
  function ApprovalQueueV4(
    {
      title = 'Awaiting your decision',
      children,
      selectedIds,
      loading = false,
      skeletonRows = 3,
      onApproveSelected,
      onRejectSelected,
      onClearSelection,
      approveLabel = 'Approve',
      rejectLabel = 'Reject',
      clearLabel = 'Clear',
      formatSelected,
      formatCount,
      emptyLabel = 'Nothing to approve',
      emptyDescription = EMPTY_DESCRIPTION,
      loadingLabel = 'Loading approvals',
      testID,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const rows = React.Children.toArray(children).filter(Boolean);
    const selected = selectedIds ?? [];
    const selectedText = (formatSelected ?? ((n: number) => `${n} selected`))(selected.length);
    const countText = (formatCount ?? ((n: number) => pluralizeCount(n, 'request')))(rows.length);

    // Only claim a number once there is one: a count over skeletons is a guess,
    // and an empty queue's own state already says there is nothing waiting.
    const showCount = !loading && rows.length > 0;
    const heading = title ? (
      <div className="flex items-baseline gap-xs">
        <h2 className="min-w-0 truncate text-sm font-bold text-on-surface">{title}</h2>
        {/*
          Drawn for the sighted manager; hidden from the reader because the list
          below carries the same count as its accessible name.
        */}
        {showCount ? (
          <span
            aria-hidden="true"
            className={cn('shrink-0 text-xs text-muted-text', TABULAR_CLASS)}
          >
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
          role="status"
          aria-live="polite"
          aria-label={loadingLabel}
          className={cn('flex flex-col gap-sm', className)}
          {...rest}
        >
          {heading}
          {/* The shape the rows are about to be, not a dot in the middle. */}
          {Array.from({ length: placeholders }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border bg-card p-md"
            >
              <div className="flex items-center gap-sm">
                <div
                  style={{ borderRadius: 'var(--xen-radius-full)' }}
                  className={cn('h-xl w-xl shrink-0', PLACEHOLDER_CLASS)}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-xs">
                  <div className={cn('h-md w-[45%]', PLACEHOLDER_CLASS)} />
                  <div className={cn('h-sm w-[65%]', PLACEHOLDER_CLASS)} />
                </div>
                <div className={cn('h-md w-xl shrink-0', PLACEHOLDER_CLASS)} />
              </div>
              <div className="flex gap-xs">
                <div className={cn('h-xl flex-1', PLACEHOLDER_CLASS)} />
                <div className={cn('h-xl flex-1', PLACEHOLDER_CLASS)} />
              </div>
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
          className={cn('flex flex-col gap-sm', className)}
          {...rest}
        >
          {heading}
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </div>
      );
    }

    const hasBulk = selected.length > 0 && (onApproveSelected != null || onRejectSelected != null);

    return (
      <div
        ref={ref}
        data-testid={testID}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {heading}

        {hasBulk ? (
          <div
            role="region"
            aria-label={selectedText}
            aria-live="polite"
            className={cn(
              'flex flex-wrap items-center gap-xs rounded-[var(--xen-radius-md)]',
              'bg-selected px-md py-sm text-on-selected'
            )}
          >
            <span className={cn('flex-1 text-xs font-semibold', TABULAR_CLASS)}>{selectedText}</span>
            {onApproveSelected ? (
              <ButtonV4
                size="sm"
                variant="primary"
                className={cn(MIN_TAP_CLASS, FOCUS_RING_CLASS)}
                onClick={() => onApproveSelected(selected)}
              >
                {approveLabel}
              </ButtonV4>
            ) : null}
            {onRejectSelected ? (
              <ButtonV4
                size="sm"
                variant="outline"
                tone="danger"
                className={cn(MIN_TAP_CLASS, FOCUS_RING_CLASS)}
                onClick={() => onRejectSelected(selected)}
              >
                {rejectLabel}
              </ButtonV4>
            ) : null}
            {onClearSelection ? (
              <ButtonV4
                size="sm"
                variant="ghost"
                className={cn(MIN_TAP_CLASS, FOCUS_RING_CLASS)}
                onClick={onClearSelection}
              >
                {clearLabel}
              </ButtonV4>
            ) : null}
          </div>
        ) : null}

        <ul aria-label={countText} className="flex flex-col gap-sm">
          {rows.map((row, index) => (
            <li key={index}>{row}</li>
          ))}
        </ul>
      </div>
    );
  }
);
