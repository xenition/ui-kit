import * as React from 'react';
import type { StoryBarProps } from './StoryBar';
/** Drop-in for {@link StoryBarProps} — same props, the V4 "feed" design. */
export type StoryBarV4Props = StoryBarProps;
/**
 * StoryBar — **V4** "feed" design. A clean, airy horizontally-scrolling rail of
 * {@link StoryRing}s, optionally led by the viewer's "add story" tile. In the
 * feed line an unseen story wears the accent→primary gradient ring ({@link
 * feedStory}) while a seen one falls back to the ring's muted tone; the add
 * tile keeps its dashed ring. Ring state comes straight from each story. Same
 * props/behavior as {@link StoryBarProps}; token-only colors via
 * `useXenitionTheme()`. Scrolls without a visible scrollbar.
 */
export declare function StoryBarV4({ stories, onPressStory, showAdd, onPressAdd, addLabel, style, }: StoryBarV4Props): React.ReactElement;
//# sourceMappingURL=StoryBarV4.d.ts.map