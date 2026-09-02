import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { onPair, pillGround, toneFill, toneInk } from './internal/tone-v4';
import type { StatusPillProps } from './StatusPill';

export interface StatusPillV4Props extends StatusPillProps {
  /** Announced instead of the pill's own word. Default: `meta.label`. */
  accessibilityLabel?: string;
  /**
   * Hide the pill from the screen reader.
   *
   * For the common case where the pill sits inside a row whose accessible name
   * already carries the status — announcing "Denied" twice in a row is worse
   * than announcing it once. Default `false`.
   */
  decorative?: boolean;
  testID?: string;
}

/**
 * **V4 status pill** — same props as {@link StatusPill} plus
 * `accessibilityLabel`, `decorative` and `testID`.
 *
 * ## Four changes
 *
 * 1. **The two halves of the pill grow together.** The base pinned the glyph
 *    with `allowFontScaling={false}` and left the word to scale, so a user on
 *    200% Dynamic Type got a 12pt "✓" beside a 24pt "Approved" — the tick
 *    stranded at the bottom of a line twice its height, on every status in the
 *    module. Neither half is pinned now: type that is information scales, and
 *    it scales at the same rate on both sides of the gap.
 * 2. **The word is inked with ink.** `toneColor()` returns `colors[tone]` — the
 *    **fill** slot — and the base assigned it straight to `color:`. A rendered
 *    audit measured `primary` as text at 1.32:1. Soft and inline pills now take
 *    the contrast-corrected `*Text` slots via `toneInk()`, and only a `solid`
 *    pill (which really is drawing on its tone) uses the fill, with the
 *    compiler's own paired ink on top via `onPair()` rather than the base's
 *    hand-written five-branch ladder.
 * 3. **The soft ground is opaque.** `withAlpha(tint, 0.14)` is a translucent
 *    wash, so the identical pill was a different colour on a card, on a tinted
 *    open-shift row and over the page — and the label's contrast against it was
 *    whatever happened to be behind. It is composited against `card` once.
 * 4. **The pill is one announced object, or none.** The base put an
 *    `accessibilityLabel` on a plain `View` with no `accessible`, which
 *    announces nothing and leaves the glyph and the word as two loose text
 *    nodes; a reader heard "check mark" and then "Approved".
 */
export function StatusPillV4({
  meta,
  variant = 'soft',
  size = 'md',
  accessibilityLabel,
  decorative = false,
  testID,
  style,
}: StatusPillV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const solid = variant === 'solid';
  const inline = variant === 'inline';
  const textSize = size === 'sm' ? 'xs' : 'sm';

  const ground = solid
    ? toneFill(theme, meta.tone)
    : inline
      ? 'transparent'
      : pillGround(theme, meta.tone);
  // Ink with ink: `onPair` on a fill, the `*Text` slot everywhere else.
  const ink = solid ? onPair(theme, meta.tone) : toneInk(theme, meta.tone);

  const reader = decorative
    ? {
        accessibilityElementsHidden: true,
        importantForAccessibility: 'no-hide-descendants' as const,
      }
    : {
        accessible: true,
        accessibilityRole: 'text' as const,
        accessibilityLabel: accessibilityLabel ?? meta.label,
      };

  return (
    <View
      {...reader}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: tokens.spacing.xs / 2,
          backgroundColor: ground,
          borderRadius: tokens.radius.full,
          paddingVertical: inline ? 0 : tokens.spacing.xs / 2,
          paddingHorizontal: inline ? 0 : tokens.spacing.xs,
        },
        style,
      ]}
    >
      <TextV4 size={textSize} style={{ color: ink }}>
        {meta.glyph}
      </TextV4>
      <TextV4 size={textSize} weight="semibold" style={{ color: ink }}>
        {meta.label}
      </TextV4>
    </View>
  );
}
