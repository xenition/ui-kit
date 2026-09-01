import * as React from 'react';
import type { Party, RepresentativeCardProps } from './RepresentativeCard';
/**
 * The two sides of a term, as a key. Named rather than inlined so the two
 * twins expose one shape for `officeLabels` — the web twin exports the same
 * union.
 */
export type OfficeTenure = 'inOffice' | 'former';
export interface RepresentativeCardV4Props extends RepresentativeCardProps {
    /** Override the six party words (`'Democratic'`, `'Nonpartisan'`, …). */
    partyLabels?: Partial<Record<Party, string>>;
    /** Override the two term words. Default `'In office'` / `'Former'`. */
    officeLabels?: Partial<Record<OfficeTenure, string>>;
}
/**
 * **V4 representative card** — same props as {@link RepresentativeCard} plus
 * `partyLabels` and `officeLabels`.
 *
 * ## Four changes
 *
 * 1. **Being in office stops being `success`.** Holding a seat is a factual
 *    attribute, not an outcome, and this is a component careful enough to keep
 *    the party badge deliberately neutral — then spent the kit's "this went
 *    well" colour on one of the two sides of a political fact. Both states are
 *    `IDENTITY_TONE` now and are told apart by their glyph and their word.
 * 2. **One badge shape.** The party badge was `outline` and the term badge
 *    `soft` in the same row, so two attributes of one person read as two
 *    different kinds of thing.
 * 3. **The card is one announced object** — name, office, party, term,
 *    district — instead of five loose text nodes, with the Call and Email
 *    buttons kept outside that name so they stay focus stops.
 * 4. **Both actions clear 44**, and the district and term lines are tested for
 *    content rather than for `!= null`, so an empty string no longer draws an
 *    empty block the web twin does not draw.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function RepresentativeCardV4({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, partyLabels, officeLabels, onCall, onEmail, style, }: RepresentativeCardV4Props): React.ReactElement | null;
//# sourceMappingURL=RepresentativeCardV4.d.ts.map