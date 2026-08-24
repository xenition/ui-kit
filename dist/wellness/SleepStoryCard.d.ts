import * as React from 'react';
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
    className?: string;
}
/**
 * A sleep-story tile (web parity of the native block): a soft category-tinted
 * cover, title + narrator + length, and a round play / pause control rendered as
 * a real `<button>`. `playing` flips the control glyph and its a11y label
 * (`aria-pressed`, state not color alone); `locked` disables it with a lock;
 * `loading` renders a skeleton. Token-only colors.
 */
export declare const SleepStoryCard: React.ForwardRefExoticComponent<SleepStoryCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SleepStoryCard.d.ts.map