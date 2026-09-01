import * as React from 'react';
import type { FeatureLockCardProps } from './FeatureLockCard';
/** Drop-in for {@link FeatureLockCard} — identical props, different design. */
export type FeatureLockCardV3Props = FeatureLockCardProps;
/**
 * Locked feature — V3, the compact line: **one row, the whole row is the
 * button**, ending in a chevron. No card, no badge circle, no separate CTA.
 *
 * The shape a settings list or a feature index needs. The base and V2 both put
 * a button inside a container, which means a list of eight gated features is a
 * list of eight buttons — and a user scanning it has to aim at a small target
 * inside a big one. Here the row is the target, which is how every other list
 * row in the kit behaves (§31: use the familiar interaction).
 *
 * `unlockLabel` moves to the row's accessible name rather than being drawn: the
 * chevron already says "this goes somewhere", and a visible "Unlock" beside it
 * would be the second affordance for one action.
 *
 * `variant` is accepted and ignored — this line is the compact row.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
export declare const FeatureLockCardV3: React.ForwardRefExoticComponent<FeatureLockCardProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FeatureLockCardV3.d.ts.map