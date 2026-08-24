import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Voter registration status. */
export type RegistrationStatus = 'registered' | 'pending' | 'not-registered' | 'inactive';
export interface VotingInfoCardProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A voter-information card: registration status conveyed by **text + glyph +
 * color** (never color alone), the next election, an assigned polling place, and
 * gated Register / Find-polling actions. The action label adapts to whether the
 * voter is already registered. Every color traces to a `SemanticColors` slot or
 * a token-derived tint — no literals.
 */
export declare function VotingInfoCard({ registration, electionDate, electionName, pollingPlace, pollingAddress, mailBallot, onRegister, onFindPolling, style, }: VotingInfoCardProps): React.ReactElement;
//# sourceMappingURL=VotingInfoCard.d.ts.map