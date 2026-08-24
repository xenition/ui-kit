import * as React from 'react';
import type { AgentStatusProps } from './AgentStatus';
/** Same public contract as {@link AgentStatus} — a drop-in alternate design. */
export type AgentStatusV2Props = AgentStatusProps;
/**
 * AgentStatus, redesigned (v2): an **elevated agent chip**. The avatar carries a
 * presence dot, the name leads, and the presence renders as a tinted pill with
 * the detail beneath — a raised card row. Distinct from v1. Same props,
 * token-only.
 */
export declare const AgentStatusV2: React.ForwardRefExoticComponent<AgentStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentStatusV2.d.ts.map