import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type WordmarkSize = 'sm' | 'md' | 'lg';

export interface WordmarkProps {
  /** Brand name rendered bold in the heading weight. */
  name: string;
  /**
   * Leading logomark slot. Omit for the default themed token square; pass a
   * node to override, or `null` to render the name alone.
   */
  mark?: React.ReactNode;
  /** Type + mark scale (default `md`). */
  size?: WordmarkSize;
  /** When set, the wordmark becomes pressable (the native swap for `as="a"`). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

// Font size + logomark square (px) per size — mirrors the web sm/md/lg scale.
const SIZE: Record<WordmarkSize, { font: number; mark: number }> = {
  sm: { font: 16, mark: 16 },
  md: { font: 18, mark: 20 },
  lg: { font: 24, mark: 28 },
};

/**
 * Themed brand wordmark — the native mirror of the web `Wordmark`. A token
 * logomark square (primary, rounded) plus the name in bold `onSurface`. Native
 * headings convey the heading font via weight (no `fontFamily`), matching every
 * other native marketing/primitive component. Pass `onPress` to make it a
 * tappable header brand; omit for a static label. Token-only — no literal
 * colors.
 */
export function Wordmark({
  name,
  mark,
  size = 'md',
  onPress,
  style,
}: WordmarkProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dims = SIZE[size];
  const gap = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;

  const defaultMark = (
    <View
      style={{
        width: dims.mark,
        height: dims.mark,
        borderRadius: tokens.radius.sm,
        backgroundColor: colors.primary,
      }}
    />
  );

  const content = (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap }, style]}>
      {mark === undefined ? defaultMark : mark}
      <Text
        style={{
          fontSize: dims.font,
          fontWeight: '700',
          color: colors.onSurface,
        }}
      >
        {name}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="link" accessibilityLabel={name}>
        {content}
      </Pressable>
    );
  }
  return content;
}
