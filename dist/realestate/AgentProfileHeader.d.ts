import * as React from 'react';
export interface AgentProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Agent's full name (the headline). */
    name: string;
    /** Role line under the name (e.g. "Listing Agent"). */
    title?: string;
    /** Brokerage / agency name. */
    agency?: string;
    /** Avatar photo URL. Omit for a token-styled monogram fallback. */
    photoUrl?: string;
    /** Average rating, 0–5, rendered as stars. Omit to hide the rating row. */
    rating?: number;
    /** Headline stats as frosted tiles (e.g. sales, years, reviews). */
    stats?: readonly {
        label: string;
        value: string;
    }[];
    /** Shows a verified check next to the name when true. */
    verified?: boolean;
    /** Fires on the primary Call CTA. Hidden when unset. */
    onCall?: () => void;
    /** Fires on the Message CTA. Hidden when unset. */
    onMessage?: () => void;
}
/**
 * AgentProfileHeader — a brand-gradient agent hero for the real-estate V4
 * "listing" line (web parity of the native twin). The avatar (photo or token
 * monogram), near-white name + agency, an optional star rating, and headline
 * stats as frosted tiles sit on the brand gradient (`from-primary-500
 * to-primary-700`); near-white Call / Message CTAs anchor the bottom.
 * Presentational — shaped data + callbacks, nothing fetches. Token-only colors
 * (`--xen-*` classes + gradient utilities), dark-mode safe.
 */
export declare const AgentProfileHeader: React.ForwardRefExoticComponent<AgentProfileHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentProfileHeader.d.ts.map