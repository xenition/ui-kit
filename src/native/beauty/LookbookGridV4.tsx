import * as React from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import type { LookbookGridProps, LookbookItem } from './LookbookGrid';

export interface LookbookGridV4Props extends LookbookGridProps {
  /**
   * Build a tile's accessible name when the item carries no `label`. Default
   * `'Look 3 of 12'` — the base fell back to the raw `id`, which is a database
   * key read aloud.
   */
  formatItemLabel?: (position: number, total: number) => string;
}

/**
 * **V4 lookbook grid** — same props as {@link LookbookGrid} plus
 * `formatItemLabel`.
 *
 * ## Four changes
 *
 * 1. **The placeholder ground is `colors.muted`**, not a translucent wash: a
 *    translucent fill borrows whatever is behind it, so an image that has not
 *    loaded is a different colour on every screen it appears on.
 * 2. **A tile without a label is named by position**, not by its `id` — the
 *    base read a database key aloud.
 * 3. **Press is a state layer**, not an opacity on the tile.
 * 4. **The caption overlay uses the scrim colour**, which is dark in both
 *    schemes, rather than `onSurface`, which inverts and turned the strip
 *    near-white on a dark page.
 */
export function LookbookGridV4({
  items,
  columns = 2,
  aspectRatio = 1,
  emptyLabel = 'No looks yet.',
  formatItemLabel,
  onSelect,
  style,
}: LookbookGridV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const total = items?.length ?? 0;
  const label = formatItemLabel ?? ((n: number, of: number) => `Look ${n} of ${of}`);
  const cols = Math.max(1, Math.floor(columns));

  return (
    <FlatList
      data={items}
      key={`cols-${cols}`}
      numColumns={cols}
      keyExtractor={(item: LookbookItem, i) => item.id ?? String(i)}
      columnWrapperStyle={cols > 1 ? { gap: tokens.spacing.sm } : undefined}
      contentContainerStyle={[{ gap: tokens.spacing.sm }, style]}
      ListEmptyComponent={
        <View accessibilityRole="summary" style={{ padding: tokens.spacing.lg }}>
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      }
      renderItem={({ item, index }) => {
        const name = item.label ?? label(index + 1, total);
        const tile = (
          <View
            style={{
              flex: 1,
              aspectRatio,
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
              backgroundColor: colors.muted,
            }}
          >
            {item.imageUrl ? (
              <Image
                source={{ uri: item.imageUrl }}
                accessible={!onSelect}
                accessibilityLabel={onSelect ? undefined : name}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            ) : null}

            {item.tag ? (
              <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
                <BadgeV4 tone="primary" variant="soft" size="sm">
                  {item.tag}
                </BadgeV4>
              </View>
            ) : null}

            {item.label ? (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.xs,
                  // The shadow colour does not invert with the scheme.
                  backgroundColor: theme.elevation.sheet.color + 'A0',
                }}
              >
                <TextV4
                  size="xs"
                  weight="semibold"
                  numberOfLines={1}
                  style={{ color: tokens.ramps.neutral[50] }}
                >
                  {item.label}
                </TextV4>
              </View>
            ) : null}
          </View>
        );

        return (
          <View style={{ flex: 1 }}>
            {onSelect ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={name}
                onPress={() => onSelect(item.id)}
                style={({ pressed }) => ({
                  flex: 1,
                  borderRadius: tokens.radius.md,
                  backgroundColor: pressed ? pressFill(theme) : 'transparent',
                })}
              >
                {tile}
              </Pressable>
            ) : (
              tile
            )}
          </View>
        );
      }}
    />
  );
}
