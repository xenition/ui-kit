import * as React from 'react';
import type { LeadRowProps } from './LeadRow';
/** V3 accepts the exact same props as {@link LeadRow} — a drop-in replacement. */
export type LeadRowV3Props = LeadRowProps;
/**
 * LeadRow **design V3** — the *densest* single line: a leading temperature glyph
 * (🔥/☀/❄), the name, the value pushed right, and a small score. No avatar, no
 * second line of chrome — a maximum-density lead list for triage screens.
 * Temperature still pairs the glyph with an accessible word in the row label, so
 * meaning never rests on color. Same props as {@link LeadRow}. Token-pure.
 */
export declare function LeadRowV3({ name, company, temperature, valueCents, currency, score, selected, onPress, testID, style, }: LeadRowV3Props): React.ReactElement;
//# sourceMappingURL=LeadRowV3.d.ts.map