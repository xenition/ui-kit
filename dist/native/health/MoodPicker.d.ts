import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type Mood = 'awful' | 'bad' | 'okay' | 'good' | 'great';
export interface MoodPickerProps {
    /** Currently selected mood, if any. */
    value?: Mood;
    /** Restrict / reorder the moods shown; defaults to all five. */
    options?: Mood[];
    /** Show the text label under each face. */
    showLabels?: boolean;
    /** Fires with the tapped mood. */
    onChange?: (mood: Mood) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A mood check-in: a row of emoji faces from awful to great. The selected face
 * gets a tinted ring in its mood color; the rest read muted. Each face is an
 * accessible button labelled with its mood, and animates a tap scale when
 * chosen. `onChange` fires with the tapped mood. Token-only colors.
 */
export declare function MoodPicker({ value, options, showLabels, onChange, style, }: MoodPickerProps): React.ReactElement;
//# sourceMappingURL=MoodPicker.d.ts.map