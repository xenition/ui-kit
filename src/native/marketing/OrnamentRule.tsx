import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type OrnamentShape = 'diamond' | 'dot' | 'line' | 'none';
export type OrnamentTone = 'accent' | 'primary' | 'border';

export interface OrnamentRuleProps {
  /** Centered ornament: rotated diamond, round dot, short bar, or none (plain rule). */
  ornament?: OrnamentShape;
  /** Token family tinting the rule and ornament (default `accent` — the "brass" look). */
  tone?: OrnamentTone;
  style?: StyleProp<ViewStyle>;
}

/**
 * Editorial divider — the native mirror of the web `OrnamentRule`: a 1px rule
 * flanking an optional centered diamond/dot/line ornament. Purely decorative
 * and static, token-tinted via `tone`.
 *
 * The web version fades each half of the rule with a horizontal gradient
 * (`linear-gradient` + `color-mix`). React Native has no CSS gradients here, so
 * the fade is **approximated with a solid low-opacity token border** — the tint
 * always originates from a theme token, so no literal color is introduced.
 */
export function OrnamentRule({
  ornament = 'diamond',
  tone = 'accent',
  style,
}: OrnamentRuleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const toneColor =
    tone === 'accent'
      ? tokens.ramps.accent[400]
      : tone === 'primary'
        ? tokens.ramps.primary[400]
        : colors.border;

  // Solid low-opacity token color approximating the web gradient fade.
  const ruleColor = withAlpha(toneColor, 0.4);

  const ornamentStyle: ViewStyle | null =
    ornament === 'none'
      ? null
      : ornament === 'diamond'
        ? { width: 7, height: 7, transform: [{ rotate: '45deg' }] }
        : ornament === 'dot'
          ? { width: 6, height: 6, borderRadius: 9999 }
          : { width: 24, height: 1 };

  return (
    <View
      testID="xen-ornament-rule"
      accessibilityRole="none"
      style={[
        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
        style,
      ]}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: ruleColor }} />
      {ornamentStyle ? (
        <View
          style={{
            marginHorizontal: tokens.spacing.md,
            backgroundColor: toneColor,
            ...ornamentStyle,
          }}
        />
      ) : null}
      <View style={{ flex: 1, height: 1, backgroundColor: ruleColor }} />
    </View>
  );
}
