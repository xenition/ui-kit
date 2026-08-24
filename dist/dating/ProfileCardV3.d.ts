import * as React from 'react';
import type { ProfileCardProps } from './ProfileCard';
/** Drop-in alternate design — identical props to `ProfileCard`. */
export type ProfileCardV3Props = ProfileCardProps;
/**
 * ProfileCard — design variant **V3**, an **editorial split** (web parity of the
 * native V3). A rounded hero photo sits at the top; below it a borderless
 * editorial header (oversized name, headline, distance) leads into the
 * compatibility bar, then the profile **prompts become the hero content** — each a
 * raised card — followed by a labelled interest rail. Airy, type-led, and
 * unmistakably distinct from the base summary card and the full-bleed V2. Same
 * `ProfileCardProps`; token classes only; guarded; loading/empty states included.
 */
export declare const ProfileCardV3: React.ForwardRefExoticComponent<ProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileCardV3.d.ts.map