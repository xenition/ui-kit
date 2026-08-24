import * as React from 'react';
import type { AgentCardProps } from './AgentCard';
/** Same public contract as {@link AgentCard} — a drop-in alternate design. */
export type AgentCardV3Props = AgentCardProps;
/**
 * AgentCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a title·agency line with an inline rating, and a quiet Contact button
 * on the trailing edge — hairline-bordered for an agents list. The opposite of
 * v2's banner. Same props, token-only.
 */
export declare const AgentCardV3: React.ForwardRefExoticComponent<AgentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentCardV3.d.ts.map