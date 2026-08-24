import * as React from 'react';
import { Modal as RNModal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Themed modal dialog — the native mirror of the web `Modal`. Wraps RN's
 * `Modal`; the backdrop scrim is the darkest neutral ramp step faded via
 * `opacity`, so every rendered color stays a pure theme token.
 */
export function Modal({ open, onClose, title, children }: ModalProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: tokens.spacing.lg }}>
        <Pressable
          accessibilityLabel="Close"
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: tokens.ramps.neutral[950],
            opacity: 0.5,
          }}
        />
        <View
          style={{
            width: '100%',
            maxWidth: 480,
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
          }}
        >
          {title != null &&
            (typeof title === 'string' ? (
              <Text
                style={{
                  fontSize: tokens.typography.scale.lg,
                  fontWeight: '600',
                  color: colors.onSurface,
                  marginBottom: tokens.spacing.md,
                }}
              >
                {title}
              </Text>
            ) : (
              title
            ))}
          {children}
        </View>
      </View>
    </RNModal>
  );
}
