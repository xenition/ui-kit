import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { OrnamentRuleV4 } from './OrnamentRuleV4';
import type { SectionDividerProps, SectionDividerVariant } from './SectionDivider';

export type { SectionDividerVariant };

/** Drop-in for {@link SectionDividerProps} — same props, the V4 "showcase" design. */
export type SectionDividerV4Props = SectionDividerProps;

/**
 * SectionDivider — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: `hairline` and `fade` use CSS gradients on
 * web, which React Native lacks here, so both are **approximated with solid
 * low-opacity token fills** (the tint always originates from a theme token);
 * `ornament` delegates to the ornament rule. The V4 *refines* the look — a
 * two-segment `hairline` that reads brighter toward the center (approximating
 * the web's fuller primary→accent gradient), a taller/cleaner surface-tinted
 * `fade`, and the `ornament` variant delegating to `OrnamentRuleV4` so its
 * sharpened rule carries through. Every variant/ornament/tone is honored.
 *
 * **Native-simplified / web-only:** the web `parallax` prop is scroll-linked and
 * is kept for parity but does nothing on native — there is no scroll-linked
 * drift here, so nothing to honor for reduced motion. Token-only colors.
 */
export function SectionDividerV4({
  variant = 'hairline',
  parallax: _parallax,
  ornament = 'diamond',
  tone = 'accent',
  style,
}: SectionDividerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  void _parallax;

  if (variant === 'ornament') {
    return <OrnamentRuleV4 ornament={ornament} tone={tone} style={style} />;
  }

  if (variant === 'fade') {
    // Taller, cleaner surface-tinted melt (V4 refinement over the base band).
    return (
      <View
        testID="xen-section-divider-v4"
        accessibilityRole="none"
        style={[
          { height: tokens.spacing['2xl'], flexDirection: 'column' },
          style,
        ]}
      >
        <View style={{ flex: 1, backgroundColor: withAlpha(colors.surface, 0.35) }} />
        <View style={{ flex: 1, backgroundColor: withAlpha(colors.surface, 0.75) }} />
      </View>
    );
  }

  // hairline — two segments, brighter toward the center, approximating the web
  // V4's fuller primary→accent gradient with token-only fills.
  const p = tokens.ramps.primary[500];
  const a = tokens.ramps.accent[400];
  return (
    <View
      testID="xen-section-divider-v4"
      accessibilityRole="none"
      style={[{ height: 1, flexDirection: 'row' }, style]}
    >
      <View style={{ flex: 1, backgroundColor: withAlpha(p, 0.15) }} />
      <View style={{ flex: 1, backgroundColor: withAlpha(p, 0.7) }} />
      <View style={{ flex: 1, backgroundColor: withAlpha(a, 0.7) }} />
      <View style={{ flex: 1, backgroundColor: withAlpha(a, 0.15) }} />
    </View>
  );
}
