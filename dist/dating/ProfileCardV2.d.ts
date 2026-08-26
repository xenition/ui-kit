import * as React from 'react';
import type { ProfileCardProps } from './ProfileCard';
/** Drop-in alternate design — identical props to `ProfileCard`. */
export type ProfileCardV2Props = ProfileCardProps;
/**
 * ProfileCard — design variant **V2** (web parity of the native V2). Where the
 * base stacks a photo carousel above separate meter/bio/prompt blocks, V2 is a
 * single **full-bleed hero**: the primary photo fills the card, a token gradient
 * scrim carries the name/age, headline and distance, a compatibility pill floats
 * top-right on a surface chip, and a slim detail strip beneath surfaces
 * bio/interests/actions. Same `ProfileCardProps`, so it is a genuine drop-in.
 * Token classes only; explicit loading/empty states; array access is guarded.
 * Stays inside its own design line: the meter is {@link CompatibilityMeterV2},
 * not the base one, because an app that picks V2 picks it for every surface it
 * sees.
 */
export declare const ProfileCardV2: React.ForwardRefExoticComponent<ProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileCardV2.d.ts.map