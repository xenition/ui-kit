import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Progress, useXenitionTheme } from '../primitives';

export type ReadingProgressVariant = 'bar' | 'labeled';

export interface ReadingProgressProps {
  /**
   * How far through the article the reader is, `0`–`1` (clamped). Typically
   * derived from a scroll offset: `offsetY / (contentHeight - viewportHeight)`.
   */
  progress: number;
  /**
   * - `bar`     — a thin token-styled progress bar (default), for pinning to
   *               the top of a reader.
   * - `labeled` — bar plus a "42%" readout.
   */
  variant?: ReadingProgressVariant;
  style?: StyleProp<ViewStyle>;
}

/** Clamp an arbitrary number into the `[0, 1]` reading fraction. */
function clampFraction(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

/**
 * A reading-progress indicator for an article reader — the thin bar that fills
 * as the reader scrolls. Composes the `Progress` primitive (0–100 scale) from a
 * clamped `0`–`1` fraction, so a scroll handler can drive it directly. A
 * `labeled` variant adds a percentage readout. Announced as a progress bar to
 * screen readers. All colors come from `SemanticColors`; no literal hex.
 */
export function ReadingProgress({
  progress,
  variant = 'bar',
  style,
}: ReadingProgressProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const fraction = clampFraction(progress);
  const pct = Math.round(fraction * 100);

  if (variant === 'labeled') {
    return (
      <View
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
      >
        <View style={{ flex: 1 }}>
          <Progress value={pct} max={100} tone="primary" size="sm" />
        </View>
        <Text
          accessibilityLabel={`${pct} percent read`}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', minWidth: 34, textAlign: 'right' }}
        >
          {`${pct}%`}
        </Text>
      </View>
    );
  }

  return (
    <View accessibilityLabel={`${pct} percent read`} style={style}>
      <Progress value={pct} max={100} tone="primary" size="sm" />
    </View>
  );
}
