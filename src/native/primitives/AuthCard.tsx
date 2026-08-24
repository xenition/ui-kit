import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from './Card';

export interface AuthCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Wrapper style override — the native mirror of the web `className`. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Centered card shell for auth screens (LoginForm/SignupForm/…) — the native
 * mirror of the web `AuthCard`. A themed `Card` holding an optional title +
 * subtitle, the form `children`, and an optional footer. Token-bound; no
 * literal colors. (`className` → `style` is the only idiomatic swap.)
 */
export function AuthCard({
  title,
  subtitle,
  children,
  footer,
  style,
}: AuthCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={[{ width: '100%', maxWidth: 384, alignSelf: 'center' }, style]}>
      <Card style={{ gap: tokens.spacing.md }}>
        {title != null || subtitle != null ? (
          <View style={{ gap: tokens.spacing.xs }}>
            {title != null ? (
              typeof title === 'string' ? (
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                  }}
                >
                  {title}
                </Text>
              ) : (
                title
              )
            ) : null}
            {subtitle != null ? (
              typeof subtitle === 'string' ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {subtitle}
                </Text>
              ) : (
                subtitle
              )
            ) : null}
          </View>
        ) : null}
        {children}
        {footer != null ? (
          <View style={{ alignItems: 'center' }}>
            {typeof footer === 'string' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {footer}
              </Text>
            ) : (
              footer
            )}
          </View>
        ) : null}
      </Card>
    </View>
  );
}
