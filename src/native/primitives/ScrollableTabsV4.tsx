import * as React from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import { NAV_MOTION, minTap, useMovingIndicator } from './internal/nav-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import type { ScrollableTabItem, ScrollableTabsProps } from './ScrollableTabs';
import { pressLayer } from './internal/state-v4';

export type { ScrollableTabsProps as ScrollableTabsV4Props, ScrollableTabItem };

/** How much `onSurface` an idle count chip carries. A ground, not a fill. */
const CHIP_MIX = 0.12;

/**
 * **V4 scrollable tabs** — same props as {@link ScrollableTabs}, a different
 * design line.
 *
 * Everything `TabsV4` does, plus the two things that only matter once the row
 * is longer than the screen.
 *
 * ## The selected tab comes to you
 *
 * A scrolling tab bar can put the answer to "where am I" off-screen, which
 * makes §32 unsatisfiable: there is nothing to recognise. So the row scrolls
 * the selected tab into view whenever the selection changes — including when
 * it changes from somewhere else, which is the case the user cannot fix by
 * scrolling because they never saw it happen.
 *
 * The scroll is animated for the same reason the underline slides (§36.5): the
 * bar moving under a stationary finger explains where the content went, while
 * a jump replaces one screen with another and leaves the reader to work out
 * what changed. Reduce Motion jumps instead (§36.10) — the tab still arrives.
 *
 * ## The count chip owns its ground
 *
 * The base bar filled the active chip with `primary` and labelled it
 * `colors.surface` — two slots with no contrast relationship at all; on a pale
 * primary that is white on near-white. The idle chip was worse: `muted` as a
 * FILL with `surface` text, which is a contrast pair by coincidence in light
 * and not at all in dark.
 *
 * V4 gives each chip a ground it owns. Active is `primary` with its guaranteed
 * `onPrimary`. Idle is `onSurface` composited OPAQUELY into `surface` at 12% —
 * opaque because a translucent tint borrows whatever is behind it, and the
 * label's promise was never about that. The label is then re-measured against
 * the ground the chip actually painted, exactly as `BadgeV4` does.
 */
export function ScrollableTabsV4({
  items,
  value,
  onValueChange,
  style,
}: ScrollableTabsProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();

  const activeIndex = items.findIndex((it) => it.value === value);
  const indicator = useMovingIndicator(activeIndex);

  const scroller = React.useRef<ScrollView>(null);
  // Measured tab boxes, kept here as well as in the indicator hook: the hook
  // owns the underline's position, this owns "is the selected tab visible".
  const boxes = React.useRef<Record<number, { x: number; w: number }>>({});
  const viewport = React.useRef(0);
  const offset = React.useRef(0);

  const revealActive = React.useCallback(() => {
    const box = boxes.current[activeIndex];
    if (box === undefined || viewport.current === 0) return;
    const left = offset.current;
    const right = left + viewport.current;
    if (box.x >= left && box.x + box.w <= right) return;
    // Land the tab a comfortable gutter inside the edge it was hiding behind,
    // so it reads as "in view" rather than "clipped at the boundary".
    const gutter = tokens.spacing.lg;
    const target = box.x < left ? box.x - gutter : box.x + box.w - viewport.current + gutter;
    scroller.current?.scrollTo({ x: Math.max(target, 0), animated: !reduced });
  }, [activeIndex, reduced, tokens.spacing.lg]);

  React.useEffect(() => {
    revealActive();
  }, [revealActive]);

  return (
    <ScrollView
      ref={scroller}
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      onLayout={(event) => {
        viewport.current = event.nativeEvent.layout.width;
        revealActive();
      }}
      onScroll={(event) => {
        offset.current = event.nativeEvent.contentOffset.x;
      }}
      scrollEventThrottle={NAV_MOTION.reveal}
      style={[{ borderBottomWidth: 1, borderBottomColor: colors.border }, style]}
      contentContainerStyle={{ alignItems: 'stretch' }}
    >
      {items.map((it, index) => {
        const active = it.value === value;
        const chipBg = active ? colors.primary : mixToken(colors.surface, colors.onSurface, CHIP_MIX);
        const chipFg = ensureContrast(
          active ? colors.onPrimary : colors.onSurface,
          chipBg,
          MIN_CONTRAST
        );
        return (
          <Pressable
            key={it.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onLayout={(event) => {
              const { x, width } = event.nativeEvent.layout;
              boxes.current[index] = { x, w: width };
              indicator.onItemLayout(index)(event);
              if (active) revealActive();
            }}
            onPress={() => onValueChange(it.value)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              minHeight: minTap(tokens.spacing),
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.sm,
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
                }}
              >
                {it.label}
              </Text>
            ) : (
              it.label
            )}
            {it.badge != null ? (
              <View
                style={{
                  minWidth: tokens.spacing.lg,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: tokens.spacing.xs,
                  paddingVertical: tokens.spacing.xs / 2,
                  borderRadius: tokens.radius.full,
                  backgroundColor: chipBg,
                }}
              >
                {typeof it.badge === 'string' || typeof it.badge === 'number' ? (
                  <Text
                    style={{
                      color: chipFg,
                      fontSize: tokens.typography.scale.xs,
                      fontWeight: '600',
                    }}
                  >
                    {it.badge}
                  </Text>
                ) : (
                  it.badge
                )}
              </View>
            ) : null}
          </Pressable>
        );
      })}

      <Animated.View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          height: 2,
          left: indicator.left,
          width: indicator.width,
          backgroundColor: colors.primary,
          borderRadius: tokens.radius.full,
          opacity: indicator.measured && activeIndex >= 0 ? 1 : 0,
        }}
      />
    </ScrollView>
  );
}
