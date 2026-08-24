import * as React from 'react';
import type { ChildProfileCardProps } from './ChildProfileCard';
/** Same public contract as {@link ChildProfileCard} — a drop-in alternate design. */
export type ChildProfileCardV2Props = ChildProfileCardProps;
/**
 * ChildProfileCard, redesigned (v2): a **banner hero card**. A primary-tinted
 * cover band carries a large centered avatar straddling its edge, with the name,
 * age·grade line, mood, and interest chips centered beneath. Elevated. Distinct
 * from v1's compact left-aligned row. Same props, token-only.
 */
export declare const ChildProfileCardV2: React.ForwardRefExoticComponent<ChildProfileCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChildProfileCardV2.d.ts.map