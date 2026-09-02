import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pluralizeCount } from '../../hr/workforce-v4';
import { skeletonFill } from './internal/tone-v4';

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

/** The empty state's next-step sentence — an empty queue still owes one. */
const EMPTY_DESCRIPTION = 'Requests that need your decision will appear here.';

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
export function ApprovalQueueV4({
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
  style,
}: ApprovalQueueV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const tap = minTap(tokens.spacing);
  const rows = React.Children.toArray(children).filter(Boolean);
  const selected = selectedIds ?? [];
  const selectedText = (formatSelected ?? ((n: number) => `${n} selected`))(selected.length);
  const countText = (formatCount ?? ((n: number) => pluralizeCount(n, 'request')))(rows.length);

  // Only claim a number once there is one: a count over skeletons is a guess,
  // and an empty queue's own state already says there is nothing waiting.
  const showCount = !loading && rows.length > 0;

  const header = title ? (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
      <View accessible accessibilityRole="header" style={{ flexShrink: 1 }}>
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
          {title}
        </TextV4>
      </View>
      {/*
        Drawn for the sighted manager; hidden from the reader because the list
        below carries the same count as its accessible name.
      */}
      {showCount ? (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {countText}
          </TextV4>
        </View>
      ) : null}
    </View>
  ) : null;

  if (loading) {
    const placeholders = Math.max(1, Math.floor(Number.isFinite(skeletonRows) ? skeletonRows : 3));
    return (
      <View testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
        {header}
        <View
          accessible
          accessibilityLabel={loadingLabel}
          accessibilityLiveRegion="polite"
          style={{ gap: tokens.spacing.sm }}
        >
          {Array.from({ length: placeholders }, (_, i) => (
            <View
              key={i}
              style={{
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                <View
                  style={{
                    width: tap,
                    height: tap,
                    borderRadius: tokens.radius.full,
                    backgroundColor: skeletonFill(theme),
                  }}
                />
                <View style={{ flex: 1, gap: tokens.spacing.xs }}>
                  <View
                    style={{
                      height: tokens.typography.scale.base,
                      width: '55%',
                      borderRadius: tokens.radius.sm,
                      backgroundColor: skeletonFill(theme),
                    }}
                  />
                  <View
                    style={{
                      height: tokens.typography.scale.sm,
                      width: '35%',
                      borderRadius: tokens.radius.sm,
                      backgroundColor: skeletonFill(theme),
                    }}
                  />
                </View>
              </View>
              {/* The decision row the card is about to grow — so the layout
                  does not jump when the real buttons arrive. */}
              <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
                <View
                  style={{
                    flex: 1,
                    height: tap,
                    borderRadius: tokens.radius.md,
                    backgroundColor: skeletonFill(theme),
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    height: tap,
                    borderRadius: tokens.radius.md,
                    backgroundColor: skeletonFill(theme),
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
        {header}
        <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  const hasBulk = selected.length > 0 && (onApproveSelected != null || onRejectSelected != null);

  return (
    <View testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
      {header}

      {/* A sibling of the rows, never a header inside them — see the docblock. */}
      {hasBulk ? (
        <View
          // Deliberately NOT `accessible`: one element here would swallow the
          // two buttons that are the whole point of the bar. The live region
          // is `polite` because a selection appearing is a summary of what the
          // user just did, not an emergency.
          accessibilityLiveRegion="polite"
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.selected,
          }}
        >
          <TextV4
            size="xs"
            weight="semibold"
            tone="onSelected"
            numeric="tabular"
            style={{ flex: 1 }}
          >
            {selectedText}
          </TextV4>
          {onApproveSelected ? (
            <ButtonV4
              size="sm"
              variant="primary"
              onPress={() => onApproveSelected(selected)}
              accessibilityLabel={`${approveLabel}, ${selectedText}`}
              style={{ minHeight: tap }}
            >
              {approveLabel}
            </ButtonV4>
          ) : null}
          {onRejectSelected ? (
            <ButtonV4
              size="sm"
              variant="outline"
              tone="danger"
              onPress={() => onRejectSelected(selected)}
              accessibilityLabel={`${rejectLabel}, ${selectedText}`}
              style={{ minHeight: tap }}
            >
              {rejectLabel}
            </ButtonV4>
          ) : null}
          {onClearSelection ? (
            <ButtonV4
              size="sm"
              variant="ghost"
              onPress={onClearSelection}
              accessibilityLabel={`${clearLabel}, ${selectedText}`}
              style={{ minHeight: tap }}
            >
              {clearLabel}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}

      <View
        accessibilityRole="list"
        accessibilityLabel={countText}
        style={{ gap: tokens.spacing.sm }}
      >
        {rows}
      </View>
    </View>
  );
}
