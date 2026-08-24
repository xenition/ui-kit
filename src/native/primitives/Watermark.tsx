import * as React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface WatermarkProps {
  /** The repeated text (e.g. `'CONFIDENTIAL'`, a username). */
  text: string;
  /** Content the watermark overlays. */
  children?: React.ReactNode;
  /** Tile repetition count (rows × cols is derived from this). Default `24`. */
  count?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Watermark — tiles faint, diagonally-rotated repeating text across its
 * children as a non-interactive overlay (`pointerEvents="none"`). The text is
 * the `muted` token at low opacity so it stays a pure theme color; the overlay
 * never intercepts touches. Useful for "confidential" / ownership marks over
 * documents or previews. No literal colors.
 */
export function Watermark({ text, children, count = 24, style }: WatermarkProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tiles = Array.from({ length: Math.max(1, count) });

  return (
    <View style={[{ position: 'relative', overflow: 'hidden' }, style]}>
      {children}
      <View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          StyleSheet.absoluteFillObject,
          {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
            opacity: 0.08,
            transform: [{ rotate: '-30deg' }, { scale: 1.4 }],
          },
        ]}
      >
        {tiles.map((_, i) => (
          <Text
            key={i}
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '700',
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.md,
            }}
          >
            {text}
          </Text>
        ))}
      </View>
    </View>
  );
}
