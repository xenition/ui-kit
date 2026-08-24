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
  /**
   * The same accent as TEXT.
   *
   * `soft` and `outline` put the label on the page rather than on a fill — a 14%
   * tint is still essentially the surface underneath — so the label is text on
   * `surface`, where a fill colour carries no contrast guarantee. Measured at
   * 1.32:1 on the soft accent tone. The border and the dot keep `accent`: both
   * are UI boundaries judged at 3:1, not text.
   */
  text: keyof SemanticColors;
}

/**
 * Every tone pairs a background with the `on*` colour compiled for THAT
 * background.
 *
 * This map used to carry `onPrimary` as the foreground for success, warn and
 * danger, kept for historical reasons. The compiler only guarantees WCAG AA
 * between a colour and its own partner — `onPrimary` on `primary`, `onDanger`
 * on `danger` — so pairing `onPrimary` with `danger` guarantees nothing, and a
 * rendered audit measured it at 2.30:1 against the danger fill.
 *
 * `warn` was also filled with `accent` rather than `warn`, which made the
 * warning tone render in the brand's secondary colour. A semantic colour has to
 * mean what it says.
 *
 * Badge's identical map already had all of this right; the two now agree.
 */
const TONE: Record<TagTone, ToneSlots> = {
  neutral: { solidBg: 'border', solidFg: 'onSurface', accent: 'onSurface', text: 'onSurface' },
  primary: { solidBg: 'primary', solidFg: 'onPrimary', accent: 'primary', text: 'primaryText' },
  success: { solidBg: 'success', solidFg: 'onSuccess', accent: 'success', text: 'successText' },
  warn: { solidBg: 'warn', solidFg: 'onWarn', accent: 'warn', text: 'warnText' },
  danger: { solidBg: 'danger', solidFg: 'onDanger', accent: 'danger', text: 'dangerText' },
  accent: { solidBg: 'accent', solidFg: 'onAccent', accent: 'accent', text: 'accentText' },
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
  const textColor = colors[slots.text];
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
    fg = textColor;
  } else {
    bg = 'transparent';
    fg = textColor;
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
