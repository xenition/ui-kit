import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { MIN_NON_TEXT_CONTRAST, TINT, TONE_SLOTS } from '../../primitives/internal/feedback-v4';
import { ensureContrast } from '../../theme/color';
import type { ProgressProps, ProgressTone } from './Progress';

export type { ProgressProps as ProgressV4Props, ProgressTone };

/**
 * **V4 progress** — same props as {@link Progress}, a different design line.
 *
 * ## The bar reports a number, so it may not be decorated
 *
 * A progress bar is the one component in the feedback line that carries a
 * *quantity*, and `design.md` §8's ban on meaningless charts applies to it
 * exactly: anything that makes the length harder to read has cost more than it
 * added.
 *
 * So the fill is **flat**. No gradient across it, at any depth. A bar that
 * fades toward its leading edge has no leading edge — the reader cannot say
 * where "done" stops, which is the only thing the component exists to say. And
 * no shadow: a bar is a mark on the page, not an object above it.
 *
 * ## The track belongs to the bar
 *
 * The base painted the track from `colors.border` — a correct neutral, but one
 * with no relationship to the thing filling it. V4 composites the fill's own
 * tone into `surface` at 10%, so the track reads as *the same quantity,
 * unfilled*: one colour at two strengths rather than a grey channel with a
 * coloured liquid in it. Compositing rather than fading keeps it opaque, so the
 * bar looks the same on a card, on glass and on the page.
 *
 * The fill is then held to 3:1 against that track — WCAG's bar for a meaningful
 * graphic, which is what the boundary between done and not-done is.
 *
 * ## `warn` is `warn`
 *
 * The base native `Progress` routed `warn` to the `accent` token, with the
 * comment "no warning slot in the primitive token whitelist". There is one, its
 * own web twin already used it, and §35.4 is explicit that a brand colour may
 * not stand in for a semantic one.
 *
 * ## A started task must look started
 *
 * At 1% of a 200px bar the fill rounds to two pixels and, with a radius on both
 * ends, to nothing at all — the bar reports "nothing has happened" about a task
 * that has begun. So a non-zero value paints at least the bar's own height. It
 * is a floor, not a scale: capped at the thickness, it can never be mistaken
 * for meaningful width, and at zero the fill is genuinely zero.
 *
 * ## Shape follows the seed
 *
 * `radius.full` is 9999 on a rounded or pill brand and **0 on a sharp one**, so
 * a sharp seed gets a square-ended bar instead of the capsule §8 lists among
 * the tells of generic AI UI. No branch needed — the token already knows.
 */
export function ProgressV4({
  value,
  max = 100,
  tone = 'primary',
  size = 'md',
  style,
}: ProgressProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // `primary` is the neutral-progress case and has no semantic meaning of its
  // own; the other three are the tone they name, `warn` included.
  const slot = TONE_SLOTS[tone === 'primary' ? 'info' : tone].fill;
  const toneColor = colors[slot];

  const track = mixToken(colors.surface, toneColor, TINT);
  const fill = ensureContrast(toneColor, track, MIN_NON_TEXT_CONTRAST);

  // Thickness from the spacing scale, so a denser theme gets a finer bar.
  const height = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
  const pct = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      style={[
        {
          width: '100%',
          height,
          borderRadius: tokens.radius.full,
          backgroundColor: track,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        testID="xen-v4-progress-fill"
        style={{
          height: '100%',
          width: `${pct}%`,
          // A floor, not a scale — see the docstring.
          minWidth: pct > 0 ? height : 0,
          borderRadius: tokens.radius.full,
          backgroundColor: fill,
        }}
      />
    </View>
  );
}
