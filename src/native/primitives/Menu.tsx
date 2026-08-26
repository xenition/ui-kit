import * as React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useXenitionTheme } from '../theme';

/** The one prop Menu injects into an element trigger. */
interface TriggerProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export interface MenuItem {
  label: React.ReactNode;
  /** Fires on select; the menu closes afterwards (`onClick`→`onSelect`). */
  onSelect?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Renders the item in the danger tone (e.g. Delete). */
  danger?: boolean;
}

export interface MenuProps {
  /**
   * The control that opens the menu — normally a kit `<Button>` or an icon
   * button. Menu does not wrap it in a second pressable; it clones the element
   * and injects its own `onPress` (see the note below), so the trigger stays
   * the real button: its `disabled` state still blocks the menu, and any
   * `onPress` it already carries still runs. A trigger that cannot take an
   * `onPress` — a bare string, or a component that drops the prop — should be
   * wrapped by the caller in a `<Pressable>`, which can.
   */
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
}

/**
 * Themed dropdown menu — the native mirror of the web `Menu`. RN has no
 * anchored DOM portal, so the items open in a `Modal` sheet over a translucent
 * backdrop rather than floating next to the trigger; `align` shifts the sheet
 * left / right within the overlay (native simplification). Selecting an item
 * fires `onSelect` and closes the menu. No literal colors.
 */
export function Menu({ trigger, items, align = 'start' }: MenuProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  /*
    The trigger IS the button. Menu does not wrap it in one.

    On native the deepest `Pressable` under the finger wins the touch responder,
    and it wins it whether or not it has an `onPress` of its own. So wrapping the
    trigger in Menu's own `Pressable` only ever worked while the trigger was
    inert: pass the obvious thing — a kit `<Button>`, which is a `Pressable` — and
    the Button claims the responder, the wrapper's `onPress` never fires, and the
    menu never opens. The kit's own test hid it for one reason: it passed a bare
    `<Text>`, which has no responder to steal.

    Cloning the trigger and injecting `onPress` fixes it at the root. There is one
    pressable instead of two nested ones, so there is no responder to lose; a
    `disabled` trigger stays disabled, because the press dies in the trigger's own
    `Pressable`, which is what `disabled` means; and the `<button>`-inside-a-
    `<button>` nesting the old wrapper was careful to avoid under react-native-web
    cannot arise at all now, because there is no wrapper left to be a button.

    Anything the trigger already does on press runs first, then the menu opens.
    A non-element trigger (a bare string) has nothing to clone onto — and nothing
    that could steal the responder either — so it keeps the transparent wrapper.
  */
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

  return (
    <>
      {renderedTrigger}
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: align === 'end' ? 'flex-end' : 'flex-start',
            padding: tokens.spacing.lg,
          }}
        >
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
            accessibilityRole="menu"
            style={{
              minWidth: 160,
              maxHeight: '70%',
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
            }}
          >
            <ScrollView>
              {items.map((it, i) => (
                <Pressable
                  key={i}
                  accessibilityRole="menuitem"
                  accessibilityState={{ disabled: it.disabled }}
                  disabled={it.disabled}
                  onPress={() => {
                    it.onSelect?.();
                    setOpen(false);
                  }}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    opacity: it.disabled ? 0.5 : 1,
                    backgroundColor: pressed ? colors.border : colors.surface,
                  })}
                >
                  {it.icon != null && <View>{it.icon}</View>}
                  {typeof it.label === 'string' ? (
                    <Text
                      style={{
                        fontSize: tokens.typography.scale.sm,
                        color: it.danger ? colors.danger : colors.onSurface,
                      }}
                    >
                      {it.label}
                    </Text>
                  ) : (
                    it.label
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
