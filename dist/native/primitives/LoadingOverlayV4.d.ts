import * as React from 'react';
import type { LoadingOverlayProps } from './LoadingOverlay';
export type { LoadingOverlayProps as LoadingOverlayV4Props };
/**
 * **V4 loading overlay** — same props as {@link LoadingOverlay}, a different
 * design line.
 *
 * ## The scrim was painting a white veil over dark apps
 *
 * The base built its dim from `colors.onSurface` at 40% opacity. `onSurface`
 * **inverts with the scheme** — near-black on a light page and near-WHITE on a
 * dark one — so on a dark app this overlay covered the screen in white haze and
 * then put a dark card in the middle of it. The kit found and fixed the same
 * bug in `Modal`; this is the same fix, from the same helper.
 *
 * A scrim is built from `elevation.sheet.color`, which does not invert, because
 * a shadow does not. As `Modal` puts it: a scrim is not "a dark colour from the
 * palette", it is the absence of light, and absence does not have a brand.
 *
 * ## This is the one component here that HAS a layer
 *
 * Everything else in the V4 feedback line refuses elevation, because an alert,
 * a banner, a callout and a progress bar are all *in* the page. An overlay is
 * genuinely above it — that is the entire point of the component — so it takes
 * `elevation.sheet`, the widest and softest of the three, the same token
 * `ModalV4` uses for the same reason. Depth here is not decoration; it is the
 * only honest way to say "the page underneath is not available right now".
 *
 * Glass follows the seed through `panelSkin`, the single depth check the V4
 * surfaces make: the compiler neutralises gradients and elevation for a flat
 * seed, but `glass.tint` stays live at every depth, so it has to be asked for
 * (§8's "glassmorphism without purpose").
 *
 * ## Motion and the spinner
 *
 * The scrim fades in over `SURFACE_MOTION.dialog` — an overlay that appears
 * with no transition at all reads as a glitch rather than as a layer arriving
 * (§36.10 asks for the fade to survive even when the travel does not). Under
 * Reduce Motion it is simply there.
 *
 * The spinner is `SpinnerV4`, so the blocking state honours the user's motion
 * setting; the base used the platform indicator, which cannot. The label is
 * `onSurface`, never `muted` — over glass, `muted` measurably falls below AA.
 */
export declare function LoadingOverlayV4({ visible, label, style, }: LoadingOverlayProps): React.ReactElement | null;
//# sourceMappingURL=LoadingOverlayV4.d.ts.map