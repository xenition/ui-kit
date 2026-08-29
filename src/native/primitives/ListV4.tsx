import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ListItemData, ListProps } from './List';
import { pressFill } from './internal/state-v4';

export type { ListProps as ListV4Props, ListItemData };

/**
 * **V4 list** — same props as {@link List}, a different design line.
 *
 * The base list puts a hairline between every pair of rows and gives the title
 * and the description the same font size, so the only thing separating a name
 * from its subtitle is colour. That is two problems with one cause: structure
 * is being drawn instead of typeset.
 *
 * Three changes:
 *
 * 1. **Typography carries the hierarchy.** The title steps up to `base` at
 *    weight 600; the description drops to `xs` and stays muted. §10 asks for
 *    size, weight and contrast before containers and dividers, and a title
 *    that is bigger than its description does not need a line under the row to
 *    say where the row ends.
 * 2. **No divider between rows.** The gap between one row's description and
 *    the next row's title is the whole vertical padding of both — many times
 *    the two-pixel gap inside a row — so the grouping is already unambiguous.
 *    §9: spacing IS the structure. What is left is the one border around the
 *    list, because a list is a single object and earns a container (§11);
 *    the rows inside it are not `n` more objects.
 * 3. **A pressable row is a real target and tints, not lifts.** Every row
 *    takes `2xl` of height — the tap target the rest of the V4 line uses — and
 *    a press mixes `onSurface` into `surface`. The base's web twin used
 *    `hover:bg-neutral-50`, which is the light-oriented ramp: in dark mode
 *    that is a near-white slab. Mixing the two scheme-resolved slots follows
 *    the scheme for free.
 *
 * Nothing here gains a shadow. A list row that lifts is a card, and a stack of
 * cards inside a bordered list is exactly the "cards inside cards inside
 * cards" §8 bans.
 */
export function ListV4({ items, style }: ListProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const pressedBg = pressFill(theme);

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {items.map((it, i) => {
        const inner = (
          <>
            {it.leading != null ? <View>{it.leading}</View> : null}
            <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
              {typeof it.title === 'string' ? (
                <Text
                  numberOfLines={1}
                  style={{
                    color: colors.onSurface,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                  }}
                >
                  {it.title}
                </Text>
              ) : (
                it.title
              )}
              {it.description != null ? (
                typeof it.description === 'string' ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: colors.mutedText,
                      fontFamily: tokens.typography.fontBody,
                      fontSize: tokens.typography.scale.xs,
                    }}
                  >
                    {it.description}
                  </Text>
                ) : (
                  it.description
                )
              ) : null}
            </View>
            {it.trailing != null ? <View>{it.trailing}</View> : null}
          </>
        );
        // No `borderTopWidth`: the gap between rows already says where one
        // ends (§9).
        const rowStyle: ViewStyle = {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          minHeight: tokens.spacing['2xl'],
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
        };
        return it.onPress ? (
          <Pressable
            key={i}
            accessibilityRole="button"
            onPress={it.onPress}
            // A press tints; it never lifts.
            style={({ pressed }) => [
              rowStyle,
              { backgroundColor: pressed ? pressedBg : colors.surface },
            ]}
          >
            {inner}
          </Pressable>
        ) : (
          <View key={i} style={[rowStyle, { backgroundColor: colors.surface }]}>
            {inner}
          </View>
        );
      })}
    </View>
  );
}
