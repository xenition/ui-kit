import * as React from 'react';
import { type AgentStatusProps } from './AgentStatus';
/** Drop-in alternate design for {@link AgentStatus}. Identical public contract. */
export type AgentStatusV3Props = AgentStatusProps;
/**
 * AgentStatus — **V3 (compact inline)**. A single dense line: a status dot, the
 * agent name, the presence label, and an optional detail — sized to sit inline
 * in a list header or toolbar. Same `AgentStatusProps` as {@link AgentStatus}
 * (the `variant` prop is ignored — this IS the compact design). Presence is
 * carried by dot + text; token colors only.
 */
export declare function AgentStatusV3({ presence, name, detail, onPress, style, }: AgentStatusV3Props): React.ReactElement;
//# sourceMappingURL=AgentStatusV3.d.ts.map