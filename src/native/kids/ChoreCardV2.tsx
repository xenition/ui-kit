import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import type { BadgeTone } from '../primitives';
import { usePressScale } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { ChoreCardProps, ChoreStatus } from './ChoreCard';

/** Same public contract as {@link ChoreCard} — a drop-in alternate design. */
export type ChoreCardV2Props = ChoreCardProps;

const STATUS_META: Record<ChoreStatus, { glyph: string; label: string; tone: BadgeTone }> = {
  todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
  'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
  done: { glyph: '✅', label: 'Done', tone: 'success' },
  skipped: { glyph: '⏭️', label: 'Skipped', tone: 'warn' },
};

/**
 * ChoreCard, redesigned (v2): a **big tappable quest card**. A large rounded
 * icon tile leads, the title is set large, and the reward points sit in a
 * prominent star badge up top. A full-width "Mark done" CTA anchors the card so
 * the primary action is unmissable. Lifted with a shadow and a press-scale
 * spring. Distinct from v1's compact row + small inline button. Same props.
 */
export function ChoreCardV2({
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
}: ChoreCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status] ?? STATUS_META.todo;
  const isDone = status === 'done';
  const press = usePressScale();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
      ...shadow('md', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading chore" style={container}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
          <View style={{ width: 52, height: 52, borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View style={{ height: 16, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
            <View style={{ height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          </View>
        </View>
      </View>
    );
  }

  const subParts = [assignee, due].filter(Boolean) as string[];

  const inner = (
    <Animated.View style={[container, { transform: [{ scale: press.scale }] }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.accent, 0.12),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            {icon}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={2}
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '800',
              textDecorationLine: isDone ? 'line-through' : 'none',
            }}
          >
            {title}
          </Text>
          {subParts.length > 0 ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {subParts.join(' · ')}
            </Text>
          ) : null}
        </View>
        {typeof points === 'number' ? (
          <Badge tone="accent" variant="solid" size="md">
            {`⭐ ${points}`}
          </Badge>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      </View>

      {!isDone && onComplete ? (
        <Button size="md" variant="primary" tone="success" onPress={onComplete} style={{ alignSelf: 'stretch' }}>
          Mark done
        </Button>
      ) : null}
    </Animated.View>
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
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
