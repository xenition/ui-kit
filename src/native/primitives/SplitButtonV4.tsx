import * as React from 'react';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';
import { mixToken } from '../../primitives/internal/v4-depth';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { ElevationToken } from '../../theme/types';
import type { SplitButtonAction, SplitButtonProps, SplitButtonVariant } from './SplitButton';
import { EASING_ENTER } from './internal/motion-v4';
import { V4_MOTION } from './internal/motion-v4';

export type { SplitButtonProps as SplitButtonV4Props, SplitButtonAction, SplitButtonVariant };

/** The platform minimum touch target — a property of fingers, not of the seed. */
const MIN_TAP = 44;

/** §36.2 puts a micro-feedback at 100–180ms. A caret turning is the small end. */
const TURN_MS = V4_MOTION.quick;

/** How much of the face the seam borrows, so it reads without being a border. */
const SEAM_MIX = 0.4;

/** RN shadow style from an {@link ElevationToken}. Inert when depth is flat. */
function elevationStyle(token: ElevationToken): ViewStyle {
  return {
    shadowColor: token.color,
    shadowOpacity: token.opacity,
    shadowRadius: token.radius,
    shadowOffset: { width: 0, height: token.offsetY },
    elevation: token.android,
  };
}

/**
 * **V4 split button** — same props as {@link SplitButton}, a different design
 * line.
 *
 * A split button is two tap targets fused into one shape, and both of them were
 * too small to hit.
 *
 * 1. **Both halves are real targets.** The face was `spacing.sm` of vertical
 *    padding around a 16px label — about 36pt — and the caret was 28pt wide.
 *    Every one of those numbers is under the 44 a finger needs, on the control
 *    a screen puts its *primary* action in. Both now have a 44 floor in both
 *    axes, and so does every row of the menu.
 * 2. **The colours are measured.** `secondary` labelled itself `colors.primary`
 *    — a FILL slot, guaranteed against `onPrimary` and against nothing else —
 *    and a destructive menu row took `colors.danger` the same way. Both move to
 *    the compiler's `*Text` forms, and `muted` (a disabled row) is walked to AA
 *    as well, because none of the three carried a promise about the page. The
 *    outlined face also paints `surface` instead of `transparent`, so the
 *    ground its label was measured against is the ground it is printed on.
 * 3. **The seam is an opaque colour.** It was the face colour at 40% *alpha*,
 *    so on the outlined variant it was 40% of `primary` over whatever happened
 *    to be behind the button. V4 composites the same 40% once, into the face,
 *    so the seam is a colour the control owns.
 * 4. **The menu floats, and looks like it.** It had no shadow at all — a panel
 *    overlapping the page with nothing to say it is above it. `elevation.card`
 *    is the seed's own answer, and a `depth: 'flat'` seed zeroes it with no
 *    branch here.
 * 5. **The caret turns.** It swapped between two static angles, so the one
 *    moving part of the control teleported. It now animates on §36.2's
 *    micro-feedback clock and an ease-out — and holds still under Reduce
 *    Motion, where the angle is set on the frame the state changes (§36.10).
 *
 * The caret glyph comes from the kit's named icon set rather than a `▾` typed
 * into this file, and the menu's minimum width is composed from the spacing
 * scale rather than the literal 160 it used to be.
 */
export function SplitButtonV4({
  label,
  onPress,
  actions,
  variant = 'primary',
  disabled = false,
  style,
}: SplitButtonProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, elevation } = theme;
  const [open, setOpen] = React.useState(false);
  const spacing = tokens.spacing;

  const filled = variant === 'primary';
  const face = filled ? colors.primary : colors.surface;
  // `primary` is a fill slot: the compiler guarantees `onPrimary` against it,
  // and nothing about it as ink on the page.
  const ink = filled ? colors.onPrimary : colors.primaryText;
  // Composited once, into the face — not floated at 40% over whatever is behind.
  const seam = mixToken(face, ink, SEAM_MIX);

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          alignSelf: 'flex-start',
          minHeight: MIN_TAP,
          borderRadius: tokens.radius.md,
          borderWidth: filled ? 0 : 1,
          borderColor: colors.primary,
          overflow: 'hidden',
          opacity: disabled ? theme.state.disabledContent : 1,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onPress}
          style={{
            backgroundColor: face,
            minHeight: MIN_TAP,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
          }}
        >
          {typeof label === 'string' ? (
            <Text
              style={{
                color: ink,
                fontSize: tokens.typography.scale.base,
                fontFamily: tokens.typography.fontBody,
                fontWeight: '600',
              }}
            >
              {label}
            </Text>
          ) : (
            label
          )}
        </Pressable>
        <View style={{ width: 1, backgroundColor: seam }} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="More actions"
          accessibilityState={{ disabled, expanded: open }}
          disabled={disabled}
          onPress={() => setOpen((o) => !o)}
          style={{
            backgroundColor: face,
            // A caret is half a control, not half a target.
            minWidth: MIN_TAP,
            minHeight: MIN_TAP,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Caret open={open} color={ink} size={tokens.typography.scale.xs} />
        </Pressable>
      </View>

      {open ? (
        <View
          style={[
            {
              marginTop: spacing.xs,
              alignSelf: 'flex-start',
              // 160 from the scale rather than as a literal.
              minWidth: spacing['2xl'] * 3 + spacing.md,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: tokens.radius.md,
              backgroundColor: colors.surface,
              paddingVertical: spacing.xs,
            },
            // A panel overlapping the page should say it is above it.
            elevationStyle(elevation.card),
          ]}
        >
          {actions.map((action) => {
            const color = action.disabled
              ? colors.mutedText
              : action.destructive
                ? colors.dangerText
                : colors.onSurface;
            return (
              <Pressable
                key={action.key}
                accessibilityRole="button"
                accessibilityState={{ disabled: action.disabled }}
                disabled={action.disabled}
                onPress={() => {
                  setOpen(false);
                  action.onPress?.();
                }}
                style={{
                  minHeight: MIN_TAP,
                  justifyContent: 'center',
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.sm,
                }}
              >
                {typeof action.label === 'string' ? (
                  <Text
                    style={{
                      color,
                      fontSize: tokens.typography.scale.sm,
                      fontFamily: tokens.typography.fontBody,
                    }}
                  >
                    {action.label}
                  </Text>
                ) : (
                  action.label
                )}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

/**
 * The disclosure caret, turning rather than teleporting.
 *
 * Under reduced motion it is set to its final angle on the frame the state
 * changes — the information survives, the movement does not.
 */
function Caret({
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
      duration: TURN_MS,
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
