import * as React from 'react';
import type { SpeakerCardProps } from './SpeakerCard';
/** Drop-in replacement for {@link SpeakerCard} — identical props. */
export type SpeakerCardV2Props = SpeakerCardProps;
/**
 * SpeakerCard — **centered profile hero** alternate design (web / React DOM).
 *
 * A soft primary-tinted top band with a large ringed `xl` avatar straddling it,
 * then the name, role, rating, bio and topic tags all centered beneath — an
 * elevated card built for a "meet the speaker" spotlight rather than a list row.
 * Ignores `variant` (always the hero form) so it stays visually one thing. Same
 * props as {@link SpeakerCard} — a drop-in swap. Token-pure.
 */
export declare const SpeakerCardV2: React.ForwardRefExoticComponent<SpeakerCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SpeakerCardV2.d.ts.map