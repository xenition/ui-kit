import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type ProgressTone = 'primary' | 'success' | 'warn' | 'danger';

export interface ProgressProps {
  /** Current value. */
  value: number;
  /** Maximum value (default 100). */
  max?: number;
  tone?: ProgressTone;
  /** Bar thickness. */
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
}

const HEIGHT: Record<NonNullable<ProgressProps['size']>, number> = { sm: 6, md: 10 };

/**
 * Linear progress bar — the native mirror of the web `Progress`. A token-styled
 * track with a colored fill sized to `value/max` (clamped to [0, max]). The
 * fill color keys off the tone (`warn`→accent, since there is no warning slot in
 * the primitive token whitelist). The web `Progress` is bar-only — there is no
 * circular variant to simplify away. No literal colors.
 */
export function Progress({
  value,
  max = 100,
  tone = 'primary',
  size = 'md',
  style,
}: ProgressProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const fill: Record<ProgressTone, string> = {
    primary: colors.primary,
    success: colors.success,
    warn: colors.accent,
    danger: colors.danger,
  };
  const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      style={[
        {
          width: '100%',
          height: HEIGHT[size],
          borderRadius: tokens.radius.full,
          backgroundColor: colors.border,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: tokens.radius.full,
          backgroundColor: fill[tone],
        }}
      />
    </View>
  );
}
