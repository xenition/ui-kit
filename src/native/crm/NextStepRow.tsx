import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type NextStepPriority = 'low' | 'normal' | 'high';

const PRIORITY_META: Record<NextStepPriority, { glyph: string; label: string }> = {
  low: { glyph: '↓', label: 'Low' },
  normal: { glyph: '•', label: 'Normal' },
  high: { glyph: '↑', label: 'High' },
};

export interface NextStepRowProps {
  /** The action to take (e.g. "Send proposal"). */
  title: string;
  /** Pre-formatted due date. */
  dueDate?: string;
  /** Marks the step past due — shown as an "Overdue" word + ⚠ glyph. */
  overdue?: boolean;
  /** Completed state — checkbox fills, title strikes through. */
  done?: boolean;
  /** Who owns the step. */
  assignee?: string;
  /** Priority — a leading glyph + label, not color-only. */
  priority?: NextStepPriority;
  /** Fired with the next `done` value when the checkbox is tapped. */
  onToggle?: (done: boolean) => void;
  /** Fired when the row body (not the checkbox) is tapped. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single "next step" / task row for a deal or contact: a tappable checkbox,
 * the action title (struck through when `done`), and a meta line of assignee,
 * priority (glyph + label) and due date. `overdue` is surfaced as the word
 * "Overdue" plus a ⚠ glyph in the `danger` tone — never color alone. The
 * checkbox reports the next state via `onToggle`. All colors are theme tokens.
 */
export function NextStepRow({
  title,
  dueDate,
  overdue = false,
  done = false,
  assignee,
  priority,
  onToggle,
  onPress,
  testID,
  style,
}: NextStepRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const prio = priority ? PRIORITY_META[priority] : undefined;

  return (
    <View
      testID={testID}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={`${done ? 'Completed' : 'Mark complete'}: ${title}`}
        onPress={() => onToggle?.(!done)}
        hitSlop={8}
        disabled={!onToggle}
        style={{
          width: 22,
          height: 22,
          borderRadius: tokens.radius.sm,
          borderWidth: 2,
          borderColor: done ? colors.success : colors.border,
          backgroundColor: done ? colors.success : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? (
          <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '900' }}>
            ✓
          </Text>
        ) : null}
      </Pressable>

      <Pressable
        accessibilityRole={onPress ? 'button' : 'text'}
        accessibilityLabel={title}
        onPress={onPress}
        disabled={!onPress}
        style={{ flex: 1, gap: 1 }}
      >
        <Text
          numberOfLines={2}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          {prio ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {`${prio.glyph} ${prio.label}`}
            </Text>
          ) : null}
          {assignee ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{assignee}</Text>
          ) : null}
          {overdue ? (
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {`⚠ Overdue${dueDate ? ` · ${dueDate}` : ''}`}
            </Text>
          ) : dueDate ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{dueDate}</Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}
