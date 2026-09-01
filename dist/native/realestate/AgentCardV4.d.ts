import * as React from 'react';
import type { AgentCardProps } from './AgentCard';
/** Drop-in for {@link AgentCardProps} — same props, the V4 "listing" design. */
export type AgentCardV4Props = AgentCardProps;
/**
 * AgentCard — **V4** "listing" design. The image-forward, editorial take on a
 * listing-agent summary: an elevated rounded card with the avatar floating over
 * a subtle soft-primary gradient accent, a name-forward header, a warm star
 * rating, and a contact affordance. Same props/behavior as {@link AgentCardProps};
 * `variant="compact"` drops the rating row for dense lists. Token-only colors via
 * `useXenitionTheme()` (+ the listing gradient helpers for the avatar accent).
 */
export declare function AgentCardV4({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel, onContact, onPress, variant, style, }: AgentCardV4Props): React.ReactElement;
//# sourceMappingURL=AgentCardV4.d.ts.map