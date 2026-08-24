import * as React from 'react';
import type { SleepStoryCardProps } from './SleepStoryCard';
/** Drop-in for {@link SleepStoryCardProps} — same props, a different design. */
export type SleepStoryCardV2Props = SleepStoryCardProps;
/**
 * SleepStoryCard — **dark cover hero** design (v2). A tall night-time cover: a
 * dark neutral base washed with the category accent and a bottom scrim, the
 * category tag pinned top-left (lock top-right), a big centered play/pause
 * overlay, and the title + narrator/length line over the scrim. `playing` flips
 * the control glyph and a11y label (state, not color alone); `locked` shows a
 * lock; `loading` renders a skeleton. Same props as {@link SleepStoryCardProps};
 * token-only colors.
 */
export declare function SleepStoryCardV2({ title, category, narrator, durationMin, description, playing, locked, loading, onPlay, style, }: SleepStoryCardV2Props): React.ReactElement;
//# sourceMappingURL=SleepStoryCardV2.d.ts.map