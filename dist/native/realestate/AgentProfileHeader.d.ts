import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AgentProfileHeaderProps {
    /** Agent's full name (the headline). */
    name: string;
    /** Role line under the name (e.g. "Listing Agent"). */
    title?: string;
    /** Brokerage / agency name. */
    agency?: string;
    /** Avatar photo URI. Omit for a token-styled monogram fallback. */
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
    style?: StyleProp<ViewStyle>;
}
/**
 * AgentProfileHeader — a brand-gradient agent hero for the real-estate V4
 * "listing" line. The avatar (photo or token monogram), near-white name +
 * agency, an optional star rating, and headline stats as frosted tiles sit on the
 * brand gradient (`listingGradient`); near-white Call / Message CTAs anchor the
 * bottom. Presentational — shaped data + callbacks, nothing fetches. Token-only
 * colors via `useXenitionTheme()` + the listing ramp helpers, dark-mode safe.
 */
export declare function AgentProfileHeader({ name, title, agency, photoUrl, rating, stats, verified, onCall, onMessage, style, }: AgentProfileHeaderProps): React.ReactElement;
//# sourceMappingURL=AgentProfileHeader.d.ts.map