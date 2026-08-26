"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingOverlayV4 = LoadingOverlayV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const surface_v4_1 = require("./internal/surface-v4");
const SpinnerV4_1 = require("./SpinnerV4");
/**
 * **V4 loading overlay** — the web twin of the native `LoadingOverlayV4`, same
 * props as {@link LoadingOverlay}, a different design line.
 *
 * ## The scrim was inverting under dark mode
 *
 * The base dimmed with `bg-neutral-950/40`. `--xen-neutral-950` is a ramp step,
 * and the `[data-theme="dark"]` block re-emits the ramps mirrored, so on a dark
 * page that step is the LIGHTEST one there is — the overlay covered the app in
 * white haze and then put a dark card in the middle of it. `ModalV4` fixed the
 * same bug; this reuses that fix rather than repeating it, through the shared
 * `[data-xen-v4-scrim]` rule built on `--xen-elevation-color`, which does not
 * invert because a shadow does not.
 *
 * ## This is the one component here that HAS a layer
 *
 * Everything else in the V4 feedback line refuses elevation, because an alert,
 * a banner, a callout and a progress bar are all *in* the page. An overlay is
 * genuinely above it — that is the entire point of the component — so its panel
 * takes `[data-xen-v4-panel]`, the same `--xen-elevation-sheet` treatment
 * `ModalV4` uses for the same reason. Depth here is not decoration; it is the
 * only honest way to say "the page underneath is not available right now".
 *
 * Glass follows the seed through `panelKind`, the single depth check the V4
 * surfaces make: the compiler neutralises gradients and elevation for a flat
 * seed, but `--xen-glass-tint` stays live at every depth, so it has to be asked
 * for (§8's "glassmorphism without purpose").
 *
 * ## Motion and the spinner
 *
 * The scrim and the panel take the shared overlay animations — a fade and a
 * small scale over 200ms — because an overlay that appears with no transition
 * reads as a glitch rather than as a layer arriving. `prefers-reduced-motion`
 * reduces both to the fade (§36.10).
 *
 * The spinner is `SpinnerV4`, so the blocking state honours the user's motion
 * setting. The label is `text-on-surface`, never `text-muted-text` — over glass,
 * `muted` measurably falls below AA (see `theme/glass-legibility.spec.ts`).
 */
function LoadingOverlayV4({ visible, label, className, }) {
    const kind = (0, surface_v4_1.panelKind)((0, surface_v4_1.useDepth)());
    (0, inject_1.injectStyleOnce)('xen-surface-v4-styles', surface_v4_1.SURFACE_V4_CSS);
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-overlay": "", role: "progressbar", "aria-label": label ?? 'Loading', "aria-busy": "true", "aria-live": "polite", className: (0, cn_1.cn)('absolute inset-0 z-40 flex items-center justify-center', className), children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-v4-scrim": "", className: "absolute inset-0" }), (0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-dialog": "", "data-xen-v4-panel": kind, className: (0, cn_1.cn)('relative flex flex-col items-center gap-[var(--xen-space-sm)]', 'rounded-[var(--xen-radius-lg)] text-on-surface', 'px-[var(--xen-space-xl)] py-[var(--xen-space-lg)]'), children: [(0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "lg", role: undefined, "aria-label": undefined, "aria-hidden": "true" }), label && ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: label }))] })] }));
}
//# sourceMappingURL=LoadingOverlayV4.js.map