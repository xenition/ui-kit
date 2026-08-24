import * as React from 'react';
import type { RepresentativeCardProps } from './RepresentativeCard';
/** Drop-in replacement for {@link RepresentativeCard} — identical props, distinct design. */
export type RepresentativeCardV2Props = RepresentativeCardProps;
/**
 * RepresentativeCard, alternate design **V2** — a centered profile card. A large
 * avatar is centered above the name and office, with the neutral party label and
 * an in-office flag (text + glyph badge, never color alone) on a centered badge
 * row; district / term follow, and full-width Call / Email actions anchor the
 * footer. Same `RepresentativeCardProps`; drops in for `RepresentativeCard`.
 * Token-pure.
 */
export declare function RepresentativeCardV2({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, style, }: RepresentativeCardV2Props): React.ReactElement;
//# sourceMappingURL=RepresentativeCardV2.d.ts.map