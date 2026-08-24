import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface KanbanCard {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional trailing slot (e.g. a Badge or Avatar). */
  trailing?: React.ReactNode;
}

export interface KanbanColumn {
  key: string;
  title: React.ReactNode;
  cards: KanbanCard[];
}

export interface KanbanProps {
  columns: KanbanColumn[];
  /** Fires when a card is tapped. */
  onCardPress?: (card: KanbanCard, column: KanbanColumn) => void;
  /** Width of each column in px (default derived from spacing). */
  columnWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontally scrolling board of titled columns, each a vertical stack of
 * cards with a count chip in its header — the display half of a Kanban. This is
 * a **non-drag** version (tap a card via `onCardPress`); wire your own gesture
 * layer for reordering. Empty columns render a muted placeholder. All colors and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
export function Kanban({
  columns,
  onCardPress,
  columnWidth = 260,
  style,
}: KanbanProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
        {columns.map((column) => (
          <View
            key={column.key}
            style={{
              width: columnWidth,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: tokens.radius.md,
              backgroundColor: colors.surface,
              padding: tokens.spacing.sm,
              gap: tokens.spacing.sm,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: tokens.spacing.xs,
                paddingBottom: tokens.spacing.xs,
              }}
            >
              {typeof column.title === 'string' ? (
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  {column.title}
                </Text>
              ) : (
                column.title
              )}
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
                  {column.cards.length}
                </Text>
              </View>
            </View>

            {column.cards.length === 0 ? (
              <View style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No cards</Text>
              </View>
            ) : (
              column.cards.map((card) => (
                <Pressable
                  key={card.id}
                  accessibilityRole="button"
                  onPress={() => onCardPress?.(card, column)}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.sm,
                    padding: tokens.spacing.sm,
                    gap: tokens.spacing.xs,
                    backgroundColor: colors.surface,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }}>
                    {typeof card.title === 'string' ? (
                      <Text
                        numberOfLines={2}
                        style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
                      >
                        {card.title}
                      </Text>
                    ) : (
                      card.title
                    )}
                    {card.trailing != null ? <View>{card.trailing}</View> : null}
                  </View>
                  {card.description != null ? (
                    typeof card.description === 'string' ? (
                      <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                        {card.description}
                      </Text>
                    ) : (
                      card.description
                    )
                  ) : null}
                </Pressable>
              ))
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
