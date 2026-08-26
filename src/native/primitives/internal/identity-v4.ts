/**
 * Shared geometry and lettering for the **V4 identity primitives** on native —
 * `AvatarV4`, `AvatarGroupV4`, and anything else that has to line a monogram up
 * with a face.
 *
 * It exists for one reason: an avatar and a stack of avatars must agree on the
 * diameter to the pixel, or the overflow chip sits a hair off the row of faces
 * beside it and the whole group reads as sloppy. Two copies of a size table
 * drift; one does not.
 */

import type { SpacingScale, TypeScale } from '../../../theme/types';
import type { AvatarSize } from '../Avatar';

/**
 * Avatar diameters composed from the **spacing scale**, not picked.
 *
 * The base avatar hard-coded `24 / 32 / 40 / 56 / 72`, which happen to be the
 * right numbers and are unrelated to anything the seed decided — so a seed with
 * a tighter rhythm got an avatar that ignored it. These land on the same values
 * for the default scale and follow the seed when it moves.
 */
export function avatarDiameters(spacing: SpacingScale): Record<AvatarSize, number> {
  return {
    xs: spacing.lg,
    sm: spacing.xl,
    md: spacing.xl + spacing.sm,
    lg: spacing['2xl'] + spacing.sm,
    xl: spacing['2xl'] + spacing.lg,
  };
}

/**
 * The type step a monogram takes at each size.
 *
 * A monogram is the *primary content* of the chip when there is no photo, so it
 * is sized as such (§10 — typography before containers). The base avatar topped
 * out at 18px inside a 56px disc, which reads as a caption in a circle.
 */
export const MONOGRAM_STEP: Record<AvatarSize, keyof TypeScale> = {
  xs: 'xs',
  sm: 'sm',
  md: 'base',
  lg: 'xl',
  xl: '3xl',
};

/**
 * How far each face in a stack slides under the one before it, as a fraction
 * of the diameter.
 *
 * A fixed `-8px` — what the base group used — is 33% of an `xs` avatar and 11%
 * of an `xl` one, so the stack is tight at small sizes and falls apart into a
 * loose row at large ones. A fraction holds the same rhythm at every size.
 */
export const STACK_OVERLAP = 0.28;

/**
 * First letters of the first two words, uppercased.
 *
 * Returns **empty** rather than `'?'` when there is nothing to work with: a
 * question mark reads as an error, and "we do not know who this is" is not an
 * error. The caller draws a silhouette instead.
 */
export function initialsOf(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((w) => w[0]?.toUpperCase() ?? '').join('');
}

/**
 * Letter-spacing for tracked caps, as a fraction of the font size.
 *
 * Uppercase text at 12px loses the word-shape a reader normally scans by, and
 * the usual repair is tracking. The two twins had drifted apart on it — `2px`
 * on native (0.167em at the `xs` step) against `0.22em` on the web — so the
 * same eyebrow was a different width on a phone and on a laptop. One number,
 * expressed as a ratio, keeps them identical at any type scale.
 */
export const EYEBROW_TRACKING = 0.18;

/**
 * How strongly a watermark prints, as an alpha on the page's own ink.
 *
 * The base watermark floated `muted` at 8%. `muted` is a MID tone, so its
 * distance from the page changes with the scheme and the same number was two
 * different marks in light and dark. `onSurface` is the only slot guaranteed to
 * sit at the far end from the surface in either scheme, so a fixed alpha on it
 * is a fixed RELATIVE strength — and 6% is where a mark is still legible when
 * you look for it and gone when you are reading (§7: a watermark that competes
 * with the content has failed).
 */
export const WATERMARK_ALPHA = 0.06;

/** Both twins tilt and oversize the lattice by exactly this much. */
export const WATERMARK_TILT = -30;
export const WATERMARK_SCALE = 1.5;
