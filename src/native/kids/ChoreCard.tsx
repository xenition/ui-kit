import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import type { BadgeTone } from '../primitives';

export type ChoreStatus = 'todo' | 'in-progress' | 'done' | 'skipped';

interface StatusMeta {
  glyph: string;
  label: string;
  tone: BadgeTone;
}

const STATUS_META: Record<ChoreStatus, StatusMeta> = {
  todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
  'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
  done: { glyph: '✅', label: 'Done', tone: 'success' },
  skipped: { glyph: '⏭️', label: 'Skipped', tone: 'warn' },
};

export interface ChoreCardProps {
  /** Chore title, e.g. "Make the bed". */
  title: string;
  /** Who the chore is assigned to. */
  assignee?: string;
  /** Reward points for completing the chore. */
  points?: number;
  /** Due label already formatted, e.g. "Today" or "Fri 5pm". */
  due?: string;
  /** Emoji/glyph shown as the chore icon. */
  icon?: string;
  /** Completion status; drives the chip + whether the action shows. */
  status?: ChoreStatus;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Fires when the "Mark done" action is pressed (only shown when not done). */
  onComplete?: () => void;
  /** Fires when the card body is pressed. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single chore: an icon, title, assignee + due line, a reward-points chip, a
 * status chip, and a "Mark done" button. Status is conveyed by glyph + text +
 * a11y label (never color alone). Renders a muted skeleton while `loading`.
 * Token-only colors.
 */
export function ChoreCard({
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
}: ChoreCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status] ?? STATUS_META.todo;
  const isDone = status === 'done';

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading chore" style={container}>
        <View style={{ height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  const subParts = [assignee, due].filter(Boolean) as string[];

  const inner = (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          {icon}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: '700',
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
          <Badge tone="accent" variant="soft" size="sm">
            {`⭐ ${points}`}
          </Badge>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
        {!isDone && onComplete ? (
          <Button size="sm" variant="soft" tone="success" onPress={onComplete}>
            Mark done
          </Button>
        ) : null}
      </View>
    </View>
  );

  const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${meta.label}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
