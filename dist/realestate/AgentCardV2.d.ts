import * as React from 'react';
import type { AgentCardProps } from './AgentCard';
/** Same public contract as {@link AgentCard} — a drop-in alternate design. */
export type AgentCardV2Props = AgentCardProps;
/**
 * AgentCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * carries a large avatar straddling its edge; the name, title·agency, rating, and
 * a full-width Contact CTA center beneath. Elevated. Distinct from v1's compact
 * row. Same props, token-only.
 */
export declare const AgentCardV2: React.ForwardRefExoticComponent<AgentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentCardV2.d.ts.map