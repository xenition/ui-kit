import * as React from 'react';
export type Mood = 'awful' | 'bad' | 'okay' | 'good' | 'great';
export interface MoodPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Currently selected mood, if any. */
    value?: Mood;
    /** Restrict / reorder the moods shown; defaults to all five. */
    options?: Mood[];
    /** Show the text label under each face. */
    showLabels?: boolean;
    /** Fires with the tapped mood. */
    onChange?: (mood: Mood) => void;
}
/**
 * A mood check-in: a row of emoji faces from awful to great. The selected face
 * gets a tinted ring in its mood color; the rest read muted. Each face is an
 * accessible radio labelled with its mood. `onChange` fires with the tapped
 * mood. Web parity of the native `MoodPicker`; token-only colors.
 */
export declare const MoodPicker: React.ForwardRefExoticComponent<MoodPickerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MoodPicker.d.ts.map