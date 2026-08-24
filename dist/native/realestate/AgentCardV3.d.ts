import * as React from 'react';
import type { AgentCardProps } from './AgentCard';
/** Drop-in alternate of {@link AgentCardProps} — identical prop contract. */
export type AgentCardV3Props = AgentCardProps;
/**
 * AgentCard — design variant **V3**: an **ultra-compact borderless row**. A
 * small avatar, a single-line name + inline collapsed rating ("★ 4.0 · 87"),
 * and a `link`-style contact action with a trailing chevron. Where V1 is a
 * bordered card with a stacked star row, V3 is chrome-free for dense directory
 * lists — separation comes from spacing, not a box. Same props as
 * {@link AgentCardProps}. Token-only.
 */
export declare function AgentCardV3({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel, onContact, onPress, style, }: AgentCardV3Props): React.ReactElement;
//# sourceMappingURL=AgentCardV3.d.ts.map