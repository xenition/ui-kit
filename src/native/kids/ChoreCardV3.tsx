import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox } from '../primitives';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';

/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV3Props = ChoreCardProps;

const STATUS_LABEL: Record<ChoreStatus, string> = {
  todo: 'To do',
  'in-progress': 'In progress',
  done: 'Done',
  skipped: 'Skipped',
};

/**
 * ChoreCard, redesigned (v3): a **dense checklist line**. A leading checkbox
 * toggles completion (checking it fires `onComplete`), the title sits inline
 * with a small assignee·due caption, and points show as a trailing star figure.
 * One tight row for long chore lists — the opposite of v2's tall quest card.
 * Same props.
 */
export function ChoreCardV3({
  title,
  assignee,
  points,
  due,
  icon = '🧹',
  status = 'todo',
  loading = false,
  onComplete,
  onPress,
  style,
}: ChoreCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isDone = status === 'done';

  const container: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading chore" style={container}>
        <View style={{ width: 20, height: 20, borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 12, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 9, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </View>
    );
  }

  const subParts = [assignee, due].filter(Boolean) as string[];
  const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${STATUS_LABEL[status]}`;

  // Checking the box is the completion gesture. Only fire on the true edge.
  const handleToggle = (next: boolean) => {
    if (next && !isDone) onComplete?.();
    else onPress?.();
  };

  return (
    <View accessibilityLabel={a11y} style={container}>
      <Checkbox
        checked={isDone}
        onCheckedChange={handleToggle}
        accessibilityLabel={`Mark ${title} done`}
      />
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
        {icon}
      </Text>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: isDone ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        {subParts.length > 0 ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {subParts.join(' · ')}
          </Text>
        ) : null}
      </View>
      {typeof points === 'number' ? (
        <Text style={{ color: colors.accentText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {`⭐ ${points}`}
        </Text>
      ) : null}
    </View>
  );
}
