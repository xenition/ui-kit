import * as React from 'react';
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
export declare const ApprovalQueueV4: React.ForwardRefExoticComponent<ApprovalQueueV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ApprovalQueueV4.d.ts.map