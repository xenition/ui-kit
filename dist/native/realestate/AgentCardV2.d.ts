import * as React from 'react';
import type { AgentCardProps } from './AgentCard';
/** Drop-in alternate of {@link AgentCardProps} — identical prop contract. */
export type AgentCardV2Props = AgentCardProps;
/**
 * AgentCard — design variant **V2**: a **centered hero profile**. A large
 * avatar sits above a centered name, title/agency, and star rating, with the
 * contact action rendered as a full-width primary button at the foot. Where V1
 * is a horizontal row, V2 is a portrait "business card" for a profile header or
 * a featured-agent slot. Same props as {@link AgentCardProps}; the `variant`
 * prop is accepted but the hero is always centered. Token-only, elevated.
 */
export declare function AgentCardV2({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel, onContact, onPress, style, }: AgentCardV2Props): React.ReactElement;
//# sourceMappingURL=AgentCardV2.d.ts.map