import * as React from 'react';
import type { SpeakerCardProps } from './SpeakerCard';
/**
 * Alternate design (V3) for {@link SpeakerCard}. Same props — a drop-in swap.
 *
 * A **compact directory row**: a small avatar beside a tight two-line name /
 * role, with the rating and (at most two) topic tags folded onto the trailing
 * edge. No bio, no banner — the densest speaker treatment, sized for long
 * scrolling lists. Uses a minimal hairline-bottom rule rather than a full card
 * border. Token-pure.
 */
export type SpeakerCardV3Props = SpeakerCardProps;
export declare function SpeakerCardV3({ name, role, company, avatarUrl, rating, tags, onPress, style, }: SpeakerCardV3Props): React.ReactElement;
//# sourceMappingURL=SpeakerCardV3.d.ts.map