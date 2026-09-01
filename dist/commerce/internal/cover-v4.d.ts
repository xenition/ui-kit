/**
 * The seeded plate behind `GenerativeCoverV4`, shared by **both twins**.
 *
 * ## Why this file exists
 *
 * `GenerativeCover` shipped on native only, and its own doc comment said its
 * `form` prop was "accepted for parity with the web `GenerativeCover`". The
 * web twin it was referring to does exist — but in `marketing`, not in
 * `commerce` — so the two files that a product card reaches for on the two
 * platforms had **two independent copies of the same hash**, two independent
 * form tables, and no test anywhere asserting they agreed. They happened to
 * agree. Nothing was keeping them agreeing.
 *
 * So the seed → plate decision lives here, once, in a file with no React and
 * no platform in it: the web twin imports it and the native twin imports it,
 * and `hashSeed('ceramic-mug')` cannot mean two things.
 *
 * ## What a "plate" is
 *
 * Three decisions, all derived from the seed and all overridable per call:
 *
 * - **`form`** — which of the six geometric compositions the cover draws. Web
 *   draws the composition itself; native varies the gradient direction, which
 *   is the honest limit of a two-stop linear gradient and is what the native
 *   base already said out loud.
 * - **`paper`** — the ground, a step off the **primary** ramp.
 * - **`ink`** — the mark, a step off the **accent** ramp.
 *
 * Both are colour *roles* (`primary-600`, `accent-300`), never colours: the
 * web twin resolves a role to `var(--xen-primary-600)` and the native twin to
 * `tokens.ramps.primary[600]`, so the same seed lands on the same compiled
 * value on both platforms.
 */
/** The six geometric compositions a cover can be drawn in. */
export type CoverForm = 'arc' | 'bands' | 'orbit' | 'grid' | 'wave' | 'stack';
/**
 * The form vocabulary, in the order the seed indexes it.
 *
 * Identical order to `marketing/GenerativeCover`'s `COVER_FORMS` — the same
 * seed must pick the same composition whether it came through a marketing
 * cover or a product card, or a storefront hero and the product tile under it
 * are two different pieces of art claiming the same identity.
 */
export declare const COVER_FORMS: readonly CoverForm[];
/**
 * A token colour role a cover may be painted in — a ramp step
 * (`primary-600`, `accent-300`) or a semantic slot (`surface`, `accent`).
 * Never a literal colour; the web twin rejects one at render.
 */
export type CoverColorRole = string;
/**
 * The ground steps, off the **primary** ramp.
 *
 * All three are at or past the ramp's `primary` step, which is the one the
 * compiler measured `onPrimary` against — so anything the kit ever draws over
 * this plate has a contrast promise it can lean on. The native base picked
 * from `300…600`, and `300` is the step that quietly broke that promise.
 */
export declare const COVER_PAPER_STEPS: readonly number[];
/**
 * The mark steps, off the **accent** ramp.
 *
 * Deliberately *lighter* than the paper: light geometry on a saturated plate
 * reads at a thumbnail size, where the accent-over-primary pairing the native
 * base used (`400…700` over `300…600`) can land two mid-tones on top of each
 * other and dissolve.
 */
export declare const COVER_INK_STEPS: readonly number[];
/**
 * FNV-1a, 32-bit — the kit's one string hash.
 *
 * Byte-identical to `marketing/GenerativeCover`'s `hashSeed` and to the
 * constant-for-constant copy the native `GenerativeCover` carried
 * (`2166136261` / `16777619` are `0x811c9dc5` / `0x01000193`). Returned
 * unsigned: a signed right shift on a hash past 2^31 goes negative and indexes
 * an array backwards, which is the bug the native base documents having caught
 * live on a real seed.
 */
export declare function hashSeed(seed: string | number): number;
/** The three decisions a seed makes about a cover. */
export interface CoverPlate {
    /** The composition. */
    form: CoverForm;
    /** The mark's colour role. */
    ink: CoverColorRole;
    /** The ground's colour role. */
    paper: CoverColorRole;
}
/**
 * Resolve `{ seed, form?, ink?, paper? }` to the plate both twins draw.
 *
 * Every explicit prop wins over the seed, so a brand-themed cover
 * (`ink="accent"`, `paper="surface"`) is still available; what the seed
 * decides is only what the caller did not.
 *
 * Each of the three reads a **different slice** of the hash. Taking three
 * decisions off `hash % n` with related moduli correlates them — every cover
 * with the `arc` form would also be the same colour — and a wall of covers
 * that varies in only one axis is the "generated" look the whole line exists
 * to avoid. The shifts are unsigned for the reason {@link hashSeed} is.
 */
export declare function resolveCoverPlate(seed: string | number, form?: CoverForm, ink?: CoverColorRole, paper?: CoverColorRole): CoverPlate;
//# sourceMappingURL=cover-v4.d.ts.map