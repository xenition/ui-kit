import * as React from 'react';
/** Voter registration status. */
export type RegistrationStatus = 'registered' | 'pending' | 'not-registered' | 'inactive';
export interface VotingInfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Voter registration status — conveyed by text + glyph + color. */
    registration: RegistrationStatus;
    /** Localized upcoming election date (already formatted). */
    electionDate?: string;
    /** Name / title of the upcoming election. */
    electionName?: string;
    /** Assigned polling place name. */
    pollingPlace?: string;
    /** Polling place address. */
    pollingAddress?: string;
    /** Whether the voter is registered for mail / absentee ballot. */
    mailBallot?: boolean;
    /** Fires "Register" / "Update registration" (shown when handler present). */
    onRegister?: () => void;
    /** Fires "Find polling place" (shown when handler present). */
    onFindPolling?: () => void;
}
/**
 * A voter-information card: registration status conveyed by **text + glyph +
 * color** (never color alone), the next election, an assigned polling place, and
 * gated Register / Find-polling actions (real `<button>`s). The action label
 * adapts to whether the voter is already registered. Token-bound throughout — no
 * literal colors. Web parity of the native `VotingInfoCard`.
 */
export declare const VotingInfoCard: React.ForwardRefExoticComponent<VotingInfoCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VotingInfoCard.d.ts.map