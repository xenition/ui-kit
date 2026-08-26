import * as React from 'react';
import type { ProfileSetupProps } from './ProfileSetup';
/** Drop-in for {@link ProfileSetup} — identical props, different design. */
export type ProfileSetupV2Props = ProfileSetupProps;
/**
 * Profile setup — V2, the editorial line. The hero runs full-bleed to the top
 * edge with the avatar editor centred in it, and the content sheet rises over
 * the seam carrying the headline, the §6 fields and the sticky CTA. The avatar
 * overlaps the seam rather than sitting inside a panel, which is what makes this
 * line read as editorial rather than as the base screen with a bigger picture.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
export declare const ProfileSetupV2: React.ForwardRefExoticComponent<ProfileSetupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileSetupV2.d.ts.map