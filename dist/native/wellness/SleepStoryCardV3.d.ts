import * as React from 'react';
import type { SleepStoryCardProps } from './SleepStoryCard';
/** Drop-in for {@link SleepStoryCardProps} — same props, a different design. */
export type SleepStoryCardV3Props = SleepStoryCardProps;
/**
 * SleepStoryCard — **slim list row** design (v3). A minimal single line: a left
 * play/pause control, a thin accent stripe, the small category glyph, and the
 * title + a category/narrator/length line — no large cover. `playing` flips the
 * control glyph and a11y label (state, not color alone); `locked` shows a lock;
 * `loading` renders a skeleton. Same props as {@link SleepStoryCardProps};
 * token-only colors.
 */
export declare function SleepStoryCardV3({ title, category, narrator, durationMin, description, playing, locked, loading, onPlay, style, }: SleepStoryCardV3Props): React.ReactElement;
//# sourceMappingURL=SleepStoryCardV3.d.ts.map