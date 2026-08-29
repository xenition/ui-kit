import * as React from 'react';
import { cn } from './cn';
import { IconV4 } from './IconV4';
import type { AuthAlign, AuthBrandTileProps } from './AuthCard';

/**
 * `AuthBrandTile`, V4 — the rounded-square mark that opens every auth screen.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §9 is unusually specific about this one object:
 * a rounded square, `primary` fill, `tokens.radius.lg`, 56×56, sitting
 * **top-left and not centred**. All of that survives here unchanged, because
 * the shape is not what was wrong with it. Three things were.
 *
 * ## 1. The square ignored the seed's own rhythm
 *
 * The base writes `56` as a bare number. §10.1 allows it — it is named as a
 * geometric literal and commented as one — but a literal is a decision that
 * stops following the theme. A seed that tightens its spacing scale gets
 * tighter fields, a tighter CTA and a tile that stays exactly 56, so the one
 * object at the top of the screen is the one object out of rhythm with it.
 *
 * V4 composes the square from the spacing scale instead:
 * `2xl + sm`, which is **56 at the default scale** — the same pixels, the same
 * §9 tile, now derived rather than typed. It is the argument `internal/
 * identity-v4.ts` already makes for avatar diameters, and it has the pleasant
 * side effect that a `md` tile and an `AvatarV4` at `lg` are the same square,
 * so a header carrying both lines up.
 *
 * ## 2. There was no hero size, and §3 asks for one
 *
 * §3: "When `illustration` is absent, fall back to the existing `logoGlyph`
 * medallion **at hero size**, not to empty space. A screen with nothing in the
 * hero slot must still look composed." The base tile has exactly one size, so
 * a step screen with no artwork had nothing to fall back to but a 56px chip
 * floating in a panel meant for a picture. {@link AuthBrandTileV4Props.size}
 * `'lg'` is that fallback: `2xl + lg` (72 at the default scale), with the mark
 * inside stepping up with it so the glyph holds the same optical share of the
 * square at either size.
 *
 * ## 3. §3 calls the hero fallback a *medallion*, and a medallion is round
 *
 * The base has one silhouette: §9's rounded square. §3's hero fallback is
 * named a "medallion", and §8's feature badge is explicitly circular — so the
 * family already wants a disc and had no way to ask for one.
 * {@link AuthBrandTileV4Props.shape} `'circle'` is it, and the default stays
 * `'rounded'`, so nothing that renders today moves a pixel.
 *
 * The disc is drawn as `50%`, **not** `radius.full`. `radius.full` compiles to
 * `0` on a `sharp` seed — the Addendum records the same trap for `Switch`,
 * which derives its track radius from its own height for exactly this reason.
 * A ratio is geometry, which §10.1 allows; a radius token that silently
 * squares off the one round thing on the screen is a bug.
 *
 * ## A note on the fill
 *
 * It stays `primary` with the mark in `onPrimary`, in both shapes and at both
 * sizes, and there is no tinted variant. A tinted variant is tempting — §5
 * wants one dominant thing per screen and the CTA is `primary` too — but the
 * obvious spelling of it (§8's `primary[50]` ground with the mark in
 * `primary`) does not survive a contrast check: on a teal seed that pair
 * measures **1.72:1** in light, against the 3:1 a non-text graphic has to
 * clear. `onPrimary` on `primary` is the one pairing the compiler actually
 * guarantees, so it is the one this tile uses.
 *
 * ## What it deliberately does not have
 *
 * **No elevation.** A shadow says "this floats, and you can probably act on
 * it". A brand tile is an identity mark and nothing happens when you press it;
 * raising it would promise an affordance that is not there, and the one raised
 * object on the screen should be the CTA. §7 — subtraction before addition.
 *
 * **No motion.** `internal/v4-motion.ts` exists so that a component with a
 * state change takes M3's duration rather than inventing one. This component
 * has no states: it does not hover, focus, press or disable. An entrance
 * animation would be decoration invented for its own sake, so there is none,
 * and there is no duration in this file to drift.
 *
 * **No gradient.** §35.11 keeps the brand sweep for the hero and the single
 * primary action, and `ButtonV4` already spends it on the CTA. Two sweeps on
 * one screen is the tell §8 warns about.
 *
 * Renders **nothing at all** when the app supplies neither a glyph nor a name
 * (§12, and §10.6 before it): an empty state must not leave a hole where a box
 * would be. The kit ships no brand marks and never will, so "no mark" is a
 * state this component has to survive, not an error to draw a placeholder for.
 */

