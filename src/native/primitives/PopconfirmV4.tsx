import * as React from 'react';
import { Modal, Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import { useXenitionTheme } from '../theme';
import { stateMix } from '../../primitives/internal/v4-state';
import type { PopconfirmProps } from './Popconfirm';
import { minTap } from './internal/chrome-v4';
import { pressFill } from './internal/state-v4';
import { elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';

export type { PopconfirmProps as PopconfirmV4Props };

/** The one prop Popconfirm injects into an element trigger. */
interface TriggerProps {
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * `Popconfirm`, V4 — the same props, and the last thing between a user and a
 * mistake.
 *
 * ## What the depth is saying
 *
 * The bubble is a floating layer, so it takes `elevation.sheet` and the shared
 * `panelSkin` — the same altitude and the same glass rule as `ModalV4`,
 * `MenuV4` and `DrawerV4`, because all four are one kind of object at four
 * sizes. The scrim is `scrimColor`, the shadow colour at a fixed alpha; the
 * base painted `colors.onSurface` at 0.5, which INVERTS with the scheme and
 * lays a white veil over a dark page.
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. Elevation is
 * consumed unconditionally, so a `depth: 'flat'` seed flattens the bubble with
 * no branch in this file.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress` of its own, so wrapping the trigger in Popconfirm's own
 * `Pressable` only ever worked while the trigger was inert: pass the obvious
 * thing — a kit `<Button>`, which is a `Pressable` — and the Button claims the
 * responder, the wrapper's `onPress` never fires, and the confirm bubble never
 * opens. Every destructive action in an app built on the kit was silently a
 * no-op, and the kit's own test hid it because it passed a bare `<Text>`.
 *
 * Cloning the trigger and injecting `onPress` fixes it at the root: one
 * pressable instead of two nested ones, so there is no responder to lose, and a
 * `disabled` trigger stays disabled because the press dies in its own
 * `Pressable` — which is what `disabled` means. Anything the trigger already
 * does on press runs first. A non-element trigger has nothing to clone onto,
 * and nothing that could steal the responder, so it keeps the wrapper.
 *
 * ## Reading the choice
 *
 * §25 asks for friction proportional to risk and §26 that a destructive
 * consequence be legible. So the destructive button is the **only** coloured
 * thing in the bubble — `danger` filled with `onDanger`, the compiler's paired
 * ink, not the `onPrimary` the base painted on a red fill by mistake — and
 * Cancel is quiet text in `mutedText`, which is `muted` with an actual AA
 * promise rather than `muted`, which has none.
 *
 * Both buttons clear the 44pt target the rest of the V4 line composes from the
 * spacing scale. A confirm bubble is the one place in a product where a mis-tap
 * is unrecoverable, and the base's `paddingVertical: xs` chips were about 24
 * tall — half a target, for the highest-stakes tap on the screen.
 *
 * Press feedback is the M3 state layer: the control's own ink over its own
 * ground, at `state.pressed`. Under Reduce Motion the modal's fade is dropped
 * (§36.10); the state layer is not motion and stays.
 */
export function PopconfirmV4({
  trigger,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: PopconfirmProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  const cancel = (): void => {
    onCancel?.();
    setOpen(false);
  };

  const renderedTrigger = React.isValidElement<TriggerProps>(trigger) ? (
    React.cloneElement(trigger, {
      onPress: (event: GestureResponderEvent) => {
        trigger.props.onPress?.(event);
        setOpen(true);
      },
    })
  ) : (
    <Pressable onPress={() => setOpen(true)}>{trigger}</Pressable>
  );

  const tap = minTap(tokens.spacing);
  /*
    The bubble's measure, from the spacing scale rather than the base's literal
    240: six of the largest step. A number written into a component cannot move
    when the theme's density does.
  */
  const panelWidth = tokens.spacing['2xl'] * 6;

  return (
    <>
      {renderedTrigger}
      <Modal
        visible={open}
        transparent
        // §36.10: the fade is the whole transition, so removing it is the
        // reduced-motion answer rather than replacing it with something else.
        animationType={reduced ? 'none' : 'fade'}
        onRequestClose={cancel}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: tokens.spacing.lg,
          }}
        >
          <Pressable
            accessibilityLabel="Close"
            onPress={cancel}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // Black at a fixed alpha. `onSurface` inverts and would paint a
              // white veil over a dark page.
              backgroundColor: scrimColor(theme),
            }}
          />
          <View
            accessibilityRole="alert"
            accessibilityViewIsModal
            style={[
              panelSkin(theme),
              elevationStyle(theme.elevation.sheet),
              {
                width: '100%',
                maxWidth: panelWidth,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                gap: tokens.spacing.md,
              },
            ]}
          >
            {typeof message === 'string' ? (
              <Text
                style={{
                  fontFamily: tokens.typography.fontBody,
                  fontSize: tokens.typography.scale.sm,
                  // `onSurface`, never `muted` — over glass, `muted` measurably
                  // falls below AA, and this sentence is the whole warning.
                  color: colors.onSurface,
                }}
              >
                {message}
              </Text>
            ) : (
              message
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: tokens.spacing.sm,
              }}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={cancelLabel}
                onPress={cancel}
                style={({ pressed }) => ({
                  minHeight: tap,
                  justifyContent: 'center',
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  backgroundColor: pressed ? pressFill(theme) : 'transparent',
                })}
              >
                <Text
                  style={{
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                    // `mutedText`, not `muted`: the plain slot carries no
                    // contrast promise, and this is text.
                    color: colors.mutedText,
                  }}
                >
                  {cancelLabel}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={confirmLabel}
                onPress={() => {
                  onConfirm();
                  setOpen(false);
                }}
                style={({ pressed }) => ({
                  minHeight: tap,
                  justifyContent: 'center',
                  paddingHorizontal: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  // A filled control layers its own PAIRED ink over its own
                  // fill — the M3 model applied to the ground it actually has.
                  backgroundColor: pressed
                    ? stateMix(colors.danger, colors.onDanger, 'pressed', theme.state)
                    : colors.danger,
                })}
              >
                <Text
                  style={{
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                    // `onDanger`, the compiler's paired ink for the danger FILL.
                    // The base wrote `onPrimary` on a red ground, which is a
                    // contrast promise made against a different colour entirely.
                    color: colors.onDanger,
                  }}
                >
                  {confirmLabel}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
