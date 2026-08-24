import * as React from 'react';
import { Text, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

export interface SectionProps extends ViewProps {
  title?: string;
  subtitle?: string;
  /** Vertical gap between the header and the content, from the spacing scale. */
  spacing?: SpaceKey;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * A titled content block: an optional `title`/`subtitle` header followed by its
 * children, separated by a token-bound `spacing` gap. Type sizes, colors, and
 * spacing all trace to the compiled theme; no literal colors.
 */
export function Section({
  title,
  subtitle,
  spacing = 'md',
  style,
  children,
  ...rest
}: SectionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasHeader = Boolean(title || subtitle);
  return (
    <View style={[{ gap: tokens.spacing[spacing] }, style]} {...rest}>
      {hasHeader ? (
        <View style={{ gap: tokens.spacing.xs }}>
          {title ? (
            <Text
              accessibilityRole="header"
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '600',
              }}
            >
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}
