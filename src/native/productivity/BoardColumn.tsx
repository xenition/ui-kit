import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
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
  style?: StyleProp<ViewStyle>;
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
  style,
}: BoardColumnProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = Array.isArray(cards) ? cards : [];

  return (
    <View
      accessibilityLabel={`${title} column, ${items.length} cards`}
      style={[
        {
          width,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
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
          <TaskRow
            key={c.id}
            title={c.title}
            done={c.done}
            variant={c.dueLabel ? 'dated' : 'priority'}
            priority={c.priority ?? 'low'}
            dueLabel={c.dueLabel}
            dueTone={c.dueTone}
            onToggle={(next) => onToggleCard?.(c.id, next)}
            onPress={onCardPress ? () => onCardPress(c.id) : undefined}
            style={{ borderWidth: 1, borderColor: colors.border }}
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
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            + Add
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
