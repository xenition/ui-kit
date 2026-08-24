import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ContextMenuAction {
  label: string;
  /** Fires on select; the menu closes afterwards. */
  onSelect?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Render in the danger tone (e.g. Delete). */
  danger?: boolean;
}

export interface ContextMenuProps {
  /** Actions shown after a long-press. */
  actions: ContextMenuAction[];
  /** The element to long-press. */
  children: React.ReactNode;
  accessibilityLabel?: string;
}

/**
 * Long-press context menu — wraps `children` in a `Pressable` whose
 * `onLongPress` opens a centered, token-bound action list in a `Modal` over a
 * translucent `onSurface` scrim (RN has no anchored DOM portal). Distinct from
 * `Menu` (tap-to-open) by the long-press gesture. Selecting an action fires
 * `onSelect` and dismisses. Danger actions use the `danger` token. No literals.
 */
export function ContextMenu({ actions, children, accessibilityLabel }: ContextMenuProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? 'Open context menu'}
        accessibilityHint="Long press for actions"
        onLongPress={() => setOpen(true)}
        delayLongPress={350}
      >
        {children}
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }}>
          <Pressable
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.onSurface, opacity: 0.5 }}
          />
          <View
            accessibilityRole="menu"
            style={{
              minWidth: 200,
              maxHeight: '70%',
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
            }}
          >
            <ScrollView>
              {actions.map((action, i) => (
                <Pressable
                  key={i}
                  accessibilityRole="menuitem"
                  accessibilityState={{ disabled: action.disabled }}
                  disabled={action.disabled}
                  onPress={() => {
                    action.onSelect?.();
                    setOpen(false);
                  }}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    opacity: action.disabled ? 0.5 : 1,
                    backgroundColor: pressed ? colors.border : colors.surface,
                  })}
                >
                  {action.icon != null ? <View>{action.icon}</View> : null}
                  <Text
                    style={{
                      fontSize: tokens.typography.scale.base,
                      color: action.danger ? colors.danger : colors.onSurface,
                    }}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
