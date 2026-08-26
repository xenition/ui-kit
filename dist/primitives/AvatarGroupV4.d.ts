import * as React from 'react';
import type { AvatarGroupProps } from './AvatarGroup';
export type { AvatarGroupProps as AvatarGroupV4Props };
/**
 * **V4 avatar stack** — the web twin of the native `AvatarGroupV4`, same props
 * as {@link AvatarGroup}, a different design line. Built on `AvatarV4`, so
 * every face in it carries the derived monogram ground and a roster stops
 * being a row of identical brand-tinted discs.
 *
 * Four changes, all of them about the stack rather than the faces:
 *
 * 1. **The overlap is a fraction, not `-ml-2`.** Eight pixels is 33% of an
 *    `xs` avatar and 11% of an `xl` one, so the base stack was cramped at
 *    small sizes and fell apart into a loose row at large ones. A fraction of
 *    the diameter holds the same rhythm at every size (§9 — spacing is
 *    structure, and structure that changes meaning with size is not).
 * 2. **The first face is on top.** Document order put the LAST avatar over the
 *    ones before it, so the stack read right-to-left while the eye and the
 *    data both run the other way. V4 reverses the paint order, which is what
 *    makes a stack read as an ordered list rather than a pile.
 * 3. **A `+N` that is not pretending to be a person.** The base chip was a
 *    filled `bg-neutral-100` disc with the same visual weight as a face, so
 *    four people plus three more looked like five people. V4 gives it the
 *    page's own surface, a hairline and muted text — present, countable,
 *    clearly not a face (§10: typography before containers; §6: hierarchy
 *    before styling).
 * 4. **No `+1`.** Collapsing a single extra avatar into a `+1` chip costs the
 *    same width and tells the reader less, so V4 shows the person instead.
 *    `max` is a budget, not a ceremony.
 *
 * The separator is a `surface`-coloured `box-shadow` ring rather than a border
 * on the avatar, so the face keeps its full diameter and the outline sits
 * outside it — the same geometry as the native twin's outline view.
 */
export declare function AvatarGroupV4({ avatars, max, size, className, }: AvatarGroupProps): React.ReactElement;
//# sourceMappingURL=AvatarGroupV4.d.ts.map