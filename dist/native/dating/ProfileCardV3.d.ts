import * as React from 'react';
import type { ProfileCardProps } from './ProfileCard';
/** Drop-in alternate design — identical props to `ProfileCard`. */
export type ProfileCardV3Props = ProfileCardProps;
/**
 * ProfileCard — design variant **V3**, an **editorial split**. A rounded hero
 * photo sits at the top; below it an editorial header (oversized name, headline,
 * distance) leads into the compatibility bar, then the profile **prompts are the
 * hero content** — each rendered as a raised card — followed by an interest rail.
 * Airy, type-led, and unmistakably distinct from the summary (V1) and full-bleed
 * (V2) layouts. Same `ProfileCardProps`. Token-pure; guarded; loading/empty
 * states included.
 */
export declare function ProfileCardV3({ profile, variant, showActions, onAction, onPressInterest, loading, emptyLabel, style, }: ProfileCardV3Props): React.ReactElement;
//# sourceMappingURL=ProfileCardV3.d.ts.map