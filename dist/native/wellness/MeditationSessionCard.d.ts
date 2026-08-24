import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type MeditationCategory = 'breathing' | 'focus' | 'sleep' | 'calm' | 'movement' | 'body-scan' | 'loving-kindness';
export interface MeditationSessionCardProps {
    /** Session title, e.g. "Morning stillness". */
    title: string;
    /** Category — drives the icon, tag label, and accent tone. */
    category: MeditationCategory;
    /** Length in minutes. */
    durationMin?: number;
    /** Difficulty / experience level. */
    level?: 'beginner' | 'intermediate' | 'advanced';
    /** Teacher / narrator name. */
    instructor?: string;
    /** Short description or focus line. */
    description?: string;
    /** Fraction 0–1 of the session already listened to (shows a resume bar). */
    progress?: number;
    /** Gate the session behind a paywall — swaps the CTA for a locked note. */
    locked?: boolean;
    /** Render a placeholder skeleton instead of content. */
    loading?: boolean;
    /** CTA label; defaults to "Start" (or "Resume" when `progress` > 0). */
    startLabel?: string;
    onStart?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A meditation session summary card: category icon + tag, title, a
 * duration / level / instructor meta strip, an optional resume progress bar,
 * and a single dominant start action. `locked` swaps the CTA for a premium
 * note; `loading` renders a skeleton. `category` sets the icon and accent tone.
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
export declare function MeditationSessionCard({ title, category, durationMin, level, instructor, description, progress, locked, loading, startLabel, onStart, style, }: MeditationSessionCardProps): React.ReactElement;
//# sourceMappingURL=MeditationSessionCard.d.ts.map