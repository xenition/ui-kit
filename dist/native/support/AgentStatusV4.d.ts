import * as React from 'react';
import type { AgentStatusProps } from './AgentStatus';
/** Drop-in for {@link AgentStatusProps} — same props, the V4 "console" design. */
export type AgentStatusV4Props = AgentStatusProps;
/**
 * AgentStatus — **V4** "calm console" design. The agent-workspace take on a
 * presence indicator: an avatar + name with a soft-tint presence pill carrying
 * glyph + label (presence is encoded by glyph **and** color, never color alone),
 * plus an optional detail chip. The compact `dot` variant is just the pill; the
 * `row` variant is an elevated, tappable ≥44px card. Same props/behavior as
 * {@link AgentStatusProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function AgentStatusV4({ presence, name, avatar, detail, variant, onPress, style, }: AgentStatusV4Props): React.ReactElement;
//# sourceMappingURL=AgentStatusV4.d.ts.map