import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  LEAVE_STATUS_META,
  LEAVE_TYPE_META,
  type LeaveStatus,
  type LeaveType,
} from './internal';

export type LeaveRequestVariant = 'default' | 'compact';

export interface LeaveRequestProps {
  /** Category of leave — glyph + word chip. */
  type: LeaveType;
  /** Pre-formatted start date. */
  startDate: string;
  /** Pre-formatted end date (omit for a single day). */
  endDate?: string;
  /** Number of working days requested. */
  days: number;
  /** Approval state. `pending`/`approved`/`denied`/`cancelled`. */
  status: LeaveStatus;
  /** Requesting employee's name (for a manager's approval queue). */
  employeeName?: string;
  /** Requesting employee's avatar. */
  employeeAvatarUrl?: string;
  /** Approver's name (shown once approved/denied). */
  approver?: string;
  /** Optional reason / note. */
  reason?: string;
  /** Show approve/deny actions (only meaningful while `pending`). */
  actionable?: boolean;
  /** Density. */
  variant?: LeaveRequestVariant;
  onApprove?: () => void;
  onDeny?: () => void;
  /** Tap handler for the whole card. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A leave / time-off request: type, date range, day count and approval status.
 * Status is a glyph + word pill (pending → warn, approved → success, denied →
 * danger) so it never rests on color alone. When `actionable` and still
 * `pending`, approve / deny buttons render for a manager's queue; once decided
 * the approver is shown instead. All colors are theme tokens — no literals.
 */
export function LeaveRequest({
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
  onApprove,
  onDeny,
  onPress,
  testID,
  style,
}: LeaveRequestProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const typeMeta = LEAVE_TYPE_META[type];
  const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;
  const showActions = actionable && status === 'pending';

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }}>
          {employeeName ? <Avatar size="sm" name={employeeName} src={employeeAvatarUrl} /> : null}
          <View style={{ flex: 1, gap: 2 }}>
            {employeeName ? (
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {employeeName}
              </Text>
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text style={{ fontSize: tokens.typography.scale.sm }}>{typeMeta.glyph}</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                {typeMeta.label}
              </Text>
            </View>
          </View>
        </View>
        <StatusPill meta={LEAVE_STATUS_META[status]} size="sm" />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{range}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {days} day{days === 1 ? '' : 's'}
        </Text>
      </View>

      {!compact && reason ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {reason}
        </Text>
      ) : null}

      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <Button size="sm" tone="success" onPress={onApprove} style={{ flex: 1 }}>
            Approve
          </Button>
          <Button size="sm" variant="outline" tone="danger" onPress={onDeny} style={{ flex: 1 }}>
            Deny
          </Button>
        </View>
      ) : approver && (status === 'approved' || status === 'denied') ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {status === 'approved' ? 'Approved' : 'Denied'} by {approver}
        </Text>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Leave request, ${typeMeta.label}, ${LEAVE_STATUS_META[status].label}`}
        onPress={onPress}
        testID={testID}
      >
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
