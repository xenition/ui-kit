import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  tone?: BadgeTone;
  /** `solid` (default) fills the tone; `soft` tints it; `outline` rings it. */
  variant?: BadgeVariant;
  /** Size scale. Defaults to the historical `md`. */
  size?: BadgeSize;
  /** Render as a tiny status dot (optionally alongside a label). */
  dot?: boolean;
  /** Numeric count; when set it becomes the label, clamped by `max`. */
  count?: number;
  /** Cap for `count` before rolling over to `${max}+` (default 99). */
  max?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

interface ToneSlots {
  /** Filled background slot. */
  solidBg: keyof SemanticColors;
  /** Text on the filled background. */
  solidFg: keyof SemanticColors;
  /** Vivid accent used for soft fills / outlines / dots. */
  accent: keyof SemanticColors;
}

const TONE: Record<BadgeTone, ToneSlots> = {
  neutral: { solidBg: 'border', solidFg: 'onSurface', accent: 'onSurface' },
  primary: { solidBg: 'primary', solidFg: 'onPrimary', accent: 'primary' },
  success: { solidBg: 'success', solidFg: 'onSuccess', accent: 'success' },
  warn: { solidBg: 'warn', solidFg: 'onWarn', accent: 'warn' },
  danger: { solidBg: 'danger', solidFg: 'onDanger', accent: 'danger' },
  accent: { solidBg: 'accent', solidFg: 'onAccent', accent: 'accent' },
};

const SIZE: Record<BadgeSize, { padV: number; padKey: 'xs' | 'sm'; text: 'xs' | 'sm' }> = {
  sm: { padV: 1, padKey: 'xs', text: 'xs' },
  md: { padV: 2, padKey: 'sm', text: 'xs' },
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
 * Small status/label pill — the native mirror of the web `Badge`. Token-bound
 * per tone; the default (`neutral`, `solid`, `md`) renders exactly as before.
 * Additive: `accent` tone, `soft`/`outline` variants, `sm` size, a `dot` status
 * mode, and a numeric `count` (`max`-capped to `${max}+`). No literal colors.
 */
export function Badge({
  tone = 'neutral',
  variant = 'solid',
  size = 'md',
  dot = false,
  count,
  max = 99,
  style,
  children,
}: BadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const slots = TONE[tone];
  const accentColor = colors[slots.accent];
  const sz = SIZE[size];

  const label =
    count !== undefined ? (count > max ? `${max}+` : String(count)) : children;

  let bg: string;
  let fg: string;
  let borderWidth = 0;
  let borderColor = 'transparent';
  if (variant === 'solid') {
    bg = colors[slots.solidBg];
    fg = colors[slots.solidFg];
  } else if (variant === 'soft') {
    bg = withAlpha(accentColor, 0.14);
    fg = accentColor;
  } else {
    bg = 'transparent';
    fg = accentColor;
    borderWidth = 1;
    borderColor = accentColor;
  }

  const dotSize = size === 'sm' ? 6 : 8;

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: bg,
          borderWidth,
          borderColor,
          borderRadius: tokens.radius.full,
          paddingVertical: sz.padV,
          paddingHorizontal: tokens.spacing[sz.padKey],
        },
        style,
      ]}
    >
      {dot ? (
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: accentColor,
          }}
        />
      ) : null}
      {typeof label === 'string' ? (
        <Text style={{ color: fg, fontSize: tokens.typography.scale[sz.text], fontWeight: '500' }}>
          {label}
        </Text>
      ) : (
        label
      )}
    </View>
  );
}
