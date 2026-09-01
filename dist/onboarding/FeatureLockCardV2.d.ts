import * as React from 'react';
import type { FeatureLockCardProps } from './FeatureLockCard';
/** Drop-in for {@link FeatureLockCard} — identical props, different design. */
export type FeatureLockCardV2Props = FeatureLockCardProps;
/**
 * Locked feature — V2, the editorial line: a **banner** on the brand fill,
 * with the plan ribbon over it and the CTA as a light button on the colour.
 *
 * The base is a quiet card that says "this is locked". This one is an
 * advertisement: it is the loudest thing on whatever screen it lands on, which
 * is right when the gate IS the screen — an empty state, a feature the user
 * just tried to open — and wrong in a list, which is what V3 is for.
 *
 * The copy is `on-primary` throughout rather than `on-surface`, so the contrast
 * promise is the one the compiler actually made about this fill; the CTA
 * inverts to a `surface` fill with `primary-text` on it, which is the only
 * shape that stays legible on a saturated band.
 *
 * `variant="inline"` is accepted and ignored: an inline banner is a
 * contradiction, and an app that wants a compact row wants V3.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
export declare const FeatureLockCardV2: React.ForwardRefExoticComponent<FeatureLockCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FeatureLockCardV2.d.ts.map