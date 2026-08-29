import * as React from 'react';
import type { SplitButtonAction, SplitButtonProps, SplitButtonVariant } from './SplitButton';
export type { SplitButtonProps as SplitButtonV4Props, SplitButtonAction, SplitButtonVariant };
/**
 * **V4 split button** — the web twin of the native `SplitButtonV4`, same props
 * as {@link SplitButton}, a different design line.
 *
 * A split button is two click targets fused into one shape, and both of them
 * were too small to hit.
 *
 * 1. **Both halves are real targets.** `py-2` around a 16px label is roughly
 *    40px and the caret's `px-2` made it about 28px wide — both under the 44 a
 *    finger needs, on the control a screen puts its *primary* action in. Both
 *    now have a 44px floor in both axes, and so does every row of the menu.
 * 2. **The colours are measured.** `secondary` labelled itself `text-primary`
 *    — the FILL slot, guaranteed against `on-primary` and against nothing else
 *    — and a destructive menu row took `text-danger` the same way. Both move to
 *    the compiler's `-text` forms, and a disabled row's `muted` is walked to AA
 *    per scheme, because none of the three carried a promise about the page.
 *    The outlined face also paints `surface` rather than `transparent`, so the
 *    ground its label was measured against is the ground it is printed on.
 * 3. **The seam is an opaque colour.** It was the face colour at 40% *opacity*,
 *    so on the outlined variant it was 40% of `primary` over whatever happened
 *    to be behind the button. `color-mix` composites the same 40% once, into
 *    the face, so the seam is a colour the control owns.
 * 4. **The menu floats on the seed's own shadow.** `shadow-lg` is a fixed
 *    utility that cannot know a shadow on a dark page needs MORE opacity;
 *    `elevation.card` does, and a `depth: 'flat'` seed zeroes it with no branch
 *    in this file.
 * 5. **The caret turns, and stops turning when asked.** Its
 *    `transition-transform` had no duration, no curve and no reduced-motion
 *    guard. It now runs on §36.2's micro-feedback clock and an ease-out, and
 *    drops the transition entirely under `prefers-reduced-motion` (§36.10).
 * 6. **The focus ring is the brand.** `ring-primary-300` is a pale tint nobody
 *    measured against the face it sits on.
 *
 * The caret glyph comes from the kit's named icon set rather than a `▾` typed
 * into this file, and the menu's minimum width and padding come from the
 * spacing scale rather than `10rem` and `px-3 py-2`.
 */
export declare function SplitButtonV4({ label, onClick, actions, variant, disabled, className, }: SplitButtonProps): React.ReactElement;
//# sourceMappingURL=SplitButtonV4.d.ts.map