import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rabbit' | 'reptile' | 'fish' | 'other';
export type PetSex = 'male' | 'female' | 'unknown';
export interface PetProfileCardProps {
    /** Pet's name. */
    name: string;
    /** Species; drives the icon + fallback label. */
    species: PetSpecies;
    /** Breed, e.g. "Golden Retriever". */
    breed?: string;
    /** Age label already formatted, e.g. "3 yrs" or "8 mo". */
    age?: string;
    /** Biological sex. */
    sex?: PetSex;
    /** Weight label, e.g. "28 kg". */
    weight?: string;
    /** Photo URL for the avatar; falls back to initials/species. */
    photoUrl?: string;
    /** Whether the pet is spayed/neutered — shown as a success chip. */
    fixed?: boolean;
    /** Microchip id; shown truncated when present. */
    microchipId?: string;
    /** Loading placeholder state. */
    loading?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Header card for a single pet: avatar/photo, name, species + breed, and a strip
 * of key stats (age, sex, weight) plus optional spay/neuter and microchip chips.
 * Pressable when `onPress` is set. Renders a muted skeleton while `loading`.
 * Every color traces to a `SemanticColors` token — no literals.
 */
export declare function PetProfileCard({ name, species, breed, age, sex, weight, photoUrl, fixed, microchipId, loading, onPress, style, }: PetProfileCardProps): React.ReactElement;
//# sourceMappingURL=PetProfileCard.d.ts.map