import * as React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'soft'
  | 'link'
  | 'elevated';
export type ButtonSize = 'sm' | 'md' | 'lg';
/** Recolors the button's accent. `default`/`primary` share the primary slot. */
export type ButtonTone = 'default' | 'primary' | 'danger' | 'success';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Semantic accent for the button (danger/success paths). */
  tone?: ButtonTone;
  /** Fires on press (RN equivalent of the web `onClick`). */
  onPress?: PressableProps['onPress'];
  disabled?: boolean;
  /** Show a spinner and block presses. */
  loading?: boolean;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const SIZE_TOKENS: Record<
  ButtonSize,
  { paddingKey: 'sm' | 'md' | 'lg'; textKey: 'sm' | 'base' | 'lg' }
> = {
  sm: { paddingKey: 'sm', textKey: 'sm' },
  md: { paddingKey: 'md', textKey: 'base' },
  lg: { paddingKey: 'lg', textKey: 'lg' },
};

/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Themed button — the native mirror of the web `Button`. Same
 * `variant`/`size`/`disabled` contract; `onPress` replaces the web `onClick`
 * and a `loading` flag renders a spinner. Additive `variant`s (`outline`,
 * `soft`, `link`, `elevated`) and a `tone` (`danger`/`success`) layer on top;
 * the defaults (`primary`/`secondary`/`ghost`, tone `default`) render exactly
 * as before. All colors/radii come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  tone = 'default',
  onPress,
  disabled = false,
  loading = false,
  style,
  children,
  ...rest
}: ButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const { paddingKey, textKey } = SIZE_TOKENS[size];

  const isDisabled = disabled || loading;

  /*
    Three roles, not two.

      base — the fill, and the border that matches it
      on   — what goes ON that fill (guaranteed AA against `base`)
      text — the same colour as TEXT on `surface` (guaranteed AA against it)

    `base` used to do double duty as both fill and label colour, which is fine
    for `primary` (where the label sits on the fill) and wrong for every variant
    where the label sits on the page. The audit measured `soft` at 2.66:1 in
    light. `text` is the same hue pushed until it clears, identical wherever the
    fill already cleared, so filled buttons are untouched.
  */
  const TONE_COLOR: Record<ButtonTone, { base: string; on: string; text: string }> = {
    default: { base: colors.primary, on: colors.onPrimary, text: colors.primaryText },
    primary: { base: colors.primary, on: colors.onPrimary, text: colors.primaryText },
    danger: { base: colors.danger, on: colors.onDanger, text: colors.dangerText },
    success: { base: colors.success, on: colors.onSuccess, text: colors.successText },
  };
  const { base, on, text } = TONE_COLOR[tone];

  // Per-variant resolution. Defaults are pinned to the historical look so any
  // existing usage renders byte-for-byte the same.
  let bg = 'transparent';
  let fg = on;
  let borderWidth = 0;
  let borderColor = 'transparent';
  let underline = false;
  let elevated = false;
  switch (variant) {
    case 'primary':
      bg = base;
      fg = on;
      break;
    case 'secondary':
      fg = text;
      borderWidth = 1;
      // The border keeps `base`: a border is a UI boundary at 3:1, not text.
      borderColor = base;
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
      // A 14% tint is still essentially the surface underneath, so the label is
      // text on `surface` — not text on a fill.
      bg = withAlpha(base, 0.14);
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
      elevated = true;
      break;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing[paddingKey],
          paddingHorizontal: tokens.spacing[paddingKey] * 1.6,
          backgroundColor: bg,
          borderWidth,
          borderColor,
          opacity: isDisabled ? 0.5 : pressed ? 0.85 : 1,
        },
        elevated
          ? {
              shadowColor: colors.onSurface,
              shadowOpacity: 0.12,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
            }
          : null,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <View style={{ marginRight: tokens.spacing.xs }}>
          <ActivityIndicator size="small" color={fg} />
        </View>
      ) : null}
      {typeof children === 'string' ? (
        <Text
          style={{
            color: fg,
            fontSize: tokens.typography.scale[textKey],
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
  );
}
