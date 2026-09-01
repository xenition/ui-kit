import * as React from 'react';
import type { AgentStatusProps } from './AgentStatus';
/** Drop-in for {@link AgentStatusProps} — same props, the V4 "console" design. */
export type AgentStatusV4Props = AgentStatusProps;
/**
 * AgentStatus — **V4** "calm console" design (web parity of the native V4). The
 * agent-workspace take on a presence indicator: an avatar + name with a soft-tint
 * presence pill carrying glyph + label (presence is encoded by glyph **and**
 * color, never color alone), plus an optional detail chip. The compact `dot`
 * variant is just the pill; the `row` variant is an elevated-friendly, tappable
 * ≥44px row (click / Enter / Space). Same props/behavior as
 * {@link AgentStatusProps}; all colors from `--xen-*` token classes (no literal
 * hex).
 */
export declare const AgentStatusV4: React.ForwardRefExoticComponent<AgentStatusProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentStatusV4.d.ts.map