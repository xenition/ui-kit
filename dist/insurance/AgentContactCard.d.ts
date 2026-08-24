import * as React from 'react';
export interface AgentContactCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
    /** Availability flag — shows an online/offline presence pill + label. */
    available?: boolean;
    /** Fires when the call action is pressed (only shown with a `phone`). */
    onCall?: () => void;
    /** Fires when the email action is pressed (only shown with an `email`). */
    onEmail?: () => void;
}
/**
 * A contact card for the policyholder's agent / adjuster: avatar, name/title/
 * agency, and call + email actions. Availability is shown by **text + a
 * presence pill** (glyph + label + a `success`/`neutral` token tone) — never
 * color alone. Call/email actions are real `<button>`s that only render when the
 * corresponding contact detail and handler are supplied. Token-bound throughout
 * — no literal colors. Web parity of the native `AgentContactCard`.
 */
export declare const AgentContactCard: React.ForwardRefExoticComponent<AgentContactCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AgentContactCard.d.ts.map