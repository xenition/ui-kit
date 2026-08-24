import * as React from 'react';
import { type AgentStatusProps } from './AgentStatus';
/** Drop-in alternate design for {@link AgentStatus}. Identical public contract. */
export type AgentStatusV2Props = AgentStatusProps;
/**
 * AgentStatus — **V2 (avatar tile)**. A raised, centered tile: a large avatar
 * with a presence ring + corner status dot, the agent name, a
 * glyph-dot + presence label, and an optional detail line. Same
 * `AgentStatusProps` as {@link AgentStatus} (the `variant` prop is ignored — the
 * tile IS the design). Presence is carried by dot + text, never color alone;
 * token colors only.
 */
export declare function AgentStatusV2({ presence, name, avatar, detail, onPress, style, }: AgentStatusV2Props): React.ReactElement;
//# sourceMappingURL=AgentStatusV2.d.ts.map