import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { usePressScale } from '../primitives/internal/motion';
import { LEAVE_STATUS_META, LEAVE_TYPE_META, toneColor } from './internal';
import type { LeaveRequestProps } from './LeaveRequest';

/** Drop-in alternate design for {@link LeaveRequest} — identical Props. */
export type LeaveRequestV3Props = LeaveRequestProps;

/**
 * LeaveRequest, design **V3** — a dense single line for tight queues. A leading
 * tone status-dot (paired with the status word for a11y — never color alone),
 * the leave type + date range, and the day-count pinned right. Same Props as
 * {@link LeaveRequest}; approve/deny chrome is intentionally dropped in favour
 * of a tappable row. Press-scales on tap; token-pure.
 */
export function LeaveRequestV3({
  type,
  startDate,
  endDate,
  days,
  status,
  employeeName,
  onPress,
  testID,
  style,
}: LeaveRequestV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  const typeMeta = LEAVE_TYPE_META[type];
  const statusMeta = LEAVE_STATUS_META[status];
  const range = endDate && endDate !== startDate ? `${startDate} – ${endDate}` : startDate;

  const row = (
    <Animated.View
      style={[
        {
          transform: [{ scale: press.scale }],
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {/* Status dot + word — glyph carried in the a11y label, not color alone. */}
      <View accessibilityLabel={statusMeta.label} style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: toneColor(colors, statusMeta.tone) }} />

      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }}>
          <Text style={{ fontSize: tokens.typography.scale.sm }}>{typeMeta.glyph}</Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {typeMeta.label}
            {employeeName ? ` · ${employeeName}` : ''}
          </Text>
        </View>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{range}</Text>
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {days}d
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{statusMeta.label}</Text>
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Leave request, ${typeMeta.label}, ${statusMeta.label}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        testID={testID}
      >
        {row}
      </Pressable>
    );
  }
  return <View testID={testID}>{row}</View>;
}