/** The two squares the tile comes in. `'md'` is §9's auth tile. */
export type AuthBrandTileSize = 'md' | 'lg';

/** The tile's silhouette. `'rounded'` is §9's square; `'circle'` is §3's medallion. */
export type AuthBrandTileShape = 'rounded' | 'circle';

export type { AuthAlign };

export interface AuthBrandTileV4Props extends AuthBrandTileProps {
  /**
   * Square size. Default `'md'` — §9's auth tile, 56 at the default scale.
   * `'lg'` is §3's hero-slot medallion for a step screen with no artwork.
   */
  size?: AuthBrandTileSize;
  /**
   * Silhouette. Default `'rounded'` — §9's rounded square, at `radius.lg`.
   * `'circle'` is the medallion §3 and §8 describe.
   */
  shape?: AuthBrandTileShape;
}

/*
  §10.1 permits geometric literals, but a *composed* size is better than a
  permitted one: these are the same 56 and 72 at the default scale, derived
  from the seed's spacing so they move when it moves.

  Spelled out as whole Tailwind classes rather than assembled from parts,
  because Tailwind's content scanner reads source text — an interpolated class
  never reaches the generated CSS. The native twin composes the identical sums
  from `tokens.spacing`, and both twins' specs assert the arithmetic.
*/
const TILE_BOX: Record<AuthBrandTileSize, string> = {
  md: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]',
  lg: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]',
};

/**
 * The type step the mark takes inside each square.
 *
 * Both land at roughly 43% of the square, which is where a mark reads as
 * centred in its tile rather than as a glyph that happens to be inside a box.
 * `md`/`2xl` is exactly what the base draws, so the §9 tile is unchanged.
 */
const GLYPH_STEP: Record<AuthBrandTileSize, '2xl' | '3xl'> = { md: '2xl', lg: '3xl' };

/**
 * Silhouette per shape.
 *
 * `50%` rather than `rounded-full`, because the preset's `full` resolves to
 * `var(--xen-radius-full)` and a `sharp` seed compiles that to `0` — the disc
 * would silently become a square on exactly the seed least likely to want one.
 * A ratio is geometry, which §10.1 allows.
 */
const SHAPE_CLASS: Record<AuthBrandTileShape, string> = {
  rounded: 'rounded-[var(--xen-radius-lg)]',
  circle: 'rounded-[50%]',
};

export function AuthBrandTileV4({
  glyph,
  name,
  align = 'left',
  size = 'md',
  shape = 'rounded',
  'aria-label': ariaLabel,
  className,
}: AuthBrandTileV4Props): React.ReactElement | null {
  // §12 / §10.6 — no mark, no box. Not an empty square, not a placeholder.
  if (!glyph && !name) return null;

  return (
    <div
      data-xen-v4-brand-tile=""
      data-shape={shape}
      data-size={size}
      className={cn(
        'flex shrink-0 items-center justify-center bg-primary',
        SHAPE_CLASS[shape],
        TILE_BOX[size],
        /*
          `self-*` only does anything when the parent happens to be a flex
          container, which is how the base drew it — so a tile dropped into a
          plain block never centred at all. The auto margins work in both, and
          the pair together means the tile lands where `align` says it does
          regardless of what it was placed inside.
        */
        align === 'center' ? 'mx-auto self-center' : 'mr-auto self-start',
        className
      )}
    >
      <IconV4
        glyph={glyph}
        name={name}
        size={GLYPH_STEP[size]}
        color="onPrimary"
        aria-label={ariaLabel}
      />
    </div>
  );
}
