import * as React from 'react';
import type { SpeakerCardProps } from './SpeakerCard';
/** Drop-in replacement for {@link SpeakerCard} — identical props. */
export type SpeakerCardV3Props = SpeakerCardProps;
/**
 * SpeakerCard — **compact directory row** alternate design (web / React DOM).
 *
 * A small avatar beside a tight two-line name / role, with the rating and (at
 * most two) topic tags folded onto the trailing edge. No bio, no banner — the
 * densest speaker treatment, sized for long scrolling lists. Uses a minimal
 * hairline-bottom rule rather than a full card border. Same props as
 * {@link SpeakerCard} — a drop-in swap. Token-pure.
 */
export declare const SpeakerCardV3: React.ForwardRefExoticComponent<SpeakerCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SpeakerCardV3.d.ts.map