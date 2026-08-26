import * as React from 'react';
import type { LoadingOverlayProps } from './LoadingOverlay';
export type { LoadingOverlayProps as LoadingOverlayV4Props };
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
export declare function LoadingOverlayV4({ visible, label, className, }: LoadingOverlayProps): React.ReactElement | null;
//# sourceMappingURL=LoadingOverlayV4.d.ts.map