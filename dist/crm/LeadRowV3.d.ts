import * as React from 'react';
import type { LeadRowProps } from './LeadRow';
/** V3 accepts the exact same props as {@link LeadRow} — a drop-in replacement. */
export type LeadRowV3Props = LeadRowProps;
/**
 * LeadRow **design V3** — the *densest* single line: a leading temperature glyph
 * (🔥/☀/❄), the name with the company inline, the value pushed hard right, and a
 * small score. No avatar, no second line of chrome — a maximum-density lead list
 * for triage screens. A left accent bar (colored by temperature, or `primary`
 * when `selected`) reinforces heat, and the glyph is paired with an accessible
 * word in the row label so meaning never rests on color. Same props as
 * {@link LeadRow}. Token-pure.
 */
export declare const LeadRowV3: React.ForwardRefExoticComponent<LeadRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeadRowV3.d.ts.map