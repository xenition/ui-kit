import * as React from 'react';
import { Modal as RNModal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

/**
 * The scrim.
 *
 * NOT a semantic token. `onSurface` inverts with the scheme — near-black on a
 * light page, near-WHITE on a dark one — so a scrim built from it paints a 50%
 * white veil over a dark app. Three of this kit's four overlays did exactly
 * that; verified at the warm-neutral seed, where dark `onSurface` compiles to
 * `#eeeded`.
 *
 * `ramps.neutral[950]` (what this file used before) does NOT invert and was
 * therefore correct — but at `#23211f` it is the same colour as a dark page,
 * so the scrim all but vanished in dark mode. Black separates in both schemes.
 *
 * A scrim is not "a dark colour from the palette". It is the absence of light,
 * and absence does not have a brand.
 */
const SCRIM = '#000000';
const SCRIM_OPACITY = 0.5;

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
            backgroundColor: SCRIM,
            opacity: SCRIM_OPACITY,
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
