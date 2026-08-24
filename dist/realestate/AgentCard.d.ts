import * as React from 'react';
/** Layout density for an {@link AgentCard}. */
export type AgentCardVariant = 'default' | 'compact';
export interface AgentCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Agent's full name. */
    name: string;
    /** Role / title (e.g. "Listing Agent"). */
    title?: string;
    /** Brokerage / agency name. */
    agency?: string;
    /** Avatar image URL; falls back to initials. */
    avatarUrl?: string;
    /** Star rating, 0–5. */
    rating?: number;
    /** Number of reviews backing the rating. */
    reviewCount?: number;
    /** Primary action label (default "Contact"). */
    contactLabel?: string;
    /** Fires when the primary action is pressed. */
    onContact?: () => void;
    /** Density variant. */
    variant?: AgentCardVariant;
}
/**
 * Web parity of the native `AgentCard`: a listing-agent summary — avatar
 * (initials fallback), name/title/agency, an optional star rating with review
 * count, and a contact action. Data + callbacks only; nothing fetches.
 * `variant="compact"` drops the rating row for dense lists. Reuses the shared
 * `Avatar`, `Button`, and `Icon` primitives; all colors come from the `--xen-*`
 * tokens — no literal colors. Pass `onClick` to make the card an activatable
 * button (the contact action stops propagation so it never double-fires).
 */
export declare const AgentCard: React.ForwardRefExoticComponent<AgentCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentCard.d.ts.map