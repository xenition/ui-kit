import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusPill } from './StatusPill';
import {
  formatHours,
  TIMESHEET_STATUS_META,
  toneColor,
  type TimesheetStatus,
} from './internal';

export type TimesheetRowVariant = 'default' | 'compact';

export interface TimesheetRowProps {
  /** Pre-formatted work date (e.g. "Mon Aug 24"). */
  date: string;
  /** Total hours worked (decimal, e.g. 7.5). */
  hours: number;
  /** Approval state — glyph + word pill. */
  status?: TimesheetStatus;
  /** Clock-in time label. */
  clockIn?: string;
  /** Clock-out time label. */
  clockOut?: string;
  /** Project / task the time is booked to. */
  project?: string;
  /** Overtime hours included in `hours` — flagged by word when > 0. */
  overtimeHours?: number;
  /** Density. */
  variant?: TimesheetRowVariant;
  /** Tap handler (open / edit entry). */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One timesheet entry: date, hours worked (formatted `Hh Mm`), optional clock
 * in/out and project, plus an approval-status pill (glyph + word, never color
 * alone). Overtime is surfaced as a labelled word (`+Xh OT`) rather than only a
 * color. `compact` shows just date + hours + status. All colors are theme
 * tokens — no literals.
 */
export function TimesheetRow({
  date,
  hours,
  status,
  clockIn,
  clockOut,
  project,
  overtimeHours = 0,
  variant = 'default',
  onPress,
  testID,
  style,
}: TimesheetRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const clock = clockIn && clockOut ? `${clockIn} – ${clockOut}` : clockIn ?? clockOut;
  const hasOvertime = Number.isFinite(overtimeHours) && overtimeHours > 0;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {date}
        </Text>
        {!compact ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[clock, project].filter(Boolean).join('  ·  ') || '—'}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end', gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {formatHours(hours)}
        </Text>
        {hasOvertime ? (
          <Text style={{ color: toneColor(colors, 'warn'), fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            +{formatHours(overtimeHours)} OT
          </Text>
        ) : null}
      </View>
      {status ? <StatusPill meta={TIMESHEET_STATUS_META[status]} size="sm" /> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Timesheet ${date}, ${formatHours(hours)}`}
        onPress={onPress}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }
  return <View testID={testID}>{content}</View>;
}
