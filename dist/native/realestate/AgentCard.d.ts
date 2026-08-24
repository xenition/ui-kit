import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Layout density for an {@link AgentCard}. */
export type AgentCardVariant = 'default' | 'compact';
export interface AgentCardProps {
    /** Agent's full name. */
    name: string;
    /** Role / title (e.g. "Listing Agent"). */
    title?: string;
    /** Brokerage / agency name. */
    agency?: string;
    /** Avatar image URI; falls back to initials. */
    avatarUrl?: string;
    /** Star rating, 0–5. */
    rating?: number;
    /** Number of reviews backing the rating. */
    reviewCount?: number;
    /** Primary action label (default "Contact"). */
    contactLabel?: string;
    /** Fires when the primary action is pressed. */
    onContact?: () => void;
    /** Fires when the card body is pressed (e.g. open the agent profile). */
    onPress?: () => void;
    /** Density variant. */
    variant?: AgentCardVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A listing agent summary — avatar (initials fallback), name/title/agency, an
 * optional star rating with review count, and a contact action. Data +
 * callbacks only; nothing fetches. `variant="compact"` drops the rating row for
 * dense lists. Reuses the shared `Avatar`, `Button`, and `Icon` primitives;
 * token-only colors and an a11y label describing the agent.
 */
export declare function AgentCard({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel, onContact, onPress, variant, style, }: AgentCardProps): React.ReactElement;
//# sourceMappingURL=AgentCard.d.ts.map