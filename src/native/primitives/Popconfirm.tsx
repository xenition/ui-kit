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
      <Pressable accessibilityRole="button" onPress={() => setOpen(true)}>
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
              <Text style={{ fontSize: 14, color: colors.onSurface, marginBottom: tokens.spacing.md }}>
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
                <Text style={{ fontSize: 12, color: colors.muted }}>{cancelLabel}</Text>
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
                <Text style={{ fontSize: 12, color: colors.onPrimary }}>{confirmLabel}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
