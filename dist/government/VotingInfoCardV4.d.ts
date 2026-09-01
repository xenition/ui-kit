import * as React from 'react';
import type { RegistrationStatus, VotingInfoCardProps } from './VotingInfoCard';
export interface VotingInfoCardV4Props extends VotingInfoCardProps {
    /** Override the four registration words — `'Registered'`, `'Not registered'`, … */
    statusLabels?: Partial<Record<RegistrationStatus, string>>;
    /** What the upcoming election is called. Default `'Next election'`. */
    electionLabel?: string;
}
/**
 * **V4 voting info** — the web twin of the native `VotingInfoCardV4`, same
 * props as {@link VotingInfoCard} plus `statusLabels` and `electionLabel`.
 *
 * ## Four changes
 *
 * 1. **The election date has a relationship to its label.** "Next election" and
 *    the date were two sibling `<span>`s with nothing tying them together, so a
 *    reader met a bare date with no idea what it was the date *of* — on the one
 *    card whose entire purpose is a deadline. The card's three facts are
 *    term/definition pairs now, which is what they always were.
 * 2. **Being registered for a mail ballot is not a brand event.** It is a
 *    factual attribute, like the party label on `RepresentativeCard`, and takes
 *    the neutral identity chip; the four registration states keep their tones,
 *    because those genuinely are statuses.
 * 3. **The words are props.** "Next election", "Polling place", the four
 *    registration labels and both action labels were hard-coded English on a
 *    civic surface that has to ship in every language the jurisdiction serves.
 * 4. **Both actions clear 44**, and the leading disc stops drawing its glyph in
 *    the `success` / `danger` **fill** on a 10% tint of that same fill — a
 *    contrast pairing nobody ever measured — taking the tone's
 *    contrast-corrected ink instead.
 */
export declare const VotingInfoCardV4: React.ForwardRefExoticComponent<VotingInfoCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VotingInfoCardV4.d.ts.map