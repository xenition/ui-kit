import * as React from 'react';
import type { SatisfactionRatingProps } from './SatisfactionRating';
/** Same public contract as {@link SatisfactionRating} — a drop-in alternate design. */
export type SatisfactionRatingV3Props = SatisfactionRatingProps;
/**
 * SatisfactionRating, redesigned (v3): a **tight inline scale**. Small glyphs pack
 * on one line with the caption trailing — a compact CSAT read-out for a row. The
 * chosen score is filled + bolded (never color alone). The opposite of v2's big
 * tiles. Same props, token-only.
 */
export declare const SatisfactionRatingV3: React.ForwardRefExoticComponent<SatisfactionRatingProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SatisfactionRatingV3.d.ts.map