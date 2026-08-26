/**
 * Shared depth plumbing for the **V4 design line** (`ButtonV4`, `CardV4`,
 * `InputV4`, `BadgeV4`).
 *
 * Three jobs. The first two exist because a gradient and a shadow are the two
 * things a component cannot express honestly on its own; the third is there
 * because a derived colour has to be derived the SAME way in both twins:
 *
 * 1. **Contrast on a gradient.** `onPrimary` promises AA against one flat
 *    colour. A gradient is a range, and for a wide-hue brand pair no colour
 *    clears both of its ends — so the promise has to be re-derived against the
 *    pair, and sometimes the pair itself has to move. See {@link gradientInk}.
 * 2. **Depth on the web.** The `--xen-*` custom properties carry colours,
 *    radii and scales, but not `gradient` / `glass` / `elevation` — those live
 *    on the compiled theme. So the V4 web twins read the compiled theme when a
 *    provider is mounted and hand the values down as element-scoped custom
 *    properties, one set per colour scheme, letting `[data-theme="dark"]` pick
 *    between them exactly as the rest of the kit does.
 * 3. **A monogram ground both twins agree on.** An avatar with no picture has
 *    to invent a colour, and if the native twin invents a different one from
 *    the web twin the same person is two people across a product. See
 *    {@link monogramStep} and {@link mirrorStep}.
 *
 * Everything here is pure except {@link useOptionalCompiledTheme}, and the
 * pure half is imported by the **native** twins too — the same
 * `src/primitives/*` sharing the native `Icon` and `useForm` already do.
 */
import type { CompiledTheme, ElevationToken, GradientToken, RampStep } from '../../theme/types';
/** A brand gradient made legible: two stops plus the ink that reads on both. */
export interface GradientInk {
    /** Near stop, contrast-corrected if it had to be. */
    from: string;
    /** Far stop, contrast-corrected if it had to be. */
    to: string;
    /** A label colour that clears AA against BOTH stops. */
    ink: string;
}
/**
 * Make a brand gradient carry a label.
 *
 * `onPrimary` promises AA against ONE flat colour. A gradient is a range, and
 * `gradient.brand` sweeps primary→accent — two different hues, which for a
 * wide-hue brand pair can span most of the luminance axis. A measured example:
 * a teal seed compiles a brand gradient from luminance 0.66 to 0.15, and **no
 * colour at all** clears 4.5:1 against both ends of that. White reaches 1.49,
 * black 3.92. The rule "text on a gradient must clear AA against both stops"
 * is simply unsatisfiable on the raw token.
 *
 * So the stops move instead of the rule bending — the same trade the compiler
 * already makes everywhere with `ensureContrast`, which walks lightness while
 * holding hue and saturation. In order:
 *
 * 1. If the compiler's own ink already reads on the whole sweep, nothing
 *    changes at all. That is the common case, and the gradient is untouched.
 * 2. Otherwise the ink becomes whichever neutral extreme has the most
 *    headroom, so the correction starts from the best possible position.
 * 3. Each stop is then pulled — in lightness only — until it clears that ink.
 *
 * What survives is the brand's two hues and the compiler's direction; what
 * changes is a few points of lightness on the stop that was illegible. Under
 * `depth: 'flat'` the two stops are the same colour and stay the same colour,
 * so a flat seed still gets a flat fill with no branch at the call site.
 */
export declare function gradientInk(brand: GradientToken, seed: string, extremes: {
    darkest: string;
    lightest: string;
}, min?: number): GradientInk;
/**
 * Composite `a` over `b` at `t` and return an **opaque** hex.
 *
 * The web has `color-mix()`; React Native has nothing, and the difference
 * matters more than it looks. A translucent tint reads correctly only over the
 * ground it was designed against — a soft badge tinted at 14% alpha is a
 * different colour on a filled card, on glass, and on the page, and its label
 * carries a contrast guarantee against only one of the three. Compositing the
 * tint once, here, gives the component a ground it owns.
 */
export declare function mixToken(a: string, b: string, t: number): string;
/**
 * A {@link GradientToken} as a CSS `linear-gradient()`.
 *
 * The token's angle is already "degrees clockwise from up", which is exactly
 * what CSS means by `45deg` — no conversion, and the compiler stays the single
 * owner of the direction. Under `depth: 'flat'` the two stops are the same
 * colour, so this renders a solid fill with no branch at the call site.
 */
export declare function gradientCss(angle: number, from: string, to: string): string;
/**
 * An {@link ElevationToken} as a CSS `box-shadow`.
 *
 * `k` scales the whole shadow — `0.5` for a pressed control that has sat back
 * down, `0` for none. Under `depth: 'flat'` the token is already zeroed, so
 * this returns an invisible shadow rather than needing a caller-side check.
 */
export declare function shadowCss(token: ElevationToken, k?: number): string;
/**
 * The compiled theme, or `null` when no `XenitionUIProvider` is mounted.
 *
 * `useXenitionCompiledTheme` throws in that case, which is right for an app
 * (a missing provider means every `--xen-*` is missing too) but wrong for a
 * primitive: a V4 component with no theme to read should fall back to the flat
 * token look, not blow up a render. The `useContext` call inside runs
 * unconditionally before the throw, so hook order is stable.
 */
export declare function useOptionalCompiledTheme(): CompiledTheme | null;
/**
 * The neutral ramp steps a monogram ground may use, in **light orientation**.
 *
 * Four, and all of them neutral. A monogram chip exists to tell one person
 * from the next in a list, not to decorate — so the ground is derived from the
 * neutral family the seed already chose rather than from a bag of unrelated
 * hues, which is `design.md` §35.8 verbatim and keeps §35.5's "limit
 * simultaneous accent colours" true in a list of twenty faces. The four steps
 * are close enough together that the row still reads as one material.
 */
export declare const MONOGRAM_STEPS: readonly [100, 200, 300, 400];
/**
 * Pick a monogram ground **deterministically from the name**.
 *
 * Deterministic matters more than it sounds: the same person must get the same
 * chip on the roster, in the comment thread and in the header, or the colour is
 * noise instead of an identity cue (§32 — recognition over recall). A cheap
 * FNV-1a over the trimmed name gives that with no state and no palette table.
 *
 * The returned step is in the **light ramp orientation** — the orientation the
 * compiled `ramps` are handed out in, and the one the web's `--xen-neutral-*`
 * variables already flip per scheme. A native caller on a dark page must
 * mirror it with {@link mirrorStep} first, or it will paint a near-white chip
 * on a near-black page.
 */
export declare function monogramStep(name: string | undefined): RampStep;
/**
 * The same ramp step seen from the other scheme.
 *
 * `compileTheme` builds its dark semantics from a mirrored ramp — step `i`
 * becomes step `n - 1 - i` — so this is that mapping, not an approximation of
 * it. It is what lets a native component reach into the light-oriented `ramps`
 * and still land on the colour the web twin's `--xen-neutral-*` resolves to in
 * dark, keeping the two twins at parity on a value neither can read directly.
 */
export declare function mirrorStep(step: RampStep): RampStep;
//# sourceMappingURL=v4-depth.d.ts.map