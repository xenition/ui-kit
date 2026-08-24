import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type DoctorAvailability = 'available' | 'busy' | 'off';
export interface DoctorCardProps {
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
    /** Fires when the book CTA is pressed. */
    onBook?: () => void;
    /** Overrides the book CTA label. */
    bookLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A clinician profile card for a provider directory: avatar, name, specialty,
 * a star rating with review count, an optional credential line, an availability
 * badge (glyph + label + tone), and a "Book" CTA. Informational UI only — not a
 * medical device. Token-only colors.
 */
export declare function DoctorCard({ name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel, style, }: DoctorCardProps): React.ReactElement;
//# sourceMappingURL=DoctorCard.d.ts.map