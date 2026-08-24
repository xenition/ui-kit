import * as React from 'react';
import type { PlanSelectorProps } from './PlanSelector';
/** Same public contract as {@link PlanSelector} — a drop-in alternate design. */
export type PlanSelectorV3Props = PlanSelectorProps;
/**
 * PlanSelector, redesigned (v3): a **compact plan list**. A small billing toggle,
 * then each tier as one selectable row — a radio dot, the name (+ a badge chip),
 * and the price pinned right. Dense for a settings/checkout context. The opposite
 * of v2's stacked cards. Same props, token-only.
 */
export declare const PlanSelectorV3: React.ForwardRefExoticComponent<PlanSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlanSelectorV3.d.ts.map