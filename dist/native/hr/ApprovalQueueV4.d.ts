import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ApprovalQueueV4Props {
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
    /** Fires with {@link ApprovalQueueV4Props.selectedIds} when the bulk approve is pressed. */
    onApproveSelected?: (ids: string[]) => void;
    /** Fires with {@link ApprovalQueueV4Props.selectedIds} when the bulk reject is pressed. */
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
    /**
     * Render the queue's own count, drawn beside
     * {@link ApprovalQueueV4Props.title} and used as the list's name.
     */
    formatCount?: (count: number) => string;
    /** Headline when there is nothing waiting. Default `'Nothing to approve'`. */
    emptyLabel?: string;
    /** The next-step sentence under {@link ApprovalQueueV4Props.emptyLabel}. */
    emptyDescription?: string;
    /** Announced while the placeholders are up. Default `'Loading approvals'`. */
    loadingLabel?: string;
    /** Test hook, matching the rest of the module. */
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 approval queue** — a new component. There is no base to extend, so the
 * props are plain `ApprovalQueueV4Props`.
 *
 * ## Why it exists
 *
 * `LeaveRequest`, `ExpenseClaim` and `TimesheetRow` are all written as one item
 * out of a list, and the module never had the list. So the three things a queue
 * owes its user had nowhere to live:
 *
 * 1. **An empty state that says something.** `ShiftSchedule` is the only
 *    component in the entire module with one. A manager who has cleared their
 *    queue currently sees a blank region, which is indistinguishable from a
 *    request that failed to load.
 * 2. **A loading state in the shape it is about to be.** Placeholder rows the
 *    size of the decision cards, opaque and mixed against the card's own ground
 *    — never a centred spinner that collapses the layout and then jumps when
 *    the real rows arrive.
 * 3. **A bulk bar.** Approving twenty timesheets one card at a time is the
 *    reason people stop using an approvals screen. The bar is a **sibling** of
 *    the rows, not a header inside a pressable list, so its buttons are real
 *    focus stops with their own names — which is the whole finding this
 *    module's pass was about.
 * 4. **The count, drawn.** How many decisions are waiting is the reason a
 *    manager opens this screen, and `formatCount` used to reach the list's
 *    accessible name only — so a sighted user had to count the cards. It now
 *    sits beside the heading too, hidden from the reader there because the
 *    list below already carries it: one fact, announced once.
 *
 * ## The selection is ids, not a count
 *
 * `selectedIds` carries the actual rows and the two bulk handlers are called
 * back with them, so a caller never has to keep a count and a list of ids in
 * step — and the queue can name what it is about to act on. A count alone made
 * `onApproveSelected` a callback with no argument, which meant the screen above
 * it had to re-derive the selection it had already computed.
 *
 * The bar appears only once something is ticked. Nothing is drawn disabled
 * waiting for a selection: an always-present bar with two dead buttons spends
 * M3's 0.38 band on a control that is not unavailable, only unneeded yet.
 *
 * `rejectLabel`'s button is `variant="outline" tone="danger"` on both twins,
 * matching the per-card decision buttons — a bulk rejection should not be the
 * heaviest thing on the screen.
 */
export declare function ApprovalQueueV4({ title, children, selectedIds, loading, skeletonRows, onApproveSelected, onRejectSelected, onClearSelection, approveLabel, rejectLabel, clearLabel, formatSelected, formatCount, emptyLabel, emptyDescription, loadingLabel, testID, style, }: ApprovalQueueV4Props): React.ReactElement;
//# sourceMappingURL=ApprovalQueueV4.d.ts.map