import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface VideoLessonRowProps {
    /** Lesson title. */
    title: string;
    /** Duration label, e.g. "12:30". */
    durationLabel?: string;
    /** Remote thumbnail URI. */
    thumbnail?: string;
    /** Watch progress 0–100; renders a thin progress bar when set. */
    watchProgress?: number;
    /** Whether this lesson is the one currently playing. */
    playing?: boolean;
    /** Whether the lesson is fully watched. */
    watched?: boolean;
    /** Optional section / index label, e.g. "3.2". */
    meta?: string;
    /** Fires when the row (play affordance) is pressed. */
    onPlay?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A video lesson list row: a thumbnail with a play overlay, the title, a
 * duration / meta line, an optional watch-progress bar, and playing / watched
 * indicators. Announced with its play state. Token-only colors.
 */
export declare function VideoLessonRow({ title, durationLabel, thumbnail, watchProgress, playing, watched, meta, onPlay, style, }: VideoLessonRowProps): React.ReactElement;
//# sourceMappingURL=VideoLessonRow.d.ts.map