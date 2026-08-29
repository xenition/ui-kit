import * as React from 'react';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import type { ActionSheetAction, ActionSheetProps } from './ActionSheet';
import { useReducedMotion } from './internal/useReducedMotion';
import { SURFACE_MOTION, elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { pressLayer, pressOver } from './internal/state-v4';
import { EASING_ENTER } from './internal/motion-v4';

export type { ActionSheetProps as ActionSheetV4Props, ActionSheetAction };

/**
 * Split the actions into the ordinary ones and the destructive ones, keeping
 * relative order inside each group.
 *
 * The destructive actions become their own card at the bottom of the stack —
 * the "destructive slot". That is not decoration: §25 asks for friction
 * proportional to risk, and physical separation is the cheapest friction there
 * is. A Delete sitting flush against a Rename is one mis-scroll away from being
 * the thing your thumb lands on.
 */
function partition(actions: ActionSheetAction[]): {
  ordinary: ActionSheetAction[];
  destructive: ActionSheetAction[];
} {
  const ordinary: ActionSheetAction[] = [];
  const destructive: ActionSheetAction[] = [];
  for (const action of actions) {
    (action.destructive === true ? destructive : ordinary).push(action);
  }
  return { ordinary, destructive };
}

/**
 * `ActionSheet`, V4 — the same props, grouped, with a destructive slot.
 *
 * ## What the depth is saying
 *
 * The groups are cards over a scrimmed page, all at ONE altitude: each carries
 * `elevation.sheet`, none is nested inside another. §8's "cards inside cards
 * inside cards" is about hierarchy invented for its own sake; three siblings at
 * the same height are three objects on one table, which is what an action sheet
 * literally is. The rows inside them are flat, and nothing in this component is
 * lifted twice.
 *
 * The scrim is the shadow colour, not `onSurface` — which inverts with the
 * scheme and paints a near-WHITE veil over a dark page, the bug the base
 * component has. Glass applies only when the seed asked for `depth: 'glass'`;
 * everything else is consumed unconditionally, so `depth: 'flat'` needs no
 * branch and gets a flat sheet for free.
 *
 * ## The destructive slot
 *
 * The base component tints EVERY row with `primary` — the iOS convention — and
 * marks the destructive one by swapping that tint for red. Two problems: the
 * sheet then has no hierarchy at all (§5: one dominant thing), and `primary` is
 * a FILL colour with no contrast guarantee as text.
 *
 * So V4 does the opposite. Ordinary rows are plain `onSurface`, which is a
 * contrast-guaranteed pair and reads as what it is: a list of choices, not a
 * list of links. The destructive action is then **the only coloured text on the
 * sheet**, in `dangerText` — the compiler's contrast-corrected red — and it
 * sits in its own card, away from where a thumb rests. Unmistakable because it
 * is the one thing that looks different, rather than because it shouts.
 *
 * ## Motion
 *
 * It rises from the bottom edge because that is where it came from (§36.1),
 * over `SURFACE_MOTION.sheet`. Reduce Motion drops the travel and keeps the
 * scrim's fade (§36.10).
 */
export function ActionSheetV4({
  open,
  onClose,
  title,
  actions,
  cancelLabel = 'Cancel',
}: ActionSheetProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  const progress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!open) {
      progress.setValue(0);
      return;
    }
    if (reduced) {
      progress.setValue(1);
      return;
    }
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: SURFACE_MOTION.sheet,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [open, reduced, progress]);

  const { ordinary, destructive } = React.useMemo(() => partition(actions), [actions]);

  // A comfortable tap target, from the scale rather than a remembered 44.
  const rowMinHeight = tokens.spacing['2xl'];

  const card = [
    elevationStyle(theme.elevation.sheet),
    panelSkin(theme),
    { borderRadius: tokens.radius.lg, overflow: 'hidden' as const },
  ];

  const renderRow = (action: ActionSheetAction, index: number, tone: string): React.ReactElement => (
    <Pressable
      key={index}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled: action.disabled }}
      disabled={action.disabled}
      onPress={() => {
        action.onSelect?.();
        onClose();
      }}
      style={({ pressed }) => ({
        minHeight: rowMinHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.lg,
        borderTopWidth: index === 0 ? 0 : 1,
        borderTopColor: colors.border,
        // A row that is being pressed is the only thing in the sheet that
        // changes colour, and it changes by one border step — feedback, not a
        // flash (§36.8: a tiny action deserves tiny feedback).
        backgroundColor: pressed ? pressLayer(theme) : 'transparent',
        opacity: action.disabled === true ? theme.state.disabledContent : 1,
      })}
    >
      <Text
        style={{
          fontSize: tokens.typography.scale.base,
          fontWeight: '500',
          color: tone,
        }}
      >
        {action.label}
      </Text>
    </Pressable>
  );

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: scrimColor(theme),
            opacity: progress,
          }}
        >
          <Pressable accessibilityLabel="Close" onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>

        <Animated.View
          accessibilityViewIsModal
          style={{
            padding: tokens.spacing.md,
            paddingBottom: tokens.spacing.md + insets.bottom,
            gap: tokens.spacing.sm,
            transform: [
              {
                translateY: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [tokens.spacing['2xl'] * 4, 0],
                }),
              },
            ],
          }}
        >
          <View accessibilityRole="menu" style={card}>
            {title != null && title !== '' ? (
              <View
                style={{
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.lg,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: tokens.typography.scale.sm,
                    // `onSurface`, not `muted`: this card may be glass, and
                    // `muted` measurably falls below AA there. Weight and size
                    // do the de-emphasis instead of colour.
                    color: colors.onSurface,
                    textAlign: 'center',
                  }}
                >
                  {title}
                </Text>
              </View>
            ) : null}
            {ordinary.map((action, i) =>
              renderRow(action, title != null && title !== '' ? i + 1 : i, colors.onSurface)
            )}
          </View>

          {destructive.length > 0 && (
            <View accessibilityRole="menu" style={card}>
              {destructive.map((action, i) =>
                // `dangerText`, not `danger`: the plain slot is a FILL colour
                // and carries no promise as text. This is the same red, walked
                // until it clears AA on the surface.
                renderRow(action, i, colors.dangerText)
              )}
            </View>
          )}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            onPress={onClose}
            style={({ pressed }) => [
              ...card,
              {
                minHeight: rowMinHeight,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: tokens.spacing.md,
                backgroundColor: pressed ? pressOver(theme, colors.surface) : colors.surface,
              },
            ]}
          >
            <Text
              style={{
                fontSize: tokens.typography.scale.base,
                fontWeight: '600',
                color: colors.onSurface,
              }}
            >
              {cancelLabel}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}
