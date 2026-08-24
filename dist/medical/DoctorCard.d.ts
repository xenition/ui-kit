import * as React from 'react';
export type DoctorAvailability = 'available' | 'busy' | 'off';
export interface DoctorCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Clinician name. */
    name: string;
    /** Specialty, e.g. "Dermatology". */
    specialty: string;
    /** Optional avatar image URL. */
    avatar?: string;
    /** Average patient rating (0–5). */
    rating?: number;
    /** Number of reviews backing the rating. */
    reviewCount?: number;
    /** Years of experience or a short credential line. */
    credentials?: string;
    /** Booking availability; drives the badge (glyph + label + tone). */
    availability?: DoctorAvailability;
    /** Fires when the book CTA is pressed — web mirror of native `onBook`. */
    onBook?: () => void;
    /** Overrides the book CTA label. */
    bookLabel?: string;
}
/**
 * A clinician profile card for a provider directory — the web mirror of the
 * native `DoctorCard`. Shows the avatar, name, specialty, a star rating with
 * review count, an optional credential line, an availability badge (glyph +
 * label + tone), and a "Book" CTA. Composes `Card`, `Avatar`, `Rating`,
 * `Badge`, and `Button`; token-only colors. Informational UI only — not a
 * medical device.
 */
export declare const DoctorCard: React.ForwardRefExoticComponent<DoctorCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DoctorCard.d.ts.map