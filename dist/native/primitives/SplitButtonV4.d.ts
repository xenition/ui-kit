import * as React from 'react';
import type { SplitButtonAction, SplitButtonProps, SplitButtonVariant } from './SplitButton';
export type { SplitButtonProps as SplitButtonV4Props, SplitButtonAction, SplitButtonVariant };
/**
 * **V4 split button** — same props as {@link SplitButton}, a different design
 * line.
 *
 * A split button is two tap targets fused into one shape, and both of them were
 * too small to hit.
 *
 * 1. **Both halves are real targets.** The face was `spacing.sm` of vertical
 *    padding around a 16px label — about 36pt — and the caret was 28pt wide.
 *    Every one of those numbers is under the 44 a finger needs, on the control
 *    a screen puts its *primary* action in. Both now have a 44 floor in both
 *    axes, and so does every row of the menu.
 * 2. **The colours are measured.** `secondary` labelled itself `colors.primary`
 *    — a FILL slot, guaranteed against `onPrimary` and against nothing else —
 *    and a destructive menu row took `colors.danger` the same way. Both move to
 *    the compiler's `*Text` forms, and `muted` (a disabled row) is walked to AA
 *    as well, because none of the three carried a promise about the page. The
 *    outlined face also paints `surface` instead of `transparent`, so the
 *    ground its label was measured against is the ground it is printed on.
 * 3. **The seam is an opaque colour.** It was the face colour at 40% *alpha*,
 *    so on the outlined variant it was 40% of `primary` over whatever happened
 *    to be behind the button. V4 composites the same 40% once, into the face,
 *    so the seam is a colour the control owns.
 * 4. **The menu floats, and looks like it.** It had no shadow at all — a panel
 *    overlapping the page with nothing to say it is above it. `elevation.card`
 *    is the seed's own answer, and a `depth: 'flat'` seed zeroes it with no
 *    branch here.
 * 5. **The caret turns.** It swapped between two static angles, so the one
 *    moving part of the control teleported. It now animates on §36.2's
 *    micro-feedback clock and an ease-out — and holds still under Reduce
 *    Motion, where the angle is set on the frame the state changes (§36.10).
 *
 * The caret glyph comes from the kit's named icon set rather than a `▾` typed
 * into this file, and the menu's minimum width is composed from the spacing
 * scale rather than the literal 160 it used to be.
 */
export declare function SplitButtonV4({ label, onPress, actions, variant, disabled, style, }: SplitButtonProps): React.ReactElement;
//# sourceMappingURL=SplitButtonV4.d.ts.map