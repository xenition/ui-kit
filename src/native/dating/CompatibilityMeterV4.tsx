import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SpacingScale } from '../../theme/types';
import { TextV4 } from '../primitives/TextV4';
import type { TextSize } from '../primitives/Text';
import { mixToken } from '../../primitives/internal/v4-depth';
import { clampPercent, toneFill } from '../primitives/internal/tone-v4';
import { skeletonFill, toneInk, type ToneV4 } from './internal/profile-v4';
import type { CompatibilityMeterProps, CompatibilityMeterSize } from './CompatibilityMeter';

export interface CompatibilityMeterV4Props extends CompatibilityMeterProps {
  /** Render the percentage. Default `'82%'`. */
  formatValue?: (value: number) => string;
}

/**
 * Ring diameters, composed from the spacing scale: **48 / 64 / 96**
 * (`2xl`, `2xl + md`, `2xl * 2`). The stroke is `xs` — 4 — at every size.
 *
 * Both numbers are here rather than at the call site because "the same ring on
 * both twins" is the requirement, and a ring that is 88 on one platform and 96
 * on the other is the same defect as a button that is 64 and 68.
 */
function ringDiameter(spacing: SpacingScale, size: CompatibilityMeterSize): number {
  if (size === 'sm') return spacing['2xl'];
  return size === 'md' ? spacing['2xl'] + spacing.md : spacing['2xl'] * 2;
}

/** The numeral inside the ring, at each diameter. */
const RING_TEXT: Record<CompatibilityMeterSize, TextSize> = { sm: 'base', md: 'lg', lg: '2xl' };

/**
 * The compact pill's ground: the same quantity, unfilled — a neutral track
 * composited into `surface`, not a tone tint, so the pill does not read as a
 * second, weaker copy of the band colour.
 */
const TRACK_MIX = 0.1;

/** Score bands → tone and word. The word is what carries the band. */
function bandFor(score: number): { tone: ToneV4; word: string } {
  if (score >= 80) return { tone: 'success', word: 'Great match' };
  if (score >= 55) return { tone: 'primary', word: 'Good match' };
  if (score >= 30) return { tone: 'accent', word: 'Some overlap' };
  return { tone: 'neutral', word: 'Low overlap' };
}

/**
 * **V4 compatibility meter** — same props as {@link CompatibilityMeter} plus
 * `formatValue`.
 *
 * ## Five changes
 *
 * 1. **`compact` is a meter.** It draws a percentage and a band word, and the
 *    base announced it as `role="text"` — so a screen-reader user got a
 *    sentence where every other variant of the same component gave them a
 *    value they could compare. `ProfileCard`'s compact row is the *only*
 *    place the score appears in a list, which is exactly where comparing
 *    matters. All three variants are now `progressbar` with the same
 *    `accessibilityValue`.
 * 2. **The band reaches the bar's number.** On the bar variant the base drew
 *    "82% · Great match" in `muted` — the one variant where the band colour
 *    was thrown away, and `muted` is a ramp step with no contrast promise
 *    besides. It takes the band's corrected ink now, as the ring already did.
 * 3. **`muted` is not spent as a 4px ring and a status dot.** The low band
 *    painted both from the `muted` *fill* slot — a ramp step with no contrast
 *    promise, in the two roles that most need one. The low band's ring takes
 *    the hairline instead, and the dot is gone: the numeral is already drawn
 *    in the band's own ink, so the dot was a second, weaker copy of it. The
 *    pill's ground is a neutral track composited into `surface` rather than a
 *    translucent tone wash that changes colour with whatever is behind it.
 * 4. **The bar is the band's own colour.** `ProgressTone` has no `accent` and
 *    no `neutral`, so the base routed the "Some overlap" band through `warn` —
 *    a status colour for a middling match, on a bar that disagreed with the
 *    number printed directly above it. The meter draws its own two-`View` bar
 *    against the same neutral track the compact pill uses.
 * 5. **The number is formattable.** `formatValue` replaces the hard-coded
 *    `${n}%`, so a locale that does not write percent that way can say so.
 */
export function CompatibilityMeterV4({
  score,
  label = 'Compatibility',
  showValue = true,
  variant = 'bar',
  size = 'md',
  loading = false,
  formatValue,
  style,
}: CompatibilityMeterV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const clamped = Math.round(clampPercent(score) ?? 0);
  const band = bandFor(clamped);
  // The corrected slot for the numeral — `primary` as text measured as low as
  // 1.32:1 on a pale seed, and `muted` promises nothing at all.
  const ink = toneInk(theme, band.tone);
  // The ring is a boundary judged at 3:1, so it keeps the vivid fill; the low
  // band takes the hairline rather than spending `muted` on a 4px stroke.
  const ring = band.tone === 'neutral' ? colors.border : toneFill(theme, band.tone);
  const track = mixToken(colors.surface, colors.onSurface, TRACK_MIX);
  const valueText = (formatValue ?? ((v: number) => `${v}%`))(clamped);
  const spoken = `${label}: ${valueText}, ${band.word}`;

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel={`${label}: loading`}
        style={[{ gap: tokens.spacing.xs }, style]}
      >
        <View
          style={{
            height: tokens.typography.scale.sm,
            width: '55%',
            borderRadius: tokens.radius.sm,
            backgroundColor: skeletonFill(theme),
          }}
        />
        <View
          style={{
            height: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: skeletonFill(theme),
          }}
        />
      </View>
    );
  }

  if (variant === 'ring') {
    const d = ringDiameter(tokens.spacing, size);
    return (
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clamped }}
        accessibilityLabel={spoken}
        style={[{ alignItems: 'center', gap: tokens.spacing.xs }, style]}
      >
        <View
          style={{
            width: d,
            height: d,
            // Geometry, not `radius.full`: a dial is a circle in every brand,
            // including a `sharp` seed where the token compiles to 0.
            borderRadius: d / 2,
            borderWidth: tokens.spacing.xs,
            borderColor: ring,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {showValue ? (
            <TextV4
              size={RING_TEXT[size]}
              weight="bold"
              numeric="tabular"
              style={{ color: ink }}
            >
              {valueText}
            </TextV4>
          ) : null}
        </View>
        <TextV4 size="xs" tone="mutedText">
          {band.word}
        </TextV4>
      </View>
    );
  }

  if (variant === 'compact') {
    return (
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clamped }}
        accessibilityLabel={spoken}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: tokens.spacing.xs,
            backgroundColor: track,
            borderRadius: tokens.radius.full,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
          },
          style,
        ]}
      >
        {/* No status dot: the base spent `muted` on one, and the numeral in
            the band's own ink already says everything the dot did. */}
        <TextV4 size="sm" weight="semibold" numeric="tabular" style={{ color: ink }}>
          {valueText}
        </TextV4>
        <TextV4 size="sm" tone="mutedText">
          {band.word}
        </TextV4>
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clamped }}
      accessibilityLabel={spoken}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextV4 size="sm" weight="semibold" tone="onSurface">
          {label}
        </TextV4>
        {showValue ? (
          <TextV4 size="sm" weight="semibold" numeric="tabular" style={{ color: ink }}>
            {valueText} · {band.word}
          </TextV4>
        ) : null}
      </View>
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: '100%',
          height: size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm,
          borderRadius: tokens.radius.full,
          overflow: 'hidden',
          backgroundColor: track,
        }}
      >
        <View
          style={{
            width: `${clamped}%`,
            height: '100%',
            borderRadius: tokens.radius.full,
            backgroundColor: toneFill(theme, band.tone),
          }}
        />
      </View>
    </View>
  );
}
