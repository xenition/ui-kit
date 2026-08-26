import * as React from 'react';
import type { ProfileSetupProps } from './ProfileSetup';
/** Drop-in for {@link ProfileSetup} — identical props, different design. */
export type ProfileSetupV3Props = ProfileSetupProps;
/**
 * Profile setup — V3, the compact line. No hero panel: a small badge sits beside
 * a left-aligned headline, and the avatar drops to an inline row — thumbnail,
 * name, camera glyph — the way an account settings row reads. The fields keep
 * their §6 geometry (56, `radius.lg`, leading icon, error border **and**
 * message) because shrinking a text field is how you get a form nobody can tap;
 * what gets denser is the space between things, not the things themselves.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put a
 * hero.
 *
 * Same props as {@link ProfileSetup}. Token-pure.
 */
export declare const ProfileSetupV3: React.ForwardRefExoticComponent<ProfileSetupProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileSetupV3.d.ts.map