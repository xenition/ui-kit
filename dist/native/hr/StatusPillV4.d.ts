import * as React from 'react';
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
export declare function StatusPillV4({ meta, variant, size, accessibilityLabel, decorative, testID, style, }: StatusPillV4Props): React.ReactElement;
//# sourceMappingURL=StatusPillV4.d.ts.map