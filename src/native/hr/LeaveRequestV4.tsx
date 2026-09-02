import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { isAdverse, pluralizeCount } from '../../hr/workforce-v4';
import { StatusPillV4 } from './StatusPillV4';
import { LEAVE_STATUS_V4, LEAVE_TYPE_V4, chipStyle, spokenLine } from './internal/tone-v4';
import type { LeaveRequestProps } from './LeaveRequest';

export interface LeaveRequestV4Props extends LeaveRequestProps {
  /** Why the request was denied. Shown when the status is adverse. */
  decisionReason?: string;
  /** Name of the approve action. Default `'Approve'`. */
  approveLabel?: string;
  /** Name of the deny action. Default `'Deny'`. */
  denyLabel?: string;
  /** Build the day count. Default `'3 days'`. */
  formatDays?: (days: number) => string;
}

/**
 * **V4 leave request** — same props as {@link LeaveRequest} plus
 * `decisionReason`, `approveLabel`, `denyLabel` and `formatDays`.
 *
 * ## Six changes
 *
 * 1. **Approve and Deny are reachable.** They were `Button`s inside the card's
 *    own `Pressable`, which is `accessible` by default and flattens its whole
 *    subtree into one leaf named "Leave request, Vacation, Pending" — so on
 *    native the two decisions this card exists for were not focus stops at all.
 *    (On the web twin the same nesting had teeth: the card's `onKeyDown` caught
 *    the bubbled Enter, `preventDefault()` cancelled the button's own
 *    activation, and the card navigated instead. The manager navigated away
 *    without approving and nothing told them.) The card is a plain `CardV4`
 *    now; the activation wraps only the identity region, and the two buttons
 *    are its siblings.
 * 2. **A denial says why.** `denied` was one of six adverse statuses in this
 *    module with nowhere to put a reason, so a rejected request rendered a red
 *    "✕ Denied" above the requester's own note and the employee had to ask.
 * 3. **A day count is validated.** `days={0}` rendered "0 days" and `days={-1}`
 *    rendered "-1 days" — both drawn as confidently as a real figure. A count
 *    that is not a positive number is not drawn, and the plural comes from
 *    `pluralizeCount` rather than an appended `'s'`.
 * 4. **Leave type stops being a diagnosis.** `sick` was toned `danger` and
 *    `parental` `success` — a doctor's note in alarm red and a birth as a
 *    success condition. A type is identity: glyph, word, neutral chip.
 * 5. **The copy is props.** "Approve" and "Deny" were hard-coded English in the
 *    one component in the module a non-English HR team is guaranteed to see.
 * 6. **The card announces the whole request** — employee, type, dates, days and
 *    status — instead of three fragments and a subtree the reader cannot enter.
 *
 * `denyLabel`'s button keeps `variant="outline" tone="danger"` on **both**
 * twins. The web base spelled the destructive action `variant="danger"`, a
 * filled button, so the same request card put a heavier weight on "Deny" on the
 * web than on the phone; `tone` is the axis both platforms have.
 */
export function LeaveRequestV4({
  type,
  startDate,
  endDate,
  days,
  status,
  employeeName,
  employeeAvatarUrl,
  approver,
  reason,
  actionable = false,
  variant = 'default',
  decisionReason,
  approveLabel = 'Approve',
  denyLabel = 'Deny',
  formatDays,
  onApprove,
  onDeny,
  onPress,
  testID,
  style,
}: LeaveRequestV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!startDate) return null;

  const compact = variant === 'compact';
  const typeMeta = LEAVE_TYPE_V4[type];
  const statusMeta = LEAVE_STATUS_V4[status];
  /*
    A status pill that sits BESIDE the activation is hidden from the reader when
    the row is interactive — the activation's own name already carries the
    status word, and hearing "Denied" twice in a row is worse than hearing it
    once. On a static row there is no activation to carry it, so the pill speaks
    for itself and the name leaves it out. Same rule on both twins.
  */
  const interactive = onPress != null;

  const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
  const showActions = actionable && status === 'pending';
  const tap = minTap(tokens.spacing);

  // A count that is not a positive number is bad data, not a small request.
  const count = Number.isFinite(days) && days > 0 ? days : null;
  const daysLabel =
    count == null ? null : (formatDays ?? ((n: number) => pluralizeCount(n, 'day')))(count);

  const why = isAdverse(status) ? decisionReason : undefined;
  const decidedBy =
    approver && (status === 'approved' || status === 'denied')
      ? `${statusMeta.label} by ${approver}`
      : null;

  const spoken = spokenLine([
    employeeName,
    typeMeta.label,
    range,
    daysLabel,
    interactive ? statusMeta.label : null,
    why,
    decidedBy,
  ]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        minHeight: tap,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      {employeeName ? <AvatarV4 size="sm" name={employeeName} src={employeeAvatarUrl} /> : null}
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        {employeeName ? (
          <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1}>
            {employeeName}
          </TextV4>
        ) : null}
        {/* A kind, not a state — see change 4. */}
        <View style={chipStyle(theme)}>
          <TextV4 size="sm" tone="onCard">
            {typeMeta.glyph}
          </TextV4>
          <TextV4 size="sm" weight="semibold" tone="onCard">
            {typeMeta.label}
          </TextV4>
        </View>
      </View>
    </View>
  );

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          >
            {({ pressed }) => identity(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
            {identity(false)}
          </View>
        )}
        <StatusPillV4 meta={statusMeta} size="sm" decorative={interactive} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <TextV4 size="sm" tone="onCard">
          {range}
        </TextV4>
        {daysLabel ? (
          <TextV4 size="xs" weight="semibold" tone="mutedText" numeric="tabular">
            {daysLabel}
          </TextV4>
        ) : null}
      </View>

      {!compact && reason ? (
        <TextV4 size="xs" tone="mutedText" numberOfLines={2}>
          {reason}
        </TextV4>
      ) : null}

      {/* An adverse status owes the reader a reason — see change 2. */}
      {why ? (
        <TextV4 size="xs" weight="semibold" style={{ color: colors.dangerText }}>
          {why}
        </TextV4>
      ) : null}

      {/* Siblings of the card's activation, never descendants — change 1. */}
      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <ButtonV4
            size="sm"
            tone="success"
            onPress={onApprove}
            accessibilityLabel={approveLabel}
            style={{ flex: 1, minHeight: tap }}
          >
            {approveLabel}
          </ButtonV4>
          <ButtonV4
            size="sm"
            variant="outline"
            tone="danger"
            onPress={onDeny}
            accessibilityLabel={denyLabel}
            style={{ flex: 1, minHeight: tap }}
          >
            {denyLabel}
          </ButtonV4>
        </View>
      ) : decidedBy ? (
        <TextV4 size="xs" tone="mutedText">
          {decidedBy}
        </TextV4>
      ) : null}
    </CardV4>
  );
}
