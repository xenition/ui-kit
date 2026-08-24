import * as React from 'react';
import type { RepresentativeCardProps } from './RepresentativeCard';
/** Drop-in replacement for {@link RepresentativeCard} — identical props, distinct design. */
export type RepresentativeCardV3Props = RepresentativeCardProps;
/**
 * RepresentativeCard, alternate design **V3** — a compact directory row. A small
 * avatar leads, the name and office stack in the middle beside a neutral party
 * label and an in-office glyph (text + glyph, never color alone), and compact
 * Call / Email actions close the line. Tight rhythm for a representatives list.
 * Same `RepresentativeCardProps`; drops in for `RepresentativeCard`. Token-pure.
 */
export declare function RepresentativeCardV3({ name, office, photoUrl, party, phone, email, inOffice, onCall, onEmail, style, }: RepresentativeCardV3Props): React.ReactElement;
//# sourceMappingURL=RepresentativeCardV3.d.ts.map