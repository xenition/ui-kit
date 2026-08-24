import * as React from 'react';
import type { LeadRowProps } from './LeadRow';
/** V2 accepts the exact same props as {@link LeadRow} — a drop-in replacement. */
export type LeadRowV2Props = LeadRowProps;
/**
 * LeadRow **design V2** — a *card* (not a dense line) with a prominent
 * hot/warm/cold *flame chip*: a tinted pill carrying the temperature glyph + word
 * so heat reads instantly without relying on color. Avatar, name and company
 * lead; value and score sit in a right column. Elevated on a token `shadow-sm`,
 * with a `primary` left accent bar when `selected`. Same props as
 * {@link LeadRow}. Token-pure.
 */
export declare const LeadRowV2: React.ForwardRefExoticComponent<LeadRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeadRowV2.d.ts.map