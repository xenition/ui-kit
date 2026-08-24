import * as React from 'react';
import { ActivityIndicator, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface LoadingOverlayProps {
  /** When false the overlay renders nothing. */
  visible: boolean;
  /** Optional label beneath the spinner. */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Blocking loading overlay — an absolute-fill dim layer with a centered spinner
 * (tinted from the `primary` token) and an optional label. The dim is the
 * `onSurface` token faded via opacity; the label card is `surface`. Fills its
 * nearest positioned ancestor, so wrap it in a `position: relative` parent (or
 * let it cover the screen). Announces a polite busy live region. No literals.
 */
export function LoadingOverlay({ visible, label, style }: LoadingOverlayProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!visible) return null;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? 'Loading'}
      accessibilityLiveRegion="polite"
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.onSurface,
          opacity: 0.4,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing.lg,
          paddingHorizontal: tokens.spacing.xl,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        {label ? (
          <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.onSurface, textAlign: 'center' }}>
            {label}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
