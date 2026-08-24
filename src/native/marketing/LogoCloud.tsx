import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface LogoCloudProps {
  /** Logo slots (strings are rendered as muted text; nodes rendered as-is). */
  logos: React.ReactNode[];
  /** Small line above the logos ("Trusted by…"). */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Row of partner/customer logos — the native mirror of the web `LogoCloud`. The
 * web version dims/desaturates until hover; native has no hover, so each slot is
 * rendered at a fixed reduced opacity (simplification). String logos render as
 * muted text; node logos are rendered as-is. Token-only.
 */
export function LogoCloud({ logos, label, style }: LogoCloudProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      testID="xen-logo-cloud"
      style={[{ alignItems: 'center', gap: tokens.spacing.md }, style]}
    >
      {label !== undefined ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xl,
        }}
      >
        {logos.map((logo, i) => (
          <View key={i} testID="xen-logo" style={{ opacity: 0.6 }}>
            {typeof logo === 'string' ? (
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale.lg,
                  fontWeight: '600',
                }}
              >
                {logo}
              </Text>
            ) : (
              logo
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
