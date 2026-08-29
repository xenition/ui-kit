import * as React from 'react';
import { Text as RNText, type TextStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { TextAlign, TextProps, TextSize, TextTone, TextWeight } from './Text';

export type { TextSize, TextTone, TextWeight, TextAlign };

/** Which of the seed's two faces a run of text is set in. */
export type TextV4Face = 'auto' | 'heading' | 'body';

/** Numeral setting. `tabular` gives every figure the same advance width. */
export type TextV4Numeric = 'proportional' | 'tabular';

export interface TextV4Props extends TextProps {
  /**
   * Typeface. Default `'auto'` — display steps (`xl` and above) take the
   * seed's heading face, everything else takes its body face.
   */
  face?: TextV4Face;
  /**
   * Cap the line length at a comfortable reading measure. Default `false`.
   *
   * §4 asks that a subhead "not run the full width on a tablet"; this is that
   * rule as a prop, so a caller does not have to hand-roll a `maxWidth`.
   */
  measure?: boolean;
  /** Numeral setting. Default `'proportional'`. */
  numeric?: TextV4Numeric;
}

const WEIGHT_VALUE: Record<TextWeight, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

/**
 * Leading, as a unitless ratio of the resolved font size.
 *
 * The base `Text` runs 1.5 for body, 1.375 at `lg` and 1.25 above — which are
 * Tailwind's `normal / snug / tight` ratios reached through the web twin, i.e.
 * a framework's defaults rather than this kit's decision. V4 opens the body end
 * and closes the display end, which is most of the difference between the
 * reference onboarding screens and what shipped: a paragraph of grey subhead at
 * 1.5 reads dense on a phone, and a 30px headline at 1.25 reads as two
 * disconnected lines.
 *
 * Keep in step with `LEADING_CLASS` in the web twin — the same numbers.
 */
const LEADING_RATIO: Record<TextSize, number> = {
  xs: 1.5,
  sm: 1.55,
  base: 1.6,
  lg: 1.5,
  xl: 1.35,
  '2xl': 1.25,
  '3xl': 1.2,
};

/**
 * Optical tracking, as a ratio of the em — multiplied by the resolved font
 * size here, because React Native's `letterSpacing` is in points and CSS's
 * `em` is not.
 *
 * One tracking across a 12→30px range is wrong at both ends. Small text loses
 * the word-shape a reader scans by and wants air; display sizes set at the
 * default tracking read loose and unresolved, which is a large part of why the
 * shipped headlines felt generic. It is a *ratio* rather than a point value
 * for the reason `EyebrowV4` gives: the web tracked at `0.22em` and native at
 * `2px`, so the same word was two different widths on a laptop and a phone.
 *
 * Keep in step with `TRACKING_CLASS` in the web twin.
 */
const TRACKING_RATIO: Record<TextSize, number> = {
  xs: 0.01,
  sm: 0.005,
  base: 0,
  lg: 0,
  xl: -0.01,
  '2xl': -0.015,
  '3xl': -0.02,
};

/** The steps that read as display type rather than as copy. */
const DISPLAY_SIZES: readonly TextSize[] = ['xl', '2xl', '3xl'];

/**
 * The measure a run of copy is allowed to reach, as a multiple of the spacing
 * scale's largest step — the same `2xl × 7` expression `EmptyStateV4` and
 * `ResultV4` already compose, so the kit has one answer to "how wide is a
 * comfortable line" and a re-scaled seed re-scales it.
 */
const MEASURE_STEPS = 7;

/**
 * **V4 text** — the base `Text`'s props plus three, a different design line.
 *
 * This is the typographic foundation the whole auth/onboarding family reads
 * from, so it is the one component where getting the *defaults* right matters
 * more than what it can be told to do. Three changes, and nothing else.
 *
 * 1. **The face is bound.** The base `Text` sets no `fontFamily` at all, so a
 *    native screen falls through to San Francisco / Roboto while its web twin
 *    inherits the seed's face — the same sentence in two typefaces across one
 *    product. That is exactly the defect `LabelV4` documented for `Label`, and
 *    it is worse here because `Text` is where nearly all of a screen's type
 *    comes from. V4 binds it: display steps take the seed's heading face, copy
 *    takes its body face, and `face` overrides either way.
 * 2. **Copy gets air, display gets tightened.** See {@link LEADING_RATIO}. The
 *    "airy, generous" feel of the reference screens is almost entirely leading.
 * 3. **Tracking is optical.** See {@link TRACKING_RATIO}. A 30px headline and a
 *    12px caption cannot share one tracking and both look deliberate.
 *
 * What V4 deliberately does **not** do is change `weight`. A `3xl` at the
 * default `regular` is thin, and it is tempting to bump it — but a component
 * that silently disobeys the weight it was handed is a worse bug than a
 * headline that needs `weight="bold"` (which is what §4 asks the caller for).
 *
 * There is no press feedback and no state layer here on purpose. Text is not
 * interactive; `motion-v4` and `state-v4` exist for controls, and animating a
 * colour on every `Text` in an app would be decoration bought with a re-render
 * (§7 — subtraction before addition).
 *
 * Renders RN's `Text` underneath and forwards the rest of its props, so
 * `numberOfLines`, `onPress`, `selectable`, `ellipsizeMode`, `accessibilityRole`
 * and friends work exactly as they do on the base. `style` is for layout only.
 */
export function TextV4({
  size = 'base',
  tone = 'onSurface',
  weight = 'regular',
  align = 'auto',
  face = 'auto',
  measure = false,
  numeric = 'proportional',
  numberOfLines,
  style,
  children,
  ...rest
}: TextV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const fontSize = tokens.typography.scale[size];
  const display = DISPLAY_SIZES.includes(size);
  const resolvedFace = face === 'auto' ? (display ? 'heading' : 'body') : face;

  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        {
          color: colors[tone],
          fontFamily:
            resolvedFace === 'heading'
              ? tokens.typography.fontHeading
              : tokens.typography.fontBody,
          fontSize,
          lineHeight: fontSize * LEADING_RATIO[size],
          letterSpacing: fontSize * TRACKING_RATIO[size],
          fontWeight: WEIGHT_VALUE[weight],
          textAlign: align,
          ...(measure ? { maxWidth: tokens.spacing['2xl'] * MEASURE_STEPS } : null),
          ...(numeric === 'tabular' ? { fontVariant: ['tabular-nums' as const] } : null),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
