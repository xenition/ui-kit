import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Switch, Badge } from '../primitives';

export interface ScheduleRowProps {
  /** Schedule label (e.g. "Wake-up lights"). */
  label: string;
  /** Time string (e.g. "06:30", "Sunset"). */
  time?: string;
  /** Active weekdays (e.g. ["Mon","Tue"]). Rendered as chips; guarded when empty. */
  days?: string[];
  /** Leading glyph/emoji. Default "⏰". */
  icon?: string;
  /** Whether the schedule is enabled. */
  enabled?: boolean;
  /** Fires with the requested enabled value. */
  onToggle?: (next: boolean) => void;
  /** Hide the bottom divider. */
  last?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A schedule / timer row — a clock glyph, the time (emphasized), a label, and a
 * row of weekday chips, closed by an enable {@link Switch}. Disabled schedules
 * dim to `muted`; the enabled state is carried by the switch's `checked` a11y
 * state (not color). `days` is mapped defensively (nothing renders when empty),
 * and a hairline divider separates rows unless `last`. Token-bound throughout.
 */
export function ScheduleRow({
  label,
  time,
  days,
  icon = '⏰',
  enabled = false,
  onToggle,
  last = false,
  style,
}: ScheduleRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dayList = Array.isArray(days) ? days.filter((d) => d != null && d !== '') : [];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: colors.border,
          opacity: enabled ? 1 : 0.7,
        },
        style,
      ]}
    >
      <Icon glyph={icon} color={enabled ? 'primary' : 'muted'} size="lg" />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          {time != null ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
              {time}
            </Text>
          ) : null}
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {label}
          </Text>
        </View>
        {dayList.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
            {dayList.map((day, i) => (
              <Badge key={`${day}-${i}`} tone="neutral" variant="soft" size="sm">
                {day}
              </Badge>
            ))}
          </View>
        ) : null}
      </View>
      <Switch checked={enabled} onCheckedChange={onToggle} accessibilityLabel={`${label} schedule`} />
    </View>
  );
}
