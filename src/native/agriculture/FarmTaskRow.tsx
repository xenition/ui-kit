import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Badge } from '../primitives';

/** Task urgency — colors the priority chip and is stated as text. */
export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface FarmTaskRowProps {
  /** Task title (e.g. "Spray north orchard"). */
  title: string;
  /** Whether the task is complete. Drives the check control's a11y state. */
  done?: boolean;
  /** Due hint (e.g. "Today", "Aug 14"). */
  due?: string;
  /** Priority. Default `'normal'`. */
  priority?: TaskPriority;
  /** Field / area the task applies to (e.g. "Block C"). */
  field?: string;
  /** Assignee name / initials (e.g. "Sam"). */
  assignee?: string;
  /** Category glyph (e.g. "🚜", "💧"). Default `'✅'`. */
  icon?: string;
  /** Whether the due date is overdue (colors the due text + adds a chip). */
  overdue?: boolean;
  /** Fires with the requested done value when the check control is toggled. */
  onToggle?: (next: boolean) => void;
  /** Fires when the row body (not the check) is tapped. */
  onPress?: () => void;
  /** Hide the bottom divider (last row in a list). */
  last?: boolean;
  style?: StyleProp<ViewStyle>;
}

const PRIORITY_META: Record<
  TaskPriority,
  { label: string; tone: 'neutral' | 'primary' | 'warn' | 'danger'; color: keyof SemanticColors }
> = {
  low: { label: 'Low', tone: 'neutral', color: 'muted' },
  normal: { label: 'Normal', tone: 'primary', color: 'primary' },
  high: { label: 'High', tone: 'warn', color: 'warn' },
  urgent: { label: 'Urgent', tone: 'danger', color: 'danger' },
};

/**
 * A farm task row — a tappable check control (a themed checkbox whose a11y
 * `checked` state carries completion, not color), the task title (struck +
 * muted when done), due / field / assignee meta, and a priority {@link Badge}
 * stated as text. `overdue` adds a text chip and colors the due line so urgency
 * reads without color. Toggling the check fires `onToggle(next)`; tapping the
 * body fires `onPress`. Token-bound throughout — no literal colors.
 */
export function FarmTaskRow({
  title,
  done = false,
  due,
  priority = 'normal',
  field,
  assignee,
  icon = '✅',
  overdue = false,
  onToggle,
  onPress,
  last = false,
  style,
}: FarmTaskRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = PRIORITY_META[priority];
  const metaLine = [due, field, assignee].filter((s) => s != null && s !== '').join(' · ');

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
          opacity: done ? 0.6 : 1,
        },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={`Mark ${title} ${done ? 'not done' : 'done'}`}
        onPress={() => onToggle?.(!done)}
        style={{
          width: 24,
          height: 24,
          borderRadius: tokens.radius.sm,
          borderWidth: 2,
          borderColor: done ? colors.success : colors.border,
          backgroundColor: done ? colors.success : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? <Icon glyph="✓" size="sm" color="onSuccess" accessibilityLabel="done" /> : null}
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        disabled={!onPress}
        style={{ flex: 1 }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph={icon} size="sm" color="muted" />
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '600',
              textDecorationLine: done ? 'line-through' : 'none',
            }}
          >
            {title}
          </Text>
        </View>
        {metaLine !== '' ? (
          <Text numberOfLines={1} style={{ color: overdue ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>
            {overdue ? '⚠ Overdue · ' : ''}
            {metaLine}
          </Text>
        ) : null}
      </Pressable>

      <View style={{ alignItems: 'flex-end', gap: 4 }}>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
        {overdue ? (
          <Badge tone="danger" variant="outline" size="sm">
            Overdue
          </Badge>
        ) : null}
      </View>
    </View>
  );
}
