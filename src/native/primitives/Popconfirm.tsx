import * as React from 'react';
import { Modal, Pressable, Text, View, type GestureResponderEvent } from 'react-native';
import { useXenitionTheme } from '../theme';

/** The one prop Popconfirm injects into an element trigger. */
interface TriggerProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export interface PopconfirmProps {
  /**
   * The control that opens the bubble — normally a kit `<Button>`. Popconfirm
   * does not wrap it in a second pressable; it clones the element and injects
   * its own `onPress` (see the note below), so the trigger stays the real
   * button: its `disabled` state still blocks the dialog, and any `onPress` it
   * already carries still runs. A trigger that cannot take an `onPress` — a
   * bare string, or a component that drops the prop — should be wrapped by the
   * caller in a `<Pressable>`, which can.
   */
  trigger: React.ReactNode;
  message: React.ReactNode;
  onConfirm: () => void;
  /** Fires when the user cancels (native extra; web only closes). */
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * Themed confirmation bubble — the native mirror of the web `Popconfirm`. RN
 * has no anchored DOM portal, so the confirm bubble opens in a centered `Modal`
 * over a translucent backdrop rather than floating next to the trigger (native
 * simplification). Mirrors the web `onConfirm` / `confirmLabel` / `cancelLabel`
 * contract. No literal colors.
 */
export function Popconfirm({
  trigger,
  message,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
}: PopconfirmProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  const cancel = (): void => {
    onCancel?.();
    setOpen(false);
  };

  /*
    The trigger IS the button. Popconfirm does not wrap it in one.

    On native the deepest `Pressable` under the finger wins the touch responder,
    and it wins it whether or not it has an `onPress` of its own. So wrapping the
    trigger in Popconfirm's own `Pressable` only ever worked while the trigger was
    inert: pass the obvious thing — a kit `<Button>`, which is a `Pressable` — and
    the Button claims the responder, the wrapper's `onPress` never fires, and the
    confirm bubble never opens. Every destructive action in an app built on this
    kit was silently a no-op, and apps had to neutralise their own triggers with
    `<View pointerEvents="none">` to get the tap back — which then made the
    trigger's `disabled` cosmetic, because the wrapper opened the dialog anyway.
    The kit's own test hid all of it for one reason: it passed a bare `<Text>`.

    Cloning the trigger and injecting `onPress` fixes it at the root. There is one
    pressable instead of two nested ones, so there is no responder to lose; a
    `disabled` trigger stays disabled, because the press dies in the trigger's own
    `Pressable`, which is what `disabled` means; and the `<button>`-inside-a-
    `<button>` nesting the old wrapper was careful to avoid under react-native-web
    cannot arise at all now, because there is no wrapper left to be a button.

    Anything the trigger already does on press runs first, then the bubble opens.
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
      <Modal visible={open} transparent animationType="fade" onRequestClose={cancel}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }}>
          <Pressable
            accessibilityLabel="Close"
            onPress={cancel}
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
            accessibilityRole="alert"
            style={{
              width: 240,
              maxWidth: '100%',
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.md,
              padding: tokens.spacing.md,
            }}
          >
            {typeof message === 'string' ? (
              <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.onSurface, marginBottom: tokens.spacing.md }}>
                {message}
              </Text>
            ) : (
              <View style={{ marginBottom: tokens.spacing.md }}>{message}</View>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: tokens.spacing.sm }}>
              <Pressable
                accessibilityRole="button"
                onPress={cancel}
                style={{
                  borderRadius: tokens.radius.sm,
                  paddingVertical: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                }}
              >
                <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{cancelLabel}</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  onConfirm();
                  setOpen(false);
                }}
                style={{
                  backgroundColor: colors.danger,
                  borderRadius: tokens.radius.sm,
                  paddingVertical: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                }}
              >
                <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.onPrimary }}>{confirmLabel}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
