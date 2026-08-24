import * as React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ActionSheetAction {
  label: string;
  onSelect?: () => void;
  /** Render in the danger tone (destructive action). */
  destructive?: boolean;
  disabled?: boolean;
}

export interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  /** Optional heading above the action list. */
  title?: string;
  actions: ActionSheetAction[];
  /** Cancel-button label (default `Cancel`). */
  cancelLabel?: string;
}

/**
 * iOS-style action sheet — a bottom-anchored `Modal` presenting a token-bound
 * list of choices plus a separated Cancel affordance, over a translucent
 * `onSurface` scrim. Distinct from `Drawer(side="bottom")` (arbitrary content)
 * and `Menu` (tap-anchored list) by the iOS grouped list + destructive/cancel
 * convention. Destructive actions use the `danger` token. No literal colors.
 */
export function ActionSheet({
  open,
  onClose,
  title,
  actions,
  cancelLabel = 'Cancel',
}: ActionSheetProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable
          accessibilityLabel="Close"
          onPress={onClose}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.onSurface, opacity: 0.5 }}
        />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View
            accessibilityRole="menu"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.lg,
              overflow: 'hidden',
            }}
          >
            {title ? (
              <View style={{ paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.muted, textAlign: 'center' }}>{title}</Text>
              </View>
            ) : null}
            {actions.map((action, i) => (
              <Pressable
                key={i}
                accessibilityRole="menuitem"
                accessibilityState={{ disabled: action.disabled }}
                disabled={action.disabled}
                onPress={() => {
                  action.onSelect?.();
                  onClose();
                }}
                style={({ pressed }) => ({
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.lg,
                  alignItems: 'center',
                  borderTopWidth: i === 0 && !title ? 0 : 1,
                  borderTopColor: colors.border,
                  opacity: action.disabled ? 0.5 : 1,
                  backgroundColor: pressed ? colors.border : colors.surface,
                })}
              >
                <Text
                  style={{
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '500',
                    color: action.destructive ? colors.danger : colors.primary,
                  }}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            onPress={onClose}
            style={({ pressed }) => ({
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.lg,
              paddingVertical: tokens.spacing.md,
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text style={{ fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }}>
              {cancelLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
