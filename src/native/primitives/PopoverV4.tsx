import * as React from 'react';
import { Modal, Pressable, View, type GestureResponderEvent } from 'react-native';
import { useXenitionTheme } from '../theme';
import { panelMinWidth } from './internal/nav-v4';
import { elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import type { PopoverProps } from './Popover';

export type { PopoverProps as PopoverV4Props };

/** The one prop Popover injects into an element trigger. */
interface TriggerProps {
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * **V4 popover** — same props as {@link Popover}, a different design line.
 *
 * ## What the depth is saying
 *
 * A popover is a layer above the page with nothing above it, so it takes
 * `elevation.sheet` — the same altitude as `MenuV4`, `ModalV4` and
 * `BottomSheetV4`. One rule for every floating panel in the kit: they are the
 * same kind of object at different sizes. Its content is flat; a card inside a
 * popover is §8's "cards inside cards".
 *
 * The scrim is built from the shadow colour at a fixed alpha, not from
 * `colors.onSurface` — which INVERTS with the scheme and paints a 50% white
 * veil over a dark page, the bug this component has today. Glass applies only
 * when the seed asked for `depth: 'glass'`; elevation is consumed
 * unconditionally, so a `depth: 'flat'` seed gets a flat panel with no branch
 * in this file.
 *
 * ## Rhythm
 *
 * The base panel padded itself with `spacing.sm`, which puts arbitrary content
 * eight points from a hard edge and reads as cramped next to every other
 * surface in the kit. V4 uses `spacing.md`, the same step `CardV4` and the V4
 * sheets use, so a popover looks like it came from the same system as the
 * thing that opened it.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress`, so wrapping the trigger in Popover's own `Pressable` only ever
 * worked while the trigger was inert — pass a kit `<Button>` and the Button
 * claims the responder and the panel never opens. Cloning the element and
 * injecting `onPress` means there is one pressable instead of two nested ones,
 * a `disabled` trigger stays disabled because the press dies in its own
 * `Pressable`, and no `<button>`-inside-a-`<button>` can arise under
 * react-native-web. Anything the trigger already did on press runs first. A
 * non-element trigger (a bare string) has nothing to clone onto — and nothing
 * that could steal the responder — so it keeps the transparent wrapper.
 */
export function PopoverV4({
  trigger,
  children,
  align = 'start',
  open,
  onOpenChange,
  style,
}: PopoverProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const reduced = useReducedMotion();

  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (next: boolean): void => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const alignItems = align === 'end' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';

  const renderedTrigger = React.isValidElement<TriggerProps>(trigger) ? (
    React.cloneElement(trigger, {
      onPress: (event: GestureResponderEvent) => {
        trigger.props.onPress?.(event);
        setOpen(!isOpen);
      },
    })
  ) : (
    <Pressable onPress={() => setOpen(!isOpen)}>{trigger}</Pressable>
  );

  return (
    <>
      {renderedTrigger}
      <Modal
        visible={isOpen}
        transparent
        // §36.10: the fade is the whole transition, so removing it is the
        // reduced-motion answer rather than replacing it with something else.
        animationType={reduced ? 'none' : 'fade'}
        onRequestClose={() => setOpen(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems, padding: tokens.spacing.lg }}>
          <Pressable
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
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
            accessibilityViewIsModal
            style={[
              {
                minWidth: panelMinWidth(tokens.spacing),
                maxWidth: '100%',
                borderRadius: tokens.radius.md,
                // The same step `CardV4` and the V4 sheets use, so a popover
                // looks like it came from the same system as its trigger.
                padding: tokens.spacing.md,
              },
              panelSkin(theme),
              elevationStyle(theme.elevation.sheet),
              style,
            ]}
          >
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}
