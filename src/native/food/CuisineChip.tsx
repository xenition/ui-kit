import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';

export type CuisineChipSize = 'sm' | 'md';

export interface CuisineChipProps {
  /** Cuisine / category label (e.g. "Thai", "Desserts"). */
  label: string;
  /** Optional leading glyph/emoji. */
  glyph?: string;
  /** Selected state — fills with the `primary` token pair. */
  selected?: boolean;
  /** Press handler. When provided the chip is a filter toggle (`radio`-like). */
  onPress?: () => void;
  /** Disable the chip. */
  disabled?: boolean;
  /** Size (default `md`). */
  size?: CuisineChipSize;
  style?: StyleProp<ViewStyle>;
}

/**
 * A pill chip for a cuisine / category filter. When `onPress` is given it acts
 * as a selectable filter and its selected state is carried in
 * `accessibilityState.selected` (never signalled by color alone); without
 * `onPress` it is a static label. Selected chips use the `primary`/`onPrimary`
 * token pair. Token-only.
 */
export function CuisineChip({
  label,
  glyph,
  selected = false,
  onPress,
  disabled = false,
  size = 'md',
  style,
}: CuisineChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const padV = size === 'sm' ? 4 : tokens.spacing.xs;
  const padH = size === 'sm' ? tokens.spacing.sm : tokens.spacing.md;
  const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;

  const fg = selected ? colors.onPrimary : colors.onSurface;

  const chipStyle: StyleProp<ViewStyle> = [
    {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.xs,
      paddingVertical: padV,
      paddingHorizontal: padH,
      borderRadius: tokens.radius.full,
      borderWidth: 1,
      borderColor: selected ? colors.primary : colors.border,
      backgroundColor: selected ? colors.primary : colors.surface,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  const inner = (
    <>
      {glyph ? <Icon glyph={glyph} size="xs" style={{ color: fg }} /> : null}
      <Text style={{ color: fg, fontSize, fontWeight: '600' }}>{label}</Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected, disabled }}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [chipStyle, { opacity: disabled ? 0.5 : pressed ? 0.85 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={chipStyle}>{inner}</View>;
}
