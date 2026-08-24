import * as React from 'react';
import { type SatisfactionRatingProps } from './SatisfactionRating';
/** Drop-in alternate design for {@link SatisfactionRating}. Identical contract. */
export type SatisfactionRatingV3Props = SatisfactionRatingProps;
/**
 * SatisfactionRating — **V3 (compact inline)**. A tight inline control: for
 * read-only stars it delegates to the small `Rating` primitive; otherwise a
 * short row of small tappable stars / faces / thumbs with an optional inline
 * caption. Same `SatisfactionRatingProps` as {@link SatisfactionRating}. The
 * active glyph is carried by size/opacity + numeric a11y label, not color
 * alone; token colors only.
 */
export declare function SatisfactionRatingV3({ value, max, variant, onRate, readOnly, label, style, }: SatisfactionRatingV3Props): React.ReactElement;
//# sourceMappingURL=SatisfactionRatingV3.d.ts.map