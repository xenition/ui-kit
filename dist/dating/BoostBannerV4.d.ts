import * as React from 'react';
import type { BoostBannerProps } from './BoostBanner';
export interface BoostBannerV4Props extends BoostBannerProps {
    /** Name for the dismiss control. Default `'Dismiss'`. */
    dismissLabel?: string;
}
/**
 * **V4 boost banner** — the web twin of the native `BoostBannerV4`, same props
 * as {@link BoostBanner} plus `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **`onDismiss` no longer deletes the CTA.** The two lived in one ternary,
 *    so supplying a dismiss handler silently removed the call to action —
 *    `ctaLabel` was accepted, typed and documented, and never rendered. A
 *    dismissible upsell is the normal case, and it shipped with no way to
 *    accept the offer. Both render.
 * 2. **The banner is not a button with buttons in it.** It was a `<div>` with
 *    `role="button"`, `tabIndex={0}` and a hand-written Enter/Space handler,
 *    wrapping a real `<button>` that had to `stopPropagation` to work — three
 *    approximations of a button, nested, each of which a screen reader reports
 *    as a separate control on top of the container's own name. The banner is a
 *    labelled group; the CTA and the dismiss are the only controls in it.
 * 3. **Dismiss is hittable and named.** It was a bare `✕` glyph on a text-sized
 *    hit box with a hard-coded English name.
 * 4. **Press is a state layer**, not `hover:opacity-90` on the whole card —
 *    dimming is how the line draws *disabled*, so a hovered banner and a dead
 *    one looked alike.
 */
export declare const BoostBannerV4: React.ForwardRefExoticComponent<BoostBannerV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BoostBannerV4.d.ts.map