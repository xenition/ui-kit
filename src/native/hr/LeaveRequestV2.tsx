import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Button, Steps } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { StatusPill } from './StatusPill';
import { LEAVE_STATUS_META, LEAVE_TYPE_META, toneColor, type LeaveStatus } from './internal';
import type { LeaveRequestProps } from './LeaveRequest';

/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV2Props = LeaveRequestProps;

/** Map a leave status onto the 3-step approval timeline's active index. */
function timelineStep(status: LeaveStatus): number {
  if (status === 'pending') return 1;
  return 2; // approved / denied / cancelled are all decided
}

/**
 * LeaveRequest, design **V2** — a card built around an explicit date-range block
 * and a 3-step approval timeline (Requested → In review → Decided). The range
 * renders as two dated columns joined by an arrow with the day-count between;
 * status is a glyph + word pill (never color alone). When `actionable` and still
 * `pending`, approve / deny buttons show; otherwise the approver is named. Same
 * Props as {@link LeaveRequest}. Elevated + mount-fade, token-pure.
 */
export function LeaveRequestV2({
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
  onApprove,
  onDeny,
  onPress,
  testID,
  style,
}: LeaveRequestV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const typeMeta = LEAVE_TYPE_META[type];
  const statusMeta = LEAVE_STATUS_META[status];
  const showActions = actionable && status === 'pending';
  const hasEnd = !!endDate && endDate !== startDate;

  const steps = [
    { title: 'Requested' },
    { title: 'In review' },
    { title: status === 'denied' ? 'Denied' : status === 'cancelled' ? 'Cancelled' : 'Approved' },
  ];

  const card = (
    <Animated.View
      style={[
        {
          opacity: enter.opacity,
          transform: enter.transform,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1, minWidth: 0 }}>
          {employeeName ? <Avatar size="sm" name={employeeName} src={employeeAvatarUrl} /> : null}
          <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
            {employeeName ? (
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {employeeName}
              </Text>
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}>
              <Text style={{ fontSize: tokens.typography.scale.sm }}>{typeMeta.glyph}</Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{typeMeta.label}</Text>
            </View>
          </View>
        </View>
        <StatusPill meta={statusMeta} size="sm" />
      </View>

      {/* Date-range block */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, 0.06),
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>From</Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{startDate}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: toneColor(colors, 'primary'), fontSize: tokens.typography.scale.base }}>→</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {days} day{days === 1 ? '' : 's'}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>To</Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {hasEnd ? endDate : startDate}
          </Text>
        </View>
      </View>

      <Steps steps={steps} current={timelineStep(status)} />

      {reason ? (
        <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{reason}</Text>
      ) : null}

      {showActions ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <Button size="sm" tone="success" onPress={onApprove} style={{ flex: 1 }}>Approve</Button>
          <Button size="sm" variant="outline" tone="danger" onPress={onDeny} style={{ flex: 1 }}>Deny</Button>
        </View>
      ) : approver && (status === 'approved' || status === 'denied') ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {status === 'approved' ? 'Approved' : 'Denied'} by {approver}
        </Text>
      ) : null}
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Leave request, ${typeMeta.label}, ${statusMeta.label}`}
        onPress={onPress}
        testID={testID}
      >
        {card}
      </Pressable>
    );
  }
  return <View testID={testID}>{card}</View>;
}
