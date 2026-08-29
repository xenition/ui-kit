import * as React from 'react';
import { Modal, Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import { useXenitionTheme } from '../theme';

/** The one prop Tooltip injects into an element child (see the note below). */
interface TriggerProps {
  onLongPress?: (event: GestureResponderEvent) => void;
}

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tip content. */
  label: React.ReactNode;
  /** Retained for web prop parity; not used to anchor on native (see note). */
  side?: TooltipSide;
  /**
   * The control the tip describes — normally a kit `<Button>` or icon button.
   * Tooltip does not wrap it in a second pressable; it clones the element and
   * injects an `onLongPress` (see the note below), so the control keeps its own
   * press for its own action and long-press reveals the tip. Anything that is
   * not a single element — a bare string, a fragment, a list — keeps the
   * transparent `<Pressable>` wrapper, where a plain press reveals the tip
   * because there is no action to compete with.
   */
  children: React.ReactNode;
}

/**
 * Themed tooltip — the native mirror of the web `Tooltip`. Native has no hover,
 * so the tip is revealed by **long-press** on the trigger instead of mouse-enter
 * — the platform's own tooltip gesture, and like hover it activates nothing, so
 * the wrapped control keeps its press for its own action (see the note in the
 * body). It shows as a centered `Modal` bubble rather than a bubble anchored to
 * `side` (native simplification — `side` is kept for prop parity only). The
 * bubble uses the inverted `onSurface`/`surface` token pair. No literal colors.
 */
export function Tooltip({ label, side = 'top', children }: TooltipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  /*
    The child IS the control. Tooltip does not wrap it in a pressable.

    Same root defect as Popover / Menu / Popconfirm: on native the deepest
    `Pressable` under the finger wins the touch responder, and wins it whether or
    not it has an `onPress`. The thing you attach a tooltip to is almost always
    already pressable — a `<Button>`, an icon button — so it claimed the responder,
    Tooltip's wrapper never fired, and the tip never appeared. The kit's own test
    hid it for one reason: it passed a bare `<Text>`, which has no responder to
    steal. Cloning the child removes the second pressable, so there is no responder
    to lose, and the `<button>`-inside-a-`<button>` the old wrapper was careful to
    avoid under react-native-web cannot arise at all.

    The handler injected is `onLongPress`, NOT `onPress` — this is where Tooltip
    parts company with its three siblings. They ARE the control's action: pressing
    a Popconfirm trigger is meant to open the bubble. A tooltip is not an action;
    on web it is revealed by hover, a gesture that does not activate anything, and
    the control still does its own job on click. Native has no hover, and the
    nearest gesture that likewise activates nothing is long-press — the platform
    convention for exactly this. Injecting `onPress` would make every tooltipped
    Save button save AND throw a modal over the screen.

    So: the child's press stays entirely the child's, whatever it already did on
    long-press runs first, then the tip opens. A `disabled` child opens nothing,
    because the press dies in its own `Pressable` — a tip on a disabled control
    means wrapping it in a `<Pressable>` (which is then the element that gets the
    handler) and explaining there why it is disabled.

    A child that is not a single element (a bare string, several nodes) has nothing
    to clone onto — and nothing that could steal the responder — so it keeps the
    transparent wrapper. That wrapper listens for the same gesture and nothing
    else, so there is one rule to learn rather than two: on native, long-press
    reveals the tip.
  */
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
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }}>
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
            accessibilityRole="text"
            style={{
              backgroundColor: colors.onSurface,
              borderRadius: tokens.radius.sm,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            {typeof label === 'string' ? (
              <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.surface }}>{label}</Text>
            ) : (
              label
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
