import * as React from 'react';
import { type PlanSelectorProps } from './PlanSelector';
/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV3Props = PlanSelectorProps;
/**
 * PlanSelector, redesigned (v3): the compact line. Dense selectable rows that
 * align a radio indicator, the name (+ its badge), a one-line feature summary
 * and the price into scannable columns; the selected row keeps the 2px ring and
 * a faint primary tint. This is the one selector whose `layout` defaults to
 * `'list'` — a dense sheet is what the v3 line is *for* — and passing
 * `layout="cards"` gives the §7 pair instead. Same props, token-only.
 */
export declare const PlanSelectorV3: React.ForwardRefExoticComponent<PlanSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlanSelectorV3.d.ts.map