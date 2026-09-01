import * as React from 'react';
import type { Party, RepresentativeCardProps } from './RepresentativeCard';
/**
 * The two words the `inOffice` flag can take.
 *
 * A named pair rather than two inline optional fields: `inOffice` is a
 * boolean and has no enum of its own, so this is the only place the two keys
 * are written down — and the native twin imports the same shape rather than
 * spelling it again.
 */
export type OfficeTenure = 'inOffice' | 'former';
export interface RepresentativeCardV4Props extends RepresentativeCardProps {
    /** Override the six party words — `'Democratic'`, `'Nonpartisan'`, … */
    partyLabels?: Partial<Record<Party, string>>;
    /** Override the two tenure words. Default `'In office'` / `'Former'`. */
    officeLabels?: Partial<Record<OfficeTenure, string>>;
}
/**
 * **V4 representative card** — the web twin of the native
 * `RepresentativeCardV4`, same props as {@link RepresentativeCard} plus
 * `partyLabels` and `officeLabels`.
 *
 * ## Four changes
 *
 * 1. **Holding office stops being `success`.** Whether someone is currently in
 *    office is a factual attribute of a public official, not a good outcome —
 *    and this is a card careful enough to keep the *party* badge neutral for
 *    exactly that reason, then spent the module's approval colour on the seat.
 *    Tenure takes the neutral identity chip, with a glyph and a word doing the
 *    work.
 * 2. **The card is one readable block, not five stops.** Name, office, party,
 *    tenure, district and term were six separate leaves; the district and the
 *    term now sit in one caption line, and each control names the person it
 *    acts on, so "Call" is never a bare verb with no object.
 * 3. **Call and Email clear 44.** They were `size="sm"`, about 32px, and
 *    neither `Button` primitive sets a minimum height — a defect shared by all
 *    fifteen actions in this module.
 * 4. **Every word is a prop.** Six party names and two tenure words were
 *    hard-coded English, on a component whose whole subject is a local
 *    jurisdiction that may not be English-speaking at all.
 */
export declare const RepresentativeCardV4: React.ForwardRefExoticComponent<RepresentativeCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RepresentativeCardV4.d.ts.map