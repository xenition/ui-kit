import * as React from 'react';
import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type IcebreakerChipSize = 'sm' | 'md';
export type IcebreakerChipVariant = 'soft' | 'outline' | 'solid';

export interface IcebreakerChipProps {
  /** The prompt shown on the chip (e.g. "Coffee or tea?"). */
  label: string;
  /** Value reported to `onPress`; falls back to `label`. */
  value?: string;
  /** Selected/answered state (drawn AND announced, never color-only). */
  selected?: boolean;
  /** Disabled (already used / unavailable). */
  disabled?: boolean;
  /** Visual weight. Defaults to `soft`. */
  variant?: IcebreakerChipVariant;
  /** Size scale. Defaults to `md`. */
  size?: IcebreakerChipSize;
  /** Leading glyph (emoji). */
  glyph?: string;
  /** Fires the chip's `value` (or `label`) when tapped. */
  onPress?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Tappable conversation-starter chip — the native icebreaker. A person picks a
 * prompt to break the ice; `selected` reflects an already-chosen prompt and is
 * surfaced to screen readers via `accessibilityState.selected` (not color
 * alone). All colors derive from theme tokens through `withAlpha` tints — no
 * literal colors.
 */
export function IcebreakerChip({
  label,
  value,
  selected = false,
  disabled = false,
  variant = 'soft',
  size = 'md',
  glyph,
  onPress,
  style,
}: IcebreakerChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
  const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
  const textKey = size === 'sm' ? 'xs' : 'sm';

  const accent = colors.primary;
  let bg = 'transparent';
  let fg = colors.onSurface;
  let borderColor = 'transparent';
  let borderWidth = 0;

  if (selected) {
    bg = accent;
    fg = colors.onPrimary;
  } else if (variant === 'solid') {
    bg = withAlpha(accent, 0.2);
    fg = accent;
  } else if (variant === 'soft') {
    bg = withAlpha(accent, 0.12);
    fg = accent;
  } else {
    borderWidth = 1;
    borderColor = colors.border;
    fg = colors.onSurface;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={label}
      disabled={disabled}
      onPress={() => onPress?.(value ?? label)}
      style={({ pressed }) => [
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: bg,
          borderColor,
          borderWidth,
          borderRadius: tokens.radius.full,
          paddingVertical: padV,
          paddingHorizontal: padH,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {glyph ? (
        <Text style={{ fontSize: tokens.typography.scale[textKey] }} allowFontScaling={false}>
          {glyph}
        </Text>
      ) : null}
      <Text style={{ color: fg, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }}>
        {label}
      </Text>
    </Pressable>
  );
}
