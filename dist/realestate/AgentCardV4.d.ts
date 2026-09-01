import * as React from 'react';
import type { AgentCardProps } from './AgentCard';
/** Drop-in for {@link AgentCardProps} — same props, the V4 "listing" design. */
export type AgentCardV4Props = AgentCardProps;
/**
 * AgentCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on a listing-agent summary: an elevated rounded
 * card with the avatar floating over a subtle soft-primary gradient accent, a
 * name-forward header, a warm star rating, and a contact affordance. Same
 * props/behavior as {@link AgentCardProps}; `variant="compact"` drops the rating
 * row for dense lists. All colors from `--xen-*` token classes (no literals).
 * Pass `onClick` to make the card a keyboard-activatable button (the contact
 * action stops propagation so it never double-fires).
 */
export declare const AgentCardV4: React.ForwardRefExoticComponent<AgentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentCardV4.d.ts.map