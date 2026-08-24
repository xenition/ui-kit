import * as React from 'react';
import { type SatisfactionRatingProps } from './SatisfactionRating';
/** Drop-in alternate design for {@link SatisfactionRating}. Identical contract. */
export type SatisfactionRatingV2Props = SatisfactionRatingProps;
/**
 * SatisfactionRating — **V2 (big selector card)**. A raised CSAT card: an
 * optional caption, a large row of tappable stars / emoji faces / thumbs, and a
 * live word readout of the current score. Same `SatisfactionRatingProps` as
 * {@link SatisfactionRating}. The active glyph is emphasized by size + opacity
 * and its numeric a11y label (not color alone); token colors only.
 */
export declare function SatisfactionRatingV2({ value, max, variant, size, onRate, readOnly, label, style, }: SatisfactionRatingV2Props): React.ReactElement;
//# sourceMappingURL=SatisfactionRatingV2.d.ts.map