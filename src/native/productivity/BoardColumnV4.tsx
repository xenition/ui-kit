import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import { TaskRow } from './TaskRow';
import type { BoardCard, BoardColumnProps } from './BoardColumn';

/** Drop-in for {@link BoardColumnProps} — same props, the V4 "flow" design. */
export type BoardColumnV4Props = BoardColumnProps;

/** A single board card that fades/rises in on mount via the shared `useEnter`. */
function BoardCardRow({
  card,
  onToggle,
  onPress,
  borderColor,
}: {
  card: BoardCard;
  onToggle?: (id: string, done: boolean) => void;
  onPress?: (id: string) => void;
  borderColor: string;
}): React.ReactElement {
  const enter = useEnter();
  return (
    <Animated.View style={enter}>
      <TaskRow
        title={card.title}
        done={card.done}
        variant={card.dueLabel ? 'dated' : 'priority'}
        priority={card.priority ?? 'low'}
        dueLabel={card.dueLabel}
        dueTone={card.dueTone}
        onToggle={(next) => onToggle?.(card.id, next)}
        onPress={onPress ? () => onPress(card.id) : undefined}
        style={{ borderWidth: 1, borderColor }}
      />
    </Animated.View>
  );
}

/**
 * BoardColumn — **V4** "flow" design. The focused-workspace take on a Kanban
 * column: a calm header with the title and a **soft-primary count pill**, a
 * subtle column surface, the stack of {@link TaskRow} cards, and the "+ Add"
 * affordance. Guards a missing array and keeps title/count/cards/toggle
 * behavior. Same props/behavior as {@link BoardColumnProps}; token-only colors
 * via `useXenitionTheme()`.
 */
export function BoardColumnV4({
  title,
  cards,
  onToggleCard,
  onCardPress,
  onAddCard,
  width = 280,
  style,
}: BoardColumnV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = Array.isArray(cards) ? cards : [];

  return (
    <View
      accessibilityLabel={`${title} column, ${items.length} cards`}
      style={[
        {
          width,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
          backgroundColor: withAlpha(colors.primary, 0.04),
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.xs,
        }}
      >
        <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        <View
          style={{
            minWidth: tokens.spacing.lg,
            alignItems: 'center',
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.1),
          }}
        >
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {items.length}
          </Text>
        </View>
      </View>

      {items.length === 0 ? (
        <View style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No cards</Text>
        </View>
      ) : (
        items.map((c) => (
          <BoardCardRow
            key={c.id}
            card={c}
            onToggle={onToggleCard}
            onPress={onCardPress}
            borderColor={colors.border}
          />
        ))
      )}

      {onAddCard ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add card"
          onPress={onAddCard}
          style={({ pressed }) => ({
            minHeight: 44,
            justifyContent: 'center',
            paddingVertical: tokens.spacing.xs,
            alignItems: 'center',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            + Add
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
