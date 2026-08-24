import * as React from 'react';
import type { PodcastCardProps } from './PodcastCard';
/** Drop-in for {@link PodcastCardProps} — a genuinely different design, same props. */
export type PodcastCardV2Props = PodcastCardProps;
/**
 * **PodcastCard — design V2 (hero).** A big square-artwork hero: full-bleed
 * cover artwork with a floating play affordance in the corner and a legibility
 * scrim, the show meta stacked below on an elevated (shadowed, borderless)
 * surface. Distinct at a glance from the classic bordered card. Same
 * `PodcastCardProps`; token-pure; a11y-complete.
 */
export declare function PodcastCardV2({ podcast, subscribed, variant, onPress, onSubscribeToggle, style, }: PodcastCardV2Props): React.ReactElement;
//# sourceMappingURL=PodcastCardV2.d.ts.map