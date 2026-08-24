import * as React from 'react';
/** Party affiliation — drives a neutral, non-partisan label badge. */
export type Party = 'democratic' | 'republican' | 'independent' | 'green' | 'other' | 'nonpartisan';
export interface RepresentativeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Representative's full name. */
    name: string;
    /** Office / title held (e.g. "City Council · District 4"). */
    office: string;
    /** Photo URL; falls back to initials in the Avatar. */
    photoUrl?: string;
    /** Party affiliation — rendered as a neutral label badge. */
    party?: Party;
    /** District / jurisdiction served. */
    district?: string;
    /** Contact phone (already formatted). */
    phone?: string;
    /** Contact email. */
    email?: string;
    /** Localized next-election / term-end date. */
    termInfo?: string;
    /** Whether the representative is currently in office (text+glyph badge). */
    inOffice?: boolean;
    /** Fires "Call" (shown only when `phone` + handler are present). */
    onCall?: () => void;
    /** Fires "Email" (shown only when `email` + handler are present). */
    onEmail?: () => void;
}
/**
 * An elected-official / representative contact card: avatar, name, office, a
 * neutral party label, jurisdiction, and gated Call / Email actions (real
 * `<button>`s). Party is a plain label (never encoded by color alone), and an
 * in-office flag reads as a text + glyph badge. Token-bound throughout — no
 * literal colors. Web parity of the native `RepresentativeCard`.
 */
export declare const RepresentativeCard: React.ForwardRefExoticComponent<RepresentativeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RepresentativeCard.d.ts.map