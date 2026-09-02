import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { hoursParts, isAdverse } from '../../hr/workforce-v4';
import { StatusPillV4 } from './StatusPillV4';
import { formatHours } from './internal';
import { TIMESHEET_STATUS_V4, metaLine, spokenLine } from './internal/tone-v4';
import type { TimesheetRowProps } from './TimesheetRow';

export interface TimesheetRowV4Props extends TimesheetRowProps {
  /** Why the entry was rejected. Shown when the status is adverse. */
  decisionReason?: string;
  /** Who approved or rejected the entry. */
  approver?: string;
}

/**
 * **V4 timesheet row** — same props as {@link TimesheetRow} plus
 * `decisionReason` and `approver`.
 *
 * ## Five changes
 *
 * 1. **A rejection says why, and who.** `rejected` was one of six adverse
 *    statuses in the module with nowhere to record a reason, and this is the
 *    one attached to somebody's pay: the row said "✕ Rejected" and the employee
 *    had to go and ask which of five days was wrong.
 * 2. **Overtime cannot exceed the day.** Overtime is documented as *included
 *    in* `hours`, but the base only ever tested it for `> 0`, so
 *    `hours={2} overtimeHours={10}` rendered "2h 0m" with "+10h 0m OT" beneath
 *    it — two numbers that cannot both be true, printed as confidently as each
 *    other. `hoursParts()` clamps the overtime and the row *says* the input is
 *    inconsistent rather than quietly drawing a corrected figure.
 * 3. **The overtime flag is inked with ink.** `toneColor(colors, 'warn')`
 *    returns the `warn` **fill** slot and the base assigned it straight to
 *    `color:`. It is `warnText` now.
 * 4. **It is a row from the shared row family**, so a timesheet, a settings row
 *    and a notification are one height, one gutter and one press layer instead
 *    of a hand-rolled box with its own border and `gap: 2`.
 * 5. **The row announces its whole state** — date, hours, overtime, clock,
 *    project, status, approver and the rejection reason. The base named itself
 *    "Timesheet Mon Aug 24, 7h 30m" and left the status, which is the part a
 *    manager is scanning for, to a pill the reader walked past separately.
 *
 * **Renders nothing without a `date`.**
 */
export function TimesheetRowV4({
  date,
  hours,
  status,
  clockIn,
  clockOut,
  project,
  overtimeHours = 0,
  variant = 'default',
  decisionReason,
  approver,
  onPress,
  testID,
  style,
}: TimesheetRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!date) return null;

  const compact = variant === 'compact';
  const parts = hoursParts(hours, overtimeHours);
  const statusMeta = status ? TIMESHEET_STATUS_V4[status] : undefined;
  const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : (clockIn ?? clockOut);
  const caption = metaLine([clock, project]);

  const overtimeLabel = parts.overtime > 0 ? `+${formatHours(parts.overtime)} OT` : null;
  // The input is wrong and someone's pay depends on it — say so.
  const inconsistentLabel = parts.inconsistent ? 'Overtime exceeds hours worked' : null;
  const why = status && isAdverse(status) ? decisionReason : undefined;
  const decidedBy =
    approver && statusMeta && (status === 'approved' || status === 'rejected')
      ? `${statusMeta.label} by ${approver}`
      : null;

  const spoken = spokenLine([
    date,
    formatHours(parts.total),
    overtimeLabel,
    inconsistentLabel,
    caption,
    statusMeta?.label,
    decidedBy,
    why,
  ]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: !compact }),
        { backgroundColor: rowGround(theme, { pressed }), borderRadius: tokens.radius.md },
      ]}
    >
      <View style={rowTextStyle(theme)}>
        <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1}>
          {date}
        </TextV4>
        {!compact && caption ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
        {why ? (
          <TextV4 size="xs" weight="semibold" numberOfLines={2} style={{ color: colors.dangerText }}>
            {why}
          </TextV4>
        ) : decidedBy ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {decidedBy}
          </TextV4>
        ) : null}
      </View>

      <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="base" weight="bold" tone="onCard" numeric="tabular">
          {formatHours(parts.total)}
        </TextV4>
        {overtimeLabel ? (
          <TextV4 size="xs" weight="semibold" numeric="tabular" style={{ color: colors.warnText }}>
            {overtimeLabel}
          </TextV4>
        ) : null}
        {inconsistentLabel ? (
          <TextV4 size="xs" weight="semibold" style={{ color: colors.dangerText }}>
            {inconsistentLabel}
          </TextV4>
        ) : null}
      </View>

      {statusMeta ? (
        <View style={rowTrailingStyle(theme)}>
          <StatusPillV4 meta={statusMeta} size="sm" decorative />
        </View>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={spoken} testID={testID} style={style}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      testID={testID}
      style={[{ borderRadius: tokens.radius.md }, style]}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
