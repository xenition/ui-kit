import * as React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { toneColor, withAlpha } from './internal';
import type { PosTone } from './internal';

/** A single selectable category in the register grid tab strip. */
export interface CategoryTab {
  /** Stable identifier reported to `onSelect` and used as the React key. */
  id: string;
  /** Human-readable tab label. */
  label: string;
  /** Optional item count shown as a pill beside the label. */
  count?: number;
  /** Optional semantic tone for the count pill on the unselected state. */
  tone?: PosTone;
}

/**
 * Props for {@link CategoryTabs} — a horizontally-scrolling product category
 * tab strip for the register grid. Presentational only: the caller owns the
 * selected id and receives the chosen id via `onSelect`.
 */
export interface CategoryTabsProps {
  /** The categories to render, left to right. */
  categories: readonly CategoryTab[];
  /** The id of the currently selected category. */
  selectedId?: string;
  /** Fired with the category id when a tab is pressed. */
  onSelect?: (id: string) => void;
  /** Optional test id forwarded to the root scroll view. */
  testID?: string;
}

/**
 * CategoryTabs — **V4** "register" design. A horizontally-scrolling `tablist`
 * for the product grid: the selected tab fills **solid primary** with
 * on-primary ink; unselected tabs stay calm on `surface`. Each tab is a ≥44px
 * target and may carry a count pill (soft-toned when unselected, on-primary
 * when selected). Presentational only — selection is driven by props and
 * reported via `onSelect`. Token-only colors via `useXenitionTheme()`,
 * dark-mode safe.
 */
export function CategoryTabs({
  categories,
  selectedId,
  onSelect,
  testID,
}: CategoryTabsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      accessibilityLabel="Product categories"
      testID={testID}
      contentContainerStyle={{ flexDirection: 'row', gap: tokens.spacing.sm, padding: tokens.spacing.xs }}
    >
      {categories.map((cat) => {
        const selected = cat.id === selectedId;
        const pillBg = selected ? withAlpha(colors.onPrimary, 0.2) : withAlpha(toneColor(colors, cat.tone ?? 'neutral'), 0.15);
        const pillText = selected ? colors.onPrimary : toneColor(colors, cat.tone ?? 'neutral');
        return (
          <Pressable
            key={cat.id}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={typeof cat.count === 'number' ? `${cat.label}, ${cat.count}` : cat.label}
            onPress={() => onSelect?.(cat.id)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              minHeight: 44,
              borderRadius: tokens.radius.md,
              paddingVertical: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.md,
              backgroundColor: selected ? colors.primary : colors.card,
              opacity: pressed && !selected ? 0.92 : 1,
              ...(selected
                ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 }
                : null),
            })}
          >
            <Text
              style={{
                color: selected ? colors.onPrimary : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '700',
              }}
            >
              {cat.label}
            </Text>
            {typeof cat.count === 'number' ? (
              <View
                style={{
                  minWidth: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  paddingHorizontal: 6,
                  backgroundColor: pillBg,
                }}
              >
                <Text
                  style={{
                    color: pillText,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    fontVariant: ['tabular-nums'],
                  }}
                >
                  {cat.count}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
