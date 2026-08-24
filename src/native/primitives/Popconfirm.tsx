import * as React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PopconfirmProps {
  /** Pressable trigger (e.g. a Delete button). */
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

  return (
    <>
      {/*
        A transparent tap surface, and deliberately NOT a `button`.

        This wraps whatever the caller passed as `trigger`, and the natural thing
        to pass is a `<Button>` — which is itself a `Pressable`. Give this wrapper
        `accessibilityRole="button"` and react-native-web renders both as real
        `<button>` elements, so the trigger becomes a `<button>` inside a
        `<button>`: invalid HTML, two React `validateDOMNesting` errors on every
        mount, and an unpredictable click target. On native it is just as wrong,
        announcing "button" twice to a screen reader.

        The web twin does the same thing for the same reason — it wraps the
        trigger in a plain `<span onClick>`. The role belongs to the trigger,
        which already declares its own; this layer only needs to catch the press.
      */}
      <Pressable onPress={() => setOpen(true)}>
        {trigger}
      </Pressable>
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
