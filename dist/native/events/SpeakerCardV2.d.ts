import * as React from 'react';
import type { SpeakerCardProps } from './SpeakerCard';
/**
 * Alternate design (V2) for {@link SpeakerCard}. Same props — a drop-in swap.
 *
 * A **centered profile hero**: a soft primary-tinted top band, a large ringed
 * `xl` avatar straddling it, then the name, role, rating, bio and topic tags
 * all centered beneath — an elevated card built for a "meet the speaker"
 * spotlight rather than a list row. Ignores `variant` (always the hero form) so
 * it stays visually one thing. Token-pure.
 */
export type SpeakerCardV2Props = SpeakerCardProps;
export declare function SpeakerCardV2({ name, role, company, avatarUrl, bio, rating, tags, onPress, style, }: SpeakerCardV2Props): React.ReactElement;
//# sourceMappingURL=SpeakerCardV2.d.ts.map