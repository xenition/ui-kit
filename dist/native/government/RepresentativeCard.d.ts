import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Party affiliation — drives a neutral, non-partisan label badge tone. */
export type Party = 'democratic' | 'republican' | 'independent' | 'green' | 'other' | 'nonpartisan';
export interface RepresentativeCardProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * An elected-official / representative contact card: avatar, name, office, a
 * neutral party label, jurisdiction, and gated Call / Email actions. Party is a
 * plain label (never encoded by color alone), and an in-office flag reads as a
 * text + glyph badge. Every color traces to a `SemanticColors` slot — no
 * literals.
 */
export declare function RepresentativeCard({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, style, }: RepresentativeCardProps): React.ReactElement;
//# sourceMappingURL=RepresentativeCard.d.ts.map