import * as React from 'react';
import type { RegistrationStatus, VotingInfoCardProps } from './VotingInfoCard';
export interface VotingInfoCardV4Props extends VotingInfoCardProps {
    /** Override the four registration words (`'Registered'`, `'Not registered'`, …). */
    statusLabels?: Partial<Record<RegistrationStatus, string>>;
    /** What the upcoming election is called. Default `'Next election'`. */
    electionLabel?: string;
}
/**
 * **V4 voting information** — same props as {@link VotingInfoCard} plus
 * `statusLabels` and `electionLabel`.
 *
 * ## Four changes
 *
 * 1. **The election date gets a relationship to its label.** "Next election"
 *    and "Municipal general · Nov 4" were two sibling text nodes with nothing
 *    tying them together, so a reader heard a heading, then a date, and had to
 *    infer the connection. Label and value are one announced pair now.
 * 2. **No empty labelled blocks.** The card rendered the election section
 *    whenever either field was non-`null` and then joined them with a filter
 *    that drops `''` — so two empty strings produced a "Next election" heading
 *    with nothing under it, where the web twin renders nothing at all. Same
 *    for the polling place.
 * 3. **Both actions clear 44.** `size="sm"` renders about 34 here, and
 *    "Register to vote" is the whole point of the card.
 * 4. **One badge shape and one card variant**, the mail-ballot badge stops
 *    being `accent` — how you vote is an arrangement, not a status — and the
 *    registration disc takes a ground composited opaquely rather than a
 *    translucent wash of a fill slot, which is a different colour on every
 *    surface it lands on.
 */
export declare function VotingInfoCardV4({ registration, electionDate, electionName, pollingPlace, pollingAddress, mailBallot, statusLabels, electionLabel, onRegister, onFindPolling, style, }: VotingInfoCardV4Props): React.ReactElement;
//# sourceMappingURL=VotingInfoCardV4.d.ts.map