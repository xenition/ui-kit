import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { type Appearance, appearanceStyle } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
import { TaskRow } from './TaskRow';
import type { PriorityLevel } from './PriorityTag';
import type { DueDateTone } from './DueDatePill';

export interface BoardCard {
  id: string;
  title: string;
  done?: boolean;
  priority?: PriorityLevel;
  dueLabel?: string;
  dueTone?: DueDateTone;
}

export interface BoardColumnProps {
  /** Column heading (e.g. `'In progress'`). */
  title: string;
  /** Cards in this column; an empty array shows a muted placeholder. */
  cards: BoardCard[];
  /** Fires when a card is toggled done. */
  onToggleCard?: (id: string, done: boolean) => void;
  /** Fires when a card body is pressed. */
  onCardPress?: (id: string) => void;
  /** Fires from the footer "+ Add" affordance (hidden when omitted). */
  onAddCard?: () => void;
  /** Fixed column width in px (default 280). */
  width?: number;
  /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

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
 * A single Kanban column — the vertical half of a board: a header with a title
 * and count chip, a stack of {@link TaskRow} cards (each toggleable), an optional
 * "+ Add" footer, and a muted empty placeholder. Mirrors the primitive `Kanban`
 * column but with task-aware rows. Guards a missing array. No literal colors.
 */
export function BoardColumn({
  title,
  cards,
  onToggleCard,
  onCardPress,
  onAddCard,
  width = 280,
  appearance = 'classic',
  style,
}: BoardColumnProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = Array.isArray(cards) ? cards : [];

  return (
    <View
      accessibilityLabel={`${title} column, ${items.length} cards`}
      style={[
        appearanceStyle(appearance, colors, tokens),
        {
          width,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.sm,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: tokens.spacing.xs,
        }}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {title}
        </Text>
        <View
          style={{
            minWidth: tokens.spacing.lg,
            alignItems: 'center',
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: tokens.spacing.xs / 2,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.muted,
          }}
        >
          <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
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
