import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { CoverColorRole, CoverForm, CoverPlate } from '../../commerce/internal/cover-v4';
export type { CoverForm, CoverColorRole, CoverPlate };
export interface GenerativeCoverV4Props {
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
     * Composition. Omitted, it is derived from the seed.
     *
     * **Honest limit, unchanged from the base:** native renders a two-stop
     * gradient, not SVG, so `form` varies the gradient's *direction* rather than
     * drawing the geometry the name promises. The web twin draws the full
     * composition. What the two share is the decision — the same seed picks the
     * same `form`, the same `ink` and the same `paper` on both platforms.
     */
    form?: CoverForm;
    /** Token role for the mark (e.g. `accent-300`). Omitted, seeded. */
    ink?: CoverColorRole;
    /** Token role for the ground (e.g. `primary-600`). Omitted, seeded. */
    paper?: CoverColorRole;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 generative cover (native)** — same props as the web
 * `GenerativeCoverV4`, including defaults, and the same seeded decisions.
 *
 * Three changes from the base, and the third is the one that mattered.
 *
 * 1. **The seed decision is shared, not duplicated.** `form`, `ink` and
 *    `paper` come from `commerce/internal/cover-v4.ts`, the one file both
 *    twins read. The base carried its own copy of FNV-1a and its own step
 *    tables; they happened to agree with the web renderer's and nothing was
 *    keeping them agreeing. See that file for the argument.
 * 2. **The plate reads at thumbnail size.** A light `accent` mark on a
 *    saturated `primary` ground, rather than the base's accent-over-primary
 *    mid-tones, which for some seeds landed two similar values on top of each
 *    other and dissolved into a flat rectangle.
 * 3. **The initials are gone.** The base overlaid the label's initials on the
 *    art. They are redundant where this component is actually used — a
 *    `ProductCardV4` prints the full title directly beneath — and they were a
 *    contrast promise nothing could keep, since text centred over a gradient
 *    sits on a different colour for every seed. `label` now does the one job
 *    it can do honestly: it is the accessible name, and its absence makes the
 *    cover decorative.
 *
 * `expo-linear-gradient` stays optional, exactly as the base had it: with no
 * native module present the `Gradient` wrapper degrades to a solid token fill
 * rather than hard-requiring a peer.
 */
export declare function GenerativeCoverV4({ seed, label, form, ink, paper, style, }: GenerativeCoverV4Props): React.ReactElement;
//# sourceMappingURL=GenerativeCoverV4.d.ts.map