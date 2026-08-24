import * as React from 'react';
export type Mood = 'awful' | 'bad' | 'okay' | 'good' | 'great';
export interface MoodCheckInProps {
    /** Heading prompt. Default "How are you feeling?". */
    prompt?: string;
    /** Currently selected mood. */
    value?: Mood;
    /** Restrict / reorder the moods shown; defaults to all five. */
    options?: Mood[];
    /** Show a free-text note field under the faces. */
    showNote?: boolean;
    /** Controlled note text. */
    note?: string;
    /** Note placeholder. */
    notePlaceholder?: string;
    /** Fires with the tapped mood. */
    onChange?: (mood: Mood) => void;
    /** Fires as the note text changes. */
    onNoteChange?: (text: string) => void;
    /** Fires when the check-in is submitted (mood is required). */
    onSubmit?: (result: {
        mood: Mood;
        note?: string;
    }) => void;
    /** Submit button label. Default "Save check-in". */
    submitLabel?: string;
    className?: string;
}
/**
 * A daily mood check-in (web parity of the native block): a prompt, a
 * `radiogroup` of emoji faces from awful to great, an optional note field, and a
 * submit action. The selected face keeps a tinted ring in its mood tone and is
 * announced with `aria-checked` (state, not color alone); submit is disabled
 * until a mood is chosen. `onSubmit` returns the mood plus the note. Token-only
 * colors.
 */
export declare const MoodCheckIn: React.ForwardRefExoticComponent<MoodCheckInProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MoodCheckIn.d.ts.map