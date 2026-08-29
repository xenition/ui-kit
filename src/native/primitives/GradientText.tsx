import * as React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { gradientInk, mixToken } from '../../primitives/internal/v4-depth';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';

/** Token-ramp gradient recipes; mirrors the web `GradientText` ramps. */
export type GradientTextRamp = 'primary' | 'accent' | 'primary-accent' | 'accent-primary';

export interface GradientTextProps {
  /** Which theme ramp(s) drive the color (default `primary-accent`). */
  ramp?: GradientTextRamp;
  /**
   * Gradient angle in degrees. Accepted for prop parity with the web
   * `GradientText`; ignored on native (see note below).
   */
  angle?: number;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

/**
 * Ramp-driven emphasis text — the native mirror of the web `GradientText`.
 *
 * React Native has no `background-clip: text`, so true clipped-gradient text
 * requires a `MaskedView` + `expo-linear-gradient` composition. The kit does
 * **not** pull in `@react-native-masked-view/masked-view`, so native paints a
 * solid instead — but a solid taken **from the brand gradient**, not from a
 * ramp step chosen by hand.
 *
 * This component predates `gradient.brand`. It used to paint
 * `tokens.ramps.primary[500]`, which is wrong twice over: `ramps` carries the
 * LIGHT orientation in both schemes, so the "energy word" on a dark page was
 * lit by a light-mode colour; and step 500 is a fill step whose contrast
 * against the page nobody had measured, on text whose entire job is to be read.
 *
 * Now the colour comes from `gradient.brand` — the compiler's own
 * primary→accent sweep, already resolved for the active scheme — run through
 * {@link gradientInk} against the page. The usual call asks "what ink reads on
 * this gradient"; here the gradient IS the ink and the page is what it has to
 * clear, so both extremes are the surface: step 2 collapses, and step 3 walks
 * each stop in lightness until it clears AA on the ground it is actually
 * printed on. Under `depth: 'flat'` the two stops are already the same colour,
 * so a flat seed lands on a flat brand colour with no branch here.
 *
 * `angle` is accepted for parity and has no visual effect; there is no sweep to
 * angle. (`expo-linear-gradient` is used for real gradient *surfaces* — e.g.
 * the commerce cover placeholder.)
 */
export function GradientText({
  ramp = 'primary-accent',
  angle: _angle,
  style,
  children,
}: GradientTextProps): React.ReactElement {
  const { colors, gradient } = useXenitionTheme();

  // The ink cannot move — it is the page — so both extremes are the ground and
  // the stops are what gets walked.
  const brand = gradientInk(gradient.brand, colors.surface, {
    darkest: colors.surface,
    lightest: colors.surface,
  });

  // A ramp name picks WHERE on the legible sweep the solid is taken from.
  const picked =
    ramp === 'primary'
      ? brand.from
      : ramp === 'accent'
        ? brand.to
        : mixToken(brand.from, brand.to, 0.5);

  // Two colours that each clear AA can still average into one that does not.
  const color = ensureContrast(picked, colors.surface, MIN_CONTRAST);

  return (
    <Text accessibilityRole="text" style={[{ color, fontWeight: '700' }, style]}>
      {children}
    </Text>
  );
}
