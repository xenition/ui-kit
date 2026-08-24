import * as React from 'react';
import { Animated, View, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SkeletonProps {
  /** Shape of the placeholder. */
  variant?: 'text' | 'rect' | 'circle';
  /** Width (number = px, string = percentage). */
  width?: DimensionValue;
  /** Height (number = px, string = percentage). */
  height?: DimensionValue;
  /** For `text`: render N stacked lines (last one shorter). */
  lines?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Shimmering loading placeholder — the native mirror of the web `Skeleton`.
 * Where the web shape shimmers via `animate-pulse`, native drives an `Animated`
 * opacity loop. The block is filled with the `muted` token; the corner radius is
 * keyed off the variant (`circle`→full, `rect`→md, `text`→sm). No literal colors.
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  style,
}: SkeletonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const opacity = React.useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  const radius =
    variant === 'circle' ? tokens.radius.full : variant === 'rect' ? tokens.radius.md : tokens.radius.sm;

  const block = (w: DimensionValue, h: DimensionValue): React.ReactElement => (
    <Animated.View
      accessibilityRole="none"
      style={{ width: w, height: h, borderRadius: radius, backgroundColor: colors.muted, opacity }}
    />
  );

  if (variant === 'text' && lines > 1) {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        {Array.from({ length: lines }).map((_, i) =>
          React.cloneElement(block(i === lines - 1 ? '60%' : '100%', height ?? 14), { key: i })
        )}
      </View>
    );
  }

  return (
    <View style={style}>{block(width ?? (variant === 'text' ? '100%' : 40), height ?? (variant === 'text' ? 14 : 40))}</View>
  );
}
