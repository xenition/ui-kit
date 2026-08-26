"use strict";
/**
 * Shared geometry and lettering for the **V4 identity primitives** on the web —
 * `AvatarV4`, `AvatarGroupV4`, and anything else that has to line a monogram up
 * with a face.
 *
 * It exists for one reason: an avatar and a stack of avatars must agree on the
 * diameter exactly, or the overflow chip sits a hair off the row of faces beside
 * it and the whole group reads as sloppy. Two copies of a size table drift; one
 * does not. The native twin keeps the same table in
 * `src/native/primitives/internal/identity-v4.ts` — same numbers, expressed as
 * `calc()` here because the web styles through custom properties.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WATERMARK_SCALE = exports.WATERMARK_TILT = exports.WATERMARK_ALPHA = exports.EYEBROW_TRACKING_CLASS = exports.EYEBROW_TRACKING = exports.STACK_OVERLAP = exports.AVATAR_SHAPE = exports.MONOGRAM_CLASS = exports.AVATAR_DOT = exports.AVATAR_DIAMETER = void 0;
exports.initialsOf = initialsOf;
/**
 * Avatar diameters composed from the **spacing scale**, not picked.
 *
 * The base avatar hard-coded `h-6 / h-8 / h-10 / h-14 / h-[72px]`, which are
 * Tailwind's rhythm rather than the seed's — so a seed with a tighter scale got
 * an avatar that ignored it. These land on the same pixels for the default
 * scale and follow the seed when it moves.
 */
exports.AVATAR_DIAMETER = {
    xs: 'var(--xen-space-lg)',
    sm: 'var(--xen-space-xl)',
    md: 'calc(var(--xen-space-xl) + var(--xen-space-sm))',
    lg: 'calc(var(--xen-space-2xl) + var(--xen-space-sm))',
    xl: 'calc(var(--xen-space-2xl) + var(--xen-space-lg))',
};
/** Presence-dot diameters, from the same scale. */
exports.AVATAR_DOT = {
    xs: 'var(--xen-space-sm)',
    sm: 'var(--xen-space-sm)',
    md: 'calc(var(--xen-space-sm) + var(--xen-space-xs))',
    lg: 'var(--xen-space-md)',
    xl: 'var(--xen-space-md)',
};
/**
 * The type step a monogram takes at each size.
 *
 * A monogram is the *primary content* of the chip when there is no photo, so it
 * is sized as such (§10 — typography before containers). The base avatar topped
 * out at `text-lg` inside a 56px disc, which reads as a caption in a circle.
 */
exports.MONOGRAM_CLASS = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
};
exports.AVATAR_SHAPE = {
    circle: 'rounded-full',
    rounded: 'rounded-[var(--xen-radius-md)]',
    square: 'rounded-[var(--xen-radius-sm)]',
};
/**
 * How far each face in a stack slides under the one before it, as a fraction
 * of the diameter.
 *
 * A fixed `-ml-2` — what the base group used — is 33% of an `xs` avatar and 11%
 * of an `xl` one, so the stack is tight at small sizes and falls apart into a
 * loose row at large ones. A fraction holds the same rhythm at every size.
 */
exports.STACK_OVERLAP = 0.28;
/**
 * First letters of the first two words, uppercased.
 *
 * Returns **empty** rather than `'?'` when there is nothing to work with: a
 * question mark reads as an error, and "we do not know who this is" is not an
 * error. The caller draws a silhouette instead.
 */
function initialsOf(name) {
    if (!name)
        return '';
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
exports.EYEBROW_TRACKING = 0.18;
/**
 * The same ratio as a literal Tailwind class.
 *
 * It has to be spelled out somewhere a scanner can see it — an interpolated
 * `tracking-[${n}em]` never reaches the generated CSS — so the number above and
 * the string here are checked against each other in the spec.
 */
exports.EYEBROW_TRACKING_CLASS = 'tracking-[0.18em]';
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
exports.WATERMARK_ALPHA = 0.06;
/** Both twins tilt and oversize the lattice by exactly this much. */
exports.WATERMARK_TILT = -30;
exports.WATERMARK_SCALE = 1.5;
//# sourceMappingURL=identity-v4.js.map