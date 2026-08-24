import * as React from 'react';
import type { CaseCardProps } from './CaseCard';
/** Same public contract as {@link CaseCard} — a drop-in alternate design. */
export type CaseCardV2Props = CaseCardProps;
/**
 * CaseCard, redesigned (v2): an **elevated matter card**. The docket number is an
 * eyebrow over a large caption; client, practice/status/priority pills, and lead-
 * attorney·next-event meta follow, with an Open-case footer button. Distinct from
 * v1. Same props, token-only.
 */
export declare const CaseCardV2: React.ForwardRefExoticComponent<CaseCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CaseCardV2.d.ts.map