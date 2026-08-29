import * as React from 'react';
import {
  Modal,
  Pressable,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

/** The one prop Popover injects into an element trigger. */
interface TriggerProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export interface PopoverProps {
  /**
   * The control that opens the panel (`onClick`→`onPress`) — normally a kit
   * `<Button>`. Popover does not wrap it in a second pressable; it clones the
   * element and injects its own `onPress` (see the note below), so the trigger
   * stays the real button: its `disabled` state still blocks the panel, and any
   * `onPress` it already carries still runs. A trigger that cannot take an
   * `onPress` — a bare string, or a component that drops the prop — should be
   * wrapped by the caller in a `<Pressable>`, which can.
   */
  trigger: React.ReactNode;
  /** Panel content. */
  children: React.ReactNode;
  /** Horizontal placement of the panel within the overlay (default `start`). */
  align?: 'start' | 'center' | 'end';
  /** Optional controlled open state (mirrors the web open/onOpenChange pair). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Themed popover — the native mirror of the web `Popover`. RN has no anchored
 * DOM portal, so the panel opens in a `Modal` over a translucent backdrop
 * instead of floating next to the trigger. `align` shifts the panel left /
 * center / right within the overlay but does not anchor to the trigger's
 * on-screen position (native simplification). No literal colors.
 */
export function Popover({
  trigger,
  children,
  align = 'start',
  open,
  onOpenChange,
  style,
}: PopoverProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setOpen = (next: boolean): void => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const alignItems = align === 'end' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start';

  /*
    The trigger IS the button. Popover does not wrap it in one.

    On native the deepest `Pressable` under the finger wins the touch responder,
    and it wins it whether or not it has an `onPress` of its own. So wrapping the
    trigger in Popover's own `Pressable` only ever worked while the trigger was
    inert: pass the obvious thing — a kit `<Button>`, which is a `Pressable` — and
    the Button claims the responder, the wrapper's `onPress` never fires, and the
    panel never opens. The kit's own test hid it for one reason: it passed a bare
    `<Text>`, which has no responder to steal.

    Cloning the trigger and injecting `onPress` fixes it at the root. There is one
    pressable instead of two nested ones, so there is no responder to lose; a
    `disabled` trigger stays disabled, because the press dies in the trigger's own
    `Pressable`, which is what `disabled` means; and the `<button>`-inside-a-
    `<button>` nesting the old wrapper was careful to avoid under react-native-web
    cannot arise at all now, because there is no wrapper left to be a button.

    Anything the trigger already does on press runs first, then the panel toggles.
    A non-element trigger (a bare string) has nothing to clone onto — and nothing
    that could steal the responder either — so it keeps the transparent wrapper.
  */
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
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
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
              backgroundColor: colors.onSurface,
              opacity: 0.5,
            }}
          />
          <View
            accessibilityViewIsModal
            style={[
              {
                minWidth: 192,
                maxWidth: '100%',
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.sm,
              },
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
