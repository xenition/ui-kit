import * as React from 'react';
import {
  Modal,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PopoverProps {
  /** Pressable trigger (`onClick`→`onPress`). */
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

  return (
    <>
      <Pressable accessibilityRole="button" onPress={() => setOpen(!isOpen)}>
        {trigger}
      </Pressable>
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
