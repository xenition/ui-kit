import * as React from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gradient } from '../commerce/internal/Gradient';
import { withAlpha } from './internal/color';
import { usePressScale } from './internal/motion';
import { gradientInk } from '../../primitives/internal/v4-depth';
import type { ElevationToken } from '../../theme/types';
import type { ButtonProps, ButtonSize, ButtonTone, ButtonVariant } from './Button';

export type { ButtonProps as ButtonV4Props, ButtonSize, ButtonTone, ButtonVariant };

/**
 * Convert a {@link GradientToken} angle (degrees clockwise from "up") into the
 * `start`/`end` unit points `expo-linear-gradient` wants. Kept here rather than
 * hard-coding `{0,0}→{1,1}` so the compiler stays the single owner of the
 * gradient's direction.
 */
function angleToPoints(angle: number): {
  start: { x: number; y: number };
  end: { x: number; y: number };
} {
  const radians = (angle * Math.PI) / 180;
  // Screen space: y grows downwards, so "up" is -cos.
  const dx = Math.sin(radians);
  const dy = -Math.cos(radians);
  return {
    start: { x: 0.5 - dx / 2, y: 0.5 - dy / 2 },
    end: { x: 0.5 + dx / 2, y: 0.5 + dy / 2 },
  };
}

/** RN shadow style from an {@link ElevationToken}. `held` sits it back down. */
function elevationStyle(token: ElevationToken, held: boolean): ViewStyle {
  const k = held ? 0.5 : 1;
  return {
    shadowColor: token.color,
    shadowOpacity: token.opacity * k,
    shadowRadius: token.radius * k,
    shadowOffset: { width: 0, height: token.offsetY * k },
    elevation: Math.round(token.android * k),
  };
}

/**
 * **V4 button** — same props as {@link Button}, a different design line.
 *
 * What makes it premium is restraint, not decoration. Exactly one thing on the
 * screen carries the brand gradient: `variant="primary"` at the default tone —
 * the single dominant action `design.md` §5 asks every screen to have. Every
 * other variant is flat with a crisp hairline, because §8 lists "gradients on
 * every button" as the first tell of generic AI UI and §35.11 asks that
 * gradients stay rare and purposeful. A `danger` or `success` primary is solid,
 * never gradient: §35.4 says semantic colours are not brand colours, and a
 * destructive action wearing the brand sweep reads as a promotion.
 *
 * The depth comes from `elevation.action` and a press that genuinely depresses
 * — scale plus a shadow that sits back down — rather than from an opacity dip.
 * Both are read straight off the theme, so a `depth: 'flat'` seed gets a flat
 * button with no branch anywhere in this file: the tokens are already inert.
 *
 * Motion is `usePressScale`, which is reduced-motion aware by construction
 * (§36.10); with Reduce Motion on, the scale stays at 1 and the elevation
 * change alone carries the feedback, so nothing depends on the animation.
 */
export function ButtonV4({
  variant = 'primary',
  size = 'md',
  tone = 'default',
  onPress,
  onPressIn,
  onPressOut,
  disabled = false,
  loading = false,
  style,
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens, gradient, elevation } = theme;
  const press = usePressScale();
  const [held, setHeld] = React.useState(false);

  const isDisabled = disabled || loading;
  const spacing = tokens.spacing;

  // Generous vertical rhythm — every height clears the 44px touch target at
  // `md` and above, composed from the spacing scale rather than picked.
  const HEIGHT: Record<ButtonSize, number> = {
    sm: spacing.xl + spacing.xs,
    md: spacing['2xl'] - spacing.xs,
    lg: spacing['2xl'] + spacing.sm,
  };
  const PAD_X: Record<ButtonSize, number> = {
    sm: spacing.md,
    md: spacing.lg,
    lg: spacing.xl,
  };
  const TEXT: Record<ButtonSize, 'sm' | 'base' | 'lg'> = { sm: 'sm', md: 'base', lg: 'lg' };

  /** Fill / on-fill / on-surface-text triple per tone (see the base `Button`). */
  const TONE_COLOR: Record<ButtonTone, { base: string; on: string; text: string }> = {
    default: { base: colors.primary, on: colors.onPrimary, text: colors.primaryText },
    primary: { base: colors.primary, on: colors.onPrimary, text: colors.primaryText },
    danger: { base: colors.danger, on: colors.onDanger, text: colors.dangerText },
    success: { base: colors.success, on: colors.onSuccess, text: colors.successText },
  };
  const { base, on, text } = TONE_COLOR[tone];

  // The one place a gradient is allowed: the brand-toned primary action.
  const brandAction = variant === 'primary' && (tone === 'default' || tone === 'primary');
  // Legible stops + the ink that reads on both. Untouched when the compiler's
  // own pair already clears AA, which is the common case.
  const brand = gradientInk(gradient.brand, colors.onPrimary, {
    darkest: tokens.ramps.neutral[950],
    lightest: tokens.ramps.neutral[50],
  });

  let bg = 'transparent';
  let fg = on;
  let borderWidth = 0;
  let borderColor = 'transparent';
  let underline = false;
  let raise: ElevationToken | null = null;

  switch (variant) {
    case 'primary':
      // `from` doubles as the flat fill under the gradient overlay, so the
      // shadow has an opaque layer to fall from and a `depth: 'flat'` seed
      // (where `from === to`) lands on exactly the same solid colour.
      bg = brandAction ? brand.from : base;
      fg = brandAction ? brand.ink : on;
      raise = elevation.action;
      break;
    case 'secondary':
      bg = colors.surface;
      fg = text;
      borderWidth = 1;
      borderColor = colors.border;
      break;
    case 'ghost':
      fg = tone === 'default' ? colors.onSurface : text;
      break;
    case 'outline':
      fg = tone === 'default' ? colors.onSurface : text;
      borderWidth = 1;
      borderColor = colors.border;
      break;
    case 'soft':
      bg = withAlpha(base, 0.12);
      fg = text;
      break;
    case 'link':
      fg = text;
      underline = true;
      break;
    case 'elevated':
      bg = colors.surface;
      fg = tone === 'default' ? colors.onSurface : text;
      borderWidth = 1;
      borderColor = colors.border;
      raise = elevation.card;
      break;
  }

  const points = angleToPoints(gradient.brand.angle);

  const handlePressIn: PressableProps['onPressIn'] = (event) => {
    setHeld(true);
    press.onPressIn();
    onPressIn?.(event);
  };
  const handlePressOut: PressableProps['onPressOut'] = (event) => {
    setHeld(false);
    press.onPressOut();
    onPressOut?.(event);
  };

  return (
    <Animated.View
      style={[
        {
          borderRadius: tokens.radius.md,
          backgroundColor: bg,
          borderWidth,
          borderColor,
          opacity: isDisabled ? theme.state.disabledContent : 1,
          transform: [{ scale: press.scale }],
        },
        raise ? elevationStyle(raise, held) : null,
        style,
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
          minHeight: HEIGHT[size],
          paddingHorizontal: PAD_X[size],
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        }}
        {...rest}
      >
        {brandAction ? (
          <Gradient
            colors={[brand.from, brand.to]}
            start={points.start}
            end={points.end}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        {loading ? (
          <View accessibilityElementsHidden>
            <ActivityIndicator size="small" color={fg} />
          </View>
        ) : null}
        {typeof children === 'string' ? (
          <Text
            style={{
              color: fg,
              fontSize: tokens.typography.scale[TEXT[size]],
              fontFamily: tokens.typography.fontBody,
              fontWeight: '600',
              textDecorationLine: underline ? 'underline' : 'none',
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Pressable>
    </Animated.View>
  );
}
