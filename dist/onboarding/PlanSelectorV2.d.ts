import * as React from 'react';
import { type PlanSelectorProps } from './PlanSelector';
/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV2Props = PlanSelectorProps;
/**
 * PlanSelector, redesigned (v2): the editorial line. The §7 card pair, lifted —
 * two-up and equal width like the base selector, but shadowed, with the selected
 * card taking the `primary` fill, the 2px ring and the stronger elevation. A
 * lone plan takes the full width rather than half a grid. `layout="list"` stacks
 * the same cards for a dense context. Same props, token-only.
 */
export declare const PlanSelectorV2: React.ForwardRefExoticComponent<PlanSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlanSelectorV2.d.ts.map