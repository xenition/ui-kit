import * as React from 'react';
import { GenerativeCover as CoverPlateArt } from '../marketing/GenerativeCover';
import { resolveCoverPlate } from './internal/cover-v4';
import type { CoverColorRole, CoverForm, CoverPlate } from './internal/cover-v4';

export type { CoverForm, CoverColorRole, CoverPlate };

export interface GenerativeCoverV4Props
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {
  /** Stable seed — same seed yields the same cover (product slug/title). */
  seed: string | number;
  /**
   * Accessible name. When given the cover is announced as an image; when
   * omitted it is decorative and hidden from the accessibility tree — which is
   * what it is inside a `ProductCardV4`, where the title is printed directly
   * beneath the art.
   */
  label?: string;
  /**
   * Composition. Omitted, it is derived from the seed. Web draws the full
   * geometry the name promises; the native twin varies the gradient direction
   * and says so.
   */
  form?: CoverForm;
  /** Token role for the mark (e.g. `accent-300`). Omitted, seeded. */
  ink?: CoverColorRole;
  /** Token role for the ground (e.g. `primary-600`). Omitted, seeded. */
  paper?: CoverColorRole;
}

/**
 * **V4 generative cover — the twin `commerce` never had.**
 *
 * The native `GenerativeCover` has always carried a doc comment saying its
 * `form` prop is "accepted for parity with the web `GenerativeCover`". That
 * component was real, but it lived in `marketing`, so `commerce` had a cover
 * on one platform and an import across a module boundary on the other, and
 * nothing testing that the two agreed. This file closes that.
 *
 * ## It composes the art rather than redrawing it
 *
 * The six compositions — `arc`, `bands`, `orbit`, `grid`, `wave`, `stack` —
 * are already drawn, in `marketing/GenerativeCover`, as parameterised inline
 * SVG print plates with a seeded PRNG jittering radii, rotations and phases.
 * Copying ~150 lines of geometry into `commerce` so the module could own its
 * own copy is exactly how the kit ends up with two grammars for one idea; the
 * brief's `formatMoney` rule ("`marketplace` has no `money.ts` of its own and
 * must not grow one") is the same argument about a different asset. So this
 * component is the **adapter**: it makes the seeded decisions, and hands them
 * to the renderer that already exists.
 *
 * What it adds over calling that renderer directly is the part the two twins
 * have to agree on — see `internal/cover-v4.ts`. `form`, `ink` and `paper` are
 * all resolved **here**, from the shared hash, and passed down explicitly, so
 * the marketing component's own seeding never runs and the native twin lands
 * on the same three decisions from the same seed.
 *
 * ## The initials are gone
 *
 * The native base overlaid the label's initials on the art. V4 draws no text
 * at all, on either twin, for two reasons:
 *
 * 1. **It is redundant where it is used.** This cover's job is the placeholder
 *    inside a `ProductCardV4`, which prints the product title in full,
 *    directly underneath. Two renderings of one name, one of them abbreviated.
 * 2. **It was a contrast promise nothing could keep.** Initials centred over
 *    generated geometry sit on a different colour for every seed and every
 *    form, so no pairing is checkable — and §46 does not accept "usually
 *    legible". A cover is art; the name belongs in text beside it.
 *
 * `label` therefore does the one job it can do honestly: it is the accessible
 * name, and its absence makes the cover decorative.
 *
 * ## Colour
 *
 * A saturated `primary` plate with a light `accent` mark, both ramp steps, so
 * the cover restyles with the seed and reads in light and dark. Never a
 * literal — an unrecognised role throws at render rather than painting
 * best-effort.
 */
export const GenerativeCoverV4 = React.forwardRef<SVGSVGElement, GenerativeCoverV4Props>(
  function GenerativeCoverV4({ seed, label, form, ink, paper, ...rest }, ref) {
    const plate = resolveCoverPlate(seed, form, ink, paper);

    return (
      <CoverPlateArt
        ref={ref}
        data-xen-v4-cover={plate.form}
        seed={seed}
        // Resolved here, never left to the renderer: the seeded decisions are
        // the thing the two twins must make identically.
        form={plate.form}
        ink={plate.ink}
        paper={plate.paper}
        label={label}
        {...rest}
      />
    );
  }
);
