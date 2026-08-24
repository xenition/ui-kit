import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type TagVariant = 'solid' | 'soft' | 'outline';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  tone?: TagTone;
  /** `solid` (default) fills the tone; `soft` tints it; `outline` rings it. */
  variant?: TagVariant;
  /** Size scale. Defaults to the historical `md`. */
  size?: TagSize;
  /** Force the remove (×) affordance even without `onRemove`. */
  removable?: boolean;
  /** Leading status dot. */
  dot?: boolean;
  /** Renders a remove (×) button that calls this. */
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

interface ToneSlots {
  /** Filled background slot. */
  solidBg: keyof SemanticColors;
  /** Text on the filled background (historical values preserved). */
  solidFg: keyof SemanticColors;
  /** Vivid accent used for soft fills / outlines / dots. */
  accent: keyof SemanticColors;
}

/** Historical solid fg values are kept (success/warn/danger used `onPrimary`). */
const TONE: Record<TagTone, ToneSlots> = {
  neutral: { solidBg: 'border', solidFg: 'onSurface', accent: 'onSurface' },
  primary: { solidBg: 'primary', solidFg: 'onPrimary', accent: 'primary' },
  success: { solidBg: 'success', solidFg: 'onPrimary', accent: 'success' },
  warn: { solidBg: 'accent', solidFg: 'onPrimary', accent: 'accent' },
  danger: { solidBg: 'danger', solidFg: 'onPrimary', accent: 'danger' },
  accent: { solidBg: 'accent', solidFg: 'onAccent', accent: 'accent' },
};

const SIZE: Record<TagSize, { padV: number; padKey: 'xs' | 'sm'; text: 'xs' | 'sm' }> = {
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
 * Removable chip/tag — the native mirror of the web `Tag`. Token-bound per tone;
 * the default (`neutral`, `solid`, `md`) renders exactly as before. Additive:
 * `accent` tone, `soft`/`outline` variants, `sm` size, a leading `dot`, and a
 * `removable` flag (× also shows whenever `onRemove` is set). No literal colors.
 */
export function Tag({
  tone = 'neutral',
  variant = 'solid',
  size = 'md',
  removable = false,
  dot = false,
  onRemove,
  style,
  children,
}: TagProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const slots = TONE[tone];
  const accentColor = colors[slots.accent];
  const sz = SIZE[size];

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

  const showRemove = removable || onRemove != null;
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
          borderRadius: tokens.radius.sm,
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
            backgroundColor: fg,
          }}
        />
      ) : null}
      {typeof children === 'string' ? (
        <Text style={{ color: fg, fontSize: tokens.typography.scale[sz.text], fontWeight: '500' }}>
          {children}
        </Text>
      ) : (
        children
      )}
      {showRemove ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Remove" onPress={onRemove} hitSlop={8}>
          <Text style={{ color: fg, fontSize: tokens.typography.scale[sz.text], fontWeight: '500' }}>
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
