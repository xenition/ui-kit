import * as React from 'react';
import { cn } from '../primitives/cn';
import { SPACE_MX_NEG, SPACE_MY_NEG, type SpaceKey } from './_tokens';

/**
 * Which horizontal edge the bleed escapes through.
 *
 * The names are **logical, not physical** — `'start'` is the left edge in a
 * left-to-right document and the right edge in an RTL one — because the
 * component they exist for is a horizontally scrolling chip strip, and "the
 * side the last chip runs off" flips with the writing direction.
 */
export type BleedV4Edge = 'both' | 'start' | 'end';

/**
 * Negative inline-start margins, written out in full so the Tailwind scanner
 * finds them in the library source. Logical (`-ms-`), matching native's
 * `marginStart`, so the two twins bleed the same edge under RTL.
 *
 * These live here rather than in `_tokens.ts` because `Bleed` is their only
 * caller; the shared maps stay the vocabulary the whole module uses.
 */
const SPACE_MS_NEG: Record<SpaceKey, string> = {
  xs: '-ms-[var(--xen-space-xs)]',
  sm: '-ms-[var(--xen-space-sm)]',
  md: '-ms-[var(--xen-space-md)]',
  lg: '-ms-[var(--xen-space-lg)]',
  xl: '-ms-[var(--xen-space-xl)]',
  '2xl': '-ms-[var(--xen-space-2xl)]',
};

/** Negative inline-end margins. Twin of {@link SPACE_MS_NEG}. */
const SPACE_ME_NEG: Record<SpaceKey, string> = {
  xs: '-me-[var(--xen-space-xs)]',
  sm: '-me-[var(--xen-space-sm)]',
  md: '-me-[var(--xen-space-md)]',
  lg: '-me-[var(--xen-space-lg)]',
  xl: '-me-[var(--xen-space-xl)]',
  '2xl': '-me-[var(--xen-space-2xl)]',
};

export interface BleedV4Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Uniform negative margin on all sides, from the spacing scale. Defaults to `md`. */
  space?: SpaceKey;
  /** Bleed only horizontally — overrides `space` on the horizontal axis. */
  horizontal?: SpaceKey;
  /** Bleed only vertically — overrides `space` on the vertical axis. */
  vertical?: SpaceKey;
  /**
   * Which horizontal edge to bleed through. `'both'` (the default, and the
   * base component's only behaviour) escapes the padded parent on both sides;
   * `'start'` / `'end'` escape one side and leave the other aligned to the
   * parent's gutter. Does not affect the vertical bleed.
   */
  edge?: BleedV4Edge;
}

/**
 * **V4 bleed** — the inverse of `Inset`: token-bound *negative* margins that
 * let content break out of a padded parent (a full-bleed image, an
 * edge-to-edge row) without the parent having to drop its gutter.
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 calls the base *"already the cleanest file
 * in the module"* and asks for exactly one addition, which is the whole of the
 * change here: **`edge`**. A horizontally scrolling strip — `FilterChips`, a
 * card carousel — has to bleed only its trailing side. Bleeding both, which is
 * all the base can do, pulls the *first* chip under the screen edge as well,
 * so the strip opens already looking scrolled and its first item is clipped.
 * Bleeding one side keeps the strip's leading edge on the page gutter (§4.1,
 * `spacing.lg`) while the last item can still be scrolled fully into reach.
 *
 * Everything else is unchanged and deliberately so: the default `edge="both"`
 * renders exactly what `Bleed` renders today, so upgrading an import cannot
 * move a pixel. No colour, no radius, no type — every margin traces to a
 * `--xen-space-*` token.
 *
 * The one-sided classes are the logical `-ms-` / `-me-` rather than `-ml-` /
 * `-mr-`, which is what keeps this at prop parity with the native twin's
 * `marginStart` / `marginEnd`: both twins bleed the same edge in an RTL
 * layout, so a screen does not have to special-case one platform.
 */
export const BleedV4 = React.forwardRef<HTMLDivElement, BleedV4Props>(function BleedV4(
  { space = 'md', horizontal, vertical, edge = 'both', className, ...rest },
  ref
) {
  const inline = horizontal ?? space;
  const inlineClass =
    edge === 'both'
      ? SPACE_MX_NEG[inline]
      : edge === 'start'
        ? SPACE_MS_NEG[inline]
        : SPACE_ME_NEG[inline];
  return (
    <div
      ref={ref}
      className={cn(inlineClass, SPACE_MY_NEG[vertical ?? space], className)}
      {...rest}
    />
  );
});
