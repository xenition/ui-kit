import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ChildMood = 'happy' | 'excited' | 'calm' | 'sad' | 'tired' | 'sick';
export interface ChildProfileCardProps {
    /** Child's name. */
    name: string;
    /** Photo URL for the avatar; falls back to initials. */
    photoUrl?: string;
    /** Age label already formatted, e.g. "6 yrs" or "18 mo". */
    age?: string;
    /** School grade / class, e.g. "Grade 1". */
    grade?: string;
    /** Birthday label, e.g. "May 4". */
    birthday?: string;
    /** Today's mood; shown as an emoji chip (glyph + word, never color alone). */
    mood?: ChildMood;
    /** Interests / hobbies shown as soft chips. */
    interests?: string[];
    /** Loading placeholder state. */
    loading?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Header card for a single child: avatar/photo, name, an age·grade line, an
 * optional mood chip, and a wrapped strip of interest chips. Pressable when
 * `onPress` is set; renders a muted skeleton while `loading`. Every color
 * traces to a `SemanticColors` token — no literals.
 */
export declare function ChildProfileCard({ name, photoUrl, age, grade, birthday, mood, interests, loading, onPress, style, }: ChildProfileCardProps): React.ReactElement;
//# sourceMappingURL=ChildProfileCard.d.ts.map