import * as React from 'react';
import type { AgentStatusProps } from './AgentStatus';
/** Same public contract as {@link AgentStatus} — a drop-in alternate design. */
export type AgentStatusV3Props = AgentStatusProps;
/**
 * AgentStatus, redesigned (v3): an **inline presence tag**. A tiny status dot, the
 * name, and the presence word (with an optional detail) — all on one dense line,
 * no avatar. The opposite of v2's chip. Status is dot + word, never color alone.
 * Same props, token-only.
 */
export declare const AgentStatusV3: React.ForwardRefExoticComponent<AgentStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentStatusV3.d.ts.map