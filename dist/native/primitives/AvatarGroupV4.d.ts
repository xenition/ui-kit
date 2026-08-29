import * as React from 'react';
import type { AvatarGroupProps } from './AvatarGroup';
export type { AvatarGroupProps as AvatarGroupV4Props };
/**
 * **V4 avatar stack** — same props as {@link AvatarGroup}, a different design
 * line. Built on `AvatarV4`, so every face in it carries the derived monogram
 * ground and a roster stops being a row of identical brand discs.
 *
 * Four changes, all of them about the stack rather than the faces:
 *
 * 1. **The overlap is a fraction, not eight pixels.** `-8` is 33% of an `xs`
 *    avatar and 11% of an `xl` one, so the base stack was cramped at small
 *    sizes and fell apart into a loose row at large ones. A fraction of the
 *    diameter holds the same rhythm at every size (§9 — spacing is structure,
 *    and structure that changes meaning with size is not structure).
 * 2. **The first face is on top.** DOM order put the LAST avatar over the ones
 *    before it, so the stack read right-to-left while the eye and the data both
 *    run the other way. V4 reverses the z-order: the leading face is whole, and
 *    each one after it tucks behind — which is what makes a stack read as an
 *    ordered list instead of a pile.
 * 3. **A `+N` that is not pretending to be a person.** The base overflow chip
 *    was a filled disc the same weight as a face, so a group of four people
 *    plus three more looked like five people. V4 gives it the page's own
 *    surface, a hairline, and muted text — present, countable, clearly not a
 *    face (§10: typography before containers, §6: hierarchy before styling).
 * 4. **No `+1`.** Collapsing a single extra avatar into a `+1` chip costs the
 *    same width and tells the reader less, so V4 simply shows the person. `max`
 *    is a budget, not a ceremony.
 *
 * The separating outline between overlapping faces is `colors.surface` — the
 * page colour, resolved for the active scheme. `tokens.ramps` is not, and a
 * near-white hairline between faces on a dark page is exactly the bug that
 * arrives when a stack reaches for `ramps.neutral[50]`.
 */
export declare function AvatarGroupV4({ avatars, max, size, style, }: AvatarGroupProps): React.ReactElement;
//# sourceMappingURL=AvatarGroupV4.d.ts.map