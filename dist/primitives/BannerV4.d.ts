import * as React from 'react';
import type { BannerProps, BannerTone } from './Banner';
export type { BannerProps as BannerV4Props, BannerTone };
/**
 * **V4 banner** — the web twin of the native `BannerV4`, same props as
 * {@link Banner}, a different design line.
 *
 * A banner is the loudest thing this kit can say: full width, edge to edge, a
 * solid semantic fill. That is its identity and V4 keeps it. What V4 changes is
 * everything the loudness was hiding.
 *
 * ## The band does not sweep
 *
 * No gradient, at any depth. `design.md` §35.4 makes the tone the content, and
 * a band that runs from one hue to another has two contents — the reader has to
 * decide which end was the message. The one exception §35.11 allows a gradient,
 * the hero, is not this. And no shadow: a banner is in the document flow at the
 * top of a region, not floating over it, so `elevation` would be claiming a
 * layer the component does not occupy.
 *
 * ## The action stops pretending to be prose
 *
 * The base banner rendered its action as underlined text in the same colour as
 * the message beside it. On a saturated `danger` band that is two sentences of
 * red-and-white where one of them is a control, and the only thing separating
 * them is an underline — §33, a scannable screen needs the control to be found
 * without reading. V4 gives it a chip: an opaque `color-mix` of the band's own
 * tone and its on-pair, so the affordance is visible without introducing a
 * third colour to a component whose whole point is carrying one.
 *
 * Both controls take a real target — `--xen-space-xl` tall, which clears the
 * 44px minimum §46 asks for once the band's own padding is counted.
 *
 * The chip's label keeps the tone's `on` pair. That pair is guaranteed against
 * the band, and the chip is only a fifth of the way from the band toward the
 * ink itself — a direction that can only increase the separation, never close
 * it. The native twin re-measures the same mix with `ensureContrast` and its
 * spec is what holds the claim.
 */
export declare const BannerV4: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BannerV4.d.ts.map