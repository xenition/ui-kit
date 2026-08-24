import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'sm' | 'md' | 'lg' | 'full';

export interface CardProps extends ViewProps {
  /**
   * Surface treatment. Defaults to the historical bordered surface
   * (`outlined`). `elevated` adds a token shadow, `flat` drops the border,
   * `interactive` keeps the border plus a subtle raise for tappable cards.
   */
  variant?: CardVariant;
  /** Padding scale. Defaults to the historical `lg` padding. */
  padding?: CardPadding;
  /** Corner radius scale. Defaults to the historical `lg` radius. */
  radius?: CardRadius;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Themed surface container — the native mirror of the web `Card`: token-bound
 * background, border, radius, and padding. The default (`outlined`, `lg`
 * padding, `lg` radius) renders exactly as before; `variant`/`padding`/`radius`
 * are additive opt-ins. No literal colors.
 */
export function Card({
  variant = 'outlined',
  padding,
  radius,
  style,
  children,
  ...rest
}: CardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const paddingValue =
    padding === undefined
      ? tokens.spacing.lg
      : padding === 'none'
        ? 0
        : tokens.spacing[padding];
  const radiusValue = radius === undefined ? tokens.radius.lg : tokens.radius[radius];

  const bordered = variant === 'outlined' || variant === 'interactive';
  const raised = variant === 'elevated' || variant === 'interactive';

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: bordered ? 1 : 0,
          borderRadius: radiusValue,
          padding: paddingValue,
        },
        raised
          ? {
              shadowColor: colors.onSurface,
              shadowOpacity: variant === 'elevated' ? 0.14 : 0.08,
              shadowRadius: variant === 'elevated' ? 12 : 6,
              shadowOffset: { width: 0, height: variant === 'elevated' ? 4 : 2 },
              elevation: variant === 'elevated' ? 4 : 2,
            }
          : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
