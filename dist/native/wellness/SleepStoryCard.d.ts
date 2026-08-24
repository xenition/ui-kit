import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SleepStoryCategory = 'nature' | 'fiction' | 'asmr' | 'music' | 'travel' | 'meditation';
export interface SleepStoryCardProps {
    /** Story title. */
    title: string;
    /** Category — drives the icon, tag, and accent tone. */
    category: SleepStoryCategory;
    /** Narrator name. */
    narrator?: string;
    /** Length in minutes. */
    durationMin?: number;
    /** Short teaser. */
    description?: string;
    /** Whether this story is currently playing (swaps the play glyph to pause). */
    playing?: boolean;
    /** Gate behind a paywall. */
    locked?: boolean;
    /** Render a placeholder skeleton. */
    loading?: boolean;
    /** Fires on the play / pause control. */
    onPlay?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A sleep-story tile: a soft category-tinted cover, title + narrator + length,
 * and a round play / pause control. `playing` flips the control glyph and its
 * a11y label (state, not color alone); `locked` shows a premium lock; `loading`
 * renders a skeleton. Token-only colors (semantic slots + a `withAlpha` tint).
 */
export declare function SleepStoryCard({ title, category, narrator, durationMin, description, playing, locked, loading, onPlay, style, }: SleepStoryCardProps): React.ReactElement;
//# sourceMappingURL=SleepStoryCard.d.ts.map