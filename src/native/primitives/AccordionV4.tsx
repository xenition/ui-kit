import * as React from 'react';
import { Animated, LayoutAnimation, Platform, Pressable, Text, UIManager, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { AccordionItemData, AccordionProps } from './Accordion';
import { EASING_ENTER } from './internal/motion-v4';
import { V4_MOTION } from './internal/motion-v4';

export type { AccordionProps as AccordionV4Props, AccordionItemData };

/**
 * §36.2 puts an enter at 160–240ms. A disclosure is the smaller half of that:
 * long enough to read as a reveal, short enough that a reader opening three
 * sections in a row never waits for the interface.
 */
const REVEAL_MS = V4_MOTION.standard;

/** The platform minimum touch target — a property of fingers, not of the seed. */
const MIN_TAP = 44;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * **V4 accordion** — same props as {@link Accordion}, a different design line.
 *
 * A disclosure is a motion component whose motion was an afterthought.
 *
 * 1. **The chevron turns; it does not snap.** The base rotated it by swapping
 *    a static `transform` between renders, so the panel eased open underneath a
 *    marker that had already jumped. V4 drives the rotation with the same
 *    duration and curve as the reveal, so one gesture reads as one movement
 *    (§36.1 — motion should be functional, and a marker that teleports is not
 *    telling you anything).
 * 2. **The curve matches the action.** `easeInEaseOut` accelerates into the
 *    reveal, which is the curve for something leaving. A panel arriving should
 *    decelerate (§36.3), so both the height and the chevron run on an ease-out
 *    cubic.
 * 3. **Reduced motion is respected.** `LayoutAnimation` ignores the OS Reduce
 *    Motion switch entirely — the base animated every expand regardless. V4
 *    reads {@link useReducedMotion} and, when it is on, changes state with no
 *    animation at all and sets the chevron to its final angle immediately. The
 *    interaction is identical; only the movement goes (§36.10).
 * 4. **The header is a real target.** The row was as tall as its padding made
 *    it. It now has a floor of 44pt, which is the whole control's tap area.
 *
 * The chevron comes from the kit's named icon set rather than a `▾` typed into
 * this file, so it cannot drift from the chevron on the next screen; it is
 * decorative, because `accessibilityState.expanded` already carries the state.
 * The body text is run through `ensureContrast` — `muted` is `neutral[600]`
 * and the compiler guarantees the on-pairs, not that one.
 *
 * No fill, no gradient, no shadow. An accordion is a list with rules between
 * its rows (§11), and §35.11 keeps the sweep for the hero and the one action.
 */
export function AccordionV4({
  items,
  type = 'single',
  defaultValue = [],
  style,
}: AccordionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState<string[]>(defaultValue);

  const toggle = (v: string): void => {
    if (!reduced) {
      // Ease-out: a panel arriving decelerates. `easeInEaseOut` was the curve
      // for something on its way out.
      LayoutAnimation.configureNext({
        duration: REVEAL_MS,
        update: { type: LayoutAnimation.Types.easeOut, property: LayoutAnimation.Properties.scaleY },
      });
    }
    setOpen((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : type === 'single' ? [v] : [...prev, v]
    );
  };

  const bodyInk = colors.mutedText;
  // A chevron is a UI mark, judged at 3:1 rather than as text.
  const markInk = ensureContrast(colors.muted, colors.surface, 3);

  return (
    <View
      style={[
        {
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {items.map((it, i) => {
        const isOpen = open.includes(it.value);
        return (
          <View
            key={it.value}
            style={i > 0 ? { borderTopWidth: 1, borderColor: colors.border } : undefined}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(it.value)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: tokens.spacing.sm,
                minHeight: MIN_TAP,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
              }}
            >
              {typeof it.title === 'string' ? (
                <Text
                  style={{
                    fontSize: tokens.typography.scale.sm,
                    fontFamily: tokens.typography.fontBody,
                    fontWeight: '600',
                    color: colors.onSurface,
                  }}
                >
                  {it.title}
                </Text>
              ) : (
                it.title
              )}
              <Chevron open={isOpen} color={markInk} size={tokens.typography.scale.sm} />
            </Pressable>
            {isOpen ? (
              <View
                style={{
                  paddingHorizontal: tokens.spacing.lg,
                  paddingBottom: tokens.spacing.md,
                }}
              >
                {typeof it.content === 'string' ? (
                  <Text
                    style={{
                      fontSize: tokens.typography.scale.sm,
                      fontFamily: tokens.typography.fontBody,
                      color: bodyInk,
                    }}
                  >
                    {it.content}
                  </Text>
                ) : (
                  it.content
                )}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

/**
 * The disclosure marker, turning on the same clock as the panel.
 *
 * Under reduced motion it is set to its final angle on the frame the state
 * changes — the information survives, the movement does not.
 */
function Chevron({
  open,
  color,
  size,
}: {
  open: boolean;
  color: string;
  size: number;
}): React.ReactElement {
  const reduced = useReducedMotion();
  const progress = React.useRef(new Animated.Value(open ? 1 : 0)).current;

  React.useEffect(() => {
    const to = open ? 1 : 0;
    if (reduced) {
      progress.setValue(to);
      return;
    }
    const anim = Animated.timing(progress, {
      toValue: to,
      duration: REVEAL_MS,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [open, reduced, progress]);

  const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <Animated.Text
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={{ color, fontSize: size, transform: [{ rotate }] }}
    >
      {resolveIconGlyph('chevron-down')}
    </Animated.Text>
  );
}
