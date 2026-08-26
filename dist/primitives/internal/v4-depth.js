"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONOGRAM_STEPS = void 0;
exports.gradientInk = gradientInk;
exports.mixToken = mixToken;
exports.gradientCss = gradientCss;
exports.shadowCss = shadowCss;
exports.useOptionalCompiledTheme = useOptionalCompiledTheme;
exports.monogramStep = monogramStep;
exports.mirrorStep = mirrorStep;
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
const provider_1 = require("../../provider");
const types_1 = require("../../theme/types");
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
function gradientInk(brand, seed, extremes, min = compile_1.MIN_CONTRAST) {
    const worst = (candidate) => Math.min((0, color_1.contrastRatio)(candidate, brand.from), (0, color_1.contrastRatio)(candidate, brand.to));
    if (worst(seed) >= min) {
        return { from: brand.from, to: brand.to, ink: seed };
    }
    const ink = worst(extremes.darkest) >= worst(extremes.lightest)
        ? extremes.darkest
        : extremes.lightest;
    return {
        from: (0, color_1.ensureContrast)(brand.from, ink, min),
        to: (0, color_1.ensureContrast)(brand.to, ink, min),
        ink,
    };
}
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
function mixToken(a, b, t) {
    const x = (0, color_1.hexToRgb)(a);
    const y = (0, color_1.hexToRgb)(b);
    const k = Math.min(Math.max(t, 0), 1);
    return (0, color_1.rgbToHex)({
        r: x.r + (y.r - x.r) * k,
        g: x.g + (y.g - x.g) * k,
        b: x.b + (y.b - x.b) * k,
    });
}
/**
 * A {@link GradientToken} as a CSS `linear-gradient()`.
 *
 * The token's angle is already "degrees clockwise from up", which is exactly
 * what CSS means by `45deg` — no conversion, and the compiler stays the single
 * owner of the direction. Under `depth: 'flat'` the two stops are the same
 * colour, so this renders a solid fill with no branch at the call site.
 */
function gradientCss(angle, from, to) {
    return `linear-gradient(${angle}deg, ${from}, ${to})`;
}
/**
 * An {@link ElevationToken} as a CSS `box-shadow`.
 *
 * `k` scales the whole shadow — `0.5` for a pressed control that has sat back
 * down, `0` for none. Under `depth: 'flat'` the token is already zeroed, so
 * this returns an invisible shadow rather than needing a caller-side check.
 */
function shadowCss(token, k = 1) {
    const { r, g, b } = (0, color_1.hexToRgb)(token.color);
    const alpha = Math.round(token.opacity * k * 1000) / 1000;
    return `0 ${token.offsetY * k}px ${token.radius * k}px rgb(${r} ${g} ${b} / ${alpha})`;
}
/**
 * The compiled theme, or `null` when no `XenitionUIProvider` is mounted.
 *
 * `useXenitionCompiledTheme` throws in that case, which is right for an app
 * (a missing provider means every `--xen-*` is missing too) but wrong for a
 * primitive: a V4 component with no theme to read should fall back to the flat
 * token look, not blow up a render. The `useContext` call inside runs
 * unconditionally before the throw, so hook order is stable.
 */
function useOptionalCompiledTheme() {
    try {
        return (0, provider_1.useXenitionCompiledTheme)();
    }
    catch {
        return null;
    }
}
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
exports.MONOGRAM_STEPS = [100, 200, 300, 400];
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
function monogramStep(name) {
    const key = (name ?? '').trim().toLowerCase();
    let hash = 2166136261;
    for (let i = 0; i < key.length; i += 1) {
        hash ^= key.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }
    const index = Math.abs(hash) % exports.MONOGRAM_STEPS.length;
    return exports.MONOGRAM_STEPS[index];
}
/**
 * The same ramp step seen from the other scheme.
 *
 * `compileTheme` builds its dark semantics from a mirrored ramp — step `i`
 * becomes step `n - 1 - i` — so this is that mapping, not an approximation of
 * it. It is what lets a native component reach into the light-oriented `ramps`
 * and still land on the colour the web twin's `--xen-neutral-*` resolves to in
 * dark, keeping the two twins at parity on a value neither can read directly.
 */
function mirrorStep(step) {
    const index = types_1.RAMP_STEPS.indexOf(step);
    return types_1.RAMP_STEPS[types_1.RAMP_STEPS.length - 1 - index];
}
//# sourceMappingURL=v4-depth.js.map