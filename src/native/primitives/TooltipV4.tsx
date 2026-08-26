import * as React from 'react';
import { Modal, Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import { useXenitionTheme } from '../theme';
import { elevationStyle, panelSkin } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import type { TooltipProps, TooltipSide } from './Tooltip';

export type { TooltipProps as TooltipV4Props, TooltipSide };

/** The one prop Tooltip injects into an element child (see the note below). */
interface TriggerProps {
  onLongPress?: (event: GestureResponderEvent) => void;
}

/**
 * **V4 tooltip** — same props as {@link Tooltip}, a different design line.
 *
 * ## No scrim
 *
 * This is the change that matters. The base threw a 50% scrim over the whole
 * app to show a two-word annotation — and built it from `colors.onSurface`,
 * which INVERTS with the scheme and painted a near-white veil over a dark page.
 * V4 removes the scrim outright rather than fixing its colour: §36.8 asks for
 * feedback proportional to the event, and dimming an entire screen to say
 * "Delete" is the least proportional thing in the kit. What remains is a
 * transparent full-screen tap-catcher, so a tap anywhere still dismisses.
 *
 * ## Why the bubble inverts
 *
 * A tip is the one floating thing in the kit that inverts, and that is how a
 * reader recognises "this is an annotation, not a surface" before reading a
 * word (§31 — prefer the established pattern). `onSurface`/`surface` is a
 * compiler-guaranteed pair, so the inversion carries its own contrast promise.
 * It takes `elevation.card`, the smallest of the three, because a tip has
 * barely left the page.
 *
 * At `depth: 'glass'` it joins the glass family instead — an inverted bubble
 * behind a blur is neither legible nor translucent. That is the one place this
 * file reads `depth`, and a necessary one: the compiler neutralises gradients
 * and elevation and stops there, so glass has to be asked for while elevation
 * falls flat on its own.
 *
 * ## The child is the control, and long-press is the gesture
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress`, and the thing you attach a tooltip to is almost always already
 * pressable — so Tooltip's own wrapper never fired and the tip never appeared.
 * Cloning the child removes the second pressable.
 *
 * The handler injected is `onLongPress`, **not** `onPress` — where Tooltip
 * parts company with `MenuV4` and `PopoverV4`. They ARE the control's action;
 * a tooltip is not. On web it is revealed by hover, a gesture that activates
 * nothing, and the control still does its own job on click. Native has no
 * hover, and the nearest gesture that likewise activates nothing is long-press.
 * Injecting `onPress` would make every tooltipped Save button save AND throw a
 * bubble over the screen.
 *
 * A child that is not a single element (a bare string, several nodes) has
 * nothing to clone onto — and nothing that could steal the responder — so it
 * keeps the transparent wrapper, listening for the same gesture, so there is
 * one rule to learn rather than two.
 */
export function TooltipV4({ label, side = 'top', children }: TooltipProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  // `side` is kept for prop parity; native shows a centred bubble rather than
  // one anchored to the trigger's on-screen position.
  void side;

  const glassy = theme.depth === 'glass';
  const skin = glassy
    ? panelSkin(theme)
    : { backgroundColor: colors.onSurface };
  const ink = glassy ? colors.onSurface : colors.surface;

  const renderedChild = React.isValidElement<TriggerProps>(children) ? (
    React.cloneElement(children, {
      onLongPress: (event: GestureResponderEvent) => {
        children.props.onLongPress?.(event);
        setOpen(true);
      },
    })
  ) : (
    <Pressable onLongPress={() => setOpen(true)}>{children}</Pressable>
  );

  return (
    <>
      {renderedChild}
      <Modal
        visible={open}
        transparent
        animationType={reduced ? 'none' : 'fade'}
        onRequestClose={() => setOpen(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: tokens.spacing.lg,
          }}
        >
          {/*
            Transparent, not scrimmed. A tip is an annotation; dimming the whole
            app to show one is out of all proportion to the event (§36.8).
          */}
          <Pressable
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          />
          <View
            accessibilityRole="text"
            style={[
              {
                maxWidth: '80%',
                borderRadius: tokens.radius.sm,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
              },
              skin,
              elevationStyle(theme.elevation.card),
            ]}
          >
            {typeof label === 'string' ? (
              <Text
                style={{
                  fontSize: tokens.typography.scale.sm,
                  fontFamily: tokens.typography.fontBody,
                  color: ink,
                }}
              >
                {label}
              </Text>
            ) : (
              label
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
