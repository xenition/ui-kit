import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Lesson lifecycle state — drives the leading indicator and interactivity. */
export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed';
export interface LessonRowProps {
    /** Lesson title. */
    title: string;
    /** Optional 1-based index shown before the title. */
    index?: number;
    /** Duration label, e.g. "12 min". */
    durationLabel?: string;
    /** Lifecycle state; `locked` disables interaction. */
    status?: LessonStatus;
    /** Content type hint, e.g. "Video", "Reading", "Quiz". */
    kind?: string;
    /** Fires on press (suppressed when `locked`). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single lesson row for a course/module list: a status indicator (glyph +
 * semantic tone, never color alone), an optional index, title, content-kind and
 * duration meta, and a chevron affordance. `locked` rows are non-interactive and
 * announced as such. Token-only colors.
 */
export declare function LessonRow({ title, index, durationLabel, status, kind, onPress, style, }: LessonRowProps): React.ReactElement;
//# sourceMappingURL=LessonRow.d.ts.map