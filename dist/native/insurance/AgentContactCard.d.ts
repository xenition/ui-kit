import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AgentContactCardProps {
    /** Agent full name. */
    name: string;
    /** Role / title (e.g. "Licensed agent", "Claims adjuster"). */
    title?: string;
    /** Agency or brokerage name. */
    agency?: string;
    /** Phone number, already formatted by the caller. */
    phone?: string;
    /** Email address. */
    email?: string;
    /** Optional avatar image URL. */
    avatarUrl?: string;
    /** Availability flag — shows an online/offline presence dot + label. */
    available?: boolean;
    /** Fires when the call action is pressed (only shown with a `phone`). */
    onCall?: () => void;
    /** Fires when the email action is pressed (only shown with an `email`). */
    onEmail?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A contact card for the policyholder's agent / adjuster: avatar with a
 * presence dot, name/title/agency, and call + email actions. Availability is
 * shown by **text + a presence dot** (the dot's color traces to a
 * `SemanticColors` slot via `Avatar`/`Badge`) — never color alone. Call/email
 * `Button`s only render when the corresponding contact detail and handler are
 * supplied. Token-bound throughout — no literal colors.
 */
export declare function AgentContactCard({ name, title, agency, phone, email, avatarUrl, available, onCall, onEmail, style, }: AgentContactCardProps): React.ReactElement;
//# sourceMappingURL=AgentContactCard.d.ts.map