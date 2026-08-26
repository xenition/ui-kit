import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { minTap, useMovingIndicator } from './internal/nav-v4';
import type { TabItem, TabsProps } from './Tabs';
import { pressLayer } from './internal/state-v4';

export type { TabsProps as TabsV4Props, TabItem };

/**
 * **V4 tabs** — same props as {@link Tabs}, a different design line.
 *
 * ## The selected state is the whole job
 *
 * A tab bar answers one question — *which section am I in* — and §32 says the
 * user should recognise the answer, not reconstruct it. So the answer is said
 * three times over, in three channels that fail independently:
 *
 * 1. **An underline** in `colors.primary`. A 2px rule is a UI boundary, judged
 *    at 3:1 rather than 4.5:1, so the vivid fill slot is the correct one here —
 *    unlike the label.
 * 2. **The label's colour**, `primaryText` — the compiler's brand hue walked
 *    until it clears AA on `surface`. The base tab bar used `colors.primary`
 *    for this, which is a FILL colour and carries no promise as text; on a
 *    light-primary seed the selected tab was the least readable thing in the
 *    row, which is the exact inverse of what it was trying to say.
 * 3. **Weight.** 600 selected against 500 unselected — the one channel that
 *    survives a colour-blind reader and a greyscale screenshot.
 *
 * Nothing else changes: no pill, no fill, no shadow. §8 lists excessive
 * pill-shaped controls among the tells of generic AI UI, and a tab that gains a
 * container has stopped being a tab.
 *
 * ## Why the underline moves
 *
 * §36.5 asks that related states preserve continuity of position. Two tabs are
 * two states of one question, so the underline is ONE object that slides
 * between them rather than two that blink — the eye tracks the movement and
 * arrives already knowing where it ended up. `useMovingIndicator` measures the
 * row and drives it, snapping instead of travelling when the OS asks for
 * Reduce Motion (§36.10) and staying hidden until it has an honest position so
 * the first paint never shows it flying in from the left edge.
 *
 * ## Reach
 *
 * Every tab clears the 44pt tap target, composed from the spacing scale by
 * `minTap` rather than remembered. The base row was `spacing.sm` of vertical
 * padding around a 14pt label — about 30pt, and a miss on a phone (§30).
 */
export function TabsV4({
  items,
  value,
  onValueChange,
  onChange,
  style,
}: TabsProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;

  const activeIndex = items.findIndex((it) => it.value === value);
  const indicator = useMovingIndicator(activeIndex);

  return (
    <View
      accessibilityRole="tablist"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'stretch',
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      {items.map((it, index) => {
        const active = it.value === value;
        return (
          <Pressable
            key={it.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onLayout={indicator.onItemLayout(index)}
            onPress={() => emit?.(it.value)}
            style={({ pressed }) => ({
              minHeight: minTap(tokens.spacing),
              justifyContent: 'center',
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.sm,
              // A press lays M3's pressed state layer over the tab: the tab's
              // own ink at 12%, so it reads on any rail without knowing what
              // the rail is, and the label keeps its full weight instead of
              // fading toward looking disabled.
              backgroundColor: pressed ? pressLayer(theme) : 'transparent',
            })}
          >
            {typeof it.label === 'string' ? (
              <Text
                numberOfLines={1}
                style={{
                  color: active ? colors.primaryText : colors.mutedText,
                  fontSize: tokens.typography.scale.sm,
                  fontFamily: tokens.typography.fontBody,
                  fontWeight: active ? '600' : '500',
                  textAlign: 'center',
                }}
              >
                {it.label}
              </Text>
            ) : (
              it.label
            )}
          </Pressable>
        );
      })}

      <Animated.View
        // Decorative: the tab's own `selected` state is what a screen reader
        // announces, and a second announcement of the same fact is noise.
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={{
          position: 'absolute',
          // Sits ON the container's hairline rather than above it, so the rule
          // and the indicator read as one line with a lit segment.
          bottom: -1,
          height: 2,
          left: indicator.left,
          width: indicator.width,
          backgroundColor: colors.primary,
          borderRadius: tokens.radius.full,
          opacity: indicator.measured && activeIndex >= 0 ? 1 : 0,
        }}
      />
    </View>
  );
}
