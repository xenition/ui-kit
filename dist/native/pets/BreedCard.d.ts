import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BreedSize = 'toy' | 'small' | 'medium' | 'large' | 'giant';
export type BreedEnergy = 'low' | 'moderate' | 'high';
export interface BreedCardProps {
    /** Breed name, e.g. "Border Collie". */
    name: string;
    /** Species label, e.g. "Dog". */
    species?: string;
    /** Photo URL rendered as a banner; a glyph placeholder shows otherwise. */
    photoUrl?: string;
    /** Emoji placeholder when there's no photo. */
    glyph?: string;
    /** Size class. */
    size?: BreedSize;
    /** Typical energy level; rendered as labelled dots. */
    energy?: BreedEnergy;
    /** Typical lifespan label, e.g. "12–15 yrs". */
    lifespan?: string;
    /** Short list of temperament traits. */
    traits?: string[];
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A breed reference card: banner (photo or emoji placeholder), name + species,
 * a stat row (size class, lifespan), a labelled energy meter, and temperament
 * trait chips. Pressable when `onPress` is set. The energy level is conveyed by
 * both dots and a text label. Token-only colors; a `View` placeholder stands in
 * for a real breed photo.
 */
export declare function BreedCard({ name, species, photoUrl, glyph, size, energy, lifespan, traits, onPress, style, }: BreedCardProps): React.ReactElement;
//# sourceMappingURL=BreedCard.d.ts.map