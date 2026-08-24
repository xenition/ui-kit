import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AdoptionStatus = 'available' | 'pending' | 'adopted' | 'fostered';
export interface AdoptionCardProps {
    /** Pet's name. */
    name: string;
    /** Species / breed line, e.g. "Tabby cat". */
    breed?: string;
    /** Age label, e.g. "2 yrs". */
    age?: string;
    /** Sex label. */
    sex?: string;
    /** Shelter / rescue name. */
    shelter?: string;
    /** Photo URL for the banner; a glyph placeholder shows otherwise. */
    photoUrl?: string;
    /** Placeholder glyph when there's no photo. */
    glyph?: string;
    /** Adoption fee label, e.g. "$120". */
    fee?: string;
    /** Availability status; drives the chip. */
    status: AdoptionStatus;
    /** Whether the viewer has favorited this listing. */
    favorited?: boolean;
    /** Apply/adopt action label; hidden once adopted or no `onApply`. */
    applyLabel?: string;
    onApply?: () => void;
    onFavorite?: () => void;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An adoption listing card: photo banner (or emoji placeholder), name + breed,
 * age/sex meta, shelter, a status chip, an optional fee, and adopt + favorite
 * actions. Whole card is pressable when `onPress` is set. Availability reads via
 * a labelled chip (not color alone). Token-only colors; a `View` placeholder
 * stands in for the pet photo.
 */
export declare function AdoptionCard({ name, breed, age, sex, shelter, photoUrl, glyph, fee, status, favorited, applyLabel, onApply, onFavorite, onPress, style, }: AdoptionCardProps): React.ReactElement;
//# sourceMappingURL=AdoptionCard.d.ts.map