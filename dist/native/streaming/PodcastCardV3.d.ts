import * as React from 'react';
import type { PodcastCardProps } from './PodcastCard';
/** Drop-in for {@link PodcastCardProps} — a genuinely different design, same props. */
export type PodcastCardV3Props = PodcastCardProps;
/**
 * **PodcastCard — design V3 (horizontal shelf row).** Artwork on the left,
 * meta on the right, laid out as a single low-profile line with a soft
 * primary-tinted fill and a hairline — the "browse list" counterpart to the
 * V2 hero. Same `PodcastCardProps`; token-pure; a11y-complete.
 */
export declare function PodcastCardV3({ podcast, subscribed, variant, onPress, onSubscribeToggle, style, }: PodcastCardV3Props): React.ReactElement;
//# sourceMappingURL=PodcastCardV3.d.ts.map