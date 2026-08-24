import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Lifecycle of a scheduled slot. */
export type ScheduleStatus = 'scheduled' | 'live' | 'ended' | 'cancelled';

export interface ScheduleRowProps {
  /** Pre-formatted start time, e.g. `10:30`. */
  time: string;
  /** Optional pre-formatted end time; renders a `start–end` range. */
  endTime?: string;
  /** Slot title. */
  title: string;
  /** Room / stage. */
  room?: string;
  /** Track / category label, shown as a colored left rail + caption. */
  track?: string;
  /** Slot status; drives a small status caption (text, not color alone). */
  status?: ScheduleStatus;
  /** Press handler for the row. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const STATUS_LABEL: Record<ScheduleStatus, string> = {
  scheduled: '',
  live: 'Live now',
  ended: 'Ended',
  cancelled: 'Cancelled',
};

const STATUS_TONE: Record<ScheduleStatus, keyof SemanticColors> = {
  scheduled: 'muted',
  live: 'success',
  ended: 'muted',
  cancelled: 'danger',
};

/**
 * A single row of a day schedule — a time gutter, an accent track rail, and the
 * title/room details, with an optional status caption. Designed to stack into a
 * printed-timetable feel. The status is always spelled out in words (never
 * color alone). Colors come from the compiled theme tokens; no literal colors.
 */
export function ScheduleRow({
  time,
  endTime,
  title,
  room,
  track,
  status = 'scheduled',
  onPress,
  style,
}: ScheduleRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const statusLabel = STATUS_LABEL[status];
  const isCancelled = status === 'cancelled';

  const content = (
    <View style={{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm }}>
      <View style={{ width: tokens.spacing['2xl'] + tokens.spacing.lg, gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{time}</Text>
        {endTime ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{endTime}</Text>
        ) : null}
      </View>
      <View style={{ width: 3, borderRadius: tokens.radius.full, backgroundColor: track ? colors.primary : colors.border }} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={2}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: isCancelled ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
          {track ? (
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{track}</Text>
          ) : null}
          {room ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{room}</Text>
          ) : null}
          {statusLabel ? (
            <Text style={{ color: colors[STATUS_TONE[status]], fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {statusLabel}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${time} ${title}`}
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }, style]}
      >
        {content}
      </Pressable>
    );
  }
  return <View style={style}>{content}</View>;
}
